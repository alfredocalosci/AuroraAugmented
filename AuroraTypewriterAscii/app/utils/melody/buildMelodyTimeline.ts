import type { KeyPosition } from '~/utils/keyboardLayouts/types'
import type { BuildMelodyOptions, MelodyEvent, MelodyTimeline } from './types'
import { pentatonicScale } from './pentatonicScale'

const DEFAULT_BPM = 90
const DEFAULT_MAX_RUN_BEATS = 4
const DEFAULT_CARRIAGE_RETURN_BEATS = 4

// djb2 string hash, used only to seed the PRNG below - doesn't need to be
// cryptographically sound, just stable across runs for the same input string
function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  return hash >>> 0
}

// mulberry32: tiny seeded PRNG so the random run-splitting below is
// deterministic for a given asciiImageString - re-running the builder (e.g.
// duration estimate computed while idle, or a resume mid-playback) always
// produces the exact same beat layout instead of reshuffling on every call
function mulberry32(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Converts an ascii-art string into a rhythmic sequence of key/rest/
 * carriage-return beats: same-key runs play on consecutive beats (capped at
 * maxRunBeats, split with rests when longer), a rest beat is inserted before
 * every change of key (real typewriter finger-repositioning time), and each
 * row ends with a block of carriageReturnBeats rests. Pure function - safe to
 * call from a computed even while idle, for duration estimation.
 */
export function buildMelodyTimeline(opts: BuildMelodyOptions): MelodyTimeline {
  const {
    asciiImageString,
    keyPositions,
    bpm = DEFAULT_BPM,
    maxRunBeats = DEFAULT_MAX_RUN_BEATS,
    carriageReturnBeats = DEFAULT_CARRIAGE_RETURN_BEATS,
  } = opts

  const beatDuration = 60 / bpm
  const events: MelodyEvent[] = []

  if (!asciiImageString || keyPositions.length === 0) {
    return { events, beatDuration, totalBeats: 0, totalDurationSeconds: 0 }
  }

  // ascending by x, wrapping into the pentatonic scale - same approach the
  // legacy guitarHero.vue used for its keysByX-indexed pitch lookup
  const xSortedKeys = [...keyPositions].sort((a, b) => a.x - b.x)
  const noteForKey = (key: KeyPosition) => pentatonicScale[xSortedKeys.indexOf(key) % pentatonicScale.length]!
  const centerX = (key: KeyPosition) => key.x + key.width / 2
  const keyForChar = (char: string) => xSortedKeys.find((k) => k.key === char && k.type !== 'shiftToggle')
  const shiftKey = xSortedKeys.find((k) => k.type === 'shiftToggle')

  const rng = mulberry32(hashString(asciiImageString))
  let beatIndex = 0

  const pushEvent = (partial: Omit<MelodyEvent, 'beatIndex' | 'time'>) => {
    events.push({ ...partial, beatIndex, time: beatIndex * beatDuration })
    beatIndex++
  }

  const rows = asciiImageString.split('\n')
  rows.forEach((rawRow, rowIndex) => {
    // trailing spaces aren't typed - the carriage return handles the
    // horizontal reset early, so there's no need to spend beats on them
    const row = rawRow.replace(/\s+$/, '')
    let lineIndex = 0
    let prevChar: string | null = null
    let i = 0

    while (i < row.length) {
      const char = row[i]!
      const key = keyForChar(char)
      if (!key) {
        // no key on the current layout/densityChars can produce this char -
        // skip it silently rather than spending a beat on an untypeable char
        i++
        continue
      }

      let runLength = 1
      while (row[i + runLength] === char) runLength++

      if (prevChar !== null && prevChar !== char) {
        pushEvent({ type: 'rest', rowIndex, lineIndex })
      }

      let remaining = runLength
      let firstChunk = true
      while (remaining > 0) {
        if (!firstChunk) {
          pushEvent({ type: 'rest', rowIndex, lineIndex })
        }
        const chunkSize = Math.min(remaining, 1 + Math.floor(rng() * maxRunBeats))
        const needsShift = key.isUpper && Boolean(shiftKey)
        for (let g = 0; g < chunkSize; g++) {
          pushEvent({
            type: 'note',
            rowIndex,
            lineIndex,
            char,
            note: noteForKey(key),
            x: centerX(key),
            ...(needsShift ? { shiftNote: noteForKey(shiftKey!), shiftX: centerX(shiftKey!) } : {}),
          })
          lineIndex++
        }
        remaining -= chunkSize
        firstChunk = false
      }

      prevChar = char
      i += runLength
    }

    // an empty row goes straight from the previous row's trailing CR block
    // into its own, with nothing pushed in between - without a break, two
    // (or more) consecutive carriage-return blocks would sound like one
    // indistinguishable run of identical clicks instead of separate actions
    if (events[events.length - 1]?.type === 'carriageReturn') {
      pushEvent({ type: 'rest', rowIndex, lineIndex })
    }

    for (let c = 0; c < carriageReturnBeats; c++) {
      pushEvent({ type: 'carriageReturn', rowIndex, lineIndex })
    }
  })

  return {
    events,
    beatDuration,
    totalBeats: beatIndex,
    totalDurationSeconds: beatIndex * beatDuration,
  }
}
