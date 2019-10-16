<template>
  <div class="todo-list">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>待办事项</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tab">
      <div></div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'当前办理('+ticket_count+')'" name="ticket"></el-tab-pane>
        <el-tab-pane :label="'内部审核('+audit_count+')'" name="audit"></el-tab-pane>
      </el-tabs>
    </div>
    <!--无数据-->
    <div class="xsx_list_none" v-if="total_count==0"></div>
    <div v-else>
      <div class="xsxm_list">
        <table class="tableList">
         <tr>
           <th>项目名称</th>
           <th>项目编号</th>
           <th>项目状态</th>
           <th>企业负责人</th>
           <th>项目负责人</th>
           <th>项目经办人</th>
           <th>操作</th>
         </tr>
         <tr v-for="projects in projects">
            <td>
              <a class="listItem" :title="projects.service">{{projects.service}}</a>
              <a class="small small2" :title="projects.corp_name">{{projects.corp_name}}</a>
            </td>
            <td >
              <div class="online" v-if="projects.source == 'online'"><i></i><span>线上项目</span></div>
              <div class="offline"v-if="projects.source == 'offline'"><i></i><span>线下项目</span></div>
              <div class="no">{{projects.no}}</div>
            </td>
            <td>
              <div class="science">{{projects.process_stage}}</div>
              <div class="small">{{projects.audit_status}}</div>
            </td>
            <!-- 企业负责人 -->
            <td>
              <p class="small" v-if="projects.corp_principal_name == null || projects.corp_principal_name == ''">--</p>
              <p class="small">{{projects.corp_principal_name}}</p>
            </td>
            <!-- 项目负责人 -->
            <td>
              <p class="small" v-if="projects.owner_name == null || projects.owner_name == ''">--</p>
              <p class="small">{{projects.owner_name}}</p>
            </td>
            <!-- 项目经办人 -->
            <td>
              <p class="small" v-if="projects.agent_name == null || projects.agent_name == ''">--</p>
              <p class="small" v-else>{{projects.agent_name}}</p>
            </td>
            <td>
              <p class="look" v-if="projects.status!='proceeding'"><router-link :to="{name:'serviceApply',params:{id:projects.id,state_id:projects.first_stage_id},query:{name:stage_name}}">查看</router-link></p>
              <p class="look" v-if="projects.status=='proceeding'"><router-link :to="{name:'serviceApply',params:{id:projects.id,state_id:projects.process_stage_id},query:{name:stage_name}}">查看</router-link></p>
            </td>
            <div v-if="projects.year == null">
              <span class="shenbao" style="display:none;"></span>
            </div>
             <div v-else>
              <span class="shenbao">{{projects.year}}年申报</span>
            </div>
         </tr>
       </table>
      </div>
      <div class="pagination">
        <div class="block">
          <el-pagination layout="total, prev, pager, next, jumper" :total="total_count"
                         @current-change="handleCurrentChange" :page-size="10">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  export default{
    created(){
      // 获取 内部审核 当前办理
      this.$http.get(API.url + 'projects/process', {
        params: {
          process_status: this.activeName,
          page: 1,
          per: 10
        }
      }).then(this._getProjects)
      // 统计代办事项
      this.$http.get(API.url + 'projects/process/statistics').then(this._getStatistics)
    },
    data(){
      return {
        activeName: 'ticket',
        total_count: -1,
        ticket_count: '',
        audit_count: '',
        projects: [],
        stage_name:'待办事项'
      }
    },
    methods: {
      //选项卡
      handleClick(tab, event) {
        this.$http.get(API.url + 'projects/process', {
          params: {
            process_status: tab.name,
            page: 1,
            per: 10
          }
        }).then(this._getProjects)
      },
      // 分页
      handleCurrentChange(v){
        this.$http.get(API.url + 'projects/process', {
          params: {
            process_status: this.activeName,
            page: v,
            per: 10
          }
        }).then(this._getProjects)
      },
      // 获取 内部审核 当前办理返回的数据
      _getProjects(res){
        var resBody = res.body;
        this.projects = resBody.projects
        this.total_count = resBody.total_count
      },
      // 统计代办事项
      _getStatistics(res){
        var resBody = res.body;
        this.ticket_count = resBody.ticket_count
        if(this.ticket_count ==''){
          this.ticket_count = 0
        }
        this.audit_count = resBody.audit_count
        if(this.audit_count ==''){
          this.audit_count = 0
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .todo-list{
    .online{
      i{
        display: inline-block;
        width:14px;
        height:11px;
        background: url("../../assets/images/projecticon1.png") no-repeat;
        vertical-align: middle;
        margin-right:4px;
      }
      span{
        vertical-align: middle;
      }
    }
    .offline{
      i{
        display: inline-block;
        width:14px;
        height:14px;
        background: url("../../assets/images/projecticon2.png") no-repeat;
        vertical-align: middle;
        margin-right:4px;
      }
      span{
        vertical-align: middle;
      }
    }
  }
</style>
