<template>
  <div class="bgfff">
    <!--<p>对方处理中</p>-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title bgf1b">
        <i class="tit-fsbd01"></i>
        <span class="describe fcfff">发送表单</span>
        <div class="status ">
          <i class="icon-status icon-having"></i>
          <span>等待处理</span>
        </div>
      </div>
      <div class="content">
        <div class="form-box">
          <component v-for="(item,i) in  list_form"
                     :key="i" :message="item"
                     :index="i"
                     :is="'p' + item.type"
                     :hasTicket="hasTicket"
                     :type="type"
                     ref="showMessage"
          ></component>
        </div>
        <div class="button-box">
          <el-button type="primary" @click="onTest" v-loading.fullscreen="fullscreenLoading">提交</el-button>
        </div>
      </div>
    </div>
    <!--<p>已完成</p>-->
    <div class="gd-box" v-if="type=='three'">
      <div class="title bg55b">
        <i class="tit-fsbd01"></i>
        <span class="describe fcfff">企业信息调研</span>
        <div class="status">
          <i class="icon-status icon-yes"></i>
          <span>已完成</span>
        </div>
      </div>
      <div class="content">
        <div class="form-box">
          <component v-for="(item,i) in show_form"
                     :key="i" :message="item"
                     :index="i"
                     :is="'p' + item.type"
                     :hasTicket="hasTicket"
                     :type="type"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'

  import pchartinput  from '../form/input.vue'     // 单行文本
  import pcharttextarea  from '../form/textarea.vue'  // 多行文本
  import pchartradio  from '../form/radio.vue'     // 单选
  import pchartcheckbox  from '../form/checkbox.vue'  // 复选
  import pchartupload  from '../form/upload.vue'    // 上传文件
  import pchartdate  from '../form/date.vue'      // 时间段
  import pcharttime  from '../form/time.vue'      // 时间 (单点)

  export default {
    components: {
      pchartinput, pcharttextarea, pchartradio, pchartcheckbox, pchartupload, pchartdate, pcharttime
    },
    props: ['type', 'ticket', 'index'],
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        radio: '',
        radio1: '',
        radio2: '',
        modify: false,//修改表单
        dialogForm: false,
        currentRow: null,
        hasTicket: false,
        fullscreenLoading:false,
        list_form:'',
        show_form:''
      };
    },
    watch:{
      ticket(curVal,oldVal){
       this.getImf()
      }
    },
    created(){
    	this.getImf()
    },
    methods: {
    	getImf(){
    		if(this.ticket.bind_form.form_answer!=null){
    			this.hasTicket = true
          this.show_form = this.ticket.bind_form.form_answer.content
          this.show_form.forEach((item)=>{
            item.answer.attachments = this.ticket.bind_form.form_answer.attachments
          })
        }else{
    			this.hasTicket = false
        }
    		if(this.ticket.bind_form.provider_form!=null){
    			this.hasTicket = true
          this.list_form = this.ticket.bind_form.provider_form.form.content
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
        }else{
    			this.hasTicket = false
        }
      },
      //判断非空
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
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
        console.log(this.ticket.bind_form.id)
        fd.append("bind_form_id",this.ticket.bind_form.id);
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
            })
          }
        })
        this.$http.post(API.url + 'customer/stages/' + this.$route.params.stage_id+'/tickets/'+this.ticket.id+'/form', fd
        ).then((res) => {
          this.fullscreenLoading = false
          this.getImf()
          this.$emit('reloadImf')
        }, (error) => {
          this.showMessage("warning", "请求失败");
        })
      }
    }
  }
</script>
<!--全局的-->

<style lang="scss" rel="stylesheet/scss" scoped>

  .view_footer {
    border-top: 1px solid #efefef;
    padding-bottom: 10px;
    padding-top: 10px;
    .one {
      margin: 0 auto;
      width: 100px;
      margin-top: 5px;
    }
    .two {
      overflow: hidden;
      margin: 0 auto;
      width: 300px;
      margin-top: 5px;
      > div {
        float: left;
        &:last-child {
          float: right;
        }
      }
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  .button-box {
    border-top: 1px solid #efefef;
    text-align: center;
    padding: 20px 0;
  }
  .choose_form_content {
    span {
      display: inline-block;
      margin-left: 10px;
      margin-top: 15px;
    }
    height: 40px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #1b1b1b;
    line-height: 14px;
    text-align: left;
    .flie_item {
      margin-bottom: 0px !important;
      height: auto !important;
      margin-left: 20px;
      margin-right: 30px;
      > span:nth-child(2) {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #1b1b1b;
        line-height: 14px;
        text-align: left;
      }
      > span:nth-child(3) {
        margin-left: 100px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #5c5c5c;
        text-align: left;
      }
      > span:last-child {
        float: right;
      }
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  .el-table tr {
    cursor: pointer;
  }
</style>
