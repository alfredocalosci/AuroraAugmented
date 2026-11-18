<template>
  
  <div ref="containerRef" class="w-full  overflow-hidden">
    
    <!--
  <div
      class="grid grid-cols-1 md:grid-cols-2 gap-x-8 items-center"
      v-if="props.playMode === 'idle'"
    >
      
      <div>
        <button class="cursor-pointer group text-sm flex items-center justify-between gap-x-2 border p-2 w-full border-mist-300 hover:border-orange-500" >
          
          <span class="text-sm">done editing</span>
          
          <UIcon
          name="lucide:circle-check-big"
          class="size-6 md:size-5 text-green-500 group-hover:text-orange-500 transition-colors duration-300"
          />
          
         
        </button>
      </div>
      
      <div>
     
        <div 
        
        class="mt-2 w-full flex justify-end items-center gap-x-2"
        >
        
        <button class="cursor-pointer group">
          
          <UIcon
          name="lucide:expand"
          class="size-6 md:size-5 text-mist-800 group-hover:text-orange-500 transition-colors duration-300"
          />
          
        </button>
        
        <button class="cursor-pointer group">
         
          
          
          <UIcon
          name="i-lucide-copy"
          class="size-6 md:size-5 text-mist-800 group-hover:text-orange-500 transition-colors duration-300"
          />
          
        </button>
        
        
        
        <button class="cursor-pointer group">
          <UIcon
          name="lucide:download"
          class="size-6 md:size-5 text-mist-800 group-hover:text-orange-500 transition-colors duration-300"
          />
        </button>
        
        <button class="cursor-pointer group">
          <UIcon
          name="lucide:edit"
          class="size-6 md:size-5 text-mist-800 group-hover:text-orange-500 transition-colors duration-300"
          />
        </button>
        
      </div>
    </div>
  </div>

  -->
  
  
  <!-- height is bound explicitly (rather than left to auto/content sizing)
  so it can transition smoothly when playMode swaps the textarea for the
  char matrix, which naturally sizes to a different height -->
  <div
  class="overflow-hidden transition-[height] duration-300 ease-in-out"
  :style="contentWrapperStyle"
  >
  <textarea
    v-if="props.playMode === 'idle'"
    readonly
    wrap="off"
    :cols="props.columnsWidth"
    :rows="effectiveRows"
    class="block mx-auto resize-none overflow-hidden border-0 bg-transparent p-0 text-black focus:outline-none"
    :style="textareaStyle"
    :value="displayValue"
  ></textarea>
  
  <!-- chars matrix of samples lines: shows only a window of lines
  centered on the active (rowIndex) line, styled to match the
  textarea's font size / line height / letter spacing so swapping
  between the two doesn't shift layout -->

  <div v-else class="flex flex-col mt-6 mx-auto" :style="matrixContainerStyle">
    <!-- flex-nowrap -->
    <div
    v-for="(line, visibleRowIndex) in visibleLines"
    :key="matrixStartLine + visibleRowIndex"
    class="flex  flex-wrap"
    :style="matrixRowStyle"
    >
    <span
    v-for="(char, colIndex) in line.split('')"
    :key="colIndex"
    class="inline-block whitespace-pre text-black"
    :class="{ 'bg-green-500': matrixStartLine + visibleRowIndex === highlightPos?.row && colIndex === highlightPos?.col }"
    :style="matrixCharStyle"
    >{{ char }}</span>
  </div>
</div>
</div>




  </div>

</template>

<script lang="ts" setup>
import { charCellAspectRatio, lineSpacingMultiplier } from '~/utils/typewriterGeometry'

const props = defineProps<{
  asciiImageString: string
  columnsWidth: number
  rowsHeight: number
  playMode: 'idle' | 'play' | 'pause'
  playCount: number
  lineIndex: number
  rowIndex: number
  charPitch: CharPitch
  lineSpacing: LineSpacing
}>()

const ROOT_FONT_SIZE_PX = 16
// caps rendered glyph size so a low columnsWidth (few, wide columns) doesn't
// blow the text up - the leftover cell width goes to letter-spacing instead.
// Higher than AsciiImageHolder's 16px cap: this variant is allowed bigger
// glyphs at low column counts, but only up to this ceiling, and the cap is
// applied to the aspect-correct font size (see fontSizeRem below), not used
// to derive size independently of it.
const MAX_FONT_SIZE_PX = 32
// Lekton's natural leading as a fraction of font-size (matches --font-mono
// in app/assets/css/main.css): fixed constant rather than measured at
// runtime, since the font itself is fixed.
const CHAR_WIDTH_RATIO = 0.5
const LINE_HEIGHT_RATIO = 1
// caps letter-spacing as a fraction of the glyph's own natural width, so a
// low columnsWidth (few, wide columns) doesn't stretch the gap between
// characters past what a real typewriter's fixed carriage pitch would ever
// look like. There's no absolute physical scale anywhere in this pipeline
// (charCellAspectRatio is a ratio, not real inches - see fontSizeRem/
// lineHeightRem above), so this is a fixed approximation rather than a
// value derived per-pitch. Below the threshold where this cap engages, it
// has no effect - normal/high columnsWidth renders exactly as before.
const MAX_LETTER_SPACING_RATIO = 0.4

// a trailing newline (present in the source .txt files) renders as an extra
// blank visual line in a textarea, one more than rowsHeight accounts for
const displayValue = computed(() => props.asciiImageString.replace(/\n$/, ''))
const effectiveRows = computed(() => props.rowsHeight || props.rowIndex || 1)

const containerRef = ref<HTMLElement | null>(null)
  const containerWidth = ref(0)
  
  useResizeObserver(containerRef, ([entry]) => {
    if (!entry) return
    containerWidth.value = entry.contentRect.width
  })
  
  // scaled-to-screen width of one character column: what one character must
  // occupy, width-wise, to fill the available container width
  const cellSizeRem = computed(() => {
    if (!containerWidth.value || !props.columnsWidth) return 0
    return containerWidth.value / props.columnsWidth / ROOT_FONT_SIZE_PX
  })
  
  // font size (glyph size) derived from cellSizeRem via the real physical
  // width:height ratio at single spacing, then capped so a low columnsWidth
  // (few, wide columns) can't inflate the font past MAX_FONT_SIZE_PX.
  // Deliberately pinned to 'single' rather than props.lineSpacing: a
  // typewriter's line-spacing lever only changes the gap between lines, not
  // letter size, so glyph size should track pitch alone.
  const idealLineHeightRem = computed(
  () => cellSizeRem.value / charCellAspectRatio(props.charPitch, 'single')
  )
  const idealFontSizeRem = computed(() => idealLineHeightRem.value / LINE_HEIGHT_RATIO)
  const maxFontSizeRem = MAX_FONT_SIZE_PX / ROOT_FONT_SIZE_PX
  // also bounded by cellSizeRem / CHAR_WIDTH_RATIO: the glyph width at
  // fontSizeRem must never exceed the cell width, or letter-spacing (which
  // can only pad outward, never go negative) can't absorb the gap and the
  // block overflows the container
  const fontSizeRem = computed(() =>
  Math.min(idealFontSizeRem.value, maxFontSizeRem, cellSizeRem.value / CHAR_WIDTH_RATIO)
  )
  // line spacing scales line height on top of the single-spacing font size -
  // 1x at single, up to 2x at double (see lineSpacingMultiplier) - kept
  // separate from fontSizeRem above so widening the line gap never inflates
  // glyph size/width.
  const lineHeightRem = computed(
  () => fontSizeRem.value * LINE_HEIGHT_RATIO * lineSpacingMultiplier(props.lineSpacing)
  )

  // Lekton's glyphs are narrower than the cell. Rather than stretching the
  // glyph shapes to fill that gap (distorts them), pad each character out
  // with letter-spacing, keeping natural glyph proportions - but only up to
  // MAX_LETTER_SPACING_RATIO. Below that cap, this fills the container's
  // full width exactly, same as before; once cellSizeRem grows past what
  // the cap allows (few columns spread over a wide container), the block
  // stops growing and renders narrower than the container instead - the
  // template centers it (mx-auto) rather than forcing an unrealistic gap.
  const naturalCharWidthRem = computed(() => fontSizeRem.value * CHAR_WIDTH_RATIO )
  const letterSpacingRem = computed(() => {
    const available = Math.max(cellSizeRem.value - naturalCharWidthRem.value, 0)
    return Math.min(available, naturalCharWidthRem.value * MAX_LETTER_SPACING_RATIO)
  })

  const widthRem = computed(
  () => (naturalCharWidthRem.value + letterSpacingRem.value) * props.columnsWidth
  )
  const heightRem = computed(() => lineHeightRem.value * effectiveRows.value)
  
  const textareaStyle = computed(() => {
    if (!fontSizeRem.value) return {}
    return {
      width: `${widthRem.value}rem`,
      height: `${heightRem.value}rem`,
      fontSize: `${fontSizeRem.value}rem`,
      lineHeight: `${lineHeightRem.value}rem`,
      letterSpacing: `${letterSpacingRem.value}rem`,
    }
  })
  
  // char matrix: shown instead of the textarea whenever playMode isn't
  // 'idle'. Rather than rendering the whole ascii art, it shows a window of
  // MATRIX_VISIBLE_LINES lines centered on the active line (rowIndex), so
  // it stays cheap to render during playback.
  const MATRIX_VISIBLE_LINES = 9
  const MATRIX_HALF_WINDOW = Math.floor(MATRIX_VISIBLE_LINES / 2)

  const asciiLines = computed(() => displayValue.value.split('\n'))
  const matrixWindowSize = computed(() => Math.min(MATRIX_VISIBLE_LINES, asciiLines.value.length))

  // centers the window on rowIndex (-MATRIX_HALF_WINDOW/+MATRIX_HALF_WINDOW),
  // clamped so it never runs past either end of the ascii art - this is what
  // keeps at least MATRIX_VISIBLE_LINES on screen even when rowIndex is near 0
  const matrixStartLine = computed(() => {
    const total = asciiLines.value.length
    const raw = props.rowIndex - MATRIX_HALF_WINDOW
    return Math.max(0, Math.min(raw, total - matrixWindowSize.value))
  })
  
  const visibleLines = computed(() =>
  asciiLines.value.slice(matrixStartLine.value, matrixStartLine.value + matrixWindowSize.value)
  )
  
  // props.lineIndex/rowIndex track the *next* position to play (guitarHeroEvo
  // resumes playback from exactly that position), not the char that last
  // sounded - so the highlight is one position behind. lineIndex === 0 means
  // the current row's first note hasn't sounded yet, in which case the last
  // sounded char is still the previous row's final column (carriage-return
  // resets lineIndex to 0 before that note plays); rowIndex === 0 alongside
  // it means nothing has played yet, so nothing is highlighted.
  const highlightPos = computed(() => {
    if (props.lineIndex > 0) return { row: props.rowIndex, col: props.lineIndex - 1 }
    if (props.rowIndex > 0) {
      const prevRow = asciiLines.value[props.rowIndex - 1] ?? ''
      return { row: props.rowIndex - 1, col: prevRow.length - 1 }
    }
    return null
  })

  const matrixHeightRem = computed(() => lineHeightRem.value * visibleLines.value.length)
  
  const matrixContainerStyle = computed(() => {
    if (!fontSizeRem.value) return {}
    return {
      width: `${widthRem.value}rem`,
      height: `${matrixHeightRem.value}rem`,
    }
  })
  
  // the matrix wrapper below carries a mt-6 (1.5rem) top margin. The parent
  // has overflow-hidden, which blocks margin-collapsing, so that margin
  // consumes real space inside this fixed-height wrapper instead of being
  // absorbed above it - without budgeting for it here, the bottom (last
  // visible line) gets clipped by exactly 1.5rem.
  const MATRIX_TOP_MARGIN_REM = 1.5

  // drives the animated wrapper around textarea/matrix: same height values
  // as each element's own style, just hoisted so the transition sits on a
  // stable parent rather than restarting when v-if swaps the child out
  const contentHeightRem = computed(() => {
    if (!fontSizeRem.value) return 0
    return props.playMode === 'idle' ? heightRem.value : matrixHeightRem.value + MATRIX_TOP_MARGIN_REM
  })
  
  const contentWrapperStyle = computed(() => ({
    height: `${contentHeightRem.value}rem`,
  }))
  
  const matrixRowStyle = computed(() => {
    if (!fontSizeRem.value) return {}
    return {
      height: `${lineHeightRem.value}rem`,
      fontSize: `${fontSizeRem.value}rem`,
      lineHeight: `${lineHeightRem.value}rem`,
      columnGap: `${letterSpacingRem.value}rem`,
    }
  })
  
  const matrixCharStyle = computed(() => {
    if (!fontSizeRem.value) return {}
    return {
      width: `${naturalCharWidthRem.value}rem`,
    }
  })
</script>
