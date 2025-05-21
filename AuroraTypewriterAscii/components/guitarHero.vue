<template>
    <div ref="gHeroHolder" class="w-full h-[33vh] bg-stone-300">
        <NuxtP5 :sketch="gHero" />
    </div>
</template>

<script setup>
    
    const gHeroHolder = ref(null);
    // nuxt get width and height of ref container
    import { useElementSize } from '@vueuse/core'
    const { width, height } = useElementSize(gHeroHolder)

    // props list
    const props = defineProps({
        densityChars:{
            type:String,
            default: 'Ñ@#W$9876543210?!abc;:+=-,._ '
        },
        asciiWidthP: {
            type: Number,
            default: 46
        },
        asciiHeightP: {
            type: Number,
            default: 46
        },
        asciiImageString: {
            type: String,
            default: () => "wW...il "
        },
        // keys x location isUpper width char
        keys_data: {
            type: Array,
            default: () => [{ key: 'q', isUpper: true, x: 12, width: 32, row: 1, col: 0 }]
        },
        count: {
            type: Number,
            default: () => 120
        },
        playMode: {
            type: Boolean,
            default: () => false
        }
    })

    // watch keys_data
    watch(() => props.keys_data, (newVal) => {
         // console.log('keys_data changed');
         // console.log(newVal);
    }, { deep: true })

    // emits
    const emit = defineEmits(['updateCount']);



const gHero = (p5) => {
    // variables here
    let idleTime = 0;
    let idleTimeLimit = 30;

    let speed = 1.25;
    let particles = [];

    let bottom;

    // setup function
    p5.setup = () => {
        // create canvas
        p5.createCanvas(width.value, height.value);
        // set background color
        p5.background('#f5f5f4');
        p5.frameRate(30)
        bottom = p5.height*2/3; // 4/5

        // text attributes
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(16);
        p5.textFont('Lekton');
    }

    // draw function
    p5.draw = () => {
        // set background color
        p5.background('#f5f5f4');

        p5.stroke(200)
        // loop through keys_data and draw them
        for (let i = 0; i < props.keys_data.length; i++) {
            const key = props.keys_data[i];
            p5.line(key.x + key.width/2,0,key.x + key.width/2,p5.height);      
        }

        // active line
        if(props.playMode && particles.length > 0){        
            // get the first particle
            const p = particles[0];       
            const k = props.keys_data.find(key => key.key === p.char);
            p5.stroke(0);
            p5.line(k.x + k.width/2,0,k.x + k.width/2,p5.height); 
        }

        // horizontal line
        p5.stroke(200);
        p5.line(0, bottom, p5.width, bottom);

        // draw particles
        p5.noStroke();
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if(props.playMode){ p.update() }
            p.show();
            if (p.finished()) {
                // play sound
                if(props.densityChars.indexOf(p.char) > -1){
                    emit('updateCount');
                }
                // remove particle
                particles.splice(i, 1);
            }
        }

        // timer
        if(props.playMode){
            idleTime ++;    
            if(idleTime > idleTimeLimit){
                // create new particle
                const pIndex = props.count + particles.length;
               
                // check if pIndex is less than asciiImageString length
                if (pIndex >= props.asciiImageString.length) {
                    // idleTime = 0;
                    // return;
                } else {
                    // first check if end of line
                    // -> new return particle OR new key particle 
                    if((pIndex + 1) % props.asciiWidthP === 0){
                        console.log('end of line');
                    } else {
                        // get the char at pIndex
                    const c = props.asciiImageString.charAt(pIndex);
                    // get key data object by char
                    const k = props.keys_data.find(key => key.key === c);
                       
                    if(k){
                        let px = k.x + k.width/2;
                        let p = new particle(px, -24, 24, k.key);
                        particles.push(p);
                        // if UpperCase crete new particle with upper case // ⬆
                        if(k.isUpper){  
                            const kUpper = props.keys_data.find(key => key.key === '⬆');
                                if(kUpper){
                                    let px = kUpper.x + kUpper.width/2;
                                    let p = new particle(px, -24, 24, '⬆');
                                    particles.push(p);
                                }
                        }
                        idleTime = 0;
                        } else {
                            console.log('no key data for char:', c);
                            console.log('p index is:', pIndex);
                        }
                    }
                   
                } // end of inside matrix
            }   // end of if idleTime
        } // end of if playMode
    }

    class particle {
        constructor(x, y, r, c) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.bottom = bottom;
            this.char = c;
        }
        show() {
            // let alpha = p5.map(this.y, this.bottom, p5.height, 255, 0);
            let keyColor = this.char != '⬆' ? '#292524' : '#cc0000';
            p5.fill(keyColor);
            p5.ellipse(this.x, this.y, this.r, this.r);

            // key text
            if(this.char != '⬆'){
                p5.fill(255);
                p5.text(this.char, this.x, this.y);
            }
            
        }
        update() {
            this.y += speed;
        }
        finished() {
            return this.y > bottom ;
        }
    }


}

onMounted(() => {
    // console.log('mounted');
    // console.log(gHeroHolder.value.offsetWidth);
    // console.log(gHeroHolder.value.offsetHeight);
    // console.log(width.value);
    // console.log(height.value);

    /*
    console.log("char 39 ....................")
    console.log(props.asciiImageString.charAt(39))
    console.log(props.asciiImageString.charCodeAt(39)) // 32 is space
    console.log(props.asciiImageString.charAt(39) == '\n')
*/
    

})


</script>