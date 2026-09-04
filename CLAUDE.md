# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo root (`AuroraAugmented`) currently contains a single active app, `AuroraTypewriterAscii/` (a Nuxt 4 project, using the `app/` directory convention — `pages/`, `components/`, `layouts/`, `assets/`, and `app.vue` all live under `AuroraTypewriterAscii/app/`; `server/`, `public/`, `content/`, `content.config.ts`, `i18n/`, and `nuxt.config.ts` stay at the project root). All commands below must be run from `AuroraTypewriterAscii/`, not the repo root. A `patentsPens.csv` at the repo root is a duplicate of `AuroraTypewriterAscii/app/assets/patentsPens.csv`.

## Node version

Requires **Node ^24.11.0** (pinned in `package.json`'s `engines` field — this is Nuxt 4.5.2's real floor, not a round-number choice). There is deliberately no `.nvmrc` (it previously conflicted with Netlify's own Node version resolution on other projects). If using `nvm` locally, run `nvm use 24` before any `npm`/`nuxt` command — note that this only affects the current shell, so in a non-interactive tool session each command needs `nvm use 24 && ...` prefixed rather than relying on it persisting.

## Commands

Run from `AuroraTypewriterAscii/`:

```bash
npm install       # npm is the sole package manager — no pnpm-lock.yaml
npm run dev       # dev server at http://localhost:3000
npm run build     # production build
npm run generate  # static site generation
npm run preview   # preview a production build locally
```

There is no lint or test script configured in this project yet.

### Browser testing (Playwright)

`playwright` is a devDependency so browser automation (e.g. visually checking a dev-server change) resolves a pinned local version instead of `npx` hitting the npm registry each time. Browser binaries themselves (Chromium, WebKit, etc.) are **not** stored per-project — Playwright caches them once per machine at `~/Library/Caches/ms-playwright` (macOS), shared across every project. On this machine that cache is already populated, so no extra install step is needed here; on a fresh machine/CI, run `npx playwright install chromium` once after `npm install`.

One standalone data-prep script lives outside the Nuxt build: `contentParser/parseTable.js` parses `app/assets/patentsPens.csv` (patent-text "pen name" source data) into `app/assets/parsed_patents.json` via regex. It uses relative paths (`../assets/...`), so run it with `node parseTable.js` from inside `contentParser/`.

A second standalone script, `fontDensity/buildCharDensity.js`, generates `app/utils/charDensity.ts` (the char→grayscale lookup used by the ASCII conversion pipeline — see "Planned: font-based char→grayscale density mapping" below). It reads `fontDensity/fonts/Lekton-Regular.ttf` and the char list in `fontDensity/charSets.js`, and depends on `@napi-rs/canvas` (glyph rasterization) and `fontkit` (glyph-existence checks), both devDependencies. Run it with `node buildCharDensity.js` from inside `fontDensity/`; rerun whenever the font, char set, or measurement constants change — the output file is generated, not hand-edited.

## Architecture

The app is a "Guitar Hero"-style typing trainer: it converts an image into ASCII art, then dictates that ASCII sequence one character at a time by animating falling notes toward a keyboard, so a user can reproduce the image by typing on a real typewriter.

Stack: Nuxt 4 / Vue 3, Tailwind CSS v4, **Nuxt UI** (`@nuxt/ui` — replaced `shadcn-nuxt`; auto-registers `@nuxt/icon`, `@nuxt/fonts`, and `@nuxtjs/color-mode`, so those are never listed explicitly in `nuxt.config.ts`'s `modules`), p5.js for canvas/sketch rendering, Tone.js for audio feedback. `@nuxt/content` and `@nuxtjs/i18n` are installed as minimal scaffolds (see below) with no real usage yet — they exist for future work, not because any current page depends on them.

Icons render via `@nuxt/icon`'s local server-bundle mode, which needs the icon collections available as local packages rather than fetched from the Iconify API at runtime — `@iconify-json/mdi` and `@iconify-json/lucide` are installed as devDependencies for this (the app uses `mdi:*` icons directly and Nuxt UI's own components use `lucide:*` icons internally, e.g. the `USelect` chevron). A `[Icon] failed to load icon` console warning can still appear from a secondary/legacy code path inside `@nuxt/icon` even when the icon renders correctly — this is cosmetic noise, not a rendering failure (confirmed visually).

### Core pipeline and component roles

- **`app/components/nuxt-p5.vue`** — generic wrapper that client-only-imports `p5` and mounts a sketch function (passed as the `sketch` prop) into a container div. Every p5-based component below renders through this wrapper.
- **`app/components/imgToAsciiText.vue`** (and the earlier canvas-only variant `imgToAscii.vue`) — loads an image from `/img/gallery/<imgSrc>`, samples pixel brightness via p5, and maps brightness to a character from the `densityChars` ramp to build the ASCII art string; emits it via `asciiImage`.
- **`app/components/keyboard.vue`** — renders a custom accented-keyboard layout (`keys_lower`/`keys_upper` grids). After mount, it computes the pixel x/y/width of each key needed to type the current `densityChars` set and emits that position array via `getKData`. This position data is what lets other components know where on screen each character "lives" on the keyboard. Still powers `play.vue`/`playResponsive.vue`; left untouched while its successor (`keyboardEvo.vue`, below) is validated elsewhere — only gets retired once that's confirmed good.
- **`app/components/keyboardEvo.vue`** — the in-progress replacement for `keyboard.vue`, built on the unified keyboard layout data model described in "Keyboard layout data model" below instead of `keyboard.vue`'s two parallel character grids. Same external role (renders the layout, emits `getKData` position data — payload is backward-compatible with `keyboard.vue`'s, with a `type` field added), plus new features `keyboard.vue` never had: fluid `@container`/`clamp()`-based sizing (no more `isCompact` two-state toggle), and an `editMode` that turns `type: 'char'` keys into single-char `<input>`s emitting `update:layout`. Currently wired into `app/pages/index.vue`'s keyboard placeholder (with a preset `USelect` + edit-mode toggle owned by that page), not into `play.vue`/`playResponsive.vue`.
- **`app/components/guitarHero.vue`** — given the target ASCII string and the keyboard position data (`keys_data`), runs a p5 sketch that spawns a falling "note" particle per upcoming character, sized/positioned to the matching key's x-location (Guitar Hero note-highway style). When a particle reaches the hit line it emits `updateCount` (to advance playback) and is meant to trigger a Tone.js pentatonic synth note. Only consumes `keyboard.vue`'s `keys_data` today — not wired to `keyboardEvo.vue` yet; still matches the shift key by literal `key === '⬆'`, which is why `keyboardEvo.vue` keeps emitting that same literal-keyed entry for compatibility.
- **`app/components/asciiMatrix.vue`** — renders the full target ASCII art as a grid of `<span>`s, highlighting characters up to the current play position (visual progress/preview).
- **`app/components/remote.vue`** — play/pause/rewind/step-backward transport controls.
- **`app/pages/play.vue`** (currently duplicated verbatim in `app/pages/playResponsive.vue`, which is the in-progress responsive/mobile pass) — the main screen; wires AsciiMatrix + remote + GuitarHero + Keyboard together around shared `playMode`/`playCount` state. It currently uses a hardcoded ASCII art string rather than consuming `ImgToAsciiText`'s output — the image-upload-to-playback pipeline isn't connected end to end yet.
- **`app/pages/index.vue`** — the in-progress home screen rebuild (a paper-and-typewriter mockup composed from `app/components/home/*` and `app/components/customUi/*`), incrementally wired up with real components (`HomeImageSelect`, `HomeAsciiSettings`, and now `KeyboardEvo` in the keyboard placeholder). Not yet connected to `GuitarHero`/`AsciiMatrix`/playback.
- **`app/pages/playground.vue`** — earlier prototype for the image → ASCII step (canvas rendering, textarea + copy-to-clipboard). Uses Nuxt UI's `USelect` (migrated from shadcn's `Select`) as a reference example for how to use Nuxt UI form components in this codebase.
- **`app/pages/wireframe.vue`** — a static Tailwind mockup (no logic) sketching a mobile-first layout for the play screen.
- **`server/`** — no directory currently exists; no API routes are implemented yet (the old `tsconfig.json` stub that used to live here was removed as part of the Nuxt 4 upgrade, since Nuxt now auto-generates `.nuxt/tsconfig.server.json`).
- **`content.config.ts`** / **`content/`** — minimal `@nuxt/content` scaffold: one `content` collection (`type: 'page', source: '**/*.md'`) and a single placeholder `content/index.md`. Uses `better-sqlite3` as the database adapter. No page queries this collection yet.
- **`i18n/locales/en.json`** — minimal `@nuxtjs/i18n` scaffold: a single `en` locale with `strategy: 'no_prefix'` (routes are never locale-prefixed) and one placeholder message key (`welcome`). No page calls `$t()`/`useI18n()` yet.

### Key convention: `densityChars` must stay in sync

The `densityChars` string (e.g. `'Ñ@#W$9876543210?!abc;:+=-,._ '` or the in-game `'Wwli:,. '`) is passed to multiple components and must be identical across all of them for a given screen:

1. `ImgToAsciiText` uses it as the brightness-to-character ramp when generating the ASCII art.
2. `Keyboard` (or `KeyboardEvo`) uses it to compute which keys are in play and their screen positions (`keys_data`).
3. `GuitarHero` checks character membership in this same string to decide whether a landed particle counts as a "hit".

Passing mismatched `densityChars` to these components will desync note positions from actual keyboard layout.

### Font-based char→grayscale density mapping

`app/utils/charDensity.ts` is generated (see `fontDensity/buildCharDensity.js` above) rather than hand-picked: each char is rasterized in **Lekton** (the reference typewriter font) and scored by average luminance (ink coverage) across the glyph cell, not a hard brightness threshold — an anti-aliased raster's per-pixel value already approximates supersampled area-coverage, the closest computable proxy for how much ink a physical strike would leave. Rendered at 4x supersampling per glyph. Raw averages are then linearly stretched so the darkest measured glyph anchors to 0 while blank/space stays pinned at 255, and exported dark→light (`charDensity` object insertion order and the derived `densityChars` string).

The candidate char list (`fontDensity/charSets.js`) is scoped to real physical typewriter keyboard layouts, not to Lekton's full glyph inventory — union of QWERTY (US/UK), QWERTZ (DE/AT/CH), AZERTY (FR/BE), plus Italian/Spanish/Portuguese/Scandinavian variants, Latin script only. Modern fonts carry far more glyphs than any mechanical typewriter had; the set stays anchored to what a real machine could type. Each char is checked against Lekton's actual cmap via `fontkit` before rasterizing (skipped + logged if absent) so a missing glyph can't silently rasterize as a `.notdef`/tofu box and corrupt that character's value — as it happens, Lekton covers this entire char list, so nothing is currently skipped and no fallback font has been needed.

This generated char set is intentionally **not** reconciled against today's `keyboard.vue` (`keys_lower`/`keys_upper` are considered too limited for this) — see "Keyboard layout data model" below, which is where that reconciliation is actually happening.

### Image → ASCII conversion: two pipelines

Two independent image→ASCII implementations currently coexist:

- **Legacy pipeline** — `app/components/imgToAsciiText.vue` / `imgToAscii.vue`, used by `play.vue`/`playResponsive.vue` and `playground.vue`. Deliberately simple: `p5`'s own `img.resize()` to the target grid, then 1:1 point-sampling (one source pixel per output cell, no averaging), brightness = plain `(r+g+b)/3`, linearly mapped to a `densityChars` index. Output height comes only from the raw image aspect ratio. No dithering, no typewriter pitch/line-spacing awareness.
- **Typewriter-aware pipeline** — `app/utils/imageToTypewriterAscii.ts`, orchestrating `typewriterGeometry.ts` → `imageSampling.ts` → `luminance.ts` → `toneAdjust.ts` → `shadeRamp.ts` → `atkinsonDither.ts`, wired reactively via `app/composables/useImageAsciiConverter.ts` + `useImageFileLoader.ts` into `app/pages/imgToAscii.vue` (knobs: `charsPerLine`, `pitch`, `lineSpacing`, `keyboardLayout`, `maxShades`, a hand-editable shade-ramp override, `brightness`/`contrast`/`autoLevels`). This is the pipeline described below; it has not yet replaced the legacy one on the play screens.

**Typewriter pitch and line spacing** (`typewriterGeometry.ts`) model the two physical spacing dials a real typewriter has — independently, because a monospace char cell is not square. `CharPitch` (`pica`/`pica-lite`/`elite`) maps to 10/11/12 characters-per-inch; `LineSpacing` (`single`/`1.5`/`double`) maps to 6/4/3 lines-per-inch. `charCellAspectRatio(pitch, spacing)` = physical char-width-inches ÷ line-height-inches. `computeRowCount()` uses that ratio plus the source image's aspect ratio to derive how many output *rows* a fixed `charsPerLine` needs, so the printed character block (not a naive square-cell grid) preserves the source image's real proportions.

**Sampling** (`imageSampling.ts`) is a box-filter/supersample average, not point-sampling: each output cell averages a `supersample × supersample` grid of source pixels (default 4×4 = 16 samples). Because `rows` was already derived non-square by `computeRowCount`, the per-cell source box ends up non-square in the right proportion automatically — `sampleGrid()` itself stays generic and doesn't need to know about pitch/line-spacing at all.

**Luminance** (`luminance.ts`) uses Rec. 709 coefficients by default (Rec. 601 kept as an alternative), applied directly to gamma-encoded sRGB values rather than linearizing first — intentionally consistent with how `fontDensity/buildCharDensity.js` measures glyph ink-coverage, and the difference is swamped by the later few-shade quantization anyway.

**Tone adjustment** (`toneAdjust.ts`) optionally auto-levels first (linear stretch so the grid's own min→0 and max→255), then layers manual brightness/contrast (-100..100) on top.

**Shade ramp** (`shadeRamp.ts`) scopes `densityChars` down to only the characters actually available on the selected keyboard layout (via `keyboardLayouts/layoutChars.ts`'s `getLayoutDensityChars`), then picks at most `maxShades` entries spaced evenly across the *density value range* (not evenly by ordinal position) — even spacing by value matters for how well the ditherer's error diffusion behaves.

**Dithering** (`atkinsonDither.ts`) is an N-level generalization of Atkinson error diffusion: standard binary Atkinson (2 levels) generalized to an arbitrary shade count by diffusing each pixel's quantization error against the chosen shade's actual density *value* rather than its ordinal index. Same 6-neighbor offset pattern as classic Atkinson, each carrying 1/8 of the error (3/4 total propagated, 1/4 deliberately discarded — Atkinson's signature trait vs. Floyd–Steinberg, which propagates all of it). Floyd–Steinberg and hard-threshold quantization are not implemented anywhere in this codebase.

**Display-side aspect correction** is a separate concern from sampling: `app/components/home/AsciiImageHolder.vue` reuses `charCellAspectRatio()` to derive CSS line-height/font-size/letter-spacing at render time, so the ASCII text visually reproduces the selected pitch/line-spacing's real proportions in a monospace font whose glyphs are narrower than their cell (`CHAR_WIDTH_RATIO = 0.5`, Lekton's measured glyph-width-to-font-size ratio — the gap is filled with letter-spacing, not glyph stretching, to avoid distortion).

### Keyboard layout data model

`keyboard.vue`'s `keys_lower`/`keys_upper` are two parallel `[row][col]` character grids kept in sync only by matching index, with control keys (`←`, `⬆`, `⬇`, `↑`, `¶`) smuggled in as literal sentinel characters that are *both* the data and the rendered glyph. `keyboardEvo.vue` (see above) replaces that with a unified per-key object model, defined in `app/utils/keyboardLayouts/types.ts`:

```ts
type KeyType = 'char' | 'backspace' | 'shiftToggle' | 'shiftHold' | 'spacer' | 'space'
interface KeyDef { type: KeyType; lower?: string; upper?: string; glyph?: string }
type KeyRow = KeyDef[]
type KeyboardLayout = KeyRow[]  // last row is always the spacebar row: [{ type: 'space' }]
```

One `KeyDef` per physical key holds both cases (`lower`/`upper`, for `type: 'char'`) or a fixed `glyph` (for the control types) — no more matching two arrays by index, and non-editability/coloring/behavior key off `type` instead of string-matching against a literal char list. Note `shiftToggle` appears twice per layout (once per physical shift key, e.g. `⬆` and `⬇` in `spanish`) with a fixed `glyph` each — the two keys don't dynamically swap glyphs with case, they're just two separate keys.

Presets live in `app/utils/keyboardLayouts/`, one file per named layout, registered in `app/utils/keyboardLayouts/index.ts`'s `presets` map. Layout names match `fontDensity/charSets.js`'s `layouts` keys so the two systems stay aligned — including the Nordic split described there (`danishNorwegian`/`swedishFinnish` instead of one merged `scandinavian`, since those two locale groups put different accented letters on the same physical keys). Populated so far: `spanish` (`keyboard.vue`'s original hardcoded layout, hand-converted into the new shape — the Spain market standard, including `ñ/Ñ` and the missing dedicated 1/0 keys, an authentic mechanical-typewriter trait), `qwertyUS`, `qwertyUK`, `qwertzDE`, `azertyFR`, `italian`, `portuguese`, `danishNorwegian`, `swedishFinnish`. All nine share the exact control-key glyphs and slot positions from `spanish` (backspace `←`, shiftHold `↑`, shiftToggle `⬆`/`⬇`) — only the `char` keys vary per locale. Each is a first draft based on the modern national standard keyboard (not verified against a real mechanical typewriter) meant to be hand-corrected via `keyboardEvo.vue`'s `editMode`, per the same "not fabricated as final" caution as `spanish`. Remaining follow-up: `qwertzAT`, `qwertzCH`, `azertyBE` — each just a new data file plus one registry entry, no code changes.

`app/pages/index.vue` owns preset *selection* (the `USelect` + `editMode` toggle + the `custom` working-copy state when a key gets edited) — `keyboardEvo.vue` itself just renders whatever `layout` it's given and emits edits, it doesn't know about presets.
