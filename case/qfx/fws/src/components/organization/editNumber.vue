<template>
  <div class="create-role">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'organization' }">组织架构</el-breadcrumb-item>
      <el-breadcrumb-item>编辑账号</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addrole">
      <el-row>
        <el-col :span="12">
          <el-form ref="supplier" :model="supplier" label-width="100px" :rules="rules">
            <!-- 手机号 -->
            <el-form-item label="手机号" prop="phone_number">
              <i class="dian3">*</i>
              <el-input v-model="supplier.phone_number" :maxlength="11" :disabled="true"></el-input>
            </el-form-item>

            <!-- 用户名称 -->
            <el-form-item label="用户名称" prop="name">
              <i class="dian2">*</i>
              <el-input v-model="supplier.name" :disabled="true"></el-input>
            </el-form-item>

            <!-- 性别 -->
            <el-form-item label="性别">
              <i class="dian">*</i>
              <el-radio-group v-model="supplier.gender">
                <el-radio :label="true">男</el-radio>
                <el-radio :label="false">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <hr>
            <!-- 部门 -->
             <el-form-item label="部门" prop="department_name" style="margin-top: 25px;">
              <i class="dian">*</i>
              <div class="tree" @click.stop="treeShow"><img src="../../assets/images/shangjiantou.png" height="7" width="10" class="shangjiantou">{{department_name}}</div>
            </el-form-item>
            <!-- 树形下拉框 -->
            <div class="tree_cont" v-show="tree_cont">
              <el-tree
                :data="treeListNumber"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick" style="width: 370px; position: absolute; z-index: 10;left: 100px;top: 241px;">
              </el-tree>
            </div>
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
              <el-button type="primary" @click="submitForm('supplier')"  v-loading.fullscreen="fullscreenLoading">确认</el-button>
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
      //判断部门是否为空
      var checkTel = (rule, value, callback) => {
        if (this.department_name == '') {
          callback(new Error('请选择部门'))
        }else{
          callback()
        }
      };
      return {
        rules: {
          department_name: [
            {validator: checkTel, trigger: 'blur'}
          ]
        },
        fullscreenLoading:false,
        accounts:[],
        supplier:{
          department_id:'',//部门id
          role_id:'',//角色id
          gender:false,//性别
        },
        value: '',
        roles:[],//获取角色列表
        account:[],//用户详情
        id:'',//用户ID
        userId:'',
        department_name:'',//选中的部门名称
        treeListNumber:[],//获取部门树
        tree_cont:false,//部门树隐藏 
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    mounted(){
      document.addEventListener('click', this.treeHide, false);
    },
    computed:{
      ...mapGetters(['departmentZr'])
    },
    created(){
      this.getRoles()
      this.getAccount()
      this.getTree()
    },
    watch: {
        '$route':'getRoles'
    },
    methods: {
      // 新增账号
      submitForm(formName) {
        this.userId = this.id //用户id等于传过来的id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$http.put(API.serviceurl + 'supplier/accounts/'+ this.userId,{
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
      },
      // 获取用户详情
      getAccount(){
        this.id = this.$route.params.id
        this.$http.get(API.serviceurl + 'supplier/accounts/'+ this.id
        ).then((res) => {
          this.account = res.body.supplier
          this.supplier.phone_number = this.account.phone_number
          this.supplier.name = this.account.name
          this.supplier.gender = this.account.gender
          this.department_name = this.account.department
          this.supplier.department_id = this.account.department_id
          if (this.account.role != null || this.account.role != undefined ) {
            this.supplier.role_id = this.account.role.name
            this.supplier.role_id = this.account.role.id
          }
        })
      },
      //获取部门树
      getTree(){
        this.$http.get(API.serviceurl + 'supplier/departments/tree'
        ).then((res) => {
          this.treeListNumber = res.body.departments
        })
      },
      // 点击树显示隐藏
      treeShow(){
        this.tree_cont = !this.tree_cont
      },
      treeHide(){
        this.tree_cont = false
      },
      handleNodeClick(data) {
        this.supplier.department_id = data.id
        this.$store.dispatch('department_id',{'departmentZr':data})
        this.tree_cont = false
        this.department_name = data.name
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-checkbox + .el-checkbox {
    display: block;
    margin-left: 0;
  }
  .create-role{
    .el-form-item{
      position:relative;
    }
  }
.dian,.dian2,.dian3{
  position: absolute;
  left: -50px;
  top: 3px;
  color: red;
}
.dian3{
  left: -64px;
  top: 3px;
}
.dian2{
  left: -80px;
  top: 1px;
}
</style>
