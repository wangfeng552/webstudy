<template>
	<div class="typeline">
		<span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
		<span class="leftshouru" style="display:inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
		<p class="beizhu" v-html="message.describe"></p>
		<div style="display: inline-block;margin-top:10px;margin-left:19px;">
		    <span class="demonstration"></span>
      <div>
        <el-date-picker v-model="time_value" type="date" placeholder="选择日期" @change="dateChange1">
        </el-date-picker>
      </div>
      <span class="beizhu">{{message.time_value}}</span>

    </div>
    <transition name="fade">
    <div class="errormessage" v-show="show.error">请选择日期</div>
    </transition>
    <div @blur="showError"></div>
	</div>
</template>
<script>
//  import amaze from '../assets/js/amazeui.min.js'
    export default{
      props:['message','index'],
      watch:{
//        time_value(curVal,oldVal){
//          this.message.answer.time_value = curVal;
//          console.log(curVal,oldVal);
//        }
      },
      mounted(){
        if( this.message.value.length>0){
          this.time_value = this.message.time_value;
        }else {
          this.time_value = "";
        }
      },
        data() {
        	return {
            show:{
              error:false
            },
        		yuandian:false,
        		check:'',
		        value1: '',
		        value2: '',
            time_value:""
        	}
        },
        methods:{
          dateChange1(val) {
            this.message.answer.time_value = val;
            if (this.message.rules[0] == 'required') {
              if (this.message.answer.time_value == undefined) {
                this.show.error = true
                this.message.error = true

              }else {
                this.show.error = false
                this.message.error = false
              }
              }
          },
          showError(){
            if (this.message.rules[0] == 'required') {
              if (this.time_value == undefined||this.time_value == '') {
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
