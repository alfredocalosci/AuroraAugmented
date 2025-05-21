<template>
    <!-- from https://www.lylianezli.com/blog/nuxt-p5 -->
    <div ref="canvasContainer" class="canvas-container my-6"></div>      
</template>
<script setup>
    import { onMounted, ref, onBeforeMount } from 'vue';

    const props = defineProps({
        sketch: {
            type: Function,
            required: true
        },
    });

    const canvasContainer = ref(null);
    const p5Instance = ref(null);
    // let p5Instance = null; // hold the p5 instance

    onMounted(async () => {
        const { default: P5 } = await import("p5");
        p5Instance.value = new P5(props.sketch, canvasContainer.value);
    });

    // Cleanup the p5 instance when the component is unmounted
    onBeforeMount(() => {
        if (p5Instance.value) {
            p5Instance.value.remove();
        }
    });
    

</script>