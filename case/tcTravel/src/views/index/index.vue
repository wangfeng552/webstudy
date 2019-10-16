<template>
  <div class="tc-list">
    <div class="header" data-flex="main:justify box:justify cross:center">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>景点门票</p>
      <a href="javascript:;" class="now-city" data-flex="cross:baseline" @click.prevent="goCityList">
        <span>{{nowCityName}}</span>
        <img src="../../assets/images/down.png" alt=""/>
      </a>
    </div>
    <div class="empty"></div>
    <div id="allmap"></div>
    <div class="search-bar" data-flex="main:center cross:center">
      <img class="search-bar-icon" src="../../assets/images/search.png" alt="">
      <input type="text" v-model="searchCon" placeholder="请输入景点名称" class="search-bar-input" />
      <img class="search-bar-del"  src="../../assets/images/btn-del.png" @click.prevent="delSearch" alt="">
      <a href="javascript:;" class="search-bar-cancel" @click.prevent="startSearch">
        搜索
      </a>
    </div>
    <div class="ticket-list" v-if="ticketList.length>0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
      <div class="ticket-item" data-flex="box:first" v-for="tic in ticketList" :sceneryID="tic.sceneryID" @click.prevent="goDetail(tic.sceneryID)">
        <a href="javascript:;" :style="{backgroundImage:'url('+tic.sceneryImgPath+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}" class="ticket-pic" alt=""/>
        <div class="ticket-content">
            <p class="ticket-title">{{tic.sceneryName}}</p>
            <p class="ticket-intro">{{tic.scenerySummary}}</p>
            <img src="../../assets/images/deduction.png" alt=""/>
            <div data-flex="cross:center main:justify">
              <p class="ticket-price">畅由价<i>¥</i><span>{{tic.sceneryPrice/100}}</span>起</p>
              <p class="distance">{{tic.distance | disFilter}}km</p>
            </div>
        </div>
      </div>
      <div class="ticketState" v-if="ticketList && ticketList.length>0">
        <span>{{spinnerText}}</span>
        <em v-if="spinnerState"></em>
      </div>
    </div>
    <div class="tips" v-else>
      <p>{{respMsg}}</p>
    </div>
    <div class="cover" v-show="coverState || coverStateF" @touchmove.prevent></div>
    <div class="filter-sort">
      <div class="sort-condition" v-show="coverState">
        <ul>
          <li  data-flex="cross:center main:justify" @click.prevent="sortSelect()">
            <p><span>距离</span> <span>近-远</span></p>
            <img src="../../assets/images/selected.png" alt="" v-show="sortSelected"/>
          </li>
          <li  data-flex="cross:center main:justify" @click.prevent="gradeSelect()">
            <p><span>级别</span> <span>高-低</span></p>
            <img src="../../assets/images/selected.png" alt="" v-show="gradeSelected"/>
          </li>
        </ul>
      </div>
      <div class="filter-all-condition" v-show="coverStateF">
        <div class="title" data-flex="main:justify cross:center">
          <p class="cancel" @click.prevent="tapCancel">取消</p>
          <p class="confirm" @click.prevent="tapConfirm">确定</p>
        </div>
        <div class="filter-condition" data-flex="">
          <div class="filter-theme" v-if="themeList.length>0">
            <p v-for="the in themeList" :class="{theme:selectTab == the.id}" @click.prevent="themeSelect(the.id)">{{the.con}}</p>
          </div>
          <div class="filter-content" v-if="filterList.length>0">
            <ul v-show="themeConState">
              <li v-for=" filter in filterList" data-flex="cross:center main:justify" @click.prevent="themeConSelect(filter.adDesc)">
                <span>{{filter.adName}}</span>
                <img src="../../assets/images/selected.png" alt=""  v-show="themeConSelected == filter.adDesc"/>
              </li>
            </ul>
            <ul v-show="!themeConState">
              <li v-for=" grade in gradeList" data-flex="cross:center main:justify" @click.prevent="gradeSelect(grade.id)">
                <span>{{grade.con}}</span>
                <img src="../../assets/images/selected.png" alt=""  v-show="gradeSelected == grade.id"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom" data-flex="main:center cross:center">
        <a href="javascript:;" @click.prevent="tapSort">
          <img src="../../assets/images/sort.png" alt=""/>
        </a>
        <a href="javascript:;" @click.prevent="tapFilter">
          <img src="../../assets/images/filter.png" alt=""/>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex';
import {userUtil,jfNative,cookieUtil,stringUtil,browserUtil} from'../../assets/js/common';
import getTicketService from '../../service/GetTicketService';
import getCityService from '../../service/GetCityService';
import tcThemeRecService from '../../service/TcThemeRecService';
import {Toast} from 'mint-ui';
	export default {
		data(){
			return {
			  jl:20.1,//距离
        nowCity:this.$route.query.cityId,
        nowCityName:'',
        loading:true,
        list:[1,2,3],
        spinnerText:'加载中...',
        spinnerState:false,
        page:1,//当前页数
        size:6, //每页加载的数量
        cId:'',//城市id
        pId:'',//省id
        totalTickets:0,
        respMsg:'请稍后.....',
        searchCon:'',//搜索内容
        coverState:false,
        coverStateF:false,
        allList:[],
        sortList:[
          {
            con:'距离',
            msg:'近-远',
            id:1
          },
          {
            con:'级别',
            msg:'高-低',
            id:1
          }
        ],
        gradeList:[
          {
            con:'低-高',
            id:0
          },
          {
            con:'高-低',
            id:1
          }
        ],
        sortSelected:0,
        selectTab:0,//主题选中
        themeConSelected:'0000',//主题内容选中
        gradeSelected:0,//等级内容选中
        themeList:[
          {
            con:'主题',
            id:0
          }
        ],
        themeConState:true,
        filterList:[
          {
            adName:'不限',
            id:0
          },
          {
            adName:'滑雪',
            id:2
          },
          {
            adName:'主题乐园',
            id:5
          },
          {
            adName:'登山探险',
            id:11
          },
          {
            adName:'城市观光',
            id:17
          },
          {
            adName:'文化宗教',
            id:19
          },
          {
            adName:'酒店',
            id:1702
          },
          {
            adName:'古镇',
            id:100102
          },
          {
            adName:'博物馆',
            id:100103
          }
        ],
        localCityList:[],//城市列表
        longitude:0,//默认上海的经纬度
        latitude:0

			}
		},
		components:{

		},
    beforeRouteEnter(to,from,next){
		  next(vm =>{
      })
    },
    beforeRouteLeave (to, from, next) {
      this.changeNowRoute(from.fullPath)
      next()
    },
		created(){

      // if (document.addEventListener) {
      //   document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
      // }//W3C
      // window.onmousewheel = document.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
		  console.log('created')
    },
		mounted(){
      console.log('mounted');
      Promise.all([tcThemeRecService.getTheme(),getCityService.getCity()])
        .then(res =>{
          if(res[0].respCode == '0000'&& res[1].respCode == '0000'){
            this.filterList = res[0].data;
            this.themeConSelected = res[0].data[0].adDesc;
            res[1].data.elements.map((value,index)=>{
              value.cities.map((cities,index)=>{
                this.localCityList.push(cities)
              })
            })
          }
        })
    },
    activated(){
      console.log('activated')
		  console.log(this.$route.fullPath)
		  console.log(this.$route.query.cityId)
      if(this.$route.fullPath != this.nowRoute){
        this.initData()
      }else{

      }
    },
    deactivated(){
      this.loading = true
    },
    destroyed(){
    },
		computed:{
			...mapState([
      'ticketList',
      'isWeChat',
        'nowRoute'

			])
		},
		//过滤http
		filters:{
		  disFilter(value){
		    if(value/1000>50){
		      return '50+'
        }else{
		      return (value/1000).toFixed(2)
        }
      }

		},
		methods:{
      ...mapActions(['getTicketList','changeNowRoute']),
      initData(){
        this.page = 1;
        this.getTicketList([])
        this.goToTop();
        if(this.$route.query.cityId){
          this.cId = this.$route.query.cityId;//城市id
          this.pId = this.$route.query.provinceId;//省id
          this.nowCityName = this.$route.query.cityName;
          this.localCity(this.nowCityName,this.getData)
        }else{
          this.localCity('',this.getData)
        }
      },
      findArray(array, feature, all = true) {
        for(let index in array){
          let cur = array[index];
          if(feature instanceof Object){
            let allRight = true;
            for(let key in feature){
              let value = feature[key];
              if(cur[key] == value && !all) return index;
              if(all && cur[key] != value){
                allRight = false;
                break;
              }
            }
            if(allRight) return index;
          }else{
            if(cur == feature){
              return index;
            }
          }
        }
        return -1;
      },
      localCity(city,callback){
        var _this = this;
        if(typeof BMap !== "undefined"){
          var map = new BMap.Map("allmap");
          // var point = new BMap.Point(this.longitude,this.latitude);
          // map.centerAndZoom(point,12);
          //浏览器定位
          var geolocation = new BMap.Geolocation();
          var myGeo = new BMap.Geocoder();
          // 地址逆解析
          if(city){
            myGeo.getPoint(city, function(point){
              if (point) {
                _this.longitude = point.lng;
                _this.latitude = point.lat;
                callback?callback():''
              }else{
                alert("您选择地址没有解析到结果!");
              }
            }, city);
          }else{
            geolocation.getCurrentPosition(function(r){
              if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                //地址解析 根据经纬度获取城市名
                _this.longitude = r.point.lng;
                _this.latitude =  r.point.lat;
                var geoc = new BMap.Geocoder();
                var point = new BMap.Point(_this.longitude,_this.latitude);
                geoc.getLocation(point, function(rs){
                  var addComp = rs.addressComponents;
                  // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                  // console.log(addComp.city.slice(0,addComp.city.length-1))
                  var index = _this.findArray(_this.localCityList,{cityName:addComp.city.slice(0,addComp.city.length-1)})
                  if(index>=0){
                    _this.nowCityName = _this.localCityList[index].cityName;
                    _this.cId = _this.localCityList[index].cityId;
                    _this.pId = _this.localCityList[index].provinceId;
                  }else{
                    Toast('定位失败1')
                    _this.nowCityName = '上海';
                    _this.cId = 321;
                    _this.pId = 25;
                  }
                  callback?callback():''
                });
              }else {
                Toast('定位失败2')
                _this.nowCityName = '上海';
                _this.cId = 321;
                _this.pId = 25;
                callback?callback():''
              }
            },{enableHighAccuracy: true});
          }
        }else{
          Toast('定位失败3')
          _this.nowCityName = '上海';
          _this.cId = 321;
          _this.pId = 25;
          callback?callback():''
        }
      },
      goDetail(sceneryID){
        this.$router.push({name: 'sceneryDetails',params:{sceneryId:sceneryID}})
      },
      goCityList(){
        this.$router.push({path: '/cityList'});
      },
      goToTop() {
        this.$el.ownerDocument.body.scrollTop = 0;
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
      //加载更多
      loadMore(){
        if(this.loading){
          return false;
        }
        this.page++
        this.getData()
      },
      //获取后端数据
      getData(){
        var params  = {};
        params.pageSize = this.size;
        params.pageIndex = this.page;
        params.provinceId = this.pId+'';
        params.cityId = this.cId+'';
        params.keyWord = this.searchCon;
        params.currentLongitude = this.longitude+'';
        params.currentLatitude = this.latitude+'';
        params.distanceSort = this.sortSelected;
        params.themeType = this.themeConSelected+'';
        params.gradeSort = this.gradeSelected;

        getTicketService.getTickets(params)
          .then(res => {
            if(res.respCode == '0000') {
              if (res.data.elements.length > 0) {
                var list = [...this.ticketList, ...res.data.elements]
                this.getTicketList(list)
                this.spinnerText = '加载中...';
                this.spinnerState = false;
                this.loading = false;
              } else {
                var list = [...this.ticketList, ...res.data.elements]
                this.getTicketList(list)
                this.loading = true;
                this.spinnerState = true;
                this.spinnerText = '没有更多数据'
                this.respMsg = '暂无数据'
              }
            }else{
              this.loading = true;
              this.spinnerState = true;
              this.spinnerText = '没有更多数据'
              this.respMsg = '暂无数据'
            }
          })
      },
      //开始搜索
      startSearch(){
        this.getTicketList([]);
        this.page = 1;
        this.goToTop();
        this.getData()
      },
      //点击删除
      delSearch(){
        this.searchCon = '';
      },
      tapSort(){
        this.coverStateF = false
        this.coverState = !this.coverState
      },
      tapFilter(){
        this.coverState = false
        this.coverStateF= !this.coverStateF
      },
      scrollFunc(){
        return
      },
      sortSelect(val){

      },
      //主题选择
      themeSelect(val){
        this.selectTab = val;
        switch (val){
          case 0:this.themeConState = true;break;
          case 1:this.themeConState = false;break;
        }
      },
      //主题内容选择
      themeConSelect(val){
        this.themeConSelected = val;
      },
      //等级选择
      gradeSelect(val){
        this.sortSelected = 0
        this.gradeSelected = 1
        this.coverState = !this.coverState
        this.getTicketList([]);
        this.goToTop();
        this.page = 1;
        this.getData()
      },
      //排序选择
      sortSelect(val){
        this.sortSelected = 1
        this.gradeSelected = 0
        this.coverState = !this.coverState
        this.getTicketList([]);
        this.goToTop();
        this.page = 1;
        this.getData()

      },
      tapCancel(){
        this.coverStateF = !this.coverStateF
      },
      tapConfirm(){
        this.coverStateF = !this.coverStateF
        this.getTicketList([]);
        this.goToTop();
        this.page = 1;
        this.getData()
      }
    }
	}
</script>

<style lang="scss" scoped>
@import '../../assets/style/common';
  .tc-list{
    background:#ebebeb;
    position:relative;
    .header{
      position:fixed;
      z-index:999;
      width:100%;
      padding:0 0.3rem;
      height:0.9rem;
      font-size:0.34rem;
      color:#333;
      background:#fff;
      p{
        position: absolute;
        width: 3rem;
        text-align:center;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .now-city{
        font-size:0.3rem;
        color:#666;
        img{
          display: block;
          width:0.303rem;
          height:0.15rem;
        }
        span{
          display: inline-block;
          width: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align:right;
        }
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
      height:1.1rem;
    }
    .search-bar{
      width:7.5rem;
      margin:0 auto;
      font-size:0.24rem;
      position:relative;
      padding:0.26rem 0 0.29rem 0;
      background:#fff;
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
        background: #f1f1f1;
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
    .ticket-list{
      padding:0.23rem 0.24rem 1rem 0.24rem;
      font-size:0.3rem;
      color:#333;
      background:#fff;
      .ticket-item{
        padding-bottom: 0.16rem;
        border-bottom:thin solid #ebebeb;
        margin-bottom:0.11rem;
        .ticket-pic{
          display: block;
          width:1.84rem;
          height:1.51rem;
          margin-right:0.15rem;
          border-radius:0.15rem;
        }
        .ticket-content{
          .ticket-title{
            font-size:0.3rem;
            line-height:0.42rem;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .ticket-intro{
            font-size:0.23rem;
            line-height:0.32rem;
            color:#999;
            margin:0.04rem 0;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          img{
            display: block;
            width:1.05rem;
            height:0.28rem;
            margin:0.09rem 0;
          }
          .ticket-price{
            font-size:0.23rem;
            line-height:0.32rem;
            color:#999;
            i{
              display: inline-block;
              margin-left:0.11rem;
              width: 0.15rem;
              height:0.33rem;
              color:#e40000;
            }
            span{
              margin-right:0.11rem;
              color:#e40000;
              font-size:0.36rem;
              font-weight:700;
            }
          }
          .distance{
            font-size:.24rem;
            color:#DBBD72;
          }
        }
      }
      .ticketState{
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
    .tips{
      position: fixed;
      font-size: 0.36rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .cover{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      opacity: 0.49;
      background:#000;
      z-index:99;
    }
    .filter-sort{
      width:100%;
      position: fixed;
      bottom:0;
      left:0;
      z-index:999;
      .sort-condition{
        font-size:0.3rem;
        color:#999;
        ul{
          li{
            padding:0 0.1rem;
            line-height:1rem;
            background:#fff;
            border-bottom: thin solid #ededed;
            p{
              span:nth-child(1){
                margin:0 0.26rem 0 0.44rem;
              }
              span:nth-child(2){
                color:#676666;
              }
            }
          }
        }
      }
      .title{
        font-size:0.3rem;
        background:#fff;
        line-height:0.8rem;
        p{
          padding:0 0.2rem;
        }
      }
      .filter-condition{
        width:100%;
        font-size:0.3rem;
        color:#999;
        height:4rem;
        background:#fff;
        .filter-theme{
          width:20%;
          background:#f1f1f1;
          color:#000;
          p{
            width:100%;
            padding-left:0.4rem;
            line-height:1rem;
          }
          .theme{
            background:#fff;
            color:#40b05a;
          }

        }
        .filter-content{
          width:80%;
          overflow: scroll;
          ul{
            li{
              padding:0 0.2rem;
              line-height:1rem;
              border-bottom:thin solid #ededed;
              img{
              }
              .conSelect{
                color:#40b05a;
              }
            }
          }
        }
      }
      .bottom{
        height:1rem;
        background:#42474D;
        a{
          display: block;
          img{
            display: block;
            width:1rem;
            height:1rem;
          }
        }
        a:nth-child(1){
          margin-right:1.9rem;
        }
      }
    }
  }
</style>
