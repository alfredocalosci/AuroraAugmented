<template>
  <div class="flex justify-between items-center p-1 pl-3  rounded bg-white">
    <input
      type="text"
      ref="stepper" id="stepper" name="stepper"
      :min="min" :max="max"
      inputmode="numeric"
      pattern="[0-9]*"
      class="text-xl font-bold w-full outline-none focus:outline-none focus:ring-0 focus:font-bold text-mist-800 "
      v-model.number="value"
      @beforeinput="onBeforeInput"
    />
    
    <!-- arrows buttons -->
    <div class="flex flex-col justify-center items-center gap-y-0">
      
      <button type="button" class="cursor-pointer group h-4" @click="increment">
        <UIcon
        name="i-lucide-chevron-up"
        class="size-4 text-black "
        />
      </button>

      <button type="button" class="cursor-pointer group h-4" @click="decrement">
        <UIcon
        name="i-lucide-chevron-down"
        class="size-4 text-black "
        />
      </button>
      
    </div>
    
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value?: number
  min?: number
  max?: number
}>(), {
  value: 10,
  min: 10,
  max: 100,
});

const emit = defineEmits<{
  'update:value': [value: number]
}>();

const value = computed({
  get: () => props.value,
  set: (val: number) => emit('update:value', val),
});

function onBeforeInput(event: InputEvent) {
  if (event.data && !/^[0-9]*$/.test(event.data)) {
    event.preventDefault();
  }
}

function increment() {
  value.value = Math.min(props.max, value.value + 1);
}

function decrement() {
  value.value = Math.max(props.min, value.value - 1);
}
</script>

<style>

</style>