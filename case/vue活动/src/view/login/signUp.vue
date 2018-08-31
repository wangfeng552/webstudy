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
          <div class="quhao">+86
          </div>
          <div class="tel"><input class="text" v-model="phone" placeholder="请输入手机号" type="number"></div>
        </div>
      </div>
      <div class="line">
        <h4 class="title">验证码</h4>
        <div class="text-content clearfix">
          <div class="dxyzm"><input class="text" v-model="dxcode" placeholder="请输入短信验证码" type="number"></div>
          <div class="hqyzm"><timer-btn :phone="phone" class="btn-yzm" ref="timerbtn" v-on:run="sendCode"></timer-btn></div>
        </div>
      </div>
      <div class="line">
        <h4 class="title">密码</h4>
        <div class="text-content">
          <input class="text" placeholder="请输入至少8位字母+数字" type="password" v-model="password">
        </div>
      </div>
      <div class="ft3">已有账号？<router-link class="register" :to="{name:'signIn'}">登录</router-link></div>
      <div class="btn-reg"><a class="register" @click="goRegister">注册</a></div>
    </div>
    <div class="down-fix" v-if="isShowDownFix">
      <img class="logo" src="@/assets/images/login/logo.png" alt="">
      <div class="ft4">下载biger 每天免费领比特币红包</div>
      <a href="http://static.biger168.com/load/index.html#/" class="btn-xz">下载</a>
      <img class="pic-close" @click="closeDownFix" src="@/assets/images/login/close.png" alt="">
    </div>
    <mt-popup v-model="popupVisiblePic">
      <div class="pic-code">
        <h3 class="t">请输入以下验证码</h3>
        <div><input type="text" v-model="captchaImgText" class="txyzm"></div>
        <div class="look">
          <img class="pic" :src="captchaImg" alt="">
          <a class="f5" @click="changeCaptcha" >看不清，换一张</a>
        </div>
        <div class="btn">
          <a class="quxiao" @click="quxiao">取消</a>
          <a class="sure" @click="sure">确定</a>
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import { stringUtil } from "@/assets/js/common";
import { Toast } from "mint-ui";
import timerBtn from "@/components/timerBtn";
import { mapGetters } from "vuex";
import {
  getCaptcha,
  verifyCaptcha,
  getPhoneCaptcha,
  userRegisterPhone
} from "@/api/http";
export default {
  components: {
    timerBtn
  },
  data() {
    return {
      phone: "",
      dxcode: "",
      password: "",
      captchaImg: "",
      captchaImgText: "",
      animate: false,
      popupVisiblePic: false,
      isShowDownFix: true,
      items: [
        { name: "恭喜138****7066刚刚领到99个BG" },
        { name: "恭喜137****7025刚刚领到99个BG" },
        { name: "恭喜152****5698刚刚领到99个BG" },
        { name: "恭喜136****4526刚刚领到99个BG" },
        { name: "恭喜137****4152刚刚领到99个BG" },
        { name: "恭喜188****5266刚刚领到99个BG" },
        { name: "恭喜152****7866刚刚领到99个BG" },
        { name: "恭喜137****7696刚刚领到99个BG" },
        { name: "恭喜150****4526刚刚领到99个BG" },
        { name: "恭喜138****7066刚刚领到99个BG" },
        { name: "恭喜137****7025刚刚领到99个BG" },
        { name: "恭喜152****5648刚刚领到99个BG" },
        { name: "恭喜136****4966刚刚领到99个BG" },
        { name: "恭喜137****4622刚刚领到99个BG" },
        { name: "恭喜188****5786刚刚领到99个BG" },
        { name: "恭喜156****1256刚刚领到99个BG" },
        { name: "恭喜136****7856刚刚领到99个BG" },
        { name: "恭喜134****4776刚刚领到99个BG" },
        { name: "恭喜135****7876刚刚领到99个BG" }
      ]
    };
  },
  created() {
    setInterval(this.scroll, 2500);
    console.log(this.sourceParam);
  },
  computed: {
    ...mapGetters(["sourceParam"])
  },
  methods: {
    //是否手机号
    isMobile(v) {
      return new RegExp(/^1\d{10}$/).test(v);
    },
    changeCaptcha() {
      getCaptcha().then(({ data }) => {
        this.captchaImg = data;
      });
    },
    // 验证码
    sendCode() {
      this.popupVisiblePic = true;
      getCaptcha().then(({ data }) => {
        this.captchaImg = data;
      });
    },
    async sure() {
      await verifyCaptcha(this.captchaImgText);
      this.popupVisiblePic = false;
      let data = {
        captcha: this.captchaImgText,
        cellPhone: this.phone
      };
      await getPhoneCaptcha(data);
      this.$refs.timerbtn.start();
    },
    quxiao() {
      this.popupVisiblePic = false;
    },
    closeDownFix() {
      this.isShowDownFix = false;
    },
    goRegister() {
      //去注册
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
      if (this.dxcode == "") {
        Toast({
          message: "请输入短信验证码",
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
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(this.password)) {
        Toast({
          message: "请输入至少8位字母+数字",
          position: "bottom",
          duration: 5000
        });
        return;
      }

      let data = {
        phonecode: this.dxcode,
        cellphone: this.phone,
        password: this.password,
        sourceParam: this.sourceParam
      };
      userRegisterPhone(data).then(res => {
        this.$store.dispatch("login", res);
        this.$router.push({ name: "jiucai" });
      });
    },
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.items.push(this.items[0]);
        this.items.shift();
        this.animate = false;
      }, 1500);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
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
        font-size: 0.34rem;
        color: #fff;
      }
      .dxyzm {
        float: left;
        width: 3.6rem;
      }
      .hqyzm {
        float: right;
        width: 1.72rem;
        .btn-yzm {
          width: 0.86rem * 2;
          background-color: #ffd853;
          color: #ff5f4e;
          font-size: 0.22rem;
          text-align: center;
          display: block;
          height: 0.6rem;
          line-height: 0.6rem;
          -webkit-border-radius: 0.3rem;
          -moz-border-radius: 0.3rem;
          border-radius: 0.3rem;
          border: none;
        }
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
    left: 0;
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
  .mint-popup {
    background: transparent;
  }
  .pic-code {
    width: 2.7rem * 2;
    background-color: #fff;
    border-radius: 0.24rem;
    .t {
      text-align: center;
      font-size: 0.32rem;
      padding: 0.36rem 0 0.32rem;
    }
    .txyzm {
      width: 1.52rem * 2;
      padding: 0.15rem 0;
      height: 0.7rem;
      line-height: 0.4rem;
      border: 0.01rem solid #d8d8d8;
      margin-left: 0.63rem * 2;
      display: block;
      text-align: center;
    }
    .look {
      margin-left: 0.63rem * 2;
      .pic {
        width: 1.4rem;
        height: 0.6rem;
        vertical-align: middle;
        display: inline-block;
      }
      .f5 {
        color: #3092fc;
        font-size: 0.24rem;
        vertical-align: middle;
        display: inline-block;
      }
    }
    .btn {
      height: 0.88rem;
      line-height: 0.88rem;
      border-top: 0.01rem solid #d4dbe1;
      > a {
        display: inline-block;
        width: 1.33rem * 2;
        height: 0.88rem;
        line-height: 0.88rem;
        color: #3092fc;
        font-size: 0.34rem;
        text-align: center;
        float: left;
      }
      .quxiao {
        border-right: 0.01rem solid #d4dbe1;
      }
    }
  }
}
</style>
