<template>
  <div class="booking-order">
    <header-fix fixed :title="title"></header-fix>
    <div class="select-address" data-flex="cross:center main:justify">
      <div class="address-info" v-if="userAdress.userid">
          <p>
            <span>{{userAdress.username}}</span>
            <span>{{userAdress.hidemobileid}}</span>
          </p>
          <p class="consignee-address">
            {{userAdress.address}}
          </p>
      </div>
      <div class="" v-else>
        <p>请先设置收货地址</p>
      </div>
      <a href="/member/showaddress.htm?type=select">
        >
      </a>
    </div>
    <div class="booking-detail">
      <div class="goods-info" data-flex="main:justify cross:top">
        <div class="goods-info-left" data-flex="">
          <img :src="'/'+goodsDetail.itemSmallPic" alt=""/>
          <div class="goods-title" data-flex="dir:top main:justify">
            <p>{{goodsDetail.itemName}}</p>
            <p>¥{{(goodsDetail.collagePrice/100).toFixed(2)}}元</p>
          </div>
        </div>
        <p class="goods-amounts">x1</p>
      </div>
      <div class="liuyan" data-flex="main:left cross:center">
        <p>卖家留言:</p>
        <input type="text" placeholder="如有其他需要,请留言" v-model="ly"/>
      </div>
      <div class="goods-all-price">
        <p data-flex="main:justify cross:center">
          <span>商品总金额 :</span>
          <span>{{(goodsDetail.collagePrice/100).toFixed(2)}}元</span>
        </p>
        <p data-flex="main:justify cross:center">
          <span>运费 :</span>
          <span>0元</span>
        </p>
        <p data-flex="main:justify cross:center" v-show="goodsDetail.collageType == 0 && teamCode">
          <span>新人专享 :</span>
          <span>-{{(goodsDetail.discountPrice/100).toFixed(2)}}元</span>
        </p>
        <p data-flex="main:justify cross:center" v-show="!teamCode">
          <span>团长优惠 :</span>
          <span>-{{(goodsDetail.collagePrice/100).toFixed(2)}}元</span>
        </p>
      </div>
      <div class="goods-bottom" data-flex="main:justify cross:center">
        <p v-show="teamCode">实付 :¥{{((goodsDetail.collagePrice - goodsDetail.discountPrice)/100).toFixed(2)}}元</p>
        <p v-show="!teamCode">实付 :¥0元</p>
        <p class="btn-pay" :class="{active:userAdress.userid?false:true}" @click.prevent="goPay">去付款</p>
      </div>
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
  import headerFix from '../../components/header';
  import getAdressService from '../../service/GetAdressService';
  import orderConfirmService from '../../service/OrderConfirmService';
  import {userUtil,jfNative,cookieUtil,browserUtil} from'../../assets/js/common';
  import {Toast} from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        title:'订单确认',
        userAdress:{},
        token:'',
        collageId:this.$route.query.collageId || '',
        goodsNum:this.$route.query.goodsNum || '',
        goodsDetail:{},
        teamCode:this.$route.query.teamCode || '',
        ly:''
      };
    },
    created(){
      this.pagehide()
      this.token = cookieUtil.get('login_token');
      var addressid_session = sessionStorage.getItem(this.token+'-addressid');
      var addressList = JSON.parse(sessionStorage.getItem(this.token+'-addresslist')||'[]');
      var address = '';
      if(addressid_session == null || addressid_session.length == 0 || addressList.length == 0){
        //sessionStorage为空，请求后台获取默认收货地址
        getAdressService.getAdress()
          .then(res => {
            this.userAdress=res;
          })
      }else{
        for(var i in addressList){
          var item = addressList[i];
          if(addressid_session == item.addressid){
            address = item;
            break;
          }
        }
        this.userAdress = address;
      };
      orderConfirmService.getGoodsDetail({
        login_token:cookieUtil.get('login_token'),
        collageId:this.collageId,
        teamCode:this.teamCode
      })
        .then(res =>{
          if(res.respCode =='0000'){
            this.goodsDetail = res.data.detail
          }else{
            Toast(res.respMsg)
          }
        })
    },
    mounted(){

    },
    components:{
      headerFix
    },
    computed: {
    },
    methods: {
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
      //去付款
      goPay(params){
        var me= this;
        if(!this.userAdress.userid){
          return
        }
        orderConfirmService.orderDown({
            collageId:this.goodsDetail.collageId,
            addressId:this.userAdress.addressid,
            login_token:cookieUtil.get('login_token'),
            remark:this.ly,
            teamCode:this.teamCode,
            retUrl:location.origin+'/groupBooking/#/paySuccess'
        })
          .then(res => {
            if(res.respCode == '0000'){
              if(!res.data.paySeq){
                me.$router.push({path:'/paySuccess',query:{teamCode:res.data.teamCode,cash:0,points:0}})
              }else{
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
              }
            }else{
              if(res.respCode == '0004'){
                MessageBox.confirm('', {
                  message:res.respMsg,
                  title: '',
                  confirmButtonText: '去兑分'
                }).then(action => {
                  if (action == 'confirm') {     //确认的回调
                    spm.refresh('/butler/index.htm')
                  }
                }).catch(err => {
                  if (err == 'cancel') {     //取消的回调
                  }
                });
              }else{
                Toast(res.respMsg)
              }
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .booking-order{
    font-size:.28rem;
    .select-address{
      padding:.3rem;
      margin:.2rem auto;
      background:#fff;
      .address-info{
        width:6rem;
        p{
          width:100%;
          line-height:.5rem;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      a{
        font-size:.5rem;
        color:#d3b669;
      }
    }
    .booking-detail{
      .goods-info{
        padding:.3rem ;
        background:#fff;
        margin-bottom:.2rem;
        .goods-info-left{
          img{
            display:block;
            width:1.6rem;
            height:1.6rem;
            margin-right:.2rem;
          }
          .goods-title{
            width:4.5rem;
            p{
              width:100%;
              line-height: .5rem;
              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .liuyan{
        padding:.3rem;
        background:#fff;
        margin-bottom:.2rem;
        input{
          width:5rem;
          line-height:.8rem;
          -webkit-appearance: none;
          border:none;
          padding:.15rem .1rem;
          font-size:.4rem;
        }
        input::-webkit-input-placeholder {
           color:#666;
           font-size: .3rem;
           text-align:left;
           padding-left:.4rem;
        }
      }
      .goods-all-price{
        background:#fff;
        padding:.3rem;
        p{
          line-height:.5rem;
          span:last-child{
            color:#f42a38;
          }
        }
      }
      .goods-bottom{
        width:100%;
        padding-left:.3rem;
        position:fixed;
        bottom:0;
        line-height:1rem;
        background:#fff;
        p:first-child{
          padding-left:.2rem;
        }
        .btn-pay{
          width:3rem;
          font-size:.4rem;
          color:#fff;
          text-align:center;
          background:#d3b669;
        }
        .active{
          background:#666;
        }
      }
    }
  }
  .mint-msgbox-message{
    color:#666;
  }
  .mint-msgbox-confirm{
    color:#D7B667;
  }
</style>
