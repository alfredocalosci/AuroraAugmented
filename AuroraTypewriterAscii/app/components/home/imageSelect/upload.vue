<template>
  <div
    ref="dropZoneRef"
    class="w-full border-4 border-dashed rounded-lg px-2 py-4 flex flex-col items-center justify-center gap-y-1 cursor-pointer transition-colors duration-300"
    :class="isOverDropZone ? 'border-orange-500 bg-orange-50' : 'border-mist-300 bg-mist-50'"
    @click="open()"
  >
    <UIcon
      name="i-lucide-cloud-upload"
      class="size-12 text-mist-300"
    />
    <p class="text-xs text-mist-600">drag & drop an image here, or click to browse</p>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  select: [file: File]
}>()

const dropZoneRef = ref<HTMLElement | null>(null)

const { open, onChange } = useFileDialog({ accept: 'image/*', multiple: false })

onChange((files) => {
  const file = files?.[0]
  if (file) emit('select', file)
})

const { isOverDropZone } = useDropZone(dropZoneRef, {
  dataTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  multiple: false,
  onDrop: (files) => {
    const file = files?.[0]
    if (file) emit('select', file)
  },
})
</script>
