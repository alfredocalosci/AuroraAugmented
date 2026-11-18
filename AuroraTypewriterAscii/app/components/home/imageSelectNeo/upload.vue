<template>
  <div
    ref="dropZoneRef"
    class="w-full border-4 border-dashed rounded-lg  py-6 flex flex-col items-center justify-center gap-y-1 cursor-pointer transition-colors duration-300"
    :class="isOverDropZone ? 'border-orange-500 bg-orange-50' : 'border-white '"
    @click="open()"
  >
    <UIcon
      name="i-lucide-cloud-upload"
      class="size-12 text-olivetti-shade-50"
    />
    <p class="text-sm text-olivetti-shade-40 text-center">drag & drop an image here, or click to browse</p>
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
