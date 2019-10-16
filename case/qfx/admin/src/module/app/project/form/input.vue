<template>
  <div class="form-apply">
    <div class="typeline">
      <div>
        <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
        <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
        <p class="beizhu">{{message.describe}}</p>
      </div>
      <div v-if="hasAnswer">
        <p class="beizhu">{{message.answer.input_value}}</p>
      </div>
      <div v-if="hasTicket">
        <p class="beizhu">{{message.answer.input_value}}</p>
      </div>
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
    }
  }
</script>
<!--全局的 -->
<style lang="scss" rel="stylesheet/scss">
</style>



