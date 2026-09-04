<template>
  <div>
    <svg
      width="512" height="512"
      viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="w-full h-auto"
    >
      <defs>
        <filter id="typewriterShadowLg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur2"/>
          <feOffset in="blur2" dx="0" dy="4" result="offsetBlur2"/>
          <feFlood flood-color="#000000" flood-opacity="0.05" result="color2"/>
          <feComposite in="color2" in2="offsetBlur2" operator="in" result="shadow2"/>

          <feGaussianBlur in="SourceAlpha" stdDeviation="7.5" result="blur1"/>
          <feOffset in="blur1" dx="0" dy="10" result="offsetBlur1"/>
          <feFlood flood-color="#000000" flood-opacity="0.1" result="color1"/>
          <feComposite in="color1" in2="offsetBlur1" operator="in" result="shadow1"/>

          <feMerge>
            <feMergeNode in="shadow2"/>
            <feMergeNode in="shadow1"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#typewriterShadowLg)">
        <rect x="144" y="256" width="224" height="96" fill="rgba(0,0,0,0.2)"/>

        <path d="M384 368C392.837 368 400 375.163 400 384V432C400 449.673 385.673 464 368 464H144C126.327 464 112 449.673 112 432V384C112 375.163 119.163 368 128 368H384Z" fill="white"/>

        <path d="M416 432.001C416 458.511 394.51 480.001 368 480.001C367.956 480.001 367.911 480 367.867 480H144.133C144.089 480 144.044 480.001 144 480.001C117.49 480.001 96 458.511 96 432.001V352H416V432.001ZM128 368C119.163 368 112 375.163 112 384V432.001C112 449.674 126.327 464.001 144 464.001V464H368V464.001C385.673 464.001 400 449.674 400 432.001V384C400 375.163 392.837 368 384 368H128Z" :class="typewriterFill"/>

        <path d="M152 416H148V464H140V416H136V368H152V416ZM184 416H180V464H172V416H168V368H184V416ZM212 464H204V368H212V464ZM248 416H244V464H236V416H232V368H248V416ZM280 416H276V464H268V416H264V368H280V416ZM312 416H308V464H300V416H296V368H312V416ZM340 464H332V368H340V464ZM376 416H372V464H364V416H360V368H376V416Z" fill="black"/>

        <rect x="144" y="48" width="224" height="208" fill="white"/>

        <path d="M208 256C216.837 256 224 263.163 224 272C224 280.837 216.837 288 208 288H185V288.021C184.668 288.008 184.335 288 184 288C170.745 288 160 298.745 160 312C160 325.255 170.745 336 184 336C184.335 336 184.668 335.991 185 335.978V336H329V335.978C341.791 335.453 352 324.92 352 312C352 299.08 341.791 288.546 329 288.021V288H304C295.163 288 288 280.837 288 272C288 263.163 295.163 256 304 256H416V352H96V256H208Z" :class="typewriterFill"/>

        <path d="M204 224C206.209 224 208 225.791 208 228H304C304 225.791 305.791 224 308 224H332C334.209 224 336 225.791 336 228H368V236H336L335.995 236.206C335.888 238.319 334.14 240 332 240H308C305.791 240 304 238.209 304 236H208L207.995 236.206C207.888 238.319 206.14 240 204 240H180C177.791 240 176 238.209 176 236H144V228H176C176 225.791 177.791 224 180 224H204Z" fill="black"/>

        <path d="M96 272H88C83.5817 272 80 268.418 80 264V224H64V272C64 280.284 70.7157 287 79 287C79.3361 287 79.6694 286.988 80 286.966V304C62.3269 304 48 289.673 48 272V208H96V272Z" fill="black"/>

        <path d="M424 208C437.255 208 448 218.745 448 232V256C448 264.837 440.837 272 432 272H416V240H432V232C432 227.582 428.418 224 424 224H416V208H424Z" fill="black"/>

        <path d="M96 192C96 183.163 103.163 176 112 176H144V256H96V192Z" :class="typewriterFill"/>
        <path d="M416 192C416 183.163 408.837 176 400 176H368V256H416V192Z" :class="typewriterFill"/>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
    const { typewriterColor, selectedPreset, charPitch, keysNumber } = useActiveTypewriterSettings();
    const typewriterFill = computed(() => TYPEWRITER_COLORS[typewriterColor.value].fill)
</script>

<style>

</style>