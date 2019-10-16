<template>
  <div class="usercenter">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'userCenter' }">账号信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userinfo">
      <el-form :rules="rules" ref="userinfo" :model="userinfo" label-width="335px" class="userinfoform">

        <el-form-item label="旧密码" prop="oldval">
          <el-input v-model="userinfo.oldval" type="password"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newval">
          <el-input v-model="userinfo.newval" type="password"></el-input>
        </el-form-item>

        <el-form-item label="重复新密码" prop="repeatval">
          <el-input v-model="userinfo.repeatval" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="savePassword('userinfo')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import API from 'API/api'
  export default{
    data(){
      //旧密码
      var oldpassword = (rule, value, callback) => {
        if (!/^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
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
        }else if (value !== this.userinfo.newval) {
          callback(new Error('两次密码输入不一致'));
        }else{
          callback()
        }
      };
      return {
        rules:{
          oldval:[
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            {validator: oldpassword, trigger: 'blur'}
          ],
          newval:[
            { required: true, message: '请输入新密码', trigger: 'blur' },
            {validator: password, trigger: 'blur'}
          ],
          repeatval:[
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            {validator: password_confirmation, trigger: 'blur'}
          ]
        },
        userinfo:{
          oldval:'',
          newval:'',
          repeatval:'',
        }
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      savePassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put(API.url+'users/change/password',{
              old_password:this.userinfo.oldval,
              password:this.userinfo.newval,
              password_confirmation:this.userinfo.repeatval,
            }).then((res)=> {
              this.$router.push({name:'changePasswordSuccess'})
            }).catch((error)=>{
              var errorBody=error.body;
              var details=errorBody.details
              this.$confirm(details, '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'error'
              }).then()
              return false;
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped="">
  .usercenter{
  .el-button{
    min-width:98px;
  }
  }
  .userinfoform{
    width: 650px;
    margin-top: 40px;
  }
</style>
