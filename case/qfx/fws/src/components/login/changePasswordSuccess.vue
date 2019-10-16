<template>
  <div class="usercenter">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'userCenter' }">账号信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改手机</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="revise-box-success">
      <img src="../../assets/images/success.png" height="80" width="82" class="success">
      <p class="one">恭喜你，登录密码修改成功</p>
      <p class="two">请牢记你的密码，<i>{{time}}</i>秒后自动跳转到登录页面</p>
      <a href="" class="three" @click.prevent="toLogin">马上登录>></a>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        time:5
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
          this.$store.dispatch('logout')
          sessionStorage.removeItem('admin')
          this.$router.push({name: 'login'})
        }
      },
      toLogin(){
        this.$store.dispatch('logout')
        sessionStorage.removeItem('admin')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
