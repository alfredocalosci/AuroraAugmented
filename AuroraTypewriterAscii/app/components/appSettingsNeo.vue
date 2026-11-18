<template>
  <article class="flex items-center gap-x-0 border-l border-white pl-2 md:pl-4">

    <button
      v-for="item in settingsItems" :key="item.label"
      class="cursor-pointer w-12 h-12 pt-2"
      @click="toggleSettings(item.label)"
    >
      <UIcon
        :name="item.icon"
        class="size-7 "
        :class="showSettings[item.label] ? 'text-olivetti-shade-50 ' : 'text-olivetti-shade-30 ' "
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
