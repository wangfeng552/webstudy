<template>
  <div>
    <div class="simple-header">
      <div class="w1200">
        <div class="fllogin">
          <router-link class="logo" :to="{name:'index'}">
            <img src="../../../assets/images/qfx-logo.png" width="200" height="70" alt="企服星">
          </router-link>
          <span class="ms-tit">忘记密码</span>
        </div>
        <div class="frtext">
          <ul>
            <li class="t01">已有企服星账号？<router-link :to="{name:'login'}">立即登录</router-link></li>
           <!-- <li class="t01">
              <router-link class="fc5c5" :to="{name:'login'}">登录</router-link>
              <span>|</span>
              <router-link class="fc5c5" :to="{name:'register'}">注册</router-link>
            </li>-->
          </ul>
        </div>
      </div>
    </div>

    <div class="bgf5f" >
      <div class="w1200" style="padding-top:20px">
        <!--忘记密码-->
        <div class="revise-box">
          <div class="w600">
            <el-steps :space="275" :active="active" :alignCenter=true>
              <el-step title="填写手机号码"></el-step>
              <el-step title="设置新密码"></el-step>
              <el-step title="设置成功"></el-step>
            </el-steps>
          </div>
          <div class="formBox" v-if="showforgot" key="1">
            <el-form :model="user" :rules="rules" ref="user" style="position:relative;">
              <div class="bgfff">
                <div class="w500">

                  <el-form-item prop="phone_number">
                    <el-input  v-model="user.phone_number" placeholder="请输入11位手机号码" :maxlength="11"></el-input>
                  </el-form-item>

                  <el-form-item prop="code" style="position: relative;">
                    <el-row type="flex" justify="space-between">
                      <el-col :span="24"><el-input v-model="user.code" :maxlength="6" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
                      <el-col :span="0" style="text-align: right;"><timer-btn ref="timerbtn" v-on:run="sendCode" style="position: absolute;right: 1px;top: 2px;background: #eaeaea;;border: 0;"></timer-btn></el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" style="width:100%;" @click="submitForm('user')">下一步</el-button>
                  </el-form-item>

                </div>
              </div>
            </el-form>
          </div>
          <!--重置密码-->
          <div class="formBox"  v-if="showSecond" key="2">
            <el-form :model="password" :rules="rules" ref="password" style="position:relative;">
              <div class="bgfff">
                <div class="w500">

                  <el-form-item prop="password">
                    <el-input v-model.trim="password.password" placeholder="新密码" type="password"></el-input>
                  </el-form-item>

                  <el-form-item prop="password_confirmation">
                    <el-input v-model.trim="password.password_confirmation" placeholder="确认新密码" type="password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" style="width:100%;" @click="submitForm2('password')">确认</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
          <!--第三步-->
          <div v-if="showThird" style="width: 500px;margin: 0 auto;">
            <div class="text-success">您的密码已重置成功，请牢记您的密码！</div>
            <div class="textbtn-cen">
              <router-link :to="{name:'login'}">
                <el-button type="primary" style="width: 280px;margin-bottom: 40px;">马上登录</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <simple-footer></simple-footer>
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
            callback(new Error('未找到该手机号'))
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
      };
      //重复密码
      var password_confirmation = (rule, value, callback) => {
        if (!/^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]+$)[a-zA-Z\d~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
        }else if (value !== this.password.password) {
          callback(new Error('两次密码输入不一致'));
        }else{
          callback()
        }
      };
      return {
        active:1,
        showThird:false,
        showSecond:false,
        //      图片验证码
        img: {
          loginCode: '',
          imgSrc: API.pic,
          changeTime: '',
          imgError: ''
        },
        user:{
          code: '',
          phone_number:''
        },
        password:{
          password:'',
          password_confirmation:''
        },
        phone_number:'',
        captcha:'',
        token:'',
        showforgot:true,
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur'}
          ],
          password_confirmation: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: password_confirmation, trigger: 'blur'}
          ],
          phone_number: [
            {required: true,message: '请输入手机号码', trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}
          ],
          code: [{required: true, message: "请输入验证码", trigger: 'blur'}]
        }
      }
    },
    computed: {
      mmyz(){
        return this.mmyz = this.user.password != this.user.password_confirmation ? true : false
      }
    },
    methods:{
      changeImg(){
        let timestamp = Date.parse(new Date()) + ''
        this.img.changeTime = timestamp.substring(0, 10)
      },
     // 验证码
      sendCode(){
        this.$refs.user.validateField('phone_number',(error)=>{
          if(!error){
            this.$http.post(API.url + 'validations', {reciever: this.user.phone_number},).then(() => {
              this.$refs.timerbtn.start();
            }).catch(() => {
            })
          }
        })
      },
      // 忘记密码提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(API.url+'customer/users/forgot/password',{
            account:this.user.phone_number,
            code:this.user.code
          }).then((res) => {
            //成功
            this.active++
            this.token = res.body.token
            this.showforgot = false
            this.showSecond = true
            this.showThird = false
          }).catch((res) => {
            var registerErrors = res.body
            var details='';
            var errorCode=registerErrors.code;
            if(errorCode == 4001){
              details = '验证码错误！'
            }
            this.$confirm(details, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error'
            }).then()
          })
          } else {
            return false;
          }
        });
      },
      //重置密码
      submitForm2(formName) {
         this.$refs[formName].validate((valid) => {
           if (valid) {
             this.$http.post(API.url+'customer/users/reset/password',{
                token:this.token,
                user: this.password
              }).then((res)=>{
                //成功
                this.active = 3
                this.showforgot = false
                this.showSecond = false,
                this.showThird = true
                // this.$router.push({name: 'forgotpasswordsuccess'})
              }).catch((res) => {
                //失败
              })
           } else {
             return false;
           }
         });
      },
    }
  }
</script>
<style scoped>
/*  .st-mheight{
    min-height: calc(100vh - 98px - 68px);
    box-sizing: border-box;
  }*/
.revise-box{
  width: 1048px;
  height: 400px;
  margin: 0 auto;
  background: #fff;
  padding-top: 50px;
}
.forgotPassword{
  font-size: 18px;
}
.formBox{
  width: 340px;
  margin: 0 auto;
}
.qiyejihuo{
  width: 1048px;
  margin: 0 auto 10px;
  font-size: 16px;
  height: 20px;
  padding-left: 10px;
  border-left: 5px solid #3c8ced;
}
.find-password{
  width: 1048px;
  margin: 0 auto;
  background: #fff;
  padding-top: 50px;
  border: 1px solid #e2e2e2;
}
.w600{
  width: 594px;
  margin: 0 auto 30px;
}
.textbtn-cen{
  width: 338px;
  margin: 0 auto;
  text-align: center;
}
.text-success{
  text-align: center;
  padding: 20px 0 70px;
}
</style>
