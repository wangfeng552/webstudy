<template>
  <div class="add-operator" v-loading.body="loadingMark">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'processList',params:{id:1}}">内部流程</el-breadcrumb-item>
      <el-breadcrumb-item>新增操作人变更</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-title">阶段完成变更操作者</div>
    <p class="current_paoviders_g">服务机构<span v-if="current_providers">{{current_providers.name}}</span></p>
    <div class="operator-box">
      <div class="inter_title">
        <span class="require">变更名称</span>
        <el-input type="text" v-model="operation_setting.name"></el-input>
      </div>
      <template>
        <el-radio-group v-model="operation_setting.category">
          <li>
            <el-radio label="current">由当前操作者继续操作</el-radio>
          </li>
          <li>
            <el-radio label="principal">由项目主负责人进行操作</el-radio>
          </li>
          <li>
            <el-radio label="last">由上阶段操作者进行操作</el-radio>
          </li>
          <li>
            <el-radio label="setting">预设变更流程</el-radio>
          </li>
        </el-radio-group>
      </template>
      <!--选择操作人员-->
      <div class="choose_operators scroll-beauty" v-if="operation_setting.category == 'setting'">
        <ul class="operator_box">

          <!--永远显示在第一个-->
          <li  class="operator_item">
              <span>
               <i class="icon-start"></i>
               <span class="span_button span_button_assist">分配者</span>
            </span>
          </li>
          <li class="operator_item" v-for="(item,index) in operation_setting.steps">
            <span>
               <i class="icon-during"></i>
              <br>
              <span class="name">{{item.user_or_role_name}}</span>
               <i class="icon-del" @click="removeOperators(index)"></i>

               <span class="span_button" v-if="index==operation_setting.steps.length-1">阶段操作者</span>
               <span class="span_button" v-else>分配者</span>
            </span>
          </li>
          <li class="operator_item">
            <span @click="addOperator">
              <i class="icon-add"></i>
            </span>
          </li>
        </ul>
      </div>
      <!--操作人员选择框-->
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
            <div class="min_operator operator_item" v-if="currentCategoryType.category == 'role' || currentCategoryType.category == 'member'">
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
            <div class="other_operator operator_item" v-if="currentCategoryType.category == 'leader'  || currentCategoryType.category == 'descendant'">
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
    </div>
    <div class="btn-box">
      <el-button type="custom" @click="$router.go(-1)">返回</el-button>
      <el-button type="primary" @click="saveAll">保存</el-button>
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
    },
    data(){
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        listDepartmentsTree:[],
        // start =========================
        provider_id:-100,
        //变更操作人的数据结构
        operation_setting:{
          provider_id:-100,
          name:'',
          category:'',
          steps:[]
        },
        listRoles:[],//角色列表
        listSuppliers:[],//员工列表
        // end =========================
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
        dialogOperator:false,//添加操作人员框
        currentCategoryType:{},//当前选中的 类型
        currentDepartment:null,
        currentDepartmentindex:100,
        currentRoles:{}, // 当前选中的 角色
        currentSuppliers:{},//当前选中的 员工
        aa:'current'
      }
    },
    computed:{
      ...mapGetters(["current_providers"]),
      currentRoleName(){
        if (!this.isEmpty(this.currentCategoryType.name) && this.currentCategoryType.name == "固定人员") {
          return "人员";
        } else {
          return "角色";
        }
      },
      category_ji(){
        return this.operation_setting.category;
      },
    },
    methods: {
      //common methods
      log(item){
        console.log(item);
      },
      isEmpty(item){
        if (item == undefined || item == null) {
          return true;
        } else {
          return false;
        }
      },
      showLoading(){
        this.loadingMark = true;
      },
      hiddenLoading(){
        this.loadingMark = false;
      },
      showMessage(type, str){
        if (type == null || type == undefined || type.length < 1) {
          this.$message(str);
        } else {
          if (type == "success") {
            this.$message({
              message: str,
              type: 'success'
            });
          } else if (type == "warning") {
            this.$message({
              message: str,
              type: 'warning'
            });
          } else if (type == "error") {
            this.$message.error(str);
          } else {
            this.$message(str);
          }
        }
      },

      // network start ==================================
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
      //5.创建变更操作者
      // POST /v1/admin/operation_settings 变更操作者创建
      netCreatOperationSettings(){
        // 做验证
        if(this.provider_id<0){
          this.showMessage("warning","服务商ID不对,请检查或则联系开发人员");
          return;
        }
        if(this.operation_setting.name.length<1){
          this.showMessage("warning","变更名称不对,请检查或则联系开发人员");
          return;
        }
        if(this.operation_setting.category.length<1){
          this.showMessage("warning","分类选择不对,请检查或则联系开发人员");
          return;
        }

        if(this.operation_setting.category == 'setting'){
          if (this.operation_setting.steps.length < 1){
            this.showMessage("warning","请选择操作者,请检查或则联系开发人员");
            return;
          }
        }
        //拼接数据
        var parm = {};
        var operation_setting = {};
        operation_setting.provider_id = this.provider_id;
        operation_setting.name = this.operation_setting.name;
        operation_setting.category = this.operation_setting.category;
        if(this.operation_setting.category == 'setting'){
          operation_setting.steps = [];
          this.operation_setting.steps.forEach(function (item,index) {
            var obj = {};
            obj.category = item.category;
            if(item.department != undefined &&  item.department != null){
              obj.department_id = item.department.id;
            }
            obj.role_id = item.role_id;
            obj.user_id = item.user_id;
            operation_setting.steps.push(obj);
          })
        }
        parm.operation_setting = operation_setting;

        this.showLoading();
        var url = API.url+'operation_settings';
        this.$http.post(url,parm
        ).then((res)=>{
          this.hiddenLoading();
          this.$router.go(-1);
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // network end ==================================
      saveAll(){

        this.netCreatOperationSettings();
      },
      // 清空弹框中所有的 选择人员
      clearAllOperator(){
        this.currentCategoryType = {};
        this.currentDepartment = null;
        this.currentDepartmentIndex = -100;
        this.currentRoles = {};
        this.currentSuppliers = {};
        this.currentCategoryType = {
          category:"leader",
          index:0,
          name:"直属领导"
        }
      },

      //main methods
      //删除操作人员
      removeOperators(index) {
        this.$confirm('确认是否删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operation_setting.steps.splice(index,1);
        }).catch(() => {
        });
      },
      deleteOperationer(oper_id, callBack){
        if (this.isEmpty(oper_id)) {
          this.showMessage("warning", "操作者 不存在，请检查");
          return;
        }
        this.showLoading();
        this.$http.delete(API.url + 'stage_settings/' + oper_id
        ).then((res) => {
          callBack(true);
          this.hiddenLoading();
        }, (error) => {
          this.showMessage("error", "删除失败");
          this.hiddenLoading();
          callBack(false);
        })
      },
      //添加操作人员
      addOperator() {
        // 全部清空
        this.clearAllOperator();
        this.dialogOperator = true;
      },

      chooseCategoryType(item, index){
        this.currentCategoryType = item;
        this.currentCategoryType.index = index;

      },
      // 点击部门 下面 选择 请求角色 或则 人员
      chooseRolesOrSuppliers(item, index){
        this.currentDepartment = item;
        this.currentDepartmentIndex = index;
        if (this.currentRoleName == "角色") {
          this.getRoles(this.provider_id);
        } else {
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
      chooseRoles(item, index){
        this.currentRoles = item;
        this.currentRoles.index = index;
      },
      chooseSuppliers(item, index){
        this.currentSuppliers = item;
        this.currentSuppliers.index = index;
      },
      cancelOperator(){
        this.dialogOperator = false;
      },
      // 人员选择 点击确认 的按钮
      commitOperator(){
        this.dialogOperator = false;

        if (this.isEmpty(this.currentCategoryType.category) || this.currentCategoryType.category < 1) {
          return;
        }
        if (this.currentCategoryType.category == "role") { //如果是角色
          if (this.isEmpty(this.currentDepartment) || this.currentDepartment.length < 1) {
            return;
          }
          if (this.isEmpty(this.currentRoles.id) || this.currentRoles.id < 0) {
            return;
          }
        } else if (this.currentCategoryType.category == "member") {
          if (this.isEmpty(this.currentDepartment) || this.currentDepartment.length < 1) {
            return;
          }
          if (this.isEmpty(this.currentSuppliers.id) || this.currentSuppliers.id < 0) {
            return;
          }
        }
        // 选择相应的 内容
        var item = {};
        item.category = this.currentCategoryType.category;
        item.department = this.currentDepartment;
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

        this.operation_setting.steps.push(item);
      },
    },
    filters: {
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
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .current_paoviders_g {
    margin-left: 20px;
  }
  /*粗体*/
  @mixin base_font_bold{
    font-weight: 800;
  }
  .span_button_assist{
    margin-top: 30px !important;
  }


  .add-operator{
    .btn-box{
      margin-top:40px;
      text-align: center;
    }
    .choose_operators{
      height: 165px;
      width:1118px;
      border:1px solid #efefef;
      .operator_box{
        left:0;
        .span_button{
          margin-top: 10px;
        }
      }
    }
  }
  .operator-box {
    margin: 20px;
    padding: 20px;
    border: 1px solid #efefef;
    .el-radio-group {
      margin-bottom:20px;
      li {
        margin-bottom: 10px;
      }
    }
  }
  .css_bass_check_span {
    font-family:MicrosoftYaHei;
    font-size:14px;
    color:#1b1b1b;
    display: inline-block;
    margin-top: -5px;
  }

</style>
