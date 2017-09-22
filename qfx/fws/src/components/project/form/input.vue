<template>
  <div class="form-apply">
    <div class="typeline">
      <div>
        <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
        <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
        <p class="beizhu">{{message.describe}}</p>
      </div>
      <input type="text" v-model="message.answer.input_value" @blur="input_blur" class="inputdic base_input" :disabled='isDisabled' v-if="showForm">
      <p class="beizhu css_color_1b" v-else>{{message.answer.input_value}}</p>
      <!--<div class="errormessage" v-show="show.error">请输入内容</div>-->
      <!--<div>{{checkShow}}</div>-->
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    props:['message','index','fix','hasAnswer'],
    data(){
      return{
        show:{
          error:false
        },
        user:{
          inputValue:''
        },
        yuandian:false,
        check:''
      }
    },
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      // 禁用状态  默认是禁用
      isDisabled(){
        var mark = true;
        if(this.hasAnswer){
          if(this.hasRoot && this.fix && this.isNotComplete && this.canOperation) mark = false;
        }else {// 没有答案
          if(this.hasRoot && this.isNotComplete && this.canOperation) mark = false;
        }
        return mark;
      },
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
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check'));
        if (this.check  == true) {
          this.yuandian = true
        }else{
          this.yuandian = false
        }
      },
      showForm(){
        if(this.hasAnswer){ // 有答案
          if(this.fix){ //点击修改
            return true;
          }else {
            return false;
          }
        }else { // 没有答案
          return true;
        }
      }
    },
    methods:{
      reSet(){
      },
      input_blur(){
        if (this.message.rules == 'required') {
          if (this.message.answer.input_value !== '') {
            this.show.error = false
          }else{
            this.show.error = true
          }
        }
      }
    }
  }
</script>
<!--全局的 -->
<style lang="scss" rel="stylesheet/scss">

  .am-secondary{
    margin-left: 0px;
  }

  .typeline {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    /*background-color: red;*/
    .leftshouru{
      color: #1b1b1b;
      font-size:14px;
      width: 100%;
    }
    //输入样式
    .base_input{
      /*background:no-repeat 0 0 scroll ＃EEEEEE;*/
      border:1px solid #ccc;
      width:600px;
      height:38px;
      line-height:36px;
      outline:medium;
      /*background:#ffffff;*/
      border-radius:3px;
      margin-left:19px;
      text-indent:.5em;
      margin-top:5px;
    }
    //文本域样式
    .base_textarea{
      height: 100px;
      width: 600px;
      resize: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-left:19px;
      padding:5px;
      margin-top:5px;
    }
    //单选多选样式
    .base_radio, .base_checkbox{
      vertical-align: middle;
      margin-top: -3px;
      margin-left: 19px;
    }
    //上传文件样式
    .compact_stage{
      width:700px;
      padding:30px 0;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-top: 10px;
      margin-left:19px;
    }
    span{
      /*font-family:MicrosoftYaHei;*/
      font-size:14px;
      /*color:#1b1b1b;*/
    }
    .css_color_1b{
      color: #1b1b1b !important;
    }
    .beizhu{
      font-size: 14px;
      color: #999;
      /*color: #1b1b1b;*/
      margin:5px 0;
      text-indent: 20px;
    }

    .upload-demo {
      width: 700px;
      text-align: center;
      .el-upload {
        width: 100%;
      }
      .el-upload-list{
        text-align: left;
        padding:0 100px;
        li{
          height:30px;
        }
      }
      .el-upload-dragger {
        width: 59%;
        height: 130px;
      }
    }
  }

</style>

<style lang="scss" rel="stylesheet/scss" scoped="">
  .typeline{




    /*background-color: red ;*/

    margin-top: 20px;
    position: relative;
    .block{
      margin-top: 20px;
    }
    .yuandian{
      position: absolute;
      left: -11px;
    }

    .upload-demo{
      width: 100%;
      .el-upload{
        width: 100%;
      }
      .el-upload-dragger{
        width: 59%;
        height: 130px;
      }
    }
  }

</style>


