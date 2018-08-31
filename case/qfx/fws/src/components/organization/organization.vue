<template>
  <div class="organization">
    <el-breadcrumb separator=">">
      <div style="font-size: 14px; color:#5c5c5c;">组织架构</div>
    </el-breadcrumb>
    <div class="custom-btn custom2" v-show="juese">
         <router-link :to="{name:'createRole'}"><el-button>新增角色</el-button></router-link>
    </div>
    <div class="custom-btn custom2" v-show="bumen">
         <router-link :to="{name:'addNumber'}"><el-button>新增账号</el-button></router-link>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 部门 -->
        <el-tab-pane :label="'部门'" name="ticket">
          <div class="department_left"  v-if="treeList">
            <div class="adddepartment_box">
              <router-link :to="{name:'addSection'}"><button class="adddepartment">新增部门</button></router-link>
            </div>
            <el-tree
              :data="treeList"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              :current-node-key="keyId"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :render-content="renderContent"
              highlight-current
              @node-click="handleNodeClick">
            </el-tree>
          </div>
          <div class="department_right">
            <div class="table-box" style="padding: 20px 0;font-size: 12px;"  v-if="departmentCont">
               <el-table :data="departmentCont" style="width: 100%">
                 <el-table-column label="账号名称" width="180">
                   <template scope="scope">
                     <span>{{scope.row.name}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column prop="department" label="部门" width="100"></el-table-column>
                 <el-table-column prop="role.name" label="角色" width="130"></el-table-column>
                 <el-table-column label="状态" width="120">
                   <template scope="scope">
                     <span v-if="scope.row.status == 'active'">有效</span>
                     <span v-if="scope.row.status == 'freeze'">冻结</span>
                     <span v-if="scope.row.status == 'unactive'">待激活</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="操作" width="130">
                   <template scope="scope">
                     <!-- 冻结 -->
                     <el-button @click="freeze_zr(scope.row.id)" type="text" size="small" v-if="scope.row.status == 'active'" style="font-size:12px;">{{status_value}}</el-button>
                     <!-- 解冻 -->
                     <el-button  @click="active_zr(scope.row.id)" type="text" size="small" v-if="scope.row.status == 'freeze'" style="font-size:12px;">{{status_value2}}</el-button>
                     <el-popover trigger="click" placement="bottom" v-if="scope.row.status == 'unactive'">
                        <div class="jihuo">
                          <input type="text" :value="activ_url">
                          <el-button type="primary" size="small" @click.prevent="copyLink()">复制链接
                          </el-button>
                        </div>
                        <div slot="reference" class="name-wrapper" style="display: inline-block;float:none;margin-right: 0;">
                          <el-button type="text" v-if="scope.row.status=='unactive'" @click="activation(scope.row.id)" style="font-size: 12px;">激活</el-button>
                        </div>
                      </el-popover>
                     <el-button type="text" size="small" class="del" @click="lookDetails(scope.row.id)" style="color: #20a0ff; margin-left:0;">编辑</el-button>
                   </template>
                 </el-table-column>
               </el-table>
            </div>
            <input type="text" ref="jhm" class="jhmhidden" :value="jihuoma">
            <!-- 分页 -->
            <div class="pagination">
               <div class="block">
                 <el-pagination @current-change="handleCurrentChange2" layout=" total, prev, pager, next, jumper"
                                :total="total_count2" :page-size="10">
                 </el-pagination>
               </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 角色 -->
        <el-tab-pane :label="'角色'" name="audit">
          <div class="table-box" style="padding: 20px 0;"  v-if="listCont">
             <el-table :data="listCont" style="width: 100%">
               <el-table-column label="角色名称" width="200">
                 <template scope="scope">
                   <span>{{scope.row.name}}</span>
                 </template>
               </el-table-column>
               <el-table-column prop="ability_content" label="权限" width="340"></el-table-column>
               <el-table-column label="创建日期">
                 <template scope="scope">
                   <span>{{scope.row.updated_at.substring(0, 10)}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="操作" width="100">
                 <template scope="scope">
                   <el-button type="text" size="small" @click="getedit(scope.row.id)" :id="scope.row.id">编辑</el-button>
                   <el-button type="text" size="small" class="del" @click="deleteRow(scope.row.id,scope.row.can_delete)">
                     删除
                   </el-button>
                 </template>
               </el-table-column>
             </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
             <div class="block">
               <el-pagination @current-change="handleCurrentChange" layout=" total, prev, pager, next, jumper"
                              :total=" total_count" :page-size="10">
               </el-pagination>
             </div>
          </div>
          <!-- 修改弹窗 -->
          <div class="pop_organiz">
             <el-dialog title="角色编辑" :visible.sync="dialogFormVisible" size="tiny">
               <div class="addrole">
                 <el-row>
                   <el-col :span="20">
                     <el-form ref="roleform" :model="roleForm" label-width="100px" :rules="rules">
                       <el-form-item label="角色名称" prop="name">
                         <el-input v-model="roleForm.name" :value="roleForm.name"></el-input>
                       </el-form-item>
                       <el-form-item prop="type">
                         <el-checkbox-group v-model="roleForm.type">
                           <el-checkbox v-for="v in roleForm1" :label="v.key" :key="v.key">{{v.name}}</el-checkbox>
                         </el-checkbox-group>
                       </el-form-item>
                     </el-form>
                   </el-col>
                 </el-row>
               </div>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogFormVisible = false">取 消</el-button>
                 <el-button type="primary" @click="onsubmit('roleform')">确 定</el-button>
               </div>
             </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>{{showBtn}}</div>
  </div>
</template>
<script>
import API from 'API/api'
import {mapGetters} from 'vuex'
export default{
  data() {
      return {
        keyId:0,
        activeName: 'ticket',
        juese:false,
        bumen:false,
        listCont: [],
        editCont: '',
        roleForm1: {},
        treeList:[],//部门树
        department_id:'',//部门id
        departmentCont:[],//右侧列表数据
        total_count2:1,//部门列表的总条数
        bianji:false,//树的编辑显示
        can_create:'',//可删除
        id_right:'',//右侧列表ID
        can_delete:'',//能否删除部门
        activ_url:'',//激活链接
        status_value:'冻结',
        status_value2:'解冻',
        visible:'',
        corp: {//待传参数
          status: '',
        },
        jihuoma:'',
        one: '',
        id: '',
        total_count: 1,
        roleForm: {
          name: '',
          type: [],
          abilities: ''
        },
        rules: {
          name: [
            {required: true, message: "请输入表单名称", trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ], 
          type: [
            {type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}
          ]
        },
        dialogFormVisible: false,
        editId: '',
        fenye:1,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
  },
  //根据路由判断显示的数据
     beforeRouteEnter (to, from, next) {
      console.log(from.name)
      next(vm => {
        if (from.fullPath == '/facilitator/organization/createRole') {//从新建角色跳转
          vm.activeName = 'audit'
          vm.$http.get(API.serviceurl + 'supplier/roles?page=1'
            ).then((res) => {
              vm.listCont = res.body.roles
              vm.total_count = res.body.total_count
          })
        }else if (from.fullPath == '/facilitator/organization/addNumber' || from.name == "addSection" ||from.name == 'editdepartment'){//从新建账号跳转列表页
          vm.department_id = vm.departmentZr.id //路由从创建账号过来 列表传参的ID从vuex里取
          vm.keyId = vm.departmentZr.id 
          vm.$http.get(API.serviceurl + 'supplier/accounts?department_id='+vm.department_id
            ).then((res) => {
              vm.bumen = true
              vm.departmentCont = res.body.suppliers
              vm.total_count2 = res.body.total_count
          })
        }else if (from.name == 'editNumber'){
          vm.department_id = vm.departmentZr.id //路由从创建账号过来 列表传参的ID从vuex里取
          vm.keyId = vm.departmentZr.id 
          vm.$http.get(API.serviceurl + 'supplier/accounts?department_id='+vm.department_id
            ).then((res) => {
              vm.bumen = true
              vm.departmentCont = res.body.suppliers
              vm.total_count2 = res.body.total_count
          })
        }
      })
    },
  computed:{
    // 判断右上角“新增部门”、“新增角色”的按钮显示
    showBtn(){
      if (this.activeName == 'ticket') {
        this.juese = false
      }else if (this.activeName == 'audit'){
        this.juese = true
        this.bumen = false
        this.roleList()//角色列表
      }
    },
     ...mapGetters(['departmentZr','activeName_zr']),
  },
  created(){
    this.getabilities()
    this.getTree()
    this.activation()
    this.tabClick()
  },
  methods: {
    //判断vuex里有没有tab的数据
    tabClick(){
      if (this.activeName_zr == 'audit') {
        this.activeName = 'audit'
      }else{
        this.activeName = 'ticket'
      }
    },
    // 编辑
    lookDetails(id){
      this.id_right = id
      this.$router.push({name: 'editNumber',params :{ id : id }})
    },
    // 删除
    deleteRow(id,zr) {
      if (zr == false) {
        this.$alert('该角色暂时不可以删除，请移除角色内的成员后再进行删除', '提示', {
          confirmButtonText: '确定',
          closeOnClickModal:true,
          callback: action => {
            
          }
        })
      }else{
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(API.serviceurl + 'supplier/roles/' + id
          ).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$http.get(API.serviceurl + 'supplier/roles?page='+this.fenye
            ).then((res) => {
              this.listCont = res.body.roles
              this.total_count = res.body.total_count
            })
          }).catch((error)=>{
            this.$message({
              type: 'info',
              message: error.body.details+',已取消删除'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      
    },
    // 获取权限设置
    getabilities(id){
      this.$http.get(API.serviceurl + 'supplier/roles/abilities'
      ).then((res) => {
        this.roleForm1 = res.body.abilities
      })
    },
    // 更新编辑信息
    getedit(id){
      this.editId = id
      this.dialogFormVisible = true
      this.roleDetails(id)
    },
    // 确定
    determine(id){
      var fd = new FormData();
      fd.append('role[name]', this.roleForm.name)
      this.roleForm.type.forEach((v) => {
        fd.append('role[ability][]', v)
      })
      this.$http.put(API.serviceurl + '/supplier/roles/' + this.editId, fd
      ).then((res) => {
        this.editCont = res.body
        this.total_count = res.body.total_count
        this.dialogFormVisible = false
      })
    },
    // 提交验证
    onsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.determine()
        } else {
          return false;
        }
      });
    },
    // 获取角色详情
    roleDetails(id){
      this.$http.get(API.serviceurl + 'supplier/roles/' + id
      ).then((res) => {
        var resBody = res.body;
        var role = resBody.role;
        var ability = role.ability;
        var name = role.name;
        this.roleForm.type = ability
        this.roleForm.name = name
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.fenye = val
      this.$http.get(API.serviceurl + 'supplier/roles?per=10&page=' + val
      ).then((res) => {
        this.listCont = res.body.roles
        this.total_count = res.body.total_count
      })
    },
    // 跳转编辑部门
    append(store, data) { 
      this.$router.push({name: 'editdepartment',params:{id:data.id}})
    },
    //删除部门
    remove(store, data) {
      this.department_id = data.id
      if (data.delete_msg == 'children') {
        store.remove(
          this.$alert('该部门暂时不可以删除，请移除下级部门后再进行删除操作。', '提示', {
            confirmButtonText: '确定',
            closeOnClickModal:true,
            callback: action => {
              
            }
          })
        )
      }else if (data.delete_msg == 'suppliers') {
         store.remove(
          this.$alert('该部门暂时不可以删除，请移除部门内的成员后再进行删除', '提示', {
            confirmButtonText: '确定',
            closeOnClickModal:true,
            callback: action => {
              
            }
          })
        ) 
      }else{
        store.remove(
          this.$confirm('确定删除该部门', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete(API.serviceurl + 'supplier/departments/'+ this.department_id
              ).then((res) => {
                this.listCont = res.body.roles
                this.total_count = res.body.total_count
                this.getTree()//渲染树的接口
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })         
          })
        )
      }
    },
    //渲染树
    renderContent(h, { node, data, store }) {
      return (
          <span class="bigbox">
            <span>
              <a class="labelName" title={node.label} style="color:#333;">{node.label}</a>
            </span>
            <span  class="btn_zr">
              <el-button size="mini" on-click={ () => this.append(store, data) }>编辑</el-button>
              <el-button size="mini" on-click={()=>this.remove(store, data)} style="color:red;">删除</el-button>
            </span>
          </span>
        );
    },
    // 角色列表
    roleList(){
      // 获取角色列表数据
      this.$http.get(API.serviceurl + 'supplier/roles?page=1'
        ).then((res) => {
          this.listCont = res.body.roles
          this.total_count = res.body.total_count
        })
    },
    //点击tab获取角色列表数据
    handleClick(tab, event) {
      this.$store.dispatch('activeNameZr',{'activeName_zr':this.activeName})
      if (tab.index == 1) {
        this.roleList()
      }
    },
    //获取部门树
    getTree(){
      this.$http.get(API.serviceurl + 'supplier/departments/tree'
      ).then((res) => {
        this.treeList = res.body.departments
      })
    },
    //点击节点树获取右侧列表数据
    handleNodeClick(data,node) {
      this.bumen = true//让新增账号按钮显示
      this.can_delete = data.can_delete
      this.department_id = data.id//点击每个节点部门获取当前的ID
      this.$store.dispatch('department_id',{'departmentZr':data})
      this.$http.get(API.serviceurl + 'supplier/accounts?per=10&page=1',{
        params:{
          department_id:this.department_id
        }
      }).then((res) => {
          this.departmentCont = res.body.suppliers
          this.total_count2 = res.body.total_count
      })
    },
    // 部门列表分页
    handleCurrentChange2(val) {
      this.fenye = val
      this.$http.get(API.serviceurl + 'supplier/accounts?per=10&page='+this.fenye,{
        params:{
          department_id:this.department_id
        }
      }).then((res) => {
        this.departmentCont = res.body.suppliers
          this.total_count2 = res.body.total_count
      })
    },
    //激活
    activation(){
      this.$http.get(API.serviceurl+'supplier/accounts/active_url').then((res)=>{
        this.$nextTick(()=>{
          this.activ_url = res.body.url
        })
      })
    },
    //复制链接
    copyLink(){
      this.jihuoma = this.activ_url
      this.$nextTick(function () {
        this.$refs.jhm.select();
        document.execCommand("copy");
      })
      this.$message({
        message: '复制成功！',
        type: 'success'
      });
    },
    rightList(){
      this.$http.get(API.serviceurl + 'supplier/accounts?department_id=' + this.department_id
        ).then((res) => {
          this.departmentCont = res.body.suppliers
          this.total_count2 = res.body.total_count
      })
    },
    //解冻
    active_zr(id) {
      this.$confirm('确认解冻该账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(API.serviceurl + 'supplier/accounts/'+id+'/toggle/status',{status:'active'}
          ).then((res) => {
            this.$message({
              type: 'success',
              message: '解冻成功!'
            });
            this.rightList()
          }).catch((error)=>{
            this.$message({
              type: 'info',
              message: error.body.details+',已取消解冻'
            });
          })
        });
    },
     //冻结
    freeze_zr(id) {
      this.$confirm('确认冻结该账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put(API.serviceurl + 'supplier/accounts/'+id+'/toggle/status',{status:'freeze'}
          ).then((res) => {
            this.rightList()
            this.$message({
              type: 'success',
              message: '冻结成功!'
            });
          }).catch((error)=>{
            this.$message({
              type: 'info',
              message: error.body.details+',已取消冻结'
            });
          })
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
  .labelName{
    display: inline-block;
    width: 70px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: bottom;
  }
  .jihuo {
    input {
      border: none;
    }
    button {
      margin-left: 10px;
    }
  }
  .jhmhidden {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -55;
  }
  .current{
      background: red;
      color: #fff;
  }
  .btn_zr{
    display: inline-block;
    position: absolute;
    right: 3px;
  }
</style>
