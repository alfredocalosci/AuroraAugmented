<template>
  <div class="min-h-screen bg-olivetti-slate dark:bg-olivetti-yellow text-olivetti-black dark:text-olivetti-black">

    <!--
      Layout schema translated from layout_phone.svg / layout_tablet.svg / layout blocks.svg.

      One template, not one-per-breakpoint: each <section> below is its own full-bleed
      "row" grid — [gutter | content | gutter] — reused at every breakpoint with the
      same responsive grid-cols. Row height is never set directly; it's whatever the
      content column needs, and grid's default item-stretch makes the gutter/background
      divs (which have no content of their own) match that height automatically. Content
      column width: 100% on mobile (no gutters), 90% on tablet, a fixed 691.2px on
      desktop (= 90% of the 768px tablet breakpoint, per spec, not a fluid value).

      Colors are the schema's literal hex values, not the app's mist/TYPEWRITER_COLORS
      palettes (different concern). The desktop side panel is `fixed`, not a grid column,
      since it needs to stay pinned to the viewport height regardless of how tall the
      stacked rows end up — see its own comment below.
    -->

    <!-- side panel ("layer block"): pinned to the viewport, not part of any row -->
    <div class="hidden lg:block fixed inset-y-0 left-0 w-80 py-6 z-10">
      <div class="h-full w-full bg-olivetti-shade-10 rounded-r-[20px] shadow-2xl">
        <article class="p-6">
          <p>side panel</p>
        </article>
       
      </div>
    </div>

    <!-- paper: ascii display -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_75%_1fr] lg:grid-cols-[6fr_72px_496px_72px_1fr] md:bg-olivetti-yellow dark:bg-olivetti-shade-20">

      <div class="hidden md:flex lg:col-start-2 lg:col-span-1 bg-olivetti-yellow dark:bg-olivetti-shade-20 items-end ">
        <div class="bg-olivetti-shade-40 h-12 w-full rounded-tl-2xl lg:rounded-tl-full"></div>
      </div>
      
      <!-- max-w-124 mx-auto -->
      <div class="md:col-start-2 lg:col-start-3 bg-white px-4 mt-0 pb-6 md:mt-6 shadow-2xl ">
         <div class=" px-3  mt-6 mb-8">
            <header class="flex items-center justify-between ">
              <p class="font-display font-normal tracking-wide text-lg/4">Type <span class="text-olivetti-shade-30">by</span> tune <span class="font-bold text-olivetti-red text-xl">.</span><br/>
              <span class="text-xs text-olivetti-shade-30">your typewriter image generation assistent</span></p>
              <UColorModeButton size="xl"/>
            </header>
        </div>

        <div class=" my-6">
          <HomeAsciiImageHolderNeo
              :ascii-image-string="asciiImageString"
              :columns-width="columnsWidth"
              :rows-height="rowsHeight"
              :play-mode="playMode"
              :play-count="playCount"
              :line-index="lineIndex"
              :row-index="rowIndex"
              :char-pitch="charPitch"
              :line-spacing="lineSpacing"
          />
        </div>

        <!-- image selection holder -->
        <CustomUiAccordion :is-open="showSettings.image">
          <div class=" px-4 py-2 text-xs min-h-32 rounded-t-2xl bg-olivetti-shade-10/50">
            <HomeImageSelectNeo
                :raster-img-url="rasterImgUrl"
                :ascii-source="asciiSource"
                @select-default="onSelectDefault"
                @update:raster-img-file="onRasterImgFileUpdate"
            />
          </div>
        </CustomUiAccordion>

        <!-- double split bg trick -->
        <CustomUiAccordion :is-open="playMode === 'idle'">
        <div class="w-full h-12 relative ">

          <div class="h-6 w-full transition duration-200"
            :class="showSettings.image ? 'bg-olivetti-shade-10/50' : 'bg-white'"></div>
          <div
            class="h-6 w-full transition duration-200"
            :class="showSettings.ascii ? 'bg-olivetti-shade-10/50' : 'bg-white'"
          ></div>

          <div class="absolute inset-0 h-12 rounded-full px-4 md:px-6 bg-olivetti-shade-10">
           
            <div class="flex items-center justify-between h-full w-full">
              <!-- dummy ascii image editor buttons -->
              <div>
                <button
                  class="cursor-pointer w-12 h-12 pt-2"
                >
                <UIcon
                  name="i-lucide-text-cursor"
                  class="size-7 text-mist-700"
                />
              </button>

              <button
                  class="cursor-pointer w-12 h-12 pt-2"
                >
                <UIcon
                  name="i-lucide-grip"
                  class="size-7 text-mist-700"
                />
              </button>
              </div>
              <div><AppSettingsNeo /></div>
           </div>
          </div>

        
        </div>
        </CustomUiAccordion>

         <!-- image to ascii options holder -->
        <CustomUiAccordion :is-open="showSettings.ascii">
          <div class="p-4 rounded-b-2xl bg-olivetti-shade-10/50">
            <AsciiSettingsNeo
              v-model:shade-chars="shadeChars"
              v-model:num-shade-chars="numShadeChars"
              v-model:columns-width="columnsWidth"
              v-model:img-brightness="imgBrightness"
              v-model:img-contrast="imgContrast"
              v-model:auto-levels="autoLevels"
              :available-chars="availableChars"
            />
          </div>
        </CustomUiAccordion>

      </div>

      <div class="hidden md:flex lg:col-start-4 lg:col-span-1 bg-olivetti-yellow dark:bg-olivetti-shade-20 items-end">
        <div class="bg-olivetti-shade-40 h-12 w-full rounded-tr-2xl lg:rounded-tr-full"></div>
      </div>

    </section>

    <!-- keyboard / guitar hero -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_75%_1fr] lg:grid-cols-[6fr_72px_496px_72px_1fr] md:bg-olivetti-shade-40 lg:bg-olivetti-sage lg:dark:bg-olivetti-shade-30">

      <!-- desktop only: the dark band narrows to content+right-gutter, leaving the
           left gutter (behind the side panel) showing the green section background -->
      <div class="hidden lg:block lg:col-start-2 lg:col-span-2 bg-olivetti-shade-40 rounded-bl-xl"></div>

      <div class="hidden lg:block lg:col-start-2 lg:col-span-1 bg-olivetti-shade-40 rounded-bl-xl"></div>

      <!-- rounded-b-3xl -->
      <div class="md:col-start-2 lg:col-start-3 bg-olivetti-shade-10 dark:bg-olivetti-shade-50 px-4 lg:px-4 flex flex-col ">

        <!--
          guitar hero note-highway (back) + keyboard (front, height unset).

          The back svg is `absolute inset-0` on the `relative` wrapper below, so
          its box (and therefore the rect filling it at w-full h-full) always
          spans the wrapper's FULL height — including the part directly behind
          the keyboard — rather than a fixed height that could fall short of
          wherever the keyboard's own (content-driven) bottom edge ends up.

          The wrapper's actual height comes from its normal-flow children only
          (absolutely-positioned elements don't contribute to it): the "peek"
          spacer (h-56, how much svg shows above the keyboard) plus the keyboard
          box itself. So back = spacer + keyboard, exactly matching keyboard's
          bottom by construction, no matter how tall the keyboard turns out.

          While playMode is off, back + spacer are both removed (v-if) so the
          wrapper collapses to just the keyboard's own height (layout shifts by
          design, per the "collapse the space" choice made earlier).

          mt-auto (on the wrapper): bottom-anchors it within the column
          regardless of the row's height.
        -->
        <div class="relative mt-auto ">

       
          <CustomUiAccordion :is-open="playMode != 'idle'">
            <div class="absolute inset-0 ">
              <GuitarHeroNeo
                v-model:line-index="lineIndex"
                v-model:row-index="rowIndex"
                :play-mode="playMode"
                :play-count="playCount"
                :shade-chars="shadeChars"
                :columns-width="columnsWidth"
                :rows-height="rowsHeight"
                :ascii-image-string="asciiImageString"
                :key-positions="guitarHeroKeyPositions"
                :keyboard-height="kbHeight"
                :bpm="speedBps"
                @sound="onSound"
              />
            </div>

            <!-- peek spacer: how much of the back svg shows above the keyboard.
                 Purely a visual choice now -- GuitarHeroNeo derives where the
                 keyboard's top edge actually sits itself, from kbHeight below,
                 rather than trusting this height to be kept in sync by hand. -->
            <div class="h-56" aria-hidden="true"></div>
          </CustomUiAccordion>


          <!-- keyboard wrapper: no background of its own (was opaquely
               covering GuitarHeroNeo's svg behind it, hiding the tail of the
               key-guide lines) -- the section's own bg-olivetti-shade-10/
               dark:bg-olivetti-shade-50 (on the ancestor a few levels up)
               already shows through everywhere the keys themselves don't
               paint over it. Also measured (kbHeight) so GuitarHeroNeo knows
               where its top edge sits. -->
          <div class="relative" ref="kbWrapper">

            <KeyboardNeo
              :show-uppercase="showUppercase"
              :density-chars="shadeChars"
              :play-mode="playMode"
              :active-sound="activeSound"
              @uppercase-toggle-pressed="onShiftPressed"
              @uppercase-toggle-released="onShiftReleased"
              @uppercase-lock-clicked="onUppercaseLockClicked"
              @space-back-clicked="onSpaceBackClicked"
              @available-chars="onAvailableChars"
              @key-positions="onKeyPositions"
            />

          </div>

        </div>

      </div>

      <div class="hidden lg:block lg:col-start-4 lg:col-span-1 bg-olivetti-shade-40 rounded-br-xl"></div>

    </section>

    <!-- remote control -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_75%_1fr] lg:grid-cols-[6fr_72px_496px_72px_1fr] md:bg-olivetti-slate md:dark:bg-olivetti-yellow">

      <div class="hidden lg:block lg:col-start-2 lg:col-span-1 "></div>

      <div class="md:col-start-2 lg:col-start-3  bg-olivetti-shade-20 dark:bg-olivetti-shade-40 dark:md:bg-olivetti-black rounded-b-3xl ">

        <!-- double background trick -->
        <CustomUiAccordion :is-open="showSettings.keyboard">
          <div class="bg-olivetti-shade-20 dark:bg-olivetti-shade-50 min-h-6">
            <div class="bg-olivetti-shade-10 dark:bg-olivetti-shade-50 h-full p-4">
              <TypewriterSettingsNeo
                v-model:active-layout="activeLayout"
                v-model:selected-preset="selectedPreset"
                v-model:edit-mode="keyboardEditMode"
                v-model:char-pitch="charPitch"
                v-model:line-spacing="lineSpacing"
                v-model:keys-number="keysNumber"
                v-model:tw-model="tw_model"
              />
            </div>
          </div>
        </CustomUiAccordion>

        <!-- just rounding the corners of the keyboard section above -->
        <div class="h-6 bg-olivetti-shade-10 dark:bg-olivetti-shade-50 rounded-b-3xl"></div>

        <!-- remote control -->
        <div >
          <RemoteNeo
              v-model:play-mode="playMode"
              @increment-row="incrementRowIndex"
              @decrement-row="decrementRowIndex"
              @increment-line="incrementLineIndex"
              @decrement-line="decrementLineIndex"
          />
        </div>

        <CustomUiAccordion :is-open="showSettings.player">
          <div class="p-4">
            <RemoteSettingsNeo v-model:speed-bps="speedBps" />
          </div>
        </CustomUiAccordion>

      </div>

      <div class="hidden lg:block lg:col-start-4 lg:col-span-1 "></div>
    </section>

    <!-- onboarding section -->
    <section class="grid grid-cols-1 md:grid-cols-[1fr_90%_1fr] lg:grid-cols-[6fr_72px_496px_72px_1fr] md:bg-olivetti-slate md:dark:bg-olivetti-yellow">

        <div class="hidden lg:block lg:col-start-2 lg:col-span-1 "></div>

        <div class="md:col-start-2 lg:col-start-3 mt-12 mb-6">

          <p class="text-xs text-center">
            {{ tw_model ? `${tw_model.manufacturer} ${tw_model.model}` : 'no model selected' }} · {{ selectedPreset }}
          </p>

        </div>
    </section>

    <!-- bottom spacer -->
    <div class="h-24"></div>

  </div>
</template>

<script lang="ts" setup>
  import { presets, type KeyboardLayout } from '~/utils/keyboardLayouts'
  import type { KeyPosition } from '~/utils/keyboardLayouts/types'
  import type { KeyPositionNeo } from '~/utils/keyboardLayoutsNeo'
  import { extractShadeChars } from '~/utils/asciiShadeChars'
  import { deriveShadeRamp, repairShadeChars } from '~/utils/shadeRamp'
  import { loadImageData, loadImageElementFromUrl } from '~/utils/imageSampling'

  const { showSettings, toggleSettings } = useShowSettings();
  type PlayMode = 'idle' | 'play' | 'pause'
  const playMode = ref<PlayMode>('idle')

  // Starting playback closes every settings accordion (image/ascii/player/
  // keyboard) so the keyboard/guitar-hero area gets the full screen.
  watch(playMode, (mode, previousMode) => {
    if (previousMode !== 'idle' || mode !== 'play') return
    for (const panel of Object.keys(showSettings.value) as SettingsPanel[]) {
      showSettings.value[panel] = false
    }
  })

  // last beat GuitarHeroNeo reported as actually sounding (note, shift
  // companion, or carriageReturn), relayed down to KeyboardNeo so it can
  // flash the physical key(s) involved (see playerLayout.vue's identical
  // activeSound/onSound pattern for KeyboardEvo)
  const activeSound = ref<SoundEvent | null>(null)
  const onSound = (event: SoundEvent) => {
    activeSound.value = event
  }
  watch(playMode, (mode) => {
    // stopped/paused playback shouldn't leave a key stuck highlighted
    if (mode !== 'play') activeSound.value = null
  })

  // typewriterColor/selectedPreset/charPitch/keysNumber/tw_model are shared
  // site-wide state (see useActiveTypewriterSettings), same as index.vue
  const { selectedPreset, charPitch, keysNumber, tw_model } = useActiveTypewriterSettings()

  const activeLayout = ref<KeyboardLayout>(presets.qwertyES)
  const keyboardEditMode = ref(false)
  const DEFAULT_LINE_SPACING: LineSpacing = '1.5' // 'single'
  const lineSpacing = ref<LineSpacing>(DEFAULT_LINE_SPACING)

  // Which char set KeyboardNeo displays, flipped by the physical Shift key
  // while held (see keyPressed/keyReleased below).
  const showUppercase = ref(true)

  // Every char actually reachable on the current keyboard (preset + keysNumber
  // combined) — computed inside KeyboardNeo (only it knows how a row got
  // trimmed/padded) and upstreamed here via the availableChars emit.
  const availableChars = ref('')
  function onAvailableChars(chars: string) {
    availableChars.value = chars
  }

  // from KeyboardNeo: center x/y (+ measured width/height) of every
  // currently-reachable key, re-emitted whenever densityChars/layout/
  // keysNumber/container size changes.
  const keyPositions = ref<KeyPositionNeo[]>([])
  function onKeyPositions(positions: KeyPositionNeo[]) {
    keyPositions.value = positions
  }

  // GuitarHeroNeo (and the buildMelodyTimeline it drives) still expect
  // keyboardLayouts/types.ts's KeyPosition shape -- x/y as a top-left corner
  // paired with `width`, rather than KeyPositionNeo's already-centered x/y.
  // Reconstructing the corner from the measured center + width/height here
  // keeps that legacy shape/math untouched.
  const guitarHeroKeyPositions = computed<KeyPosition[]>(() => keyPositions.value.map((p) => ({
    key: p.key,
    isUpper: p.isUpper,
    x: p.x - p.width / 2,
    y: p.y - p.height / 2,
    width: p.width,
    row: p.row,
    col: p.col,
    kChar: p.key,
    type: p.type,
  })))

  // KeyboardNeo's actual rendered height, measured off its wrapper div (see
  // the template's ref="kbWrapper") and handed to GuitarHeroNeo so it can
  // derive where the keyboard's top edge sits within its own svg -- instead
  // of a hardcoded offset that would need to be kept in sync by hand.
  const kbWrapper = ref<HTMLElement | null>(null)
  const { height: kbHeight } = useElementSize(kbWrapper)

  // GuitarHeroNeo animation speed, exposed via RemoteSettingsNeo's slider (bps)
  const speedBps = ref(120)

  // --- Ascii image ---
  // shadeChars doubles as the densityChars ramp fed to KeyboardNeo (so key
  // highlighting always matches what's actually driving the ascii image —
  // see playerLayout.vue's identical single-ref pattern) and as the ramp
  // edited/regenerated via AsciiSettingsNeo below.
  //
  // columnsWidth/shadeChars/numShadeChars are shared by both ascii sources
  // ('text' and 'image', see asciiSource below), but the two workflows want
  // different values — a tiny hand-picked ramp for a few lines of ascii art
  // vs. a wider, keyboard-derived ramp for halftone conversion. textMode/
  // imageModeSettings snapshot whichever set is active whenever asciiSource
  // changes, so switching back restores the last value used there — the
  // user's own edit if they made one, otherwise a computed default — instead
  // of the two modes clobbering each other's settings.
  interface AsciiModeSettings {
    columnsWidth: number
    shadeChars: string
    numShadeChars: number
  }

  // default ascii art shown until an image is selected via HomeImageSelectNeo
  // (its "default ascii mode" option, see onSelectDefault below)
  const DEFAULT_ASCII_TEXT = `
  ^-^
(='.'=)
(")_(")
`
  const DEFAULT_IMAGE_COLUMNS_WIDTH = 48
  const DEFAULT_IMAGE_SHADES = 10

  function buildDefaultTextSettings(): AsciiModeSettings {
    const lines = DEFAULT_ASCII_TEXT.split('\n')
    const chars = extractShadeChars(lines)
    return {
      columnsWidth: Math.max(...lines.map((line) => line.length)),
      shadeChars: chars,
      numShadeChars: chars.length,
    }
  }

  // Picked via the same "best shadeChars for this keyboard" algorithm
  // midtonesCharsEditorNeo.vue's suggestion feature uses (deriveShadeRamp),
  // so the first halftone conversion a user tries isn't stuck with the
  // few-char ramp the idle-screen ascii art needed.
  function buildDefaultImageSettings(): AsciiModeSettings {
    const ramp = deriveShadeRamp(availableChars.value, DEFAULT_IMAGE_SHADES)
    const chars = ramp.length > 0 ? ramp.map((entry) => entry.char).join('') : shadeChars.value
    return {
      columnsWidth: DEFAULT_IMAGE_COLUMNS_WIDTH,
      shadeChars: chars,
      numShadeChars: chars.length,
    }
  }

  const textModeSettings = ref<AsciiModeSettings>(buildDefaultTextSettings())
  const imageModeSettings = ref<AsciiModeSettings | null>(null)

  const shadeChars = ref(textModeSettings.value.shadeChars)
  const numShadeChars = ref(textModeSettings.value.numShadeChars)
  const columnsWidth = ref(textModeSettings.value.columnsWidth)
  const imgBrightness = ref(100) // 0 to 200
  const imgContrast = ref(100) // 0 to 200
  const autoLevels = ref(false)

  // Real typewriters can only type what's on the keyboard: whenever the
  // layout/keysNumber changes what's reachable (availableChars, above),
  // swap out any shadeChars entry that fell outside it for the closest-
  // density char that's still reachable. Chars still available are left
  // untouched — this repairs the ramp, it doesn't regenerate it.
  watch(availableChars, (chars) => {
    if (!chars) return
    shadeChars.value = repairShadeChars(shadeChars.value, chars)
    numShadeChars.value = shadeChars.value.length
  })

  function captureActiveModeSettings(): AsciiModeSettings {
    return { columnsWidth: columnsWidth.value, shadeChars: shadeChars.value, numShadeChars: numShadeChars.value }
  }

  // Re-validates against the current keyboard on the way in, since the
  // snapshot being restored may predate a layout/keysNumber change made
  // while the other mode was active.
  function applyModeSettings(settings: AsciiModeSettings) {
    const chars = availableChars.value ? repairShadeChars(settings.shadeChars, availableChars.value) : settings.shadeChars
    shadeChars.value = chars
    numShadeChars.value = chars.length
    columnsWidth.value = settings.columnsWidth
  }

  // tracks how asciiImageString was produced: 'image' generation (the raster
  // pipeline below) vs 'text' (a literal ascii-art string) — see
  // playerLayout.vue's identical asciiSource pattern in CLAUDE.md
  type AsciiSource = 'image' | 'text'
  const asciiSource = ref<AsciiSource>('text')

  const asciiImageString = ref<string>(DEFAULT_ASCII_TEXT)
  const rowsHeight = ref(DEFAULT_ASCII_TEXT.split('\n').length) // ascii image height, in rows

  watch(asciiSource, (source, previousSource) => {
    if (previousSource === 'text') textModeSettings.value = captureActiveModeSettings()
    if (previousSource === 'image') imageModeSettings.value = captureActiveModeSettings()

    if (source === 'text') {
      applyModeSettings(textModeSettings.value)
      asciiImageString.value = DEFAULT_ASCII_TEXT
      rowsHeight.value = DEFAULT_ASCII_TEXT.split('\n').length
    } else {
      imageModeSettings.value ??= buildDefaultImageSettings()
      applyModeSettings(imageModeSettings.value)
    }
  })

  // raster_image, fed by HomeImageSelectNeo's library/upload options (camera/
  // pattern are still unimplemented placeholders) — same pattern as
  // playerLayout.vue's rasterImgFile/rasterImgUrl/sourceImage trio
  const rasterImgFile = ref<string | File>('catFace.jpg')
  // holds the object URL for an uploaded File (revoked/replaced whenever rasterImgFile changes)
  const uploadedRasterUrl = ref<string | null>(null)

  watch(rasterImgFile, (file) => {
    if (uploadedRasterUrl.value) {
      URL.revokeObjectURL(uploadedRasterUrl.value)
      uploadedRasterUrl.value = null
    }
    if (file instanceof File) {
      uploadedRasterUrl.value = URL.createObjectURL(file)
    }
  }, { immediate: true })

  const rasterImgUrl = computed(() =>
    rasterImgFile.value instanceof File
      ? (uploadedRasterUrl.value ?? undefined)
      : `/img/gallery/raster_img/${rasterImgFile.value}`
  )

  const sourceImage = ref<SourceImageData | null>(null)

  watch(rasterImgUrl, async (url) => {
    if (!url) {
      sourceImage.value = null
      return
    }
    try {
      const img = await loadImageElementFromUrl(url)
      sourceImage.value = await loadImageData(img)
    } catch (err) {
      console.error('Failed to load raster image for ASCII conversion', err)
      sourceImage.value = null
    }
  }, { immediate: true })

  // from HomeImageSelectNeo: "default ascii mode" — revert to the hardcoded
  // DEFAULT_ASCII_TEXT above instead of a halftone-converted raster image
  function onSelectDefault() {
    asciiSource.value = 'text'
  }

  // from HomeImageSelectNeo: library/upload pick — generate via the raster pipeline
  function onRasterImgFileUpdate(file: string | File) {
    asciiSource.value = 'image'
    rasterImgFile.value = file
  }

  const asciiOptions = computed<ImageToAsciiOptions>(() => ({
    charsPerLine: columnsWidth.value,
    pitch: charPitch.value,
    lineSpacing: lineSpacing.value,
    availableChars: availableChars.value,
    maxShades: numShadeChars.value,
    shadeRampOverride: shadeChars.value,
    brightness: imgBrightness.value - 100,
    contrast: imgContrast.value - 100,
    autoLevels: autoLevels.value,
  }))

  const { text: generatedAsciiText, rows: generatedRows } = useImageAsciiConverter(sourceImage, asciiOptions)

  watch([generatedAsciiText, asciiSource], ([newText, source]) => {
    if (source !== 'image') return
    asciiImageString.value = newText
    rowsHeight.value = generatedRows.value
  })

  // playback position within the ascii image
  const lineIndex = ref(0) // current playback column (char) index within the row
  const rowIndex = ref(0) // current playback row index
  const playCount = computed(() => lineIndex.value + (rowIndex.value * columnsWidth.value))

  // RemoteNeo's row/line step controls (only rendered/enabled while paused,
  // see remoteNeo.vue's controlsEnabled) — same clamping convention as
  // playerLayout.vue's incrementRowIndex/decrementRowIndex.
  const incrementRowIndex = () => {
    rowIndex.value = Math.min(rowIndex.value + 1, rowsHeight.value)
  }
  const decrementRowIndex = () => {
    rowIndex.value = Math.max(rowIndex.value - 1, 0)
  }
  const incrementLineIndex = () => {
    lineIndex.value = Math.min(lineIndex.value + 1, columnsWidth.value)
  }
  const decrementLineIndex = () => {
    lineIndex.value = Math.max(lineIndex.value - 1, 0)
  }

  // Reset playback position whenever the ascii image itself changes (new
  // upload/library pick, or reverting to the default text), so playback
  // doesn't resume mid-image on stale coordinates.
  watch(asciiImageString, () => {
    lineIndex.value = 0
    rowIndex.value = 0
  })

  // Physical-keyboard interaction: Shift + the four arrow keys. Disabled once
  // playback starts — only meaningful while composing/paused.
  const isKeyInteractionEnabled = computed(() => playMode.value !== 'play')

  type ArrowDirection = 'up' | 'down' | 'left' | 'right'
  const ARROW_KEY_DIRECTIONS: Record<string, ArrowDirection> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  }

  // Called both from the physical Shift key (via keyPressed/keyReleased
  // below) and from KeyboardNeo's on-screen red uppercaseToggle key
  // (mousedown/mouseup), which is meant to behave as a "real" Shift key.
  function onShiftPressed() {
    if (!isKeyInteractionEnabled.value) return
    showUppercase.value = !showUppercase.value
  }

  function onShiftReleased() {
    if (!isKeyInteractionEnabled.value) return
    showUppercase.value = !showUppercase.value
  }

  // KeyboardNeo's uppercaseLock keys (the two "↑" keys) — a single toggle per
  // click, no press/release pairing.
  function onUppercaseLockClicked() {
    if (!isKeyInteractionEnabled.value) return
    showUppercase.value = !showUppercase.value
  }

  // KeyboardNeo's spaceBack key ("→") — behavior defined later.
  function onSpaceBackClicked() {
    if (!isKeyInteractionEnabled.value) return
  }

  function onArrowPressed(direction: ArrowDirection) {
    // implemented later
  }

  function onArrowReleased(direction: ArrowDirection) {
    // implemented later
  }

  function keyPressed(e: KeyboardEvent) {
    if (!isKeyInteractionEnabled.value) return
    if (e.key === 'Shift') return onShiftPressed()
    const direction = ARROW_KEY_DIRECTIONS[e.key]
    if (!direction) return
    e.preventDefault()
    onArrowPressed(direction)
  }

  function keyReleased(e: KeyboardEvent) {
    if (!isKeyInteractionEnabled.value) return
    if (e.key === 'Shift') return onShiftReleased()
    const direction = ARROW_KEY_DIRECTIONS[e.key]
    if (!direction) return
    e.preventDefault()
    onArrowReleased(direction)
  }

  const WATCHED_KEYS = ['Shift', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  onKeyStroke(WATCHED_KEYS, keyPressed, { eventName: 'keydown', dedupe: true })
  onKeyStroke(WATCHED_KEYS, keyReleased, { eventName: 'keyup' })
</script>

<style>

</style>
