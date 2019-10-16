<template>
  <div class="propage-item">
    <div class="stt">
      <div class="w1200" ref="one">
        <img :src="imageUrl+'stt_02.jpg'">
      </div>
    </div>
    <div class="bgf5f">
      <div class="w1200">
        <img :src="imageUrl+'stt_03.jpg'">
      </div>
    </div>
    <div class="fwlc" ref="two">
      <div class="w1200">
        <img :src="imageUrl+'stt_04.jpg'">
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
  .stt{
    background: url("http://public.entservice.com/stt_bg_03.jpg") center top no-repeat;

  }
  .top-slider {
    background: url("http://public.entservice.com/stt_bg_01.jpg") center top no-repeat;
  }
  .fwlc{
    background: url("http://public.entservice.com/stt_bg_02.jpg") center top no-repeat;
  }
</style>
