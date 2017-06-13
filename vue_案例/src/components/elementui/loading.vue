<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="注册中">
    <li>全屏遮罩：fullscreen</li>
    <li>锁定滚动条:lock</li>
    <li>加载文案：element-loading-text</li>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        fullscreenLoading:true //显示和隐藏
      }
    }
  }
</script>

<style>

</style>
