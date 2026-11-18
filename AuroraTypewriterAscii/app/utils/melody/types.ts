import type { KeyPosition } from '~/utils/keyboardLayouts/types'

export type MelodyEventType = 'note' | 'rest' | 'carriageReturn'

export interface MelodyEvent {
  /** absolute beat number from the timeline's start */
  beatIndex: number
  /** seconds from the timeline's start: beatIndex * beatDuration */
  time: number
  type: MelodyEventType
  /** ascii image row this event belongs to (maps to rowIndex) */
  rowIndex: number
  /**
   * key-press index within the row, before this event (maps to lineIndex).
   * Only meaningful for 'note' events.
   */
  lineIndex: number
  /** typed character (type === 'note') */
  char?: string
  /** pentatonic note name, e.g. 'C4' (type === 'note', unset when isSpace) */
  note?: string
  /** key center-x in px, from keyPositions (type === 'note') */
  x?: number
  /** true when this note event's key is the spacebar - it gets a dedicated
   *  bass/percussion hit (see useMelodyPlayer's spaceSynth) instead of a
   *  pentatonic note, and a rect instead of a dot in guitarHeroNeo.vue */
  isSpace?: boolean
  /** companion note for the shiftToggle key, present when char requires shift */
  shiftNote?: string
  /** companion shiftToggle key center-x, present when char requires shift */
  shiftX?: number
}

export interface MelodyTimeline {
  events: MelodyEvent[]
  /** seconds per beat, 60 / bpm */
  beatDuration: number
  totalBeats: number
  totalDurationSeconds: number
}

export interface BuildMelodyOptions {
  asciiImageString: string
  keyPositions: KeyPosition[]
  /** beats per minute driving the base rhythm */
  bpm?: number
  /** longest a run of the same key plays consecutively before a forced rest */
  maxRunBeats?: number
  /** rest beats appended after each row, to allow the carriage-return action */
  carriageReturnBeats?: number
}
