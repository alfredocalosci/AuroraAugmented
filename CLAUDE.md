# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo root (`AuroraAugmented`) currently contains a single active app, `AuroraTypewriterAscii/` (a Nuxt 3 project). All commands below must be run from that subdirectory, not the repo root. A `patentsPens.csv` at the repo root is a duplicate of `AuroraTypewriterAscii/assets/patentsPens.csv`.

## Commands

Run from `AuroraTypewriterAscii/`:

```bash
npm install      # or pnpm install — both package-lock.json and pnpm-lock.yaml are present
npm run dev       # dev server at http://localhost:3000
npm run build     # production build
npm run generate  # static site generation
npm run preview   # preview a production build locally
```

There is no lint or test script configured in this project yet.

One standalone data-prep script lives outside the Nuxt build: `contentParser/parseTable.js` parses `assets/patentsPens.csv` (patent-text "pen name" source data) into `assets/parsed_patents.json` via regex. It uses relative paths (`../assets/...`), so run it with `node parseTable.js` from inside `contentParser/`.

## Architecture

The app is a "Guitar Hero"-style typing trainer: it converts an image into ASCII art, then dictates that ASCII sequence one character at a time by animating falling notes toward a keyboard, so a user can reproduce the image by typing on a real typewriter.

Stack: Nuxt 3 / Vue 3, Tailwind CSS v4, shadcn-vue (`components/ui`, "new-york" style, stone base color — see `components.json`), p5.js for canvas/sketch rendering, Tone.js for audio feedback.

### Core pipeline and component roles

- **`components/nuxt-p5.vue`** — generic wrapper that client-only-imports `p5` and mounts a sketch function (passed as the `sketch` prop) into a container div. Every p5-based component below renders through this wrapper.
- **`components/imgToAsciiText.vue`** (and the earlier canvas-only variant `imgToAscii.vue`) — loads an image from `/img/gallery/<imgSrc>`, samples pixel brightness via p5, and maps brightness to a character from the `densityChars` ramp to build the ASCII art string; emits it via `asciiImage`.
- **`components/keyboard.vue`** — renders a custom accented-keyboard layout (`keys_lower`/`keys_upper` grids). After mount, it computes the pixel x/y/width of each key needed to type the current `densityChars` set and emits that position array via `getKData`. This position data is what lets other components know where on screen each character "lives" on the keyboard.
- **`components/guitarHero.vue`** — given the target ASCII string and the keyboard position data (`keys_data`), runs a p5 sketch that spawns a falling "note" particle per upcoming character, sized/positioned to the matching key's x-location (Guitar Hero note-highway style). When a particle reaches the hit line it emits `updateCount` (to advance playback) and is meant to trigger a Tone.js pentatonic synth note.
- **`components/asciiMatrix.vue`** — renders the full target ASCII art as a grid of `<span>`s, highlighting characters up to the current play position (visual progress/preview).
- **`components/remote.vue`** — play/pause/rewind/step-backward transport controls.
- **`pages/play.vue`** (currently duplicated verbatim in `pages/playResponsive.vue`, which is the in-progress responsive/mobile pass) — the main screen; wires AsciiMatrix + remote + GuitarHero + Keyboard together around shared `playMode`/`playCount` state. It currently uses a hardcoded ASCII art string rather than consuming `ImgToAsciiText`'s output — the image-upload-to-playback pipeline isn't connected end to end yet.
- **`pages/index.vue`** / **`pages/playground.vue`** — earlier prototypes for the image → ASCII step (canvas rendering, textarea + copy-to-clipboard).
- **`pages/wireframe.vue`** — a static Tailwind mockup (no logic) sketching a mobile-first layout for the play screen.
- **`server/`** — only a `tsconfig.json` stub exists; no API routes are implemented yet.

### Key convention: `densityChars` must stay in sync

The `densityChars` string (e.g. `'Ñ@#W$9876543210?!abc;:+=-,._ '` or the in-game `'Wwli:,. '`) is passed to multiple components and must be identical across all of them for a given screen:

1. `ImgToAsciiText` uses it as the brightness-to-character ramp when generating the ASCII art.
2. `Keyboard` uses it to compute which keys are in play and their screen positions (`keys_data`).
3. `GuitarHero` checks character membership in this same string to decide whether a landed particle counts as a "hit".

Passing mismatched `densityChars` to these components will desync note positions from actual keyboard layout.
