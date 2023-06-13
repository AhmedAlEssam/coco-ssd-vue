<template>
  <div v-if=" Math.floor(object.score*100) >85" class=" absolute border-dashed border-green-300 border-2"
    :style="{ left: object.bbox[0] + 'px', top: object.bbox[1] + 'px', width: object.bbox[2] + 'px', height: object.bbox[3] + 'px' }">
    <div class=" bg-red-600 opacity-100 font-bold transition-all ease-in-out duration-1000"> {{ object.class + ' with confidence:%' +  Math.floor(object.score*100) }}</div>
  </div>
</template>
<script setup>

const props = defineProps({
  object: Object
})
</script>