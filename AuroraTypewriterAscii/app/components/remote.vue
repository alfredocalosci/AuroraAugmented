<template>
  <div
    class="flex flex-col justify-center items-center h-full gap-2 bg-white shadow-md rounded-2xl"
  >
    <button>
      <UIcon
        v-if="!playMode"
        name="i-lucide-circle-play"
        :style="{ color: playMode ? 'light-gray' : 'black' }"
        size="3rem"
        @click="play"
        class="cursor-pointer"
      />

      <UIcon
        v-else
        name="i-lucide-circle-pause"
        :style="{ color: playMode ? 'light-gray' : 'black' }"
        size="3rem"
        @click="pause"
        class="cursor-pointer"
      />
    </button>

    <button></button>

    <button>
      <UIcon
        name="i-lucide-skip-back"
        style="color: black"
        size="1.5rem"
        @click="emit('step-backward')"
        class="cursor-pointer"
        :class="{
          'opacity-20': playMode || count === 0,
          'opacity-100': !playMode && count > 0,
        }"
      />
    </button>

    <button>
      <UIcon
        name="i-lucide-rewind"
        style="color: black"
        size="1.5rem"
        @click="rewind"
        class="cursor-pointer"
        :class="{
          'opacity-20': playMode || count === 0,
          'opacity-100': !playMode && count > 0,
        }"
      />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: () => 120,
  },
  playMode: {
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits(["play", "pause", "rewind", "step-backward"]);

const play = () => {
  emit("play");
};
const pause = () => {
  emit("pause");
};

const rewind = () => {
  emit("rewind");
};
</script>

<style scoped></style>
