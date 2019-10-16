<template>
  <div class="mainpart">
    <div class="uc-index">
    <div class="usresInfo" v-if="userInfo.user">
          <div class="portrait">
            <div v-if="userInfo.user.avatar">
              <router-link :to="{name:'userEdit'}"><img :src="userInfo.user.avatar"></router-link>
            </div>
            <div v-if="!userInfo.user.avatar">
              <router-link :to="{name:'userEdit'}"><img src="../../../assets/images/userCenter/user-photo.png" alt=""></router-link>
            </div>
          </div>
          <p class="usresName">{{userInfo.user.name}}</p>
          <ul>
            <li>
              <router-link :to="{name:'userEdit'}"><div class="usreInfoservice">用户信息管理</div></router-link>
              <div class="telNum">{{userInfo.user.phone_number}}</div>
            </li>
            <li>
              <router-link :to="{name:'corp'}"><div class="usreInfoservice">企业信息管理</div></router-link>
              <span class="authenticated" style="background:#4bae6b;" v-if="userInfo.corp.auth_status == 'verified'">已认证</span>
              <span class="authenticated" style="background: #f2b846;" v-else-if="userInfo.corp.auth_status == 'verifying'">认证中</span>
              <span class="notCertified" style="background:#e65c5c;" v-else-if="userInfo.corp.auth_status == 'unauthorized'">未认证</span>
              <span class="notCertified" style="background:#e65c5c;" v-else-if="userInfo.corp.auth_status == 'failed'">未认证</span>
              <div class="telNum">
                <a class="textoverhideen" :title="userInfo.corp.name">{{userInfo.corp.name}}</a>
              </div>
            </li>
          </ul>
        </div>
      <div class="content" style="padding: 20px;">
        <div class="usresIndex">
          <p class="myProject">我的项目</p>
          <div class="xsxm_list" v-for="myproject in myproject">
            <div class="xsxm_list_main">
              <div class="title clearfix">
                <ul>
                  <li class="yun">{{myproject.created_at | formatDate}}</li>
                  <li class="yun">项目编号：{{myproject.no}}</li>
                  <li class="yun">服务机构：{{myproject.provider}}</li>
                  <li class="yun" v-if="myproject.status == 'proceeding'">项目进行中</li>
                  <li class="yun" v-else-if="myproject.status == 'deny'">项目已拒绝</li>
                  <li class="yun" v-else-if="myproject.status == 'stop'">项目已终止</li>
                  <li class="yun" v-else="myproject.status == 'finished'">项目已完成</li>
                </ul>
              </div>
              <div class="choose">
                <!-- 判断申报年份是否显示 -->
                <div class="shenbaoYear" v-if="myproject.year == null " style="display:none;"></div>
                <div class="shenbaoYear" v-else>{{myproject.year}}年申报</div>
                <div style="display: inline-block;">
                  <p class="qy_name">{{myproject.service}}</p>
                  <div class="progressBar ingColor" v-if="myproject.status == 'proceeding'">
                    <el-progress :percentage="myproject.stages_percent"></el-progress>
                  </div>
                  <div class="progressBar colorChange" v-if="myproject.status == 'deny'">
                    <el-progress :percentage="myproject.stages_percent"></el-progress>
                  </div>
                  <div class="progressBar colorChange" v-if="myproject.status == 'stop'">
                    <el-progress :percentage="myproject.stages_percent"></el-progress>
                  </div>
                  <div class="progressBar finished" v-if="myproject.status == 'finished'">
                    <el-progress :percentage="myproject.stages_percent" status="success"></el-progress>
                  </div>
                </div>
                <!--<p class="look">查看</p>-->
                <router-link :to="{name:'serviceApply',params:{id:myproject.id,stage_id:myproject.first_stage_id}}" class="look" v-if="myproject.status!='proceeding'">查看</router-link>
                <router-link :to="{name:'serviceApply',params:{id:myproject.id,stage_id:myproject.process_stage_id}}" class="look" v-if="myproject.status=='proceeding'">查看</router-link>
                </div>
              </div>
            </div>
          </div>
          <p style="font-size: 14px;text-align:center;" v-show="noneshuju">暂无数据</p>
          <!-- 分页 -->
          <div class="block" style="text-align: right;margin-bottom: 20px;">
            <el-pagination @current-change="handleCurrentChange"  layout=" total, prev, pager, next, jumper" :total=" total_count" :page-size="10">
            </el-pagination>
          </div>
          <div>{{noneShow}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import {formatDate} from 'assets/js/filter'
  export default{
    data(){
      return {
        userInfo:'',
        myproject:'',
        total_count:1,
        noneshuju:false
      }
    },
    created(){
      this.editPhoneIcon()
      this.myProjectInfo()
    },
    computed: {
      noneShow(){
        if (this.myproject == '') {
          this.noneshuju = true
        }else{
          this.noneshuju = false
        }
      }
    },
    methods: {
      // 获取用户信息
      editPhoneIcon(){
        this.$http.get(API.url+'customer/users'
        ).then((res)=>{
          this.userInfo = res.body
        })
      },
      // 获取我的项目
      myProjectInfo(){
        this.$http.get(API.url+'customer/projects?page=1'+'&'+'per='+10
        ).then((res)=>{
          this.myproject = res.body.projects
          this.total_count = res.body.total_count
        })
      },
      handleCurrentChange(val) {
        this.$http.get(API.url+'customer/projects?page='+val+'&'+'per='+10
        ).then((res)=>{
          this.myproject = res.body.projects
          this.total_count = res.body.total_count
        })
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scope>
  .uc-index {
    .breadcrumb {
      border-bottom: 1px solid #ccc;
    }
  }
</style>
