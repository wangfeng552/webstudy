<template>
  <div class="login">
    <div class="banner"><img src="@/assets/images/login/banner.png" alt=""></div>
    <div class="laba">
      <div class="ml">
        <ul :class="{anim:animate==true}">
          <li v-for='item in items'>{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="l-main">
      <div class="line">
        <h4 class="title">手机号</h4>
        <div class="text-content">
          <div class="quhao">+86</div>
          <div class="tel"><input class="text" @focus="scrollTop" v-model="phone" placeholder="请输入手机号" type="number"></div>
        </div>
      </div>
      <div class="line">
        <h4 class="title">密码</h4>
        <div class="text-content">
          <input class="text" placeholder="请输入密码" v-model="password" type="password">
        </div>
      </div>
      <div class="ft3">还没有账号？<router-link class="register" :to="{name:'signUp'}">注册</router-link></div>
      <div class="btn-reg"><a class="register" @click="login">登录</a></div>
    </div>
    <div class="down-fix" v-if="isShowDownFix">
      <img class="logo" src="@/assets/images/login/logo.png" alt="">
      <div class="ft4">下载biger 每天免费领比特币红包</div>
      <a href="http://static.biger168.com/load/index.html#/" class="btn-xz">下载</a>
      <img class="pic-close" src="@/assets/images/login/close.png" @click="closeDownFix" alt="">
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/http";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      phone: "",
      password: "",
      animate: false,
      isShowDownFix: true,
      items: [
        { name: "恭喜138****7066刚刚领到1000个BG" },
        { name: "恭喜137****7025刚刚领到1000个BG" },
        { name: "恭喜152****5698刚刚领到1000个BG" },
        { name: "恭喜136****4526刚刚领到1000个BG" },
        { name: "恭喜137****4152刚刚领到1000个BG" },
        { name: "恭喜188****5266刚刚领到1000个BG" },
        { name: "恭喜152****7866刚刚领到1000个BG" },
        { name: "恭喜137****7696刚刚领到1000个BG" },
        { name: "恭喜150****4526刚刚领到1000个BG" },
        { name: "恭喜138****7066刚刚领到1000个BG" },
        { name: "恭喜137****7025刚刚领到1000个BG" },
        { name: "恭喜152****5648刚刚领到1000个BG" },
        { name: "恭喜136****4966刚刚领到1000个BG" },
        { name: "恭喜137****4622刚刚领到1000个BG" },
        { name: "恭喜188****5786刚刚领到1000个BG" },
        { name: "恭喜156****1256刚刚领到1000个BG" },
        { name: "恭喜136****7856刚刚领到1000个BG" },
        { name: "恭喜134****4776刚刚领到1000个BG" },
        { name: "恭喜135****7876刚刚领到1000个BG" },
        { name: "恭喜136****7066刚刚领到1000个BG" },
        { name: "恭喜137****7025刚刚领到1000个BG" },
        { name: "恭喜155****5698刚刚领到1000个BG" },
        { name: "恭喜136****4526刚刚领到1000个BG" },
        { name: "恭喜181****4152刚刚领到1000个BG" },
        { name: "恭喜180****5266刚刚领到1000个BG" },
        { name: "恭喜152****7866刚刚领到1000个BG" },
        { name: "恭喜137****7626刚刚领到1000个BG" },
        { name: "恭喜177****4516刚刚领到1000个BG" },
        { name: "恭喜138****7106刚刚领到1000个BG" },
        { name: "恭喜189****7925刚刚领到1000个BG" },
        { name: "恭喜152****5848刚刚领到1000个BG" },
        { name: "恭喜136****4976刚刚领到1000个BG" },
        { name: "恭喜137****4662刚刚领到1000个BG" },
        { name: "恭喜173****5586刚刚领到1000个BG" },
        { name: "恭喜135****1246刚刚领到1000个BG" },
        { name: "恭喜134****7836刚刚领到1000个BG" },
        { name: "恭喜178****4726刚刚领到1000个BG" },
        { name: "恭喜150****7176刚刚领到1000个BG" },
        { name: "恭喜137****7696刚刚领到1000个BG" },
        { name: "恭喜150****4526刚刚领到1000个BG" },
        { name: "恭喜138****7066刚刚领到1000个BG" },
        { name: "恭喜137****1025刚刚领到1000个BG" },
        { name: "恭喜152****2648刚刚领到1000个BG" },
        { name: "恭喜136****3966刚刚领到1000个BG" },
        { name: "恭喜137****4622刚刚领到1000个BG" },
        { name: "恭喜188****5786刚刚领到1000个BG" },
        { name: "恭喜156****1556刚刚领到1000个BG" },
        { name: "恭喜136****7456刚刚领到1000个BG" },
        { name: "恭喜134****4376刚刚领到1000个BG" },
        { name: "恭喜135****7276刚刚领到1000个BG" },
        { name: "恭喜136****7166刚刚领到1000个BG" },
        { name: "恭喜137****7025刚刚领到1000个BG" },
        { name: "恭喜155****5898刚刚领到1000个BG" },
        { name: "恭喜136****4926刚刚领到1000个BG" }
      ]
    };
  },
  created() {
    setInterval(this.scroll, 2500);
  },
  mounted() {},
  methods: {
    scrollTop() {
      window.scrollTo(0, 150);
    },
    isMobile(v) {
      return new RegExp(/^1\d{10}$/).test(v);
    },
    closeDownFix() {
      this.isShowDownFix = false;
    },
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.items.push(this.items[0]);
        this.items.shift();
        this.animate = false;
      }, 1500);
    },
    login() {
      if (this.phone == "") {
        Toast({
          message: "请输入手机号码",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      if (!this.isMobile(this.phone)) {
        Toast({
          message: "请输入正确的手机号码",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      if (this.password == "") {
        Toast({
          message: "请输入密码",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      let data = {
        email: this.phone,
        password: this.password
      };
      userLogin(data).then(async res => {
        await this.$store.dispatch("login", res);
        this.$router.push({ name: "jiucai" });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  padding-bottom: 2rem;
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.34rem;
  }
  :-moz-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.34rem;
  }
  ::-moz-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.34rem;
  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.34rem;
  }
  background-color: #ff5f4d;
  .laba {
    width: 3.35rem * 2;
    height: 0.6rem;
    line-height: 0.6rem;
    margin: 0 auto 0.28rem;
    border-radius: 0.6rem;
    background: #ffb5ac url("~@/assets/images/login/laba.png") 0.2rem 0.18rem
      no-repeat;
    background-size: 0.24rem 0.24rem;
    overflow: hidden;
    .ml {
      padding: 0 0.2rem 0 0.6rem;
      overflow: hidden;
      transition: all 0.5s;
      li {
        font-size: 0.2rem;
        color: #fff;
        margin-right: 0.8rem;
        height: 0.6rem;
        line-height: 0.6rem;
      }
      .anim {
        transition: all 1.5s;
        margin-top: -0.6rem;
      }
    }
  }
  .l-main {
    width: 5.6rem;
    margin: 0 auto;
    padding-bottom: 2rem;
    .title {
      font-size: 0.28rem;
      color: #fff;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-bottom: 0.22rem;
    }
    .text-content {
      height: 0.64rem;
      line-height: 0.64rem;
      margin-bottom: 0.14rem;
      .quhao {
        width: 1.2rem;
        font-size: 0.34rem;
        color: #fff;
        float: left;
      }
      .tel {
        float: left;
        width: 4.4rem;
      }
      .text {
        display: block;
        width: 100%;
        height: 0.64rem;
        line-height: 0.64rem;
        background: transparent;
        color: #fff;
        font-size: 0.34rem;
      }
    }
    .line {
      border-bottom: 0.01rem solid #fff;
      margin-bottom: 0.44rem;
    }
    .ft3 {
      text-align: center;
      font-size: 0.24rem;
      color: #fff;
      margin-bottom: 0.2rem;
      a {
        color: #fff;
        text-decoration: underline;
      }
    }
    .btn-reg {
      text-align: center;
      .register {
        width: 4.4rem;
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.36rem;
        color: #ff5b4a;
        background: -moz-linear-gradient(center top, #ffeac8, #ffbd54) repeat;
        background: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          from(#ffeac8),
          to(#ffbd54)
        );
        display: inline-block;
        font-weight: bold;
        -webkit-border-radius: 0.44rem;
        -moz-border-radius: 0.44rem;
        border-radius: 0.44rem;
        box-shadow: 0 0.02rem 3px #7e7e7e;
      }
    }
  }
  .down-fix {
    height: 1rem;
    width: 7.5rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -3.75rem;
    z-index: 1;
    .logo {
      position: absolute;
      left: 0.32rem;
      top: 0.1rem;
      width: 0.8rem;
      height: 0.8rem;
    }
    .ft4 {
      font-size: 0.24rem;
      position: absolute;
      top: 0.34rem;
      left: 0.66rem * 2;
    }
    .btn-xz {
      display: block;
      background-color: #3091fb;
      width: 0.62rem * 2;
      height: 0.56rem;
      line-height: 0.56rem;
      color: #fff;
      text-align: center;
      position: absolute;
      right: 0.48rem * 2;
      top: 0.22rem;
      font-size: 0.24rem;
      -webkit-border-radius: 0.28rem;
      -moz-border-radius: 0.28rem;
      border-radius: 0.28rem;
    }
    .pic-close {
      width: 0.48rem;
      height: 0.48rem;
      position: absolute;
      right: 0.32rem;
      top: 0.32rem;
    }
  }
}
</style>
