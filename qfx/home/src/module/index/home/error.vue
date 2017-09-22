<template>
  <div class="facilitator">
    <div class="simple-header">
      <div class="w1200">
        <div class="fllogin">
          <router-link class="logo" :to="{name:'index'}">
            <img src="../../../assets/images/qfx-logo.png" width="200" height="70" alt="企服星">
          </router-link>
        </div>
      </div>
    </div>
    <div class="mi-height w1200" style="text-align: center;">
      <img src="../../../assets/images/four_1.png" height="308" width="328" class="errorimg">
      <p class="nofound">未找到该页面</p>
      <p class="daima">错误代码404</p>
      <router-link :to="{name:'index'}">
        <button class="backindex">返回首页</button>
      </router-link>
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
    margin: 60px 0 30px 0;
  }
  .black-footer {
    background: #5c5c5c;
    width: 100%;
    height: 68px;
    line-height:68px;
    margin-top: 201px;
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
