# DOOM for OpenChamber

Run the original **DOOM (1993) shareware episode** inside OpenChamber.

<p align="center">
<img width="90%" alt="OpenChamber DOOM screenshot" src="https://github.com/user-attachments/assets/290d81d0-0e72-45db-9711-9a8758562384" />
</p>

A lightweight, silent Work Status extension styled to match [OpenChamber Arcade](https://github.com/chaosmanage/openchamber-arcade).

## Install

Open **Settings → Extensions** in OpenChamber and add:

```text
https://github.com/chaosmanage/openchamber-doom
```

If already installed, update it manually using the extension updater. Enable **DOOM** in the Work Status section chooser if hidden. The repository is public and the built files are included; no build tools are needed to install it.

## Included game

This extension runs the **original DOOM shareware** data embedded in the WebAssembly engine, not Freedoom.

- **Episode 1: Knee-Deep in the Dead**, with nine original levels (eight regular and one secret map).
- Original shareware maps, enemies, graphics, and weapons.
- No other original DOOM episodes and no savegame persistence.
- The shareware WAD is bundled inside the upstream `doom.wasm` engine; no additional WAD is downloaded or loaded.

## Features

- **Collapsed by default**; the engine loads only after **Play**.
- **Silent:** no audio, service, external origin, or requested capabilities.
- **CPU modes:** 10, 15 (default), 25, or 35 ticks per second. Lower modes intentionally slow game time to reduce CPU work.
- **Pause on hide/focus loss**; no game ticks or rendering while paused. Exiting the game releases engine references.
- **320 × 200 nearest-neighbor canvas**, downsampled from the engine's internal 640 × 400 software framebuffer.
- **ms/tick** processing-time indicator (not total CPU utilization).
- **Touch controls:** movement arrows, Fire, Use, **Enter** (select menu item), and Menu (Escape). Brief taps are held through a game tick, including in Eco mode.

**Keyboard controls:** click the canvas to focus; WASD/arrow keys move or navigate, Ctrl/F fires, Space/E opens doors, Enter confirms a menu selection, Escape opens/closes the in-game menu, Shift runs, Q/R strafe, P pauses the extension. Touch controls appear on narrow screens.

## Build and test

```sh
bun install
bun run build
bun run check
bun test
bunx tsc --noEmit
```

`status/main.js` and `status/assets/doom-packed.js` are committed, so the package does not build code on installation.

To regenerate the engine asset from the verified upstream `doom.wasm`, run:

```sh
node scripts/pack-engine.mjs status/assets/doom.wasm
```

The raw WebAssembly file is ignored by Git. OpenChamber serves the gzipped/base64 engine through an extension-local JavaScript asset, which is lazily loaded with an authenticated asset token. The browser must support `DecompressionStream('gzip')`.

## Upstream license and content

The bundled engine is unmodified [jacobenget/doom.wasm v0.1.0](https://github.com/jacobenget/doom.wasm/releases/tag/v0.1.0), SHA-256 `8edfe49a7583fd975199969302d8e9adcf8e714d0af72bf3e672f991fd810faa`. The engine source contains GPLv2-licensed code; see `LICENSE-ENGINE` and the [upstream source](https://github.com/jacobenget/doom.wasm).

**The engine embeds the original id Software DOOM shareware WAD.** Shareware game data is *not* open source and remains subject to its original distribution terms. This extension does not include the paid game's content.

OpenChamber and DOOM are trademarks of their respective owners. This is an independent personal extension.
