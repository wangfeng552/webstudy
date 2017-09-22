<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
    <div v-if="hasAnswer" class="clearfix">
      <div class="answer fl">
        <span class="demonstration">开始时间：</span>
        <el-date-picker v-if="showForm" v-model="date_value1" type="date" placeholder="选择日期时间" @change="dateChange1">
        </el-date-picker>
        <span class="answer" v-if="!showForm&&message.answer.date_value1">
        {{message.answer.date_value1}}
      </span>
      </div>
      <div class="fl answer" style="margin-top:20px;">
        <span class="demonstration">结束时间：</span>
        <el-date-picker v-if="showForm" v-model="date_value2" type="date" placeholder="选择日期时间" @change="dateChange2">
        </el-date-picker>
        <span  class="answer" v-if="!showForm&&message.answer.date_value2">
        {{message.answer.date_value2}}
      </span>
      </div>
    </div>
    <div v-if="hasTicket">
      <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
        <span class="demonstration">开始时间：</span>
        <el-date-picker v-if="type=='two'" v-model="date_value1" type="date" placeholder="选择日期时间" @change="dateChange1">
        </el-date-picker>
        <span class="answer" v-if="type=='three'">
        {{message.answer.date_value1}}
      </span>
      </div>
      <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
        <span class="demonstration">结束时间：</span>

        <el-date-picker v-if="type=='two'" v-model="date_value2" type="date" placeholder="选择日期时间" @change="dateChange2">
        </el-date-picker>
        <span class="answer" v-if="type=='three'">
        {{message.answer.date_value2}}
      </span>
      </div>
    </div>
    <transition name="fade">
      <div class="errormessage" v-show="show.error">请选择日期</div>
    </transition>
  </div>
</template>
<script>
  import {formatDate, currency} from 'assets/js/filter'
  export default{
    props: ['message', 'index', 'fix', 'hasAnswer','type','hasTicket'],
    watch: {},
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      currency(val){
        return currency(val)
      }
    },
    mounted(){
      if (this.message.answer.date_value1.length > 0) {
        this.date_value1 = this.message.answer.date_value1;
      }

      if (this.message.answer.date_value2.length > 0) {
        this.date_value2 = this.message.answer.date_value2;
      }
    },
    data() {
      return {
        show:{
          error:false
        },
        date_value1: "",
        date_value2: ""
      }
    },
    computed: {
      showForm(){
        if (this.fix) { //点击修改
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      dateChange1(val) {
      	if(val!=undefined){
          this.message.answer.date_value1 = val;
        }else{
          this.message.answer.date_value1 = '';
        }
        this.showError()
      },
      dateChange2(val) {
        if(val!=undefined){
          this.message.answer.date_value2 = val;
        }else{
          this.message.answer.date_value2 = '';
        }
        this.showError()
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
<style lang="scss" rel="stylesheet/scss">
  .typeline{
    .el-input__icon{
      top:3px;
    }
  }

</style>
