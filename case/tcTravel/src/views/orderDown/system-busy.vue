<template>
  <div class="tc-system-busy">
      <div class="img-div">
        <img src="./img/fail.png" alt="">
      </div>
      <div class="prompt">
        <p>系统繁忙请稍后重试</p>
      </div>
      <div class="bottom">
        <a @click="go(true)">去首页逛逛</a>
        <a @click="go(false)">我的订单</a>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},

  methods: {
    go(arg) {
      if (arg) {
        this.$router.push({ path: "/index" });
      } else {
        this.$router.push({ path: "/orderList" });
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.tc-system-busy {
  * {
    font-family: PingFangSC-Regular;
  }
  .img-div {
    text-align: center;
    margin-top: 1.74rem;
    img {
      width: 2.52rem;
      height: 2.52rem;
      display: inline-block;
    }
  }
  .prompt {
    text-align: center;
    margin-top: 0.69rem;
    p {
      font-size: 0.4rem;
      color: #999999;
    }
  }
  .bottom {
    padding: 1.05rem 0.29rem 0rem 0.29rem;
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

