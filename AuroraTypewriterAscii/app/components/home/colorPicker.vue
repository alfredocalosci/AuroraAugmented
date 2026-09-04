<template>
    <div class="flex gap-x-2 items-center flex-wrap">
        <button
            v-for="(color, name) in TYPEWRITER_COLORS"
            :key="name"
            type="button"
            class="w-6 h-6  rounded-full cursor-pointer border-4 transition-colors duration-300"
            :class="[color.bg, name === activeColor ? color.border : ['border-mist-50', 'dark:border-mist-700', color.hoverBorder]]"
            :aria-label="color.label"
            :title="color.label"
            @click="emit('change', name)"
        />
    </div>
</template>

<script lang="ts" setup>
    import { TYPEWRITER_COLORS, type TypewriterColorName } from '~/utils/typewriterColors'

    defineProps<{
        activeColor: TypewriterColorName
    }>()

    const emit = defineEmits<{
        change: [value: TypewriterColorName]
    }>()
</script>
