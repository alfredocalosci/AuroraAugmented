<template>
    <div>

        <div
            class="keyboard @container my-2 w-full hidden md:block"
            style="--key-size: clamp(1.85rem, 6.3cqw, 2.75rem); --key-pitch: calc(var(--key-size) + 0.25rem)"
            ref="kbHolder"
        >
            <div
                class="keyboard-row flex justify-center font-mono relative"
                v-for="(row, rowIndex) in mainRows" :key="rowIndex">

                <div v-if="mainRowFiller(rowIndex).leading > 0" class="shrink-0" :style="{ width: fillerWidth(mainRowFiller(rowIndex).leading) }"></div>

                <div
                    class="key shrink-0 flex items-center justify-center m-0.5 text-[clamp(0.7rem,3cqw,1.15rem)] font-normal  rounded-full shadow-lg/30"
                    v-for="(key, keyIndex) in row"
                    :key="refKey(rowIndex, keyIndex)"

                    :data-key="displayGlyph(key)"
                    :data-keyRow="rowIndex"
                    :data-keyColumn="keyIndex"
                    :ref="(el) => { keysR[refKey(rowIndex, keyIndex)] = el as HTMLElement | null }"
                    :style="keyStyle(key)"
                    :class="keyClasses(key, rowIndex, keyIndex)"
                    @click="onKeyClick(key)"
                    @mousedown="onKeyMouseDown(key)"
                    @mouseup="onKeyMouseUp(key)">

                    <input
                        v-if="editMode && key.type === 'char'"
                        :value="displayGlyph(key)"
                        maxlength="1"
                        class="w-full h-full bg-transparent text-inherit text-center outline-none p-0 m-0 border-0"
                        @focus="($event.target as HTMLInputElement).select()"
                        @input="onEditInput(rowIndex, keyIndex, $event)"
                    >
                    <template v-else>{{ displayGlyph(key) }}</template>
                </div>

                <div v-if="mainRowFiller(rowIndex).trailing > 0" class="shrink-0" :style="{ width: fillerWidth(mainRowFiller(rowIndex).trailing) }"></div>
            </div>
            <!-- spacebar row: centered under the bottom row's char keys, see `spacebar` -->
             <div
                class="keyboard-row flex justify-center font-mono"
             >
                <div v-if="spacebar.filler.leading > 0" class="shrink-0" :style="{ width: fillerWidth(spacebar.filler.leading) }"></div>

                <div
                    class="key shrink-0 mt-3 text-center text-xl font-normal cursor-pointer   rounded-full  shadow-lg/30 bg-mist-600 dark:bg-mist-900"
                    :style="{
                        width: fillerWidth(spacebar.widthUnits),
                        // height: 'var(--key-size)'
                        height: '1.25rem',
                    }"
                    :data-key="' '"
                    :ref="(el) => { keysR['k_space'] = el as HTMLElement | null }"
                >
                    &nbsp;
                </div>

                <div v-if="spacebar.filler.trailing > 0" class="shrink-0 " :style="{ width: fillerWidth(spacebar.filler.trailing) }"></div>
            </div>
        </div>

        <!-- on small devices -->
        <div class="block md:hidden">
            <div
                class="keyboard-row-mobile flex justify-center font-mono"
                v-for="(row, rowIndex) in mainRows" :key="rowIndex"
            >
                <div
                    v-for="(key, keyIndex) in row"
                    :key="`m_${rowIndex}_${keyIndex}`"
                    class="key-mobile shrink-0 flex items-center justify-center text-sm font-bold"
                    :class="mobileKeyClasses(key)"
                    :style="mobileKeyStyle(key)"
                >{{ mobileKeyGlyph(key) }}</div>
                
            </div>

            <div class="keyboard-row-mobile flex justify-center mt-1">

                <div
                    class="key-mobile-space bg-black rounded-full mt-1"
                    style="height: 1rem; width: 75%;"
                ></div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { KeyDef, KeyRow, KeyboardLayout, KeyPosition } from '~/utils/keyboardLayouts/types'

    const keysR = ref<Record<string, HTMLElement | null>>({});
    const kbHolder = ref<HTMLElement | null>(null);
    const { width } = useElementSize(kbHolder)

    // Three modes of operation, derived from two flags:
    // - playMode: guitarHero is running ('play' or 'pause'), densityChars keys are highlighted
    // - editMode: user can edit each key's lower/upper char
    // - standAloneMode: neither of the above (playMode 'idle', the default) — full keyboard, no dimming
    const props = withDefaults(defineProps<{
        layout: KeyboardLayout
        isUpper?: boolean
        editMode?: boolean
        playMode?: 'idle' | 'play' | 'pause'
        densityChars?: string
        /** last beat reported as sounding during playback (see guitarHeroEvo's
         * `sound` emit, relayed through the parent) - null when nothing is
         * sounding; type 'carriageReturn' isn't a keyboard key, so it's
         * ignored here (a parent-owned carriage-return lever can react to it) */
        activeSound?: SoundEvent | null
    }>(), {
        isUpper: true,
        editMode: false,
        playMode: 'idle',
        densityChars: 'Ñ@#W$9876543210?!abc;:+=-,._ ',
        activeSound: null,
    });

    const emit = defineEmits<{
        getKData: [data: KeyPosition[]]
        'update:layout': [layout: KeyboardLayout]
        'update:isUpper': [isUpper: boolean]
    }>();

    // local, toggle-driven copy of isUpper — kept in sync with the prop so a
    // parent can still force it externally (e.g. via v-model:isUpper), but the
    // shiftHold/shiftToggle keys below can flip it themselves without needing
    // the parent to own every keystroke
    const localIsUpper = ref(props.isUpper);
    watch(() => props.isUpper, (v) => { localIsUpper.value = v; });

    const toggleIsUpper = () => {
        localIsUpper.value = !localIsUpper.value;
        emit('update:isUpper', localIsUpper.value);
    };

    // shiftHold acts like caps-lock: one click flips case and it stays flipped
    const onKeyClick = (key: KeyDef) => {
        if (key.type === 'shiftHold') toggleIsUpper();
    };

    // shiftToggle acts like a physical shift key: momentary, flips on press
    // and flips back on release
    const onKeyMouseDown = (key: KeyDef) => {
        if (key.type === 'shiftToggle') toggleIsUpper();
    };

    const onKeyMouseUp = (key: KeyDef) => {
        if (key.type === 'shiftToggle') toggleIsUpper();
    };

    const refKey = (rowIndex: number, keyIndex: number) => `k_${rowIndex}_${keyIndex}`;

    // shiftToggle keys (⬆/⬇) render wider than a circle, not aspect-square
    const keyStyle = (key: KeyDef) => ({
        width: key.type === 'shiftToggle' ? 'calc(var(--key-size) * 4 / 3)' : 'var(--key-size)',
        height: 'var(--key-size)',
    });

    // layout's last row is always the spacebar; the rest render as regular rows
    const mainRows = computed(() => props.layout.slice(0, -1));

    // --- Row stagger ---
    // Each row is a `flex justify-center` box: adding an invisible leading/trailing
    // filler of width W shifts its visible keys by W/2 (centering splits the extra
    // width evenly on both sides). ROW_OFFSET_UNITS is where each row's own first
    // rendered key should land, in key-pitch units relative to row 0's first key.
    // Rows 2 and 3 splice in an extra key (↑, then the wide ⬆) before their first
    // "real" letter (A, Z) that a physical typewriter doesn't have, so to land A/Z
    // on the real QWERTY stagger (row1=+1/3, row2=+2/3, row3=+1), that extra key's
    // own position has to sit one key further left than the letter: 2/3-1=-1/3 for
    // row2 (↑ is standard width), and 1-4/3=-1/3 for row3 (⬆ is 4/3 wide).
    const ROW_OFFSET_UNITS = [0, 1 / 3, -1 / 3, -1 / 3];

    const keyWidthUnits = (key: KeyDef) => key.type === 'shiftToggle' ? 4 / 3 : 1;
    const rowWidthUnits = (row: KeyRow) => row.reduce((sum, key) => sum + keyWidthUnits(key), 0);

    // row 0 is the reference: every other row's filler corrects for both its own
    // offset and its natural width difference from row 0 (fewer/more/wider keys
    // change where `justify-center` would put it with zero filler)
    const referenceWidthUnits = computed(() => rowWidthUnits(mainRows.value[0] ?? []));

    // Each row's shift (in pitch units, from the row-0 axis) before the uniform
    // recenter correction below is applied.
    const preRecenterShift = (rowIndex: number, row: KeyRow) =>
        (ROW_OFFSET_UNITS[rowIndex] ?? 0) + (rowWidthUnits(row) - referenceWidthUnits.value) / 2;

    // Centering each row individually (around the row-0 axis) does NOT center the
    // *visible* staggered shape as a whole — e.g. spanish's rows 2/3 extend
    // further left than any row extends right of its own span, because a
    // 'spacer' key (row 0's trailing slot) occupies width for alignment but
    // renders invisible, so it shouldn't count toward the visible bounding box.
    // RECENTER_UNITS is derived from the current layout's own row widths (not a
    // hand-tuned constant) so it re-centers correctly for any preset's
    // proportions: the shift that makes the visible bounding box of all main
    // rows symmetric around the row-0 axis.
    const RECENTER_UNITS = computed(() => {
        let minLeft = Infinity;
        let maxRight = -Infinity;

        mainRows.value.forEach((row, rowIndex) => {
            const total = rowWidthUnits(row);
            let cursor = preRecenterShift(rowIndex, row) - total / 2;
            for (const key of row) {
                const w = keyWidthUnits(key);
                if (key.type !== 'spacer') {
                    minLeft = Math.min(minLeft, cursor);
                    maxRight = Math.max(maxRight, cursor + w);
                }
                cursor += w;
            }
        });

        if (!Number.isFinite(minLeft) || !Number.isFinite(maxRight)) return 0;
        return -(minLeft + maxRight) / 2;
    });

    const rowFiller = (offsetUnits: number, contentUnits: number) => {
        const signed = 2 * offsetUnits + (contentUnits - referenceWidthUnits.value);
        return signed >= 0 ? { leading: signed, trailing: 0 } : { leading: 0, trailing: -signed };
    };

    const mainRowFiller = (rowIndex: number) => {
        const row = mainRows.value[rowIndex];
        if (!row) return { leading: 0, trailing: 0 };
        return rowFiller((ROW_OFFSET_UNITS[rowIndex] ?? 0) + RECENTER_UNITS.value, rowWidthUnits(row));
    };

    const fillerWidth = (units: number) => `calc(var(--key-pitch) * ${units})`;

    // Spacebar: centered under the bottom row's 'char' keys (excluding the wide
    // shift keys at its ends), sized a little shorter than their combined span.
    const spacebar = computed(() => {
        const bottomIndex = mainRows.value.length - 1;
        const bottomRow = mainRows.value[bottomIndex];
        const empty = { widthUnits: 0, filler: { leading: 0, trailing: 0 } };
        if (!bottomRow) return empty;

        let cursor = (ROW_OFFSET_UNITS[bottomIndex] ?? 0) + RECENTER_UNITS.value;
        let spanStart: number | null = null;
        let spanEnd = 0;
        for (const key of bottomRow) {
            const w = keyWidthUnits(key);
            if (key.type === 'char') {
                if (spanStart === null) spanStart = cursor;
                spanEnd = cursor + w;
            }
            cursor += w;
        }
        if (spanStart === null) return empty;

        const span = spanEnd - spanStart;
        const widthUnits = Math.max(span - 1, 0);
        const offsetUnits = spanStart + (span - widthUnits) / 2;

        return { widthUnits, filler: rowFiller(offsetUnits, widthUnits) };
    });

    // mobile-only key exceptions: ⬆ (shiftToggle) hides its char and goes wide/red,
    // ↑ (shiftHold) hides its char and goes light gray, both at standard height
    const mobileKeyGlyph = (key: KeyDef) => {
        if (key.glyph === '⬆' || key.glyph === '⬇' || key.glyph === '↑') return '';
        return displayGlyph(key);
    };

    const mobileKeyStyle = (key: KeyDef) => ({
        width: key.glyph === '⬆' || key.glyph === '⬇' ? '1.5rem' : '1.25rem',
        height:  key.glyph === '⬆' || key.glyph === '⬇' || key.glyph === '↑' ? '1rem' : '1.333rem',
    });

    const mobileKeyClasses = (key: KeyDef) => ({
        'opacity-0': key.type === 'spacer',
        'bg-red-600 text-red-600 rounded-full': key.glyph === '⬆' || key.glyph === '⬇',
        'bg-gray-300 rounded-full': key.glyph === '↑',
    });

    const displayGlyph = (key: KeyDef) => {
        if (key.type === 'char') return localIsUpper.value ? key.upper : key.lower;
        if (key.type === 'space') return ' ';
        return key.glyph ?? '';
    };

    const findKey = (predicate: (key: KeyDef) => boolean) => {
        for (const [r, row] of mainRows.value.entries()) {
            for (const [c, key] of row.entries()) {
                if (predicate(key)) return { row: r, col: c, key };
            }
        }
        return null;
    };

    const keyPositions = computed<KeyPosition[]>(() => {
        const positions: KeyPosition[] = [];

        for (const char of props.densityChars) {
            const match = findKey(k => k.type === 'char' && (k.lower === char || k.upper === char));
            if (!match) continue;

            const ref = keysR.value[refKey(match.row, match.col)];
            if (!ref) continue;

            positions.push({
                key: char,
                isUpper: match.key.upper === char,
                x: ref.offsetLeft,
                y: ref.offsetTop,
                width: ref.offsetWidth,
                row: match.row,
                col: match.col,
                kChar: localIsUpper.value ? match.key.upper! : match.key.lower!,
                type: 'char',
            });
        }

        // fixed shift-toggle entry, matched by type+glyph so GuitarHero's
        // `key === '⬆'` lookup keeps working regardless of which preset is active
        const shiftUp = findKey(k => k.type === 'shiftToggle' && k.glyph === '⬆');
        if (shiftUp) {
            const ref = keysR.value[refKey(shiftUp.row, shiftUp.col)];
            if (ref) {
                positions.push({
                    key: '⬆', isUpper: true,
                    x: ref.offsetLeft, y: ref.offsetTop, width: ref.offsetWidth,
                    row: shiftUp.row, col: shiftUp.col, kChar: '⬆', type: 'shiftToggle',
                });
            }
        }

        // space key: x is centered on the container, same as keyboard.vue
        const spaceRef = keysR.value['k_space'];
        if (spaceRef) {
            positions.push({
                key: ' ', isUpper: false,
                x: width.value / 2 - spaceRef.offsetWidth / 2, y: 0, width: spaceRef.offsetWidth,
                row: mainRows.value.length, col: 0, kChar: ' ', type: 'space',
            });
        }

        return positions;
    });

    const keysInUsePositions = computed(() => new Set(
        keyPositions.value
            .filter(p => p.type === 'char')
            .map(p => `${p.row}_${p.col}`)
    ));

    const keyClasses = (key: KeyDef, rowIndex: number, keyIndex: number) => {
        const isShiftToggle = key.type === 'shiftToggle';
        const isShiftHold = key.type === 'shiftHold';
        // outside playMode (editMode or standAloneMode), show every key at
        // full strength — densityChars membership only matters while playing
        const inUse = props.playMode === 'idle' || keysInUsePositions.value.has(`${rowIndex}_${keyIndex}`);

        return {
            'non-editable': key.type !== 'char',
            'opacity-0 pointer-events-none': key.type === 'spacer',
            'cursor-pointer': props.editMode || isShiftToggle || isShiftHold,
            'bg-red-700': isShiftToggle,
            'text-red-700': isShiftToggle,
            'text-white': !isShiftToggle,
            'bg-mist-400 dark:bg-mist-600': isShiftHold,
            'bg-mist-600 dark:bg-mist-900 dark:text-white': !isShiftToggle && !isShiftHold && key.type !== 'spacer' && inUse,
            'bg-mist-300 dark:bg-mist-700 dark:text-mist-500': !isShiftToggle && !isShiftHold,
        };
    };

    // flashes a key's border on each sound: driven imperatively via the Web
    // Animations API (not a reactive class + CSS transition) because the
    // same key can sound on consecutive beats (a run) - props.activeSound is
    // a fresh object every beat even when the char repeats, so this watch
    // fires every time, but a class binding wouldn't (Vue sees the same
    // truthy value and never toggles the class off/on, so a CSS transition
    // would never restart). animate() always plays a new instance regardless.
    const FLASH_BG_COLOR = '#f97316'; // tailwind orange-500
    const FLASH_DURATION_MS = 300;

    const flashKey = (elKey: string) => {
        const el = keysR.value[elKey];
        if (!el) return;
        // Read the resting bg color from the DOM rather than hardcoding it -
        // it already reflects bg-mist-600/dark:bg-mist-900 for the active color mode.
        const restingColor = getComputedStyle(el).backgroundColor;
        el.animate(
            [{ backgroundColor: FLASH_BG_COLOR }, { backgroundColor: restingColor }],
            { duration: FLASH_DURATION_MS, easing: 'ease-out' }
        );
    };

    watch(() => props.activeSound, (sound) => {
        if (!sound || sound.type !== 'note') return;

        if (sound.char === ' ') {
            flashKey('k_space');
            return;
        }

        const match = findKey(k => k.type === 'char' && (k.lower === sound.char || k.upper === sound.char));
        if (match) flashKey(refKey(match.row, match.col));

        if (sound.needsShift) {
            const shiftUp = findKey(k => k.type === 'shiftToggle' && k.glyph === '⬆');
            if (shiftUp) flashKey(refKey(shiftUp.row, shiftUp.col));
        }
    });

    const onEditInput = (rowIndex: number, keyIndex: number, event: Event) => {
        const input = event.target as HTMLInputElement;
        const newChar = input.value.slice(-1) || ' ';
        input.value = newChar;

        const newLayout = props.layout.map(row => row.slice());
        const row = newLayout[rowIndex];
        const existing = row?.[keyIndex];
        if (!row || !existing) return;

        const key: KeyDef = { ...existing };
        if (localIsUpper.value) key.upper = newChar; else key.lower = newChar;
        row[keyIndex] = key;

        emit('update:layout', newLayout);
    };

    onMounted(() => {
        emit('getKData', keyPositions.value);
    });

    // re-emit whenever the underlying positions change (layout edits,
    // densityChars changes, shift/case toggles, container resize)
    watch(keyPositions, (data) => {
        emit('getKData', data);
    });
    
</script>

<style scoped>
</style>
