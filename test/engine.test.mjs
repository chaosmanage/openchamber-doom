import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = process.cwd();
const packed = readFileSync(join(root, 'status/assets/doom-packed.js'), 'utf8');
const base64 = packed.match(/__doomPacked="([A-Za-z0-9+/=]+)"/)?.[1];
assert.ok(base64, 'Bundled engine is required');
const binary = gunzipSync(Buffer.from(base64, 'base64'));

test('WASM engine is intact and offline', () => {
  assert.equal(createHash('sha256').update(binary).digest('hex'),
    '8edfe49a7583fd975199969302d8e9adcf8e714d0af72bf3e672f991fd810faa');
  assert.equal(WebAssembly.validate(binary), true);
});
test('original DOOM engine initializes and runs a tick', async () => {
  let memory, width, height, frames = 0, ms = 1000, wadSizeCalls = 0;
  const imports = {
    console: { onInfoMessage: () => {}, onErrorMessage: () => {} },
    loading: {
      onGameInit: (w, h) => { width = w; height = h; },
      wadSizes: () => { wadSizeCalls++; }, readWads: () => { throw Error("Custom WAD loading should be disabled in shareware mode"); },
    },
    ui: {
      drawFrame: (ptr) => {
        frames++;
        if (memory) assert.ok(ptr >= 0 && ptr + width * height * 4 <= memory.buffer.byteLength);
      },
    },
    runtimeControl: { timeInMilliseconds: () => BigInt(Math.floor(++ms)) },
    gameSaving: { sizeOfSaveGame: () => 0, readSaveGame: () => 0, writeSaveGame: () => 0 },
  };
  const { instance } = await WebAssembly.instantiate(binary, imports);
  memory = instance.exports.memory;
  instance.exports.initGame();
  assert.equal(width, 640);
  assert.equal(height, 400);
  assert.equal(wadSizeCalls, 1);
  for (let t = 0; t < 36; t++) {
    ms += 1000 / 35;
    instance.exports.tickGame();
  }
  assert.ok(frames > 0, 'Engine should emit rendered frames');
  assert.ok(memory.buffer.byteLength < 100 * 1024 * 1024, 'WASM memory budget');
});
test('game display uses classic 320x200 resolution', () => {
  const html = readFileSync(join(root, 'status/index.html'), 'utf8');
  const source = readFileSync(join(root, 'status/main.ts'), 'utf8');
  assert.match(html, /<canvas id="screen" width="320" height="200"/);
  assert.match(source, /outputWidth = Math\.min\(320, width\)/);
  assert.match(source, /outputHeight = Math\.min\(200, height\)/);
});

test('OpenChamber status manifest starts collapsed with no capabilities', () => {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert.equal(pkg.openchamber.contributes.statusSection.defaultExpanded, false);
  assert.equal(pkg.openchamber.contributes.capabilities, undefined);
  assert.equal(pkg.openchamber.id, 'low-power-doom');
});

test('original DOOM shareware is the only game and on-screen Enter remains', () => {
  const html = readFileSync(join(root, 'status/index.html'), 'utf8');
  const source = readFileSync(join(root, 'status/main.ts'), 'utf8');
  assert.match(html, /data-key="Enter"/);
  assert.match(html, /data-key="Escape"/);
  assert.match(html, /data-key="Control"/);
  assert.match(html, /data-key=" "/);
  assert.match(source, /const pendingRelease = new Set<number>\(\)/);
  assert.match(source, /wadSizes: \(\) => \{\}/);
  assert.doesNotMatch(source, /freedoom/i);
  assert.doesNotMatch(html, /freedoom/i);
});
