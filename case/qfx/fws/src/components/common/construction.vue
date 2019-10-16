<template>
  <div class="facilitator">
    <div class="top">
        <img src="../../assets/images/qfx-logo.png">
    </div>
    <div class="mi-height w1200" style="text-align: center;">
      <img src="../../assets/images/shigong.png" height="319" width="781" style="margin-top: 135px;">
      <p class="upgrade">网站升级中...</p>
      <p class="upgradeInfo">为了让您更好的使用企服星平台，我们正在对平台进行升级，升级期间暂时无法访问。<br>我们将尽快完成升级，给您带来的不便，敬请谅解。</p>
    </div>
    <black-footer style="margin-top: 74px;"></black-footer>
  </div>
</template>
<script>
  import blackFooter from './blackFooter.vue'
  export default {
    name: 'app',
    components: {blackFooter}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .top{
    background:#ffffff;
    box-shadow:0 2px 4px 0 rgba(229,229,229,0.50);
    height:98px;
    padding: 20px 0 0 400px;
  }
  .upgrade{
    font-size: 18px;
    font-size:18px;
    color:#375d7c;
    line-height:30px
  }
  .upgradeInfo{
    font-size:14px;
    color:#5c5c5c;
    line-height:24px;
  }
</style>
