import type { DitherStrategy } from '#shared/types/atkinsonDither'

/** Standard Atkinson error-diffusion neighbor offsets, each carrying 1/8 of the error (3/4 total propagated). */
const ATKINSON_OFFSETS: Array<{ dx: number; dy: number; weight: number }> = [
  { dx: 1, dy: 0, weight: 1 / 8 },
  { dx: 2, dy: 0, weight: 1 / 8 },
  { dx: -1, dy: 1, weight: 1 / 8 },
  { dx: 0, dy: 1, weight: 1 / 8 },
  { dx: 1, dy: 1, weight: 1 / 8 },
  { dx: 0, dy: 2, weight: 1 / 8 },
]

function nearestShadeIndex(value: number, densities: number[]): number {
  let bestIndex = 0
  let bestDistance = Infinity
  for (let i = 0; i < densities.length; i++) {
    const distance = Math.abs(densities[i]! - value)
    if (distance < bestDistance) {
      bestDistance = distance
      bestIndex = i
    }
  }
  return bestIndex
}

/**
 * N-level generalization of Atkinson dithering: the standard binary (N=2,
 * levels {0,255}) algorithm, adapted by diffusing the error against the
 * quantized shade's actual density VALUE (never its ordinal index) so it
 * generalizes correctly to an arbitrary shade ramp.
 */
export const atkinsonDither: DitherStrategy = {
  quantize(luminanceGrid, shadeRamp) {
    const rows = luminanceGrid.length
    const cols = rows > 0 ? luminanceGrid[0]!.length : 0
    const densities = shadeRamp.map((entry) => entry.density)

    // mutable working buffer, never mutate the caller's grid
    const work = luminanceGrid.map((row) => [...row])
    const output: string[][] = Array.from({ length: rows }, () => new Array<string>(cols))

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const oldValue = Math.min(255, Math.max(0, work[y]![x]!))
        const shadeIndex = nearestShadeIndex(oldValue, densities)
        output[y]![x] = shadeRamp[shadeIndex]!.char

        const error = oldValue - densities[shadeIndex]!
        for (const { dx, dy, weight } of ATKINSON_OFFSETS) {
          const nx = x + dx
          const ny = y + dy
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            work[ny]![nx]! += error * weight
          }
        }
      }
    }

    return output
  },
}
