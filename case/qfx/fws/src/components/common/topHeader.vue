<template>
  <div class="top-header">
    <div class="w1200">
      <a href="" @click.prevent="toFirstUrl()"><img src="../../assets/images/qfx-logo.png"></a>
      <span class="fa-center"><span v-if="showProviderName">{{provider_name}}</span>服务商中心</span>
      <span style="float: right;margin: 32px 0 0 0;font-size: 14px;">企服星客服专线：400-870-8750</span>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        num: false
      }
    },
    computed: {
      ...mapGetters(['provider_name', 'dist_type']),
      showProviderName(){
        var admin = window.sessionStorage.getItem('admin')
        if (admin) {
          if (this.$store.state.admin.admin.user) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    methods: {
      toFirstUrl(){
        if (this.showProviderName) {
          this.$http.get(API.url + 'users/menus').then((res) => {
            var resBody = res.body;
            var menus = resBody.menus;
            var isAssin = menus.some((v) => {
              return v == 'assign'
            })
            if (isAssin) {
              this.$router.push({name: 'assignment'})
            } else if (this.dist_type == 'Admin') {
              this.$router.push({name: 'projectList'})
            }
            else {
              this.$router.push({name: 'toDoList'})
            }
          })
        } else {
          this.$router.push({name: 'login'})
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .top-header {
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(229, 229, 229, 0.50);
    width: 100%;
    height: 98px;
    padding: 15px 0;
    .fa-center {
      display: inline-block;
      font-size: 20px;
      color: #1b1b1b;
      margin-left: 20px;
      margin-top: 15px;
      vertical-align: middle;
    }
  }
</style>
