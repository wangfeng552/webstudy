<template>
  <div class="admin_login">
    <div class="login-layout">
      <div class="login-w438">
        <div class="title">
          <img src="./images/login_logo.png" width="116" height="39" alt="企服星">
        </div>
        <h2 class="tit2">运营管理后台</h2>
        <div class="login_error" v-show="showError">账号或密码错误</div>
        <div class="login-form-input">
          <i class="ico_user"></i>
          <input type="text" v-model="account" maxlength="11" placeholder="请输入后台账号">
        </div>
        <div class="login-form-input">
          <i class="ico_password"></i>
          <input type="password" v-model="password" placeholder="请输入登录密码" @keyup.enter="adminLogin">
        </div>
        <div class="login-form-input">
          <label for="password" class="fsfff" style="cursor: pointer"><input id="password" type="checkbox" v-model="remember">记住密码</label>
        </div>
        <div class="login-form-input">
          <a href=""  class="login_button" @click.prevent="adminLogin">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import adminApi from 'API/config'
  export default{
    data(){
      return {
        account: '',
        password: '',
        remember: false,
        showError: false
      }
    },
    methods: {
      adminLogin(){
        this.$http.post(adminApi.url + 'users/login',
          {
            account: this.account,
            password: this.password,
            remember: this.remember
          }).then((res) => {
          this.showError = false
          this.$store.dispatch('login', res.body)
          this.$router.replace({name: 'project'})
        }).catch((res) => {
          let resBody = res.body
          if (resBody.code == '4041' || resBody.code == '4012') {
            this.showError = true
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .admin_login{
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("images/login_bg.png") center top no-repeat;
    .login-layout{
      border: 7px solid rgba(29,90,131,0.48);
      background-color: rgba(29,90,131,0.48);
      width: 620px;
      height: 473px;
      position: absolute;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      .login-w438{
        width: 438px;
        margin: 0 auto;
        .title{
          text-align: center;
          height: 83px;
          padding:30px 0 16px;
          border-bottom: 1px solid #4c90be;
          img{
            background-size: 5px 5px;
          }
        }
        .tit2{
          height: 56px;
          line-height: 56px;
          font-size:20px;
          color:#ffffff;
          text-align: center;
          margin-bottom: 10px;
        }
        .login_error{
          height: 28px;
          line-height: 28px;
          background:#ffe3e3 url('images/login_error.png') 11px 8px no-repeat;
          font-size:12px;
          color:#d03434;
          padding-left: 30px;
          margin-bottom: 10px;
        }
        .login-form-input{
          margin-bottom: 30px;
          position: relative;
          input[type='text'],input[type='password']{
            width: 100%;
            height: 42px;
            padding: 8px 10px 8px 35px;
            /*line-height: 42px;*/
            border-radius:2px;
            box-shadow:0 2px 4px 0 #154a8a;
            border: none;
            font-size: 14px;
          }
          i{
            position: absolute;
            width: 14px;
            height: 16px;
            display: block;
            left: 10px;
            top: 13px;
            &.ico_user{
              background: url("images/user.png") 0 0 no-repeat;
            }
            &.ico_password{
              background: url("images/password.png") 0 0 no-repeat;
            }
          }
          input[type='checkbox']{
            width: 16px;
            height: 16px;
            margin-right: 5px;
            vertical-align: middle;
            margin-top: -1px;
          }
          .fsfff{
            color: #fff;
          }
          .login_button{
            background-color:#3c8ced;
            border-radius:2px;
            height:46px;
            line-height: 46px;
            display: block;
            font-size:14px;
            color:#fdfdfd;
            text-align:center;
            &:hover{
              background-color: #287ee5;
            }
          }
        }
      }
    }
  }
</style>
