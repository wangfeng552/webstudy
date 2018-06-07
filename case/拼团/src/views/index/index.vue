<template>
 <div class="booking-index">
   <header-fix fixed :title="title"></header-fix>
   <div class="booking-together">
     <div class="booking-swiper" v-show="indexList.ptRealInitiateRecords && indexList.ptRealInitiateRecords.length>0">
       <mt-swipe :auto="4000" :show-indicators="false">
         <mt-swipe-item v-for="(record,index) in indexList.ptRealInitiateRecords" :key="index">
           <p @click.prevent="goDetail(0,record.teamCode)">{{(record.userPosition?record.userPosition:record.mobileNo)+'&nbsp&nbsp'+(record.userName?record.userName:'')+'发起'+record.itemName+'拼团'}}</p>
         </mt-swipe-item>
       </mt-swipe>
     </div>
    <div class="booking-together-top" data-flex="main:justify cross:center">
      <div class="together-left" data-flex="cross:center">
       <img src="../../assets/images/booking_group_001.png" alt=""/>
       <span>大家都在拼</span>
     </div>
     <div class="together-right" data-flex="cross:center">
      <a href="javascript:;" @click.prevent="goToList">
        更多
      </a>
      <div class="jiao-one"></div>
     </div>
    </div>
    <div class="booking-together-bottom">
     <div class="booking-item" v-for="team in indexList.ptHotPinTeamList" @click.prevent="goDetail(0,team.teamCode)">
      <img :src="'/'+team.itemImg" alt=""/>
      <p class="goods-title">{{team.itemName}}</p>
      <p class="goods-price" data-flex="main:left cross:center">
       <b>￥</b>
       <font>{{(team.collagePrice/100).toFixed(2)}}</font>
       <span>还剩{{team.personNum-team.teamPersonNum}}人</span>
      </p>
     </div>
    </div>
   </div>
   <div class="booking-apply" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="5">
    <div class="booking-apply-item" v-for=" i in indexList.ptGoodsList" @click.prevent="goDetail(1,i.collageId)">
      <img src="../../assets/images/booking_group_002.png" class="booking-free" alt=""/>
      <div class="booking-new" v-show="i.collageType == 0">
        <p>新人专享</p>
        <p>帮拼立减{{(i.discountPrice/100).toFixed(2)}}元</p>
      </div>
      <img :src="'/'+i.itemImg" class="booking-goods" alt=""/>
      <p>{{i.itemName}}</p>
      <div class="booking-price" data-flex="main:justify cross:baseline">
        <div class="booking-left" data-flex="cross:center">
          <div data-flex="cross:baseline">
            <b>￥</b>
            <font>{{(i.collagePrice/100).toFixed(2)}}</font>
          </div>
          <img src="../../assets/images/booking_group_005.png" alt=""/>
          <span>{{i.personNum}}人成团</span>
        </div>
        <div class="btn-booking">
          <img src="../../assets/images/booking_group_004.png" alt=""/>
        </div>
      </div>
    </div>
   </div>
   <div class="loading">
     <span>{{loadMsg}}</span>
     <em v-if="loadState"></em>
   </div>
 </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import headerFix from '../../components/header';
import BookingListService from '../../service/BookingListService';
import {userUtil,jfNative,cookieUtil,stringUtil,browserUtil} from'../../assets/js/common';
import {Toast} from 'mint-ui';
	export default {
		data(){
			return {
			  title:'畅由拼团',
        bookingList:[0,1,2,3],
        page:1,
        size:6,
        loading:false,
        loadMsg:'加载中...',
        loadState:false,
        goodsList:{}
      }
		},
		components:{
      headerFix
		},
    beforeRouteEnter(to,from,next){
		  next(vm =>{
      })
    },
    beforeRouteLeave (to, from, next) {
      next()
    },
		created(){

      console.log('created')
    },
		mounted(){

    },
    activated(){
		  console.log('actived')
		  this.loading = false;
      this.getData()
    },
    deactivated(){
		  this.loading = true;
      this.page=1;
      this.getIndexList({});
    },
    destroyed(){
    },
		computed:{
			...mapState([
      'indexList',
      'isWeChat'

			])
		},
		//过滤http
		filters:{

		},
		methods:{
      ...mapActions(['getIndexList']),
      //获取后端数据
      getData(){
        var params  = {};
        params.pageSize = this.size;
        params.pageIndex = this.page;
        BookingListService.getBookingList(params)
          .then(res => {
            if(res.respCode == '0000'){
              if(res.data.ptGoodsList.length == 0){
                this.loading = true
                this.loadMsg = '已经到底喽';
                this.loadState = true;
              }else if(this.indexList.ptGoodsList && this.indexList.ptGoodsList.length>0){
                let list = [...this.indexList.ptGoodsList,...res.data.ptGoodsList]
                res.data.ptGoodsList = list;
                this.getIndexList(res.data);
                this.loading = false
              }else{
                this.getIndexList(res.data);
                this.loading = false
              }
            }
          })
      },
      //去详情页（发起拼团）
      goDetail(type,val){
        if(type){
          this.$router.push({path:'/detail',query:{collageId:val}})
        }else{
          this.$router.push({path:'/detail',query:{teamCode:val}})
        }
      },
      //点击更多
      goToList(){
        this.$router.push({path:'/bookingList'})
      },
      loadMore() {
        if(!this.loading){
          this.page++;
          this.getData()
        }
        // if(this.goodsList.ptGoodsList.length>=20){
        //   this.loadMsg = '已经到底喽';
        //   this.loadState = true;
        //   return false;
        // }
        // setTimeout(() => {
        //   // for (let i = 1; i <= this.goodsList.ptGoodsList.length; i++) {
        //   //   this.goodsList.ptGoodsList.push(this.goodsList.ptGoodsList(i));
        //   // }
        //   this.loading = false;
        // }, 2500);
      }
    }
	}
</script>

<style lang="scss" scoped>
@import '../../assets/style/common';
 .booking-index{
     font-size:0.3rem;
   .booking-together{
     background:#fff;
     margin-bottom:.20rem;
     .booking-swiper{
       position:absolute;
       width:6.08rem;
       height:.59rem;
       left:50%;
       transform:translateX(-50%);
       background:#2D2D2D;
       font-size:.26rem;
       border-radius:.2rem;
       opacity: 0.8;
       p{
         width:100%;
         text-align: center;
         line-height:.6rem;
         color:#fff;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
       }
     }
    .booking-together-top{
     padding:.66rem .2rem .14rem .2rem;
     border-bottom:thin solid #E4E4E4;
      .together-left {
       img {
        display:block;
        width:0.55rem;
        height:0.55rem;
        margin-right:0.1rem;
       }
       span {
        color: #FC5C3B;
        font-weight: 600;
       }
      }
      .together-right{
       a{
        margin-right:.3rem;
       }
       position:relative;
        .jiao-one{
         width:0;
         height:0;
         border-top:.11rem solid transparent;
         border-left:.11rem solid #666;
         border-bottom:.11rem solid transparent;
        }
       .jiao-one:after{
        content:'';
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        right:.01rem;
        border-top:.11rem solid transparent;
        border-left:.11rem solid #fff;
        border-bottom:.11rem solid transparent;
       }
      }
    }
    .booking-together-bottom{
     display: flex;
     flex-flow: nowrap;
     overflow-x:scroll;
     font-size:.24rem;
     .booking-item{
      padding-bottom:.14rem;
      margin:.17rem .20rem .14rem .20rem;
      width:1.88rem;
      img{
       display: block;
       width:1.88rem;
       height:1.88rem;
       border:thin solid #e4e4e4;
       margin-bottom:.14rem;
      }
      .goods-title{
       width:100%;
       line-height:.33rem;
       color:#333;
       overflow:hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
      }
      .goods-price{
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
       b{
        font-size:.22rem;
        color:#FF5346;
       }
       font{
        font-size:.28rem;
        color:#FF5346;
       }
       span{
        font-size:.20rem;
        color:#999;
        margin-left:.1rem;
       }
      }
     }
    }
   }
   .booking-apply{
     width:100%;
     .booking-apply-item{
       position:relative;
       padding:.24rem 0;
       margin-bottom:.16rem;
       background:#fff;
       img.booking-goods{
         display:block ;
         width:100%;
         height:3.4rem;
       }
       .booking-free{
         position:absolute;
         top:.1rem;
         right:.18rem;
         width:.8rem;
       }
       .booking-new{
         position: absolute;
         top:0;
         left: -.3rem;
         width: 2.75rem;
         padding: 0.05rem 0;
         background-image: linear-gradient(-139deg, #FFD280 0%, #FC603E 100%);
         border-radius: .4rem;
         p{
           width: 100%;
           line-height: .3rem;
           margin: 0;
           color: #fff;
           text-align: center;
           font-size: .24rem;
         }
       }
       p{
         width:6.74rem;
         margin:.16rem auto;
         line-height:.42rem;
         font-size:.3rem;
         color:#333;
         word-break: break-all;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
       }
     }
     .booking-apply-item:last-child{
       margin:0;
     }
     .booking-price{
       padding:0 .23rem;
       .booking-left{
         img{
           display:block;
           width:.95rem;
           height:.28rem;
           margin:0 .34rem 0 .2rem;
         }
         b{
           font-size:.28rem;
           color:#FF5346;
         }
         font{
           font-size:.34rem;
           color:#FF5346;
         }
         span{
           font-size: .24rem;
           color:#999;
           line-height:.33rem;
         }
       }
       .btn-booking{
         img{
           display: block;
           width:1.88rem;
           height:.59rem;
         }
       }
     }

   }
   .loading{
     position:relative;
     background:#fff;
     text-align: center;
     font-size:0.3rem;
     height:1rem;
     span{
       position:absolute;
       z-index:6;
       left:50%;
       top:50%;
       transform:translate(-50%,-50%);
       background:#fff;
       padding:0 0.5rem;
     }
     em{
       height:0.01rem;
       position:absolute;
       left:1rem;
       right:1rem;
       top:50%;
       background:#666;
     }
   }
 }
</style>
