<template>
  <article class="hidden ml-6 lg:ml-0 lg:mt-6 md:flex lg:flex-col items-center gap-x-4 lg:gap-x-0 lg:gap-y-2 bg-mist-100 dark:bg-mist-900 pl-4 pr-6 pt-2 pb-px lg:px-3 lg:py-4 rounded-full">

    <UIcon
      name="i-lucide-settings-2"
      class="size-4 text-mist-400 dark:text-mist-500 mb-2 lg:mb-2 "
    />

    <button
      v-for="item in settingsItems" :key="item.label"
      class="cursor-pointer"
      @click="toggleSettings(item.label)"
    >
      <UIcon
        :name="item.icon"
        class="size-6"
        :class="showSettings[item.label] ? 'text-mist-700 dark:text-mist-200' : 'text-mist-400 dark:text-mist-500'"
      />
    </button>

  </article>
</template>

<script lang="ts" setup>
  const { showSettings, toggleSettings } = useShowSettings()

  const settingsItems: { label: SettingsPanel, icon: string }[] = [
    {
      label:'image',
      icon:"lucide-image"
    },
    {
      label:'ascii',
      icon:"lucide-a-large-small"
    },
    {
      label:'player',
      icon:"i-lucide-audio-lines"
    },
    {
      label:'keyboard',
      icon:"i-lucide-keyboard"
    }
  ];
</script>
