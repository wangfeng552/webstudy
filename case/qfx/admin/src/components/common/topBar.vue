<template>
  <div class="top-bar">
    <i class="qfx-logo"></i>
      <span class="title">运营管理后台</span>
    <div class="userState fr">
      <div class="user-photo fl">
        <img src="../../assets/images/user_photo.png" alt="">
      </div>
      <span class="user-name" v-if="this.$store.state.admin.admin">{{name}}</span>
      <a href="" class="quit" @click.prevent="loginOut">退出</a>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters(['name'])
    },
    methods:{
      loginOut(){
        this.$http.post(API.url+'users/logout',{}).then((res)=>{
          this.$store.dispatch('logout')
          sessionStorage.removeItem('admin')
          this.$router.push({name: 'login'})
        }).catch(()=>{
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

</style>
