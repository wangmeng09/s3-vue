<template>
  <div class="swiper-css" style="">
    <mt-swipe :auto="4000" ref="swiper" class="swipe">
      <mt-swipe-item v-for="i in images" :key="">
        <img :src="i.src" >
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    name:'s3-banner',
    props:{
      images: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .swiper-css,img{
    width: 100%;
    height: 200px;
  }
</style>
