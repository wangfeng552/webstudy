<template>
  <div>
    <div class="opinion">
      <div class="proposal" @click="jianyi">建议<br>反馈</div>
      <div v-if="supperAdmin">
        <div class="mascot-s" v-if="isShowMascot" @click="showMascotS()" :key="1">
          <div class="mas-t">
            <i class="tishi">点我展开哦～</i>
          </div>
          <div class="mas-b">
            <i class="lingdang"></i>
            <i class="red" v-if="messages!=''"></i>
            <div class="xxtx">消息提醒</div>
          </div>
        </div>

        <div class="mascot-b" v-else="" :key="2">
          <div class="mas-t" :class="animalMove" @click="hideMascotB()">
            <i class="tishi">点我收起哦～</i>
          </div>
          <div class="mas-s">
            <ul v-if="messages!=''">
              <li v-for="(v,i) in messages" v-if="i<3">
                <p>{{v.title}}</p>
                <a class="tz" href="" @click.prevent="lookProduct(v.id,v.tag)">查看详情>></a>
              </li>
            </ul>
            <div class="nomas" v-else>没有新消息</div>
          </div>
        </div>
      </div>

      <el-dialog title="提交反馈" :visible.sync="dialogFormVisible" :modal-append-to-body="false"
                 :close-on-click-modal="true" style="text-align: center;margin: 0 auto; " top="40%" size="small">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="desc">
            <el-input type="textarea" v-model="form.desc" auto-complete="off" placeholder="请告诉我们你的建议或遇到的问题"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="提交反馈" :visible.sync="dialogVisible" size="tiny" top="40%" :modal-append-to-body="false"
                 style="text-align: center;margin: 0 auto; ">
        <p class="thanks">感谢你的反馈！</p>
        <p>企服星因你而更美好。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import API from 'API/api'
  import ActionCable from 'actioncable'
  export default {
    created(){
      var vm=this;
      var userid = this.userId;
      var cable = ActionCable.createConsumer(this.wsURL)
      cable.subscriptions.create('MessagesChannel', {
        received: function (data) {
            vm.$http.get(API.url + 'messages', {
              params: {
                q: {
                  status_eq: 'unread',
                  category_eq: 'item'
                }
              }
            }).then((res) => {
              var resBody = res.body;
              vm.messages = resBody.messages;
              vm.isShowMascot = false;
            }).catch()
        },
        //当服务器上的订阅可用时调用
        connected: function() {
          return setTimeout((function(_this) {
            return function() {
              _this.followCurrentMessage();
            };
          })(this), 1000);
        },
        followCurrentMessage: function() {
          return this.perform('follow', {
            user_id: userid
          });
        },
      });
      this.getUnreadMessage()
    },
    data(){
      return {
        wsURL:API.ws,
        stage_name: '项目管理',
        messages: [], //消息
        dialogVisible: false,
        dialogFormVisible: false,
        isShowMascot: true,//显示侧边消息
        form: {
          desc: ''
        },
        rules: {
          desc: [{required: true, message: '请填写反馈内容', trigger: 'blur'}]
        },
      }
    },
    computed: {
      //是否超级管理员
      ...mapGetters(['dist_type','userId']),
      supperAdmin(){
        return this.dist_type == 'Supplier'
      },
      //有消息动物就动
      animalMove(){
        if(this.messages!=''){
          return 'mas-t-gif'
        }else if(this.messages==''){
          return 'mas-t-jpg'
        }
      }
    },
    methods: {
      //点击展示大消息
      showMascotS(){
        this.isShowMascot = false
      },
      hideMascotB(){
        this.isShowMascot = true
      },
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
      //获取未读信息
      getUnreadMessage(){
        if (this.supperAdmin) {
          this.$http.get(API.url + 'messages', {
            params: {
              q: {
                status_eq: 'unread',
                category_eq: 'item'
              }
            }
          }).then((res) => {
            var resBody = res.body;
            this.messages = resBody.messages;
            if(this.messages!=''){
              this.isShowMascot = false;
            }
          }).catch()
        }
      },
      //点击展开建议反馈
      jianyi(){
        this.dialogFormVisible = true
        this.form.desc = ''
      },
      //提交反馈
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(API.url + 'feedbacks', {'content': this.form.desc}
            ).then((res) => {
              this.operationList = res.body
              this.dialogFormVisible = false
              this.dialogVisible = true
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .opinion {
    .el-dialog--small {
      width: 25% !important;
    }
    .thanks {
      font-size: 20px;
      color: #55b65f;
      margin-bottom: 10px;
    }
    .proposal {
      position: fixed;
      bottom: 20px;
      right: 0;
      z-index: 10000;
      width: 58px;
      height: 58px;
      background: #3c8ced;
      border-radius: 4px;
      padding-top: 10px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #136ad3;
      }
    }
    .mascot-s {
      position: fixed;
      z-index: 10000;
      margin-top: -98px;
      height: 196px;
      width: 58px;
      right: 0;
      top: 50%;
      .mas-t {
        position: relative;
        left: -5px;
        top: 5px;
        width: 64px;
        height: 48px;
        background: url("./images/cw_1.png") 0 0 no-repeat;
        z-index: 5;
        cursor: pointer;
        &:hover {
          .tishi {
            display: block;
          }
        }
        .tishi {
          display: none;
          background: url("./images/tip_1.png") 0 0 no-repeat;
          width: 110px;
          height: 81px;
          line-height: 66px;
          text-align: center;
          font-size: 14px;
          color: #5c5c5c;
          position: absolute;
          top: -79px;
          right: 2px;
        }
      }
      .mas-b {
        width: 58px;
        height: 58px;
        cursor: pointer;
        background-color: #3c8ced;
        border-radius: 4px;
        position: relative;
        &:hover {
          background: #136ad3;
          .xxtx {
            display: block;
          }

        }
        .lingdang {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 58px;
          height: 58px;
          z-index: 1;
          background: url("./images/tip_2.png") center center no-repeat;
        }
        .red {
          width: 8px;
          height: 8px;
          background-color: #FF0000;
          border-radius: 4px;
          position: absolute;
          top: 10px;
          right: 14px;
        }
        .xxtx {
          background: #136ad3;
          height: 58px;
          line-height: 58px;
          color: #fff;
          padding: 0 15px;
          position: absolute;
          left: -83px;
          top: 0;
          border-radius: 4px;
          display: none;
        }
      }
    }
    .mascot-b {
      position: fixed;
      z-index: 10000;
      margin-top: -200px;
      width: 154px;
      right: 0;
      top: 50%;
      .mas-t {
        position: relative;
        left: -5px;
        top: 5px;
        width: 154px;
        height: 91px;
        z-index: 5;
        cursor: pointer;
        &:hover {
          .tishi {
            display: block;
          }
        }
        .tishi {
          display: none;
          background: url("./images/tip_1.png") 0 0 no-repeat;
          width: 110px;
          height: 81px;
          line-height: 66px;
          text-align: center;
          font-size: 14px;
          color: #5c5c5c;
          position: absolute;
          top: -79px;
          right: 20px;
        }
      }
      .mas-t-gif {
        background: url("./images/cw_22.gif") center 0 no-repeat;
        background-size: 128px;
      }
      .mas-t-jpg{
        background: url("./images/cw_3.png") center 0 no-repeat;
        background-size: 128px;
      }
      .mas-s {
        padding: 14px;
        background: #ffffff;
        border: 2px solid #3c8ced;
        border-radius: 4px;
        width: 150px;
        min-height: 100px;
        .nomas {
          line-height: 100px;
          text-align: center;
        }
        li {
          padding-bottom: 8px;
          border-bottom: 1px solid #f0f0f0;
          margin-bottom: 8px;
        }
        li:last-child {
          border: none;
          margin: 0
        }
        p {
          font-size: 14px;
          color: #5c5c5c;
          height: 28px;
          line-height: 14px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .tz {
          font-size: 14px;
        }
      }
    }
  }
</style>
