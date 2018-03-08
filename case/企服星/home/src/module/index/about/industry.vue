<template>
    <div class="pagewrapper">
    <div class="mainpart">
        <div class="min-width">
            <div class="blue-tab">
              <ul class="potion">
                <li v-for="(v,i) in location" @click="chooseLocation(i)" :class="{active:v.active}" class="item">{{v.place}}</li>
              </ul>
            </div>
            <div class="cc-list">
                
                <div class="listContent" v-if="industry">
                    <div class="itemcontent" v-for="industry in industry.articles">
                        <p class="title"><router-link :to="{name:'consultdetails',params:{id:industry.id,category:industry.category}}">{{industry.title}}</router-link></p>
                        <p class="time">{{industry.published_at | formatDate}}</p>
                        <div class="itemcont">{{industry.content | removeHTMLTag}}</div> 
                    </div> 
                    <!-- 分页 -->
                   <div class="block">
                    <el-pagination @current-change="handleCurrentChange"  layout="total, prev, pager, next, jumper" :total="total_count" :page-size="10" :current-page.sync="page" style="text-align: right;margin: 10px 10px 0 0;">
                    </el-pagination>
                  </div>
                </div>
                <!-- <div>{{tabshow}}</div> -->
            </div>
        </div>
    </div>
</div>
</template>
<script>
  import API from 'API/config'
  import {formatDate,removeHTMLTag} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  export default {
    components: { },
    data(){
      return {
        activeName: 'first',
        id:'',
        total_count:1,
        industry:[],
        page:1,
        tabName:'',
        status:'',
        location: [
            {
              active: true,
              place: '税收减免',
              auth_status_in:'税收减免'
            },
            {
              active: false,
              place: '专项资金申报',
              auth_status_in:'专项资金申报'
            }
          ],
      }
    },
     beforeRouteLeave(to,from,next){
        var mark =false;
        if ((/consultdetails/.test(to.fullPath))){
          mark = true;
        }
        if(!mark){
          this.$store.dispatch('get_chnage_tab',0);
          this.$store.dispatch('listPage',1);
        }
        next(true)
    },
    // 页面一加载从vuex里获取page
    created(){
      // this.getList()
      this.page = this.listPage;
       if(this.change_tab_v==-100){
          this.chooseLocation(0);
        }else{
          this.chooseLocation(this.change_tab_v);
        }
    },
    computed: {
      ...mapGetters(['revenuezr','listPage','change_tab_v']),//获取vuex里tab名称
    },
    methods:{
      chooseLocation(i){
        if(this.change_tab_v!==i){
            this.page = 1
          }
          this.$store.dispatch('get_chnage_tab',i);
          this.location.forEach((v) => {
            v.active = false
          })
          this.location[i].active = true
          this.status = this.location[i].auth_status_in
          this.$store.dispatch('revenueZr',this.status)
          this.$http.get(API.url+'customer/articles?per=10&page='+this.listPage+'&'+'q[service_category_name_cont]='+this.location[i].auth_status_in
          ).then((res)=>{
          this.industry = res.body
          this.total_count = res.body.total_count
        })
      },
      handleCurrentChange(i) {
        this.$store.dispatch('listPage',i);
        this.$http.get(API.url+'customer/articles?per=10&page='+i+'&'+'q[service_category_name_cont]='+this.status
        ).then((res)=>{
          this.industry = res.body
          this.total_count = res.body.total_count
        })
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy/MM/dd')
      },
      currency(val){
        return currency(val)
      },
      removeHTMLTag(val){
        return removeHTMLTag(val)
      }
    }
  }
</script>
<style lang="scss" scoped>
    .lunbo{
        width: 736px;
        display: inline-block;
    }
    .imgRight{
        display: inline-block;
        margin-left:18px;
        vertical-align: top;
        img{
            display: block;
        }
    }
    .cc-list{
        padding-top: 26px;
    }
    .potion{
        height: 50px;
        line-height:50px;
        padding-left: 55px;
        border: 1px solid #e2e2e2;
        border-top: 0;
        background-color:#fff;
        .item{
            width: 126px;
            font-size: 14px;
            float: left;
            cursor: pointer;
        }
        .active{
          color: rgb(91, 128, 163);
        }
        .teitem{
            color: #5b80a3;
        }
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
      
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .itemcontent{
        width: 1200px;
        height: 155px;
        padding: 20px 30px 0 30px;
        border-bottom: 1px dashed #e2e2e2;
    }
    .listContent{
        overflow: hidden;
        padding-bottom: 30px;
        background-color:#fff;
        border: 1px solid #e2e2e2;
        .title{
            font-size: 20px;
            cursor: pointer;
            a{
                color: #5c5c5c;
            }
        }
        .time{
            font-size:14px;
            color: #a9a9a9;
            margin-top: 15px;
        }
        .itemcont{
            height: 40px;
            color: #5c5c5c;
            font-size: 14px;
            margin-top: 10px;
            overflow : hidden;
        }
        hr{
            margin-top: 40px;
            border: 1px dashed #e2e2e2;
        }
    }
    .clearfix2{
        float: left;
        width: 550px;
        margin-left: 44px;
        font-size: 14px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .clearfix2 a{
        color: #666;
    }
</style>
