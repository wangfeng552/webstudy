<template>
  <div class="mainpart2">
    <div class="breadcrumb" style="width: 1048px;margin: 0 auto;">
      <ul>
        <li><router-link :to="{name:'userCenterDefault'}">用户中心</router-link></li>
        <li><router-link :to="{name:'userEdit'}">用户信息管理</router-link></li>
        <li>修改密码</li>
      </ul>
    </div>
    <div class="revise-box">
      <div class="formBox">
        <el-form :model="changePassword" :rules="rules" ref="changePassword" label-width="120px" style="position:relative;">
          <div class="bgfff">
            <div class="w500">
              <el-form-item label="旧密码" prop="old_password">
                <el-input v-model.trim="changePassword.old_password" placeholder="请输入旧密码" type="password"></el-input>
              </el-form-item>

              <el-form-item label="设置密码" prop="password">
                <el-input v-model.trim="changePassword.password" placeholder="新密码" type="password"></el-input>
              </el-form-item>

              <el-form-item label="重复密码" prop="password_confirmation">
                <el-input v-model.trim="changePassword.password_confirmation" placeholder="确认新密码" type="password"></el-input>
              </el-form-item>
              <div class="btn">
                <router-link :to="{name:'userEdit'}"><el-button>返回</el-button></router-link>
                <el-button type="primary" @click="submitForm('changePassword')">保存</el-button>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  export default{
    data(){
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
        }else if (value !== this.changePassword.password) {
          callback(new Error('两次密码输入不一致'));
        }else{
          callback()
        }
      };
      return {
        changePassword: {
          password:'',
          password_confirmation:'',
          old_password:'',
        },
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur'}
          ],
          old_password: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur'}
          ],
          password_confirmation: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: password_confirmation, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      // 保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put(API.url + 'customer/users/change/password', this.changePassword
           ).then((response) => {
            this.$router.push({name: 'passwordsuccess'})
           }).catch((response) => {
                var registerErrors = response.body
                var details='';
                var errorCode=registerErrors.code;
                if (errorCode==4001) {
                  details = '旧密码错误'
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
        this.errorMsg = false,
        this.show.old_password = false
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
  .revise-box{
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
    margin: 0 0 20px 55px;
  }
</style>
