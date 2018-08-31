<template>
<div class="usercenter">
  <el-breadcrumb separator=">">
    <el-breadcrumb-item>账号信息</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="userinfo" v-if="iflogin">
    <el-form ref="userinfo" :rules="rules" :model="userinfo" label-width="335px" class="userinfoform">
      <el-form-item label="姓名：">
        <span>{{userName}}</span>
      </el-form-item>
      <el-form-item label="手机号码：">
        <span class="mr20">{{phone_number}}</span>
        <router-link :to="{name:'changePhone'}">修改手机</router-link>
      </el-form-item>
      <el-form-item label="固定电话：" prop="fixtel">
        <a href="" v-if="showFix" @click.prevent="setFixtel">设置固话</a>
        <div v-else>
          <div v-if="showEditfix">
            <el-row >
              <el-col :span="17"><el-input v-model="userinfo.fixtel" placeholder="请输入固定电话 例:021-57431234"></el-input></el-col>
              <el-col :span="6" :offset="1">
                <a href="" @click.prevent="saveCancel('userinfo')" class="cancel">取消</a>
                <a href="" @click.prevent="saveFixTel('userinfo')">保存</a>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <span class="mr20">{{fixed_phone}}</span>
            <a href="" @click.prevent="editFixTel">修改固话</a>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="部门：" v-if="department">
        <span>{{department}}</span>
      </el-form-item>
      <el-form-item label="角色：" v-if="department">
        <span>{{roleName}}</span>
      </el-form-item>
      <el-form-item label="登录密码：">
        <router-link :to="{name:'changePassword'}">修改密码</router-link>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  export default{
    created(){
      if(this.fixed_phone==null){
        this.showFix = true
      }else{
        this.showFix = false
      }
      this.userinfo.fixtel = this.fixed_phone
    },
    data(){
      //固定电话
      var checkfixNumber = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入固定电话'));
        }
        else if (!(/^0\d{2,3}-\d{5,9}-*\d{0,4}$/.test(value))) {
          callback(new Error('固定电话格式有误，请重新输入'));
        }
        else {
          callback();
        }
      }
      return {
        userinfo:{
          fixtel:''
        },
        showEditfix:false,
        showFix:'',
        rules:{
          fixtel:[ {validator: checkfixNumber, trigger: 'blur'}]
        }
      }
    },
    computed:{
      iflogin(){
        if (this.$store.state.admin.admin) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters(['userName','phone_number','fixed_phone','department','token','dist_type']),
      //角色名称
      roleName(){
        if(this.supperAdmin){
          var role_name = this.$store.state.admin.admin.user.role.name;
          return role_name
        }
      },
      //判断是否是超级管理员
      supperAdmin(){
        return this.dist_type=='Supplier'
      }
    },
    methods:{
      //设置固话
      setFixtel(){
        this.showFix= false;
        this.showEditfix = !this.showEditfix
      },
      //修改
      editFixTel(){
        this.showEditfix = !this.showEditfix
      },
      //保存
      saveFixTel(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.patch(API.url+'users/fixed_phone',{
              fixed_phone:this.userinfo.fixtel
            }).then((res)=>{
              this.$store.dispatch('login', {user:res.body.user,token:this.token})
              this.showEditfix = !this.showEditfix
            }).catch((error)=>{
            })
          } else {
            return false;
          }
        });
      },
      //取消
      saveCancel(formName){
        if(this.fixed_phone==undefined){
          this.showFix = true
        }
        this.$refs[formName].resetFields();//重置
        this.$nextTick(()=>{
          this.userinfo.fixtel = this.fixed_phone
        })
        this.showEditfix = !this.showEditfix;
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .usercenter{
    .cancel{
      color: #a9a9a9;
      margin-right:14px;
    }
  }
  .userinfoform{
    width: 650px;
    margin-top: 40px;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
</style>
