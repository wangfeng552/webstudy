<template>
  <div class="add-verification" v-loading.body="loadingMark">

    <div class="blue-title">内部审核流程
      <span class="mention">审核操作必须通过后才能进入下一个阶段添加内审流程审核不通过后（回退操作发起者）</span>
    </div>
    <p class="current_paoviders_g">服务机构<span v-if="current_providers">{{current_providers.name}}</span></p>
    <div class="audit-box">
      <div class="inter_title">
        <span class="require">内审名称</span>
        <el-input type="text" v-model="audit_setting.name"></el-input>
      </div>
      <!--选择操作者 循环 start=====================  -->
      <div class="interPro scroll-beauty"
           v-if="audit_setting"
           v-for="(obj,index4) in audit_setting.items">
        <span class="operators_del" v-if="0 != index4" @click="deleteOperatorItem(obj,index4)">删除</span>
        <div class="choose_operators">
          <!--头部左侧的部门 start ==========-->
          <div class="operator_item operator_header">
            <span
              class="default css_text_blue"
              @click="addDep(index4)"
              :class="index4 | filterClassDefault">{{obj.role.name | filterRoleName(index4)}}</span>
            <i v-if="index4!=0" class="bi"  @click="addDep(index4)"></i>
            <br>
            <span class="text">{{obj.role.name}}</span>
            <!--<span class="text">部门</span>-->
          </div>
          <!--头部左侧的部门 end ==========-->
          <!--里面每一个横条中的循环 start==================-->
          <ul class="operator_box">
            <li class="operator_item">
               <span>
               <i class="icon-start"></i>
               <span class="span_button">操作发起者</span>
            </span>
            </li>
            <li class="operator_item" v-for="(item,index) in obj.steps">
              <span>
               <i class="icon-during"></i>
                <br>
                <span class="name">{{item.user_or_role_name}}</span>
               <i class="icon-del" @click="removeOperators(index4,index)"></i>
                <el-select v-model="item.audit_type" placeholder="请选择"
                           @visible-change="changeVisible($event,index4,index)">
                   <el-option
                     v-for="option in Listaudit_type"
                     :key="item.value"
                     :label="option.label"
                     :disabled="option.disabled"
                     :value="option.value">
                   </el-option>
                </el-select>
            </span>
            </li>
            <li class="operator_item">
             <span @click="addOperator(index4)">
              <i class="icon-add"></i>
            </span>
            </li>
          </ul>
          <!--里面每一个横条中的循环 end==================-->

        </div>
      </div>
      <!--选择操作者 循环 end=====================  -->
      <el-button type="primary" @click="addOperatorItem">添加内审流程</el-button>
    </div>

    <!--<div class="btn_container">-->
    <!--<el-button type="primary" @click="commitAll">提交</el-button>-->
    <!--</div>-->

    <!--弹框选人-->
    <!--<div v-if="stage_operations">-->
    <el-dialog title="选择角色" :visible.sync="markChoosePeople">
      <el-table
        ref="singleTable"
        :data="listRolesAll"
        highlight-current-row
        height=356
      @current-change="handleCurrentChange"
      @row-click="handleRowChange"
      style="width: 100%">
      <el-table-column
        property="name"
        label="名称">
      </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
    <el-button @click="markChoosePeople = false">取 消</el-button>
    <el-button type="primary" @click="clickChooseDep">确 定</el-button>
  </span>
    </el-dialog>

    <!--选择操作者 的弹框-->
    <div class="pop_operator">
      <el-dialog
        title="人员选择"
        :visible.sync="dialogOperator"
        size="small"
        :before-close="handleClose">
        <!-- 选择人员自定义内容 start-->
        <div class="pop_operator_content">
          <div class="left_operator operator_item">
            <ul>
              <li v-for="(item ,index) in ListCategoryType" @click="chooseCategoryType(item,index)" :class="{ bg_selected_blue: currentCategoryType.index == index}">
                {{item.name}}
              </li>
            </ul>
          </div>
          <div class="min_operator operator_item"
               v-if="currentCategoryType.category == 'role' || currentCategoryType.category == 'member'">
            <div class="li_header">
              部门
            </div>
            <el-tree :data="listDepartmentsTree"
                     :props="defaultProps"
                     :highlight-current=true
                     @node-click="handleNodeClick"></el-tree>
            <!--<ul style="height: 152px;">-->
              <!--<li v-for="(item,index) in listDepartments" @click="chooseRolesOrSuppliers(item,index)" :class="{ bg_selected_blue: currentDepartmentIndex == index}"> {{item.name}}</li>-->
            <!--</ul>-->
          </div>
          <div class="right_operator operator_item" v-if="currentCategoryType.category == 'role' || currentCategoryType.category == 'member'">
            <div class="li_header">
              {{currentRoleName}}
            </div>
            <ul style="height: 152px;">
              <li v-if="currentRoleName == '角色'" v-for="(item,index) in listRoles" @click="chooseRoles(item,index)" :class="{ bg_selected_blue: currentRoles.index == index}">{{item.name}}</li>
              <li v-if="currentRoleName == '人员'" v-for="(item,index) in listSuppliers" @click="chooseSuppliers(item,index)" :class="{ bg_selected_blue: currentSuppliers.index == index}"> {{item.name}}</li>
            </ul>
          </div>
          <!---->
          <div class="other_operator operator_item" v-if="currentCategoryType.category == 'leader' || currentCategoryType.category == 'underling' || currentCategoryType.category == 'descendant' " >
            <span >{{currentCategoryType.category | filterTextOne}}</span> <br>
            <span >{{currentCategoryType.category | filterTextTwo}}</span>
          </div>
        </div>
        <!-- 选择人员自定义内容 end-->
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancelOperator">取 消</el-button>
    <el-button type="primary" @click="commitOperator">确 定</el-button>
  </span>
      </el-dialog>

    </div>

    <div class="btn-box" >
      <el-button type="custom" @click="$router.go(-1)">返回</el-button>
      <el-button type="primary" @click="commitAll">保存</el-button>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  export default{
    mounted: function () {
      this.provider_id = this.$route.params.provider_id;
      this.netGetDepartment(this.provider_id);
      this.netGetDepartmentTree(this.provider_id);
      this.getRolesAll(this.provider_id);
    },
    data(){
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // 分页
        pageIndexRole:0,
        pageCountRole:0,
        loadingMark:false,
        audit_setting:{
          provider_id:-100,
          name:"",
          items:[
            {
              role:{
                id:0,
                name:'全部'
              },
              steps:[],
            }
          ]
        },
        listDepartments:[],// 部门列表
        listDepartmentsTree:[],//部门树
        // 循环的列表
        listItems:[],
        provider_id:-100,
        listRoles:[],//角色列表
        listRolesAll:[],//角色列表 所有的
        listSuppliers:[],//员工列表
        indexCurrentItems:-100,
        indexAddDep:-100,

        // =========================================
        list_audit: [{}, {}],
        currentRightDetailStepThree: {
          id: -100,
          audit_name: "",// 内审名称
          operation: "",// 阶段变更操作者设置   current principal setting
          is_lock: false,
          op_settings: {
            audit: false,
            comment: false,
            operation: false
          },

          audit_settings: [
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,
            },
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,  // 如果大于 0 那么就是 自己的，不是原来的
            }
          ],
          operation_settings: [
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,
            },
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,  // 如果大于 0 那么就是 自己的，不是原来的
            }
          ],
          category: "",
          publish: false

        },
        Listaudit_type: [
          {
            label: "分配者",
            value: "assigner",
            disabled: false
          },
          {
            label: "审核者",
            value: "auditor"
          }
        ],
        markChoosePeople: false,
        currentCategoryType:{},//当前选中的 类型
        currentDepartment:null,
        currentRolesLeft:null,
        currentDepartmentDep:null, //左侧部门的选择
        currentDepartmentindex:100,
        currentRoles:{}, // 当前选中的 角色
        currentSuppliers:{},//当前选中的 员工
        dialogOperator:false,
        dialogOperatorIndex:0,
        ListCategoryType:[
          {
            category:"leader",
            name:"直属领导"
          },
          {
            category:"underling",
            name:"直属下属"
          },
          {
            category:"descendant",
            name:"全部下属"
          },
          {
            category:"role",
            name:"固定角色"
          },
          {
            category:"member",
            name:"固定人员"
          }
        ],
      }
    },
    computed: {
      ...mapGetters(["current_providers"]),
      listDepartments_ji(){
        var list = [];
        this.listDepartments.forEach(function (item,index) {
          var obj = {};
          obj.nameShow = item;
          list.push(obj);
        })
        return list;
      },
      currentRoleName(){
        if (!this.isEmpty(this.currentCategoryType.name) && this.currentCategoryType.name == "固定人员") {
          return "人员";
        } else {
          return "角色";
        }
      },
      // 计算属性 右侧 详情
      currentRightDetailStepThreeJi(){
        var item = {
          id: -100,
          audit_name: "",// 内审名称
          operation: "",// 阶段变更操作者设置   current principal setting
          is_lock: false,
          op_settings: {
            audit: false,
            comment: false,
            operation: false
          },

          audit_settings: [
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,
              user_or_role_name: ""
            },
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,  // 如果大于 0 那么就是 自己的，不是原来的
              user_or_role_name: ""
            }
          ],
          operation_settings: [
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,
              user_or_role_name: ""
            },
            {
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,  // 如果大于 0 那么就是 自己的，不是原来的
              user_or_role_name: ""
            }
          ],
          category: "",
          publish: false
        };

        if (this.currentRightDetailStepThree) {
          if (!this.isEmpty(this.currentRightDetailStepThree.id)) {
            item.id = this.currentRightDetailStepThree.id;
          }
          if (!this.isEmpty(this.currentRightDetailStepThree.audit_name)) {
            item.audit_name = this.currentRightDetailStepThree.audit_name;
          }
          if (!this.isEmpty(this.currentRightDetailStepThree.operation)) {
            item.operation = this.currentRightDetailStepThree.operation;
          }
          if (!this.isEmpty(this.currentRightDetailStepThree.is_lock)) {
            item.is_lock = this.currentRightDetailStepThree.is_lock;
          }
          if (!this.isEmpty(this.currentRightDetailStepThree.category)) {
            item.category = this.currentRightDetailStepThree.category;
          }
          if (!this.isEmpty(this.currentRightDetailStepThree.op_settings)) {
            item.op_settings = this.currentRightDetailStepThree.op_settings;
          }
          if (!this.isEmpty(this.currentRightDetailStepThree.audit_settings) && this.currentRightDetailStepThree.audit_settings.length > 0) {
            item.audit_settings.splice(1, 1);
            var that = this;
            this.currentRightDetailStepThree.audit_settings.forEach(function (obj, index) {
              if (!that.isEmpty(obj.id) && obj.id > 0) {
                if (obj.category == "leader") {
                  obj.user_or_role_name = "直属领导";
                } else if (obj.category == "underling") {
                  obj.user_or_role_name = "直属下属";
                }else if (obj.category == "descendant") {
                  obj.user_or_role_name = "全部下属";
                } else {
                  var str = obj.department + "|" + obj.user_or_role_name;
                  obj.user_or_role_name = str;
                }

              }
              item.audit_settings.push(obj);
            });
            item.audit_settings.push({
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,
              user_or_role_name: ""
            })
          }
          var that = this;
          if (!this.isEmpty(this.currentRightDetailStepThree.operation_settings) && this.currentRightDetailStepThree.operation_settings.length > 0) {
            item.operation_settings.splice(1, 1);
            var length1 = this.currentRightDetailStepThree.operation_settings.length;
            this.currentRightDetailStepThree.operation_settings.forEach(function (obj, index) {
              item.operation_settings.push(obj);
              if (!that.isEmpty(obj.id) && obj.id > 0) {
                if (obj.category == "leader") {
                  obj.user_or_role_name = "直属领导";
                } else if (obj.category == "underling") {
                  obj.user_or_role_name = "直属下属";
                }else if (obj.category == "descendant") {
                  obj.user_or_role_name = "全部下属";
                } else {
                  var str = obj.department + "|" + obj.user_or_role_name;
                  obj.user_or_role_name = str;
                }
              }

              if (index == length1 - 1) {
                obj.name = "操作者";
              } else {
                obj.name = "分配者";
              }
            });
            item.operation_settings.push({
              category: "", // 流程人员类型 leader  underling role menber
              audit_type: "", //   流程步骤类型 assigner auditor
              department: "",  // 部门 若有
              role_id: "",  // 角色ID
              user_id: "",  // 用户ID
              id: -100,
              user_or_role_name: ""
            })
          }
        }
        return item;
      }
    },
    methods: {
      // 如果下一个是 固定人员，那么此处下拉框分配者禁用
      changeVisible(e,section,row){
          if(e){
            var mark = false; //不禁用
            var item1 = this.audit_setting.items[section];
            var item2 = item1.steps[row+1];
            if(!this.isEmpty(item2) && item2.category == "member")  mark = true;
            this.Listaudit_type[0].disabled = mark;
          }
      },
      handlePagingRole(indexPage){
        this.pageIndexRole = indexPage;
        //网络请求
        this.getRolesAll(this.provider_id);
      },
      log(item){
        console.log(item);
      },
      // 网络请求 start ========================================
      //1.获取部分人员的列表
      netGetDepartment(provider_id){
        // 服务商ID
        if(this.isEmpty(provider_id) &&provider_id > 0){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'departments?provider_id='+provider_id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listDepartments = res.body.departments;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 部门树 GET /v1/admin/departments/tree 部门树
      netGetDepartmentTree(provider_id){
        // 服务商ID
        if(this.isEmpty(provider_id) &&provider_id > 0){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'departments/tree?provider_id='+provider_id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listDepartmentsTree = res.body.departments;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },

      // 2. 内审流程创建  POST /v1/admin/audit_settings 内审流程创建
      netCreatAuditSetting(){
        var errorMark = false;
        // 拼接数据
        var audit_setting = {};
        audit_setting.provider_id = this.provider_id;
        audit_setting.name = this.audit_setting.name;
        if(this.audit_setting.name.length < 1){
          this.showMessage("warning","请填写内审名称");
          return;
        }
        audit_setting.items = [];
        //下面循环 遍历
        this.audit_setting.items.forEach(function (obj,index) {
          var  obj3 = {};
          obj3.role_id = obj.role.id;
          if(obj.role.id < 0){
            errorMark = true;
          }
          var steps_z = [];
          // 必须要有step,并且要有一个审核者
          var mark_she = false;
          obj.steps.forEach(function (obj_step,index_step) {
            var st = {};
            st.category = obj_step.category;
            if(obj_step.audit_type == 'auditor'){
              mark_she = true;
            }
            st.audit_type = obj_step.audit_type;
//            st.department = obj_step.department;
            if(obj_step.department != undefined && obj_step.department != null){
              st.department_id = obj_step.department.id;
            }
            st.role_id = obj_step.role_id;
            st.user_id = obj_step.user_id;
            steps_z.push(st);
            if(obj_step.audit_type.length < 1){
              errorMark = true;
            }
            obj3.steps = steps_z;
          })
          if(mark_she == false){
            errorMark = true;
          }
          audit_setting.items.push(obj3);
        });
        if(errorMark){
          this.showMessage("warning","请检查 角色必须选择,操作人员必须要有，且必须有至少有一个审核者");
          return;
        }
        this.showLoading();
        var parm ={audit_setting:{}};
        parm.audit_setting = audit_setting;


//        return;
        var url = API.url+'audit_settings';
        this.$http.post(url,parm
        ).then((res)=>{
          this.hiddenLoading();
//          this.listDepartments = res.body.departments;
          this.$router.go(-1);
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      //3. 获取角色`
      // 获取角色 GET /v1/admin/roles
      getRoles(provider_id){

        if(this.isEmpty(provider_id)){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length < 0){
          this.showMessage("warning","当前 部门没有选中，请检查或则联系开发人员");
          return;
        }

        if(this.isEmpty(this.currentDepartment.id) || this.currentDepartment.id < 0){
          this.showMessage("warning","当前 部门没有选中，请检查或则联系开发人员");
          return;
        }

        var url = API.url+'roles?provider_id='+provider_id+"&department_id="+this.currentDepartment.id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listRoles = res.body.roles;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 4. 固定人员列表
      // 获取员工 列表 GET /v1/admin/suppliers 查询服务商员工
      getSuppliers(provider_id){
        if(this.isEmpty(provider_id)){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length < 0){
          this.showMessage("warning","当前 部门没有选中，请检查或则联系开发人员");
          return;
        }

        if(this.isEmpty(this.currentDepartment.id) || this.currentDepartment.id < 0){
          this.showMessage("warning","当前 部门没有选中，请检查或则联系开发人员");
          return;
        }

        var url = API.url+'suppliers?provider_id='+provider_id+"&department_id="+this.currentDepartment.id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listSuppliers = res.body.suppliers;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      //5. 获取角色`全部的=========
      // 获取角色 GET /v1/admin/roles
      getRolesAll(provider_id){
        if(this.isEmpty(provider_id)){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'roles?provider_id='+provider_id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.listRolesAll = res.body.roles;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 网络请求 end ========================================
      commitAll(){
        //需要验证 里面每个是否需要
        this.netCreatAuditSetting();
      },
      //新增功能 ，删除当前的 一行操作
      deleteOperatorItem(item, index){
        this.$confirm('确认是否删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.audit_setting.items.splice(index, 1);
        }).catch(() => {
        });
      },
      //添加内审流程
      addOperatorItem(){
        var item ={
          role:{
            id:-100,
            name:''
          },
          steps:[]
        }
        this.audit_setting.items.push(item);
      },
      // 新加的部分
      addDep(index){
        if (0 != index) {
          this.markChoosePeople = true;
          this.indexAddDep = index;
        }
      },
      // 值为 空 true   不空 false
      isEmpty(item){
        if (item == undefined || item == null) {
          return true;
        } else {
          return false;
        }
      },
      //弹框确认 选择部门
      clickChooseDep(){
        this.markChoosePeople = false;
        if(this.isEmpty(this.currentRolesLeft)){
          return;
        }
        if(this.indexAddDep >0 &&　!this.isEmpty(this.currentRolesLeft)){ //有效的
          var item =  this.audit_setting.items[this.indexAddDep];
          item.role = this.currentRolesLeft;
        }
      },
      //弹框选择人员
      handleCurrentChange(){
      },
      handleRowChange(row, event, column){
//        this.currentDepartment = row.nameShow;
        this.currentRolesLeft = row;
      },
      handleRowChangeDep(row, event, column){
        this.currentDepartmentDep = row.nameShow;
      },
      //*** 添加人员
      addOperator(index) {
        // 全部清空
        this.clearAllOperator();
        //此处是验证 用的
        // 需要判断 上一个 是否有选择
        var item =  this.audit_setting.items[index];
        if(item.steps.length>0){
          var last = item.steps[item.steps.length-1];
          if(last.audit_type.length < 1){
            this.showMessage("warning","您上一个人员还未选择分配，请先选择");
            return;
          }
        }
        this.dialogOperator = true;
        this.dialogOperatorIndex = 1;
        this.currentDepartment = null;
        this.currentDepartmentindex = 100;
        this.indexCurrentItems = index;
      },
      // 清空弹框中所有的 选择人员
      clearAllOperator(){
        this.currentCategoryType = {};
        this.currentDepartment = null;
        this.currentDepartmentIndex = -100;
        this.currentRoles = {};
        this.currentSuppliers = {};
        this.indexCurrentItems = -100;
        this.currentCategoryType = {
          category:"leader",
          index:0,
          name:"直属领导"
        }
        this.currentDepartment = null;
        this.indexAddDep = -100;
        this.currentRolesLeft = null;
      },
      // 提示框 总汇
      showMessage(type,str){
        if(type == null || type == undefined || type.length<1){
          this.$message(str);
        }else {
          if(type == "success"){
            this.$message({
              message: str,
              type: 'success'
            });
          }else if(type == "warning"){
            this.$message({
              message: str,
              type: 'warning'
            });
          }else if(type == "error"){
            this.$message.error(str);
          }else {
            this.$message(str);
          }
        }
      },
      chooseCategoryType(item,index){
        // 点击上面的 选择框 ，如果是 上一个是分配者 ，那么固定人员那边是不可选的
        var list_items = this.audit_setting.items[this.indexCurrentItems];
        if(!this.isEmpty(list_items.steps) && list_items.steps.length>0){
          var array_ad = list_items.steps;
          var obj6 =  array_ad[array_ad.length-1];
          if(obj6.audit_type == "assigner"){
            if(index == 4){
              this.showMessage("warning","您上一个选择了 分配者，此处不可以选择 固定人员，请检查或则联系开发人员");
              return;
            }
          }
        }
        this.currentCategoryType = item;
        this.currentCategoryType.index = index;
      },
      // 点击部门 下面 选择 请求角色 或则 人员
      chooseRolesOrSuppliers(item,index){
        this.currentDepartment = item;
        this.currentDepartmentIndex = index;
        if(this.currentRoleName == "角色"){
          this.getRoles(this.provider_id);
        }else {
          this.getSuppliers(this.provider_id);
        }
      },
      handleNodeClick(data){
        this.currentDepartment = data;
        if(this.currentRoleName == "角色"){
          this.getRoles(this.provider_id);
        }else {
          this.getSuppliers(this.provider_id);
        }
      },
      chooseRoles(item,index){
        this.currentRoles = item;
        this.currentRoles.index = index;
      },
      chooseSuppliers(item,index){
        this.currentSuppliers = item;
        this.currentSuppliers.index = index;
      },
      //*删除 某个 人员
      removeOperators(section,row) {
        this.$confirm('确认是否删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.audit_setting.items[section].steps.splice(row,1);
        }).catch(() => {
        });
      },
      deleteOperationer(oper_id,callBack){
        if(this.isEmpty(oper_id)){
          this.showMessage("warning","操作者 不存在，请检查");
          return;
        }
        this.showLoading();
        this.$http.delete(API.url+'stage_settings/'+oper_id
        ).then((res)=>{
          callBack(true);
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("error","删除失败");
          this.hiddenLoading();
          callBack(false);
        })
      },
      // base method start ===
      showLoading(){
        this.loadingMark = true;
      },
      hiddenLoading(){
        this.loadingMark = false;
      },
      cancelOperator(){
        this.dialogOperator =false;
      },
      //人员选择=== 点击确定
      commitOperator(){
        this.dialogOperator =false;
        if(this.isEmpty(this.currentCategoryType.category) || this.currentCategoryType.category <1){
          return;
        }
        if(this.currentCategoryType.category == "role" ){ //如果是角色
          if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length <1){
            return;
          }
          if(this.isEmpty(this.currentRoles.id) ||this.currentRoles.id <0){
            return;
          }
        }else if(this.currentCategoryType.category == "member"){
          if(this.isEmpty(this.currentDepartment) || this.currentDepartment.length <1){
            return;
          }
          if(this.isEmpty(this.currentSuppliers.id) ||this.currentSuppliers.id <0){
            return;
          }
        }
        // 选择相应的 内容
        if(this.dialogOperatorIndex == 1){ // 上面
          var item = {};
          item.category = this.currentCategoryType.category;
          item.department = this.currentDepartment;
          item.audit_type = "";
          item.user_or_role_name = "";

          if(this.currentCategoryType.category == "role" ){ //如果是角色
            item.role_id = this.currentRoles.id;
            item.user_or_role_name =  item.department.name + "|"+ this.currentRoles.name;

            if(item.department.length <1 || this.currentRoles.name.length<1){
              this.showMessage("warning","有未选择的 部门或则角色，请检查或则联系开发人员");
              return;
            }

          }else if(this.currentCategoryType.category == "member"){
            item.user_id = this.currentSuppliers.id;
            item.user_or_role_name =  item.department.name + "|"+ this.currentSuppliers.name;

            if(item.department.length <1 || this.currentSuppliers.name.length<1){
              this.showMessage("warning","有未选择的 部门或则人员，请检查或则联系开发人员");
              return;
            }

          }else if(this.currentCategoryType.category == "leader"){
            item.user_or_role_name = "直属领导";

          }else if(this.currentCategoryType.category == "underling"){
            item.user_or_role_name = "直属下属";
          }else if(this.currentCategoryType.category == "descendant"){
            item.user_or_role_name = "全部下属";
          }
          item.audit_type = "";

          if(this.indexCurrentItems >= 0 ){
            this.audit_setting.items[this.indexCurrentItems].steps.push(item);
          }
        }
      },
    },
    filters: {
      filterRole(value) {
        return "这部分是新加的" + value;
      },
      filterClassDefault(index){
        if(0 == index) return '';
        else return 'css_cursor_pointer';
      },
      filterRoleName(val,index){
        if(index == 0) return '全部';
        if(val == undefined || val == null ||  val == '' ) return '选择';
        else return val.substring(0,2);
      },
      filterTextOne(value) {
        var text = "";
        if(value == "leader"){
          text = "该操作将由操作发起者的上级领导进行操作。";
        }else if(value == "underling"){
          text = "该操作将由操作发起者的直属下属进行操作。";
        }else if(value == "descendant"){
          text = "该操作将由操作发起者的全部下属进行操作。";
        }
        return text;
      },
      filterTextTwo(value) {
        var text = "";
        if(value == "leader"){
          text = "注：如上级领导大于1人，则由发起者在上级领导中进行选择。";
        }else if(value == "underling"){
          text = "注：如直属下属大于1人，则由发起者在直属下属中进行选择。";
        }
        return text;
      },

      filter_peration_settings(arraySetting,index){
        if(arraySetting.length - 2 == index){
          return "操作者";
        }else {
          return "分配者";
        }
      }
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .current_paoviders_g{
    margin-left: 20px;
  }
  /*粗体*/
  @mixin base_font_bold{
    font-weight: 800;
  }



  .btn-box{
    margin-top:40px;
    text-align: center;
  }
  .btn_container {
    margin: 0 auto;
    width: 200px;
    /*background-color: rebeccapurple;*/
  }
  .add-verification {
    .mention {
      margin-left: 21px;
      font-size: 14px;
      color: #5c5c5c;
    }
  }

  .audit-box {
    margin: 20px;
    padding: 20px;
    border: 1px solid #efefef;
  }

</style>
