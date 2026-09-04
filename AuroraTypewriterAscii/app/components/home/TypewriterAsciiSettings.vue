<template>
  <div>
    <!-- head row -->
    <div class="flex justify-between items-start">
      <div class="mb-2 flex justify-start gap-x-2">
        <UIcon
        name="i-lucide-settings"
        class="size-4 text-mist-700 "
        />
        <p class="text-xs text-black">typewriter ASCII settings:</p>
      </div>

      <button class="cursor-pointer group ml-2" @click="isOpen = !isOpen">
        <UIcon
          :name="isOpen ? 'i-lucide-square-chevron-up' : 'i-lucide-square-chevron-down'"
          class="size-5 text-mist-700 hover:text-orange-500 transition-colors duration-300"
        />
      </button>
    </div>

    <CustomUiAccordion :isOpen="isOpen">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-9 mt-3">

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">chars per line:</p>
          <CustomUiStepper v-model:value="charsPerLine" :min="5" :max="85" class="mb-2" />
          <div class="h-px w-full bg-mist-200 rounded-full overflow-hidden">
            <div class="h-full bg-orange-500 transition-all duration-300" :style="{ width: (charsPerLine / 85 * 100) + '%' }"></div>
          </div>
          <p class="text-xs text-mist-400 mt-1">5 → 85</p>
        </div>

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">pitch:</p>
          <USelect v-model="pitch" :items="pitchItems" size="sm" class="w-full" />
        </div>

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">line spacing:</p>
          <USelect v-model="lineSpacing" :items="lineSpacingItems" size="sm" class="w-full" />
        </div>

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">max shades:</p>
          <CustomUiStepper v-model:value="maxShades" :min="2" :max="32" class="mb-2" />
          <div class="h-px w-full bg-mist-200 rounded-full overflow-hidden">
            <div class="h-full bg-orange-500 transition-all duration-300" :style="{ width: (maxShades / 32 * 100) + '%' }"></div>
          </div>
          <p class="text-xs text-mist-400 mt-1">2 → 32</p>
        </div>

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">keyboard layout:</p>
          <USelect v-model="keyboardLayout" :items="layoutItems" size="sm" class="w-full" />
        </div>

        <div class="md:col-span-2">
          <p class="text-sm text-mist-500 w-full mb-1">available chars (from keyboard layout):</p>
          <p class="w-full text-sm font-mono break-all border border-mist-200 rounded-lg px-2 py-1 bg-mist-50 text-mist-600">{{ availableChars }}</p>
        </div>

        <div class="md:col-span-2">
          <p class="text-sm text-mist-500 w-full mb-1">shade ramp:</p>
          <HomeMidtonesCharsEditor
            v-model:shadeChars="shadeRampChars"
            v-model:numShadeChars="maxShades"
            :availableChars="availableChars"
          />

          <div class="mt-3 flex items-center gap-x-2">
            <input
              type="text"
              :maxlength="maxShades"
              v-model="shadeRampChars"
              @beforeinput="onShadeRampBeforeInput"
              @blur="onShadeRampBlur"
              placeholder="dark → light chars"
              class="flex-1 text-sm font-mono border border-mist-200 rounded-lg px-2 py-1 focus:outline-none focus:border-mist-500"
            />
            <UButton size="sm" variant="soft" icon="i-lucide-refresh-cw" @click="regenerateShadeRamp">
              regenerate
            </UButton>
          </div>
          <p class="text-xs text-mist-400 mt-1">up to {{ maxShades }} chars, from the available-chars set only — sorts dark → light on blur</p>
        </div>

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">brightness:</p>
          <USlider v-model="brightnessSlider" :min="0" :max="200" class="mb-2" />
          <p class="text-xs text-mist-400 mt-1">{{ brightnessSlider }} — 0 → 200 (100 = neutral)</p>
        </div>

        <div>
          <p class="text-sm text-mist-500 w-full mb-1">contrast:</p>
          <USlider v-model="contrastSlider" :min="0" :max="200" class="mb-2" />
          <p class="text-xs text-mist-400 mt-1">{{ contrastSlider }} — 0 → 200 (100 = neutral)</p>
        </div>

        <div class="flex items-center gap-x-2">
          <input
            id="auto-levels"
            type="checkbox"
            v-model="autoLevels"
            class="size-4 accent-orange-500"
          />
          <label for="auto-levels" class="text-sm text-mist-500">auto levels (stretch to full range)</label>
        </div>

      </div>
    </CustomUiAccordion>
  </div>
</template>

<script lang="ts" setup>
import { presets, type PresetName } from '~/utils/keyboardLayouts'
import { getLayoutDensityChars } from '~/utils/keyboardLayouts/layoutChars'
import { getCharDensity } from '~/utils/charDensity'
import { deriveShadeRamp } from '~/utils/shadeRamp'

const DEFAULT_CHARS_PER_LINE = 48
const DEFAULT_PITCH: CharPitch = 'pica'
const DEFAULT_LINE_SPACING: LineSpacing = 'single'
const DEFAULT_KEYBOARD_LAYOUT: PresetName = 'qwertyES'
const DEFAULT_MAX_SHADES = 8
const DEFAULT_SHADE_RAMP_CHARS = '@%#*+=-:. '

const props = defineProps<{
  charsPerLine?: number
  pitch?: CharPitch
  lineSpacing?: LineSpacing
  keyboardLayout?: PresetName
  maxShades?: number
  shadeRampChars?: string
  brightness?: number
  contrast?: number
  autoLevels?: boolean
}>()

const emit = defineEmits<{
  'update:charsPerLine': [value: number]
  'update:pitch': [value: CharPitch]
  'update:lineSpacing': [value: LineSpacing]
  'update:keyboardLayout': [value: PresetName]
  'update:availableChars': [value: string]
  'update:maxShades': [value: number]
  'update:shadeRampChars': [value: string]
  'update:brightness': [value: number]
  'update:contrast': [value: number]
  'update:autoLevels': [value: boolean]
}>()

const pitchItems = [
  { label: 'Pica (10 cpi)', value: 'pica' },
  { label: 'Pica Lite (11 cpi)', value: 'pica-lite' },
  { label: 'Elite (12 cpi)', value: 'elite' },
]

const lineSpacingItems = [
  { label: 'Single (6 lpi)', value: 'single' },
  { label: '1.5 (4 lpi)', value: '1.5' },
  { label: 'Double (3 lpi)', value: 'double' },
]

const charsPerLine = computed({
  get: () => props.charsPerLine ?? DEFAULT_CHARS_PER_LINE,
  set: (value) => emit('update:charsPerLine', value),
})

const pitch = computed({
  get: () => props.pitch ?? DEFAULT_PITCH,
  set: (value) => emit('update:pitch', value as CharPitch),
})

const lineSpacing = computed({
  get: () => props.lineSpacing ?? DEFAULT_LINE_SPACING,
  set: (value) => emit('update:lineSpacing', value as LineSpacing),
})

const keyboardLayout = computed({
  get: () => props.keyboardLayout ?? DEFAULT_KEYBOARD_LAYOUT,
  set: (value) => emit('update:keyboardLayout', value),
})

const layoutItems = Object.keys(presets).map((name) => ({ label: name, value: name }))

// available chars are derived entirely from the selected keyboard layout,
// not hand-edited — see layoutChars.ts
const availableChars = computed(() => getLayoutDensityChars(presets[keyboardLayout.value]))

watch(availableChars, (value) => emit('update:availableChars', value), { immediate: true })

const maxShades = computed({
  get: () => props.maxShades ?? DEFAULT_MAX_SHADES,
  set: (value) => emit('update:maxShades', value),
})

const shadeRampChars = computed({
  get: () => props.shadeRampChars ?? DEFAULT_SHADE_RAMP_CHARS,
  set: (value) => emit('update:shadeRampChars', value),
})

function regenerateShadeRamp() {
  shadeRampChars.value = deriveShadeRamp(availableChars.value, maxShades.value)
    .map((entry) => entry.char)
    .join('')
}

// a layout switch can leave the current ramp holding chars no longer in
// availableChars, so it's the one change that auto-regenerates; a maxShades
// tweak alone just pads/truncates in HomeMidtonesCharsEditor, preserving
// hand edits — full regeneration otherwise only happens via the button
watch(keyboardLayout, regenerateShadeRamp)

function onShadeRampBeforeInput(event: InputEvent) {
  if (!event.data) return
  const available = new Set(availableChars.value)
  if (![...event.data].every((char) => available.has(char))) {
    event.preventDefault()
  }
}

function onShadeRampBlur() {
  shadeRampChars.value = [...shadeRampChars.value]
    .sort((a, b) => (getCharDensity(a) ?? Infinity) - (getCharDensity(b) ?? Infinity))
    .join('')
}

// brightness/contrast are exposed as 0..200 sliders (100 = neutral), matching
// the familiar CSS filter: brightness()/contrast() percentage convention;
// mapped to the -100..100 range the conversion algorithm expects.
const brightnessSlider = computed({
  get: () => (props.brightness ?? 0) + 100,
  set: (value) => emit('update:brightness', value - 100),
})

const contrastSlider = computed({
  get: () => (props.contrast ?? 0) + 100,
  set: (value) => emit('update:contrast', value - 100),
})

const autoLevels = computed({
  get: () => props.autoLevels ?? false,
  set: (value) => emit('update:autoLevels', value),
})

const isOpen = ref(false)
</script>
