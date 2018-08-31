<template>
  <el-row class="main-part">
    <side-bar></side-bar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </el-row>
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
