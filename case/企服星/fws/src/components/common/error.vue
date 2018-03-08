<template>
  <div class="facilitator">
    <top-bar></top-bar>
    <top-header></top-header>
    <div class="mi-height w1200" style="text-align: center;">
      <img src="../../assets/images/four_1.png" height="308" width="328" class="errorimg">
      <p class="nofound">未找到该页面</p>
      <p class="daima">错误代码404</p>
      <router-link :to="{name:'clientList'}">
        <button class="backindex">返回首页</button>
      </router-link>
    </div>
    <black-footer></black-footer>
  </div>
</template>
<script>
  import topBar from './topBar.vue'
  import topHeader from './topHeader.vue'
  import blackFooter from './blackFooter.vue'
  export default {
    name: 'app',
    components: {topBar,topHeader,blackFooter}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .errorimg{
    display: block;
    margin: 75px auto 20px;
  }
  .nofound{
    font-size: 28px;
    color: #1b1b1b;
    font-weight: bold;
  }
  .daima{
    font-size:18px;
    color: #666666;
    margin-top: 10px;
  }
  .backindex{
    width: 142px;
    height: 42px;
    border: 0;
    background: #3c8ced;
    font-size:16px;
    color: #fff;
    margin-top: 60px;
  }
</style>
