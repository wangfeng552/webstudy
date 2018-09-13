<template>
  <transition name="fade">
    <div  class="plugin-sp" v-show="show" @click="show=false"   >
      <img id="sp-img" :src="cSrc" @click.stop />
      <canvas id="sp-canvas"  ref="canvas">
        
      </canvas>
      <p class="verbose">
        长按图片保存
      </p>
    </div>
  </transition>
</template>
<script>
import QRCode from "qrcode";

let instance;
export default {
  install(Vue) {
    Vue.prototype.$sharePost = ({ url }) => {
      instance.addQrImg(url);
      instance.show = true;
    };
  },
  created() {
    instance = this;
  },
  watch: {
    show(value) {
      if (value) {
        return document.querySelector("html").classList.add("lock");
      }
      document.querySelector("html").classList.remove("lock");
    }
  },
  data() {
    return {
      show: false,
      title: "no title",
      qrCode: "",
      cSrc: "",
      poster: require("@/assets/images/poster.png")
    };
  },
  methods: {
    async addQrImg(url) {
      const time = 0.7;
      const width = document.body.clientWidth;
      const height = window.innerHeight;
      const cWidth = width * time;
      const cHeight = ((width * 1334) / 750).toFixed(0) * time;
      this.qrCode = await QRCode.toDataURL(url);
      const $canvas = document.getElementById("sp-canvas");
      const $img = document.getElementById("sp-img");
      $canvas.setAttribute("width", cWidth * 2);
      $canvas.setAttribute("height", cHeight * 2);
      $img.style.width = cWidth + "px";
      $img.style.height = cHeight + "px";
      let ctx = $canvas.getContext("2d");
      let img = new Image();
      ctx.scale(2, 2);

      const that = this;
      img.onload = function() {
        ctx.drawImage(
          this,
          0,
          0,
          this.width,
          this.height,
          0,
          0,
          cWidth,
          cHeight
        );
        var img2 = new Image();
        img2.onload = function() {
          ctx.drawImage(
            this,
            0,
            0,
            this.width,
            this.height,
            cWidth * 0.22,
            cHeight * 0.855,
            cWidth * 0.22,
            cWidth * 0.22
          );
          $canvas.style.width = cWidth + "px";
          $canvas.style.height = cHeight + "px";
          that.cSrc = $canvas.toDataURL("image/jpeg", 1);
        };
        img2.src = that.qrCode;
      };
      img.style.width = cWidth + "px";
      img.style.height = cHeight + "px";
      img.src = require("@/assets/images/poster.png");
    }
  }
};
</script>
<style lang="less">
html.lock {
  height: 100vh;
  overflow: hidden;
  body {
    height: 100vh;
    overflow: hidden;
  }
}
.plugin-sp {
  background-color: rgba(0, 0, 0, 0.85);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  .verbose {
    font-size: 18px;
    margin-top: 10px;
    color: white;
  }
  #sp-img {
    margin-top: 20px;
    // transform-origin: top center;
    // transform:scale(0.7)
  }
}
#sp-canvas {
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  z-index: -1;
  opacity: 0;
}
</style>
