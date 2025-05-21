<template>
  <div class="wrapper">
    <div class="container flex my-12 px-6 gap-6">
    <img src="/img/aurora.png" alt="aurora" class="w-1/12 h-auto" />
    <p class="mt-2 font-sans text-stone-500 ">Welcome to <span class="font-bold">Aurora</span> Typewriter Ascii</p>
  </div>

  <div class="container h-auto min-h-[320px]">
    <ImgToAscii img-src="catFace.jpg" density-chars="Wwli:,. "></ImgToAscii>
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
