<template>
    <NuxtP5 :sketch="asciiSketch" />
</template>

<script setup>
 // import NuxtP5 from './nuxt-p5.vue';
 const props = defineProps({
    imgSrc: {
        type: String,
        required: true
    },
    densityChars:{
        type:String,
        default: 'Ñ@#W$9876543210?!abc;:+=-,._ '
    },
    asciiWidthP: {
        type: Number,
        default: 46
    },

 });
 const emit = defineEmits(['asciiImage']);

 const densityLength = computed(() => {
    return props.densityChars.length;
 });
 const imgPath = computed(() => {
    return '/img/gallery/' + props.imgSrc;
 });

 const asciiSketch = (p5) => {
    let img;
    let asciiImage = [];
    let asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' '];
    let asciiWidth =props.asciiWidthP; // Width of the ASCII image
    let asciiHeight = props.asciiWidthP; // Height of the ASCII image
    //  .:-=+*#%@
    p5.preload = () => {
        img = p5.loadImage(imgPath.value);
    };

    p5.setup = () => {
        
        // get the image size
        let imgWidth = img.width;
        let imgHeight = img.height;
        // calculate the aspect ratio
        let aspectRatio = imgWidth / imgHeight;

        // set asciiHeight based on the aspect ratio
        asciiHeight = Math.floor(asciiWidth / aspectRatio);

        img.resize(asciiWidth, asciiHeight);
        img.loadPixels();

        p5.noCanvas();
        let asciiString = '';

        for (let y = 0; y < asciiHeight; y++) {
            asciiImage[y] = [];

            for (let x = 0; x < asciiWidth; x++) {
                let index = (x + y * img.width) * 4;
                let r = img.pixels[index];
                let g = img.pixels[index + 1];
                let b = img.pixels[index + 2];
                let brightness = (r + g + b) / 3;
                let charIndex = Math.floor(p5.map(brightness, 255, 0, densityLength.value - 1, 0));
                const c = props.densityChars.charAt(charIndex);
                asciiImage[y][x] = c;
                // asciiImage[y][x] = asciiChars[charIndex];

                asciiString += c;
            }
            asciiString += '\n';
        }
        // emit the ascii image to the parent component
        emit('asciiImage', asciiString);
    };


    /*
    p5.draw = () => {
        p5.background(255);
        p5.fill(0);
        p5.textSize(11);
        p5.textAlign(p5.CENTER , p5.CENTER);
        p5.textFont('Lekton');
        for (let y = 0; y < asciiHeight; y++) {
            for (let x = 0; x < asciiWidth; x++) {
                p5.text(asciiImage[y][x], x * 10, y * 10);
            }
        }
    };
    */
}


</script>