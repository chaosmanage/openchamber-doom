import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

declare global {
  interface Window {
    __doomPacked?: string;
  }
}

type Exports = {
  memory: WebAssembly.Memory;
  initGame: () => void;
  tickGame: () => void;
  reportKeyDown: (key: number) => void;
  reportKeyUp: (key: number) => void;
  [key: string]: unknown;
};

const host = connectHost();
const root = get<HTMLElement>('#root');
const lobby = get<HTMLElement>('#lobby');
const play = get<HTMLElement>('#play');
const canvas = get<HTMLCanvasElement>('#screen');
const overlay = get<HTMLElement>('#overlay');
const kicker = get<HTMLElement>('#overlay-kicker');
const overlayTitle = get<HTMLElement>('#overlay-title');
const overlayMessage = get<HTMLElement>('#overlay-message');
const overlayButton = get<HTMLButtonElement>('#overlay-button');
const mode = get<HTMLSelectElement>('#mode');
const pauseButton = get<HTMLButtonElement>('#pause');
const meter = get<HTMLElement>('#meter');

let engine: Exports | null = null;
let renderContext: CanvasRenderingContext2D | null = null;
let frame: ImageData | null = null;
let frameWords: Uint32Array | null = null;
let frameWidth = 320;
let frameHeight = 400;
let outputWidth = 320;
let outputHeight = 200;
let running = false;
let loaded = false;
let generation = 0;
let timer: number | null = null;
let virtualMillis = 0;
let targetTps = 15;
let sampledTicks = 0;
let sampledMilliseconds = 0;
let booted = false;
let observer: ResizeObserver | null = null;
const pressed = new Set<number>();

function get<T extends Element>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error('Missing DOOM element: ' + selector);
  return el;
}

function syncHeight(): void {
  const size = Math.ceil(root.getBoundingClientRect().height);
  if (size > 0) void host.setHeight(size).catch(() => undefined);
}

function showMessage(heading: string, title: string, message: string, action: string, callback: () => void): void {
  kicker.textContent = heading;
  overlayTitle.textContent = title;
  overlayMessage.textContent = message;
  overlayButton.textContent = action;
  overlayButton.onclick = callback;
  overlay.hidden = false;
}

function hideMessage(): void {
  overlay.hidden = true;
}

function releaseKeys(): void {
  for (const key of pressed) engine?.reportKeyUp(key);
  pressed.clear();
}

function stopLoop(): void {
  running = false;
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  releaseKeys();
}

function pauseGame(): void {
  if (!loaded || !engine || !running) return;
  stopLoop();
  pauseButton.textContent = 'Resume';
  showMessage('Standby', 'Paused', '0 game ticks or rendering while paused.', 'Resume', resumeGame);
}

function resumeGame(): void {
  if (!loaded || !engine || running || document.hidden) return;
  hideMessage();
  pauseButton.textContent = 'Pause';
  canvas.focus({ preventScroll: true });
  running = true;
  timer = window.setTimeout(tickLoop, 0);
}

function removeEngine(): void {
  ++generation;
  stopLoop();
  engine = null;
  frame = null;
  frameWords = null;
  renderContext = null;
  loaded = false;
  meter.textContent = '— ms/tick';
  // When the section collapses, OpenChamber destroys the iframe too.
}

function exitGame(): void {
  removeEngine();
  play.hidden = true;
  lobby.hidden = false;
  syncHeight();
}

function userKey(key: string): number | null {
  const e = engine;
  if (!e) return null;
  const named: Record<string, string> = {
    w: 'KEY_UPARROW', a: 'KEY_LEFTARROW', s: 'KEY_DOWNARROW', d: 'KEY_RIGHTARROW',
    ArrowUp: 'KEY_UPARROW', ArrowLeft: 'KEY_LEFTARROW',
    ArrowDown: 'KEY_DOWNARROW', ArrowRight: 'KEY_RIGHTARROW',
    Control: 'KEY_FIRE', f: 'KEY_FIRE', e: 'KEY_USE', ' ': 'KEY_USE',
    q: 'KEY_STRAFE_L', r: 'KEY_STRAFE_R',
    ',': 'KEY_STRAFE_L', '.': 'KEY_STRAFE_R',
    Shift: 'KEY_SHIFT', Escape: 'KEY_ESCAPE', Enter: 'KEY_ENTER',
    Backspace: 'KEY_BACKSPACE', Tab: 'KEY_TAB', Alt: 'KEY_ALT',
  };
  const normalized = key.length === 1 ? key.toLowerCase() : key;
  const constant = named[normalized];
  if (constant) return Number(e[constant]);
  // Weapon selection, map cheats and other original Doom key bindings.
  return normalized.length === 1 ? normalized.charCodeAt(0) : null;
}

function sendKey(key: string, down: boolean): void {
  if (!loaded || !engine || !running) return;
  const number = userKey(key);
  if (number === null || !Number.isFinite(number)) return;
  if (down) {
    if (!pressed.has(number)) {
      pressed.add(number);
      engine.reportKeyDown(number);
    }
  } else if (pressed.delete(number)) {
    engine.reportKeyUp(number);
  }
}

function keyboard(event: KeyboardEvent, down: boolean): void {
  if (!loaded || !engine || play.hidden) return;
  if (event.key.toLowerCase() === 'p' && down) {
    event.preventDefault();
    if (running) pauseGame(); else resumeGame();
    return;
  }
  // Only steal inputs while the player has explicitly focused the game.
  if (document.activeElement !== canvas) return;
  if (userKey(event.key) === null) return;
  event.preventDefault();
  event.stopPropagation();
  sendKey(event.key, down);
}

function drawFrame(pointer: number): void {
  const e = engine;
  if (!e || !frame || !frameWords || !renderContext) return;
  const src = new Uint32Array(e.memory.buffer, pointer, frameWidth * frameHeight);
  const dest = frameWords;
  const stepX = Math.max(1, Math.floor(frameWidth / outputWidth));
  const stepY = Math.max(1, Math.floor(frameHeight / outputHeight));
  // Downsample source to 320x200 BEFORE converting to RGBA. This retains
  // classic DOOM clarity without changing engine CPU use at 640x400.
  for (let y = 0; y < outputHeight; y++) {
    const offset = y * stepY * frameWidth;
    for (let x = 0; x < outputWidth; x++) {
      const p = src[offset + x * stepX];
      dest[y * outputWidth + x] = 0xff000000 | (p & 0x0000ff00) | ((p & 0x000000ff) << 16) | ((p >>> 16) & 0xff);
    }
  }
  renderContext.putImageData(frame, 0, 0);
}

function readMessage(pointer: number, size: number): string {
  if (!engine || size <= 0) return '';
  return new TextDecoder().decode(new Uint8Array(engine.memory.buffer, pointer, size));
}

function tickLoop(): void {
  timer = null;
  if (!running || !engine || document.hidden) {
    if (running) pauseGame();
    return;
  }
  const start = performance.now();
  // A virtual 35 Hz clock ensures Eco mode does less game simulation instead
  // of silently catching up and burning the same CPU at a lower FPS.
  virtualMillis += 1000 / 35;
  try {
    engine.tickGame();
  } catch (error) {
    stopLoop();
    showMessage('Engine stopped', 'Game error', String(error), 'Back', exitGame);
    return;
  }
  const duration = performance.now() - start;
  sampledTicks += 1;
  sampledMilliseconds += duration;
  if (sampledTicks >= Math.max(10, targetTps)) {
    meter.textContent = (sampledMilliseconds / sampledTicks).toFixed(1) + ' ms/tick';
    sampledTicks = 0;
    sampledMilliseconds = 0;
  }
  if (running) {
    timer = window.setTimeout(tickLoop, Math.max(1, Math.round(1000 / targetTps - duration)));
  }
}

function currentAssetUrl(name: string): string {
  const url = new URL('./assets/' + name, window.location.href);
  // Guest asset routes require the same short-lived token attached to the
  // HTML's bundled script. OpenChamber injects it into relative script src.
  const script = document.querySelector<HTMLScriptElement>('script[src*="main.js"]');
  const token = script ? new URL(script.src).searchParams.get('oc_url_token') : null;
  if (token) url.searchParams.set('oc_url_token', token);
  return url.href;
}

async function loadPackedWasm(): Promise<Uint8Array> {
  // OpenChamber's guest assets allow .js but not .wasm; use an offline gzip
  // payload inside a JavaScript resource. This is fetched ONLY after Play.
  const url = currentAssetUrl('doom-packed.js');
  // Load via script.src rather than eval or a second fetch. The asset token
  // restricts access to this extension's package.
  await new Promise<void>((resolve, reject) => {
    const el = document.createElement('script');
    el.src = url;
    el.onload = () => { el.remove(); resolve(); };
    el.onerror = () => { el.remove(); reject(new Error('Could not load packaged engine')); };
    document.head.append(el);
  });
  const encoded = window.__doomPacked;
  delete window.__doomPacked;
  if (!encoded) throw new Error('Packaged engine missing');
  const binary = atob(encoded);
  const compressed = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) compressed[i] = binary.charCodeAt(i);
  if (!('DecompressionStream' in window)) {
    throw new Error('This browser does not support gzip decompression streams');
  }
  const decompressed = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
  const buffer = await new Response(decompressed).arrayBuffer();
  return new Uint8Array(buffer);
}

async function launchGame(): Promise<void> {
  removeEngine();
  const mine = generation;
  lobby.hidden = true;
  play.hidden = false;
  showMessage('Loading', 'Starting DOOM', 'Unpacking the engine once. No audio or network services.', 'Back', exitGame);
  syncHeight();

  try {
    const bytes = await loadPackedWasm();
    if (mine !== generation) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('Canvas 2D is unavailable');
    renderContext = ctx;
    virtualMillis = 1000;
    sampledTicks = 0;
    sampledMilliseconds = 0;
    const imports = {
      console: {
        onInfoMessage: (_ptr: number, _size: number) => {},
        onErrorMessage: (ptr: number, size: number) => console.warn('[DOOM]', readMessage(ptr, size)),
      },
      loading: {
        onGameInit: (width: number, height: number) => {
          frameWidth = width;
          frameHeight = height;
          outputWidth = Math.min(320, width);
          outputHeight = Math.min(200, height);
          canvas.width = outputWidth;
          canvas.height = outputHeight;
          frame = ctx.createImageData(outputWidth, outputHeight);
          frameWords = new Uint32Array(frame.data.buffer);
        },
        wadSizes: () => {},
        readWads: () => {},
      },
      ui: { drawFrame },
      // Doom can poll the clock in a busy-wait inside tickGame. Advance by
      // one logical millisecond per poll so a low-TPS virtual clock cannot hang.
      runtimeControl: { timeInMilliseconds: () => BigInt(Math.trunc(++virtualMillis)) },
      gameSaving: {
        sizeOfSaveGame: () => 0,
        readSaveGame: () => 0,
        writeSaveGame: () => 0,
      },
    };
    const { instance } = await WebAssembly.instantiate(bytes.buffer as ArrayBuffer, imports);
    if (mine !== generation) return;
    engine = instance.exports as unknown as Exports;
    engine.initGame();
    loaded = true;
    hideMessage();
    resumeGame();
    syncHeight();
  } catch (error) {
    if (mine !== generation) return;
    removeEngine();
    showMessage('Could not launch', 'DOOM unavailable', String(error), 'Back', exitGame);
  }
}

function bindTouch(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-key]')) {
    const key = button.dataset.key || '';
    const up = (event: PointerEvent) => {
      event.preventDefault();
      sendKey(key, false);
    };
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (!running) return;
      button.setPointerCapture(event.pointerId);
      sendKey(key, true);
    });
    button.addEventListener('pointerup', up);
    button.addEventListener('pointercancel', up);
    button.addEventListener('lostpointercapture', () => sendKey(key, false));
  }
}

function setup(): void {
  get<HTMLButtonElement>('#launch').addEventListener('click', () => void launchGame());
  get<HTMLButtonElement>('#exit').addEventListener('click', exitGame);
  get<HTMLButtonElement>('#restart').addEventListener('click', () => void launchGame());
  pauseButton.addEventListener('click', () => {
    if (running) pauseGame(); else resumeGame();
  });
  mode.addEventListener('change', () => {
    targetTps = Number(mode.value);
    try { void host.storage.set('doom:tps', targetTps).catch(() => undefined); } catch {}
  });
  window.addEventListener('keydown', (event) => keyboard(event, true));
  window.addEventListener('keyup', (event) => keyboard(event, false));
  window.addEventListener('blur', pauseGame);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseGame(); });
  window.addEventListener('pagehide', removeEngine);
  observer = new ResizeObserver(syncHeight);
  observer.observe(root);
  bindTouch();
  syncHeight();
  void host.storage.get('doom:tps').then((value) => {
    if ([10, 15, 25, 35].includes(Number(value))) {
      targetTps = Number(value);
      mode.value = String(value);
    }
  }).catch(() => undefined);
}

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  if (booted) return;
  booted = true;
  setup();
});
