<template>
    <!-- shadow-xl pb-12 -->
    <div class="font-mono text-center text-4xl/11 lg:text-5xl/15  ">

        <div v-for="(row, r) in IMAGE_ROWS" :key="`img-${r}`">
            <span
                v-for="(ch, c) in row.split('')"
                :key="`img-${r}-${c}`"
                class="inline-block w-[1ch] transition-colors duration-150"
                :class="colorClass[imageState[r]![c]!]"
            >{{ displayChar(r, c, ch) }}</span>
        </div>

        <div class="h-[1em]"></div>

        <div v-for="r in DOT_ROWS" :key="`dot-${r}`" class="leading-6 lg:leading-7">
            <span
                v-for="c in DOT_COLS"
                :key="`dot-${r}-${c}`"
                class="inline-block w-[1ch]  transition-colors duration-150"
                :class="colorClass[dotState[r - 1]![c - 1]!]"
            >{{ dotChars[r - 1]![c - 1] }}</span>
        </div>

        <div class="h-[1em]"></div>

        <div >
            <span
                v-for="(ch, c) in KEYBOARD_CHARS"
                :key="`kb-${c}`"
                class="inline-block w-[1ch] transition-colors duration-150"
                :class="colorClass[keyboardState[c]!]"
            >{{ ch }}</span>
        </div>
        <div>
            <span
                v-for="(ch, c) in SPACEBAR_ROW.split('')"
                :key="`sp-${c}`"
                class="inline-block w-[1ch] transition-colors duration-150"
                :class="ch === '_' ? colorClass[spacebarState] : colorClass.idle"
            >{{ ch }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
// Tunable timing: how long a note takes to fall one dot-matrix row, the gap
// before the next character starts, and the pause before the whole loop restarts.
const ROW_STEP_MS = 400
const CHAR_GAP_MS = 1200
const LOOP_DELAY_MS = 3000

// Cat ascii image, 3 rows x 9 cols (padded with a leading/trailing space so the
// widest keyboard-mapped char set below still lines up column-for-column).
const IMAGE_ROWS = [
    '   ^-^   ',
    ' (=·.·=) ',
    ' (")_(") ',
]

// The distinct chars used in the image above, ordered left-to-right by qwerty
// position. Column index here = column index in the dot matrix and keyboard rows.
const KEYBOARD_CHARS = ['·', '"', '(', ')', '=', '^', '.', '_', '-']
const CENTER_COL = 4 // where a space "lands" — same column the spacebar underscores sit on

const DOT_ROWS = 7
const DOT_COLS = KEYBOARD_CHARS.length

const SPACEBAR_ROW = '   ___   '

type CellState = 'idle' | 'black' | 'highlight'

const colorClass: Record<CellState, string> = {
    idle: 'text-mist-300 dark:text-mist-500',
    black: 'text-mist-900 dark:text-mist-100',
    highlight: 'text-primary',
}

const imageState = reactive<CellState[][]>(IMAGE_ROWS.map(row => Array(row.length).fill('idle')))
const dotChars = reactive<string[][]>(Array.from({ length: DOT_ROWS }, () => Array(DOT_COLS).fill('·')))
const dotState = reactive<CellState[][]>(Array.from({ length: DOT_ROWS }, () => Array(DOT_COLS).fill('idle')))
const keyboardState = reactive<CellState[]>(Array(KEYBOARD_CHARS.length).fill('idle'))
const spacebarState = ref<CellState>('idle')

interface SeqItem {
    row: number
    col: number
    char: string
    kbCol: number
    isSpace: boolean
}

const sequence: SeqItem[] = []
IMAGE_ROWS.forEach((rowStr, row) => {
    rowStr.split('').forEach((char, col) => {
        // Skip the leading/trailing padding column added just to line up with the keyboard width.
        if (col === 0 || col === rowStr.length - 1) return
        const isSpace = char === ' '
        const kbCol = isSpace ? CENTER_COL : KEYBOARD_CHARS.indexOf(char)
        sequence.push({ row, col, char, kbCol, isSpace })
    })
})

// A space can't show as highlighted on its own, so swap in an asterisk while it's active.
function displayChar(row: number, col: number, char: string) {
    if (char === ' ' && imageState[row]![col] === 'highlight') return '·'
    return char
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function resetAll() {
    imageState.forEach(row => row.fill('idle'))
    dotState.forEach(row => row.fill('idle'))
    dotChars.forEach(row => row.fill('·'))
    keyboardState.fill('idle')
    spacebarState.value = 'idle'
}

let cancelled = false

async function animateChar(item: SeqItem) {
    // Note appears on the image and its keyboard key "arms" in black, at the same time.
    imageState[item.row]![item.col] = 'highlight'
    if (item.isSpace) spacebarState.value = 'black'
    else keyboardState[item.kbCol] = 'black'

    // Fall down the dot-matrix column, one row at a time, leaving no trail behind it.
    for (let r = 0; r < DOT_ROWS; r++) {
        dotChars[r]![item.kbCol] = item.isSpace ? '' : item.char
        dotState[r]![item.kbCol] = 'black'
        await sleep(ROW_STEP_MS)
        if (cancelled) return
        dotChars[r]![item.kbCol] = '·'
        dotState[r]![item.kbCol] = 'idle'
    }

    // The "hit": keyboard key flashes highlight, the source char locks in as done.
    if (item.isSpace) spacebarState.value = 'highlight'
    else keyboardState[item.kbCol] = 'highlight'
    imageState[item.row]![item.col] = 'black'

    await sleep(CHAR_GAP_MS)
    if (cancelled) return

    // Keyboard key settles back to idle once its flash has been shown.
    if (item.isSpace) spacebarState.value = 'idle'
    else keyboardState[item.kbCol] = 'idle'
}

async function runAnimation() {
    while (!cancelled) {
        resetAll()
        for (const item of sequence) {
            if (cancelled) return
            await animateChar(item)
        }
        if (cancelled) return
        await sleep(LOOP_DELAY_MS)
    }
}

onMounted(() => {
    runAnimation()
})

onBeforeUnmount(() => {
    cancelled = true
})
</script>

<style scoped>
</style>
