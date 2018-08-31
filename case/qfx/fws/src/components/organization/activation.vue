<template>
  <div class="mainpart">
    <topHeader></topHeader>
    <p class="qiyejihuo">服务商账号激活</p>
    <div class="revise-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- 手机号码 -->
          <el-form-item label="手机号码" prop="phone_number">
            <el-input v-model="ruleForm.phone_number" placeholder="请输入11位手机号码" style="width: 100%;"></el-input>
            <span v-show="sendpassword" class="errorInfo">该用户已被激活</span>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item label="验证码" prop="code">
            <el-row type="flex" justify="space-between">
              <el-col :span="18"><el-input v-model="ruleForm.code" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
              <el-col :span="6" style="text-align: right"><timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn></el-col>
            </el-row>
          </el-form-item>
          <!-- 密码 -->
         <el-form-item label="密码" prop="password">
           <el-input v-model="ruleForm.password" placeholder="请输入密码" style="width: 100%;" type="password"></el-input>
         </el-form-item>
         <!-- 重复密码 -->
         <el-form-item label="重复密码" prop="password_confirmation">
           <el-input v-model="ruleForm.password_confirmation" placeholder="请再次输入密码" style="width: 100%;" type="password"></el-input>
         </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
    <blackFooter style="margin-top: 400px;"></blackFooter>
  </div>
</template>

<script>
  import API from 'API/api'
  import timerBtn from '../common/timerBtn.vue'
  import topHeader from '../common/topHeader.vue'
  import blackFooter from '../common/blackFooter.vue'

  export default{
    components:{
      timerBtn,
      topHeader, blackFooter
    },
    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
        this.$http.get(API.serviceurl + 'supplier/users/valid_phone_number', {
          params: {
            phone_number: this.ruleForm.phone_number,
            type: 'Supplier'
          }
        }).then((res) => {
          var exist = res.body.exist
          if (exist == false) {
            this.phoneTrue = false
            this.jsyzc = false
            callback(new Error('未找到该手机号'))
          }
          else {
            this.phoneTrue = true
            this.jsyzc = true
            callback()
          }
        })
      };
      //验证码
      var code = (rule, value, callback) => {
        if (!/^[0-9]{6}$/.test(value)) {
          callback(new Error('请输入6位数验证码'));
        }else{
          callback()
        }
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
        }else if (this.ruleForm.password !== this.ruleForm.password_confirmation) {
          callback(new Error('两次密码输入不一致'));
        }else{
          callback()
        }
      };
      return {
        ruleForm:{
          phone_number:'',
          code:'',
          phoneTrue:'',
          password:'',
          password_confirmation:''
        },
        sendpassword:false,
        jihuo:false,
        rules:{
          phone_number: [
              {required: true, message: '请输入手机号码', trigger: 'blur'},
              {validator: checkTel, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: code, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: password, trigger: 'blur'}
          ],
          password_confirmation: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: password_confirmation, trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      // 验证码
      sendCode(){
        if (this.ruleForm.phone_number != "" && this.jsyzc) {
          this.$http.post(API.serviceurl + 'validations/generate', {reciever: this.ruleForm.phone_number}, {
            emulateJSON: true,
            withCredentials: true
          }).then(() => {
            this.$refs.timerbtn.start();
          }).catch(() => {
          })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.patch(API.serviceurl + 'supplier/providers', {
              'user[phone_number]': this.ruleForm.phone_number,
              'user[password]': this.ruleForm.password,
              'user[password_confirmation]':this.ruleForm.password_confirmation,
              code: this.ruleForm.code
            }, {
              emulateJSON: true,
              withCredentials: true
            }).then((res) => {
              this.$router.push({name: 'activationsuccess'})
            }).catch((res) => {
              this.registerErrors = res.body
              if (this.registerErrors.code === 4041) {
                this.sendpassword = true;
              }
              if (this.registerErrors.code === 4001) {
                this.jihuo = true
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped="">
.demo-ruleForm{
  width: 577px;
  margin: 0 auto;
}
.mainpart2 {
    background-color: #f5f5f5;
    position: relative;
    z-index: 1;
    padding-top: 80px;
}
  .qiyejihuo{
    width: 1048px;
    margin: 30px auto 10px;
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
.revise-box .el-icon-loading{
  display: none;
}
.errorInfo{
    position: absolute;
    right: -107px;
    top: 1px;
    color: red;
}
</style>
