<template>
  <div ref="containerRef" class="h-full w-full">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
     
      <rect :x="width-25" y="25" width="50" height="25" rx="10" ry="10" class="fill-mist-300 dark:fill-gray-800"></rect>

      <rect :x="width-25" y="25" width="20" :height="leverHeight" :transform="`rotate(${angle}, ${width - 15}, 30)`" rx="10" ry="10" class="fill-mist-700 dark:fill-mist-500"/>

    </svg>
  </div>
</template>

<script lang="ts" setup>
  const containerRef = useTemplateRef('containerRef')
  const { width, height } = useElementSize(containerRef)
  const leverHeight = computed(() => Math.max(0, height.value - 25))

  const { angle = 12 } = defineProps<{ angle?: number }>()
</script>

<style>

</style>