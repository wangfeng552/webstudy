<template>
  <div class="invoice">
    <div class="header" v-if="!(browser || jfmore)">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>开取发票</p>
    </div>
    <div :class="{ 'content': !(browser || jfmore)}">
        <div class="info-fast">
            <div class="info">
                <span>是否开票</span>
                <div class="choice">
                    <span :class="{'isInvoice':invoice.invoiceFlag == '01'}" @click="switchStatus('invoiceFlag', '01')">
                        开取发票
                    </span>
                    <span :class="{'isInvoice':invoice.invoiceFlag == '00'}"  @click="switchStatus('invoiceFlag', '00')">
                        无需发票
                    </span>
                </div>
            </div>
            <div class="info">
                <span>
                    开票信息
                </span>
                <div class="choice-target">
                    <span :class="{'invoiceType':invoice.type == '1'}" @click="switchStatus('type', '1')">
                        <i></i>个人
                    </span>
                    <span :class="{'invoiceType':invoice.type == '2'}" @click="switchStatus('type', '2')">
                        <i></i>公司
                    </span>
                </div>
            </div>
            <div class="info info-input">
                <span>发票抬头</span>
                <input type="text" v-model="invoice.invoicetitle" placeholder="请输入开票信息">
            </div>
            <div class="info info-input">
                <span>纳税人识别号</span>
                <input type="text" v-model="invoice.registrationnum" placeholder="请输入纳税人识别号">
            </div>
        </div>

        <div class="info-fast substance invoice-content">
            <div>发票内容</div>
            <input v-model="invoice.content"  placeholder="门票服务（代运营确定）"/>
        </div>

        <div class="info-fast substance address">
            <div class="title">发票邮寄地址</div>
            <div class="info info-input">
                <span>姓名</span>
                <input type="text" v-model="invoice.receivername" placeholder="收件人姓名">
            </div>
            <div class="info info-input">
                <span>手机号</span>
                <input type="text" v-model="invoice.receiverphone" placeholder="收件人手机号码">
            </div>
            <div class="info-textarea">
                <div>详细地址</div>
                <textarea name="" id="" cols="30" rows="10" v-model="invoice.receiveraddress" placeholder="收件人详细地址"></textarea>
            </div>

            <div class="bottom-button">
                <div class="buttom" @click="submit">
                    确定
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { browserUtil } from "../../assets/js/common";
import { mapState, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      browser: false,
      jfmore: false,
      invoice: {
        invoiceFlag: "00", // 开票标识 00:不开票 01:开票
        type: "1", // 开票类型(1:个人；2:公司)
        invoicetitle: "", // 发票抬头 invoicetitle不能为空
        registrationnum: "", // // registrationnum纳税人识别号 registrationnum不能为空
        content: "", // "content不能为空  发票内容
        receivername: "", // 收件人 receivername不能为空
        receiverphone: "", // 收件人手机号 不能为空
        receiveraddress: "" //收件地址 不能为空
      }
    };
  },
  computed: {
    ...mapState(["invoiceInfo"])
  },
  methods: {
    ...mapActions(["getInvoiceInfo"]),
    goBack() {
      this.$router.go(-1);
    },
    switchStatus(status, value) {
      this.invoice[status] = value;
    },
    check() {
      function prompt(message) {
        Toast({
          message,
          position: "bottom",
          duration: "1000"
        });
      }

      if (this.invoice.invoiceFlag == "00") {
        // 如果无需开发票就不要校验
        return true;
      } else if (!this.invoice.invoicetitle) {
        prompt("发票抬头不能为空");
        return false;
      } else if (!this.invoice.registrationnum) {
        prompt("纳税人识别号不能为空");
        return false;
      } else if (!this.invoice.content) {
        prompt("发票内容不能为空");
        return false;
      } else if (!this.invoice.receivername) {
        prompt("收件人不能为空");
        return false;
      } else if (!/^1\d{10}$/.test(this.invoice.receiverphone)) {
        prompt("请输入正确的收件人号码");
        return false;
      } else if (!this.invoice.receiveraddress) {
        prompt("收件地址不能为空");
        return false;
      } else {
        return true;
      }
    },
    submit() {
      // 提交
      if (this.check()) {
        // 将发票信息缓存到vuex中
        this.getInvoiceInfo(this.invoice);
        this.goBack();
      }
    }
  },
  created() {
    this.browser = browserUtil().weixin;
    this.jfmore = browserUtil().jfmore;
    //页面进来  读取vuex中的值
    console.log(this.invoiceInfo);
    if(this.invoiceInfo.invoiceFlag){
        this.invoice = this.invoiceInfo;
        console.log(this.invoice);
    }
    
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.invoice {
  font-size: 12px;
  background: #ebebeb;
  .header {
    position: fixed;
    width: 100%;
    padding: 0 0.3rem;
    height: 0.9rem;
    font-size: 0.34rem;
    color: #333;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    z-index: 9;
    a {
      width: auto;
      img {
        display: block;
        width: 0.2rem;
        height: 0.4rem;
      }
    }
    p {
      flex: 1 0 0;
      text-align: center;
    }
  }

  .content {
    padding-top: 0.9rem;
  }

  .info-fast {
    background: #ffffff;
    .info {
      height: 0.99rem;
      line-height: 0.99rem;
      display: flex;
      padding-left: 0.23rem;
      padding-right: 0.25rem;
      border-bottom: 1px solid #ebebeb;
      span {
        font-size: 0.28rem;
        color: #666666;
      }
      .choice {
        flex: 1 0 0;
        text-align: right;
        .isInvoice {
          background: #dbbd72;
          color: white;
        }

        span {
          color: #dbbd72;
          font-size: 0.2rem;
          width: 1.56rem;
          height: 0.54rem;
          display: inline-block;
          border: 1px solid #dbbd72;
          border-radius: 50px;
          line-height: 0.54rem;
          text-align: center;
        }
        span:first-child {
          margin-right: 0.24rem;
        }
      }
      .choice-target {
        flex: 1 0 0;
        text-align: right;
        .invoiceType {
          color: #dbbd72;
          i {
            background: #dbbd72;
            border: 1px solid #dbbd72;
          }
        }
        span {
          display: inline-flex;
          align-items: center;
          i {
            height: 0.26rem;
            width: 0.26rem;
            border: 1px solid #979797;
            display: inline-block;
            border-radius: 100%;
            margin-right: 0.07rem;
          }
        }
        span:first-child {
          margin-right: 0.75rem;
        }
      }
    }
    .info-input {
      justify-content: space-between;
      input {
        width: 65%;
        text-align: right;
        color: #666666;
      }
    }
  }
  .substance {
    margin-top: 0.2rem;
  }
  .invoice-content {
    padding: 0.25rem 0.23rem;
    div {
      font-size: 0.28rem;
      padding-bottom: 0.24rem;
      color: #666666;
    }
    input {
      height: 0.6rem;
      width: 100%;
      font-size: 0.28rem;
    }
  }
  .address {
    .title {
      padding: 0.16rem 0.23rem;
      font-size: 0.28rem;
      color: #666666;
    }
    .info-textarea {
      padding: 0.19rem 0.23rem;
      border-bottom: 1px solid #ebebeb;
      div {
        font-size: 0.28rem;
        color: #666666;
      }
      textarea {
        padding-top: 0.16rem;
        width: 100%;
        height: 1.5rem;
      }
    }
    .bottom-button {
      text-align: center;
      padding-top: 0.37rem;
      .buttom {
        width: 3.16rem;
        height: 0.8rem;
        display: inline-block;
        align-items: center;
        text-align: center;
        line-height: 0.8rem;
        border-radius: 20px;
        background: #dbbd72;
        color: #ffffff;
      }
    }
  }
}
</style>


