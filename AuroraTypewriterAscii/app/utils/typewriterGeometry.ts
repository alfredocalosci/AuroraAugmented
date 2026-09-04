import type { CharPitch, LineSpacing, RowCountOptions } from '#shared/types/typewriterGeometry'

/** Characters per inch for each physical typewriter pitch setting. */
export const CHAR_PITCH_CPI: Record<CharPitch, number> = {
  pica: 10,
  'pica-lite': 11,
  elite: 12,
}

/** Lines per inch for each physical typewriter line-spacing setting. */
export const LINE_SPACING_LPI: Record<LineSpacing, number> = {
  single: 6,
  '1.5': 4,
  double: 3,
}

export function charWidthInches(pitch: CharPitch): number {
  return 1 / CHAR_PITCH_CPI[pitch]
}

export function lineHeightInches(spacing: LineSpacing): number {
  return 1 / LINE_SPACING_LPI[spacing]
}

/** Physical width/height ratio of a single character cell for a given pitch + line-spacing pair. */
export function charCellAspectRatio(pitch: CharPitch, spacing: LineSpacing): number {
  return charWidthInches(pitch) / lineHeightInches(spacing)
}

/**
 * Derives the number of output lines so the printed text block
 * (charsPerLine * charWidthInches wide, numLines * lineHeightInches tall)
 * preserves the source image's aspect ratio.
 */
export function computeRowCount(options: RowCountOptions): number {
  const { charsPerLine, pitch, lineSpacing, imageAspectRatio } = options
  const numLines =
    (charsPerLine * charWidthInches(pitch)) / (imageAspectRatio * lineHeightInches(lineSpacing))
  return Math.max(1, Math.round(numLines))
}
