<template>
  <div class="tc-success">
      <div class="img-div">
        <img src="./img/success.png" alt="">
      </div>
      <div class="prompt">
        <p>支付成功</p>
        <p>正在出票中，请耐心等待</p>
      </div>
      <div class="bottom">
        <a href="#/index">去首页逛逛</a >
        <a href="#/orderList">我的订单</a>
      </div>
  </div>
</template>
<script>
import { stringUtil } from "../../../src/assets/js/common";
export default {
  data() {
    return {};
  },
   beforeRouteEnter(to, from, next) {
     // 支付成功
     if(stringUtil.getQueryValue('payType')){
       next();
     }else{
       next({ path: '/fail' });
     }
    
  },
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.tc-success {
  * {
    font-family: PingFangSC-Regular;
  }
  .img-div {
    text-align: center;
    margin-top: 2.03rem;
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
      color: #dcbe74;
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

