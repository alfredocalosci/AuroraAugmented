export interface SourceImageData {
  width: number
  height: number
  /** RGBA, row-major, same layout as CanvasRenderingContext2D.getImageData(). */
  data: Uint8ClampedArray
}

export interface RgbCell {
  r: number
  g: number
  b: number
}

export interface LoadImageDataOptions {
  /** Longest side is downscaled to this many px before sampling, purely to bound getImageData cost on huge photos. */
  maxDimension?: number
  /**
   * Reserved for a future crop feature — deliberately unused for now, kept so
   * image loading and region-selection stay conceptually separable.
   */
  sourceRect?: { x: number; y: number; width: number; height: number }
}

export interface SampleGridOptions {
  columns: number
  rows: number
  /** Sub-samples per axis averaged per output cell (supersample x supersample total samples). */
  supersample?: number
}
