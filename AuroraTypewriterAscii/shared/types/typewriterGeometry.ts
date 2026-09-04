export type CharPitch = 'pica' | 'pica-lite' | 'elite'
export type LineSpacing = 'single' | '1.5' | 'double'

export interface RowCountOptions {
  charsPerLine: number
  pitch: CharPitch
  lineSpacing: LineSpacing
  /** imgWidth / imgHeight of the source raster. */
  imageAspectRatio: number
}
