<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="slide in swiperSlides" :key="slide">I'm Slide {{ slide }}</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data () {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    }
  }
</script>

<!--https://github.com/surmon-china/vue-awesome-swiper-->
