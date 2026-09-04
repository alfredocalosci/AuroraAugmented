import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { convertSourceImageToTypewriterAscii } from '~/utils/imageToTypewriterAscii'

/**
 * Reactive wrapper around convertSourceImageToTypewriterAscii: recomputes on
 * every options change without re-decoding the source image.
 */
export function useImageAsciiConverter(
  sourceImage: MaybeRefOrGetter<SourceImageData | null>,
  options: MaybeRefOrGetter<ImageToAsciiOptions>
) {
  const result = computed(() => {
    const image = toValue(sourceImage)
    return image ? convertSourceImageToTypewriterAscii(image, toValue(options)) : null
  })

  return {
    text: computed(() => result.value?.text ?? ''),
    lines: computed(() => result.value?.lines ?? []),
    columns: computed(() => result.value?.columns ?? 0),
    rows: computed(() => result.value?.rows ?? 0),
    shadeRamp: computed(() => result.value?.shadeRamp ?? []),
    luminanceGrid: computed(() => result.value?.luminanceGrid ?? []),
  }
}
