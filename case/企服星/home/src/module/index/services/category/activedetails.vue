<template>
	<div class="pagewrapper">
    <div class="mainpart">
        <div class="min-width">
            <!-- <div class="breadcrumb">
                <ul>
                    <li><router-link :to="{name:'consultList'}">活动资讯</router-link>&gt;</li>
                    <li>资讯详情</li>
                </ul>
            </div> -->
            <div class="cc-detail" style="padding-top: 20px;">
                <div class="of-hidden">
                    <div class="left-part fl">
                        <div class="upper"><h1>{{details.title}}</h1>
                            <p class="time">发布时间：{{details.created_at | formatDate}}</p>
                            <div class="content" v-html="details.content"></div>
                            <p class="come">{{details.source}}</p>
                        </div>
                        <div class="needs-box"><p class="tit fw-bold fc1b1 lh34">您可能需要</p>
                            <ul class="rel-box">
                                <li><a class="cover" href="/services/YweMQpzoRO">
                                    <div class="img-box">
                                        <div class="img"><img
                                                src="http://omfp56ofi.bkt.clouddn.com/05_%E8%BF%9B%E5%8F%A3%E8%AE%BE%E5%A4%87%E5%85%8D%E5%85%B3%E7%A8%8E.jpg">
                                            <div class="shadow"></div>
                                        </div>
                                    </div>
                                    <div class="more-box"><p class="fc5c5">进口设备免关税</p></div>
                                </a></li>
                                <li><a class="cover" href="/services/WmylOJvMnv">
                                    <div class="img-box">
                                        <div class="img"><img
                                                src="http://omfp56ofi.bkt.clouddn.com/02_%E4%B8%80%E8%88%AC%E7%BA%B3%E7%A8%8E%E4%BA%BA%E4%BB%A3%E7%90%86%E8%AE%B0%E8%B4%A6.jpg">
                                            <div class="shadow"></div>
                                        </div>
                                    </div>
                                    <div class="more-box"><p class="fc5c5">一般纳税人代理记账（一季）</p></div>
                                </a></li>
                                <li><a class="cover" href="/services/PxwlZBblmn">
                                    <div class="img-box">
                                        <div class="img"><img
                                                src="http://omfp56ofi.bkt.clouddn.com/03_%E4%BA%8F%E6%8D%9F%E8%AE%A4%E5%AE%9A%E5%AE%A1%E8%AE%A1.jpg">
                                            <div class="shadow"></div>
                                        </div>
                                    </div>
                                    <div class="more-box"><p class="fc5c5">亏损认定审计</p></div>
                                </a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="right-part fl"><h2>热门新闻</h2>
                        <p v-for="serviceList in serviceList.media_view" style="font-size: 14px;color: #666;"><router-link :to="{name:'activedetails',params:{id:serviceList.id}}">{{serviceList.title}}</router-link></p>
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
  export default {
    components: { },
    data(){
      return {
        details:'',
        serviceList:'',
        id:''
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
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.id = to.params.id
      })
    },
    watch: {
      '$route':'getList'
    },
    created(){
      this.getDetails()
      this.getLeftService()
    },
    methods:{
      getDetails(){
        this.id = this.$route.params.id
          this.$http.get(API.url+'customer/articles/'+this.id
        ).then((res)=>{
          this.details = res.body.article
        })
      },
      getLeftService(){
          this.$http.get(API.url+'customer/articles/overview'
        ).then((res)=>{
          this.serviceList = res.body
        })
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      currency(val){
        return currency(val)
      }
    }
  }
</script>