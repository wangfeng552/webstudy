<template>
  <div class="refund">
    <div class="header" v-if="!isWeChat" data-flex="main:justify box:first cross:center">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>申请退款</p>
    </div>
    <div v-if="!isWeChat" class="empty"></div>
    <div class="refund-con">
      <ul>
        <li data-flex="main:justify cross:center">
          <p class="refund-left">景点名称</p>
          <p class="refund-right">{{orderDetail.sceneryName}}</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="refund-left">实付金额</p>
          <p class="refund-right">{{orderDetail.amount/100}}元</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="refund-left">退款金额</p>
          <p class="refund-right">{{orderDetail.amount/100}}元</p>
        </li>
        <li data-flex="main:justify cross:center">
          <p class="refund-left">退款数量</p>
          <p class="refund-right" data-flex="cross:center">
            <span class="btn-decrease" @click.prevent="amountChange(0)">-</span>
            <span class="amounts">{{amounts}}</span>
            <span class="btn-increase" @click.prevent="amountChange(1)">+</span>
          </p>
        </li>
        <li class="zd"></li>
        <li data-flex="main:justify cross:center">
          <p class="refund-left">请选择原因</p>
          <div class="selected">
            <span data-flex="cross:center" @click.prevent="selectChange">
              {{selected}}
              <i class="arrows" :class="{down:selectState}"></i>
            </span>
            <dl v-show="selectState">
              <dd v-for="option in options" @click.prevent="selectCause(option.text,option.value)">{{option.text}}</dd>
            </dl>
          </div>
        </li>
        <li class="zd"></li>
      </ul>
      <div class="tips">
        <p>温馨提示:</p>
        <p>{{tips}}</p>
      </div>
      <div class="btn-apply" @click.prevent="applyRefund">
        提交申请
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import cancelOrderServer from "../../service/CancelOrderService";
  import {cookieUtil} from'../../assets/js/common';
  import {Toast} from 'mint-ui';
  export default {
    name: "apply-refund",
    data(){
      return{
        selectState:false,
        selected: '行程取消',
        refundReasonId:1,
        options: [
          { text: '行程取消', value: 1 },
          { text: '门票预定错误', value: 2 },
          { text: '未收到取票确认号', value: 3 },
          { text: '景区无入园信息', value: 4 },
          { text: '价格不优惠', value: 5 },
          { text: '景区爆满/闭园', value: 6 },
          { text: '其他', value: 7 }
        ],
        tips:this.$root.tips,
        amounts:1,
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center',
            value:''
          }
        ],
        nowValue:'',
        nowValuet:'',
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
      //数量加减
      amountChange(value){
        if(value){
          this.amounts++;
        }else{
          this.amounts--;
        }
      },
      //退款原因选择
      selectCause(value,num){
        this.selected = value;
        this.refundReasonId = num;
        this.selectState = !this.selectState;
      },
      selectChange(value){
        this.selectState = !this.selectState;
      },
      //提交申请
      applyRefund(){
        cancelOrderServer.cancelOrder({
          login_token:cookieUtil.get('login_token'),
          trace:this.orderDetail.orderId,
          refundTicketsNum:this.amounts,
          refundReasonId:this.refundReasonId
        })
          .then(res =>{
            if(res.respCode == '0000'){
              Toast('申请退款成功')
              spm.refresh('#/orderList')
            }else{
              Toast(res.respMsg)
            }
          })
      }
    },
    watch:{
      amounts(value){
        if(value>=parseInt(this.orderDetail.ticketsNum)){
          this.amounts = parseInt(this.orderDetail.ticketsNum)
        }else if(value<=0){
          this.amounts = 1
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .refund{
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
    .empty {
      height: 0.9rem;
    }
    .refund-con{
      font-size:0.28rem;
      color:#666;
      ul{
        li{
          position:relative;
          padding:0 0.23rem;
          line-height:.88rem;
          border-bottom: thin solid #ededed;
          .refund-left{
            color:#666;
          }
          .refund-right{
            height:.88rem;
            color:#000;
            span{
              display: block;
              width:.29rem;
              text-align:center;
              font-size:.32rem;
            }
            .amounts{
              font-size:.48rem;
              margin:0 0.34rem;
              color:#dcbd74;
            }
          }
          .selected{
            position:relative;
            right:0.5rem;
            span{
              i{
                width:0.14rem;
                height:0.264rem;
                margin-left:0.292rem;
                display: inline-block;
                background:url(../../assets/images/right.png);
                background-repeat: no-repeat;
                background-size:100% 100%;
              }
              .down{
                transform: rotate(90deg);
              }
            }
            dl{
              position:absolute;
              right:50%;
              transform:translateX(50%);
              z-index:99;
              background:#fff;
              border:thin solid #ededed;
              dd{
                width:2.5rem;
                padding-left:0.1rem;
                border-bottom:thin solid #ededed;
              }
              dd:hover{
                color:#fff;
                background:#dcbd74;
              }
              .active{
                color:#fff;
                background:#dcbd74;
              }
            }

          }
        }
        li.zd{
          height:.2rem;
          background:#ebebeb;
        }
      }
      .tips{
        padding:.32rem .15rem;
        font-size:.24rem;
        background:#fff;
        text-align: justify;
      }
      .btn-apply{
        width:3.16rem;
        height:.8rem;
        text-align:center;
        line-height:.8rem;
        margin:.57rem auto;
        color:#fff;
        border-radius:.4rem;
        background:#DBB960;
      }
    }
    .empty{
      height:0.9rem;
    }
  }
</style>