<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]" >*</span>
    <div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
    <p class="beizhu">{{message.describe}}</p>
    <label class="am-radio am-secondary" v-for="item2 in message.value" v-if="showForm">
      <input type="radio" :name="index" :value="item2" data-am-ucheck v-model="message.answer.radio_value" class="base_radio" :disabled='isDisabled'> {{item2}}
    </label>
    <p class="beizhu css_color_1b" v-if="fix == false">{{message.answer.radio_value}}</p>
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: 'radio',
    props:['message','index','fix','hasAnswer'],
    data(){
      return{
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
        this.check = JSON.parse(window.localStorage.getItem('check5'));
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
      },
      //名字
      inputName(){
        var name_radio = "myRadio"+this.index;
        return name_radio;
      }
    },
    methods:{
      reSet(){
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">

  label{
    line-height: 25px;
  }
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
