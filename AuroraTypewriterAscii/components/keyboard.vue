<template>
    <div>
        <div class="keyboard my-4 w-full" ref="kbHolder">
            <!-- :ref="'k_' + key" -->
            <div 
                class="keyboard-row flex justify-center font-mono relative"
                v-for="(row, rowIndex) in (isUpper ? keys_upper : keys_lower)" :key="rowIndex">
                <div 
                    class="key pt-2 pb-1 m-0.5 text-center font-normal cursor-pointer border rounded-full shadow-xl  "
                    v-for="(key, keyIndex) in row" 
                    
                    :key="'k_' + key"
                    :data-key="key" 
                    :data-keyRow="rowIndex"
                    :data-keyColumn="keyIndex"
                    :ref="el => (keysR['k_' + key] = el)"
                    :class="{ 
                        'non-editable': nonEditableKeys.includes(key),
                        'opacity-0': key === '¶',
                        'bg-red-600': key === '⬆' || key === '⬇',
                        'text-red-600': key === '⬆' || key === '⬇',
                        'text-white': key !== '⬆' && key != '⬇',
                        'bg-stone-400': key === '↑',
                        'bg-stone-600': key !== '⬆' && key !== '↑' && key !== '' && key != '⬇' && (keysInUse.includes(key) || props.densityChars == 'ALL'),
                        'bg-stone-300': key !== '⬆' && key !== '↑' && key != '⬇',

                        'text-xl': !isCompact,
                        'text-sm': isCompact,
                        'px-3': isCompact,
                        'px-4': !isCompact,
                         }">
                    {{ key }}
                </div>

                <!-- extra space ? -->
                 <div 
                    v-for="(i, index) in 4-rowIndex"
                    class="w-[0.5rem]"
                ></div>


                


            </div>
            <!-- spacebar row -->
             <div
                class="keyboard-row flex justify-center font-mono"
             >
             <div
                class="key px-4  mt-3 text-center text-xl font-normal cursor-pointer border rounded-full shadow-md bg-stone-600 w-[28rem]"
                data-key=" " 
                key="k_ "
                :ref="el => (keysR['k_ '] = el)"
            >
                &nbsp;
             </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const keysR = ref({});

    const kbHolder = ref(null);
    import { useElementSize } from '@vueuse/core'
    const { width, height } = useElementSize(kbHolder)


    const props = defineProps({
        keys_lower: {
            type: Array,
            default: () => [
                ["*","ª","2","3","4","5","6","7","8","9","-","ç","¶"],
                ["q","w","e","r","t","y","u","i","o","p","`","←"],
                ["↑","a","s","d","f","g","h","j","k","l","ñ","´","↑"],
                ["⬆","z","x","c","v","b","n","m",",",".",":","⬇"],
               
            ]
        },
        keys_upper: {
            type: Array,
            default: () => [
                ["*","º","‟","/","(",")","&","-","¿","?","!","$","¶"],
                ["Q","W","E","R","T","Y","U","I","O","P","^","←"],
                ["↑","A","S","D","F","G","H","J","K","L","Ñ","¨","↑"],
                ["⬆","Z","X","C","V","B","N","M",";","=","%","⬇"],
              
            ]
        },
        nonEditableKeys: {
            type: Array,
            default: () => ["↑", "←","⬆", "⬇", "¶"]
        },
        speed: {
            type: Number,
            default: 100
        },
        isUpper: {
            type: Boolean,
            default: true
        },
        editMode: {
            type: Boolean,
            default: false
        },
        isCompact: {
            type: Boolean,
            default: false
        },
        densityChars:{
            type:String,
            default: 'Ñ@#W$9876543210?!abc;:+=-,._ '
        },
    });

    const keys_x_loc = computed(() => {
     
        const xLocs = [];
        // loop density chars
        for (let i = 0; i < props.densityChars.length; i++) {
            
            const char = props.densityChars.charAt(i);
            
            let isUpperK = true;
            let kRow = -1;
            let kCol = -1;
            let kChar = '';
            let found = false;

            // loop keys_lower
            for (let j = 0; j < props.keys_lower.length; j++) {
                for(let k = 0; k < props.keys_lower[j].length; k++) {             
                    if (char === props.keys_lower[j][k]) {
                        kRow = j;
                        kCol = k;
                        isUpperK = false;
                        kChar = props.keys_upper[j][k];
                        found= true;
                    }
                }
            } // end of loop keys_lower

            if(!found){ 
                // loop keys_upper
                for (let j = 0; j < props.keys_upper.length; j++) {
                    for(let k = 0; k < props.keys_upper[j].length; k++) {
                        if (char === props.keys_upper[j][k]) {
                            kRow = j;
                            kCol = k;
                            isUpperK = true;
                            kChar = props.keys_upper[j][k];
                        }
                    }
                }
            } // end if not found

            // spece allways lower case
            if(char === ' '){isUpperK = false;}
            const keyRef = keysR.value['k_' + kChar];
            
            if (keyRef) {  
                xLocs.push({ key: char, isUpper: isUpperK, x: keyRef.offsetLeft, y:keyRef.offsetTop, width: keyRef.offsetWidth, row: kRow, col: kCol, kChar: kChar });
            }
            
        
        } // end of loop density chars
    
        // add UPPER key
        const keyRefUpper = keysR.value['k_⬆'];
        if (keyRefUpper) {  
            xLocs.push({ key: '⬆', isUpper: true, x: keyRefUpper.offsetLeft, y:keyRefUpper.offsetTop,width: keyRefUpper.offsetWidth, row: 3, col: 0, kChar: '⬆' });
        }
        // add SPACE key : x is half of the whole width
        const keyRefSpace = keysR.value['k_ '];
        if (keyRefSpace) {  
            xLocs.push({ key: ' ', isUpper: false, x: width.value/2 - (keyRefSpace.offsetWidth/2), y:0, width: keyRefSpace.offsetWidth, row: 4, col: 0, kChar: ' ' });
        }

        // allways first and las key of the last row
        return xLocs;
    });

    const emit = defineEmits(['getKData']);

    const emitKData = (kd) => {
        emit('getKData', kd);
    }

    const keysInUse = computed(() => {
        // return JSON.parse(JSON.stringify(keys_x_loc.value)).map(k => k.kChar);
        return keys_x_loc.value.map(k => k.kChar);
    });

    onBeforeMount(() => {
        // get key's x values
        // this.$emit("enlargeText", "someValue");
    });

    onMounted(() => {   
        emitKData(keys_x_loc.value);
        // console.log(keys_x_loc.value.map(k => k.kChar));
        // console.log(keysInUse.value);
        console.log(keys_x_loc.value)
    });
    
</script>

<style scoped>
</style>