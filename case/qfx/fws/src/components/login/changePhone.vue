<template>
  <div class="usercenter">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'userCenter' }">账号信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改手机</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userinfo" v-if="isValue">
      <el-form :rules="rules" ref="userinfo" :model="userinfo" label-width="335px" class="userinfoform">

        <el-form-item label="原手机号码">
          <span>{{phone_number}}</span>
        </el-form-item>

        <el-form-item label="登录密码" prop="oldval">
          <el-input v-model="userinfo.oldval" type="password"></el-input>
        </el-form-item>

        <el-form-item label="新手机号码" prop="newval">
          <el-input v-model="userinfo.newval"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-row type="flex" justify="space-between">
            <el-col :span="15"><el-input v-model="userinfo.code" placeholder="请输入验证码" style="width: 100%;"></el-input></el-col>
            <el-col :span="8" style="text-align: right"><timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn></el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="savePhone('userinfo')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  import timerBtn from '../common/timerBtn.vue'
  export default{
    components:{timerBtn},
    computed:{
      isValue(){
        if (this.$store.state.admin.admin) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters(['phone_number']),
    },

    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
        this.$http.post(API.serviceurl+'validations/unique',{
          model:'supplier',
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
      //密码
      var password = (rule, value, callback) => {
        if (!/^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
        }else{
          callback()
        }
      };
      return {
        rules:{
          oldval:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            {validator: password, trigger: 'blur'}
          ],
          newval:[
            { required: true, message: '请输入新手机号', trigger: 'blur' },
            {validator: checkTel, trigger: 'blur'}
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        userinfo:{
          oldval:'',
          newval:'',
          code:'',
        }
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      // 验证码
      sendCode(){
        this.$refs.userinfo.validateField('newval',(error)=>{
          if(!error){
            this.$http.post(API.serviceurl + 'validations', {reciever: this.userinfo.newval},).then(() => {
              this.$refs.timerbtn.start();
            }).catch(() => {
            })
          }
        })
      },
      //保存
      savePhone(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put(API.url+'users/change/phone',{
              password:this.userinfo.oldval,
              phone_number:this.userinfo.newval,
              code:this.userinfo.code
            }).then((res) => {
              this.$router.push({name:'changePhoneSuccess'})
            }).catch((error)=>{
              var errorBody=error.body;
              var details='';
              var errorCode=errorBody.code;
              if(errorCode==4012){
                details = '账号名和密码不匹配，请重新输入！'
              }else if(errorCode==4001){
                details = '验证码错误！'
              }
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
