<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
    <textarea v-model="message.answer.textarea_value" @blur="input_blur" class="base_textarea" v-if="showForm" :disabled='isDisabled'>
		</textarea>

    <template v-else>
      <p class="beizhu css_color_1b" v-for="val in list_value">{{val}}</p>
    </template>

    <!--<p class="beizhu css_color_1b" v-else>{{message.answer.textarea_value}}</p>-->
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: 'textarea',
    props:['message','index','fix','hasAnswer'],
    mounted(){
      if(this.message.answer.textarea_value.length>0){
        this.textarea_value = this.message.answer.textarea_value;
      }else {
        this.textarea_value = "";
      }
    },
    data(){
      return{
        show:{
          error:false
        },
        user:{
          inputValue:''
        },
        yuandian:false,
        check:'',
        textarea_value:''
      }
    },
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      list_value(){
        var list = this.message.answer.textarea_value.split('\n')
        return list;
      },
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
        this.check = JSON.parse(window.localStorage.getItem('check3'));
        if (this.check == true) {
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
          if (this.message.textarea_value !== '') {
            this.show.error = false
          }else{
            this.show.error = true
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
  .typeline{
    margin-top: 20px;
    position: relative;
    .block{
      margin-top: 20px;
    }
    .yuandian{
      position: absolute;
      left: -11px;
    }
    /*.beizhu{*/
    /*font-size: 12px;*/
    /*color: #999;*/
    /*margin:5px 0;*/
    /*text-indent: 20px;*/
    /*}*/
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
