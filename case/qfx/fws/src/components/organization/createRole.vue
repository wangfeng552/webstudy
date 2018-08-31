<template>
  <div class="create-role">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name: 'organization' }">组织架构</el-breadcrumb-item>
      <el-breadcrumb-item>新建角色</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="权限设置" name="first">
        <div class="addrole">
          <el-row>
            <el-col :span="12">
              <el-form ref="role" :model="roleForm" label-width="100px" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="roleForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="type">
                  <el-checkbox-group v-model="roleForm.type">
                    <el-checkbox v-for="abilities in roleForm.abilities" :label="abilities.key" :key="abilities.key">
                      {{abilities.name}}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                  <router-link :to="{name: 'organization'}">
                    <el-button>返回 </el-button>
                  </router-link>
                  <el-button type="primary" @click="onsubmit('role')">确认</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色成员管理" name="second">
        <div class="roleName">角色名称：{{this.roleForm.name}}</div>
        <ul class="nameList">
          <li v-for="(item,index) in items" :key="item">{{item}}<img src="../../assets/images/hongcha.png" height="14" width="14" class="hongcha" @click="delcha(index)"></li>
        </ul>
        <div class="addnumber" @click="showPeopleChoose">
          <img src="../../assets/images/numjia.png" height="12" width="12" class="jiahao">
          <span>添加成员</span>
        </div>
        <el-dialog :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
          <div class="role_box">
            <div class="role_left">
              <p class="bumenName">部门</p>
              <!-- 树形下拉框 -->
                <div class="tree_cover" style="height: 100%;">
                  <el-tree
                    :data="treeList"
                    :props="defaultProps"
                    show-checkbox
                    node-key="id"
                    :default-expand-all="false"
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                    highlight-current
                    @node-click="handleNodeClick">
                  </el-tree>
                </div>
            </div>
            <div class="role_right">
              <p class="bumenName">成员</p>
              <ul class="roleList">
                <el-checkbox-group v-model="checkList" v-for="(administration,index) in administration" @change="addNumberId(administration.id)" :key="administration" style="margin-bottom: 8px;">
                  <el-checkbox :label="administration.name">{{administration.name}}</el-checkbox>
                </el-checkbox-group>
                <li v-if="administration == ''" style="text-align: center;">暂无数据</li>
              </ul>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        dialogVisible: false,
        treeList:[],//获取部门树列表
        role_id:'',//部门ID
        administration:[],//成员列表
        number:'',//点击事的成员名称
        items:[],//列表数组
        idArry:[],//ID数组
        flag:0,//当前显示的li
        roleForm: {
          name: '',
          type: [],
          abilities: ''
        },
        checkList: [],
        activeName:'first',
        rules: {
          name: [
            {required: true, message: "请输入角色名称", trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    computed:{
      ...mapGetters(['numberZr','roleactiveName_zr'])
    },
    created(){
      this.getabilities()
      this.getTree()
      this.tabClick()
    },
    methods: {
      //判断vuex里有没有tab的数据
      tabClick(){
        if (this.roleactiveName_zr == 'second') {
          this.activeName = 'second'
        }else{
          this.activeName = 'first'
        }
      }, 
      // 获取权限设置
      getabilities(){
        this.$http.get(API.serviceurl + 'supplier/roles/abilities'
        ).then((res) => {
          this.roleForm.abilities = res.body.abilities
        })
      },
      // X关闭
      handleClose(){
        this.dialogVisible = false
      },
      // 点击显示弹框
      showPeopleChoose(i){
        this.dialogVisible = true
        this.count = i
      },
      //获取部门树
      getTree(){
        this.$http.get(API.serviceurl + 'supplier/departments/tree'
        ).then((res) => {
          this.treeList = res.body.departments
        })
      },
      //渲染树
      renderContent(h, { node, data, store }) {
        return (
            <span>
              <a class="labelName" title={node.label} style="color:#333;">{node.label}</a>
            </span>
          );
      },
      //点击节点树获取右侧列表数据
      handleNodeClick(data) {
        this.role_id = data.id//点击每个节点部门获取当前的ID
        this.$http.get(API.serviceurl + 'supplier/accounts?department_id='+this.role_id
          ).then((res) => {
            this.administration = res.body.suppliers
        })
      },
      //确认添加成员
      sure(type){
        this.items = this.checkList
        this.dialogVisible = false
      },
      //添加id
      addNumberId(id){
        this.idArry.push(id)
        console.log(this.idArry)
      },
      //删除当前项
      delcha(index){
        this.idArry.splice(index, 1)
        this.items.splice(index, 1)
        console.log(this.idArry)
      },
      //点击tab
      handleClick(tab, event) {
        console.log(this.activeName)
        this.$store.dispatch('roleactiveName_zr',{'roleactiveName_zr':this.activeName})
      },
      //角色权限设置提交
      deleteRow() {
        // 循环下type
        var fd = new FormData();
        fd.append('role[name]', this.roleForm.name)
        fd.append('role[supplier_ids][]', this.idArry)
        this.roleForm.type.forEach((v) => {
          fd.append('role[ability][]', v)
        })
        this.$confirm('确定提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(API.serviceurl + 'supplier/roles', fd
          ).then(this._createRoleSuccess)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      },
      // 提交验证
      onsubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.deleteRow()
          } else {
            return false;
          }
        });
      },
      // 创建角色成功
      _createRoleSuccess(res){
        this.roles = res.body
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.$router.push({name: 'organization'})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-checkbox + .el-checkbox {
    display: block;
    margin-left: 0;
  }
  .on{
    background: #e2e2e2;
  }
</style>
