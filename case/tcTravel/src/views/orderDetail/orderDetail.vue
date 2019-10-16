<template>
  <div class="order-detail">
    <div class="header" v-if="!isWeChat" data-flex="main:justify box:first cross:center">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>{{header}}</p>
    </div>
    <div v-if="!isWeChat" class="empty"></div>
    <div class="order-detail-wrap">
      <div class="order-number order" data-flex="main:justify cross:center">
        <p class="numbers-left order-left">畅由订单号</p>
        <p class="numbers-right order-right">{{orderDetail.orderId}}</p>
      </div>
      <div class="order" data-flex="main:justify cross:center">
        <p class="order-left">订单状态</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'I'">未支付</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'D'">待推送</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'N'">待确认</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'F'">出票中</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'J'">已出票</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'V'">已使用</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'C'">取消</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'S'">未使用</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'R'">已退款</p>
        <p class="order-right order-status" v-if="orderDetail.state == 'R2'">退款中</p>
      </div>
      <div class="order-content order" @click.prevent="goDetail(orderDetail.sceneryId)">
        <p class="order-title order-left">{{orderDetail.sceneryName}}</p>
        <p class="order-amount order-left">数量: {{orderDetail.ticketsNum}}张</p>
        <img class="rightArrow" src="../../assets/images/right.png" alt=""/>
      </div>
      <div class="order-content order" data-flex="main:justify cross:center">
        <p class="order-price order-left">应付金额</p>
        <p class="order-right">{{orderDetail.amount/100}}元</p>
      </div>
      <div class="order-content order" data-flex="main:justify cross:top">
        <p class="order-proof order-left">游园凭证</p>
        <p class="order-right pz">{{orderDetail.voucher}}</p>
      </div>
      <div class="order-content order" data-flex="main:justify cross:center">
        <p class="order-time order-left">游园日期</p>
        <p class="order-right">{{orderDetail.travelDate}}</p>
      </div>
      <div class="order-content order" data-flex="main:justify cross:center">
        <p class="order-person order-left">出行人姓名</p>
        <p class="order-right">{{orderDetail.travelers[0].travelerName}}</p>
      </div>
      <div class="order-content order" data-flex="main:justify cross:center">
        <p class="order-person-mobile order-left">手机号</p>
        <p class="order-right">{{orderDetail.travelers[0].travelerMobile}}</p>
      </div>
      <div class="order-content order" v-show="orderDetail.travelers[0].travelerIdCardNo" data-flex="main:justify cross:center">
        <p class="order-person-card order-left">身份证</p>
        <p class="order-right">{{orderDetail.travelers[0].travelerIdCardNo}}</p>
      </div>
      <div class="tips">
        <p>{{tips}}</p>
      </div>
    </div>
    <div class="btn-pay" data-flex="cross:center" v-if="orderDetail.orderstate == 'I'">
      <p @click.prevent="toPay(orderDetail.paySeq)">去支付</p>
    </div>
    <div class="btn-pay" data-flex="cross:center">
      <p @click.prevent="applyRefund" v-if="orderDetail.orderstate == 'I' || orderDetail.orderstate == 'F' || orderDetail.orderstate == 'J' ">取消订单</p>
      <p @click.prevent="refundProgress" v-if="orderDetail.orderstate == 'R' || orderDetail.orderstate == 'R2' ">退款进度</p>
    </div>
    <!-- from 表单提交 -->
    <form action="" ref="formUrl" id="payForm" name="payForm" method="post">
      <input type="hidden" ref="funCode" name="funCode" value=""/>
      <input type="hidden" ref="rpid" name="rpid" value=""/>
      <input type="hidden" ref="reqDate" name="reqDate" value=""/>
      <input type="hidden" ref="reqTime" name="reqTime" value=""/>
      <input type="hidden" ref="paySeq" name="paySeq" value=""/>
      <input type="hidden" ref="retUrl" name="retUrl" value=""/>
      <input type="hidden" ref="sign" name="sign" value=""/>
      <input type="hidden" ref="expand" name="expand" value=""/>
    </form>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import createOrderService from '../../service/CreateOrderService';
  import {userUtil,jfNative,cookieUtil,stringUtil,browserUtil} from'../../assets/js/common';
  import {Toast} from 'mint-ui';
  import queryOrderServer from "../../service/orderDownService";
  export default {
    name: "order-detail",
    data(){
      return {
        header:this.$route.query.orderName+'订单' || '订单详情',
        newOrderDetail:{},
        tips:this.$root.tips
      }
    },
    created(){
        this.pagehide()
        if(Object.keys(this.orderDetail).length === 0){
          this.newOrderDetail=JSON.parse(sessionStorage.getItem('orderDetails'))
          this.getOrderDetail(this.newOrderDetail)
        }
    },
    destroyed(){
    },
    computed:{
      ...mapState([
        'orderDetail',
        'isWeChat'

      ])
    },
    methods:{
      ...mapActions(['getOrderDetail']),
      //去详情
      goDetail(sceneryID){
        this.$router.push({name: 'sceneryDetails',params:{sceneryId:sceneryID}})
      },
      //返回上一页
      goBack(){
        if(this.$router.currentRoute.fullPath.indexOf('fromAPP') > 0){
          window.jfNative = jfNative;
          window.jfNative.open('device', 'closewebview')
        }else{
          this.$router.go(-1);
        }
      },
      //去付款
      toPay(paySeq){
        var me = this
        queryOrderServer.autograph(
          {
            merId: "S2000081",
            callBack: encodeURIComponent("/tcTravel/#/success"),
            paySeq: paySeq
          })
          .then(res => {
            if (res.respCode === "0000") {
              me.$refs.formUrl.action = me.$root.paymentUrl;
              me.$refs.funCode.value = res.data.funCode;
              me.$refs.rpid.value = res.data.rpid;
              me.$refs.reqDate.value = res.data.reqDate;
              me.$refs.reqTime.value = res.data.reqTime;
              me.$refs.paySeq.value = res.data.paySeq;
              me.$refs.retUrl.value = res.data.retUrl;
              me.$refs.sign.value = res.data.sign;
              me.$refs.expand.value = res.data.expand;
              document.forms["payForm"].submit();
            } else {
              Toast({
                message: res.respMsg,
                position: "bottom",
                duration: 1000
              });
            }
          });

      },
      pagehide(){
        if (browserUtil().ios) {
          var isPageHide = false;
          window.addEventListener('pageshow', function () {
            if (isPageHide) {
              window.location.reload();
            }
          });
          window.addEventListener('pagehide', function () {
            isPageHide = true;
          });
        }
      },
      //取消订单
      cancelOrder(){

      },
      //申请退款
      applyRefund(){
        this.$router.push({name: 'applyRefund'})
      },
      //退款进度
      refundProgress(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-detail{
    .header{
      position:fixed;
      width:100%;
      padding:0 0.3rem;
      height:0.9rem;
      font-size:0.34rem;
      color:#333;
      background:#fff;
      p{
        text-align:center;
      }
      .btn-back{
        img{
          display: block;
          width:0.2rem;
          height:0.4rem;
        }
      }
    }
    .empty{
      height:0.9rem;
    }
    .order-detail-wrap{
      padding:0 0.23rem;
      .order-title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
      }
      .order-amount{
        line-height:0.6rem;
      }
      .order{
        font-size:0.28rem;
        line-height:0.88rem;
        border-bottom:thin solid #ebebeb;
      }
      .order-left{
        color:#666;
      }
      .order-right{
        color:#666;
      }
      .order-status{
        color:#DFC480;
      }
      .numbers-right{
        font-size:0.28rem;
        color:#333;
      }
      .tips{
        p{
          font-size:0.2rem;
          color:#999;
          padding:0.22rem 0.15rem;
          line-height:0.28rem;
        }
      }
      .order-content{
        position:relative;
        .rightArrow{
          position:absolute;
          width:0.17rem;
          height:0.32rem;
          top:50%;
          transform:translateY(-50%);
          right:0.3rem;
        }
        .pz{
          width:5.5rem;
          line-height:0.55rem;
          padding:0.15rem 0;
        }
      }
    }
    .btn-pay{
      p{
        width:3.6rem;
        height:0.8rem;
        text-align:center;
        line-height:0.8rem;
        font-size:0.3rem;
        color:#fff;
        background:#D7b667;
        border-radius:0.4rem;
        margin:0.6rem auto 0 auto;
      }
    }
  }
</style>