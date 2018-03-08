<template>
  <div class="serviceApply">
    <!--服务申请阶段-->
    <div v-if="stage && stage.category == 'apply' && stage.bind_form">
      <div class="gd-box" >
        <!--正在进行中-->
        <div class="title bgefe" v-if="stage.status=='process'">
          <i class="tit-fsbd02"></i>
          <span class="describe fc5c5">服务申请</span>
          <div class="status unactive-status">
            <i class="icon-status icon-wait02"></i>
            <span>服务商确认中</span>
          </div>
        </div>
        <!--已经完成-->
        <div class="title bg55b" v-if="stage.status=='complete'">
          <i class="tit-fsbd01"></i>
          <span class="describe fcfff">服务申请</span>
          <div class="status">
            <i class="icon-status icon-yes"></i>
            <span>已完成</span>
          </div>
        </div>
        <!--被拒绝-->
        <div class="title bge65" v-if="stage.status=='stop'||stage.status=='deny'">
          <i class="tit-fsbd01"></i>
          <span class="describe fcfff">服务申请</span>
          <div class="status">
            <i class="icon-status icon-refuse"></i>
            <span>项目拒绝</span>
          </div>
        </div>
        <div class="revise-app" v-if="stage.status=='process'&& stage.update_apply_form">
          <i class="icon icon_fix"></i> <span @click="fix=!fix">修改申请表</span>
        </div>
        <div class="apply-ticket">
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
        </div>
        <div class="button-box" v-if="fix">
          <el-button type="primary" @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="onTest"   v-loading.fullscreen="fullscreenLoading">提交</el-button>
        </div>

      </div>
    </div>

    <!--工单阶段-->
    <div v-for="(item,index) in tickets">
        <!--发送合同 只有在合同阶段有-->
        <startContract v-if="item.category == 'contract'"
                       :type="item.status"
                       :index="index"
                       :ticket="item"
                       :applyYear="applyYear"
                       v-on:reloadImf="getImf"
        >
        </startContract>

        <!--文件确认-->
        <affirmFile v-if="item.category == 'affirm'"
                    :type="item.status"
                    :index="index"
                    :ticket="item"
                    v-on:reloadImf="getImf"
        >
        </affirmFile>

        <!--发送文件-->
        <sendFile v-if="item.category == 'transmit'"
                  :type="item.status"
                  :ticket="item"
                  :index="index"
                  v-on:reloadImf="getImf"
        >
        </sendFile>

        <!--发送通知-->
        <sendNoti v-if="item.category == 'notify'"
                  :type="item.status"
                  :index="index"
                  :ticket="item"
        >
        </sendNoti>

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

        <!--索要文件-->
        <requestFile v-if="item.category == 'demand'"
        :type="item.status"
        :index="index"
        :ticket="item"
        v-on:reloadImf="getImf"
        ></requestFile>

         <!--发送表单-->
        <sendForm v-if="item.category == 'sendform'"
        :ticket="item"
        :index="index"
        :type="item.status"
        v-on:reloadImf="getImf"
        ></sendForm>

      </div>

    <!--项目完成阶段-->
    <div v-if="stage.category == 'finished'" class="finished">
      <div class="complete-box">
        <img src="../../../assets/images/gd_ico/xmwc.png" alt="">
      </div>
    </div>

    <!--操作记录-->
    <div class="record" v-if="stage.category!='finished'">
      <div class="header-item">
        <span>操作记录</span>
        <!--<div class="operator-box" v-if="stage.operate_name!=null">-->
          <!--<i class="icon-operator"></i>-->
          <!--<span>{{stage.name}}阶段负责人：{{stage.operate_name}} | {{stage.operate_phone}}</span>-->
        <!--</div>-->
      </div>
      <div v-if="stage.customer_stage_logs && stage.customer_stage_logs.length >0" class="cover-box scroll-beauty" @mouseover="scrollShow" @mouseleave="scrollHide" :class="{'scrollHidden':srollActive}">
        <ul>
          <li v-for="v in stage.customer_stage_logs" class="re-item" v-if="v.operate_name!=null">
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

    <!--操作人员变更弹框-->
    <div class="person-change-dia">
      <el-dialog
        :visible.sync="dialogVisible"
        size="tiny"
        :close-on-click-modal="false"
        :before-close="showOnce"
      >
        <div class="person-content" v-html="operatorImf">

        </div>
        <div class="btn-box">
          <el-button type="primary" @click="showOnce">我知道了</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {formatDate,currency} from 'assets/js/filter'
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
  import startContract from './work/startContract.vue'
  import affirmFile from './work/affirmFile.vue'
  import sendFile from './work/sendFile.vue'
  import sendNoti from './work/sendNoti.vue'
  import startPay from './work/startPay.vue'
  import sendForm from './work/sendForm.vue'
  import requestFile from './work/requestFile.vue'

  export default{
    components: {
      pchartinput,
      pcharttextarea,
      pchartradio,
      pchartcheckbox,
      pchartupload,
      pchartdate,
      pcharttime,
      //工单
      startContract,
      affirmFile,
      sendFile,
      sendNoti,
      startPay,
      sendForm,
      requestFile
    },
    data(){
      return {
        labelPosition: 'top',
        stage: '',
        tickets: '',
        list_form: '',
        fix: false,
        hasAnswer:'',
        fullscreenLoading:false,//loading
        dialogVisible:false,//操作人员变更相关
        operatorImf:'',//操作人员变更信息
        applyYear:false,//合同阶段申报年份
        srollActive:true,//操作记录的滚动条显示状态
      }
    },
    created(){
      this.getImf()
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

    computed:{
      ...mapGetters(["action"]),
      askResponce(){
        if(this.action){
         this.getImf()
        }
      }
    },
    methods: {
      getImf(){
        this.$http.get(API.url + 'customer/projects/' + this.$route.params.id + '/stages/' + this.$route.params.stage_id
        ).then((res) => {
          this.stage = res.body.stage
          this.tickets = res.body.stage.tickets
          if(res.body.stage.bind_form!=null){
          	this.hasAnswer = true
            if(res.body.stage.bind_form.form_answer!= null){
              this.list_form = res.body.stage.bind_form.form_answer.content
              this.list_form.forEach(function (item, index) {
                item.error = false
                if(item.type=='chartupload'){
                  item.answer.attachments = res.body.stage.bind_form.form_answer.attachments
                }else{
                  item.answer.attachments= []
                }
              })
            }else{
              this.hasAnswer = false
              this.list_form = res.body.stage.bind_form.provider_form.form.content
              this.list_form.forEach((item)=> {
                item.answer = {
                  input_value: "",
                  textarea_value: "",
                  radio_value: "",
                  check_value: [],
                  date_value1: "",
                  date_value2: "",
                  time_value: ""
                }
                item.answer.attachments = []
                item.error = false
              })
            }
          }else{
          	this.hasAnswer = false
          }
          //获取操作人员变更信息
          this.getOpeChange()
          //判断申报年份
         if(this.stage.op_settings!=undefined&&this.stage.op_settings.year!=undefined&&this.stage.op_settings.year==true){
           this.applyYear = true
         }else{
           this.applyYear = false
         }

        })
      },
      //获取操作人员变更信息
      getOpeChange(){
        var tip  = this.stage.tip
        if(tip==1){
          this.dialogVisible = true
          this.operatorImf = '项目进入新的阶段，目前由'+'<span class="fc3c8">'+this.stage.operate_name+'</span>'+'为你服务。我们重视每个阶段的细节，为你创造更多价值。'
        }else if(tip==2){
          this.dialogVisible = true
          this.operatorImf = '由于我司内部人员岗位发生变动，已将当前的阶段负责人变更为'+'<span class="fc3c8">'+this.stage.operate_name+'</span>'+'。人员在变，贴心、专业的服务始终不变。'
        }else if (tip ==0){
          this.dialogVisible = false
        }
      },

      //判断是否非空
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      //取消答案
      cancelForm(){
        this.fix = false;
        this.getImf()
      },

      //提交表单
      onTest(){
        //判断表单验证过了没
        var validComponent;
        var arr = [];
        this.$refs.showMessage.forEach((v)=>{
          arr.push(v.showError())
        })
        // 再循环下arr
        validComponent = arr.every((v)=>{
          return (v == true)
        })
        var arra = []
        this.list_form.forEach(function (item, index) {
          arra.push(item.error)
        })
        var str = arra.join('')
        var isPass = str.indexOf("true")

        if(isPass<0){
          this.postAnswer()
        }
      },
      postAnswer(){
        var fd = new FormData();
        this.fullscreenLoading = true
//        fd.append("bind_form_id",this.tickets.bind_form.id);
        var that = this;
        this.list_form.forEach(function (item,index){
          fd.append("items[][title]", item.title);
          fd.append("items[][type]", item.type);
          fd.append("items[][describe]", item.describe);
          item.value.forEach(function (val,mark) {
            fd.append("items[][value][]", val); // array
          })
          item.rules.forEach(function (val,mark) {
            fd.append("items[][rules][]", val); // array
          })
          item.values.forEach(function (val,mark) {
            fd.append("items[][values][]", val); // array
          })
          // 主要 下面的两个
          // 问题的答案 answer
          fd.append("items[][answer][input_value]", item.answer.input_value);  // array
          fd.append("items[][answer][textarea_value]", item.answer.textarea_value);
          fd.append("items[][answer][radio_value]", item.answer.radio_value);
          fd.append("items[][answer][date_value1]", item.answer.date_value1);
          fd.append("items[][answer][date_value2]", item.answer.date_value2);
          fd.append("items[][answer][time_value]", item.answer.time_value);
          if(!that.isEmpty(item.answer.check_value)){
            item.answer.check_value.forEach(function (obj6,index6) {
              fd.append("items[][answer][check_value][]", obj6);
            })
          }

          if(!that.isEmpty(item.answer.attachments)){
            item.answer.attachments.forEach(function (obj,index1) {
              if(obj.id != undefined && obj.id != null && obj.id > 0){  // 有id 说明是之前的就有的上传
                fd.append("attachments[][id]", obj.id);
                if(obj.name != undefined && obj.name != null && obj.name.length > 0){
                  fd.append("attachments[][name]", obj.name);
                }
                fd.append("attachments[][index]",index);
              }else {  // 没有id ，就是新的
                if(obj.name != undefined && obj.name != null && obj.name.length > 0){
                  fd.append("attachments[][name]", obj.name);
                }
                fd.append("attachments[][index]",index);
                fd.append("attachments[][file]", obj.raw);
              }
//              if(obj.name != undefined && obj.name != null && obj.name.length > 0){
//                fd.append("attachments[][name]", obj.name);
//              }
//              fd.append("attachments[][index]",index);
            })
          }
        })
        this.$http.put(API.url + 'customer/stages/' + this.$route.params.stage_id+'/form', fd
        ).then((res) => {
          this.fix = false
          this.fullscreenLoading = false
          this.getImf()
        }, (error) => {
          this.showMessage("warning", "请求失败");
        })
      },
      //当变更操作者提示框出现时，关闭发送请求
      showOnce(){

         this.$http.patch(API.url+'customer/stages/'+this.$route.params.stage_id+'/tip').then((res)=>{
           this.dialogVisible = false
         })
      },

      //操作记录的滚动条显示和隐藏
      scrollShow(){
      	this.srollActive = false
      },
      scrollHide(){
      	this.srollActive = true
      }
    },
    watch: {
      "$route": "getImf",
      action(curVal,oldVal){
      	this.getImf();
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .serviceApply {
    width:933px;
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
      margin-left:226px;
      margin-top:105px;
    }
    .record {
      margin-bottom:50px;
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
          font-size:12px;
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
          height:145px;
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
    .apply-ticket{
      padding:0 20px;
    }
  }
</style>
<!--人员变更弹框样式-->
<style lang="scss" rel="stylesheet/scss">
  .person-change-dia{
    .el-dialog--tiny{
      width:548px;
      height:398px;
      background: url("../../../assets/images/project/person-change.png") no-repeat;
      box-shadow: none;
      -webkit-border-radius:0;
      -moz-border-radius:0;
      border-radius:0;
    }
    .el-dialog__headerbtn .el-dialog__close{
      height:43px;
      width:44px;
      background: url("../../../assets/images/project/i-pc-close.png") no-repeat;
      margin-right:-21px;
      margin-top:9px;
    }
    .el-icon-close:before{
      content: '';
    }
    .el-dialog__body{
      margin-top:200px;
      padding:0;
    }
    .person-content{
      width:448px;
      font-size:14px;
      color:#5c5c5c;
      margin:auto;
    }
    .btn-box{
      margin-top:46px;
      text-align: center;
      .el-button--primary{
        background:#3c8ced;
        border-radius:4px;
        width:98px;
        height:38px;
      }
    }

  }
</style>
