import { densityChars } from './charDensity'

/**
 * Derives an ordered (dark -> light) shade-char ramp from the characters
 * actually used in a loaded ascii image, using the font's density ordering
 * so the result stays a valid densityChars ramp (see CLAUDE.md's
 * "densityChars must stay in sync" convention).
 */
export function extractShadeChars(lines: string[]): string {
  const used = new Set(lines.join(''))
  return [...densityChars].filter((char) => used.has(char)).join('')
}
