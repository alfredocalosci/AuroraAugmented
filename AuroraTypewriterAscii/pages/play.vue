<template>
  <div class="wrapper bg-stone-100">

    <!-- head here ?
    <div class="slim_container flex my-12 px-6 gap-6">
        <img src="/img/aurora.png" alt="aurora" class="w-1/12 h-auto" />
        <p class="mt-2 font-sans text-stone-500 ">Welcome to <span class="font-bold">Aurora</span> Typewriter Ascii</p>
    </div>
    -->

    <div class="slim_container bg-whiteee my-2 py-2">

        <!-- 3 columns controls -->
        <div class="grid grid-cols-6 gap-4 ">
            <div class="col-span-1 ">
                <!--
                <div class="flex flex-col justify-end items-center h-full gap-2 pb-4">
                    <span class="font-normal rounded-full px-3 py-1 bg-stone-400 text-white">.</span>

                    <span class="font-normal rounded-full px-5 py-0.5 my-0.5 bg-stone-400 text-white">&nbsp;</span>

                    <span class="font-normal rounded-full px-3 py-1 bg-stone-400 text-white">i</span>
                    <span class="text-4xl font-normal bg-green-500 text-white rounded-full px-4 pt-2 pb-1 text-center">w</span>
                </div>
               -->
            </div>


            <div class="col-span-4 bg-white  shadow-md rounded-t-lg">
                <AsciiMatrix
                    :sequence="asciiImageString"
                    :count="playCount"
                ></AsciiMatrix>
            </div>

            <div class="col-span-1 ">
                <remote
                    :play-mode="playMode"
                    :count="playCount"
                    @play="() => { playMode = true; }"
                    @pause="() => { playMode = false;}"
                    @rewind="() => { playCount = 0; }"
                    @step-backward="() => { playCount = playCount - 1; }"
                ></remote>
            </div>
        </div>
             
        <!-- guitar hero -->
         <GuitarHero
            :ascii-image-string="asciiImageTrimmed"
            :ascii-width-p="38"
            :keys_data="key_x.value"
            :play-mode="playMode"
            :count="playCount"
            density-chars="Wwli:,. "
            @update-count="() => {
                playCount = playCount + 1;
            }"
         ></GuitarHero>

        <div>
            <Keyboard
                is-compact="true"
                density-chars="Wwli:,. "
                @get-k-data="(keyData) => {
                    // console.log('keyData from emit:');
                    // console.log(keyData);
                    key_x.value = keyData;
                    // console.log(key_x.value);
                }"   
            ></Keyboard>
        </div>
    </div>


  </div>


  

</template>

<script setup>

    // npx shadcn-vue@latest add button

    const ascii_text_holder = ref(null);
    // const asciiImageString = ref('');

    const asciiImageString = `                                      
           .                          
           ..                         
         ..:,.                        
         .li::.                       
         :lli::                       
        .illl::,..                    
        .lwwii:i,i,.    .             
        .::lililiii:::,,.         .   
       ,,i:i:iiliiiiiii:,.:,   .,,..  
      .,.ii,i:iiillllllii:ii,,,:,:i.  
      .::li::illllwlwllliii:i,,,:ii.  
    ..:i:lllillwwwwllwlllliii::illi.  
    .,iliiillllwwWwllwlilii:::iill:   
    .,,:::iilllllWwwllllliii:::ili,   
    .,:::i:i:i:l:Wiwwlwlwlili:,:i:.   
   .,::i:::i:::::lllwlwiwllli:,::,.   
   .,:iiiillliWwW:Wlllliiiiliiiii..   
   .,iiiwliii,lWliliiil:,i:iliili..   
   .,iill:iiliwiwli::l.WWl::i:::::,.  
   .,ilwi:iiill::wi::,Wi:lii:::,,:,   
   .,:iii:iiilliili,:wli:wiii:::,,.   
   .,iiilll:::il:l:,:li::ilii:::,,,   
   .:iiilli:,..::Wwii::iliii::::,,.   
  .,:iilllll,.,,,.wW,:i:lii::::::,.   
 ..,:::ilwwl:....,l..:,.,ii,,:i::,.   
  .,::::llili,,.,ii,.,,..,::::i:,,.   
  .,::iililwi,.....,....,i:ii,::,.    
   .,:::iiiil:,........,:liii::,,.    
   .,:::::,:ili,......,ililli::,,.    
   .::::::,,:iii:,,,::lliiii:,,,,.    
   .:iiii::,,:ilwllii:,::iilii:,,.    
  .,:illwli:llilwli::::,,::ii:::,.    
   .:iilwwwwlllwwi::::::::ii:::,,     
  .,,illlllllwwwwiiliiiwiiliii:,.     
  .,:iilwlwwlwwllliwlwlwlliili:,.     
  .,::illlwllWl::lwWWwWwwllii:,,..    
   .:llllllllwll:wlWWWwwlwli:,,,..    
`;

    const asciiImageTrimmed  = asciiImageString.replace(/(\r\n|\n|\r)/gm, "");

    const playMode = ref(false);
    const playCount = ref(660);

    const updateAsciiImageString = (asciiImage) => {
        asciiImageString.value = asciiImage;
        // set the value of the text area to the ascii image
        ascii_text_holder.value.value = asciiImageString.value;
    };

    const copyToClipboard = () => {
        // copy the ascii image to the clipboard
        navigator.clipboard.writeText(asciiImageString.value)
            .then(() => {
                console.log('Copied to clipboard');
            })
            .catch(err => {
                console.error('Error copying to clipboard: ', err);
            });
    };

    // defin key_x array as reactive variable
    // connect to guitar hero component
    // from keyboard component
    const key_x = ref([]);

    onBeforeMount(() => {
        
    });

    onMounted(() => {

    });
</script>

<style scoped>
    .mRow {
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-family: 'Lekton', sans-serif;
    }
    .mRow span {
        width: 1rem;
        opacity: 1;
        text-align: center;
    }
</style>
