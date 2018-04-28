<template>
  <div class="tc-fail">
      <div class="img-div">
        <img src="./img/fail.png" alt="">
      </div>
      <div class="prompt">
        <p>支付失败</p>
        <p>如果已支付，请稍后进入我的订单查看</p>
      </div>
      <div class="bottom">
        <a href="#/index">去首页逛逛</a >
        <a href="#/orderList">我的订单</a>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.tc-fail {
  * {
    font-family: PingFangSC-Regular;
  }
  .img-div {
    text-align: center;
    margin-top: 1.92rem;
    img {
      width: 2.52rem;
      height: 2.52rem;
      display: inline-block;
    }
  }
  .prompt {
    text-align: center;
    margin-top: 0.65rem;
    p:first-child {
      font-size: 0.4rem;
      color: #999999;
    }
    p:last-child {
      padding-top: 0.15rem;
      font-size: 0.3rem;
      color: #333333;
    }
  }
  .bottom {
    padding: 0.86rem 0.29rem 0rem 0.29rem;
    overflow: hidden;
    a:first-child {
      border: 1px solid #d7b667;
      border-radius: 100px;
      font-size: 0.3rem;
      color: #dbbd72;
      padding: 0.19rem 0.83rem;
      float: left;
    }
    a:last-child {
      background-image: linear-gradient(-156deg, #eddca0 0%, #d7b667 100%);
      border-radius: 100px;
      font-size: 0.3rem;
      color: #ffffff;
      padding: 0.19rem 0.98rem;
      float: right;
    }
  }
}
</style>

