<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display:inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
    <div style="display: inline-block;margin-top:10px;">
      <span class="demonstration"></span>
      <div v-if="hasAnswer">
        <span class="beizhu">{{time_value}}</span>
      </div>
      <div v-if="hasTicket">
        <span class="beizhu">{{time_value}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate, currency} from 'assets/js/filter'
  export default{
    props: ['message', 'index', 'fix', 'hasAnswer', 'type','hasTicket'],
    data() {
      return {
        yuandian: false,
        check: '',
        value1: '',
        value2: '',
        time_value: "",
        show:{
          error:false
        },
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
      if (this.message.answer.time_value!='') {
        this.time_value = this.message.answer.time_value;
      } else {
        this.time_value = "";
      }
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
