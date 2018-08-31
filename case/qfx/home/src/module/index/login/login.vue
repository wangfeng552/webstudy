<template>
  <div class="mainpart">
    <div class="login-layout js-tologinlayout" style="position:relative;">
        <h2 class="title">企业用户登录</h2>
        <div class="login_error" v-show="showError">{{loginErrorText}}</div>
        <div class="login_error" v-show="showError2">您的账号已被冻结，请与企服星工作人员联系：400-870-8750</div>

        <el-form :model="login" :rules="rules" ref="login" class="login-ruleForm" style="position:relative">
          <el-form-item prop="user">
            <el-input  v-model="login.user" placeholder="请输入11位手机号码" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="login.password" placeholder="密码" @keyup.enter.native="submit_login('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item v-if="img.loginCode">
            <el-row :gutter="8">
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="login.pic_validate" placeholder="验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8"><img :src="img.imgSrc+img.changeTime" alt="" width="98" height="34"></el-col>
              <el-col :span="4">
                <el-button type="text" @click="changeImg">换一张</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="12"><el-checkbox v-model="login.autologin" label="true">自动登录</el-checkbox></el-col>
              <el-col :span="12" style="text-align: right"> <router-link :to="{name:'forgotPassword'}">忘记密码</router-link></el-col>
            </el-row>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" style="width:480px" @click="submitForm('login')">登录</el-button>
          </el-form-item>
          <div class="form-group fs14 loginfontsize">
            <div class="fr">
              <router-link class="pr20" :to="{name:'register'}" style="padding: 0;">立即注册</router-link>
            </div>
          </div>
        </el-form>

    </div>

  </div>

</template>

<script>
  import API from 'API/config'

  export default{
    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
        this.$http.post(API.url+'validations/unique',{
          model:'customer',
          attribute:'phone_number',
          value:value
        }).then((res)=>{
          var resBody = res.body;
          if(resBody.exsist){
            callback()
          }else{
            callback(new Error('手机号未注册'))
          }
        })
      };
      //密码
      var checkPassword = (rule, value, callback) => {
        if (!(/^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]+$)[a-zA-Z\d~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]{6,20}$/.test(value))) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
          return false
        }
        callback()
      }
      return {
        loginUrl: 'customer/users/login',
        showError: false,
        showError2:false,
        loginErrorText: '',
        loginErrorText2:'',
        login: {
          user: '',
          password: '',
          pic_validate: '',
          autologin: []
        },
        code: '',
//      图片验证码
        img: {
          loginCode: '',
          imgSrc: API.pic,
          changeTime: '',
          imgError: ''
        },
        rules: {
          user: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      this.changeImg()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(API.url + this.loginUrl,{
              account: this.login.user,
              password:this.login.password,
              captcha:this.login.pic_validate
            })
            .then((response) => {
              this.$store.dispatch('login', response.body)
              this.$router.go(-1)
            }).catch((response) => {
              this.code = response.body.code
              if (this.code == '4001') {
                this.showError = true
                this.showError2 = false
                this.loginErrorText = response.body.details[0].message[0]
              }else if (this.code == '4012') {
                this.showError = true
                this.showError2 = false
                this.loginErrorText = response.body.details
              }else if (this.code == '4131' || this.code == '4132') {
                this.showError = false
                this.showError2 = true
                this.loginErrorText2 = response.body.details
              }
              if (response.body.times >= 3) {
                this.img.loginCode = true
              }
              if (response.body.details[0].message[0] != '') {
                this.img.imgError = true
              }
            })
          } else {
            return false;
          }
        });
      },
      checkImg(){
        this.img.imgError = false
        this.show.img = true
      },
      changeImg(){
        let timestamp = Date.parse(new Date()) + ''
        this.img.changeTime ='i='+timestamp.substring(0, 10)
      }
    },
    beforeRouteLeave (to, from, next) {
      if(to.name=='registersuccess' || to.name=='passwordsuccess' || to.name=='phonesuccess' || to.name == 'forgotpasswordsuccess'
        || (to.name=='simpleRegister' && this.$store.state.user.user.token != undefined)){
        this.$router.push({name: 'index'})
        next()
      }
      next()
    }
  }
</script>

<style lang="scss" scoped>
  .loginfontsize {
    font-size: 14px;
  }
  .login_error{
     height: 28px;
     line-height: 28px;
     background:#ffe3e3 url('../../../assets/images/login_error.png') 11px 8px no-repeat;
     font-size:12px;
     color:#d03434;
     padding-left: 30px;
     margin-bottom: 10px;
   }
</style>
