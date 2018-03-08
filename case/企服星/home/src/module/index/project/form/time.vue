<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display:inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
      <div v-if="hasAnswer">
        <div v-if="showForm" style="margin-left:20px;">
          <el-date-picker v-model="time_value" type="date" placeholder="选择日期时间" @change="dateChange1">
          </el-date-picker>
        </div>
        <p v-else class="answer">{{message.answer.time_value}}</p>
      </div>
      <div v-if="hasTicket">
        <div v-if="type=='two'">
          <el-date-picker v-model="time_value" type="date" placeholder="选择日期时间" @change="dateChange1">
          </el-date-picker>
        </div>
        <p class="answer" v-if="type=='three'">{{message.answer.time_value}}</p>
      </div>
    <transition name="fade">
      <div class="errormessage" v-show="show.error">请选择日期</div>
    </transition>
  </div>
</template>
<script>
  import {formatDate, currency} from 'assets/js/filter'
  export default{
    props: ['message', 'index', 'fix', 'hasAnswer', 'type','hasTicket'],
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
      if (this.message.answer.time_value.length > 0) {
        this.time_value = this.message.answer.time_value;
      } else {
        this.time_value = "";
      }
    },
    data() {
      return {
        time_value: "",
        show:{
          error:false
        },
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
          this.message.answer.time_value = val;
        }else{
          this.message.answer.time_value = '';
        }
        this.showError()
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
