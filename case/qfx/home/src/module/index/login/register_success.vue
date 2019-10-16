<template>
  <div class="mainpart">
    <div class="register">
      <h2 class="title">企业用户注册</h2>
      <div class="register_success">
        <h3 class="title03">企业用户注册成功</h3>
        <p class="djs"><span class="fcec6"><i>{{time}}</i>秒</span>后自动跳转到登录页面</p>
        <router-link class="btn-msdl" :to="{name:'login'}">马上登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time:10
      }
    },
    created(){
      this.timeOut()
    },
    methods:{
      timeOut(){
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timeOut, 1000);
        }else{
          this.$router.push({name:'login' })
        }
      }
    }
  }
</script>
