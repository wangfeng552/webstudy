<template>
  <div class="create-role">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'organization' }">组织架构</el-breadcrumb-item>
      <el-breadcrumb-item>新建账号</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addrole">
      <el-row>
        <el-col :span="12">
          <el-form ref="supplier" :model="supplier" label-width="100px" :rules="rules">
            <!-- 手机号 -->
            <el-form-item label="手机号" prop="phone_number">
              <el-input v-model="supplier.phone_number" :maxlength="11"></el-input>
            </el-form-item>

            <!-- 用户名称 -->
            <el-form-item label="用户名称" prop="name">
              <el-input v-model="supplier.name"></el-input>
            </el-form-item>

            <!-- 性别 -->
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="supplier.gender">
                <el-radio label="true">男</el-radio>
                <el-radio label="false">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <hr>
            <!-- 部门 -->
            <el-form-item label="部门">
              <div>{{departmentZr.name}}</div>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item label="角色">
              <el-select v-model="supplier.role_id" placeholder="请选择" style="width: 370px;">
                <el-option
                  v-for="item in roles"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <router-link :to="{name: 'organization'}">
                <el-button>返回 </el-button>
              </router-link>
              <el-button type="primary" @click="submitForm('supplier')" v-loading.fullscreen="fullscreenLoading">确认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        this.$http.get(API.url+'users/valid_phone_number?phone_number='+ this.supplier.phone_number+'&'+'type=Supplier'
          ).then((res)=>{
          var resBody = res.body;
          if(resBody.exist){
            callback(new Error('手机号已被注册'))
          }else{
            callback()
          }
        })
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
      };
      return {
        rules: {
          phone_number: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}
          ],
          name:[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          gender: [{required: true, message: '请选择性别', trigger: 'change'}],
        },
        accounts:[],
        supplier:{
          name:'',//用户名称
          phone_number:'',//手机号
          department_id:'',//部门id
          role_id:'',//角色id
          gender:'',//性别
        },
        value: '',
        roles:[],//获取角色列表
        fullscreenLoading:false,
      }
    },
    computed:{
      ...mapGetters(['departmentZr'])
    },
    created(){
      this.getRoles()
    },
    methods: {
      // 新增账号
      submitForm(formName) {
        this.supplier.department_id = this.departmentZr.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$http.post(API.serviceurl + 'supplier/accounts',{
                supplier: this.supplier
              }
              ).then((res) => {
                this.accounts = res.body
                this.$router.push({name: 'organization'})
            })
          } else {
            
          }
        });
      },
      // 获取角色列表
      getRoles(){
        this.$http.get(API.serviceurl + 'supplier/roles?per=50'
        ).then((res) => {
          this.roles = res.body.roles
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-checkbox + .el-checkbox {
    display: block;
    margin-left: 0;
  }
</style>
