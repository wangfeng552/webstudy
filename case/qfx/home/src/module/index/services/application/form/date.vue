<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu" v-html="message.describe"></p>
    <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
      <span class="demonstration">开始时间：</span>

        <el-date-picker v-model="date_value1" type="date" placeholder="选择日期" @change="dateChange1">
        </el-date-picker>

    </div>
    <div style="display: inline-block;margin-top:10px; margin-left: 10px;">
      <span class="demonstration">结束时间：</span>

        <el-date-picker v-model="date_value2" type="date" placeholder="选择日期" @change="dateChange2">
        </el-date-picker>

    </div>
    <transition name="fade">
    <div class="errormessage" v-show="show.error">请选择日期</div>
    </transition>
    <div @blur="showError"></div>
  </div>
</template>
<script>
  //    import amaze from '../assets/js/amazeui.min.js'
  export default{
    props:['message','index'],
//    watch:{
//      date_value1(curVal,oldVal){
//        this.message.answer.date_value1 = curVal;
//        console.log(curVal,oldVal);
//      },
//      date_value2(curVal,oldVal){
//        console.log(curVal,oldVal);
//        this.message.answer.date_value2 = curVal;
//      },
//  },
//   mounted(){
//        if( this.message.value.length>0){
//            this.date_value1 = this.message.date_value1;
//        }
//
//     if( this.message.value.length>0){
//       this.date_value2 = this.message.date_value2;
//     }
//   },
  data() {
    return {
      show:{
        error:false
      },
      yuandian:false,
      check:'',
      date_value1:"",
      date_value2:""
    }
  },
  methods:{
    dateChange1(val) {
      this.message.answer.date_value1 = val;
      console.log(val)
      if (this.message.rules[0] == 'required') {
        if (this.message.answer.date_value1 == undefined||this.date_value1=='') {
          this.show.error = true
          this.message.error = true

        }else{
          this.show.error = false
          this.message.error = false
        }
      }
    },
    dateChange2(val) {
      this.message.answer.date_value2 = val;
      if (this.message.rules[0] == 'required') {
        if (this.message.answer.date_value2 == undefined||this.date_value2=='') {
          this.show.error = true
          this.message.error = true

        }else{
          this.show.error = false
          this.message.error = false

        }
      }
    },
    showError(){
      if (this.message.rules[0] == 'required') {
        if (this.date_value1 == '' || this.date_value2 == '') {
          this.show.error = true
          this.message.error = true
        } else {
          this.show.error = false
          this.message.error = false

        }
      }
    }
  }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
