<template>
  <div class="mainpart">
    <div class="register">
      <h2 class="title">企业用户注册</h2>
      <div class="userinfor">
        <el-form :model="register" :rules="rules" ref="user_register" label-width="120px">
          <h3 class="tit-02">用户信息</h3>
          <div class="bgfff">
            <div class="w500">

              <el-form-item label="手机号码" prop="phone_number">
                <el-input v-model="register.phone_number" placeholder="请输入11位手机号码" :maxlength="11"></el-input>
              </el-form-item>

              <el-form-item label="验证码" prop="code">
                <el-row type="flex" justify="space-between">
                  <el-col :span="16">
                    <el-input v-model="register.code" :maxlength="6" placeholder="请输入6位验证码"
                              style="width: 100%;"></el-input>
                  </el-col>
                  <el-col :span="8" style="text-align: right">
                    <timer-btn ref="timerbtn" v-on:run="sendCode"></timer-btn>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="设置密码" prop="newval">
                <el-input v-model.trim="register.newval" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>

              <el-form-item label="重复密码" prop="checkval">
                <el-input v-model.trim="register.checkval" placeholder="请确认密码" type="password"></el-input>
              </el-form-item>

              <el-form-item label="姓名" prop="name">
                <el-input v-model="register.name" placeholder="请输入姓名"></el-input>
              </el-form-item>

              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="register.sex">
                  <el-radio label="true">男</el-radio>
                  <el-radio label="false">女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="固定电话" prop="fixtel">
                <el-input v-model="register.fixtel" placeholder="请输入固定电话 例:021-57431234"></el-input>
              </el-form-item>

              <el-form-item label="职位名称" prop="position">
                <el-input v-model="register.position"></el-input>
              </el-form-item>

            </div>
          </div>
          <h3 class="tit-02 tit-bk">企业信息</h3>
          <div class="bgfff">
            <div class="w500">
              <el-form-item label="企业名称" prop="corpname">
                <el-input v-model="register.corpname" placeholder="请填写与工商营业执照中相同的企业全称"></el-input>
              </el-form-item>

              <div class="el-form-item is-required">
                <label class="el-form-item__label" style="width: 120px;">注册地址</label>
                <div class="wf_address" :class="{wf_address_error:showAddressError}">
                  <v-distpicker :placeholders="placeholders" @province="selectProvince" @city="selectCity"
                                @area="selectArea"></v-distpicker>
                  <div class="el-form-item__error pf_shen">请选择企业地址</div>
                </div>
              </div>

              <el-form-item prop="corpaddress" label-width="120px">
                <el-input v-model="register.corpaddress" placeholder="街道  门牌  建筑名  房间号"></el-input>
              </el-form-item>

              <el-form-item prop="agree" label-width="120px">
                <el-checkbox-group v-model="register.agree">
                  <el-checkbox label="true">阅读并同意

                    <router-link :to="{name:'agreement'}" target=_blank >《企服星用户服务协议》</router-link>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label-width="120px">
                <el-button type="primary" @click="submitForm('user_register')">立即创建</el-button>
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
  import timerBtn from './timerBtn.vue'
  import VDistpicker from 'v-distpicker'
  export default{
    components: {timerBtn, VDistpicker},
    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
        this.$http.post(API.url + 'validations/unique', {
          model: 'customer',
          attribute: 'phone_number',
          value: value
        }).then((res) => {
          var resBody = res.body;
          if (resBody.exsist) {
            callback(new Error('手机号码已被注册'))
          } else {
            callback()
          }
        })
      };
      //企业名称
      var checkCorpName = (rule, value, callback) => {
        this.$http.post(API.url + 'validations/unique', {
          model: 'Corp',
          attribute: 'name',
          value: value
        }).then((res) => {
          var resBody = res.body;
          if (resBody.exsist) {
            callback(new Error('企业已被注册'))
          } else {
            callback()
          }
        })
      };
      //密码
      var password = (rule, value, callback) => {
        if (!/^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]+$)[a-zA-Z\d~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
        } else {
          callback()
        }
      };
      //重复密码
      var password_confirmation = (rule, value, callback) => {
        if (!/^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]+$)[a-zA-Z\d~!@#$%^&*()_\+\-\=\[\]\{\}\\|`;:"'<>,.?\/]{6,20}$/.test(value)) {
          callback(new Error('必须由6-20位字母，数字和符号两种以上组合'));
        } else if (value !== this.register.newval) {
          callback(new Error('两次密码输入不一致'));
        } else {
          callback()
        }
      };
      //固定电话
      var checkfixNumber = (rule, value, callback) => {
        if (value == '') {
          callback();
        }
        else if (!(/^0\d{2,3}-\d{5,9}-*\d{0,4}$/.test(value))) {
          callback(new Error('固定电话格式有误，请重新输入'));
        }
        else {
          callback();
        }
      }
      return {
        //城市地址
        showAddressError: false,
        placeholders: {
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        register: {
          phone_number: '',
          code: '',
          newval: '',
          checkval: '',
          name: '',
          sex: '',
          fixtel: '',
          position: '',
          corpname: '',
          corpaddress: '',
          agree: []
        },
        select: {province: '', city: '', area: ''},
        rules: {
          phone_number: [
            {required: true, message: "请输入手机号码", trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}],
          code: [{required: true, message: "请输入验证码", trigger: 'blur'}],
          newval: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: password, trigger: 'blur'}],
          checkval: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: password_confirmation, trigger: 'blur'}],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}],
          sex: [{required: true, message: '请选择性别', trigger: 'change'}],
          fixtel: [{validator: checkfixNumber, trigger: 'blur'}],
          position: [{min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}],
          corpname: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'},
            {validator: checkCorpName, trigger: 'blur'}],
          corpaddress: [{required: true, message: '请输入地址', trigger: 'blur'},
            {min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}],
          agree: [{type: 'array', required: true, message: '请同意协议并勾选', trigger: 'change'}]
        }
      }
    },
    methods: {
      // 验证码
      sendCode(){
        this.$refs.user_register.validateField('phone_number', (error) => {
          if (!error) {
            this.$http.post(API.url + 'validations', {reciever: this.register.phone_number},).then(() => {
              this.$refs.timerbtn.start();
            }).catch(() => {
            })
          }
        })
      },
      /*返回*/
      go_negative(){
        this.$router.go(-1)
      },
      /*城市*/
      selectProvince(value) {
        this.select.province = value.value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      selectCity(value) {
        this.select.city = value.value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      selectArea(value) {
        this.select.area = value.value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      //提交注册
      submitForm(formName) {
        if (this.select.province == '' || this.select.city == '' || this.select.area == '' ||
          this.select.province == '请选择省' || this.select.city == '请选择市' || this.select.area == '请选择区') {
          this.showAddressError = true
        } else {
          this.showAddressError = false
        }
        this.$refs[formName].validate((valid) => {
          if (valid && !this.showAddressError) {
            this.$http.post(API.url + 'customer/users/signup', {
              user: {
                phone_number: this.register.phone_number,
                name: this.register.name,
                gender: this.register.sex,
                password: this.register.newval,
                password_confirmation: this.register.checkval,
                fixed_phone: this.register.fixtel,
                position: this.register.position,
              },
              corp: {
                name: this.register.corpname,
                province: this.select.province,
                city: this.select.city,
                district: this.select.area,
                location: this.register.corpaddress,
              },
              code: this.register.code,
              agree: this.register.agree[0]
            }).then((res) => {
              //成功
              this.$router.push({path: '/user/registersuccess'})
            }).catch((error) => {
              var errorBody = error.body;
              var details = '';
              var errorCode = errorBody.code;
              if (errorCode == 4001) {
                details = '验证码错误！'
              }
              this.$confirm(details, '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'error'
              }).then()
              return false;
            })
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  .w500 {
    width: 500px;
    margin: 0 auto;
  }

  .wf_address {
    position: relative;
    select {
      width: 122px;
      border: 1px solid #bfcbd9 !important;
      font-size: 14px !important;
    }
    .pf_shen {
      left: 120px;
      display: none;
    }
  }

  .wf_address_error {
    select {
      border-color: red !important;
    }
    .pf_shen {
      display: block;
    }
  }

  .register {
    .el-button--primary {
      width: 100%;
    }
  }
</style>
