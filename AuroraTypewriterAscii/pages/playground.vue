<template>
  <div class="wrapper">
    <div class="container flex my-12 px-6 gap-6">
        <img src="/img/aurora.png" alt="aurora" class="w-1/12 h-auto" />
        <p class="mt-2 font-sans text-stone-500 ">Welcome to <span class="font-bold">Aurora</span> Typewriter Ascii</p>
    </div>

    <!-- 2 columns grid-->
    <div class="container grid grid-cols-2 gap-6">
        <div >
            <!-- icon holder-->
            <div class="mb-4 flex gap-1">
                <Icon name="mdi:image-outline" style="color: black"  size="2rem"/>
                <Icon name="mdi:camera-outline" style="color: lightgray"  size="2rem"/>
                <Icon name="mdi:cloud-upload-outline" style="color: lightgray"  size="2rem"/>
            </div>
            
            <img src="/img/gallery/catFace.jpg" alt="cat" class="w-full h-auto rounded-lg shadow-md" />

            <div class="mt-4">
                <Select>
    <SelectTrigger class="w-[240px] bg-white">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
        <SelectItem value="banana">
          Banana
        </SelectItem>
        <SelectItem value="blueberry">
          Blueberry
        </SelectItem>
        <SelectItem value="grapes">
          Grapes
        </SelectItem>
        <SelectItem value="pineapple">
          Pineapple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
            </div>
        </div>
        
        <div>
            <div class="mb-4 flex gap-1">
                
                <Icon 
                    name="mdi:content-copy"
                    style="color: black" 
                    size="2rem"
                    @click="copyToClipboard"
                    class="cursor-pointer"
                />


            </div>
            
            <!-- text area -->
            <textarea ref="ascii_text_holder" id="ascii_text_holder" class="w-full  p-2 border border-white rounded-lg shadow-md bg-white text-xs leading-none tracking-[0.25rem] min-h-[500px]" placeholder="Type your text here..."></textarea>
        </div>
    </div>

    <div class="container">
        <!-- W%w+=-;:,.  -->
         <!--  .,:ilwW -->
        <ImgToAsciiText 
            img-src="catFace.jpg" 
            density-chars="Wwli:,. "
            :asciiWidthP="38"
            @asciiImage = "(asciiImage) => {
                // console.log(asciiImage);
                updateAsciiImageString(asciiImage);
                // document.getElementById('ascii_text_holder').innerHTML = asciiImage;
            }">
            
        </ImgToAsciiText>
    </div>

  <div class="container foglio ">
    
    <p class="text-3xl mb-6">This is a simple page to demonstrate the use of Vue.js with TypeScript.</p>
    <p class="font-serif font-light">Typewriter effect will be implemented here.</p>

    <Keyboard
      density-chars="ALL",
    ></Keyboard>

    <!--
    <button @click="startTypewriter">Start Typewriter</button>
    <button @click="stopTypewriter">Stop Typewriter</button>
    <button @click="resetTypewriter">Reset Typewriter</button>
    -->

    <div id="output"></div>
    <div id="ascii"></div>
  </div>
  </div>


  

</template>

<script setup>

    // npx shadcn-vue@latest add button

    import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    } from '@/components/ui/select'


    const ascii_text_holder = ref(null);
    const asciiImageString = ref('');

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

    onMounted(() => {
        // set the focus on the text area
        // ascii_text_holder.value.focus();
        // console.log(ascii_text_holder.value);
        // ascii_text_holder.value.value = "Hello World!";
    });
</script>
