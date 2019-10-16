<template>
  <div class="paying-success">
    <header-fix fixed :title="title"></header-fix>
    <div class="paying-content">
      <img src="../../assets/images/booking_group_006.png" alt=""/>
      <p class="paying-title">支付成功</p>
      <div class="paying-info">
        <p data-flex="main:justify cross:center">
          <span>支付金额</span>
          <span>¥{{((cash/100).toFixed(2))?((cash/100).toFixed(2)):''}}</span>
        </p>
        <p data-flex="main:justify cross:center">
          <span>支付积分</span>
          <span>{{points?points:''}}积分</span>
        </p>
        <div class="paying-btns" data-flex="main:justify cross:center">
          <p class="btn-progress" :class="{active:clickState}" @click.prevent="btnClick(0)">查看团进度</p>
          <p class="btn-order" :class="{active:!clickState}" @click.prevent="btnClick(1)">查看订单</p>
        </div>
      </div>
      <div class="paying-time" v-show="showState && goodsDetail.teamStatus == 0">
        <p>帮拼即有机会获得该商品仅剩<span>{{goodsDetail.personNum - goodsDetail.teamPersonNum}}个</span>名额</p>
        <div class="paying-count-down" data-flex="cross:center main:center">
          距结束
          <count-down v-if="goodsDetail.teamEndTime" :endTime="goodsDetail.teamEndTime|timeFormat" :position="0" :timeStyle="true" @listenToChildEvent="receive">
          </count-down>
        </div>
        <p class="btn-share" v-show="showState && goodsDetail.teamStatus == 0" @click.prevent="btnShare">邀请好友帮拼</p>
      </div>
      <div class="paying-btns-index">
        <p class="btn-index" v-show="goodsDetail.teamStatus == 1 || goodsDetail.teamStatus==2" @click.prevent="btnToIndex">拼团{{goodsDetail.teamStatus == 1?'成功':'失败'}}，看看其他的吧</p>
      </div>
      <div class="paying-bottom"></div>
      <p class="paying-tips">可关注微信公众号"畅由平台"查看订单信息</p>
    </div>
    <div class="cover" v-show="shareState" @click.prevent="btnCloseWx"></div>
    <div class="cover-msg" v-show="shareState" @click.prevent="btnCloseWx">
      <img src="../../assets/images/booking_group_008.png" alt=""/>
      <p>还差{{goodsDetail.personNum- goodsDetail.teamPersonNum}}人,点击右上角邀请好友帮拼吧~</p>
    </div>
    <div class="cover-app" v-show="shareAppState" @click.prevent="btnClose"></div>
    <div class="cover-app-msg" v-show="shareAppState" >
      <p>分享成功</p>
      <p>分享3次以上,拼团成功率高达96%以上哦</p>
      <p @click.prevent="btnAppShare">继续分享</p>
    </div>
  </div>
</template>

<script>
  import headerFix from '../../components/header';
  import countDown from '../../components/countDown';
  import getGoodsDetail from '../../service/GetGoodsDetail';
  import {userUtil,browserUtil,cookieUtil,Share,stringUtil} from'../../assets/js/common';
  export default {
    data() {
      return {
        title:'支付成功',
        timeEnd:new Date().getTime()+10*3600*1000,
        clickState:false,
        showState:true,
        shareState:false,
        shareAppState:false,
        teamCode:'',
        goodsDetail:{},
        points:stringUtil.getQueryValue(location.href,'points') || 0,
        cash:stringUtil.getQueryValue(location.href,'cash')|| 0
      };
    },
    created(){
      this.teamCode = stringUtil.getQueryValue(location.href,'teamCode') || ''
      getGoodsDetail.getTuanDetail({
        teamCode:this.teamCode
      })
        .then(res=>{
          if(res.respCode == '0000'){
            this.goodsDetail = res.data.collageTeamDetails
            if(this.goodsDetail.collageType == 0){
              window._shareData = {
                title: {
                  wechat: '立即支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'帮团长助力'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元获得拼团好物',
                  othTitle: '立即支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'帮团长助力'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元获得拼团好物'
                },
                content: '我在畅由拼团发现了一个超值好物，邀请'+(this.goodsDetail.personNum-this.goodsDetail.teamPersonNum)+'位新用户即可获得，快来看看吧',
                imageurl: location.origin +'/'+ this.goodsDetail.itemPopPic.split('@@')[0],
                shareurl: location.origin +'/groupBooking/#/detail?teamCode='+this.goodsDetail.teamCode+'&channel_source=02005212'
              };
            }else{
              window._shareData = {
                title: {
                  wechat: '帮我支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'即有机会获得拼团好物',
                  othTitle: '帮我支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'即有机会获得拼团好物',
                },
                content: '我在畅由拼团发现了一个超值好物,支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元即有机会获得，快来看看吧',
                imageurl: location.origin +'/'+ this.goodsDetail.itemPopPic.split('@@')[0],
                shareurl: location.origin +'/groupBooking/#/detail?teamCode='+this.goodsDetail.teamCode+'&channel_source=02005212'
              };
            }
          }
        })

    },
    mounted(){
    },
    components:{
      headerFix,
      countDown
    },
    computed: {},
    filters:{
      timeFormat(val){
        return Date.parse(new Date(val))|| Date.parse(new Date(val.substring(0,19).replace(/-/g,'/')))
      },
      imgFormat(val){
        return val.split('@@')
      }
    },
    methods: {
      //回到首页
      btnToIndex(){
        spm.refresh('/groupBooking/#/index')
      },
      //点击分享
      btnShare(){
        if(browserUtil().jfmore){
          Share.appShare('share',window._shareData,(response)=>{
            if(response.status){
              this.shareAppState = !this.shareAppState
            }
          })
        }else{
          this.shareState = !this.shareState;
          Share.Weixin()
        }
      },
      //app点击分享
      btnAppShare(){
        Share.appShare('share',window._shareData,(response)=>{
          if(response.status){

          }
        })
      },
      //关闭app分享弹框
      btnClose(){
        this.shareAppState = !this.shareAppState;
      },
      btnCloseWx(){
        this.shareState = !this.shareState;
      },
      //点击跳转到详情或者订单列表
      btnClick(val){
        this.clickState = !this.clickState;
        if(!val){
          spm.refresh('/groupBooking/#/detail?teamCode='+this.teamCode)
        }else{
          spm.refresh('/order/order.htm')
        }
      },
      receive(val){
        if(val.isStatus){
          this.showState=false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .paying-success{
    position:relative;
  }
  .paying-content{
    font-size:.28rem;
    background:#fff;
    padding-top:1rem;
    img{
      display:block;
      width:1.82rem;
      height:1.82rem;
      margin:0 auto .4rem auto;
    }
    .paying-title{
      width:100%;
      line-height:.5rem;
      text-align:center;
      font-size:.36rem;
      color:#D7B667;
      padding-bottom:.38rem;
      border-bottom: thin solid #E4E4E4;
    }
    .paying-info{
      padding:.27rem .3rem;
      p{
        line-height:.72rem;
        span{
          font-size:.28rem;
          color:#666;
        }
      }
      .paying-btns{
        margin-bottom:.73rem;
        p{
          width:3.37rem;
          height:.86rem;
          text-align:center;
          line-height:.86rem;
          border-radius:.43rem;
          color:#DBB960;
          border:thin solid #DBB960;
          background:#fff;
        }
        .active{
          background:#DBB960;
          color:#fff;
        }
      }
    }
    .paying-time{
      p{
        width:100%;
        text-align:center;
        font-size:.24rem;
        color:#666;
        span{
          font-size:.34rem;
          color:#DBBD71;
        }
      }
      .paying-count-down{
        margin:.27rem auto .66rem auto;
        color:#333;
        font-size:.3rem;
      }
      .btn-share{
        width:6.4rem;
        line-height:.8rem;
        text-align:center;
        margin:0 auto;
        background-image: linear-gradient(-113deg, #EDDCA0 0%, #DABB6E 100%);
        border-radius: .4rem;
        font-size:.28rem;
        color:#fff;
      }
    }
    .paying-btns-index{
      .btn-index{
        width:6.4rem;
        line-height:.8rem;
        text-align:center;
        margin:0 auto;
        background-image: linear-gradient(-113deg, #EDDCA0 0%, #DABB6E 100%);
        border-radius: .4rem;
        font-size:.28rem;
        color:#fff;
      }
    }
    .paying-bottom{
      width:100%;
      height:4.76rem;
      background-image: url(../../assets/images/booking_group_007.png);
      background-repeat:no-repeat;
      background-size:100% 100%;
    }
    .paying-tips{
      width:100%;
      line-height:.4rem;
      text-align:center;
      font-size:.28rem;
      color:#5A5A5A;
      margin:.1rem auto;
    }
  }
  .cover{
    position:absolute;
    top:0;
    left:0;
    z-index:99;
    width:100%;
    height:100%;
    background:#1F1F1F;
  }
  .cover-msg{
    position:absolute;
    top:1rem;
    left:50%;
    transform:translateX(-50%);
    width:100%;
    z-index:100;
    img{
      display: block;
      width:100%;
    }
    p{
      font-size:.35rem;
      color:#FFBF23;
      text-align:center;
      margin:.4rem auto;

    }
  }
  .cover-app{
    position:absolute;
    top:0;
    left:0;
    z-index:99;
    width:100%;
    height:100%;
    background:#666;
    opacity: 0.5;
  }
  .cover-app-msg{
    position:absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    width:5.92rem;
    height:5rem;
    border-radius:0.2rem;
    background:#fff;
    z-index:100;
    font-size:.4rem;
    background-image:url(../../assets/images/booking_group_009.png);
    background-repeat: no-repeat;
    background-size:100%  1.79rem;
    background-position:0 0;
    p{
      text-align:center;
    }
    p:nth-child(1){
      font-weight:600;
      color:#D7B667;
      margin-top:2rem;
    }
    p:nth-child(2){
      font-size:.3rem;
      color:#333;
      margin:.5rem auto;
    }
    p:nth-child(3){
      font-size:.3rem;
      color:#333;
      width:5rem;
      line-height:.8rem;
      border-radius:.4rem;
      background:#D7B667;
      color:#fff;
      margin:0 auto;
      letter-spacing: .05rem;
    }

  }
</style>
