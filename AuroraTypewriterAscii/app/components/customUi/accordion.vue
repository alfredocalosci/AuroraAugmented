<template>
  <div
    class="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
    :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
  >
    <div class="min-h-0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(defineProps<{
    isOpen?: boolean
  }>(), {
    isOpen: true,
  });
</script>

<style>

</style>
