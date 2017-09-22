<template>
  <div class="propage-item">
    <div>
      <div class="w1200" ref="one">
        <img :src="imageUrl+'zx_fuwu_02.jpg'">
      </div>
    </div>
    <div class="bg01">
      <div class="w1200">
        <img :src="imageUrl+'zx_fuwu_03.jpg'">
      </div>
    </div>
    <div>
      <div class="w1200">
        <img :src="imageUrl+'zx_fuwu_04.jpg'">
      </div>
    </div>
    <div class="bgf5f">
      <div class="w1200">
        <img :src="imageUrl+'zx_fuwu_05.jpg'">
      </div>
    </div>
    <div class="fwlc" ref="two">
      <div class="w1200">
        <img :src="imageUrl+'zx_fuwu_06.jpg'">
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  export default{
    data(){
      return{
        imageUrl:API.imageUrl
      }
    },
    methods:{
      introduce(){
        var introduce = this.$refs.one.offsetTop;
        document.body.scrollTop = introduce - 82
        // Firefox
        document.documentElement.scrollTop = introduce - 82
        // Safari
        window.pageYOffset = introduce - 82
      },
      process(){
        var processHeigth = this.$refs.two.offsetTop;
        document.body.scrollTop = processHeigth - 72
        // Firefox
        document.documentElement.scrollTop = processHeigth - 72
        // Safari
        window.pageYOffset = processHeigth - 72
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top-slider {
    background: url("http://public.entservice.com/zx_fuwu_bg_01.jpg") center top no-repeat;
  }
  .fwlc{
    background: url("http://public.entservice.com/zx_fuwu_bg_02.jpg") center top no-repeat;
  }
  .bg01{
    background-color: #2eaecd;
  }
</style>
