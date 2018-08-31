<template>
  <button class="btn-yzm" type="button" v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>

<script>
  import { Toast,MessageBox  } from 'mint-ui';
  export default{
    props: {
      second: {
        type: Number,
        default: 60
      },
      disabled: {
        type: Boolean,
        default: false
      },
      phone:{
        type:String
      }
    },
    data:function () {
      return {
        time: 0
      }
    },
    methods: {
      run: function () {
        if(this.phone==''){
          Toast({
            message: '请输入手机号码',
            position: 'bottom',
            duration: 5000
          })
          return
        }
        if(!this.isMobile(this.phone)){
          Toast({
            message: '请输入正确的手机号码',
            position: 'bottom',
            duration: 5000
          })
          return
        }
        this.$emit('run');
      },
      //是否手机号
      isMobile(v) {
        return (new RegExp(/^1\d{10}$/).test(v));
      },
      start: function(){
        this.time = this.second;
        this.timer();
      },
      stop: function(){
        this.time = 0;
        this.disabled = false;
      },
      setDisabled: function(val){
        this.disabled = val;
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }else{
          this.disabled = false;
        }
      }

    },
    computed: {
      text: function () {
        return this.time > 0 ? '重新发送('+this.time+'s)' : '获取验证码';
      }
    }
  }
</script>

<style lang="less">
.btn-yzm{
  border:1px solid #bfcbd9;
}
</style>
