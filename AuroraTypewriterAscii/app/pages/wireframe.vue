<template>
  <div class="mb-12">
    <header class="tw_container text-center my-6 py-2 flex justify-between items-center border-b border-white dark:border-stone-600">
        <p class="font-display uppercase text-xl dark:text-stone-100">header</p>
        <UColorModeSwitch />
    </header>

    <section class="tw_container">

        <!-- hoja -->
        <article class="tw_grid mt-12  items-end">
            <div class="col-start-3 col-span-7  bg-white border-6 border-white  border-b-0  px-2 pt-2  shadow-xl row-span-2 ">

                <div class="border border-dashed border-gray-400 p-2 text-xs min-h-48">
                    <p class="text-black">image placeholder</p>
                </div>

            </div>

            <div class="col-start-2 bg-black rounded-tl-xl h-6"></div>
            <div class="col-start-10 bg-black rounded-tr-xl h-6"></div>
        </article> 

        <!-- rulli -->
        <article class="tw_grid h-6">
            <div class="border-t-6 border-black border-l-6 rounded-tl-xl bg-stone-300 dark:bg-stone-500"></div>
            <div class=" bg-black "></div>
            <div class="col-span-7 bg-white border-x-6 border-white p-2"></div>
            <div class=" bg-black "></div>
            <div class="border-t-6 border-black border-r-6 rounded-tr-xl bg-stone-300 dark:bg-stone-500"></div>
        </article>

         <!-- rulli 2 -->
        <article class="tw_grid ">
            <div class="rounded-bl-xl bg-black "></div>
            <div class=" bg-black"></div>
            <div class="col-span-7 bg-white  ">
               
                <div class="grid grid-cols-12 items-center mb-6">
                    <div class="h-2 bg-black"></div>
                    <div class="h-4 bg-black rounded-full"></div>
                    <div class="h-2 bg-black col-span-8"></div>
                     <div class="h-4 bg-black rounded-full"></div>
                     <div class="h-2 bg-black"></div>
                </div>

            </div>
            <div class=" bg-black "></div>
            <div class="rounded-br-xl bg-black"></div>
        </article>

       <!-- hueco -->
        <article class="tw_grid bg-stone-100 dark:bg-stone-700">

            <!-- first row -->
            <div class="col-start-2 aspect-square bg-black"></div>
            <div class=" bg-black col-span-2"></div>
            <div class=" bg-black rounded-r-full "></div>
            <div class=" bg-stone-100 dark:bg-stone-700"></div>
            <div class=" bg-black rounded-l-full"></div>
            <div class=" bg-black col-span-2"></div>
            <div class=" bg-black"></div>  

            <!-- second row -->
            <div class="col-start-2 col-span-2 bg-black aspect-2/1"></div>
            <div class="text-center col-span-5 bg-black">
                <div class="bg-stone-100 dark:bg-stone-700 h-full w-full rounded-full">

                </div>
            </div>
            <div class=" bg-black col-span-2"></div>
           
        </article>

        <!-- player holder -->
        <article class="tw_grid ">
            <div class="col-span-9 col-start-2 bg-black">
                 <div class="border border-dashed border-gray-400 p-2 text-xs  mx-6 text-white mt-6  h-12">
                    <p>player placeholder</p>
                </div>
            </div>
        </article>

        <!-- hero holder
        <article class="tw_grid ">
            <div class="col-start-2 col-span-9 bg-black">
                 <div class="border border-dashed border-gray-400 p-2 text-xs  mx-6 text-white mt-6  h-48">
                    <p>hero placeholder</p>
                </div>
            </div>
        </article>
         -->
        
        <!-- keyboard holder -->
        <article class="tw_grid h-48">
            <div ></div>
            <div class=" col-span-9 border-12 border-t-0 md:border-24 md:border-t-0 border-black rounded-b-4xl p-2">
                 <div class="border border-dashed border-gray-400 p-2 text-xs h-full">
                    <p>keyboard placeholder</p>
                </div>
            </div>
            <div ></div>
        </article>

    </section>
  </div>
  
</template>