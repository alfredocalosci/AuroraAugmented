import type { KeyboardLayout } from './types'
import { densityChars } from '../charDensity'

/**
 * Derives the "available chars" subset for a keyboard layout: every char a
 * 'char'-type key can produce (lower/upper) plus the literal space from the
 * spacebar row, filtered against densityChars (dark -> light) to both scope
 * to known-density chars and preserve that canonical order — same pattern
 * shadeRamp.ts's deriveShadeRamp uses for availableChars -> ramp.
 */
export function getLayoutDensityChars(layout: KeyboardLayout): string {
  const available = new Set<string>([' '])
  for (const row of layout) {
    for (const key of row) {
      if (key.type !== 'char') continue
      if (key.lower) available.add(key.lower)
      if (key.upper) available.add(key.upper)
    }
  }
  return [...densityChars].filter((char) => available.has(char)).join('')
}
