import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const input = resolve(process.argv[2] || 'status/assets/freedoom1.wad');
const output = resolve('status/assets/freedoom1-packed.js');
const wad = readFileSync(input);
const hash = createHash('sha256').update(wad).digest('hex');
const expected = '7323bcc168c5a45ff10749b339960e98314740a734c30d4b9f3337001f9e703d';
if (hash !== expected) throw new Error('Unexpected Freedoom Phase 1 WAD SHA-256: ' + hash);
if (wad.toString('ascii', 0, 4) !== 'IWAD') throw new Error('Expected IWAD header');

const compressed = gzipSync(wad, { level: 9 });
writeFileSync(output,
  '// Freedoom Phase 1 v0.13.0 — BSD-style licensed game content. See LICENSE-FREEDOOM.\n' +
  '// Upstream: https://github.com/freedoom/freedoom/releases/tag/v0.13.0\n' +
  'window.__freedoomPacked="' + compressed.toString('base64') + '";\n');
console.log('Freedoom Phase 1:', wad.length, 'bytes; gzip:', compressed.length,
  'bytes; JavaScript:', readFileSync(output).length, 'bytes');
