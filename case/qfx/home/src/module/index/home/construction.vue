<template>
  <div class="facilitator">
    <div class="top">
        <img src="../../../assets/images/qfx-logo.png" height="70" width="200">
    </div>
    <div class="mi-height w1200" style="text-align: center;">
      <img src="../../../assets/images/shigong.png" height="319" width="781" style="margin-top: 135px;">
      <p class="upgrade">网站升级中...</p>
      <p class="upgradeInfo">为了让您更好的使用企服星平台，我们正在对平台进行升级，升级期间暂时无法访问。<br>我们将尽快完成升级，给您带来的不便，敬请谅解。</p>
    </div>
    <div class="black-footer">
      <p>
        <span>Copyright © 2000-2016 www.entservice.com All Rights Reserved</span>
        <span>沪ICP备17009199号</span>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app'
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
  .black-footer {
    background: #5c5c5c;
    width: 100%;
    height: 68px;
    line-height:68px;
    margin-top: 275px;
    p{
      text-align: center;
      span{
        font-size:12px;
        color:#a9a9a9;
        margin-right:30px;
      }
    }
    }
</style>
