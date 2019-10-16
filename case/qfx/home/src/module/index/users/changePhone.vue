<template>
  <div class="mainpart2">
    <div class="breadcrumb" style="width: 1048px;margin: 0 auto;">
      <ul>
        <li><router-link :to="{name:'userCenterDefault'}">用户中心</router-link></li>
        <li><router-link :to="{name:'userEdit'}">用户信息管理</router-link></li>
        <li>修改手机号</li>
      </ul>
    </div>
    <div class="changephone">
        <div class="formBox">
          <el-form :model="changephone" :rules="rules" ref="changephone" label-width="100px" class="demo-ruleForm" style="position:relative;">
            <div class="form-group">
              <p>
                <label for=""><span class="fcred"></span>原手机号码</label>
                <span class="fc5c5 va-middle fs14">{{phonenumber}}</span>
              </p>
            </div>
            <!-- 登陆密码 -->
            <el-form-item label="登录密码" prop="password">
              <el-input v-model="changephone.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <!-- 新手机号码 -->
            <el-form-item label="新手机号码" prop="newPhone">
              <el-input v-model="changephone.newPhone" placeholder="请输入新手机号码" style="width: 100%;" :maxlength="11"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item label="验证码" prop="code">
              <el-row type="flex" justify="space-between">
                <el-col :span="16"><el-input v-model="changephone.code" :maxlength="6" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
                <el-col :span="8" style="text-align: right"><timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn></el-col>
              </el-row>
            </el-form-item>
            <div class="btn">
              <router-link :to="{name:'userEdit'}"><el-button>返回</el-button></router-link>
              <el-button type="primary" @click="submitForm('changephone')">保存</el-button>
            </div>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  import timerBtn from '../login/timerBtn.vue'
  export default{
    components:{
      timerBtn
    },
    data(){
      //密码
      var checkPassword = (rule, value, callback) => {
        if (!(/^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]+$)[a-zA-Z\d~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]{6,20}$/.test(value))) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
          return false
        }
        callback()
      };
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
            callback(new Error('手机号码已被注册'))
          }else{
            callback()
          }
        })
      };
      return {
        changephone:{
          password:'',
          newPhone:'',
          code:''
        },
        show:{
          code:false,
          password:false
        },
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur'}
          ],
          newPhone: [
            {required: true,message: '请输入手机号码', trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}
          ],
          code: [{required: true, message: "请输入验证码", trigger: 'blur'}],
        }
      }
    },
    computed:{
      ...mapGetters(['phonenumber']),
    },
    methods:{
      fanhui(){
        this.$router.go(-1)
      },
      // 验证码
      sendCode(){
        this.$refs.changephone.validateField('newPhone',(error)=>{
          if(!error){
            this.$http.post(API.url + 'validations', {reciever: this.changephone.newPhone},).then(() => {
              this.$refs.timerbtn.start();
            }).catch(() => {
            })
          }
        })
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$http.put(API.url + 'customer/users/change/phone', {
                phone_number: this.changephone.newPhone,
                password: this.changephone.password,
                code: this.changephone.code
              }, {
                emulateJSON: true,
                withCredentials: true
              }).then((res) => {
                this.$router.push({name: 'phonesuccess'})
              }).catch((res) => {
                var registerErrors = res.body
                var details='';
                var errorCode=registerErrors.code;
                if(errorCode==4001){
                  details = '验证码错误！'
                }else if (errorCode==4002) {
                  details = '账号名和密码不匹配，请重新输入！'
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
      }
    }
  }
</script>

<style scoped>
.mainpart2 {
    background-color: #f5f5f5;
    position: relative;
    z-index: 1;
    padding-top: 20px;
}
.changephone{
  width: 1048px;
  margin: 0 auto;
  background: #fff;
  padding-top: 50px;
  border: 1px solid #e2e2e2;
}
.formBox{
  width: 500px;
  margin: 0 auto;
}
.btn{
  width: 500px;
  margin: 0 auto 20px;
}
.code{
  position: absolute;
  right: -91px;
  top: 165px;
  font-size: 14px;
  color: red;
}
.password{
    position: absolute;
    right: -234px;
    top: 47px;
    font-size: 14px;
    color: red;
}
</style>
