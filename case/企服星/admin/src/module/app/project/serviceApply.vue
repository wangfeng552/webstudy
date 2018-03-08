<template>
  <div class="serviceApply">
    <!--服务申请阶段-->
    <div v-if="stage && stage.category == 'apply' && stage.bind_form">
      <div class="gd-box">
        <div class="title"><i class="tit-fsbd"></i><span class="describe"> 服务申请</span></div>
        <component v-for="(item,i) in list_form"
                   :key="i"
                   :message="item"
                   :index="i"
                   :is="'p' + item.type"
                   :fix="fix"
                   :hasAnswer="hasAnswer"
                   ref="showMessage"
        >
        </component>
        <div class="button-box" v-if="fix">
          <el-button type="primary" @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="onTest"   v-loading.fullscreen="fullscreenLoading">提交</el-button>
        </div>

      </div>
    </div>
    <!--工单阶段-->
    <div v-for="(item,index) in tickets">
      <!--发送表单-->
      <sendForm v-if="item.category == 'sendform'"
                :ticket="item"
                :index="index"
                :type="item.status"
      ></sendForm>
      <!--发送合同 只有在合同阶段有-->
      <startContract v-if="item.category == 'contract'"
                     :type="item.status"
                     :index="index"
                     :ticket="item"
      >
      </startContract>
      <!--发送文件-->
      <sendFile v-if="item.category == 'transmit'"
                :type="item.status"
                :ticket="item"
                :index="index"
      >
      </sendFile>
      <!--文件确认-->
      <affirmFile v-if="item.category == 'affirm'"
                  :type="item.status"
                  :index="index"
                  :ticket="item"
      >
      </affirmFile>
      <!--索要文件-->
      <requestFile v-if="item.category == 'demand'"
                   :type="item.status"
                   :index="index"
                   :ticket="item"
      ></requestFile>
      <!--发起支付-->
      <startPay v-if="item.category == 'pay'&&item.trade!=null"
                :type="item.status"
                :index="index"
                :ticket="item"
                :payWay="item.trade.category"
      >
      </startPay>
      <!--发起支付初始状态-->
      <startPay v-if="item.category == 'pay'&&item.trade==null"
                :type="item.status"
                :index="index"
                :ticket="item"
      >
      </startPay>
      <!--发送通知-->
      <sendNoti v-if="item.category == 'notify'"
                :type="item.status"
                :index="index"
                :ticket="item"
      >
      </sendNoti>

    </div>

    <!--内审-->
    <div class="audit-btn">
      <!--开启下一步-->
      <el-button type="primary" @click="openStepNext" v-if="(stage.status=='process'&&projectStatus=='proceeding')||!closeState">开启下一步</el-button>
      <!--内审入口和状态-->
      <span v-if="stage.audits!=''">
        <router-link :to="{name:'auditForm'}" v-if="stage.category=='apply'">
          <el-button type="primary">内部审核</el-button>
        </router-link>
        <router-link :to="{name:'auditFile'}" v-else>
          <el-button type="primary">内部审核</el-button>
        </router-link>
        <span class="audit-mention" v-if="auditsStatus=='wait'"><i class="icon icon-wait"></i> <span  class="audit-state">等待发起</span></span>
        <span class="audit-mention" v-if="auditsStatus=='processing'"><i class="icon icon-verifying"></i> <span  class="audit-state">审核中</span></span>
         <span class="audit-mention" v-if="auditsStatus=='pass'"><i class="icon icon-pass"></i> <span  class="audit-state">审核通过</span></span>
        <span class="audit-mention" v-if="auditsStatus=='reject'"><i class="icon icon-refused"></i> <span  class="audit-state">审核拒绝</span></span>
      </span>

    </div>


    <!--操作记录-->
    <div class="record" v-if="stage.category!='finished'">
      <div class="header-item">
        <span>操作记录</span>
      </div>
      <div v-if="stage.stage_logs && stage.stage_logs.length >0" class="cover-box scroll-beauty">
        <ul>
          <li v-for="v in stage.stage_logs" class="re-item" v-if="v.operate_name!=null">
            <div class="text_noaml">{{v.created_at | formatDate}}</div>
            <div class="text_noaml">{{v.operate_name | formatName}}</div>
            <div class="text_noaml">{{v.content}}</div>
          </li>
        </ul>
      </div>
      <p class="not-upload" v-else>
        <i class="icon-notup"></i>
        <span class="fc5c5 fs14">暂无操作记录</span>
      </p>
    </div>

    <!-- 项目完成阶段 直接展示图片-->
    <div v-if="stage.category == 'finished'" class="finished">
      <div>
        <img src="../../../assets/images/project/xmwc.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {formatDate} from 'assets/js/filter'
  import {mapGetters} from 'vuex'


  //表格
  import pchartinput  from './form/input.vue'     // 单行文本
  import pcharttextarea  from './form/textarea.vue'  // 多行文本
  import pchartradio  from './form/radio.vue'     // 单选
  import pchartcheckbox  from './form/checkbox.vue'  // 复选
  import pchartupload  from './form/upload.vue'    // 上传文件
  import pchartdate  from './form/date.vue'      // 时间段
  import pcharttime  from './form/time.vue'      // 时间 (单点)

  //工单
  import sendForm from './work/sendForm.vue'
  import startContract from './work/startContract.vue'
  import sendFile from './work/sendFile.vue'
  import affirmFile from './work/affirmFile.vue'
  import requestFile from './work/requestFile.vue'
  import startPay from './work/startPay.vue'
  import sendNoti from './work/sendNoti.vue'



  export default{
    components: {
      pchartinput, pcharttextarea, pchartradio, pchartcheckbox, pchartupload, pchartdate, pcharttime,sendForm,startContract,sendFile,affirmFile,requestFile,startPay,sendNoti
    },
  	data(){
      return {
        stage: '',//阶段详情
        tickets:'',//工单
        list_form:'',//服务申请表单展示
        changeStep:false,//改变下一阶段状态
        auditsStatus:''//内审的状态
      }
    },
    created(){
      this.getImf()
      this.stageId  = this.$route.params.stage_id
    },
    computed:{
      ...mapGetters(["nextStep","closeState","projectStatus"]),
    },
    methods:{
    	//获取每个阶段的详情
      getImf(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id+'/stages/'+this.$route.params.stage_id
        ).then((res) => {
          this.stage = res.body.stage
          if(this.stage.status!='process'){
            this.$store.dispatch('closeState', true)
          }
          this.$store.dispatch('stageStatus', this.stage.status)
          this.tickets = res.body.stage.tickets
          if(res.body.stage.bind_form!=null){
            this.hasAnswer = true
            if(res.body.stage.bind_form.form_answer!= null){
              this.list_form = res.body.stage.bind_form.form_answer.content
              this.list_form.forEach(function (item, index) {
                if(item.type=='chartupload'){
                  item.answer.attachments = res.body.stage.bind_form.form_answer.attachments
                }else{
                  item.answer.attachments= []
                }
              })
            }else if(res.body.stage.bind_form.form_answer== null){
              this.list_form = res.body.stage.bind_form.provider_form.form.content
              this.list_form.forEach(function (item, index) {
              	item.answer={
                  date_value1:'',
                  date_value2:'',
                  input_value:'',
                  radio_value:'',
                  textarea_value:'',
                  time_value:'',
                  attachments:''
                }
              })
            }

          }else{
            this.hasAnswer = false
          }
          //获取内审状态
          if(this.stage.audits.length>0){
            var index = this.stage.audits.length-1
            this.auditsStatus = this.stage.audits[index].status
          }
        })

      },
      //开启下一步
      openStepNext(){
        this.$http.patch(API.url + 'projects/'+this.$route.params.id+'/stages/'+this.$route.params.stage_id+'/open',{}
        ).then((res) => {
          var item = true;
          item = !this.nextStep
          this.$store.dispatch('nextStep', item);
        },(error)=>{

        })
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      formatName(name){
        var str = '--';
        if(name != undefined && name != null && name.length>0) str = name;
        return str;
      },
    },
    watch: {
      '$route': 'getImf',
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .serviceApply {
    .revise-app {
      float: right;
      font-size: 14px;
      color: #3c8ced;
      vertical-align: top;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
      i, span {
        vertical-align: middle;
      }
    }
    .button-box {
      border-top: 1px solid #efefef;
      text-align: center;
      padding: 20px 0;
    }
    .complete-box{
      width:267px;
      height:311px;
      margin:auto;
    }
    .record {
      .header-item{
        height: 40px;
        border-left: 4px solid #3c8ced;
        background-color: #f5f5f5;
        vertical-align: middle;
        line-height: 40px;
        padding-left: 10px;
        font-size: 14px;
      }
      .nothing{
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        .icon-nothing {
          width:15px;
          height:16px;
        }
      }
      .re-item{
        overflow: hidden;
        margin-top: 12px;
        margin-bottom: 12px;
        div{
          float: left;
          display: inline-block;
          color: #5c5c5c;
          font-size:14px;
          &:first-child{
            margin-left: 20px;
            width: 20%;
          }
          &:nth-child(2){
            width: 30%;
          }
          &:last-child{
            margin-left: 10px;
            width:46%;
          }
        }
      }
      .operator-box{
        float: right;
        padding-right:19px;
        span{
          color: #5c5c5c;
          font-size:14px;
          vertical-align: middle;
        }
      }
      .icon-operator{
        display: inline-block;
        height:20px;
        width:20px;
        vertical-align: middle;
        background: url("../../../assets/images/project/contract.png") no-repeat;
      }
      .cover-box{
        ul{
          height:165px;
          width:100%;
          overflow-y: auto;
        }
      }
    }
    .not-upload{
      text-align: center;
      padding:22px 0;
    }
    .icon-notup{
      display: inline-block;
      width:14px;
      height:15px;
      background: url("../../../assets/images/gd_ico/not_upload.png") no-repeat;
      vertical-align: middle;
    }
    .finished {
      div{
        width: 267px;
        height: 311px;
        margin: auto;
        margin-top:30px;
      }
    }
    .audit-btn{
      margin-bottom:20px;
     .el-button{
       width:98px;
       height:38px;
       background: #3C8CED;
       border:none;
       -webkit-border-radius:2px;
       -moz-border-radius:2px;
       border-radius:2px;
     }
      .icon{
        display: inline-block;
        width:16px;
        height:16px;
        vertical-align: middle;
      }
      .icon-wait{
        background: url("../../../assets/images/project/wait.png") no-repeat;
      }
      .icon-verifying{
        height:17px;
        background: url("../../../assets/images/project/verifying.png") no-repeat;
      }
      .icon-refused{
        background: url("../../../assets/images/project/refused.png") no-repeat;
      }
      .icon-pass{
        background: url("../../../assets/images/project/pass.png") no-repeat;
      }
      .audit-mention{
        margin-left:10px;
      }
      .audit-state{
        font-size:14px;
        color: #5c5c5c;
        vertical-align: middle;
        cursor: default;
      }
    }
  }
</style>
