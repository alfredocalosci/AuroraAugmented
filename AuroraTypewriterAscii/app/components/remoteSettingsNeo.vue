<template>
  <div>
    <div class="flex items-center justify-between gap-x-2 w-full  border-t border-olivetti-shade-30 dark:border-olivetti-shade-40 pt-2">

      <div class="flex items-center gap-x-2">
        <UIcon
          name="i-lucide-audio-lines"
          class="size-4 text-black dark:text-olivetti-shade-30"
        />

        <p class="text-sm text-black dark:text-olivetti-shade-30 font-display">player settings</p>
      </div>

      <div class="flex items-center justify-end gap-x-4">

        <button
          class="cursor-pointer group"
          @click="toggleSettings('player')"
        >
          <UIcon
            name="i-lucide-circle-x"
            class="size-5 text-black dark:text-white group-hover:text-orange-500 transition-colors duration-300"
          />
        </button>
      </div>

    </div>

    <div class="my-3 ">
      <UFormField label="speed" :hint="`${speedBps} bps`" :ui="{ hint: 'text-black dark:text-olivetti-shade-30 font-normal text-xs', label: 'text-black dark:text-olivetti-shade-30 text-xs' }">
        <USlider v-model="speedBps" :min="40" :max="240" size="xs" :ui="{ thumb: 'ring-4',  }" color="neutral" id="speedBps"/>
      </UFormField>
    </div>

  </div>
</template>

<script lang="ts" setup>
  const { toggleSettings } = useShowSettings()

  const DEFAULT_SPEED_BPS = 120

  const props = defineProps<{
    speedBps?: number
  }>()

  const emit = defineEmits<{
    'update:speedBps': [value: number]
  }>()

  const speedBps = computed({
    get: () => props.speedBps ?? DEFAULT_SPEED_BPS,
    set: (value) => emit('update:speedBps', value),
  })
</script>

<style>

</style>
