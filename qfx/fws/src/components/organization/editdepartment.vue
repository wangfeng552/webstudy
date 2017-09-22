<template>
  <div class="create-role">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'organization' }">组织架构</el-breadcrumb-item>
      <el-breadcrumb-item>编辑部门</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="addrole">
      <el-row>
        <el-col :span="12">
          <el-form ref="roleForm" :model="roleForm" label-width="100px" :rules="rules" style="position: relative;">
            <i class="adddian2">*</i>
            <el-form-item label="上级部门" prop="department_name">
              <div class="tree" @click.stop="treeShow"><img src="../../assets/images/shangjiantou.png" height="7" width="10" class="shangjiantou">{{sectionName}}</div>
            </el-form-item>

            <!-- 树形下拉框 -->
            <div class="tree_cont" v-show="tree_cont">
              <el-tree
                :data="addSection"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick" style="width: 370px; position: absolute; z-index: 10;left: 100px;top: 39px;">
              </el-tree>
            </div>

            <!-- 部门名称 -->
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="roleForm.name"></el-input>
            </el-form-item>
            
            <!-- 项目负责人 -->
            <el-form-item label="部门负责人">
              <el-select v-model="roleForm.principal_id" placeholder="请选择" style="width: 370px;">
                <el-option
                  v-for="item in sectionCont"
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
              <el-button type="primary" @click="submitForm('roleForm')" v-loading.fullscreen="fullscreenLoading">确认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div>{{top}}</div>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  export default{
    data(){
      //判断部门是否为空
      var checkTel = (rule, value, callback) => {
        if (this.sectionName == '') {
          callback(new Error('请选择部门'))
          this.addred = true
        }else{
          callback()
        }
      };
      return {
        roleForm: {
          name: '',
          parent_id:'',//上级部门
          principal_id:'',//项目负责人
        },
        id:'',
        fullscreenLoading:false,
        sectionCont:[],
        tree_cont:false,
        sectionName:'',//选择的部门名称
        addSection:[],//获取树列表
        superiorDepartment:'',//上级部门
        code:'',
        rules: {
          department_name: [
            {validator: checkTel, trigger: 'blur'}
          ],
          name: [
            {required: true, message: "请输入部门名称", trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        value: ''
      }
    },
    mounted(){
      document.addEventListener('click', this.treeHide, false);
    },
    computed:{
      top(){
        if (this.sectionName == null) {
          this.sectionName = '顶级部门'
        }
      }
    },
    created(){
      this.getTree()
      this.personInCharge()
      this.getDepartment()
    },
    methods: {
      treeShow(){
        this.tree_cont = !this.tree_cont
      },
      treeHide(){
        this.tree_cont = false
      },
      handleNodeClick(data) {
        this.tree_cont = false
        this.roleForm.parent_id = data.id
        this.sectionName = data.name
      },
      //获取部门树
      getTree(){
        this.$http.get(API.serviceurl + 'supplier/departments/tree'
        ).then((res) => {
          this.addSection = res.body.departments
          this.addSection.unshift({id:'',name:'顶级部门'})
        })
      },
      //获取项目负责人
      personInCharge(){
        this.id = this.$route.params.id
        this.$http.get(API.serviceurl + 'supplier/accounts?department_id='+this.id
          ).then((res) => {
            this.sectionCont = res.body.suppliers
        })
      },
      // 新增部门
      submitForm(formName) {
        this.id = this.$route.params.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.fullscreenLoading = true
              this.$http.put(API.serviceurl + 'supplier/departments/'+this.id,{
                department: this.roleForm
              }).then((res) => {
                this.accounts = res.body
                this.$router.push({name: 'organization'})
            }).catch((res) =>{
              this.code = res.body.code
              console.log(res.body.details.ancestry[0])
              if (this.code == '4002') {
                this.fullscreenLoading = false
                this.$alert(res.body.details.ancestry[0], '提示', {
                  confirmButtonText: '确定',
                  closeOnClickModal:true,
                  callback: action => {
                    
                  }
                })
              }
            })
          }
        })
      },
      // 获取部门详情
      getDepartment(){
        this.id = this.$route.params.id
        this.$http.get(API.serviceurl + 'supplier/departments/'+ this.id
        ).then((res) => {
          this.account = res.body.department
          this.roleForm.name = this.account.name
          this.sectionName = this.account.parent_name
          this.roleForm.principal_id = this.account.principal_name
          this.roleForm.parent_id = this.account.parent_id
          this.roleForm.principal_id = this.account.principal_id
        })
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-checkbox + .el-checkbox {
    display: block;
    margin-left: 0;
  }
  .adddian2{
    position: absolute;
    left: 22px;
    top: 9px;
    color: #ff4949;
  }
</style>
