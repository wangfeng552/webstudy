<template>
  <div>
  <div class="grouping-list" v-if="this.groupingList.length>0">
    <header-fix fixed :title="title"></header-fix>
    <div class="grouping-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
      <ul>
        <li data-flex="main:justify cross:center" v-for="(item,index) in groupingList" :data-id="index">
          <div class="grouping-info">
            <p data-flex="cross:center"><span>{{item.userPosition}}</span>{{item.userName}}</p>
            <p>{{item.mobileNo}}</p>
          </div>
          <div class="grouping-amounts" data-flex="cross:center">
            <div class="grouping-time">
              <p>还差<span>{{item.personNum-item.teamPersonNum}}人</span>拼成</p>
              <p>剩余<count-down :endTime="item.teamEndTime | timeFormat" :position="index" @listenToChildEvent="receive"></count-down></p>
            </div>
            <a href="javascript:;" class="btn-help" :class="{active:item.isStatus?item.isStatus:false}" @click.prevent="goDetail(item)">
              {{item.isStatus?'已结束':'去帮拼'}}
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading">
        <span>{{loadMsg}}</span>
        <em v-if="loadState"></em>
    </div>
  </div>
  <div v-else class="grouping-list-null">
    <p>暂无数据</p>
  </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import headerFix from '../../components/header';
  import countDown from '../../components/countDown';
  import {getServerDate} from '../../assets/js/common';
  import groupingListService from '../../service/GroupingListService';
  export default {
    data() {
      return {
        title:'待成团列表',
        countTime:'00:00:00',
        serverTime:{time:1525758211000},
        groupList:[
          {
            time:1525844760000
          },
          {
            time:1525844820000
          },
          {
            time:1525859580000
          },
          {
            time:1525863180000
          }
        ],
        timeState:false,
        isLoading:false,
        loading:false,
        page:1,//页数
        size:6,//每页个数
        loadMsg:'加载中...',
        loadState:false,
        collageId:this.$route.query.collageId || ''
      };
    },
    created(){
    },
    mounted(){
      // var _this = this;
      // getServerDate(function(res){
      //   console.log(_this)
      //   _this.serverTime = res.getTime()
      //   _this.countDown(res.getTime(),1525757400000)
      // })
      this.isLoading=true;
    },
    activated(){
      this.loading = false;
      this.getData()
    },
    deactivated(){
      this.loading = true;
      this.page=1;
      this.getGroupingList([]);
    },
    components:{
      headerFix,
      countDown
    },
    computed: {
      ...mapState([
        'groupingList'
      ])
    },
    filters:{
      timeFormat(val){
        return Date.parse(new Date(val))|| Date.parse(new Date(val.substring(0,19).replace(/-/g,'/')))
      },
      imgFormat(val){
        return val.split('@@')
      }
    },
    methods: {
      ...mapActions(['getGroupingList']),
      getData(){
        var params  = {};
        params.collageId = this.collageId;
        params.pageSize = this.size;
        params.pageIndex = this.page;
        groupingListService.getGroupingList(params)
          .then(res => {
            if(res.respCode == '0000'){
              if(res.data.gdsCollageTeamList.length==0){
                this.loading = true
                this.loadMsg = '已经到底喽';
                this.loadState = true;
              }else if(this.groupingList && this.groupingList.length>0){
                this.loading=true;
                let list = [...this.groupingList,...res.data.gdsCollageTeamList]
                this.getGroupingList(list);
                this.loading = false
              }else{
                this.loading=true;
                this.getGroupingList(res.data.gdsCollageTeamList);
                this.loading = false
              }
            }
          })
      },
      changeColor(e){
        console.log(e)
      },
      //去详情页
      goDetail(val){
        if(val.isStatus){
          return false;
        }else{
          this.$router.push({path:'/detail',query:{teamCode:val.teamCode}})
        }
      },
      //接受子组件传递得信息
      receive(val){
        this.$set(this.groupingList[val.position],'isStatus',val.isStatus);
        this.getGroupingList(this.groupingList);
      },
      //滚动加载
      loadMore() {
        if(!this.loading){
          this.page++;
          this.getData()
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  .grouping-list{
    font-size:.28rem;
    background:#fff;
    min-height:14rem;
    .grouping-content{
      margin-top:.2rem;
      padding:0 .29rem;
      ul{
        li{
            padding:.13rem 0 .21rem 0;
            border-bottom:thin solid #E4E4E4;
            .grouping-info{
              font-size:.28rem;
              color:#666;
              p:nth-child(1){
                margin-bottom:.17rem;
                span{
                  display: inline-block;
                  width:1rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              p{
                line-height:.4rem;
                color:#666;
                span{
                  margin-right:.1rem;
                  color:#666;
                }
              }
            }
            .grouping-amounts{
              .grouping-time{
                margin-right:.19rem;
                p:nth-child(1){
                  margin-bottom:.17rem;
                  color:#333;
                  span{
                    color:#c33;
                  }
                }
                p:nth-child(2){
                  color:#666;
                }
              }
              .btn-help{
                width:1.88rem;
                height:.59rem;
                text-align:center;
                line-height:.59rem;
                color:#fff;
                background-image: linear-gradient(-113deg, #EDDCA0 0%, #DABB6E 100%);
                border-radius: .3rem;
              }
              .active{
                background:#666;
              }
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
        height:0.02rem;
        position:absolute;
        left:1rem;
        right:1rem;
        top:50%;
        background:#666;
      }
    }
  }
  .grouping-list-null{
    width:100%;
    min-height:14rem;
    font-size:.4rem;
    background:#fff;
    p{
      width:100%;
      text-align:center;
      padding-top:3rem;
    }
  }
</style>
