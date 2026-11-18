<template>
  <div class="w-full px-2 py-2">
    <div class="grid grid-cols-4 sm:grid-cols-5 gap-2 border-t border-olivetti-shade-10  pt-4">
      <button
        v-for="item in asciiGalleryItems"
        :key="item.thumbnail"
        type="button"
        class="cursor-pointer group flex flex-col items-center "
        @click="select(item)"
      >
        <span
          class=" w-full border p-0.5 transition-colors duration-300"
          :class="selected === item.thumbnail ? 'border-orange-500' : 'border-olivetti-shade-10 group-hover:border-orange-300'"
        >
          <img
            :src="`/img/gallery/raster_img/${item.thumbnail}`"
            :alt="item.name"
            class="h-full w-full object-cover"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { asciiGalleryItems, type AsciiGalleryItem } from '~/utils/asciiGallery'

const emit = defineEmits<{
  select: [rasterFile: string]
}>()

// emits the raster thumbnail (for halftone conversion), unlike home/imageSelect/library.vue
// which emits the premade asciiFile — no item is selected until the user picks one
const selected = ref<string | null>(null)

function select(item: AsciiGalleryItem) {
  selected.value = item.thumbnail
  emit('select', item.thumbnail)
}
</script>
