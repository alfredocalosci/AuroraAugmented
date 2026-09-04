import { ref } from 'vue'
import { loadImageData } from '~/utils/imageSampling'

/**
 * Opens a file picker for an image, decodes the selection into raw pixel
 * data, and exposes an object-URL thumbnail for display.
 */
export function useImageFileLoader() {
  const { open: openDialog, onChange } = useFileDialog({ accept: 'image/*', multiple: false })

  const previewUrl = ref<string | null>(null)
  const sourceImage = ref<SourceImageData | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function loadFile(file: File) {
    isLoading.value = true
    error.value = null
    try {
      if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = URL.createObjectURL(file)
      sourceImage.value = await loadImageData(file)
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      sourceImage.value = null
    } finally {
      isLoading.value = false
    }
  }

  onChange((files) => {
    const file = files?.[0]
    if (file) void loadFile(file)
  })

  function open() {
    openDialog()
  }

  return { open, loadFile, previewUrl, sourceImage, isLoading, error }
}
