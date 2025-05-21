<template>
    <div class="flex flex-col justify-center items-center h-full gap-2 bg-white shadow-md rounded-2xl">
                    <button>
                        <Icon 
                            v-if="!playMode"
                            name="mdi:play-circle-outline"
                            :style="{ color: playMode ? 'light-gray' : 'black' }"            
                            size="3rem"
                            @click="play"
                            class="cursor-pointer"
                        />

                        <Icon 
                            v-else
                            name="mdi:pause-circle-outline"
                            :style="{ color: playMode ? 'light-gray' : 'black' }"
                            size="3rem"
                            @click="pause"
                            class="cursor-pointer"
                        />

                        
                    </button>

                    <button>
                        
                    </button>

                    <button>
                        <Icon 
                            name="mdi:step-backward"    
                            style="color: black" 
                            size="1.5rem"
                            @click="emit('step-backward')"
                            class="cursor-pointer"
                            :class="{ 
                                        'opacity-20': playMode || count === 0,
                                        'opacity-100': !playMode && count > 0
                                    }"
                            
                        />
                    </button>

                    <button>
                        <Icon 
                            name="mdi:rewind"
                            style="color: black" 
                            size="1.5rem"
                            @click="rewind"
                            class="cursor-pointer"
                            :class="{ 
                                        'opacity-20': playMode || count === 0,
                                        'opacity-100': !playMode && count > 0
                                    }"
                        />
                    </button>

                </div>
</template>

<script setup>
    const props = defineProps({
        count: {
            type: Number,
            default: () => 120
        },
        playMode: {
            type: Boolean,
            default: () => false
        }
    })

    const emit = defineEmits(['play', 'pause', 'rewind', 'step-backward']);

    const play = () => {
        emit('play');
    }
    const pause = () => {
        emit('pause');
    }

    const rewind = () => {
         emit('rewind'); 
    }


</script>

<style scoped>
</style>