import type { RgbCell } from '#shared/types/imageSampling'

/** Rec. 709 luma coefficients — better match for sRGB's modern primaries. Default. */
export const LUMA_REC709 = { r: 0.2126, g: 0.7152, b: 0.0722 } as const

/** Rec. 601 luma coefficients — kept as an alternative/reference. */
export const LUMA_REC601 = { r: 0.299, g: 0.587, b: 0.114 } as const

/**
 * Applied directly to gamma-encoded (sRGB) RGB values, not linearized first —
 * consistent with fontDensity/buildCharDensity.js, which measures glyph
 * ink-coverage the same way, and the difference is swamped by the later
 * few-shade quantization/dithering anyway.
 */
export function rgbToLuminance(cell: RgbCell, coeffs: { r: number; g: number; b: number } = LUMA_REC709): number {
  return coeffs.r * cell.r + coeffs.g * cell.g + coeffs.b * cell.b
}

export function toLuminanceGrid(
  rgbGrid: RgbCell[][],
  coeffs: { r: number; g: number; b: number } = LUMA_REC709
): number[][] {
  return rgbGrid.map((row) => row.map((cell) => rgbToLuminance(cell, coeffs)))
}
