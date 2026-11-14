import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join } from 'node:path';

const root = process.cwd();
const loadPacked = (path, key) => {
  const js = readFileSync(join(root, path), 'utf8');
  const base64 = js.match(new RegExp(key + '="([A-Za-z0-9+/=]+)"'))?.[1];
  assert.ok(base64, path + ' must contain its packaged payload');
  return gunzipSync(Buffer.from(base64, 'base64'));
};
const wad = loadPacked('status/assets/freedoom1-packed.js', '__freedoomPacked');

test('official Freedoom Phase 1 IWAD contains all four episodes', () => {
  assert.equal(wad.toString('ascii', 0, 4), 'IWAD');
  assert.equal(createHash('sha256').update(wad).digest('hex'),
    '7323bcc168c5a45ff10749b339960e98314740a734c30d4b9f3337001f9e703d');
  const count = wad.readUInt32LE(4), offset = wad.readUInt32LE(8);
  const maps = new Set();
  for (let i = 0; i < count; i++) {
    maps.add(wad.toString('ascii', offset + 16 * i + 8, offset + 16 * i + 16).replace(/\0/g, ''));
  }
  for (let episode = 1; episode <= 4; episode++) {
    for (let map = 1; map <= 9; map++) {
      assert.ok(maps.has(`E${episode}M${map}`), `missing episode ${episode}, map ${map}`);
    }
  }
});

test('WASM engine loads Freedoom instead of fallback shareware, renders and accepts Enter', async () => {
  const wasm = loadPacked('status/assets/doom-packed.js', '__doomPacked');
  let memory, frames = 0, wadSizesCalled = 0, readWadsCalled = 0;
  let ticks = 1000, initWidth = 0, initHeight = 0;
  const errors = [];
  const imports = {
    console: {
      onInfoMessage: () => {},
      onErrorMessage: (ptr, n) => {
        if (memory) errors.push(Buffer.from(memory.buffer.slice(ptr, ptr + n)).toString());
      },
    },
    loading: {
      onGameInit: (width, height) => { initWidth = width; initHeight = height; },
      wadSizes: (countPtr, totalPtr) => {
        wadSizesCalled++;
        const mem = new DataView(memory.buffer);
        mem.setUint32(countPtr, 1, true);
        mem.setUint32(totalPtr, wad.length, true);
      },
      readWads: (dataPtr, lengthPtr) => {
        readWadsCalled++;
        new Uint8Array(memory.buffer, dataPtr, wad.length).set(wad);
        new DataView(memory.buffer).setUint32(lengthPtr, wad.length, true);
      },
    },
    ui: { drawFrame: () => { frames++; } },
    runtimeControl: { timeInMilliseconds: () => BigInt(Math.trunc(++ticks)) },
    gameSaving: { sizeOfSaveGame: () => 0, readSaveGame: () => 0, writeSaveGame: () => 0 },
  };
  const { instance } = await WebAssembly.instantiate(wasm, imports);
  memory = instance.exports.memory;
  instance.exports.initGame();
  assert.equal(wadSizesCalled, 1);
  assert.equal(readWadsCalled, 1);
  assert.equal(initWidth, 640);
  assert.equal(initHeight, 400);
  const enter = Number(instance.exports.KEY_ENTER);
  assert.ok(enter > 0 && enter <= 255);
  instance.exports.reportKeyDown(enter);
  for (let i = 0; i < 10; i++) {
    ticks += 1000 / 35;
    instance.exports.tickGame();
  }
  instance.exports.reportKeyUp(enter);
  assert.ok(frames > 0, 'Freedoom should render frames');
  assert.ok(!errors.some(message => /missing|not found|fatal/i.test(message)),
    'Engine logged potentially fatal errors: ' + errors.join(' | '));
});

test('touch actions provide Enter and Menu without removing Fire/Use', () => {
  const html = readFileSync(join(root, 'status/index.html'), 'utf8');
  for (const key of ['Control', ' ', 'Enter', 'Escape']) {
    assert.ok(html.includes('data-key="' + key + '"'), 'missing touch button ' + key);
  }
  const source = readFileSync(join(root, 'status/main.ts'), 'utf8');
  assert.match(source, /const pendingRelease = new Set<number>\(\)/);
  assert.match(source, /pendingRelease\.clear\(\)/);
});
