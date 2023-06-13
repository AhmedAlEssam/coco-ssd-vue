
<script setup>

import { ref, watch, computed } from 'vue'
import { model } from '../ai.js'
import HighLight from './HighLight.vue'
let video = ref() 
const objects = ref([])
let mediastream;

// const text = ref('Detect Using Webcam')
const isDetecting = ref(false)
const startDetect = () => {
  if (isDetecting.value) {
    if (mediastream) {
      const tracks = mediastream.getTracks()
      tracks.forEach(track => {
        track.stop();
      })
      mediastream = null
      objects.value = []
    }
    isDetecting.value = false
  } else {
    isDetecting.value = true
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(
      stream => {
        mediastream = stream
        video.value.srcObject = stream;
        video.value.play();
      }
    )
  }
}

 

const text = computed(() => {
  if (isDetecting.value) {
    return 'Stop Camera'
  } else {
    return 'Detect Using Webcam'
  }
})

const imgUrl = computed(() => {
  if (isDetecting.value) {
    return "./src/assets/webcam-on.png"
  } else {
    return "./src/assets/webcam-off.png"
  }
})

const predict = () => {
  model.detect(video.value).then(predictions => {
    if (mediastream) {
      objects.value = predictions
      window.requestAnimationFrame(predict);
    }
  });
}

</script>
<template>
 
  <div class="border-solid border-2 flex">

    <div class="w-1/2 h-screen flex justify-center items-center">

      <div class="w-[30%] border-solid border-2 rounded m-12 flex flex-col items-center justify-center cursor-pointer"
        @click="startDetect">
        <img :src="imgUrl" alt="" class=" ">
        <p class=" font-bold">{{ text }}</p>
      </div>
      <div class="w-[30%] border-solid border-2 rounded relative cursor-pointer flex flex-col items-center justify-center"
        @click="console.log('fff')">
        <img src="./assets/images.png" alt="" class=" ">
        <p class=" font-bold">Upload image to detect</p>
        <div v-if="isDetecting" class=" absolute bg-black bg-opacity-30 w-full h-full z-10 top-0 left-0"
          @click.stop.prevent.self>

        </div>
      </div>


    </div>
    <div class="w-1/2 h-screen border-solid border-2 flex flex-col items-center justify-center">
      <div class="inline-block border-2 border-solid border-red-600 rounded w-[600px] h-[600px] relative">
        <video @loadeddata="predict" ref="video"
          class=" inline-block border-2 border-solid border-red-600 rounded w-[619px] h-[464px]"></video>
        <div
          class="inline-block border-2 border-solid border-green-600 rounded w-[600px] h-[600px] absolute top-0 left-0 bg-gray-400"
          :class="isDetecting ? 'hidden' : ''">
          <img src="" alt="">
        </div>
        <High-light v-for="object in objects" :object="object"></High-light>
      </div>

    </div>

  </div>
</template>
