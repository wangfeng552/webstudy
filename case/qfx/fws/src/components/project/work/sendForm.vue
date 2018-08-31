<template>
  <div class="bgfff">

    <!--观察者视角 start=========================-->

    <div class="gd-box" v-if="type=='one' && !hasRoot">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="input-item">
          <div class="chooose-file clearfix">
            <p class="not-upload">
              <i class="icon-notup"></i>
              <span>等待操作者发起表单</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--观察者视角 end=========================-->

    <div class="gd-box" v-if="type=='zero'">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="top-title describe">
        <el-input  v-if="currentProject.source=='online'"  placeholder="发送表单" v-model="ticket.title" :disabled='isDisabled'></el-input>
          <span v-else>{{ticket.title}}</span>
        </span>
      </div>
      <div class="content">
        <div class="input-item">
          <div class="chooose-file clearfix">
            <div  class="file-list">
              <ul>
                <li v-if="ticket.bind_form && ticket.bind_form.name">
                  <i class="icon-file icon-doc"></i>
                  <span class="name">{{ticket.bind_form.name}}</span>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="changeSendFormDelete"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket.bind_form && ticket.bind_form.name"></p>
            <div class="tit clearfix"  v-if="hasRoot && isNotComplete && canOperation">
              <div class="fl">
                <el-button type="text" v-if="!twice" class="upload-btn" @click="showChooseForm">请选择表单</el-button>
                <el-button type="text"  v-if="twice" class="upload-btn" @click="showChooseForm">更换表单</el-button>
              </div>
              <!--<div class="fl">请选择文件库中需要企业确认的文件</div>-->
            </div>
          </div>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
               <el-button @click='changeEventCancelStage'>取消</el-button>
            </span>
            <span class="custom-btn-comfirm">
            <el-button type="primary"
                       v-if="hasRoot && isNotComplete && canOperation"
                       @click="changeSendFormSentOther">{{stringSentToCompany | filterStringSentToCompany(currentProject)}}</el-button>
          </span>
          </div>
        </div>
      </div>
    </div>
    <!--<p>发送表单</p>-->
    <div class="gd-box" v-if="type=='one' && hasRoot">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="input-item">
          <div class="chooose-file clearfix">
            <div  class="file-list">
              <ul>
                <li v-if="ticket.bind_form && ticket.bind_form.name">
                  <i class="icon-file icon-doc"></i>
                  <span class="name">{{ticket.bind_form.name}}</span>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="changeSendFormDelete"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket.bind_form && ticket.bind_form.name"></p>
            <div class="tit clearfix" v-if="hasRoot && isNotComplete && canOperation">
              <div class="fl">
                <el-button type="text"  class="upload-btn" @click="showChooseForm" v-if="!once">请选择表单</el-button>
                <el-button type="text"  class="upload-btn" @click="showChooseForm" v-if="once">更换表单</el-button>
              </div>
              <!--<div class="fl">请选择文件库中需要企业确认的文件</div>-->
            </div>
          </div>
          <p class="grey-border" v-if="hasRoot && isNotComplete && canOperation"></p>
          <div class="btn-box" v-if="hasRoot && isNotComplete && canOperation">
            <!--<span class="custom-btn">-->
            <!--<el-button>取消</el-button>-->
            <!--</span>-->
            <el-button type="primary"  @click="changeSendFormSentOther">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<p>对方处理中</p>-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation" @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">表单名称<span v-if="hasRoot && isNotComplete && canOperation && !fix" class="fr fc3c8 cp" @click="fix = !fix">填写表单</span></p>
        <p class="grey-border"></p>
        <div class="form-box">

          <template v-if="currentProject.source=='online'">
            <component v-for="(item,i) in list_form"
                       :key="i" :message="item"
                       :index="i"
                       :is="'p' + item.type"
                       :fix="fix"
                       @changeFormDeleteAttchmentsSuccessful="changeFormDeleteAttchmentsSuccessful"
                       :hasAnswer="hasAnswer"></component>
          </template>
          <template v-else>
            <component v-for="(item,i) in list_form"
                       :key="i" :message="item"
                       :index="i"
                       :is="'p' + item.type"
                       :fix="fix"
                       @changeFormDeleteAttchmentsSuccessful="changeFormDeleteAttchmentsSuccessful"
                       :hasAnswer="hasAnswerOffline"></component>
          </template>
          <div class="view_footer" v-if="showFooter">
            <div class="two">
              <div>
                <el-button type="primary"
                           v-if="hasRoot && isNotComplete && canOperation"
                           :disabled='disabledCancelBtn'
                           @click="cancelFix">取消</el-button>
              </div>
              <div>
                <el-button type="primary"
                           v-if="hasRoot && isNotComplete && canOperation"
                           @click="changeSendFormCommit">提交</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<p>已完成</p>-->
    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已完成</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">表单名称<span v-if="hasRoot && isNotComplete && canOperation && !fix" class="fr fc3c8 cp" @click="clickFix">修改表单</span></p>
        <p class="grey-border"></p>
        <div class="form-box">
          <template v-if="currentProject.source=='online'">
            <component v-for="(item,i) in list_form"
                       :key="i" :message="item"
                       :index="i"
                       :is="'p' + item.type"
                       :fix="fix"
                       ref="ref_form_work"
                       @changeFormDeleteAttchmentsSuccessful="changeFormDeleteAttchmentsSuccessful"
                       :hasAnswer="hasAnswer"></component>
          </template>
          <template v-else>
            <component v-for="(item,i) in list_form"
                       :key="i" :message="item"
                       :index="i"
                       :is="'p' + item.type"
                       :fix="fix"
                       ref="ref_form_work"
                       @changeFormDeleteAttchmentsSuccessful="changeFormDeleteAttchmentsSuccessful"
                       :hasAnswer="hasAnswerOffline"></component>
          </template>

          <div class="view_footer" v-if="showFooter">
            <div class="two">
              <div>
                <el-button type="primary"
                           v-if="hasRoot && isNotComplete && canOperation"
                           :disabled='disabledCancelBtn'
                           @click="cancelFix">取消</el-button>
              </div>
              <div>
                <el-button type="primary"
                           v-if="hasRoot && isNotComplete && canOperation"
                           @click="changeSendFormCommit">提交</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--显示弹框 选择表单-->
    <el-dialog
      title="选择表单"
      :visible.sync="dialogForm"
      size="tiny">
      <!--自定义内容嵌入table-->
      <el-table
        ref="singleTable"
        :data="provider_forms"
        highlight-current-row
        height=356
      @row-click="clickRow"
      style="width: 100%">
      <el-table-column
        property="name"
        label="表单名称"
        min-width="200">
      </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogForm = false">取 消</el-button>
    <el-button type="primary" @click="confirmForm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

  import {mapGetters} from 'vuex'
  import pchartinput  from 'components/project/form/input.vue'     // 单行文本
  import pcharttextarea  from 'components/project/form/textarea.vue'  // 多行文本
  import pchartradio  from 'components/project/form/radio.vue'     // 单选
  import pchartcheckbox  from 'components/project/form/checkbox.vue'  // 复选
  import pchartupload  from 'components/project/form/upload.vue'    // 上传文件
  import pchartdate  from 'components/project/form/date.vue'      // 时间段
  import pcharttime  from 'components/project/form/time.vue'      // 时间 (单点)

  export default {
    components:{
      pchartinput,pcharttextarea,pchartradio,pchartcheckbox,pchartupload,pchartdate,pcharttime
    },
    props: ['type','ticket','index','provider_forms'],
    data() {
      return {
        stringSentToCompany:'发送给企业',
        list_form_copy:null,
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        radio: '',
        radio1: '',
        radio2: '',
        modify:false,//修改表单
        dialogForm:false,
        currentRow: null,
        hasAnswer:true, //线上
        hasAnswerOffline:false, //线下，只需要关是否真正有答案
        fix:false,
        once:true,
        twice:false
      };
    },
    watch:{
      ticket(curVal,oldVal){
        this.fix = false;
        //线下，默认fix 第一次为 true
        if(this.currentProject.source =='offline' && this.hasAnswerOffline == false)  this.fix = true;
      },
      // 因为 watch 的执行 在 list_form 属性之后，执行顺序的问题
      hasAnswerOffline(curVal,oldVal){
        if(this.currentProject.source =='offline'){
          this.fix = !curVal;
        }
      },
    },
    filters:{
      filterStringSentToCompany(val,currentProject){
        if (currentProject.source == 'online')  return  '发送给企业';
        else return ' 确  定 ';
      }
    },
    //计算属性wq
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      disabledCancelBtn(){
        if(this.currentProject.source =='offline' && this.hasAnswerOffline == false) return true;
        return false;
      },
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      ticket_ji(){
        var item = this.ticket;
        if(this.isEmpty(item.attachments)){
          item.attachments = [];
        }
        if(this.isEmpty(item.title)){
          item.title = "确认文件";
        }
        if(this.isEmpty(item.content)){
          item.content = "";
        }
        if(this.isEmpty(item.bind_form)){
          item.bind_form = {};
        }
        return item;
      },
      //是否可以操作 整个项目 停止 或则 关闭 返回 false
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },

      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      },
      showFooter(){
        if(this.currentProject.source=='online'){
          if(this.hasAnswer){ // 有答案
            if(this.fix){return true}else {return false}
          }else { // 没有答案
            return true;
          }
        }else {
          if(this.hasAnswerOffline){ // 有答案
            if(this.fix){return true}else {return false}
          }else { // 没有答案
            return true;
          }
        }
      },
      // 1. 检查是否有答案，有答案，拿到对应答案的部分填进去。
      // 2.没有答案，拿到题目（需要将空的答案的字段补上去）
      list_form(){
        this.hasAnswerOffline = false; //没有答案
        var list = [];
//        this.fix = false; // 只要數據源有变化，那么就重新来过
        if(!this.isEmpty(this.ticket.bind_form)){
          if(!this.isEmpty(this.ticket.bind_form.form_answer)){ //有答案
            list = this.ticket.bind_form.form_answer.content;
            // 处理附件
            if(!this.isEmpty(this.ticket.bind_form.form_answer.attachments)){ //有附件
              var that = this;
              this.ticket.bind_form.form_answer.attachments.forEach(function (item9,index9) {
                // 检查 index 放到对应的里面
                var att = list[item9.index];
                if(that.isEmpty(att.answer.attachments)){
                  att.answer.attachments = [];
                }
//                att.answer.attachments = [];
//                att.answer.attachments.push(item9);
                // 需要排除，一样的东西文件
                var mark = true;
                att.answer.attachments.forEach(function (obj4,index4) {
                  if(obj4.name == item9.name) mark = false;
                })
                if(mark) {
                  att.answer.attachments.push(item9);
                }
              })
            }else { //没有附件
              // 没有附件 ,检查里面的 item 当type = chartupload 加att
              list.forEach(function (obj8,index8) {
                obj8.answer.attachments = [];
              })
            }
            //最后 == 所有的answer 全部加附件，防止有些没有加上
            list.forEach(function (obj3,index8) {
              if(obj3.answer.attachments == undefined || obj3.answer.attachments == null){
                obj3.answer.attachments = [];
              }
              if(obj3.answer.check_value == undefined || obj3.answer.check_value == null){
                obj3.answer.check_value = [];
              }
            })
          }else { //没有答案
            list = this.ticket.bind_form.provider_form.form.content;
            //统一加上 答案的字段
            if(this.isEmpty(list.answer)){
              list.forEach(function (item,index) {
                item.answer={
                  input_value:"",
                  textarea_value:"",
                  radio_value:"",
                  check_value:[],
                  date_value1:"",
                  date_value2:"",
                  time_value:""
                }
                item.answer.attachments=[]
              })
            }
          }
        }
        //判断是否有答案
        for(var i=0;i<list.length;i++){
          var item = list[i];
          if(!this.isEmpty(item.answer)){
            if(!this.isEmpty(item.answer.attachments) && item.answer.attachments.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.input_value) && item.answer.input_value.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.textarea_value) && item.answer.textarea_value.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.radio_value) && item.answer.radio_value.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.check_value) && item.answer.check_value.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.date_value1) && item.answer.date_value1.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.date_value2) && item.answer.date_value2.length>0){
              this.hasAnswerOffline = true;
              break;
            }
            if(!this.isEmpty(item.answer.time_value) && item.answer.time_value.length>0){
              this.hasAnswerOffline = true;
              break;
            }
          }
        }
        return list;
      }
    },
    mounted(){
      //检查是否需有有titile
//      if(this.isEmpty(this.ticket.title) || this.ticket.title.length < 1) this.ticket.title = '发送表单';
      if(this.isEmpty(this.ticket.title)){
        this.$set(this.ticket,'title','发送表单');
      }else if(this.ticket.title.length < 1){
        this.ticket.title = '发送表单';
      }
      // 预设 表单若有表单，自动发送
      if( this.type == 'one' && !this.isEmpty(this.ticket.bind_form) && !this.isEmpty(this.ticket.bind_form.name)){
        if(this.hasRoot && this.canOperation && this.isNotComplete && this.currentProject.source=='online'){
          this.changeSendFormSentOther();
        }
      }

    },
    methods:{
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      // 点击取消按钮
      cancelFix(){
        // 检查是否有正在上传(直接调用的是父组件的方法) !!!! 主要父类方法中
        if(this.$parent.hasOwnProperty('checkIsUploadingInForm')){
          if(this.$parent.checkIsUploadingInForm(this.list_form)) return;
        }
        if(this.currentProject.source=='offline'){
          if(!this.hasAnswerOffline) return;
        }
        this.fix = false;
        if(!this.isEmpty(this.list_form_copy)){
          this.ticket.bind_form.form_answer = this.clearParams(this.list_form_copy);
          // 调用组建里面的方法，自己清空
          var that = this;
          this.$refs.ref_form_work.forEach((form,index)=>{
            form.reSet(that.list_form[index].answer);
          })
        }
        // 注意此处 用法比较奇葩 , 主要是改变 form_answer 的值，从而触发 list_form 计算属性的重新计算
        if(this.isEmpty(this.list_form_copy) &&this.isEmpty(this.ticket.bind_form.form_answer)){
          this.ticket.bind_form.form_answer = {};
          this.ticket.bind_form.form_answer = null;
        }

        this.list_form_copy = null;
      },
      clickFix(){
        this.fix = !this.fix;
        if(this.fix){
          //先复制
          this.list_form_copy = this.clearParams(this.ticket.bind_form.form_answer);
        }else {
          this.list_form_copy = null;
        }
      },
      // 点击确定
      commitForm(){
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      //发送表单
      changeSendFormSentOther(){
        this.ticket.content="";
        this.$emit('changeSendFormSentOther',this.type,this.index,this.ticket);
      },
      //点击提交 changeSendFormCommit
      changeSendFormCommit(){
        this.$emit('changeSendFormCommit',this.type,this.index,this.ticket,this.list_form);
      },
      //移除当前的表单
      removeCurrentFormItem(){
      },
      //显示弹框，选择表单
      showChooseForm(){
        this.dialogForm = true;
        this.currentRow = null;
      },
      // 点击确定
      confirmForm(){
        this.once = true
        this.twice = true
        this.dialogForm = false;
        this.ticket.bind_form =  this.cloneObj(this.currentRow);
        this.ticket.bind_form.provider_form_id = this.ticket.bind_form.id;
        this.currentRow = null;
      },
      clickRow(row, event, column){
        this.currentRow = row;
      },
      changeStageDelete(){
        this.$confirm('确认是否撤销?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('changeStageDelete',this.type,this.index,this.ticket);
        }).catch(() => {
        });
      },
      changeSendFormDelete(){
        this.once = false
        this.twice = false
        this.ticket.bind_form = {};
//        if(item.id == undefined || item.id == null || item.id <0){ //直接删除
//          this.ticket.scan_contract_attachments.splice(index,1);
//        }else { //需要做网络请求去删除
//          this.$emit('changeStartContractDeleteScan',this.type,this.index,this.ticket,item);
//        }
      },
      //文件删除成功，需要把copy的重新复制一遍
      changeFormDeleteAttchmentsSuccessful(file){
        // 此处是为了解决bug
        var mark = -100;
        this.ticket.bind_form.form_answer.attachments.forEach(function (item,index) {if(item.id == file.id) mark = index; })
        if (mark >= 0) this.ticket.bind_form.form_answer.attachments.splice(mark,1);
        // 去除 content 中的 attachments
        var content =  this.ticket.bind_form.form_answer.content[file.index];
        mark = -100;
        content.answer.attachments.forEach(function (item,index) {  if(item.id == file.id) mark = index; })
        if (mark >= 0)  content.answer.attachments.splice(mark,1);


        if(this.fix){
          //先复制
          var mark = -100;
          this.list_form_copy.attachments.forEach(function (item,index) { if(item.id == file.id) mark = index;})
          if (mark >= 0)this.list_form_copy.attachments.splice(mark,1);
          // 去除 content 中的 attachments
          var content =  this.list_form_copy.content[file.index];
          mark = -100;
          content.answer.attachments.forEach(function (item,index) { if(item.id == file.id) mark = index; })
          if (mark >= 0)content.answer.attachments.splice(mark,1);
        }else {
          this.list_form_copy = null;
        }
      },

      // 拷贝对象  深拷贝
      cloneObj: function (obj) {
        var o, i, j, k;
        if (typeof(obj) != "object" || obj === null)return obj;
        if (obj instanceof (Array)) {
          o = [];
          i = 0;
          j = obj.length;
          for (; i < j; i++) {
            if (typeof(obj[i]) == "object" && obj[i] != null) {
              o[i] = arguments.callee(obj[i]);
            }
            else {
              o[i] = obj[i];
            }
          }
        }
        else {
          o = {};
          for (i in obj) {
            if (typeof(obj[i]) == "object" && obj[i] != null) {
              o[i] = arguments.callee(obj[i]);
            }
            else {
              o[i] = obj[i];
            }
          }
        }
        return o;
      },
    }
  }
</script>
<!--全局的-->

<style lang="scss" rel="stylesheet/scss" scoped>

  .custom-btn-right{
    .el-button{
      /*color: #4096ff;*/
      /*border-color: #4096ff;*/
      /*height:33px;*/
      width:97px;
    }
  }


  .view_footer{
    border-top: 1px solid #efefef;
    padding-bottom: 10px;
    padding-top: 10px;
    .one {
      margin: 0 auto;
      width: 100px;
      margin-top: 5px;
    }
    .two{
      overflow: hidden;
      margin: 0 auto;
      width: 300px;
      margin-top: 5px;
      >div{
        float: left;
        &:last-child{
          float: right;
        }
      }
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  .choose_form_content {
    span {
      display: inline-block;
      margin-left: 10px;
      margin-top: 15px;
    }
    height: 40px;
    /*font-family:MicrosoftYaHei;*/
    font-size:14px;
    color:#1b1b1b;
    line-height:14px;
    text-align:left;
    .flie_item {
      margin-bottom:0px !important;
      height: auto!important;
      margin-left: 20px;
      margin-right: 30px;
      > span:nth-child(2){
        /*font-family:MicrosoftYaHei;*/
        font-size:14px;
        color:#1b1b1b;
        line-height:14px;
        text-align:left;
      }
      > span:nth-child(3){
        margin-left: 100px;
        /*font-family:MicrosoftYaHei;*/
        font-size:14px;
        color:#5c5c5c;
        text-align:left;
      }
      > span:last-child{
        float: right;
      }
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  .el-table tr{
    cursor: pointer;
  }
</style>
