import { computeRowCount } from './typewriterGeometry'
import type { SourceImageData } from '#shared/types/imageSampling'
import { loadImageData, sampleGrid } from './imageSampling'
import { toLuminanceGrid } from './luminance'
import { adjustTone } from './toneAdjust'
import type { ShadeRampEntry } from '#shared/types/shadeRamp'
import { deriveShadeRamp, shadeRampFromString } from './shadeRamp'
import { atkinsonDither } from './atkinsonDither'
import type { ImageToAsciiOptions, ImageToAsciiResult } from '#shared/types/imageToTypewriterAscii'

function resolveShadeRamp(options: ImageToAsciiOptions): ShadeRampEntry[] {
  if (options.shadeRampOverride !== undefined) {
    return shadeRampFromString(options.shadeRampOverride)
  }
  return deriveShadeRamp(options.availableChars, options.maxShades)
}

/** Sync pipeline given an already-decoded image — cheap enough to rerun on every parameter change. */
export function convertSourceImageToTypewriterAscii(
  image: SourceImageData,
  options: ImageToAsciiOptions
): ImageToAsciiResult {
  const imageAspectRatio = image.width / image.height
  const columns = options.charsPerLine
  const rows = computeRowCount({
    charsPerLine: columns,
    pitch: options.pitch,
    lineSpacing: options.lineSpacing,
    imageAspectRatio,
  })

  const rgbGrid = sampleGrid(image, { columns, rows, supersample: options.supersample })
  const rawLuminanceGrid = toLuminanceGrid(rgbGrid)
  const luminanceGrid = adjustTone(rawLuminanceGrid, {
    autoLevels: options.autoLevels,
    brightness: options.brightness,
    contrast: options.contrast,
  })

  const shadeRamp = resolveShadeRamp(options)

  let lines: string[]
  if (shadeRamp.length === 0) {
    lines = []
  } else {
    const ditherStrategy = options.ditherStrategy ?? atkinsonDither
    const charGrid = ditherStrategy.quantize(luminanceGrid, shadeRamp)
    lines = charGrid.map((row) => row.join(''))
  }

  return {
    text: lines.join('\n'),
    lines,
    columns,
    rows,
    shadeRamp,
    imageAspectRatio,
    luminanceGrid,
  }
}

/** Async pipeline: decodes the image once, then delegates to the sync pipeline. */
export async function convertImageToTypewriterAscii(
  imageSource: HTMLImageElement | ImageBitmap | Blob,
  options: ImageToAsciiOptions
): Promise<ImageToAsciiResult> {
  const image = await loadImageData(imageSource)
  return convertSourceImageToTypewriterAscii(image, options)
}
