<template>
  <div class="city-list">
    <div class="header" v-if="!isWeChat" data-flex="main:justify box:first cross:center">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>地区切换</p>
    </div>
    <div v-if="!isWeChat" class="empty"></div>
    <div class="search-bar" data-flex="main:center cross:center">
      <img class="search-bar-icon" src="../../assets/images/search.png" alt="">
      <input type="text" v-model="searchCon" placeholder="请输入城市名" @blur="showControl" @keyup.enter="startSearch(searchCon)" class="search-bar-input" />
      <img class="search-bar-del"  src="../../assets/images/btn-del.png" alt="" @click.prevent="delSearch">
      <a href="javascript:;" class="search-bar-cancel" @click="startSearch(searchCon)">
        搜索
      </a>
    </div>
    <div class="search-content">
      <ul  v-if="nowCity.length>0">
        <li v-for="(sc,index) in nowCity" @click.prevent="goIndex(sc.cityId,sc.cityName,sc.provinceId)">{{sc.cityName}}</li>

      </ul>
      <ul v-if="showState">
        <li>暂无数据</li>
      </ul>
    </div>
    <div class="hot-cities">
      <p>热门城市</p>
      <ul>
        <li v-for="hot in hotCityList" @click.prevent="goIndex(hot.adDesc,hot.adName,hot.sort)">{{hot.adName}}</li>
      </ul>
    </div>
    <div class="city-sidebar">
      <ul>
        <li v-for="(i,index) in sideCity" @click.prevent="scrollTo(index)">{{i}}</li>
      </ul>
    </div>
    <div class="city-list-wrap" v-if="cityList.length>0">
      <div class="city-list-item" v-for="i in cityList" :ref="i.firstWord">
        <p class="city-first-word">{{i.firstWord}}</p>
        <div class="city-name">
          <p  v-for="c in i.cities" :cityId="c.cityId" @click="goIndex(c.cityId,c.cityName,c.provinceId)">{{c.cityName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import {userUtil,jfNative,cookieUtil,stringUtil,browserUtil} from'../../assets/js/common';
  import {Toast} from 'mint-ui';
  import getCityService from '../../service/GetCityService';
  import getHotCityService from '../../service/GetHotCityService';
  export default {
    data(){
      return{
        sideCity:[],
        searchCon:'',
        searchCityList:[],
        nowCity:[],
        showState:false,
        hotCityList:[]

      }
    },
    created(){

    },
    mounted(){
      getCityService.getCity()
        .then( res => {
          if(res.respCode == '0000'){
            this.getCityList(res.data.elements)
            this.searchCityList.length = 0;
            res.data.elements.map((value,index)=>{
              value.cities.map((cities,index)=>{
                this.searchCityList.push(cities)
              })
            })
            res.data.elements.map((value,index)=>{
              this.sideCity.push(value.firstWord)
            })

          }
        })
      getHotCityService.getHotCity()
        .then(res =>{
          if(res.respCode == '0000'){
            this.hotCityList = res.data
          }
        })
    },
    destroyed(){
      this.getCityList([])
    },
    computed:{
      ...mapState([
        'cityList',
        'isWeChat'

      ])
    },
    methods:{
      ...mapActions(['getCityList']),
      //点击城市回到首页，把城市id带过去
      goIndex(cId,cNa,pId){
        this.$router.push({path: '/index',query:{cityId:cId,cityName:cNa,provinceId:pId}});
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
      //点击滚动
      scrollTo(index){
          var f= this.cityList[index].firstWord
          Toast(f)
        var distance = this.isWechat?45:0;
        document.documentElement.scrollTop=document.body.scrollTop = this.$refs[f][0].offsetTop - distance;
      },
      //点击搜索
      startSearch(msg){
        this.nowCity.length = 0
        this.searchCityList.map((value,index)=>{
          if(value.cityName.indexOf(msg)>=0){
            this.nowCity.push(value)
          }
        })
        if(this.nowCity.length>0){
          this.showState = false;
        }else{
          this.showState = true;
        }
      },
      //点击删除
      delSearch(){
        this.searchCon = '';
        this.nowCity.length=0;
        this.showState = false
      },
      showControl(){
        this.showState = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .city-list {
    background:#ececec;
    min-height:15rem;
    .header {
      position: fixed;
      width: 100%;
      padding: 0 0.3rem;
      height: 0.9rem;
      font-size: 0.34rem;
      color: #333;
      background: #fff;
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
    .empty{
      height:1.1rem;
    }
    .search-bar{
      width:7.5rem;
      margin:0 auto;
      font-size:0.24rem;
      position:relative;
      .search-bar-icon{
        position:absolute;
        width:0.34rem;
        height:0.329rem;
        top:50%;
        left:0.7rem;
        transform: translateY(-50%);
      }
      .search-bar-input{
        line-height: 0.7rem;
        width: 5.96rem;
        border: 1px solid #eee;
        padding: 0 0 0 .85rem;
        border-radius: .7rem;
        background: #fff;
        box-sizing: border-box;
        opacity:0.7;
        font-size:.24rem;
        -webkit-appearance: none;
      }
      ::-webkit-input-placeholder {
        font-size:.30rem;
        color:#666;
      }
      .search-bar-del{
        position: absolute;
        top: 50%;
        transform:translateY(-50%);
        right: 1.5rem;
        width: 0.32rem;
      }
      .search-bar-cancel{
        padding:0 0.1rem;
        font-size:0.3rem;
      }
    }
    .search-content{
      font-size:.32rem;
      color:#666;
      position:absolute;
      z-index:99;
      left:50%;
      transform:translateX(-50%);
      ul{
        li{
          padding-left: 0.3rem;
          background: #fff;
          width: 7.5rem;
          line-height: 0.6rem;
          margin: 0 auto;
          border-bottom: thin solid #ebebeb;
        }
      }
    }
    .hot-cities{
      padding-left:.34rem;
      font-size:.30rem;
      color:#666;
      margin-top:0.73rem;
      p{
        margin-bottom: .23rem;
      }
      ul{
        li{
          float:left;
          width:1.96rem;
          height:.6rem;
          text-align: center;
          line-height:.6rem;
          margin:0 0.23rem 0.18rem 0;
          background:#fff;
        }
      }
      ul:after{
        content:"";
        visibility:hidden;
        display:block;
        clear:both;
      }
    }
    .city-sidebar{
      position:fixed;
      top:50%;
      transform:translateY(-50%);
      right:0.2rem;
      ul{
        li{
          width:0.16rem;
          height:0.33rem;
          text-align:center;
          line-height:0.33rem;
          font-size:0.24rem;
          color:#DAB286;
        }
      }
    }
    .city-list-wrap{
      .city-list-item{
        padding-left:0.3rem;
        .city-first-word{
          font-size:0.3rem;
          color:#666;
          line-height:0.85rem;
          padding-left:0.1rem;
        }
        .city-name{
          background:#fff;
          width:6.34rem;
          p{
            padding-left:0.37rem;
            font-size:0.3rem;
            line-height:0.6rem;
            color:#666;
            border-bottom: thin solid #ebebeb;
          }
        }
      }
    }
  }
</style>