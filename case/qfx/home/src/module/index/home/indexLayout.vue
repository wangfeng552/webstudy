<template>
  <div class="home" v-if="indexData">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,i) in indexData.banners" :key="i" :style="{background:'url('+item.cover+') center no-repeat'}"><a
        :href="item.uri"></a></swiper-slide>
      <div class="swiper-pagination" slot="pagination">
      </div>
    </swiper>
    <div class="min-width">
      <p class="title lh34 fw-bold fs24">税收减免</p>
      <ul class="content-box">
        <li v-for="(v,i) in indexData.tax" v-if="i<6">
          <router-link class="cover" :to="{name:'proIndex',params: { id: v.id,category_id:taxId }}">
            <div class="img-box">
              <img :src=v.sublogo alt="" width="382" height="198">
            </div>
            <p class="more-box fs16">{{v.name}}</p>
          </router-link>
        </li>
      </ul>
      <div class="clearfix"></div>
      <div>
        <a href="" class="btn-default" @click.prevent="getTaxId()">查看更多</a>
        <!--<router-link class="btn-default" :to="{name:'category',params: { id:getTaxId()}}">查看更多</router-link>-->
      </div>
      <p class="title lh34 fw-bold fs24">专项资金申报</p>
      <ul class="content-box">
        <li v-for="(v,i) in indexData.fund" v-if="i<6">
          <router-link class="cover" :to="{name:'proIndex',params: { id: v.id,category_id:fundId}}">
            <div class="img-box">
              <img :src=v.sublogo alt="" width="382" height="198">
            </div>
            <p class="more-box fs16">{{v.name}}</p>
          </router-link>
        </li>
      </ul>
      <div class="clearfix"></div>
      <div>
        <a href="" class="btn-default" @click.prevent="getFundId()">查看更多</a>
      </div>
    </div>
    <div class="new-box">
      <div class="content">
        <div class="consult fl"><p class="tit">政策快讯</p>
          <p class="fl" v-for='item in indexData.articles'><router-link :to="{name:'consultdetails',params:{id:item.id}}">{{item.title}}</router-link></p>
          <!-- <a class="btn-default fl" href="/articles/category/policy_news">查看更多</a> -->
          <router-link :to="{name:'consultList'}"><p class="btn-default fl">查看更多</p></router-link>
        </div>
        <div class="question fr">
          <ul>
            <li><p class="tit">常见问题</p></li>
            <li :class="'zindex'+i+1" v-for="(v,i) in items" @mouseenter="showAnswer(i)"
                @mouseleave="hideAnswer(i)"><p href="">{{v.title}}</p>
              <div class="hover-box" v-show="answerShow(i)"><p class="fc5c5 fs14 fw-bold" v-html="v.content">
              </p></div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import API from 'API/config'
  export default{
    name: 'indexLayout',
    props:{
      indexData:{
        type: Object
      }
    },
    data(){
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true,
        },
        items:[
          {
          	title:'什么是企服星平台？',
            content:' 企服星是一个O2O性质的服务平台，以满足企业需求为目标，对接服务机构和企业，掌控服务交易流程，保障双方权利。<br>企服星通过整合服务供应商，为企业提供选择供应商、采购服务项目、监控服务流程、结算服务费用等一站式功能'
          },
          {
          	title:'与传统企业服务相比，企服星具备哪些优势？',
            content:'平台能为企业带来的利益主要有三点：<br>1、平台通过整合供应商信息，为企业减少筛选困难，迅速定位优质供应商。<br> 2、平台通过跟踪整个服务流程，及时将服务的时间节点反馈至企业。<br>3、建立投诉机制，企业通过平台享受的服务，可彻底改变以往”投诉无门“的现象。'},
          {
          	title:'企服星能为企业提供什么服务？',
            content:'企业可以在企服星平台上选择多种企业服务，包括工商注册、园区落户、代理记账、审计服务、知识产权、专项资金申请、税收减免等服务'
          },
          {
          	title:'服务流程是怎样的？',
            content:' 在线咨询——提交申请——预审通过——签署合同——支付费用——项目实施——成果确认——服务评价'
          },
          {
          	title:'如何进行企业认证？',
            content:'企业在申请服务之前，必须在平台上通过资质认证。<br>申请企业认证时，填写企业名称、企业地址，上传营业执照等相关图片或文件,点击提交申请。企服星工作人员审核后，认证成功'
          }
        ],
        showIndex:'aa'
      }
    },
    created(){
    },
    methods: {
      showAnswer(i){
        this.showIndex = i
        this.answerShow()
      },
      hideAnswer(i){
        this.showIndex = 'noway'
      },
      answerShow(i){
        return i==this.showIndex
      },
      getTaxId(){
        this.$router.push({name:'category',params: { id:this.taxId}})
      },
      getFundId(){
        this.$router.push({name:'category',params: { id:this.fundId}})
      }
    },
    computed:{
      taxId(){
        let categories = this.indexData.categories;
        if(categories!=undefined){
          for(let i=0;i<categories.length;i++){
            if(categories[i]['name']=='税收减免'){
              return categories[i]['id']
            }
          }
        }
      },
      fundId(){
        let categories = this.indexData.categories;
        if(categories!=undefined){
          for(let i=0;i<categories.length;i++){
            if(categories[i]['name']=='专项资金申报'){
              return categories[i]['id']
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
