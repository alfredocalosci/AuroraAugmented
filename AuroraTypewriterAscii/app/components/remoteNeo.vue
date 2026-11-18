<template>

  <nav class="grid grid-cols-[1fr_auto_1fr] items-center ml-2 mr-4 md:mx-auto md:max-w-2/3 h-24 md:h-16 my-0 md:mt-2 ">

    <div v-if="playMode==='pause'"
      class="flex justify-start items-center gap-x-0 md:gap-x-3"
    >
      <!-- up and down controls: row index -->
       <div class="flex flex-col justify-center items-center">
          <button
            class="w-12 h-12 md:w-8 md:h-8 "
            :disabled="!controlsEnabled"
            :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
            @click="incrementRow"
          >
            <UIcon
              name="lucide-chevron-up"
              class="text-white dark:text-olivetti-shade-30 size-6"
            />
          </button>
          <button
            class="w-12 h-12 md:w-8 md:h-8 "
            :disabled="!controlsEnabled"
            :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
            @click="decrementRow"
          >
            <UIcon
              name="lucide-chevron-down"
              class="text-white dark:text-olivetti-shade-30 size-6"
            />
          </button>
       </div>

       <!-- left and right controls: line (column) index -->
       <button
         class="w-12 h-12 md:w-8 md:h-8 mb-2"
         :disabled="!controlsEnabled"
         :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
         @click="decrementLine"
       >
         <UIcon
           name="lucide-arrow-left"
           class="text-white dark:text-olivetti-shade-30 size-8"
         />
       </button>
       <button
         class="w-12 h-12 md:w-8 md:h-8 mb-2"
         :disabled="!controlsEnabled"
         :class="controlsEnabled ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-20'"
         @click="incrementLine"
       >
         <UIcon
           name="lucide-arrow-right"
           class="text-white dark:text-olivetti-shade-30 size-8"
         />
       </button>
    </div>

    <div v-else></div>

    <div class="flex justify-center">
      <!-- play pause toggle -->
      <button
        id="play"
        v-if="playMode !== 'play'"
        class="cursor-pointer col-span-3 -mt-2 flex items-center justify-center"
        @click="play"
      >
        <UIcon
          name="custom:play"
          mode="svg"
          class="text-olivetti-green  size-15  lg:size-15"
        />
      </button>

      <button id="pause" v-else class="cursor-pointer  col-span-3 -mt-2 flex items-center justify-center" @click="pause">
        <UIcon
          name="custom:pause"
          mode="svg"
          class="text-olivetti-green size-15   lg:size-15"
        />
      </button>
    </div>

    <!-- right container-->
    <div  class="flex justify-end items-center">
      <button
        v-if="playMode === 'pause'"
        id="remove"
        :disabled="!controlsEnabled"
        class="flex items-center justify-center opacity-100 "
        :class="controlsEnabled ? 'cursor-pointer ' : 'cursor-not-allowed  '"
        @click="removeSession"
      >
        <UIcon
          name="custom:cross-circle"
          mode="svg"
          class=" size-12 "
          :class="controlsEnabled ? 'text-olivetti-red' : 'text-olivetti-shade-30 dark:text-olivetti-shade-50'"
        />
      </button>

      <p v-else class="font-display font-normal tracking-wide text-lg text-olivetti-shade-30 dark:text-olivetti-shade-30">06' 54"</p>
    </div>
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
    "increment-row",
    "decrement-row",
    "increment-line",
    "decrement-line",
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

  const incrementRow = () => {
    if (!controlsEnabled.value) return;
    emit("increment-row");
  };
  const decrementRow = () => {
    if (!controlsEnabled.value) return;
    emit("decrement-row");
  };
  const incrementLine = () => {
    if (!controlsEnabled.value) return;
    emit("increment-line");
  };
  const decrementLine = () => {
    if (!controlsEnabled.value) return;
    emit("decrement-line");
  };
</script>

<style scoped></style>
