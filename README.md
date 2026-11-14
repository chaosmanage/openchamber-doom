# Freedoom Phase 1 for OpenChamber

Run Freedoom Phase 1 inside OpenChamber.

<p align="center">
<img width="90%" alt="OpenChamber Doom screenshot" src="https://github.com/user-attachments/assets/290d81d0-0e72-45db-9711-9a8758562384" />
</p>

A zero-service **Freedoom Phase 1** extension for OpenChamber's **Work Status** section, styled to match [OpenChamber Arcade](https://github.com/chaosmanage/openchamber-arcade).

The extension uses the same software-rendered WebAssembly Doom engine as before, but **loads Freedoom Phase 1 v0.13.0 as its IWAD** instead of using the engine's bundled shareware episode. The WAD contains **four episodes with nine map slots each (36 maps, including secret levels)**. Only Phase 1 is installed; there is no Phase 2 selector.

## Features

- **Collapsed by default.** The game engine and WAD load only after you expand the section and press **Play**.
- **Silent**, fully offline after installation; no background service, network permissions, or LLM usage.
- **Low-resource modes:** 10, 15 (default), 25, or 35 engine calls per second. Modes below 35 deliberately slow game time, reducing CPU work rather than merely skipping display frames.
- **Pause on browser tab hide/loss of focus**, with game ticks suspended. Leaving the game releases its engine references; collapsing the section unloads its iframe.
- **320×200 nearest-neighbor canvas**, downsampled from the unmodified engine's internal 640×400 software-rendered framebuffer. No GPU 3D pipeline.
- On-screen **ms/tick** processing-time indicator (not a system-wide CPU monitor).
- **Touch D-pad** plus Fire, Use, **Enter** (menu select), and **Menu** (Escape) buttons for narrow screens. Brief taps stay active through a game tick so that low-tick-rate modes register them.

**Keyboard controls:** click the game canvas to focus; arrow keys / WASD navigate and move; **Enter** selects menu options; **Escape** opens or closes the in-game menu; Ctrl / F shoots; Space / E uses or opens doors; Shift runs; P pauses the extension. Touch controls appear on screens narrower than 520px.

**Limitations:** No savegames; closing the game resets progress. The larger Phase 1 WAD increases initial load time and memory usage compared with the original shareware-only extension: the WAD is approximately **28.8 MB raw** / **14 MB packaged as JS**. CPU cost while playing still depends on map complexity and chosen tick mode.

## Install and update

Add the public repository from **Settings → Extensions**:

```
https://github.com/chaosmanage/openchamber-doom
```

If already installed, update it manually using OpenChamber's extension updater. Alternatively, add the local source folder `/workspace/projects/openchamber-doom`.

A `git push` updates the repository but **does not automatically update your installed extension**.

## Build and test

```sh
bun install
bun run build
bun run check
bun test
bunx tsc --noEmit
```

Built `status/main.js`, `status/assets/doom-packed.js`, and `status/assets/freedoom1-packed.js` are committed so installing requires no build tools.

**Repack from the upstream artifacts (maintainer only):**

```sh
node scripts/pack-engine.mjs status/assets/doom.wasm
bun run pack:wad
```

The packers SHA-256 verify the upstream files. Raw `.wasm` and `.wad` files are gitignored; OpenChamber's package-file server serves `.js` but not raw `.wasm` / `.wad`. Gzipped/base64 assets are dynamically loaded from the extension's own authenticated asset route only after Play, then unpacked using browser `DecompressionStream('gzip')`.

## Upstream assets and licensing

- **Freedoom Phase 1 v0.13.0:** [official release](https://github.com/freedoom/freedoom/releases/tag/v0.13.0), `freedoom1.wad` SHA-256 `7323bcc168c5a45ff10749b339960e98314740a734c30d4b9f3337001f9e703d`. Its content license is reproduced in `LICENSE-FREEDOOM` (BSD-style).
- **Doom WebAssembly engine v0.1.0:** [upstream source](https://github.com/jacobenget/doom.wasm), [release](https://github.com/jacobenget/doom.wasm/releases/tag/v0.1.0), SHA-256 `8edfe49a7583fd975199969302d8e9adcf8e714d0af72bf3e672f991fd810faa`. The engine is unmodified, with GPLv2-licensed code; see `LICENSE-ENGINE`. **The binary still embeds the original id Software shareware WAD as its fallback, but this extension explicitly loads Freedoom instead.** The embedded shareware data remains under its original distribution terms.

OpenChamber and Doom are trademarks of their respective owners. This is an independent personal project.
