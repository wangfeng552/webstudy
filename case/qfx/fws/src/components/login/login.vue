<template>
  <div class="login">
    <top-header></top-header>
    <!-- <router-link :to="{name:'activation'}">子账号激活</router-link> -->
    <div class="w1200 mi-height">
      <div class="w1046">
        <h2 class="title01">服务商登录</h2>
        <div class="wf_main">
          <div class="wf_login_338">

            <div class="login_error" v-show="loginShowError">{{loginErrorText}}</div>
            <div class="login_error" v-show="loginShowError2" v-html="codeDetails"></div>
            <router-link :to="{name:'activation'}">
              <!-- <div class="login_error" v-show="loginShowError2">请激活账号</div> -->
            </router-link>

            <el-form :model="login" :rules="rules" ref="ruleForm" class="login-ruleForm">
              <el-form-item prop="user">
                <el-input v-model.trim="login.user" placeholder="手机号" :maxlength="11"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input type="password" v-model="login.password" placeholder="密码" @keyup.enter.native="submit_login('ruleForm')"></el-input>
              </el-form-item>

              <el-form-item v-if="showCode">
                <el-row :gutter="8">
                  <el-col :span="12">
                    <el-form-item>
                      <el-input v-model="login.pic_validate" placeholder="验证码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"><img :src="img.url+img.changeTime" alt="" width="98" height="34"></el-col>
                  <el-col :span="4">
                    <el-button type="text" @click="changeImg">换一张</el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <div ><router-link :to="{name:'forgetPassword'}">忘记密码</router-link></div>
                <!--<el-row>
                  <el-col :span="12"><el-checkbox v-model="login.autologin" label="true">自动登录</el-checkbox></el-col>
                  <el-col :span="12" style="text-align: right"> <router-link :to="{name:'forgetPassword'}">忘记密码</router-link></el-col>
                </el-row>-->
              </el-form-item>

              <el-form-item>
                <a href="" class="login_button" @click.prevent="submit_login('ruleForm')">登录</a>
              </el-form-item>

            </el-form>
          </div>
        </div>
      </div>
    </div>
    <black-footer></black-footer>
  </div>
</template>
<script>
  import API from 'API/api'
  import topHeader from '../common/topHeader.vue'
  import blackFooter from '../common/blackFooter.vue'
  export default{
    components: {topHeader, blackFooter},
    //企业传来的id
    beforeRouteEnter (to, from, next) {
      next(vm => {
        var url = to.fullPath
        if (url.includes("?providersId=")) {
          var lastWenhao = url.lastIndexOf('=');
          var lastEnd = url.lastIndexOf('&');
          var token = url.substr(lastWenhao + 1);
          var first = url.substring(0, lastEnd);
          var firstWenhao = first.lastIndexOf('=');
          var id = first.substr(firstWenhao + 1);
          vm.provider_id = id; // 运营传来的token
          vm.token = token; //运营传来的token
          vm.$store.dispatch('login', {token: token})
//          获取用户信息
          vm.$http.get(API.url + 'users/profile', {
            params: {provider_id: id},
            headers: {'Access-Token': token}
          }).then((res) => {
            var resBody = res.body;
            vm.$store.dispatch('login', {user:resBody.user,token:token})
            vm.$router.push({name: 'projectList'})
          }).catch((error) => {
          })
        }
      })
    },
    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
        callback()
      };
      //密码
      var checkPassword = (rule, value, callback) => {
        if (!(/^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value))) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
          return false
        }
        callback()
      }
      return {
        token:'',
        provider_id:'',
        showCode: false,
        loginShowError: false,
        loginShowError2:false,
        loginErrorText: '',
        codeDetails:'',
        login: {
          user: '',
          password: '',
          pic_validate: '',
          autologin: []
        },
        img: {
          url: '',
          changeTime: ''
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
      this.img.url = API.code
    },
    methods: {
      // 换一张
      changeImg(){
        let timestamp = Date.parse(new Date()) + ''
        this.img.changeTime = timestamp.substring(0, 10)
      },
      submit_login(formData){
        this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$http.post(API.url + 'users/login', {
              account: this.login.user,
              password: this.login.password,
              captcha: this.login.pic_validate,
              auto_login: this.login.autologin[0],
              provider_id:this.provider_id
            }).then((res) => {
              //成功
              this.loginShowError = false
              var resBody = res.body;
              this.$store.dispatch('login', {user:resBody.user,token:resBody.token})
            }).then((res)=>{
              this.$http.get(API.url+'users/menus').then((res)=>{
                var resBody = res.body;
                var menus =resBody.menus;
                var isAssin = menus.some((v)=>{
                  return v=='assign'
                })
                if(isAssin){
                  this.$router.push({name: 'assignment'})
                }else{
                  this.$router.push({name: 'toDoList'})
                }
              })
            }).catch((res) => {
              var resBody = res.body
              this.codeDetails = resBody.details
              if (resBody.code == '4012') {
                this.loginErrorText = '账号名和密码不匹配，请重新输入';
                this.loginShowError = true
                this.loginShowError2 = false
                // this.loginErrorText = resBody.details
              } else if (resBody.code == '4001') {
                this.loginErrorText = '验证码错误';
                this.loginShowError = true;
                // this.loginErrorText = resBody.details
                this.showCode = true
                this.loginShowError2 = false
              } else if(resBody.code == '4041'){
                this.loginErrorText = '该账号名不存在';
                this.loginShowError = true
                this.loginShowError2 = false
              }else if(resBody.code == '4121'){//服务商已冻结
                this.loginShowError = true
                this.loginShowError2 = false
                this.loginErrorText = resBody.details
              }else if (resBody.code == '4122') {//服务商未激活
                  this.loginShowError = false;
                  this.loginShowError2 = true;
              }else if (resBody.code == '4123') {//账号已冻结
                  this.loginShowError = true;
                  this.loginShowError2 = false
                  this.loginErrorText = resBody.details
              }else if (resBody.code == '4125') {//服务商已冻结
                  this.loginShowError = true;
                  this.loginShowError2 = false
                  this.loginErrorText = resBody.details
              }else if (resBody.code == '4126') {//服务商未激活
                  this.loginShowError = false;
                  this.loginShowError2 = true;
              }else if (resBody.code == '4124') {//账号未激活
                  this.loginShowError = false;
                  this.loginShowError2 = true;
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
 .wf_login_338{
   width: 338px;
   margin: 0 auto;
   .login_error{
     height: 28px;
     line-height: 28px;
     background:#ffe3e3 url('images/login_error.png') 11px 8px no-repeat;
     font-size:12px;
     color:#d03434;
     padding-left: 30px;
     margin-bottom: 10px;
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
</style>
