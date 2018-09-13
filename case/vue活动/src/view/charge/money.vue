<template>
  <div class="chargemoney">
    <div class="title">充币大约需要3-5分钟到账</div>
    <div class="secoin" @click="showPick">{{newCoin}}<i class="jt"></i></div>
    <div class="qrcodew">
      <vue-qr :text="walletAddress" :size="240" :margin="0"></vue-qr>
    </div>
    <div class="fhei mb66">长按保存二维码</div>
    <div class="address mb20" id="target">
      {{walletAddress}}
    </div>
    <div class="fblue mb67" id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target"
         @click="copyPolicyNo">复制地址
    </div>
    <div class="moneypic">
      <div class="t">每种数字货币参与一局游戏所需数量：</div>
      <img src="@/assets/images/money.png" alt="">
    </div>
    <div><a href="http://static.biger168.com/load/index.html#/" class="show"><img class="show" src="@/assets/images/home/sy_10.png" alt=""></a></div>
    
    <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker ref="picker" style="width: 7.5rem;background: #fff;" :showToolbar="true" :slots="slots" valueKey="coinName">
          <a @click="handleConfirm" class="sure">确认</a>
        </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { createDeposit } from "@/api/http";
import VueQr from "vue-qr";
import Clipboard from "clipboard";
import { Toast } from "mint-ui";
export default {
  name: "money",
  data() {
    return {
      walletAddress: "",
      newCoin: "XMX",
      popupVisible: false,
      slots: [
        {
          values: [
            { coinCode: 106, coinName: "USDT" },
            { coinCode: 104, coinName: "ETH" },
            { coinCode: 209, coinName: "WFEE" },
            { coinCode: 204, coinName: "XMX" },
            { coinCode: 205, coinName: "FT" },
            { coinCode: 207, coinName: "ZJLT" },
            { coinCode: 210, coinName: "SDA" },
            { coinCode: 206, coinName: "QOS" }
          ]
        }
      ]
    };
  },
  created() {
    this.createDeposit({ coinCode: 204 });
  },
  components: { VueQr },
  methods: {
    createDeposit(data) {
      createDeposit(data).then(res => {
        this.walletAddress = res.walletAddress;
      });
    },
    handleConfirm() {
      var coin = this.$refs.picker.getValues()[0];
      this.newCoin = coin.coinName;
      this.popupVisible = false;
      this.createDeposit({ coinCode: coin.coinCode });
    },
    copyPolicyNo() {
      var clipboard = new Clipboard("#copyBtn");
      clipboard.on("success", function(e) {
        e.clearSelection();
        Toast({
          message: "复制成功",
          position: "bottom",
          duration: 5000
        });
      });
    },
    showPick() {
      this.popupVisible = true;
    }
  }
};
</script>

<style lang="less">
.picker-slot {
  width: 7.5rem;
}
.chargemoney {
  padding-bottom: 1rem;
  .sure {
    float: right;
    font-size: 0.28rem;
    display: block;
    width: 1rem;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #3092fc;
  }
  .secoin {
    width: 2.93rem;
    height: 0.72rem;
    line-height: 0.72rem;
    margin: 0 auto 0.36rem;
    border: 0.01rem solid #d8d8d8;
    position: relative;
    font-size: 0.3rem;
    color: #fff;
    padding-left: 1rem;
    border-radius: 0.08rem;
    .jt {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      width: 0.18rem;
      height: 0.14rem;
      background: url("~@/assets/images/jt_icon1.png") 0 0 no-repeat;
      background-size: 100%;
      display: block;
    }
  }
  .mb66 {
    margin-bottom: 0.4rem;
  }
  .mb20 {
    margin-bottom: 0.2rem;
  }
  .mb67 {
    margin-bottom: 0.8rem;
  }
  .title {
    font-size: 0.24rem;
    color: #fff;
    text-align: center;
    height: 0.82rem;
    line-height: 0.82rem;
  }
  .qrcodew {
    width: 2.94rem;
    height: 2.94rem;
    margin: 0 auto 0.14rem;
    border-radius: 0.12rem;
    background-color: #fff;
    padding: 0.26rem;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.09);
    img {
      display: block;
      margin-bottom: 0.1rem;
    }
  }
  .fblue {
    text-align: center;
    color: #3092fc;
    font-size: 0.28rem;
  }
  .address {
    padding: 0 0.4rem;
    font-size: 0.22rem;
    color: #fff;
    word-wrap: break-word;
    text-align: center;
  }
  .fhei {
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
  }
  .moneypic {
    width: 5.58rem;
    margin: 0 auto 0.2rem;
    .t {
      color: #fff;
      font-size: 0.28rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
