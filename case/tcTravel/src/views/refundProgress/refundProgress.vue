<template>
  <div class="progress">
    <div class="header" v-if="!isWeChat" data-flex="main:justify box:first cross:center">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>退款进度</p>
    </div>
    <div v-if="!isWeChat" class="empty"></div>
    <div class="progress-con">
      <ul data-flex="cross:center box:justify">
        <li>
          <p class="circle" :class="{active:proState == 'progress'}"></p>
          <p class="rate" :class="{activeT:proState == 'progress'}">提交申请</p>
        </li>
        <li data-flex="dir:top cross:center">
          <span></span>
          <p class="circle line" :class="{active:proState == 'progressing'}">
          </p>
          <p class="rate" :class="{activeT:proState == 'progressing'}">审核中</p>
        </li>
        <li data-flex="dir:top cross:bottom">
          <p class="circle" :class="{active:proState == 'progressed'}"></p>
          <p class="rate" :class="{activeT:proState == 'progressed'}">审核通过</p>
        </li>
      </ul>
      <ul>
        <li class="zd"></li>
        <li data-flex="main:justify cross:center">
          <p class="pro-left">申请时间</p>
          <p class="pro-right">2018-08-22</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="pro-left">退款数量</p>
          <p class="pro-right">x1</p>
        </li>
        <li class="zd"></li>
        <li data-flex="main:justify cross:center">
          <p class="pro-left">退款金额</p>
          <p class="pro-right">98元</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="pro-left">退款手续费</p>
          <p class="pro-right">8元</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="pro-left">退款账户</p>
          <p class="pro-right">原支付账户</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="pro-left">到账情况</p>
          <p class="pro-right pro-state">处理中</p>
        </li>
        <li class="zd"></li>

      </ul>
      <div class="tips">
        <p>温馨提示:</p>
        <p>{{tips}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  export default {
    name: "refund-progress",
    data(){
      return{
        proState:'progressing',
        tips:this.$root.tips,
        newOrderDetail:{}
      }
    },
    mounted(){

    },
    created(){
      if(Object.keys(this.orderDetail).length === 0){
        this.newOrderDetail=JSON.parse(sessionStorage.getItem('orderDetails'))
        this.getOrderDetail(this.newOrderDetail)
      }
    },
    computed:{
      ...mapState([
        'orderDetail',
        'isWeChat'

      ])
    },
    methods:{
      ...mapActions(['getOrderDetail']),
      goBack(){
        if(this.$router.currentRoute.fullPath.indexOf('fromAPP') > 0){
          window.jfNative = jfNative;
          window.jfNative.open('device', 'closewebview')
        }else{
          this.$router.go(-1);
        }
      },

    }
  }
</script>

<style lang="scss"scoped>
  .progress{
    .header {
      position: fixed;
      width: 100%;
      padding: 0 0.3rem;
      height: 0.9rem;
      font-size: 0.34rem;
      color: #333;
      background: #fff;
      border-bottom: thin solid #ededed;
      p {
        text-align: center;
      }
      .btn-back {
        img {
          display: block;
          width: 0.2rem;
          height: 0.4rem;
        }
      }
    }
    .empty {
      height: 0.9rem;
    }
    .progress-con{
      font-size:.24rem;
      color:#999;
      ul:nth-of-type(1){
        padding:.28rem;
        li{
          position: relative;
          p{
            color:#999;
          }
          span{
            position:absolute;
            width:6.56rem;
            height:.03rem;
            top:20%;
            left:50%;
            transform:translate(-50%);
            background:#D8D8D8;
          }
          .line{
            position:relative;
            z-index: 99;
          }
          .circle{
            width:.26rem;
            height:.26rem;
            background:#e2e2e2;
            border-radius:50%;
          }
          .active{
            background:#DBBD72;
          }
          .activeT{
            color:#DBBD72;
          }
        }
      }
      ul:nth-of-type(2){
        color:#666;
        font-size:.28rem;
        li{
          padding:0 .28rem;
          line-height:1rem;
          border-bottom:thin solid #ededed;
          .pro-left{
            color:#666;
          }
          .pro-right{
            color:#333;
          }
          .pro-right.pro-state{
            color:#DBB960;
          }
        }
        li.zd{
          height:.20rem;
          background:#ebebeb;
        }
      }
      .tips{
        color:#666;
        padding:.32rem .15rem;
        font-size:.24rem;
        background:#fff;
        text-align: justify;
      }
    }
  }
</style>