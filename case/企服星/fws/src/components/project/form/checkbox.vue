<template>
  <div class="typeline">
    <div>
      <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
      <div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
      <p class="beizhu">{{message.describe}}</p>

    </div>
    <label class="am-checkbox am-secondary" v-for="(item2,index1) in message.value" v-if="showForm">
      <!--<input type="checkbox" :value="item2" data-am-ucheck :name="index1" @change="changeCheck" v-model="check_value" class="base_checkbox"> {{item2}}-->
      <input type="checkbox" :value="item2" data-am-ucheck :name="index1" @change="changeCheck" v-model="message.answer.check_value" class="base_checkbox" :disabled='isDisabled'> {{item2}}
    </label>
    <!--<p v-if="fix == false" class="beizhu" v-else>{{message.answer.check_value}}</p>-->
    <div v-for="item in message.answer.check_value" v-if="showForm == false" class="beizhu">
      <span class="beizhu css_color_1b">{{item}}</span>
    </div>

    <!--<div class="errormessage" v-show="show.process">请输入内容</div>-->
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    props:['message','index','fix','hasAnswer'],
    data(){
      return{
        show:{
          process:false
        },
        user:{
          checked:''
        },
        yuandian:false,
        check_value:[]
      }
    },
    watch:{
      check_value(curVal,oldVal){
        this.message.answer.check_value = curVal;
      }
    },
    mounted(){
      var item = [];
      if(this.message.answer.check_value != undefined && this.message.answer.check_value.length>0){
        this.message.answer.check_value.forEach(function (obj,index) {
          item.push(obj);
        })
      }else {

      }
      this.check_value = item;
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
        this.check = JSON.parse(window.localStorage.getItem('check4'));
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
      input_blur(){
        if (this.message.rules == 'required') {
          if ($('input:checkbox[name=process]:checked').length == 0) {
            this.show.process = true
          }else{
            this.show.process = false
          }
        }
      },
      reSet(){
      },
      changeCheck(e){
//            var index1 = e.target.name;
//            this.message.answer.check_value = this.check_value;
//            alert(123);
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
