<template>
  <div class="booking-list">
    <header-fix fixed :title="title"></header-fix>
    <div class="booking-list-title" data-flex="main:center cross:center">
      <img src="../../assets/images/booking_group_001.png" alt=""/>
      <span>大家都在拼</span>
    </div>
    <div class="booking-list-content" v-if="waitingList.length>0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="booking-list-item" v-for="wait in waitingList" @click.prevent="goDetail(wait.teamCode)">
          <div class="booking-new" v-show="wait.collageType == 0">
            <p>新人专享</p>
            <p>帮拼立减{{(wait.discountPrice/100).toFixed(2)}}元</p>
          </div>
          <img :src="'/'+wait.itemImg" alt=""/>
          <p class="booking-title">{{wait.itemName}}</p>
          <div class="booking-price" data-flex="main:justify cross:center">
            <div class="booking-left">
              <p data-flex="cross:center">
                <b>￥</b>
                <font>{{(wait.collagePrice/100).toFixed(2)}}</font>
              </p>
              <p>还剩{{wait.personNum-wait.teamPersonNum}}人</p>
            </div>
            <div class="btn-help">
              <p>去帮拼</p>
            </div>
          </div>
      </div>
      <div class="loading">
        <span>{{loadMsg}}</span>
        <em v-if="loadState"></em>
      </div>
    </div>
    <div v-else class="no-msg">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import headerFix from '../../components/header';
  import BookingListService from '../../service/BookingListService';
  export default {
    data() {
      return {
        title:'畅由拼团',
        bookingList:[0,1,2,3],
        page:1,
        size:6,
        loading:false,
        loadMsg:'加载中...',
        loadState:false
      };
    },
    created(){
    },
    activated(){
      this.loading = false;
      this.getData()
    },
    deactivated(){
      this.loading = true;
      this.page=1;
      this.getWaitingList([]);
    },
    components:{
      headerFix
    },
    computed: {
      ...mapState([
        'waitingList'
      ])
    },
    methods: {
      ...mapActions(['getWaitingList']),
      //获取后端数据
      getData(){
        var params  = {};
        params.pageSize = this.size;
        params.pageIndex = this.page;
        BookingListService.getWaitingList(params)
          .then(res => {
            if(res.respCode == '0000'){
              if(res.data.ptWaitingTeamList.length == 0){
                this.loading = true
                this.loadMsg = '已经到底喽';
                this.loadState = true;
              }else if(this.waitingList.length>0){
                this.loading = true;
                let list = [...this.waitingList,...res.data.ptWaitingTeamList]
                this.getWaitingList(list);
                this.loading = false;
              }else{
                this.loading=true;
                this.getWaitingList(res.data.ptWaitingTeamList);
                this.loading = false;
              }
            }
          })
      },
      //去详情页（帮拼）
      goDetail(val){
        this.$router.push({path:'/detail',query:{teamCode:val}})
      },
      loadMore(){
        if(!this.loading){
            this.page++
            this.getData()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/style/common';
  .booking-list{
    min-height:14rem;
    background:#fff;
  }
  .booking-list-title{
    line-height:1rem;
    background:#fff;
    margin-top:.2rem;
    img{
      display:block;
      width:.55rem;
    }
    span{
      font-size:.3rem;
      font-weight:600;
      color:#FC5C3B;
      margin-left:.1rem;
    }
  }
  .booking-list-content{
    background:#fff;
    font-size:.24rem;
    display:flex;
    flex-flow:wrap;
    .booking-list-item{
      position:relative;
      width:3.7rem;
      padding-bottom:.3rem;
      overflow: hidden;
      .booking-new{
        position: absolute;
        top: 0;
        left: -.4rem;
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
      img{
        display:block;
        width:100%;
      }
      .booking-title{
        width:3.12rem;
        margin:.09rem auto;
        height:.65rem;
        font-size:.24rem;
        color:#333;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .booking-price{
        padding:0 .13rem 0 .25rem;
        .booking-left{
          p:nth-child(1){
            b{
              font-size:.22rem;
              color:#FF5346;
            }
            font{
              color:#FF5346;
              font-size:.28rem;
            }
          }
          p:nth-child(2){
            font-size:.2rem;
            color:#999;
          }
        }
        .btn-help{
          width:1.6rem;
          line-height:.43rem;
          text-align:center;
          background-image: linear-gradient(-113deg, #EDDCA0 0%, #DABB6E 100%);
          border-radius:.22rem;
          p{
            font-size:.24rem;
            color:#fff;
          }
        }
      }
    }
    .booking-list-item:nth-child(odd){
      margin-right:0.1rem;
    }
  }
  .no-msg{
    font-size:.4rem;
    text-align: center;
  }
  .loading{
    width:100%;
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
      height:0.02rem;
      position:absolute;
      left:1rem;
      right:1rem;
      top:50%;
      background:#666;
    }
  }
</style>
