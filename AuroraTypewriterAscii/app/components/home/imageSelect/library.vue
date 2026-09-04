<template>
  <div class="w-full bg-mist-50 px-2 py-2">
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
      <button
        v-for="item in asciiGalleryItems"
        :key="item.asciiFile"
        type="button"
        class="cursor-pointer group flex flex-col items-center "
        @click="select(item)"
      >
        <span
          class=" w-full border p-0.5 transition-colors duration-300"
          :class="selected === item.asciiFile ? 'border-orange-500' : 'border-mist-200 group-hover:border-orange-300'"
        >
          <img
            :src="`/img/gallery/raster_img/${item.thumbnail}`"
            :alt="item.name"
            class="h-full w-full object-cover"
          />
        </span>
        <!--
        <span class="text-[10px] text-mist-600 truncate w-full text-center">{{ item.name }}</span>
        --> 
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { asciiGalleryItems, type AsciiGalleryItem } from '~/utils/asciiGallery'

const emit = defineEmits<{
  select: [asciiFile: string]
}>()

// defaults to the "Cat" entry, matching ImageSelect.vue's own default option
const selected = ref(asciiGalleryItems[0]!.asciiFile)

function select(item: AsciiGalleryItem) {
  selected.value = item.asciiFile
  emit('select', item.asciiFile)
}
</script>
