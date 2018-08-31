<template>
  <div class="mainpart" style="padding-top: 80px;">
    <!--忘记密码-->
    <p class="qiyejihuo">忘记密码</p>
    <div class="revise-box">
      <div class="formBox" v-if="showforgot" key="1">
        <el-form :model="user" :rules="rules" ref="user" label-width="120px" style="position:relative;">
          <div class="bgfff">
            <div class="w500">

              <el-form-item label="手机号码" prop="phone_number">
                <el-input  v-model="user.phone_number" placeholder="请输入11位手机号码" :maxlength="11"></el-input>
              </el-form-item>

              <el-form-item label="图片验证码" prop="imgcode">
                <el-row>
                  <el-col :span="15">
                    <el-input v-model="user.imgcode" placeholder="验证码"></el-input>
                  </el-col>
                  <el-col :span="6"><img :src="this.img.imgSrc+this.img.changeTime" alt="" width="98" height="34"></el-col>
                  <el-col :span="3"><a href="" @click.prevent="changeImg">换一张</a></el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="验证码" prop="code">
                <el-row type="flex" justify="space-between">
                  <el-col :span="16"><el-input v-model="user.code" :maxlength="6" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
                  <el-col :span="8" style="text-align: right"><timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label-width="120px">
                <el-button type="primary" style="width:100%;" @click="submitForm('user')">提交</el-button>
              </el-form-item>

            </div>
          </div>
        </el-form>
      </div>
      <!--重置密码-->
      <div class="formBox" v-else key="2">
        <el-form :model="password" :rules="rules" ref="password" label-width="120px" style="position:relative;">
          <div class="bgfff">
            <div class="w500">

              <el-form-item label="设置密码" prop="password">
                <el-input v-model.trim="password.password" placeholder="新密码" type="password"></el-input>
              </el-form-item>

              <el-form-item label="重复密码" prop="password_confirmation">
                <el-input v-model.trim="password.password_confirmation" placeholder="确认新密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label-width="120px">
                <el-button type="primary" style="width:100%;" @click="submitForm2('password')">提交</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import timerBtn from '../login/timerBtn.vue'
  export default{
    components:{
      timerBtn
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
        //      图片验证码
        img: {
          loginCode: '',
          imgSrc: API.pic,
          changeTime: '',
          imgError: ''
        },
        user:{
          code: '',
          phone_number:'',
          imgcode: '',
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
          code: [{required: true, message: "请输入验证码", trigger: 'blur'}],
          imgcode: [{required: true, message: "请输入图片验证码", trigger: 'blur'}],
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
            captcha:this.user.imgcode,
            code:this.user.code
          }).then((res) => {
            //成功
            this.token = res.body.token
            this.showforgot = false
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
                this.$router.push({name: 'forgotpasswordsuccess'})
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
.revise-box{
  width: 1048px;
  margin: 0 auto;
  background: #fff;
  padding-top: 50px;
  border: 1px solid #e2e2e2;
}
.forgotPassword{
  font-size: 18px;
}
.formBox{
  width: 500px;
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
</style>
