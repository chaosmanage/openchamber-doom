# DOOM for OpenChamber

Run DOOM inside Openchamber

<p align=center>
<img width="90%"  alt="openchamber-doom" src="https://github.com/user-attachments/assets/290d81d0-0e72-45db-9711-9a8758562384" />
</p>

## Install

Open **Settings → Extensions** on your Oracle VPS OpenChamber, and add:

```text
https://github.com/chaosmanage/openchamber-doom
```

This is a private repo, so the OpenChamber server needs your existing Git HTTPS credentials (as for Arcade). Or add the source folder `/workspace/projects/openchamber-doom`. Enable **DOOM** in the Work Status section chooser if hidden.

There is no service, backend, external origin, capability request, or LLM usage.


## Features

- **Collapsed by default.** OpenChamber does not load this section's iframe until expanded.
- **Engine loads on Play, not on opening Work Status.** A small launcher is visible first.
- **Silent**: no audio backend, audio capture, or network permissions.
- **Eco settings:** 10, 15 (default), 25 or 35 game ticks per second. In the lower modes, the game is deliberately slower than normal; virtual game time advances only one original DOOM tick per update. This is a genuine reduction in the amount of simulation work, not merely dropping draw frames.
- **Pauses fully** on browser tab hidden, loss of focus, or Pause. Exiting frees engine references; collapsing unloads the entire iframe.
- Displays a **320 × 200** nearest-neighbor pixelated canvas. The unmodified upstream engine still software-renders internally at **640 × 400**; downsampling reduces JavaScript pixel-transfer work, *not* engine rendering work. The CPU mode reduces simulation frequency instead.
- A live **ms/tick** counter measures actual game-loop processing time (not total CPU utilization).

Controls: click canvas to focus; WASD or arrow keys move/turn; Ctrl or F shoot; Space or E use; Shift run; Q/R strafe; Escape menu; P pauses. Touch buttons appear on narrow screens. Savegames are not implemented.


## Rebuilding

```sh
bun install
bun run build
bun run check
bun test
```

The shipped `status/main.js` and `status/assets/doom-packed.js` are already compiled. End users do **not** need Bun or any build steps.

`status/assets/doom-packed.js` is generated using `node scripts/pack-engine.mjs status/assets/doom.wasm`. The raw `.wasm` is intentionally gitignored because OpenChamber's guest-file server only serves HTML/JS/CSS/JSON/SVG/PNG; the gzipped base64 JavaScript asset is lazily loaded with the extension's scoped URL token. It requires browser support for `DecompressionStream('gzip')`.


## Upstream licenses / third-party content

The included WebAssembly binary is unmodified **[jacobenget/doom.wasm v0.1.0](https://github.com/jacobenget/doom.wasm/releases/tag/v0.1.0)**, SHA-256 `8edfe49a7583fd975199969302d8e9adcf8e714d0af72bf3e672f991fd810faa`. Its source is at [jacobenget/doom.wasm](https://github.com/jacobenget/doom.wasm). The original Doom source and this upstream project include GPLv2-licensed code; see `LICENSE-ENGINE`.

**Important:** that binary includes id Software's original **DOOM shareware episode** game data. This is not Freedoom and not the commercial full game. The embedded shareware game data is not open-source; distribution remains subject to the game's original shareware terms. No proprietary full-game content has been added. The locally written TypeScript, HTML, CSS and packaging script are separate from the unmodified upstream engine.

OpenChamber is a trademark of its respective maintainers; Doom is a trademark of its owners. This is a personal extension, not an official integration.
