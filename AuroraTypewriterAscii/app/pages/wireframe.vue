<template>
    <!-- wrapper: height vh -->
     <div class="wrapper bg-stone-100 h-screen border relative w-full md:w-[768px] mx-auto">
        <!-- head here -->
        <div class="flex justify-between gap-6">
            
            <button class="w-12 h-12">
                <Icon 
                    name="mdi:arrow-left"
                    style="color: black"            
                    size="1.5rem"
                    class="cursor-pointer mt-4"
                />
            </button>

            <nav class="my-1 flex justify-center self-center bg-stone-600 px-4 rounded-full border border-stone-50">

                <button class="w-12 h-12 mx-2">
                    <Icon 
                        name="mdi:play-circle-outline"
                        style="color: white"            
                        size="1.5rem"
                        class="cursor-pointer mt-2"
                    />
                </button>

                <button class="w-12 h-12 mx-2">
                    <Icon 
                        name="mdi:play-circle-outline"
                        style="color: white"            
                        size="1.5rem"
                        class="cursor-pointer mt-2"
                    />
                </button>

                    <button class="w-12 h-12 mx-2">
                        <Icon 
                            name="mdi:play-circle-outline"
                            style="color: white"            
                            size="3rem"
                            class="cursor-pointer"
                        />
                    </button>
          
            </nav>
           <div class="w-12 h-12 mx-2 my-1">
             <Icon 
                            name="mdi:close-circle"
                            style="color: black"            
                            size="3rem"
                            class="cursor-pointer"
                        />
           </div>
        </div>
        



        <!-- matrix -->
         <article class="grid grid-cols-[8px_1fr_32px] md:grid-cols-[48px_1fr_48px] mt-4">
            <div></div>
            <section class="h-24 md:h-48 bg-white shadow-md rounded-t-lg m-2">
            </section>
         </article>

         <!-- horiz progress -->
         <article class="grid grid-cols-[32px_1fr_32px] md:grid-cols-[48px_1fr_48px] mt-2">
            <section class="h-6 bg-stone-200 my-2 mx-2 col-start-2"></section>
        </article>
        
        <!-- gutar Hero -->
        <section class="w-full h-[calc(100vh-344px)] md:h-[33vh] bg-stone-100">
        </section>

        <!-- keyboard: stick to bottom -->
         <div class="absolute bottom-0 left-0 right-0 bg-stone-200 h-[120px] w-full">
            <p>kb</p>
         </div>

    </div>


       
</template>