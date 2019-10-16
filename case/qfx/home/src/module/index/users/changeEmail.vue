<template>
  <div class="main">
    <div class="breadcrumb">
      <ul>
        <li><router-link :to="{name:'userCenterDefault'}">用户中心</router-link> &gt;</li>
        <li>企业信息管理</li>
      </ul>
    </div>
    <div class="revise-box change_email">
      <form @submit.prevent="changeEmailBeforeSubmit">
        <div class="form-group">
          <p>
            <label for=""><span class="fcred"></span>原邮箱地址</label>
            <!-- <span class="fca9a va-middle fs14">{{userInfo.user.email=="unset" ?'未设置':userInfo.user.email}}</span> -->
          </p>
        </div>

        <div class="form-group">
          <label for=""><span class="fcred">*</span> 登录密码</label>
          <input
            v-model="password"
            v-validate="'required|password'"
            @blur="password_blur"
            name="密码"
            class="form-control" maxlength="20" type="password">
          <div class="form-correct" v-show="show.password"></div>
          <div class="form-error" v-show="errors.has('密码')">{{ errors.first('密码') }}</div>
          <div class="form-error" v-show="show.sendpassword">账号名和密码不匹配，请重新输入</div>
        </div>

        <div class="form-group">
          <label for=""> 新邮箱地址</label>
          <input
            v-model="email"
            v-validate="'email|required'"
            @blur="email_blur"
            name="邮箱"
            class="form-control" placeholder="请输入新邮箱地址" type="text">
          <div class="form-correct" v-show="show.email"></div>
          <div class="form-error" v-show="errors.has('邮箱')">{{errors.first('邮箱')}}</div>
        </div>

        <div class="form-group">
          <label for=""><span class="fcred">*</span> 验证码</label>
          <input
            v-model="code"
            v-validate="'required|min:6'"
            @blur="sendCode_blur"
            name="验证码"
            class="form-control" maxlength="6" placeholder="请输入6位验证码" type="text">
          <timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn>
          <div class="form-correct" v-show="show.code"></div>
          <div class="form-error" v-show="errors.has('验证码')">{{ errors.first('验证码') }}</div>
          <div class="form-error" v-show="show.yz_code">验证码错误</div>
        </div>

        <a class="btn btn-grey return" @click.prevent="fanhui">返回</a>
        <input class="btn btn-blue" type="submit" value="保存">
      </form>
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
      return {
        show: {
          email: false,
          password: false,
          code: false,
          yz_code:false,
          sendpassword:false
        },
        email: '',
        password: '',
        code: ''
      }
    },
    props:{
      userInfo:{
        type:Object
      }
    },
    methods:{
      fanhui(){
        this.$router.go(-1)
      },
      password_blur() {
        if(this.password !== "" && !this.$validator.getErrors().has('密码')){
          this.show.password = true
        }else {
          this.show.password = false
        }
      },
      email_blur(){
        if(this.email !== '' && !this.$validator.getErrors().has('邮箱')){
          this.show.email = true
        }else {
          this.show.email = false
        }
      },
      // 验证码
      sendCode(){
        if (this.email != "" && !this.$validator.getErrors().has('邮箱')) {
          this.$http.post(API.url + 'validations/generate', {reciever: this.email}, {
            emulateJSON: true,
            withCredentials: true
          }).then(() => {
            this.$refs.timerbtn.start();
          }).catch(() => {
          })
        }
      },
      sendCode_blur(){
        if(this.code !== '' && !this.$validator.getErrors().has('验证码')){
          this.show.code = true
        }else {
          this.show.code = false
        }
      },
      // 保存
      changeEmailBeforeSubmit() {
        this.$validator.validateAll().then((res) => {
          this.$http.put(API.url + 'customer/users/' + this.userInfo.user.id + '/change/email', {
            email: this.email,
            password: this.password,
            code: this.code
          }, {
            emulateJSON: true,
            withCredentials: true
          }).then((res) => {
            this.$router.push({name: 'userCenterDefault'})
          }).catch((res) => {
            this.registerErrors = res.body
            if (this.registerErrors.code === 4001) {
              this.show.yz_code = true;
            } else {
              this.show.yz_code = false;
            }
            if (this.registerErrors.code === 4012) {
              this.show.sendpassword = true;
            }
          })
        })
      }
    }
  }
</script>

<style>

</style>
