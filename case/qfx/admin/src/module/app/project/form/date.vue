<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
    <div v-if="hasAnswer">
      <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
        <span class="demonstration">开始时间：</span>
        <span class="beizhu" v-if="date_value1">
        {{date_value1}}
      </span>
      </div>
      <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
        <span class="demonstration">结束时间：</span>
        <span  class="beizhu" v-if="date_value2">
        {{date_value2}}
      </span>
      </div>
    </div>
    <div v-if="hasTicket">
      <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
        <span class="demonstration">开始时间：</span>
        <span class="beizhu">
        {{date_value1}}
      </span>
      </div>
      <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
        <span class="demonstration">结束时间：</span>
        <span class="beizhu">
        {{date_value2}}
      </span>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate, currency} from 'assets/js/filter'
  export default{
    props: ['message', 'index', 'fix', 'hasAnswer','type','hasTicket'],
    data() {
      return {
        show:{
          error:false
        },
        yuandian: false,
        check: '',
        date_value1: "",
        date_value2: ""
      }
    },
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
      if (this.message.answer.date_value1!='') {
        this.date_value1 = this.message.answer.date_value1;
      }else{
        this.date_value1=''
      }

      if (this.message.answer.date_value2!= '') {
        this.date_value2 = this.message.answer.date_value2;
      }else{
        this.date_value2 = ''
      }
    },

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .typeline{
    .el-input__icon{
      top:3px;
    }
  }

</style>
