<template>
  <div>
    <div class="simple-header">
      <div class="w1200">
        <div class="fllogin">
          <router-link class="logo" :to="{name:'index'}">
            <img src="../../../assets/images/qfx-logo.png" width="200" height="70" alt="企服星">
          </router-link>
          <span class="ms-tit">企业用户登录</span>
        </div>
      </div>
    </div>

    <div class="bgf5f">
      <div class="login_bg">
        <div class="w1200">
          <div class="login-left">
            <img src="../../../assets/images/login_icon.png" height="105" width="105" style="vertical-align: baseline;">
            <div class="fontInfo">
              <p>企服星</p>
              <p class="lingxian">用匠心打造企业服务</p>
            </div>
          </div>
            <div class="login-right">
              <div class="login-layout js-tologinlayout" style="position:relative;">
                <div class="login_error" v-show="showError">{{loginErrorText}}</div>
                <div class="login_error" v-html="loginErrorText2" v-show="showError3"></div>
                <div class="login_error" v-show="showError2">您的账号已被冻结，请与企服星工作人员联系：<br>400-870-8750</div>

                <el-form :model="login" :rules="rules" ref="login" class="login-ruleForm" style="position:relative">
                  <el-form-item prop="user">
                    <el-input  v-model="login.user" placeholder="请输入11位手机号码" :maxlength="11"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="login.password" placeholder="密码" @keyup.enter.native="submitForm('login')"></el-input>
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
                      <el-col :span="13"><el-checkbox v-model="login.autologin" label="true">自动登录</el-checkbox></el-col>
                      <el-col :span="5" style="text-align: right"> <router-link :to="{name:'forgotpasswordsimple'}">忘记密码</router-link></el-col>
                      <el-col :span="1" style="text-align: right">|</el-col>
                      <el-col :span="5" style="text-align: right"> <router-link :to="{name:'simpleRegister'}">立即注册</router-link></el-col>
                    </el-row>

                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" size="large" style="width:330px" @click="submitForm('login')">登录</el-button>
                  </el-form-item>
                </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <simple-footer style="background:#fff;"></simple-footer>
  </div>
</template>

<script>
  import API from 'API/config'
  import timerBtn from '../login/timerBtn.vue'
  import simpleFooter from 'components/simpleFooter'
 export default{
    components:{
      timerBtn,simpleFooter
    },
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
        showError3:false,
        loginErrorText: '',
        loginErrorText2:'',
        login: {
          user: '',
          password: '',
          pic_validate: '',
          autologin: []
        },
        code: '',
        //图片验证码
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
              if (this.code == '4001') {//验证码错误
                this.showError = true
                this.showError2 = false
                this.showError3 = false
                this.loginErrorText = response.body.details[0].message[0]
              }else if (this.code == '4012') {//密码错误
                this.showError = true
                this.showError2 = false
                this.showError3 = false
                this.loginErrorText = response.body.details
              }else if (this.code == '4131') {
                this.showError = false
                this.showError2 = false
                this.showError3 = true
                this.loginErrorText2 = response.body.details
              }else if (this.code == '4122') {//账号被冻结
                this.showError = false
                this.showError2 = true
                this.showError3 = false
              }else if (this.code == '4121') {//账号未激活
                this.showError = false
                this.showError2 = false
                this.showError3 = true
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
      if(to.name=='simpleRegisterSuccess' || to.name=='passwordsuccess' || to.name=='phonesuccess' || (to.name == 'forgotpasswordsimple' && this.$store.state.user.user.token != undefined)
        || (to.name=='simpleRegister' && this.$store.state.user.user.token != undefined)){
        this.$router.push({name: 'index'})
        next()
      }else{
        next()
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*.st-mheight{
    min-height: calc(100vh - 98px - 68px);
    box-sizing: border-box;
  }*/
  .login_bg{
    height: 600px;
    background: url(../../../assets/images/banner_change.jpg)
  }
  .login-left{
    width:618px;
    float: left;
    font-size: 50px;
    color: #fff;
    margin-top: 240px;
    .fontInfo{
      display: inline-block;
      .lingxian{
        font-size: 40px;
      }
    }
  }
  .login-right{
    width:378px;
    float: right;
    margin-top: 125px;
    background:#fff;
  }
  .loginfontsize {
    font-size: 14px;
  }
  .login-layout{
    width: 328px;
    padding: 40px 0 20px;
  }
  .login_error{
     line-height: 28px;
     background:#ffe3e3 url('../../../assets/images/login_error.png') 11px 8px no-repeat;
     font-size:12px;
     color:#d03434;
     padding-left: 30px;
     margin-bottom: 10px;
   }
</style>

