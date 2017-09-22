<template>
  <div class="messagecenter">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>消息中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'事项通知'+ms_count" name="item"></el-tab-pane>
        <el-tab-pane :label="'系统通知'" name="system"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-ms">
      <!--消息列表-->
      <div class="showmatter" v-if="activeName=='item'">
        <div class="ms-list" v-if="messages!=''">
          <ul>
            <li class="ls" v-for="(v,i) in messages">
              <i class="circle" v-if="v.status=='unread'"></i>
              <h3 class="title">{{v.title}}</h3>
              <div class="date">{{v.created_at | formatDate}}</div>
              <div class="con">
                <ul v-if="v.messageable.service!=undefined">
                  <li>项目名称：{{v.messageable.service}}</li>
                  <li>项目编号：{{v.messageable.no}}</li>
                  <li>企业名称：{{v.messageable.corp_name}}</li>
                  <li>事项内容：{{v.content}}</li>
                  <el-button type="primary" class="btn-look" @click="lookProduct(v.id,v.tag)">查看详情</el-button>
                </ul>
                <ul v-else>
                  <li>项目名称：{{v.project.service}}</li>
                  <li>项目编号：{{v.project.no}}</li>
                  <li>企业名称：{{v.project.corp_name}}</li>
                  <li>事项内容：{{v.content}}</li>
                  <el-button type="primary" class="btn-look" @click="lookProduct(v.id,v.tag)">查看详情</el-button>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="xsx_list_none" v-else></div>
      </div>
      <!--系统公告-->
      <div class="showsystem" v-else>
        <div class="xsx_list_none"></div>
      </div>
    </div>

    <div class="pagination">
      <!--消息分页-->
      <div class="block" v-if="activeName=='item'">
        <el-pagination layout="total, prev, pager, next, jumper" :total="total_count"
                       @current-change="handleCurrentChange" :page-size="10">
        </el-pagination>
      </div>
      <!--系统分页-->
      <!--<div class="block" v-else>
		<el-pagination layout="total, prev, pager, next, jumper" :total="total_count_system"
					   @current-change="handleCurrentSystem" :page-size="10">
		</el-pagination>
	  </div>-->
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'assets/js/filter'
  import API from 'API/api'
  export default{
    created(){
      this.$http.get(API.url + 'messages').then(this._getMessages).catch();
      //计数
      this.$http.get(API.url + 'messages/statistics').then((res) => {
        var resBody = res.body;
        this.ms_count = resBody.item_count == 0 ? '' : ' (' + resBody.item_count + ')'
      }).catch();
    },
    data(){
      return {
        stage_name: '项目管理',
        activeName: 'item',
        total_count: 1,
        ms_count: 0,
        messages: [],
        total_count_system: 1
      }
    },
    methods: {
      //查看详情
      lookProduct(id, tag){
        this.$http.get(API.url + 'messages/' + id + '/read').then((res) => {
          var resBody = res.body;
          var project = resBody.project;
          var messageable_type=project.messageable_type
          //老消息跳转
          if(messageable_type=='Project'){
            var oldId=project.project.id;
            var oldProcessStageId=project.project.process_stage_id;
            var oldFirstStageId=project.project.first_stage_id;
            if(tag=='project_assign'){
              this.$router.push({name: 'assignment'})
            }else if(project.project.status!='proceeding'){
              if(tag == 'audit_form'){
                this.$router.push({
                  name: 'auditForm',
                  params: {id: oldId, state_id: oldFirstStageId},
                  query: {name: this.stage_name}
                })
              }else if(tag == 'audit_file'){
                this.$router.push({
                  name: 'auditFile',
                  params: {id: oldId, state_id: oldFirstStageId},
                  query: {name: this.stage_name}
                })
              }else{
                this.$router.push({
                  name: 'serviceApply',
                  params: {id: oldId, state_id: oldFirstStageId},
                  query: {name: this.stage_name}
                })
              }
            }else if(project.project.status=='proceeding'){
              if(tag == 'audit_form'){
                this.$router.push({
                  name: 'auditForm',
                  params: {id: oldId, state_id: oldProcessStageId},
                  query: {name: this.stage_name}
                })
              }else if(tag == 'audit_file'){
                this.$router.push({
                  name: 'auditFile',
                  params: {id: oldId, state_id: oldProcessStageId},
                  query: {name: this.stage_name}
                })
              }else{
                this.$router.push({
                  name: 'serviceApply',
                  params: {id: oldId, state_id: oldProcessStageId},
                  query: {name: this.stage_name}
                })
              }
            }
          }else{
            //新消息跳转
            var id = project.project.id;
            var messageableId=project.messageable.id;
            if(tag=='project_assign'){
              this.$router.push({name: 'assignment'})
            }else if(tag == 'audit_form'){
              this.$router.push({
                name: 'auditForm',
                params: {id: id, state_id: messageableId},
                query: {name: this.stage_name}
              })
            }else if(tag == 'audit_file'){
              this.$router.push({
                name: 'auditFile',
                params: {id: id, state_id: messageableId},
                query: {name: this.stage_name}
              })
            }else if(tag == 'stop_flow'){
              this.$router.push({
                name: 'serviceApply',
                params: {id: id, state_id: messageableId},
                query: {name: this.stage_name,proItem:2}
              })
            }else{
              this.$router.push({
                name: 'serviceApply',
                params: {id: id, state_id: messageableId},
                query: {name: this.stage_name}
              })
            }
          }
        })
      },
      //消息分页
      handleCurrentChange(v){
        this.$http.get(API.url + 'messages', {
          params: {
            per: 10,
            page: v
          }
        }).then(this._getMessages).catch()
      },
      //系统分页
      /*handleCurrentSystem(v){
       console.log(v+'系统')
       },*/
      //选项卡
      handleClick(tab, event) {
        this.$http.get(API.url + 'messages', {
          params: {
            q: {
              category_eq: tab.name
            },
            page: 1,
            per: 10
          }
        }).then(this._getMessages).catch()
      },
      // 获取 消息列表
      _getMessages(res){
        var resBody = res.body;
        this.messages = resBody.messages
        this.total_count = resBody.total_count
      },
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style lang="scss">
  .messagecenter {
    .ms-list {
      .ls {
        padding-left: 20px;
        position: relative;
        border-bottom: 1px solid #F0F0F0;
        padding-bottom: 15px;
        margin-bottom: 15px;
        .circle {
          content: '';
          display: block;
          position: absolute;
          left: 3px;
          top: 9px;
          width: 6px;
          height: 6px;
          background-color: #3c8ced;
          border-radius: 3px;
        }
        .title {
          font-size: 14px;
          color: #5C5C5C;
          text-align: left;
          height: 24px;
          line-height: 24px;
        }
        .date {
          font-size: 12px;
          color: #CCCCCC;
          padding-bottom: 8px;
        }
        .con {
          height: 40px;
          position: relative;
          li {
            float: left;
            width: 426px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #999999;
            line-height: 20px;
          }
          li:nth-of-type(2n-1) {
            margin-right: 100px;
          }
          li:nth-of-type(2n) {
            width: 200px;
          }
          .btn-look {
            position: absolute;
            right: 20px;
            top: 0;
          }
        }
      }
    }
  }
</style>
