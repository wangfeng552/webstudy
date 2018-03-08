<template>
  <div class="login">
    <top-header></top-header>
    <div class="w1200 mi-height">
      <div class="w1046">
        <h2 class="title01">忘记密码</h2>
        <div class="wf_main forgetpassword">
          <div class="w600">
            <el-steps :space="275" :active="active" :alignCenter=true>
              <el-step title="填写手机号码"></el-step>
              <el-step title="设置新密码"></el-step>
              <el-step title="设置成功"></el-step>
            </el-steps>
          </div>
          <div class="forget_338">
            <!--失败的信息-->
            <div class="login_error" v-show="loginShowError">{{loginErrorText}}</div>
              <!--第一步-->
            <el-form :model="telform" :rules="rules" ref="first" v-if="showFirst" key="1">
              <el-form-item prop="user">
                <el-input v-model.trim="telform.user" placeholder="手机号码"></el-input>
              </el-form-item>

              <el-form-item >
                <el-row :gutter="8">
                  <el-col :span="12">
                    <el-form-item prop="pic_validate">
                      <el-input v-model="telform.pic_validate" placeholder="验证码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8"><img :src="img.url+img.changeTime" alt="" width="98" height="34"></el-col>
                  <el-col :span="4">
                    <a href="" @click.prevent="changeImg">换一张</a>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item prop="code">
                <el-row type="flex" justify="space-between">
                  <el-col :span="15"><el-input v-model="telform.code" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
                  <el-col :span="8" style="text-align: right"><timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn></el-col>
                </el-row>
              </el-form-item>

              <el-form-item class="textbtn-cen">
                <el-button type="primary" @click="submitForm('first')">下一步</el-button>
              </el-form-item>
            </el-form>


            <!--第二步-->
            <el-form :model="passwordform" :rules="rules" ref="second" v-if="showSecond" key="2">
              <el-form-item prop="newval">
                <el-input v-model.trim="passwordform.newval" placeholder="新密码" type="password"></el-input>
              </el-form-item>

              <el-form-item prop="checkval">
                <el-input v-model.trim="passwordform.checkval" placeholder="确认新密码" type="password"></el-input>
              </el-form-item>

              <el-form-item class="textbtn-cen">
                <el-button type="primary" @click="submitPassword('second')">下一步</el-button>
              </el-form-item>
            </el-form>

            <!--第三步-->
            <div v-if="showThird">
              <div class="text-success">您的密码已重置成功，请牢记您的密码！</div>
              <div class="textbtn-cen">
                <router-link :to="{name:'login'}">
                  <el-button type="primary">马上登录</el-button>
                </router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <black-footer></black-footer>
  </div>
</template>
<script>
  import API from 'API/api'
  import timerBtn from '../common/timerBtn.vue'
  import topHeader from '../common/topHeader.vue'
  import blackFooter from '../common/blackFooter.vue'
	export default{
    components: {topHeader,blackFooter,timerBtn},
    created(){
      this.img.url = API.code
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
      var password = (rule, value, callback) => {
        if (!/^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
        }else{
          callback()
        }
      };
      //重复密码
      var password_confirmation = (rule, value, callback) => {
        if (!/^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
        }else if (value !== this.passwordform.newval) {
          callback(new Error('两次密码输入不一致'));
        }else{
          callback()
        }
      };
      return {
        active: 1,
        forgetPasswordToken:'',
        loginShowError:false,
        showFirst:true,
        showSecond:false,
        showThird:false,
        loginErrorText:'',
        telform:{
          user:'',
          pic_validate:'',
          code :''
        },
        passwordform:{
          newval:'',
          checkval:''
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
          pic_validate: [
            {required: true, message: '请输入图片验证码', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入短信验证码', trigger: 'blur'}
          ],
          newval: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: password, trigger: 'blur'}
          ],
          checkval: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: password_confirmation, trigger: 'blur'}
          ],
        }
      }
    },
		methods:{
      // 换一张
      changeImg(){
        let timestamp = Date.parse(new Date()) + ''
        this.img.changeTime = timestamp.substring(0, 10)
      },
      // 验证码
      sendCode(){
        this.$refs.first.validateField('user',(error)=>{
          if(!error){
            this.$http.post(API.serviceurl + 'validations', {reciever: this.telform.user},).then(() => {
              this.$refs.timerbtn.start();
            }).catch(() => {
            })
          }
        })
      },
      //第一步提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(API.url + 'users/forgot/password', {
              account: this.telform.user,
              captcha: this.telform.pic_validate,
              code: this.telform.code
            }).then((res) => {
              var resBody = res.body;
              this.forgetPasswordToken = resBody.token;
              this.active++
              this.loginShowError = false;
              this.showFirst = false,
              this.showSecond = true,
              this.showThird = false
            }).catch((error) => {
              var resBody = error.body
              if (resBody.code == '4012') {
                this.loginErrorText = '账号名和密码不匹配，请重新输入';
                this.loginShowError = true
              } else if (resBody.code == '4001') {
                this.loginErrorText = '验证码错误';
                this.loginShowError = true;
                this.showCode = true
              } else if (resBody.code == '4041') {
                this.loginErrorText = '该账号名不存在';
                this.loginShowError = true
              } else if (resBody.code == '4121') {
                this.loginShowError2 = true
              }
            })
          } else {
            return false;
          }
        });
      },
      //第二步重置密码
      submitPassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$http.post(API.url+'users/reset/password',{
             token:this.forgetPasswordToken,
             user:{
               password:this.passwordform.newval,
               password_confirmation:this.passwordform.checkval
             }
           }).then((res)=>{
             this.active = 3
             this.showFirst = false,
               this.showSecond = false,
               this.showThird = true
           }).catch((error)=>{
           })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.forgetpassword{
  .w600{
    width: 600px; margin: 0 auto 50px;
  }
}
.forget_338{
  width: 338px;
  margin: 0 auto;
  .textbtn-cen{
    text-align: center;
  }
  .text-success{
    text-align: center;
    padding: 20px 0 70px;
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
}
</style>
<style>
  .login .el-step__head.is-text.is-process{ color: #bfcbd9; background-color: #fff;}
  .login .el-step__title.is-process{color: #bfcbd9;}
</style>
