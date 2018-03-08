<template>
  <div class="top-bar" v-if="iflogin">
    <div class="w1200">
      <!--<a href="http://www.entservice.com" target="blank" class="index">企服星首页</a>-->
      <a href="" class="user-state" @click.prevent="loginOut">退出</a>
      <a href="javascript:;" class="user-name" v-if="iflogin">{{userName}}</a>
    </div>
  </div>
</template>

<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      iflogin(){
        if (this.$store.state.admin.admin) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters(['userName']),
    },
    methods:{
      loginOut(){
        this.$http.post(API.url+'users/logout',{}).then((res)=>{
          this.$store.dispatch('logout')
          sessionStorage.removeItem('admin')
          this.$router.push({name: 'login'})
        }).catch((error)=>{
          this.$message({
            type: 'error',
            message: '退出失败'
          })
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .top-bar {
    background: #f2f2f2;
    width: 100%;
    height: 40px;
    line-height:40px;
    font-size:12px;
    .index{
      color:#3c8ced;
    }
    .user-name, .user-state{
      color: #5c5c5c;
      float: right;
      margin-right:20px;
    }
  }

</style>
