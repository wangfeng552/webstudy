<template>
  <div class="main-part clearfix">
      <side-bar></side-bar>
      <router-view class="main-content"></router-view>
  </div>
</template>
<script>
  import sideBar from './sideBar.vue'
  export default{
    components: {
      sideBar
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
