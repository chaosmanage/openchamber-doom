import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';

const input = resolve(process.argv[2] || 'status/assets/doom.wasm');
const output = resolve('status/assets/doom-packed.js');
const binary = readFileSync(input);
const sha = createHash('sha256').update(binary).digest('hex');
const expected = '8edfe49a7583fd975199969302d8e9adcf8e714d0af72bf3e672f991fd810faa';
if (sha !== expected) throw new Error('Unexpected upstream engine binary SHA-256: ' + sha);
const packed = gzipSync(binary, { level: 9 });
writeFileSync(output, '// Doom WebAssembly v0.1.0 (GPLv2 engine; shareware game data)\n' +
  '// Original artifact: https://github.com/jacobenget/doom.wasm/releases/tag/v0.1.0\n' +
  'window.__doomPacked="' + packed.toString('base64') + '";\n');
console.log('Original:', binary.length, 'bytes; compressed:', packed.length,
  'bytes; JS:', readFileSync(output).length, 'bytes');
