<template>
  <div class="mainpart">
    <!--<div class="s2" v-if="businessId==2">-->
    <!--<park></park>-->
    <!--</div>-->
    <div class="sa-list">
      <div class="banner">
        <div class="fix-center"><h1 class="tit">{{businessBanner.heading}}</h1>
          <p class="explain">{{businessBanner.subheading}}</p><span
            class="tit-box"><span>{{businessBanner.describe}}</span></span></div>
      </div>
      <div class="min-width">
        <div class="content-box">
          <ul class="clearfix">
            <li v-for="item in businessList">
              <router-link class="cover" :to="{name:'proIndex',params: { id: item.id, category_id:businessId }}">
                <div class="img-box">
                  <span class="img"> <img :src="item.sublogo" width="382" height="258"> </span>
                  <!-- <span class="text">
                    <span class="fs14">{{item.describe.split('\n')[0]}}</span>
                    <span class="fs14">{{item.describe.split('\n')[1]}}</span>
                    <span class="fs14">{{item.describe.split('\n')[2]}}</span>
                  </span> -->
                  <div class="shadow"></div>
                </div>
                <div class="more-box">{{item.name}}</div>
              </router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <h3 class="tit">活动资讯</h3>
        <div class="white-box activity clearfix">
          <ul class="half fl">

              <li class="clearfix" v-for="v in mediaView"><router-link :to="{name:'activedetails',params:{id:v.id}}" target="_blank">{{v.title}}
                <span class="fca9a fs14 fr">{{v.updated_at.substring(0,10)}}</span></router-link>
              </li>

          </ul>
          <div class="clearfix"></div>
        </div>
        <h3 class="tit">专题问答</h3>
        <el-collapse accordion v-show="one">
          <el-collapse-item v-for="(v,i) in businessQus" :key="i">
            <template slot="title">
              <span class="fs16 fca9a qus-name">Q{{i+1}} </span>{{v.title}}
            </template>
            <div v-html="v.answer"></div>
          </el-collapse-item>
        </el-collapse>

        <el-collapse accordion v-show="two">
          <el-collapse-item v-for="(v,i) in businessQus" :key="i">
            <template slot="title">
              <span class="fs16 fca9a qus-name">Q{{i+1}} </span>{{v.title}}
            </template>
            <div v-html="v.answer"></div>
          </el-collapse-item>
        </el-collapse>
        <div>{{showIf}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import park from '../park/park.vue'
  import {mapGetters} from 'vuex'
  export default{
    data() {
      return {
        businessId: this.$route.params.id,
        businessList: [],
        businessBanner: '',
        businessQus: '1',
        mediaView: '',
        showIndex: 'aa',
        isA:false,
        showwenti:false,
        one:false,
        two:false
      }
    },
    components: {
      park
    },
    computed:{
      ...mapGetters(['tabid']),
      showIf(){
        if (this.tabid == 6) {
          this.one = true
          this.two = false
        }else{
          this.one = false
          this.two = true
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.businessId = to.params.id
      })
    },
    created() {
      this.gitId()
    },
    watch: {
      '$route': 'gitId'
    },
    methods: {
      gitId(){
        //banner
        this.businessId = this.$route.params.id
        this.$http.get(API.url + 'service_categories/' + this.$route.params.id).then((res) => {
          this.businessBanner = res.body.service_category
        })
        //list
        this.$http.get(API.url + 'service_categories/' + this.$route.params.id + '/corp/services').then((res) => {
          this.businessList = res.body.services
        })
        //question
        this.$http.get(API.url + 'customer/question/category/' + this.$route.params.id).then((res) => {
          this.businessQus = res.body
        })
        //活动资讯
        this.$http.get(API.url + 'customer/articles/overview').then((res) => {
          this.mediaView = res.body.media_view
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
.el-collapse-item{
  i{
    display: none;
  }
}
</style>
