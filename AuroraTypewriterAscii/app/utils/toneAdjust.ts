import type { ToneAdjustOptions } from '#shared/types/toneAdjust'

/** Linear min->0 / max->255 stretch, same idea as buildCharDensity.js's normalization step. */
export function autoLevelsStretch(grid: number[][]): number[][] {
  let min = Infinity
  let max = -Infinity
  for (const row of grid) {
    for (const value of row) {
      if (value < min) min = value
      if (value > max) max = value
    }
  }
  if (max <= min) return grid
  const scale = 255 / (max - min)
  return grid.map((row) => row.map((value) => (value - min) * scale))
}

export function adjustPixelBrightnessContrast(value: number, brightnessPct: number, contrastPct: number): number {
  const brightness255 = brightnessPct * 2.55
  const contrast255 = contrastPct * 2.55
  const factor = (259 * (contrast255 + 255)) / (255 * (259 - contrast255))
  const adjusted = factor * (value - 128) + 128 + brightness255
  return Math.min(255, Math.max(0, adjusted))
}

export function applyBrightnessContrast(grid: number[][], brightnessPct: number, contrastPct: number): number[][] {
  return grid.map((row) => row.map((value) => adjustPixelBrightnessContrast(value, brightnessPct, contrastPct)))
}

/** Auto-levels first (baseline normalization), then manual brightness/contrast layered on top. */
export function adjustTone(grid: number[][], options: ToneAdjustOptions): number[][] {
  let result = options.autoLevels ? autoLevelsStretch(grid) : grid
  const brightness = options.brightness ?? 0
  const contrast = options.contrast ?? 0
  if (brightness !== 0 || contrast !== 0) {
    result = applyBrightnessContrast(result, brightness, contrast)
  }
  return result
}
