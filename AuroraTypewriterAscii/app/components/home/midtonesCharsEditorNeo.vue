<template>
  <div>
    <!-- chars loop -->
    <div class="flex flex-wrap gap-2">

      <div
        v-for="(char, index) in chars"  :key="index"
        class="flex flex-col items-center justify-center gap-y-2"
      >

        <input
          :value="char"
          maxlength="1"
          class="w-9 h-9 leading-9 text-xl font-bold font-mono text-white text-center pt-1 border border-olivetti-shade-50  focus:outline-none  focus:border-mist-500 focus:ring-0 focus:text-mist-800 bg-olivetti-shade-50 transition-colors duration-300 selection:bg-white selection:text-mist-900 rounded-full shadow-xl "
          @focus="onFocus(index, $event)"
          @blur="onBlur"
          @input="setChar(index, $event)"
        >
       
        <span
          class="w-9 h-1.5 rounded-full "
          :style="{ backgroundColor: charBorderColor(char) }"
        ></span>

      </div>
      
    </div>

    <!-- buttons-->
    <div class="flex flex-wrap gap-2 mt-4">

      <!-- plus button -->
      <button
        class="w-9 h-9 text-4xl text-mist-800 text-center hover:bg-orange-500 hover:text-white transition-colors duration-300 cursor-pointer"
        @click="addChar"
      >
        +
      </button>

      <!-- remove button -->
      <button
        v-if="chars.length > 2"
        ref="removeButtonRef"
        :disabled="focusedIndex === null"
        class="w-9 h-9 text-4xl text-mist-800 text-center hover:bg-orange-500 hover:text-white transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-mist-800"
        @click="removeChar"
      >
        -
      </button>

    </div>

    <div class="pb-3">
      <button
        class="cursor-pointer group text-sm text-gray-700 flex justify-between items-center w-full mt-4 border border-mist-300 hover:border-orange-500 transition-colors duration-300 p-2"
        @click="regenerateShadeRamp"
      >
        <span class="text-right ">regenerate shades</span>
        <UIcon
          name="i-lucide-refresh-cw"
          class="size-5 text-mist-700 hover:text-orange-500 transition-colors duration-300"
        />
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { deriveShadeRamp } from '~/utils/shadeRamp'

const DEFAULT_SHADE_CHARS = '@%#*+=-:. '

const props = defineProps<{
  shadeChars?: string
  numShadeChars?: number
  availableChars?: string
}>()

const emit = defineEmits<{
  'update:shadeChars': [value: string]
  'update:numShadeChars': [value: number]
}>()

const chars = computed(() => props.shadeChars ?? DEFAULT_SHADE_CHARS)

watch(() => props.numShadeChars, (newLength) => {
  if (newLength === undefined || newLength === chars.value.length) return
  const nextChars = newLength > chars.value.length
    ? chars.value.padEnd(newLength, ' ')
    : chars.value.slice(0, newLength)
  emit('update:shadeChars', nextChars)
})

const focusedIndex = ref<number | null>(null)
const removeButtonRef = ref<HTMLButtonElement | null>(null)

const UNKNOWN_CHAR_BORDER_COLOR = '#dc2626'

function charBorderColor(char: string) {
  const density = getCharDensity(char)
  return density === undefined ? UNKNOWN_CHAR_BORDER_COLOR : `rgb(${density}, ${density}, ${density})`
}

/*
function charTextColor(char: string) {
  const density = getCharDensity(char)
  return density === undefined || density > 128 ? '#000000' : '#ffffff'
}
  */

function sortByShade(value: string) {
  return Array.from(value)
    .sort((a, b) => (getCharDensity(a) ?? Infinity) - (getCharDensity(b) ?? Infinity))
    .join('')
}

function onFocus(index: number, event: FocusEvent) {
  focusedIndex.value = index
  ;(event.target as HTMLInputElement).select()
}

function onBlur(event: FocusEvent) {
  if (event.relatedTarget !== removeButtonRef.value) {
    focusedIndex.value = null
  }
  emit('update:shadeChars', sortByShade(chars.value))
}

function setChar(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const newChar = input.value.slice(-1) || ' '
  input.value = newChar
  emit('update:shadeChars', chars.value.slice(0, index) + newChar + chars.value.slice(index + 1))
}

function addChar() {
  const next = chars.value + ' '
  emit('update:shadeChars', next)
  emit('update:numShadeChars', next.length)
}

function removeChar() {
  if (focusedIndex.value === null) return
  const index = focusedIndex.value
  const next = chars.value.slice(0, index) + chars.value.slice(index + 1)
  emit('update:shadeChars', next)
  emit('update:numShadeChars', next.length)
  focusedIndex.value = null
}

function regenerateShadeRamp() {
  if (!props.availableChars) return
  emit(
    'update:shadeChars',
    deriveShadeRamp(props.availableChars, chars.value.length)
      .map((entry) => entry.char)
      .join(''),
  )
}
</script>

<style>

</style>