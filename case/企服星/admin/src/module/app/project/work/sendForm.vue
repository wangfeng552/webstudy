<template>
  <div class="bgfff">
    <!--<p>对方处理中</p>-->
    <div class="gd-box" v-if="type=='one'">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">发送表单</span>
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
      </div>
    </div>
    <!--<p>对方处理中</p>-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">发送表单</span>
        <!--<div class="status bgf1b">-->
          <!--<i class="icon-status icon-having"></i>-->
          <!--<span>等待企业操作</span>-->
        <!--</div>-->
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
      </div>
    </div>
    <!--<p>已完成</p>-->
    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">企业信息调研</span>
        <div class="status bg55b">
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
        hasTicket: false,
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
