<template>
  <div class="guide" v-if="isShowMongol" @click="closeModal">
    <img class="pic-jt" src="@/assets/images/jiantou.png" alt="">
    <div class="text">点此分享</div>
  </div>
</template>

<script>
    export default {
      props:{
        isShowMongol:{
          type:Boolean,
          default:false
        }
      },
      methods:{
        closeModal(){
          this.$emit('closeModal',false)
        }
      }
    }
</script>

<style lang="less" scoped>
  .guide{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    .pic-jt{
      width: 3.64rem;
      height: 1.51rem;
      transform: rotate(110deg);
      position: absolute;
      right: 0;
      top: 1rem;
    }
    .text{
      font-size: .4rem;
      color: #fff;
      position: absolute;
      left: 2.5rem;
      top: 2rem;
      z-index: 2;
    }
  }
</style>
