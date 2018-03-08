<template>
    <div class="pagewrapper">
    <div class="mainpart">
        <div class="min-width">
            <div class="cc-list">
                <!-- 轮播 -->
                <div class="lunbo">
                    <el-carousel :interval="5000" arrow="always" height="432px">
                        <el-carousel-item>
                          <a href="http://www.entservice.com/consultdetails/39"><img src="../../../assets/images/zhengce3.jpg" height="432" width="812"></a>
                        </el-carousel-item>
                        <el-carousel-item>
                          <a href="http://www.entservice.com/consultdetails/40"><img src="../../../assets/images/zhengce4.jpg" height="432" width="812"></a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="imgRight">
                    <a href="http://www.entservice.com/consultdetails/3"><img src="../../../assets/images/zhengce1.jpg" height="206" width="367" style="margin-bottom: 20px;"></a>
                    <a href="http://www.entservice.com/consultdetails/4"><img src="../../../assets/images/zhengce2.jpg" height="205" width="366"></a>
                </div>
                <div class="listContent">
                    <div class="itemcontent" v-for="serviceList in serviceList">
                        <p class="title"><router-link :to="{name:'consultdetails',params:{id:serviceList.id,category:serviceList.category}}">{{serviceList.title}}</router-link></p>
                        <p class="time">{{serviceList.published_at | formatDate}}</p>
                        <!-- <div class="itemcont">{{serviceList.content | removeHTMLTag}}</div>  -->
                        <div class="itemcont">{{serviceList.content | removeHTMLTag}}</div> 
                    </div> 
                    <!-- 分页 -->
                    <div class="block" style="text-align: right;margin-right: 20px; margin-top: 20px;">
                        <el-pagination @current-change="handleCurrentChange"  layout=" total, prev, pager, next, jumper" :total=" total_count" :page-size="10">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
  import API from 'API/config'
  import {formatDate,removeHTMLTag} from 'assets/js/filter'
  export default {
    components: { },
    data(){
      return {
        serviceList:'',
        content:'',
        total_count:1,
        consult:{
            category_eq:'policy_news'
        }
      }
    },
    created(){
      this.getconsultList()
    },
    methods:{
      getconsultList(){
          this.$http.get(API.url+'customer/articles',{
            params:{
                q:this.consult
            }
          }
        ).then((res)=>{
          this.serviceList = res.body.articles
          this.total_count = res.body.total_count
          // let arr = []
          // this.serviceList.forEach((v)=>{
          //   arr = v.content.replace(/<\/?[^>]*>/g,'')
          //   // console.log(arr)
          //   if (arr.length > 10) {
          //      var b = arr.substring(0,70)+"...";
          //      this.content = b
          //       console.log(b)  
          //   }
          // })
        })
      },
      // 分页
      handleCurrentChange(val) {
        this.$http.get(API.url+'customer/articles?page='+val+'&'+'per='+10,{
            params:{
                q:this.consult
            }
        }
        ).then((res)=>{
          this.serviceList = res.body.articles
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
        width: 810px;
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
        height: 198px;
        padding: 32px 30px;
        border-bottom: 1px dashed #e2e2e2;
    }
    .listContent{
        overflow: hidden;
        padding-bottom: 30px;
        background-color:#fff;
        border: 1px solid #e2e2e2;
        margin-top: 20px;
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
            p{
                text-align:left !important;
                strong{
                  font-weight: none !important;  
                }
            }
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
<style type="text/css">
    .itemcont p{
        text-align: left !important;
        display: inline !important;
    }
    .itemcont p strong{
        font-weight: normal;
    }
</style>
