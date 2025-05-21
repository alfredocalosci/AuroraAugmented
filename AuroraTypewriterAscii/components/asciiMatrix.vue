<template>
    <div class="w-full mx-auto my-1 mb-4">
        <!-- row -->
        <div 
            class="flex justify-center leding-0 mRow"
            v-for="(row, indexR) in ascii_rows"
        >
            <!-- loop chars in row -->
            <span 
                v-for="(c, indexC) in row" 
                :key="indexR*asciiWidthP + indexC"
                :data-index="indexR*asciiWidthP + indexC"
                :class="{   
                    'bg-white': indexR*asciiWidthP + indexC > count,
                    'bg-stone-100': indexR*asciiWidthP + indexC < count,
                    'bg-green-500': indexR*asciiWidthP + indexC === count,
                    
                }"
                class="m-0 p-0 text-black "
            >
                {{ c== ' ' ? '&nbsp;' : c }}
            </span>
           
        </div>
       
    </div>
</template>

<script setup >


    const props = defineProps({
        sequence: {
            type: String,
            default: () => "wW...il"
        },
        count: {
            type: Number,
            default: () => 120
        },
        asciiWidthP: {
            type: Number,
            default: () => 38
        }
    })

    watch(
        () => props.sequence,
        (newVal) => {
           // console.log('sequence changed:', newVal);
            // split by \n
            // const rows = newVal.split('\n');
            // console.log(rows);
        }
    );

    const ascii_rows = computed(() => {
        // split by \n
        const rows = props.sequence.split('\n');
        // remove last element if it is empty
        rows.pop();
        

        // console.log(rows);
        return rows;
    });

    onMounted(() => {
        // console.log('mounted');
       
        // console.log(props.sequence);
    });
</script>


<style scoped>
    .mRow {
        height: 0.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.5em;
        font-family: 'Lekton', sans-serif;
    }
    .mRow span {
        width: 0.5rem;
        text-align: center;
    }
</style>
