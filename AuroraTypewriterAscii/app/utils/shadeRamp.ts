import { charDensity, densityChars, getCharDensity } from './charDensity'
import type { ShadeRampEntry } from '#shared/types/shadeRamp'

/**
 * Derives an ordered (dark -> light) shade-char ramp from the chars actually
 * available on the target typewriter, capped to at most maxShades entries.
 * Separate from asciiShadeChars.ts's extractShadeChars, which solves a
 * different problem (deriving used-chars from an already-rendered ascii
 * asset for the older pipeline).
 */
export function deriveShadeRamp(availableChars: string, maxShades: number): ShadeRampEntry[] {
  const availableSet = new Set(availableChars)
  // filtering densityChars (already dark -> light) both scopes to known-density
  // chars AND preserves that canonical order, de-duped since densityChars has no repeats
  const candidates = [...densityChars].filter((char) => availableSet.has(char))

  if (candidates.length === 0) return []
  if (candidates.length <= maxShades) {
    return candidates.map((char) => ({ char, density: charDensity[char]! }))
  }

  // space entries evenly across the density VALUE range (not ordinal count)
  // for perceptually even quantization steps, which matters for how well
  // Atkinson's error diffusion behaves
  const minDensity = charDensity[candidates[0]!]!
  const maxDensity = charDensity[candidates[candidates.length - 1]!]!
  const pickedIndices = new Set<number>()

  for (let level = 0; level < maxShades; level++) {
    const targetDensity =
      maxShades === 1 ? minDensity : minDensity + (level * (maxDensity - minDensity)) / (maxShades - 1)

    let bestIndex = -1
    let bestDistance = Infinity
    for (let i = 0; i < candidates.length; i++) {
      if (pickedIndices.has(i)) continue
      const distance = Math.abs(charDensity[candidates[i]!]! - targetDensity)
      if (distance < bestDistance) {
        bestDistance = distance
        bestIndex = i
      }
    }
    pickedIndices.add(bestIndex)
  }

  return [...pickedIndices]
    .map((i) => ({ char: candidates[i]!, density: charDensity[candidates[i]!]! }))
    .sort((a, b) => a.density - b.density)
}

/**
 * Resolves a user-hand-edited ramp string (e.g. from HomeMidtonesCharsEditor):
 * de-dupe, drop chars with no known density, re-sort dark -> light. Mirrors
 * midtonesCharsEditor.vue's local sortByShade helper, centralized here.
 */
export function shadeRampFromString(chars: string): ShadeRampEntry[] {
  const unique = new Set(chars)
  const entries: ShadeRampEntry[] = []
  for (const char of unique) {
    const density = getCharDensity(char)
    if (density === undefined) continue
    entries.push({ char, density })
  }
  return entries.sort((a, b) => a.density - b.density)
}
