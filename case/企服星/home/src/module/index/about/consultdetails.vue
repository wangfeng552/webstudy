<template>
	<div class="pagewrapper">
    <div class="mainpart">
        <div class="min-width">
            <div class="breadcrumb">
                <ul>
                    <li><router-link :to="{name:'consultList'}">资讯中心</router-link>&gt;</li>
                    <li>资讯详情</li>
                </ul>
            </div>
            <div class="cc-detail">
                <div class="of-hidden">
                    <div class="left-part fl">
                        <div class="upper">
                            <h1>{{details.title}}</h1>
                            <span class="ZEkuaixun" v-show="zhengce">政策快讯</span>
                            <span class="ZEkuaixun" v-show="hangye">行业聚焦</span>
                            <span class="time">{{details.published_at | formatDate}}</span>
                            <div class="content" v-html="details.content" style="font-size: 14px; color: #1b1b1b;line-height: 26px;"></div>
                            <p class="come" v-if="details.source == ''"></p>
                            <p class="come" v-else>来源：{{details.source}}</p>
                        </div>
                        
                    </div>
                    <div class="right-part fl">
                        <div class="needs-box"><p class="tit fw-bold fc1b1 lh34">您可能需要</p>
                            <ul class="rel-box">
                                <li v-for="(v,i) in details.services" v-if="i<3">
                                  <router-link class="cover" :to="{name:'proIndex',params: { id: v.id,category_id:6 }}">
                                    <div class="img-box">
                                        <div class="img"><img :src="v.sublogo"></div>
                                        <div class="more-box"><p class="fc5c5">{{v.name}}</p></div>
                                    </div>
                                  </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="right-part" style="margin-top: 20px; float: right">
                        <h2>热门新闻</h2>
                        <ul class="newList">
                          <li v-for="(serviceList,index) in serviceList" style="font-size: 14px;color: #666;" v-if="index<8">
                              <router-link :to="{name:'consultdetails',params:{id:serviceList.id}}"><i class="block">{{index + 1}}</i>{{serviceList.title}}</router-link>
                          </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
  import API from 'API/config'
  import {formatDate} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  export default {
    props:{
      indexData:{
        type: Object
      }
    },
    components: { },
    data(){
      return {
        details:'',
        serviceList:'',
        need:'',
        id:'',
        entserviceUrl:API.entserviceUrl,
        zhengce:false,
        hangye:false,
        category:'',
      }
    },
    beforeRouteUpdate (to, from, next) {
      let id = to.params.id
        this.$http.get(API.url+'customer/articles/'+id
        ).then((res)=>{
          this.details = res.body.article
        })
      next()
    },
    //根据路由判断显示的数据
     beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.id = to.params.id
        // 从列表页跳转详情页
        if (from.name == 'consultList') {
            vm.zhengce = true
            vm.category = vm.$route.params.category
              vm.$http.get(API.url+'customer/articles',{
                params:{
                  category_eq: vm.category,
                }
              }).then((res)=>{
              vm.serviceList = res.body.articles
              vm.$store.dispatch('servicelist',vm.serviceList)//把服务名称存到vuex里
            })
        }else if (from.name == 'industry'){
            vm.hangye = true
              vm.$http.get(API.url+'customer/articles',{
                params:{
                  'q[service_category_name_cont]':vm.revenuezr,
                  page:1,
                  per: 10
                }
              }).then((res)=>{
              vm.serviceList = res.body.articles
              vm.$store.dispatch('servicelist',vm.serviceList)//把服务名称存到vuex里
            })
        }
      })
    },
    computed: {
      ...mapGetters(['revenuezr','servicelist']),//获取vuex里tab名称
    },
    created(){
      this.getDetails()
      this.serviceList = this.servicelist
    },
    methods:{
      getDetails(){
        this.id = this.$route.params.id
          this.$http.get(API.url+'customer/articles/'+this.id
        ).then((res)=>{
          this.details = res.body.article
        })
      },
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy/MM/dd')
      },
      currency(val){
        return currency(val)
      }
    }
  }
</script>
<style lang="scss" scoped>
.img-box{
  height: 190px;
  border: 1px solid #e2e2e2;
  margin-bottom: 20px;
}
.img{
  width: 270px;
  height: 133px;
  img{
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}
</style>