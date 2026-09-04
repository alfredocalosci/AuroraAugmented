import type { CharPitch, LineSpacing } from './typewriterGeometry'
import type { DitherStrategy } from './atkinsonDither'
import type { ShadeRampEntry } from './shadeRamp'

export interface ImageToAsciiOptions {
  /** 5..85 */
  charsPerLine: number
  pitch: CharPitch
  lineSpacing: LineSpacing
  availableChars: string
  /** default 8 */
  maxShades: number
  /** resolved ramp string; when present, used verbatim via shadeRampFromString instead of deriving from availableChars/maxShades */
  shadeRampOverride?: string
  /** -100..100, default 0 */
  brightness?: number
  /** -100..100, default 0 */
  contrast?: number
  /** default false */
  autoLevels?: boolean
  /** default 4 */
  supersample?: number
  /** default atkinsonDither */
  ditherStrategy?: DitherStrategy
}

export interface ImageToAsciiResult {
  text: string
  lines: string[]
  columns: number
  rows: number
  /** the ramp actually used, for UI display/debug */
  shadeRamp: ShadeRampEntry[]
  imageAspectRatio: number
  /** post-tone-adjust, pre-dither — for a "sampled image" preview */
  luminanceGrid: number[][]
}
