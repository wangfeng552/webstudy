<template>
  <div class="create-role">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'organization' }">组织架构</el-breadcrumb-item>
      <el-breadcrumb-item>新增部门</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="addrole">
      <el-row>
        <el-col :span="12">
          <el-form ref="roleForm" :model="roleForm" label-width="100px" :rules="rules" style="position: relative;">
            <i class="adddian2">*</i>
            <el-form-item label="上级部门" prop="department_name">
              <div class="tree" @click.stop="treeShow" :class="{addred:addred}"><img src="../../assets/images/shangjiantou.png" height="7" width="10" class="shangjiantou">{{sectionName}}</div>
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
            
            <el-form-item>
              <router-link :to="{name: 'organization'}">
                <el-button>返回 </el-button>
              </router-link>
              <el-button type="primary" @click="submitForm('roleForm')" v-loading.fullscreen="fullscreenLoading">确认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
          this.addred = false
          callback()
        }

      };
      return {
        roleForm: {
          name: '',
          parent_id:'',//上级部门
        },
        addred:false,
        tree_cont:false,
        fullscreenLoading:false,
        sectionName:'',//选择的部门名称
        addSection:[],//获取树列表
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
    created(){
      this.getTree()
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
      // 新增部门
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$http.post(API.serviceurl + 'supplier/departments',{
                department: this.roleForm
              }
              ).then((res) => {
                this.accounts = res.body
                this.$router.push({name: 'organization'})
            })
          } else {
            
          }
        });
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
    left: 21px;
    top: 8px;
    color: #ff4949;
  }
  .addred{
    border: 1px solid red;
  }
</style>
