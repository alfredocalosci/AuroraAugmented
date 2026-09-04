<template>
  <div class="tw_container max-w-4xl mx-auto px-4 py-8">

    <h1 class="text-2xl font-hand mb-6">Image → Typewriter ASCII</h1>

    <!-- upload + thumbnail -->
    <section class="mb-8">
      <HomeImageSelect
        :raster-img-url="previewUrl ?? undefined"
        @update:raster-img-file="handleRasterImgFile"
      />
    </section>

    <!-- sampled-image preview -->
    <section class="mb-8" v-if="sourceImage">
      <div class="mb-2 flex gap-x-2 items-center">
        <UIcon name="i-lucide-scan-line" class="size-4 text-mist-700" />
        <p class="text-xs text-black">sampled image (post tone-adjust):</p>
      </div>
      <canvas ref="previewCanvasRef" class="border border-mist-200 max-w-full"></canvas>
    </section>

    <!-- settings -->
    <section class="mb-8">
      <HomeTypewriterAsciiSettings
        v-model:chars-per-line="charsPerLine"
        v-model:pitch="pitch"
        v-model:line-spacing="lineSpacing"
        v-model:keyboard-layout="keyboardLayout"
        v-model:available-chars="availableChars"
        v-model:max-shades="maxShades"
        v-model:shade-ramp-chars="shadeRampChars"
        v-model:brightness="brightness"
        v-model:contrast="contrast"
        v-model:auto-levels="autoLevels"
      />
    </section>

    <!-- output -->
    <section>
      <div class="flex justify-between items-center mb-2">
        <div class="flex gap-x-2 items-center">
          <UIcon name="i-lucide-file-text" class="size-4 text-mist-700" />
          <p class="text-xs text-black">ASCII output:</p>
        </div>

        <div class="flex gap-x-3 items-center">
          <button class="cursor-pointer group" :disabled="!text" @click="copy()">
            <UIcon
              :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              class="size-5 text-mist-800 group-hover:text-orange-500 transition-colors duration-300"
            />
          </button>
          <button class="cursor-pointer group" :disabled="!text" @click="handleSave">
            <UIcon
              name="i-lucide-download"
              class="size-5 text-mist-800 group-hover:text-orange-500 transition-colors duration-300"
            />
          </button>
        </div>
      </div>

      <p v-if="sourceImage && shadeRamp.length === 0" class="text-xs text-red-600 mb-2">
        No characters with a known density are available with the current "available chars" /
        shade ramp settings — widen the available-chars set to produce output.
      </p>

      <textarea
        readonly
        wrap="off"
        :cols="columns || 40"
        :rows="rows || 10"
        class="w-full font-mono text-xs leading-none border border-mist-200 rounded-lg p-2 resize-none overflow-auto bg-white text-black"
        :value="text"
      ></textarea>
    </section>

  </div>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { downloadTextFile } from '~/utils/downloadTextFile'
import { presets, type PresetName } from '~/utils/keyboardLayouts'
import { getLayoutDensityChars } from '~/utils/keyboardLayouts/layoutChars'
import { deriveShadeRamp } from '~/utils/shadeRamp'

const { loadFile, previewUrl, sourceImage } = useImageFileLoader()

function handleRasterImgFile(file: string | File) {
  if (file instanceof File) void loadFile(file)
}

const charsPerLine = ref(48)
const pitch = ref<CharPitch>('pica')
const lineSpacing = ref<LineSpacing>('single')
const keyboardLayout = ref<PresetName>('qwertyES')
const availableChars = ref(getLayoutDensityChars(presets[keyboardLayout.value]))
const maxShades = ref(8)
// seeded from deriveShadeRamp for the default layout/maxShades; after that,
// only an explicit layout switch or the "regenerate" trigger (both handled
// in HomeTypewriterAsciiSettings) recompute it — a maxShades tweak alone
// just pads/truncates the current ramp (see midtonesCharsEditor.vue), so
// hand-edited ramps aren't silently overwritten
const shadeRampChars = ref(
  deriveShadeRamp(availableChars.value, maxShades.value)
    .map((entry) => entry.char)
    .join('')
)
const brightness = ref(0)
const contrast = ref(0)
const autoLevels = ref(false)

const options = computed<ImageToAsciiOptions>(() => ({
  charsPerLine: charsPerLine.value,
  pitch: pitch.value,
  lineSpacing: lineSpacing.value,
  availableChars: availableChars.value,
  maxShades: maxShades.value,
  shadeRampOverride: shadeRampChars.value,
  brightness: brightness.value,
  contrast: contrast.value,
  autoLevels: autoLevels.value,
}))

const { text, columns, rows, shadeRamp, luminanceGrid } = useImageAsciiConverter(sourceImage, options)

const { copy, copied } = useClipboard({ source: text })

function handleSave() {
  downloadTextFile('ascii-art.txt', text.value)
}

// sampled-image preview: paints the literal post-tone-adjust luminance grid
// the pipeline uses, not a CSS approximation
const PREVIEW_MAX_WIDTH_PX = 480
const previewCanvasRef = ref<HTMLCanvasElement | null>(null)

watchEffect(() => {
  const canvas = previewCanvasRef.value
  const grid = luminanceGrid.value
  if (!canvas || grid.length === 0) return
  const gridRows = grid.length
  const gridCols = grid[0]?.length ?? 0
  if (gridCols === 0) return

  const cellPx = Math.max(1, Math.floor(PREVIEW_MAX_WIDTH_PX / gridCols))
  canvas.width = gridCols * cellPx
  canvas.height = gridRows * cellPx

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  for (let y = 0; y < gridRows; y++) {
    for (let x = 0; x < gridCols; x++) {
      const value = Math.round(grid[y]![x]!)
      ctx.fillStyle = `rgb(${value}, ${value}, ${value})`
      ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx)
    }
  }
})
</script>
