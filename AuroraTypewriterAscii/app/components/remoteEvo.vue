<template>

  <nav class="grid grid-cols-9 w-full h-full items-center px-9 md:px-4 mt-2 py-2 md:py-0">

     <div class="block md:hidden"></div>

    <button
      id="rewind"
      :disabled="!controlsEnabled"
      :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
      @click="rewind"
    >
      <UIcon
        name="lucide:chevrons-left"
        class="text-black dark:text-white size-6"
      />
    </button>

     <div class="hidden md:block"></div>

    <button
      id="step-backward"
      :disabled="!controlsEnabled"
      :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
      @click="stepBackward"
    >
      <UIcon
        name="lucide:chevron-left"
        class="text-black dark:text-white size-9"
      />
    </button>

    <!-- play pause toggle -->
    <button
      id="play"
      v-if="playMode !== 'play'"
      class="cursor-pointer col-span-3 -mt-2"
      @click="play"
    >
      <UIcon
        name="gridicons:play"
        class="text-black dark:text-white size-10 md:size-12  lg:size-15"
      />
    </button>

     <button id="pause" v-else class="cursor-pointer  col-span-3 -mt-2" @click="pause">
      <UIcon
        name="gridicons:pause"
        class="text-black dark:text-white size-10 md:size-13  lg:size-15"
      
      />
    </button>

    <button
      id="step-forward"
      :disabled="!controlsEnabled"
      :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
      @click="stepForward"
    >
      <UIcon
        name="lucide:chevron-right"
        class="text-black dark:text-white size-9"
      />
    </button>

    <div></div>

    <button
      id="remove"
      :disabled="!controlsEnabled"
      :class="controlsEnabled ? 'cursor-pointer opacity-100 ' : 'cursor-not-allowed opacity-20 '"
      @click="removeSession"
    >
      <UIcon
        name="gridicons:cross-circle"
        class="text-red-600 dark:text-orange-500 "
        :class="controlsEnabled ? 'size-9' : 'size-6'"
      />
    </button>

  </nav>

</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: () => 120,
  },
  playMode: {
    type: String,
    default: () => "idle",
  },
});

const emit = defineEmits([
  "play",
  "pause",
  "rewind",
  "step-backward",
  "step-forward",
  "remove",
  "update:playMode",
]);

const controlsEnabled = computed(() => props.playMode === "pause");

const play = () => {
  emit("play");
  emit("update:playMode", "play");
};
const pause = () => {
  emit("pause");
  emit("update:playMode", "pause");
};

const rewind = () => {
  emit("rewind");
};

const stepBackward = () => {
  emit("step-backward");
};

const stepForward = () => {
  emit("step-forward");
};

const removeSession = () => {
  emit("remove");
  emit("update:playMode", "idle");
};
</script>

<style scoped></style>
