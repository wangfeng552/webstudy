<template>
  <div class="add-verification"  v-loading.body="loadingMark">
    <div class="st-up">
      <div class="st-row">
        <!--<el-checkbox v-if="stop_setting &&stop_setting.enabled != undefined && stop_setting.enabled != null"-->
        <!--:size="small"-->
        <!--v-model="stop_setting.enabled"><span class="fc5c5">是否启用项目终止审核流程</span>-->
        <!--</el-checkbox>-->

        <el-checkbox v-if="showCheckEnable"
                     :size="small"
                     v-model="stop_setting.enabled"><span class="fc5c5">是否启用项目终止审核流程</span>
        </el-checkbox>
        <span class="row-des">启用后项目终止需进行审核，完成后项目则真正关闭，审核过程中项目不可以进行操作。审核不通则项目可以继续进行。</span>
      </div>
      <div class="st-row">
        <div class="row-title">项目终止审核流程</div>
        <ul>
          <li v-for="(item,index) in data_static" style="overflow: hidden">
            <div class="li-left fl">
              <span class="blue">{{index+1}}</span>
              <ul>
                <li  class="arr" v-for="(obj,index_ch) in item.arr">
                  <span class="yuan">{{obj}}</span>
                  <i v-if="index_ch != item.arr.length-1" class="arrows"></i>
                </li>
              </ul>
            </div>
            <div class="li-right fl">{{item.des}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--<div class="audit-box" v-if="stop_setting && stop_setting.enabled != undefined && stop_setting.enabled != null && stop_setting.enabled">-->
    <div class="audit-box" v-if="showStopSetting">
      <div class="inter_title">内审流程</div>
      <!--选择操作者 start -->
      <template v-if="stop_setting && stop_setting.items">
        <div class="interPro scroll-beauty"
             v-for="(obj,index4) in stop_setting.items">
          <span class="operators_del" v-if="0 != index4" @click="deleteOperatorItem(obj,index4)">删除</span>
          <div class="choose_operators" >
            <div class="operator_item operator_header">
            <span
              class="default css_text_blue"
              @click="addDep(index4)"
              :class="index4 | filterClassDefault">{{obj.role_name | filterRoleName(index4)}}</span>
              <i v-if="index4!=0" class="bi" @click="addDep(index4)"></i>
              <br>
              <span class="text">{{obj.role_name}}</span>
            </div>
            <!--头部左侧的部门 end ==========-->
            <!--里面每一个横条中的循环 start==================-->
            <ul class="operator_box">
              <!--第一个操作发起者 start -->
              <li class="operator_item">
               <span>
               <i class="icon-start"></i>
               <span class="span_button">操作发起者</span>
            </span>
              </li>
              <!--中间的循环 start -->
              <li class="operator_item" v-for="(item,index) in obj.steps">
              <span>
               <i class="icon-during"></i>
                 <br>
                <span class="name">{{item.user_or_role_name}}</span>
               <i class="icon-del" @click="removeOperators(index4,index)"></i>
                <!--<span class="span_button" v-if="index==obj.steps.length-1">审核者</span>-->
                <!--<span class="span_button" v-else>分配者</span>-->
                <span class="span_button">审核者</span>
                <!--<el-select v-model="item.audit_type" placeholder="请选择" v-if="isRevise"-->
                <!--@visible-change="changeVisible($event,index4,index)">-->
                <!--<el-option-->
                <!--v-for="option in Listaudit_type"-->
                <!--:key="item.value"-->
                <!--:label="option.label"-->
                <!--:disabled="option.disabled"-->
                <!--:value="option.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
            </span>
              </li>
              <!--里面每一个横条中的循环 end==================-->
              <!--最后的添加-->
              <li class="operator_item" v-if="isRevise">
            <span @click="addOperator(index4)">
              <i class="icon-add"></i>
            </span>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <el-button type="primary" @click="addOperatorItem">添加流程</el-button>
      <p class="line"></p>
    </div>
    <!--弹框选人-->

    <el-dialog title="选择角色" :visible.sync="markChoosePeople">
      <el-table
        ref="singleTable"
        :data="listRolesAll"
        highlight-current-row
        height=356
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
          <div class="min_operator operator_item" v-if="currentCategoryType.category == 'role' || currentCategoryType.category == 'member'">
            <div class="li_header">
              部门
            </div>
            <el-tree :data="listDepartmentsTree"
                     :props="defaultProps"
                     :highlight-current=true
                     @node-click="handleNodeClick"></el-tree>
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
    <div class="btn-box com-btn-el">
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
      this.provider_id = this.$route.params.id;
      this.netGetDetail(this.provider_id);

      this.netGetDepartment(this.provider_id);
      this.netGetDepartmentTree(this.provider_id);
      this.getRolesAll(this.provider_id);
    },
    watch:{
      "$route": "fetchDate"
    },
    data(){
      return {
        // 静态信息
        data_static:[
          {
            arr:['经办人','项目负责人','项目终止'],
            des:'由经办人发起的项目终止，需要由经办人的领导审核通过后再由项目负责人和其领导审核通过后即完成项目终止。'
          }
          ,{
            arr:['项目负责人','项目终止'],
            des:'由项目负责人发起的项目终止，只需由项目负责人的领导审核通过后即完成项目终止。'
          }],

        // data start ===============
        stop_setting:null,
        stop_setting_or:null,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        loadingMark:false,
        audit_setting:null,
        setting_id:null,
        provider_id:null,
        listDepartments:[],
        listDepartmentsTree:[],//部门树
        listRoles:[],//角色列表
        listSuppliers:[],//员工列表
        listRolesAll:[],
        currentRolesLeft:null,
        indexAddDep:-100,
        // data end ===============
        isRevise:true,//显示修改
        Listaudit_type: [
          {
            label: "分配者",
            value: "assigner",
            disabled: true
          },
          {
            label: "审核者",
            value: "auditor"
          }
        ],
        markChoosePeople: false,
        currentCategoryType:{},//当前选中的 类型
        currentDepartment:null,
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
      showCheckEnable(){
        if(!this.isEmpty(this.stop_setting) && !this.isEmpty(this.stop_setting.enabled))return true;
        return false
      },
      showStopSetting(){
        if(!this.isEmpty(this.stop_setting) && !this.isEmpty(this.stop_setting.enabled) && this.stop_setting.enabled)return true;
        return false;
      },
      currentRoleName(){
        if (!this.isEmpty(this.currentCategoryType.name) && this.currentCategoryType.name == "固定人员") {
          return "人员";
        } else {
          return "角色";
        }
      },
      //计算属性
      audit_setting_ji(){
        var item = this.audit_setting;
        if(this.isEmpty(item)){
          item = {};
          this.$set(item,'name','');
          this.$set(item,'id',-100);
          this.$set(item,'items',[]);
        }
        if(this.isEmpty(item.items) || item.items.length<1){
          var obj = {};
          obj.id = -100;
          obj.category = '';
          obj.role_id = -100;
          obj.role_name ='';
          obj.steps =[];
          item.items.push(obj);
        }
        //添加 角色的名字
        item.items.forEach(function (obj1,index1) {
          obj1.steps.forEach(function (obj3,index3) {
            if(obj3.category == "leader"){
              obj3.user_or_role_name = "直属领导";
            } else if (obj3.category == "underling") {
              obj3.user_or_role_name = "直属下属";
            }else if (obj3.category == "descendant") {
              obj3.user_or_role_name = "全部下属";
            } else if(obj3.category == "role"){
              var str = obj3.department_name + "|" + obj3.role;
              obj3.user_or_role_name = str;
            } else if(obj3.category == "member"){
              var str = obj3.department_name + "|" + obj3.user;
              obj3.user_or_role_name = str;
            }
          })
        })
        return item;
      },
    },
    methods: {
      fetchDate(){
        this.setting_id = this.$route.params.setting_id;
        this.provider_id = this.$route.params.id;
        this.netGetDetail(this.provider_id);

        this.netGetDepartment(this.provider_id);
        this.netGetDepartmentTree(this.provider_id);
        this.getRolesAll(this.provider_id);

      },
      dealWithStop_setting(setting){
        var item = setting;

        if(this.isEmpty(item)){
          item = {};
          this.$set(item,'id',-100);
          this.$set(item,'items',[]);
          this.$set(item,'enabled',false);
        }
        if(this.isEmpty(item.items) || item.items.length<1){
          var obj = {};
          obj.id = -100;
          obj.category = '';
          obj.role_id = 0;
          obj.role_name ='';
          obj.steps =[];
          item.items.push(obj);
        }
        //添加 角色的名字
        item.items.forEach(function (obj1,index1) {
          obj1.steps.forEach(function (obj3,index3) {
            if(obj3.category == "leader"){
              obj3.user_or_role_name = "直属领导";
            } else if (obj3.category == "underling") {
              obj3.user_or_role_name = "直属下属";
            }else if (obj3.category == "descendant") {
              obj3.user_or_role_name = "全部下属";
            } else if(obj3.category == "role"){
              var str = obj3.department_name + "|" + obj3.role;
              obj3.user_or_role_name = str;
            } else if(obj3.category == "member"){
              var str = obj3.department_name + "|" + obj3.user;
              obj3.user_or_role_name = str;
            }
          })
        })
        this.stop_setting = item;
      },
      // 如果下一个是 固定人员，那么此处下拉框分配者禁用
      changeVisible(e,section,row){
        if(e){
          var mark = false; //不禁用
          var item1 = this.stop_setting.items[section];
          var item2 = item1.steps[row+1];
          if(!this.isEmpty(item2) && item2.category == "member")  mark = true;
          this.Listaudit_type[0].disabled = mark;
        }
      },
      //网络请求 start ===========================
      //1.获取详情
      // GET /v1/admin/providers/{provider_id}/project_stop_setting 终止流程设置信息
      netGetDetail(provider_id){
        if(this.isEmpty(provider_id) || provider_id<0){
          this.showMessage("warning","此项目不存在");
          return;
        }
        this.showLoading();
        var url = API.url+'providers/'+provider_id+'/project_stop_setting';
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          this.stop_setting_or = res.body.project_stop_setting;
          this.dealWithStop_setting(res.body.project_stop_setting);
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 2. 更新项目终止
      // POST /v1/admin/providers/{provider_id}/project_stop_setting 更新终止流程设置信息
      netUpdataDetail(){
        if (this.stop_setting.items.length < 1){
          this.showMessage("warning","请选择操作者,请检查或则联系开发人员");
          return;
        }
        // 检查每个
        var error ={mark:false,msg:''};
//        this.stop_setting.items.forEach(function (obj_b,index_b) {
//          var error_a = false;
//          obj_b.steps.forEach(function (obj_c,index_c) {
//            // 判断至少有一个 分配
//            if(obj_c.audit_type == 'auditor') { error_a = true;   }
//
//            if(obj_c.audit_type.length<1) {
//              error.mark = true;
//              error.msg  = '请选择人员的身份,请检查或则联系开发人员'
//            }
//          })
//          if(error_a == false){ //没有选择审核者
//            error.mark = true;
//            error.msg = '至少要有个审核者,请检查或则联系开发人员';
//          }
//        })
        if(error.mark){this.showMessage("warning",error.msg);return; }
        //拼接数据
        var that = this;
        var parm = {};
        var setting_req = {};
        setting_req.enabled = this.stop_setting.enabled;
        setting_req.items = [];
        this.stop_setting.items.forEach(function (obj1,index1) {
          var item_a = {};
          if(!that.isEmpty(obj1.id) && obj1.id >0){ //说明是新的
            item_a.id = obj1.id;
          }
          item_a.role_id = obj1.role_id;
          item_a.steps= [];
          obj1.steps.forEach(function (obj2,index2) {
            var step_a = {};
            if(!that.isEmpty(obj2.id) && obj2.id >0){ //说明是新的
              step_a.id = obj2.id;
            }
            step_a.category = obj2.category;
//            step_a.audit_type = obj2.audit_type;
            if(obj2.department != undefined && obj2.department != null){
              step_a.department_id = obj2.department.id;
            }
            if(obj2.department_id != undefined && obj2.department_id != null){
              step_a.department_id = obj2.department_id;
            }
            step_a.role_id = obj2.role_id;
            step_a.user_id = obj2.user_id;
            item_a.steps.push(step_a);
          })
          setting_req.items.push(item_a);
        })
        parm.project_stop_setting = setting_req;
        var url = API.url+'providers/'+this.provider_id+'/project_stop_setting';
        this.showLoading();
        this.$http.post(url,parm
        ).then((res)=>{
          this.hiddenLoading();
          this.showMessage("success","保存成功");
          this.netGetDetail(this.provider_id);
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
//        this.showLoading();
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
      // 6. 删除条目
      // DELETE /v1/admin/providers/{provider_id}/project_stop_setting/items/{id} 项目终止流程条目删除
      netDeleteItems(provider_id,id){
        if(this.isEmpty(provider_id)){
          this.showMessage("warning","此项目不存在,请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(id)){
          this.showMessage("warning","该条目不存在，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'providers/'+provider_id+'/project_stop_setting/items'+id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 删除 步骤
      // DELETE /v1/admin/audit_settings/{audit_setting_id}/items/{item_id}/items/{id} 步骤删除
      netDeleteStep(audit_setting_id,item_id,id){
        if(this.isEmpty(audit_setting_id)){
          this.showMessage("warning","该步骤不存在，请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(id)){
          this.showMessage("warning","该步骤不存在，请检查或则联系开发人员");
          return;
        }
        if(this.isEmpty(item_id)){
          this.showMessage("warning","该步骤不存在，请检查或则联系开发人员");
          return;
        }
        this.showLoading();
        var url = API.url+'audit_settings/'+audit_setting_id+'/items/'+item_id+'/items/'+id;
        this.$http.get(url
        ).then((res)=>{
          this.hiddenLoading();
          // 删除成功
//          this.listSuppliers = res.body.suppliers;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      //7. 获取角色`全部的=========
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

      //网络请求 end ===========================
      // method start =========================
      addDep(index){
        if (0 != index) {
          this.markChoosePeople = true;
          this.indexAddDep = index;
        }
      },
      // 提交 commit
      commitAll(){
        this.netUpdataDetail();
      },
      // method start =========================
      //新增功能 ，删除当前的 一行操作
      deleteOperatorItem(item, section){
        var obj = this.stop_setting.items[section];
        if(!this.isEmpty(obj.id) && obj.id >0){ //后端返回的真实数据，需要网络请求去删除
          var item_id = obj.id;
          if(this.isEmpty(this.provider_id)){
            this.showMessage("warning","该条目不存在，请检查或则联系开发人员");
            return;
          }
          if(this.isEmpty(item_id) || item_id<0){
            this.showMessage("warning","该条目不存在，请检查或则联系开发人员");
            return;
          }
          // DELETE /v1/admin/providers/{provider_id}/project_stop_setting/items/{id} 项目终止流程条目删除
          this.$confirm('确认是否删除?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.showLoading();
            var url = API.url+'providers/'+this.provider_id+'/project_stop_setting/items/'+item_id;
            this.$http.delete(url
            ).then((res)=>{
              this.hiddenLoading();
              this.stop_setting.items.splice(section,1);
            },(error)=>{
              this.showMessage("error","请求出错，请联系开发人员");
              this.hiddenLoading();
            })
          });
        }else { //之前添加的数据，直接删除即可
          this.$confirm('确认是否删除?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.stop_setting.items.splice(section,1);
          }).catch((error) => {
          });
        }
      },
      addOperatorItem(){
        var item ={
          role_id:-100,
          role_name:'',
          steps:[]
        }
        this.stop_setting.items.push(item);
      },
      // 新加的部分
      addPeople(index){
        if (0 != index&&this.isRevise==true) {
          this.markChoosePeople = true;
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
      //左侧选择角色 点击确定
      clickChooseDep(){
        this.markChoosePeople = false;
        if(this.isEmpty(this.currentRolesLeft)){
          return;
        }
        if(this.indexAddDep >0 &&　!this.isEmpty(this.currentRolesLeft)){ //有效的
          var item =  this.stop_setting.items[this.indexAddDep];
          item.role_id = this.currentRolesLeft.id;
          item.role_name = this.currentRolesLeft.name;
        }
      },
      // 左侧选择角色 的点击的动态事件
      handleRowChange(row, event, column){
        this.currentRolesLeft = row;
      },
      addOperator(index) {
        // 全部清空
        this.clearAllOperator();
        //此处是验证 用的
        // 需要判断 上一个 是否有选择
//        var item =  this.stop_setting.items[index];
//        if(item.steps.length>0){
//          var last = item.steps[item.steps.length-1];
//          if(last.audit_type.length < 1){
//            this.showMessage("warning","您上一个人员还未选择分配，请先选择");
//            return;
//          }
//        }
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

        this.currentCategoryType = {
          category:"leader",
          index:0,
          name:"直属领导"
        }
        this.currentDepartment = null;
        this.indexAddDep = -100;
        this.currentRolesLeft = null;

      },
      log(item){
        console.log(item);
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
        var list_items = this.stop_setting.items[this.indexCurrentItems];
//        if(!this.isEmpty(list_items.steps) && list_items.steps.length>0){
//          var array_ad = list_items.steps;
//          var obj6 =  array_ad[array_ad.length-1];
//          if(obj6.audit_type == "assigner"){
//            if(index == 4){
//              this.showMessage("warning","您上一个选择了 分配者，此处不可以选择 固定人员，请检查或则联系开发人员");
//              return;
//            }
//          }
//        }
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
      //删除 某个条目
      removeOperators(section,row) {
        var obj1 = this.stop_setting.items[section];
        var obj  = obj1.steps[row];
        if(!this.isEmpty(obj.id) && obj.id >0){ //后端返回的真实数据，需要网络请求去删除
          var item_id = obj1.id;
          var id = obj.id;
          if(this.isEmpty(this.provider_id)){
            this.showMessage("warning","该项目不存在，请检查或则联系开发人员");
            return;
          }
          if(this.isEmpty(id) || this.isEmpty(item_id) || item_id<0 || id<0){
            this.showMessage("warning","该条目不存在，请检查或则联系开发人员");
            return;
          }
          // DELETE /v1/admin/providers/{provider_id}/project_stop_setting/items/{item_id}/steps/{id} 项目终止流程步骤删除
          this.$confirm('确认是否删除?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.showLoading();
            var url = API.url+'providers/'+this.provider_id+'/project_stop_setting/items/'+item_id+'/steps/'+id;
            this.$http.delete(url
            ).then((res)=>{
              this.hiddenLoading();
              obj1.steps.splice(row,1);
            },(error)=>{
              this.showMessage("error","请求出错，请联系开发人员");
              this.hiddenLoading();
            })
          })
        }else { //之前添加的数据，直接删除即可
          this.$confirm('确认是否删除?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            obj1.steps.splice(row,1);
          }).catch((error) => {
          });
        }
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
        var item = {};
        item.category = this.currentCategoryType.category;
        item.department = this.currentDepartment;
        item.audit_type = "";
        item.user_or_role_name = "";

        if(this.currentCategoryType.category == "role" ){ //如果是角色
          item.role_id = this.currentRoles.id;
          item.role = this.currentRoles.name;
          item.department_name = item.department.name
          if(item.department.length <1 || this.currentRoles.name.length<1){
            this.showMessage("warning","有未选择的 部门或则角色，请检查或则联系开发人员");
            return;
          }
          item.user_or_role_name = item.department_name + "|" + item.role;
        }else if(this.currentCategoryType.category == "member"){
          item.user_id = this.currentSuppliers.id;
          item.user = this.currentSuppliers.name;
          item.department_name = item.department.name
          if(item.department.length <1 || this.currentSuppliers.name.length<1){
            this.showMessage("warning","有未选择的 部门或则人员，请检查或则联系开发人员");
            return;
          }
          item.user_or_role_name = item.department_name + "|" + item.user;
        }else if(this.currentCategoryType.category == "leader"){
          item.user_or_role_name = "直属领导";
        }else if(this.currentCategoryType.category == "underling"){
          item.user_or_role_name = "直属下属";
        }else if(this.currentCategoryType.category == "descendant"){
          item.user_or_role_name = "全部下属";
        }
        item.audit_type = "";
        if(this.indexCurrentItems >= 0 ){
          this.stop_setting.items[this.indexCurrentItems].steps.push(item);
        }
      },
      reviseAudit(index){
        this.isRevise = true
      },
      saveAudit(index){
        this.isRevise = false
      }
    },
    filters: {
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
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .add-verification{
    border:1px solid #efefef;
    width: 1200px;
    margin: 10px;
    .st-up{
      .row-title{
        font-size: 14px;
        color: #1B1B1B;
        font-weight:bold;
        padding-bottom: 12px;
      }
      margin-left: 45px;
      margin-top: 20px;

      .st-row{
        margin-right: 45px;
        &:first-child{
          border-bottom:  1px solid #efefef;
          margin-bottom: 20px;
          padding-bottom: 20px;
        }
        &:last-child{
          margin-bottom: -20px;
        }
        ul{
          li{
            margin-top: 5px;
            margin-bottom: 5px;
            border:  1px solid #efefef;
            .li-left{
              width: 352px;
              border-right: 1px solid #efefef;
              position: relative;
              padding-left: 28px;
              span{
                display: inline-block;
              }
              ul{
                overflow: hidden;
                li{
                  float: left;
                  margin-top: 0px;
                  border:  0px solid #efefef;
                }
              }
              .blue{
                width: 28px;
                height: 90px;
                background-color: #3c8ced;
                color: white;
                position: absolute;
                line-height: 90px;
                vertical-align: middle;
                left: 0px;
                padding-left: 8px;
              }
              .arr{
                padding: 17px 0;
                .yuan{
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                  border: 1px solid #efefef;
                  margin-left: 20px;
                  font-size: 12px;
                  color: #5C5C5C;
                  vertical-align: middle;
                  padding-top: 15px;
                  text-align: center;
                }
                .arrows{
                  display: inline-block;
                  width: 27px;
                  height: 15px;
                  background: url("../../../assets/images/aduit/arrow.png") no-repeat 0/cover;
                  margin-left: 20px;
                  vertical-align: middle;
                }
              }
            }
            .li-right{
              width:  calc(100% - 352px);
              font-size: 14px;
              color: #5C5C5C;
              line-height: 90px;
              padding-left: 20px;
            }
          }
        }
        .row-des{
          font-size: 12px;
          color: #999;
          margin-left: 58px;
          position: relative;
          &:before {
            content: '';
            position: absolute;
            top:0px;
            left: -18px;
            width: 14px;
            height: 15px;
            background: url("../../../assets/images/gd_ico/not_upload.png") no-repeat 0/cover;
          }
        }
      }
    }
    .audit-box {
      border:0px;
      .inter_title{
        font-size: 14px;
        border-bottom: 1px solid #efefef;
        margin-bottom: 20px;
        padding-bottom: 12px;
        font-weight: bold;
      }
      .interPro{
        .span_button {margin-top: 0px}
      }
      .line{
        margin-top: 20px;
        width: 100%;
        height: 1px;
        background-color: #efefef;
      }
    }
    .btn-box{
      margin-bottom: 20px;
    }
  }


  .current_paoviders_g {
    margin-left: 20px;
  }
  /*粗体*/
  @mixin base_font_bold{
    font-weight: 800;
  }
  .add-verification {
    .btn-box{
      margin-top:40px;
      text-align: center;
    }
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
