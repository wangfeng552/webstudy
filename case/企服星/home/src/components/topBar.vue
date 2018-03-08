<template>
  <div class="top-bar">
    <div class="top-content">
      <div class="tbar_l">
        <ul>
          <li class="icon-location">上海</li>
        </ul>
      </div>
      <div class="tbar_r">
        <ul>
          <li v-if="iflogin" class="user" :class="{current:isShow}" @mouseenter="showUserCenter" @mouseleave="hiddenUserCenter">
            <span>{{name}}<i class="jt"></i></span>
            <dl class="u_main">
              <router-link :to="{name: 'userCenterDefault'}"><dt>用户中心</dt></router-link>
              <a href=""  @click.prevent="changeState"><dt>退出</dt></a>
            </dl>
          </li>
          <li v-else>
            <router-link :to="{name: 'login'}" class="mr10">请登录</router-link>
            <router-link :to="{name: 'simpleRegister'}">免费注册</router-link>
          </li>
          <li class="tel">400-870-8750 (9:00-18:00)</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        isShow:false
      }
    },
    computed: {
      iflogin(){
        var admin = window.localStorage.getItem('items')
        if (admin) {
          if (this.$store.state.user.user) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      ...mapGetters(['user_id','name'])
    },
    methods: {
      changeState(){
        this.$http.post(API.url+'customer/users/logout',{}).then((res)=>{
          this.$store.dispatch('logout')
          localStorage.removeItem('items')
          this.$router.push({name: 'login'})
        }).catch((error)=>{
          this.$store.dispatch('logout')
          localStorage.removeItem('items')
          this.$router.push({name: 'login'})
        })
      },
      showUserCenter(){
        this.isShow = true
      },
      hiddenUserCenter(){
        this.isShow = false
      }
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../assets/sass/config";//配置
  .top-bar {
    line-height: 40px;
    background: #f2f2f2;
    color: $fc5c5;
    font-size: 12px;
    height: 40px;
    .top-content {
      position: relative;
      @include fix-width;
      .tbar_l{
        float: left;
        li{
          float: left;
          &.icon-location{
            padding-left: 20px;
            background: url("./images/location_ico.png") 0 9px no-repeat;
          }
        }
      }
      .tbar_r{
        float: right;
        li:first-child{margin-right: 20px; padding: 0 14px;}
        li{
          float: left;
          &.tel{
            padding-left: 20px;
            background: url("./images/tel_ico.png") 0 12px no-repeat;
          }
          &.user{
            position: relative;
            cursor: pointer;
            padding-right: 30px;
            .jt{
              position: absolute;
              right: 15px;
              top: 15px;
              display: inline-block;
              width: 6px;
              height: 6px;
              border-left:1px solid $fc5c5;
              border-bottom:1px solid $fc5c5;
              transform: rotate(-45deg);
            }
            .u_main{
              display: none;
              a{
                display: block;
              }
            }
          }
          &.current{
            display: block;
            background-color: #3c8ced;
            color: #fff;
            .jt{
              -webkit-backface-visibility: hidden;
              border-color: #fff;
              -moz-transform: rotate(-225deg);
              -moz-transform-origin: 50% 90%;
              -webkit-transform: rotate(-225deg);
              -webkit-transform-origin: 50% 90%;
              -o-transform: rotate(-225deg);
              -o-transform-origin: 50% 90%;
              transform: rotate(-225deg);
              transform-origin: 50% 90%;
            }
            .u_main{
              @include shadow(0,0,5px,rgba(0,0,0,0.1))
              position: absolute;
              top: 40px;
              left: 0;
              width: 110px;
              height: 79px;
              background-color: #fff;
              z-index: 10;
              display: block;
              a{
                  display: block;
                  color: $fc5c5;
                  &:hover{color: #3c8ced}
                }
              dt{
                height: 39px;
                line-height: 39px;
                padding-left: 38px;
                
              }
              a:first-child{
                border-bottom: 1px solid #eaeaea;
                background: url("./images/user_ico.png") 12px 12px no-repeat;
              }
              a:nth-of-type(2){
                background: url("./images/out_ico.png") 12px 12px no-repeat;
              }
            }
          }
        }

      }
    }
  }
</style>
