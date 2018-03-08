<template>
  <div class="bgf5f">
    <div class="w1200" style="padding-top: 60px;">
        <div class="pay-box clearfix">
          <div class="pay-l">
            <h4 class="pay-title " v-if="payMethods=='alipay'">支付宝 </h4>
            <h4 class="pay-title pay-title-wx" v-else>微信支付</h4>
            <ul class="pay-sale">
              <span class="pay-s1">实际费用</span>
              <strong class="str-1">{{fee | currency}}</strong>
            </ul>
            <ul class="pay-liushui">
              <li>支付流水：{{iner_id}} </li>
              <li>创建时间：{{created_at | formatDate}}</li>
            </ul>
            <ul class="pay-tel">
              <span class="pay-s2">企服星客服热线：</span>
              <strong class="str-2">400-870-8750</strong>
            </ul>
          </div>
          <div class="pay-r">
            <div class="qrcode">
              <div class="q-t"><img :src="qrcodeUrl" width="248" height="248"  alt=""></div>
              <div class="q-b"><img src="./images/naozhong.png" alt="">二维码有效时长为2小时，请尽快支付</div>
            </div>
            <div class="qrtishi" v-if="payMethods=='alipay'"> 请使用支付宝扫描二维码 <br/>以完成支付 </div>
            <div class="qrtishi" v-else> 请使用微信扫描二维码 <br/>以完成支付 </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {formatDate,currency} from 'assets/js/filter'
  import ActionCable from 'actioncable'
  import API from 'API/config'
  export default{
    data(){
      return {
        wsURL:API.ws,
        tradeId:'',
        payMethods:'', //支付方式
        qrcodeUrl:'',  //二维码
        fee:'',        //支付费用
        iner_id:'',    // 支付流水
        created_at:''  //创建时间
      }
    },
    created(){
      var vm=this;
      var cable = ActionCable.createConsumer(this.wsURL)
      var tradeId = this.$route.query.tradeId  //获取tradeId
      this.tradeId=tradeId;
      //支付成功回显
      cable.subscriptions.create('TradesChannel', {
        received: function (data) {
          if(data.trade.id==tradeId){
            vm.$router.push({name:'paySuccess',query:{tradeId:tradeId}})
          }
        },
        //当服务器上的订阅可用时调用
        connected: function() {
          return setTimeout((function(_this) {
            return function() {
              _this.followCurrentMessage();
            };
          })(this), 1000);
        },
        followCurrentMessage: function() {
          return this.perform('follow', {
            trade_id: tradeId
          });
        },
      });
      //获取交易详情
      this.$http.get(API.url + 'customer/trade/' + tradeId).then((res) => {
        var resBody = res.body;
        var trade = resBody.trade;
        var qrcode;
        this.payMethods = trade.category;
        this.fee=trade.fee;
        this.iner_id=trade.iner_id;
        this.created_at=trade.created_at;
        if (this.payMethods == 'alipay') {
          qrcode = trade.response.alipay_trade_precreate_response.qr_code
        } else if (this.payMethods == 'wechatpay') {
          qrcode = trade.response.code_url;
        }
        return qrcode
      }).then((res) => {
        //获取二维码
        this.$http.get(API.url + 'tools/qrcode', {
          params: {
            url: res,
            width: 248,
            height: 248
          }
        }).then((res) => {
          this.qrcodeUrl = res.url;
        })
      })
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      currency(val){
        return currency(val)
      }
    }
  }
</script>

<style scoped="" lang="scss">
.pay-box{
  width: 940px;
  margin: 0 auto;
  background-color: #fff;
  padding: 60px 0;
  .pay-l{
    width: 250px;
    float: left;
    margin: 0 125px 0 156px;
    .pay-title{
      height: 54px;
      line-height: 54px;
      font-size: 20px;
      padding-left: 65px;
      background: url("./images/alipay.png") 0 0 no-repeat;
      margin-bottom: 37px;
    }
    .pay-title-wx{
      background: url("./images/weixin.png") 0 0 no-repeat;
    }
    .pay-sale{
      height: 24px;
      margin-bottom: 30px;
      .pay-s1{
        font-size: 14px;
        color:#5c5c5c;
        padding-right: 10px;
      }
      .str-1{
        font-size: 20px;
      }
    }
    .pay-liushui{
      border-top: 1px solid #d1d1d1;
      border-bottom: 1px solid #d1d1d1;
      padding: 25px 0 ;
      li{
        font-size: 12px;
        color: #5c5c5c;
        line-height: 28px;
      }
    }
    .pay-tel{
      padding: 25px 0 0 17px;
      font-size: 12px;
      color: #5c5c5c;
      background: url("./images/tel.png") 0 28px no-repeat;
      .str-2{
        font-size: 14px;
      }
    }
  }
  .pay-r{
    width: 250px;
    float: left;
    .qrcode{
      border:1px solid #efefef;
      margin-bottom: 10px;
      .q-t{
      }
      .q-b{
        text-align: center;
        font-size:12px;
        color:#5c5c5c;
        line-height: 42px;
        height: 42px;
        background:#f7f7f7;
        img { margin-right: 3px;}
      }
    }
    .qrtishi{
      background: #475669 url("./images/sys.png") 20px 20px no-repeat;
      font-size:12px;
      color:#ffffff;
      line-height:20px;
      padding: 14px 0 14px 64px;

    }
  }
}
</style>
