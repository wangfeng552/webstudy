<template>
  <div class="add-operator"  v-loading.body="loadingMark">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'processList',params:{id:1}}">内部流程</el-breadcrumb-item>
      <el-breadcrumb-item>编辑操作人变更</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-title">阶段完成变更操作者</div>

    <p class="current_paoviders_g">服务机构<span v-if="current_providers">{{current_providers.name}}</span></p>

    <div class="operator-box">
      <div class="inter_title">
        <span class="require">变更名称：</span>
        <span class="fs14">
          <el-input v-model="operation_setting_ji.name" placeholder="请输入内容"></el-input>
        </span>
      </div>
      <template>
        <el-radio-group v-model="operation_setting_ji.category">
          <li>
            <el-radio label='current'>由当前操作者继续操作</el-radio>
          </li>
          <li>
            <el-radio label='principal'>由项目主负责人进行操作</el-radio>
          </li>
          <li>
            <el-radio label="last">由上阶段操作者进行操作</el-radio>
          </li>
          <li>
            <el-radio label='setting'>预设变更流程</el-radio>
          </li>
        </el-radio-group>
      </template>

      <!--选择操作人员-->
      <div class="choose_operators scorll-beauty" v-if="operation_setting_ji.category=='setting'">
        <ul class="operator_box">

          <!--永远显示在第一个-->
          <li  class="operator_item">
              <span>
               <i class="icon-start"></i>
               <span class="span_button">分配者</span>
            </span>
          </li>
          <li class="operator_item" v-for="(item,index) in operation_setting_ji.steps">
            <span>
               <i class="icon-during"></i>
              <br/>
                <span class="name">{{item.user_or_role_name}}</span>
              <br/>
               <i class="icon-del" @click="removeOperators(index)"></i>
               <span class="span_button"
                     :class="index | filterClassOne"
                     v-if="index==operation_setting_ji.steps.length-1">阶段操作者</span>
               <span class="span_button"
                     :class="index | filterClassOne"
                     v-else>分配者</span>
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
            <div class="other_operator operator_item" v-if="currentCategoryType.category == 'leader' || currentCategoryType.category == 'underling' || currentCategoryType.category == 'descendant'">

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
      <el-button type="custom" @click="cancelAll">返回</el-button>
      <el-button type="primary" @click="commitAll">保存</el-button>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  export default{
    mounted: function () {
      this.setting_id = this.$route.params.setting_id;
      this.provider_id = this.$route.params.provider_id;
      this.netGetDetail(this.setting_id);
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
        // data start ===============
        operation_setting:null,
        setting_id:null,
        provider_id:null,
        listDepartments:[],
        listRoles:[],//角色列表
        listSuppliers:[],//员工列表
        // data end ===============
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
      }
    },
    computed:{
      ...mapGetters(["current_providers"]),
      // 详情的属性
      operation_setting_ji(){
        var item = this.operation_setting;
        if(this.isEmpty(item)){
          item = {};
          this.$set(item,'name','');
          this.$set(item,'id',-100);
          this.$set(item,'category','');
          this.$set(item,'steps',[]);
        }
        //遍历每个 step 中，显示 名字
        item.steps.forEach(function (obj,index) {
          if(obj.category == "role" ){ //如果是角色
            obj.user_or_role_name =  obj.department_name + "|"+ obj.role;
          }else if(obj.category == "member"){
            obj.user_or_role_name =  obj.department_name + "|"+ obj.user;
          }else if(obj.category == "leader"){
            obj.user_or_role_name = "直属领导";
          }else if(obj.category == "underling"){
            obj.user_or_role_name = "直属下属";
          }else if(obj.category == "descendant"){
            obj.user_or_role_name = "全部下属";
          }
        })
        return item;
      },
      currentRoleName(){
        if (!this.isEmpty(this.currentCategoryType.name) && this.currentCategoryType.name == "固定人员") {
          return "人员";
        } else {
          return "角色";
        }
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
      // 网络请求 start ==============================
      // 1. 获取阶段 详情
      // GET /v1/admin/operation_settings/{id} 变更操作者详情
      netGetDetail(setting_id){
        if(this.isEmpty(setting_id) || setting_id<0){
          this.showMessage("warning","id操作人id不存在");
          return;
        }
        this.showLoading();
        var url = API.url+'operation_settings/'+setting_id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.operation_setting = res.body.operation_setting;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 2. 更新阶段操作人 最后提交
      // PUT /v1/admin/operation_settings/{id} 变更操作者更新
      netUpdataDetail(setting_id){
        // 做验证
        if(this.isEmpty(setting_id) || setting_id<0){
          this.showMessage("warning","此处设置人员的ID不对,请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(this.provider_id) || this.provider_id<0){
          this.showMessage("warning","服务商ID不对,请检查或则联系开发人员");
          return;
        }
        if(this.operation_setting_ji.name.length<1){
          this.showMessage("warning","变更名称不对,请检查或则联系开发人员");
          return;
        }
        if(this.operation_setting_ji.category.length<1){
          this.showMessage("warning","分类选择不对,请检查或则联系开发人员");
          return;
        }
        if(this.operation_setting_ji.category == 'setting'){
          if (this.operation_setting.steps.length < 1){
            this.showMessage("warning","请选择操作者,请检查或则联系开发人员");
            return;
          }
        }
        //拼接数据
        var that = this;
        var parm = {};
        var operation_setting = {};
        operation_setting.provider_id = this.provider_id;
        operation_setting.name = this.operation_setting_ji.name;
        operation_setting.category = this.operation_setting_ji.category;
        if(this.operation_setting_ji.category == 'setting'){
          operation_setting.steps = [];
          this.operation_setting_ji.steps.forEach(function (item,index) {
            var obj = {};
            if(that.isEmpty(item.id)){ //说明是新的
              obj.category = item.category;
              if(item.department != undefined && item.department != null){
                obj.department_id = item.department.id;
              }
              obj.role_id = item.role_id;
              obj.user_id = item.user_id;
            }else { //以前的旧的
              obj.id = item.id;
              obj.category = item.category;
              obj.department_id = item.department_id;
              obj.role_id = item.role_id;
              obj.user_id = item.user_id;
            }
            operation_setting.steps.push(obj);
          })
        }
        parm.operation_setting = operation_setting;

//        return;

        var url = API.url+'operation_settings/'+setting_id;
        this.$http.put(url,parm
        ).then((res)=>{
          this.hiddenLoading();
          this.$router.go(-1);
//          this.operation_setting = res.body.operation_setting;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },

      //3.获取部门人员的列表
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
      //4. 获取角色`
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
      // 5. 固定人员列表
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
      // 6. 删除 某个人
      // DELETE /v1/admin/operation_settings/{operation_setting_id}/steps/{id} 步骤删除
      netDeleteStep(operation_setting_id,id){
        if(this.isEmpty(operation_setting_id)){
          this.showMessage("warning","服务商ID未获取，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'operation_settings/'+operation_setting_id+"/steps/"+id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          // 成功了 =====

        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 网络请求 end ==============================
      //保存里面的东西
      commitAll(){
        this.netUpdataDetail(this.setting_id);
      },
      cancelAll(){
        this.$router.go(-1);
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
          var item1 =  this.operation_setting_ji.steps[index];
          if(this.isEmpty(item1.id)){ //直接删除
            this.operation_setting_ji.steps.splice(index,1);
            return;
          }

          var operation_setting_id = this.operation_setting_ji.id;
          this.showLoading();
          var url = API.url+'operation_settings/'+operation_setting_id+"/steps/"+item1.id;
          this.$http.delete(url
          ).then((res)=>{
            this.hiddenLoading();
            this.operation_setting_ji.steps.splice(index,1);
          },(error)=>{
            this.showMessage("error","请求出错，请联系开发人员");
            this.hiddenLoading();
          })
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

        // 做 网络请求，看是 角色还是人员
//        if(this.currentRoleName == "角色"){
//          this.log("角色");
//          this.getRoles();
//        }else {
//          this.log("人员");
//          this.getSuppliers();
//        }
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
          item.role = this.currentRoles.name;
          item.department_name = item.department.name
          if(item.department.length <1 || this.currentRoles.name.length<1){
            this.showMessage("warning","有未选择的 部门或则角色，请检查或则联系开发人员");
            return;
          }
        }else if(this.currentCategoryType.category == "member"){
          item.user_id = this.currentSuppliers.id;
          item.user = this.currentSuppliers.name;
          item.department_name = item.department.name
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
        this.operation_setting_ji.steps.push(item);
      },
    },
    filters: {
      filterRole(value) {
        return "这部分是新加的" + value;
      },
      filterClassOne(index){
        return 'css_mrg_one';
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
  .current_paoviders_g {
    margin-left: 20px;
  }
  /*粗体*/
  @mixin base_font_bold{
    font-weight: 800;
  }
  .css_mrg_one{
    margin-top: 10px !important;
  }
  .add-operator{

    .btn-box{
      margin-top:40px;
      text-align: center;
    }
    .choose_operators{
      width:1118px;
      height: 175px;
      border:1px solid #efefef;
      .operator_box{
        left:0;
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


</style>
