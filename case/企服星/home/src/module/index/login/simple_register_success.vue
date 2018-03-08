<template>
  <div>
    <div class="simple-header">
      <div class="w1200">
        <div class="fllogin">
          <router-link class="logo" :to="{name:'index'}">
            <img src="../../../assets/images/qfx-logo.png" width="200" height="70" alt="企服星">
          </router-link>
          <span class="ms-tit">企业用户注册</span>
        </div>
        <div class="frtext">
          <ul>
            <li class="t01">已有企服星账号？<router-link :to="{name:'login'}">立即登录</router-link></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bgf5f">
      <div class="w1200">
        <div class="rs-success">
          <div class="rs-success-main">
            <div class="pic-c"><img src="./images/success.png" width="80" height="80" alt="yes"></div>
            <h2 class="t03">企业用户注册成功</h2>
            <router-link class="btn btn-blue" :to="{name:'login'}">马上登录</router-link>
            <div class="tiaozhuan">{{time}}秒后自动跳转到登录页面</div>
          </div>
        </div>
      </div>
    </div>

    <simple-footer></simple-footer>
  </div>
</template>

<script>
  import simpleFooter from 'components/simpleFooter'
  export default {
    components:{
      simpleFooter
    },
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
          this.$router.push({name:'login' })
        }
      }
    }
  }
</script>
<style lang="scss">
  .rs-success{padding: 20px 0 80px;
    .rs-success-main{
      background-color: #fff;
      padding: 100px;
      text-align: center;
      .pic-c{
        margin-bottom: 28px;
      }
      .t03{
        font-size:16px;
        color:#1b1b1b;
        margin-bottom: 40px;
      }
      .btn-blue{
        width: 380px;
        margin-bottom: 10px;
      }
      .tiaozhuan{
        font-size:12px;
        color:#cccccc;
      }
    }
  }
</style>

