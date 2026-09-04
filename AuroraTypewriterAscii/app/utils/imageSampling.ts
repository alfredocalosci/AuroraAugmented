import type { SourceImageData, RgbCell, LoadImageDataOptions, SampleGridOptions } from '#shared/types/imageSampling'

const DEFAULT_MAX_DIMENSION = 1600

/** Loads an <img> element from a URL (a gallery path or an object URL), for feeding into loadImageData. */
export function loadImageElementFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    img.src = url
  })
}

async function toImageBitmapSource(
  source: HTMLImageElement | ImageBitmap | Blob
): Promise<ImageBitmap | HTMLImageElement> {
  if (source instanceof Blob) return createImageBitmap(source)
  return source
}

/** Decodes an image source into raw RGBA pixel data via a plain canvas. */
export async function loadImageData(
  source: HTMLImageElement | ImageBitmap | Blob,
  options: LoadImageDataOptions = {}
): Promise<SourceImageData> {
  const maxDimension = options.maxDimension ?? DEFAULT_MAX_DIMENSION
  const drawable = await toImageBitmapSource(source)
  const naturalWidth = drawable instanceof HTMLImageElement ? drawable.naturalWidth : drawable.width
  const naturalHeight = drawable instanceof HTMLImageElement ? drawable.naturalHeight : drawable.height

  const scale = Math.min(1, maxDimension / Math.max(naturalWidth, naturalHeight))
  const width = Math.max(1, Math.round(naturalWidth * scale))
  const height = Math.max(1, Math.round(naturalHeight * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Could not acquire a 2D canvas context')
  ctx.drawImage(drawable, 0, 0, width, height)

  const imageData = ctx.getImageData(0, 0, width, height)
  return { width, height, data: imageData.data }
}

const DEFAULT_SUPERSAMPLE = 4

/**
 * Box-filter/supersampling downsample of the source image into a columns x
 * rows grid of averaged RGB cells. Deliberately generic: the caller (see
 * typewriterGeometry.computeRowCount) is responsible for deriving `rows`
 * from the real physical char-cell aspect ratio, so the per-cell source-pixel
 * box here is already non-square in exactly the right proportion without
 * this function needing to know anything about pitch/line-spacing.
 */
export function sampleGrid(image: SourceImageData, options: SampleGridOptions): RgbCell[][] {
  const { columns, rows } = options
  const supersample = options.supersample ?? DEFAULT_SUPERSAMPLE
  const { width, height, data } = image

  const grid: RgbCell[][] = []
  for (let y = 0; y < rows; y++) {
    const srcYStart = (y * height) / rows
    const srcYEnd = ((y + 1) * height) / rows
    const row: RgbCell[] = []
    for (let x = 0; x < columns; x++) {
      const srcXStart = (x * width) / columns
      const srcXEnd = ((x + 1) * width) / columns

      let sumR = 0
      let sumG = 0
      let sumB = 0
      for (let sy = 0; sy < supersample; sy++) {
        const py = clampIndex(
          Math.floor(srcYStart + ((sy + 0.5) / supersample) * (srcYEnd - srcYStart)),
          height
        )
        for (let sx = 0; sx < supersample; sx++) {
          const px = clampIndex(
            Math.floor(srcXStart + ((sx + 0.5) / supersample) * (srcXEnd - srcXStart)),
            width
          )
          const idx = (py * width + px) * 4
          sumR += data[idx]!
          sumG += data[idx + 1]!
          sumB += data[idx + 2]!
        }
      }
      const sampleCount = supersample * supersample
      row.push({ r: sumR / sampleCount, g: sumG / sampleCount, b: sumB / sampleCount })
    }
    grid.push(row)
  }
  return grid
}

function clampIndex(value: number, length: number): number {
  return Math.min(length - 1, Math.max(0, value))
}
