<template>
  <div class="mainpart2">
    <p class="qiyejihuo">企业账号激活</p>
    <div class="revise-box">
      <div class="formBox">
        <el-form :model="activation" :rules="rules" ref="activation" label-width="120px" style="position:relative;">
          <div class="bgfff">
            <div class="w500">

              <el-form-item label="手机号码" prop="phone_number">
                <el-input  v-model="activation.phone_number" placeholder="请输入11位手机号码" :maxlength="11"></el-input>
              </el-form-item>

              <el-form-item label="验证码" prop="code">
                <el-row type="flex" justify="space-between">
                  <el-col :span="16"><el-input v-model="activation.code" :maxlength="6" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
                  <el-col :span="8" style="text-align: right"><timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn></el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="设置密码" prop="newval">
                <el-input v-model.trim="activation.newval" placeholder="新密码" type="password"></el-input>
              </el-form-item>

              <el-form-item label="重复密码" prop="checkval">
                <el-input v-model.trim="activation.checkval" placeholder="确认新密码" type="password"></el-input>
              </el-form-item>
              <el-button type="primary" style="width: 454px;margin: 0 0 30px 47px;" @click="submitForm('activation')">提交</el-button>
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
        }else if (value !== this.activation.newval) {
          callback(new Error('两次密码输入不一致'));
        }else{
          callback()
        }
      };
      return {
        activation: {
          newval:'',
          checkval:'',
          phone_number:'',
          code:'',
        },
        show:{
          password:false,
          code:false
        },
        rules: {
          newval: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur'}
          ],
          phone_number: [
            {required: true,message: '请输入手机号码', trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}
          ],
          code: [{required: true, message: "请输入验证码", trigger: 'blur'}],
          checkval: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: password_confirmation, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      // 验证码
      sendCode(){
        this.$refs.activation.validateField('phone_number',(error)=>{
          if(!error){
            this.$http.post(API.url + 'validations', {reciever: this.activation.phone_number},).then(() => {
              this.$refs.timerbtn.start();
            }).catch(() => {
            })
          }
        })
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$http.post(API.url + 'customer/users/active', {
              'user[phone_number]': this.activation.phone_number,
              'user[password]': this.activation.password,
              'user[password_confirmation]':this.activation.checkval,
              code: this.activation.code
            }, {
              emulateJSON: true,
              withCredentials: true
            }).then((res) => {
              this.$router.push({name: 'activationSuccess'})
            }).catch((res) => {
              var registerErrors = res.body
              var details='';
              var errorCode=registerErrors.code;
              if(errorCode == 4001){
                details = '验证码错误！'
              }else if (errorCode == 4002) {
                details = '该手机号已被激活'
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
      backTo(){
        this.$router.go(-1)
      },
      errorHide(){
        this.errorMsg = false
      }
    }
  }
</script>

<style scoped>
.mainpart2 {
    background-color: #f5f5f5;
    position: relative;
    z-index: 1;
    padding-top: 80px;
}
  .qiyejihuo{
    width: 1048px;
    margin: 0 auto 10px;
    font-size: 16px;
    height: 20px;
    padding-left: 10px;
    border-left: 5px solid #3c8ced;
  }
  .revise-box{
    width: 1048px;
    margin: 0 auto;
    background: #fff;
    padding-top: 50px;
    border: 1px solid #e2e2e2;
  }
  .tijiao{
    width: 380px;
  }
.formBox{
  width: 500px;
  margin: 0 auto;
}
.code{
  position: absolute;
  right: -91px;
  top: 184px;
  font-size: 14px;
  color: red;
}
.password{
    position: absolute;
    right: -127px;
    top: 8px;
    font-size: 14px;
    color: red;
}
</style>
