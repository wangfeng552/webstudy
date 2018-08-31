<template>
  <div class="money">
    <div class="title">充币大约需要3-5分钟到账</div>
    <div class="qrcodew">
      <vue-qr :text="walletAddress" :size="480" :margin="0"></vue-qr>
    </div>
    <div class="fblue mb66">长按保存图片</div>
    <div class="address mb66" id="target">
      {{walletAddress}}
    </div>
    <div class="fblue mb67" id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target"
         @click="copyPolicyNo">复制地址
    </div>
    <div class="fhei">如XMX不足可下载App购买BG</div>
    <div class="btn-down"><a class="down" href="http://static.biger168.com/load/index.html#/">下载biger</a></div>
  </div>
</template>

<script>
import { createDeposit } from "@/api/http";
import VueQr from "vue-qr";
import Clipboard from "clipboard";
export default {
  name: "money",
  data() {
    return {
      walletAddress: ""
    };
  },
  created() {
    var data = { coinCode: 101 };
    createDeposit(data).then(res => {
      this.walletAddress = res.walletAddress;
    });
  },
  components: { VueQr },
  methods: {
    copyPolicyNo() {
      var clipboard = new Clipboard("#copyBtn");
      clipboard.on("success", function(e) {
        e.clearSelection();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.money {
  background-color: #f0f2f5;
  height: 100vh;
  .mb66 {
    margin-bottom: 0.4rem;
  }
  .mb67 {
    margin-bottom: 0.8rem;
  }
  .title {
    font-size: 0.24rem;
    color: #aebbc7;
    text-align: center;
    height: 0.82rem;
    line-height: 0.82rem;
  }
  .qrcodew {
    width: 4.8rem;
    height: 4.8rem;
    margin: 0 auto;
    border-radius: 0.12rem;
    background-color: #fff;
    padding: 0.58rem;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
    margin-bottom: 0.48rem;
  }
  .fblue {
    text-align: center;
    color: #3092fc;
    font-size: 0.28rem;
  }
  .address {
    padding: 0 0.4rem;
    font-size: 0.22rem;
    color: #0f3652;
    word-wrap: break-word;
    text-align: center;
  }
  .fhei {
    font-size: 0.28rem;
    text-align: center;
    margin-bottom: 0.2rem;
  }
  .btn-down {
    height: 0.88rem;
    .down {
      width: 4.4rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      font-size: 0.4rem;
      background-color: #3092fc;
      border-radius: 0.44rem;
      display: block;
      margin-left: 0.78 * 2rem;
    }
  }
}
</style>
