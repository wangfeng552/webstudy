<template>
  <div class="form-apply">
    <div class="typeline">
      <div>
        <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
        <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
        <p class="beizhu">{{message.describe}}</p>
      </div>
      <div v-if="hasAnswer">
        <input type="text" v-model="message.answer.input_value" @blur="showError" class="inputdic base_input" v-if="showForm&&message.answer.input_value!='undefined'">
        <p class="answer" v-else>{{message.answer.input_value}}</p>
      </div>
      <div v-if="hasTicket">
        <input type="text" v-model="message.answer.input_value" @blur="showError" class="inputdic base_input" v-if="type=='two'">
        <p class="answer" v-if="type=='three'">{{message.answer.input_value}}</p>
      </div>
      <transition name="fade">
      <div class="errormessage" v-show="show.error">请输入内容</div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default{
    props:['message','index','fix','hasAnswer','type','hasTicket'],
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
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check'));
        if (this.check  == true) {
          this.yuandian = true
        }else{
          this.yuandian = false
        }
      },
      showForm(){
          if(this.fix){ //点击修改
            return true;
          }else {
            return false;
          }

      }
    },
    methods:{
      showError(){
        if (this.message.rules[0] == 'required') {
          if (this.message.answer.input_value == '') {
            this.show.error = true
            this.message.error = true
          }else{
            this.show.error = false
            this.message.error = false

          }
        }
      }
    }
  }
</script>
<!--全局的 -->
<style lang="scss" rel="stylesheet/scss">
</style>



