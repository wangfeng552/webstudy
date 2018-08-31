<template>
  <div class="process-list">

    <div class="blue-tab">

      <ul>
        <li v-for="(v,i) in serviceState" @click="chooseState(i)" :class="{active:v.active}">{{v.state}}</li>
      </ul>

      <router-link :to="{name:'addVerification', params: { provider_id: $route.params.id }}" v-if="changeTab == 0">
        <el-button type="primary" class="fr" >新增审核</el-button>
      </router-link>
      <router-link :to="{name:'addOperator', params: { provider_id: $route.params.id }}" v-if="changeTab == 1">
        <el-button type="primary" class="fr" >新增变更操作者</el-button>
      </router-link>
    </div>
    <div v-if="changeTab == 0">
      <div class="table-box">
        <el-table
          :data="feedbacks1"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="内审名称"
          >
          </el-table-column>
          <el-table-column
            label="发布日期"
            width="150"
          >
            <template scope="scope">
              <span>{{scope.row.created_at | formatDate}}</span>
              <!--<span>{{scope.row.created_at}}</span>-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template scope="scope">
              <span class="checkDtl" @click="editVerification(scope.row.id)">编辑</span>
              <span v-if="scope.row.can_destroy" class="del cp" @click="deleteAudit(scope.row.id)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="count1"
            @current-change="handleCurrentChange1"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else-if="changeTab == 1">
      <div class="table-box">
        <el-table
          :data="feedbacks2"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="变更名称"
          >
          </el-table-column>
          <el-table-column
            label="发布日期"
            width="150"
          >
            <template scope="scope">
              <span>{{scope.row.updated_at|formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template scope="scope">
              <span class="checkDtl" @click="editOperator(scope.row.id)">编辑</span>
              <span class="del cp" v-if="scope.row.can_destroy" @click="deleteOperation(scope.row.id)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage2"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="count2"
            @current-change="handleCurrentChange2"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-else><projectStop></projectStop></div>
  </div>
</template>
<script>
  import {formatDate} from 'assets/js/filter'
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  import projectStop from './projectStop.vue'

  export default{
    components: {projectStop},
    computed:{
      ...mapGetters(["change_tab_v"])
    },
    //根据路由判断显示的数据  保存 tab的切换
    beforeRouteLeave (to, from, next) {
        var tab = 0;
        if(this.changeTab == 1) tab = 1;
        var mark =false;
      if ((/\/addVerification/.test(to.fullPath))) {
        this.$store.dispatch('get_chnage_tab',tab);
        mark = true;
      }
      if ((/\/editVerification/.test(to.fullPath))) {
        this.$store.dispatch('get_chnage_tab',tab);
        mark = true;
      }
      if ((/\/addOperator/.test(to.fullPath))) {
        this.$store.dispatch('get_chnage_tab',tab);
        mark = true;
      }
      if ((/\/editOperator/.test(to.fullPath))) {
        this.$store.dispatch('get_chnage_tab',tab);
        mark = true;
      }
      if(!mark){
        this.$store.dispatch('get_chnage_tab',-100);
      }
      next(true)
    },
    data(){
      return{
        currnetPage1:1,
        currnetPage2:1,
        //tab切换
        serviceState: [
          {
            active: true,
            state: '审核流程',
            status: 'online'
          },
          {
            active: false,
            state: '变更操作者',
            status: 'offline'
          },
          {
            active: false,
            state: '项目终止',
            status: 'offline'
          },
        ],
        currentPage:1,
        status:'',
        changeTab:0,//审核流程和变更操作者切换
        //查询条件
        form1: {
          name1:'',
          value1: '',
          value2: ''
        },
        form2: {
          name2:'',
          value3: '',
          value4: ''
        },
        //表格
        feedbacks1:[
          {
            name:'lala',
            updated_at:'2017-06-29T11:47:27+08:00',
          },
          {
            name:'ffgdfg',
            updated_at:'2017-06-29T11:47:27+08:00',
          },
          {
            name:'dhfgh',
            updated_at:'2017-06-29T11:47:27+08:00',
          },
          {
            name:'erwerwe',
            updated_at:'2017-06-29T11:47:27+08:00',
          },

        ],
        feedbacks2:[
          {
            name:'lala',
            updated_at:'2017-06-29T11:47:27+08:00',
          },
          {
            name:'ffgdfg',
            updated_at:'2017-06-29T11:47:27+08:00',
          },
          {
            name:'dhfgh',
            updated_at:'2017-06-29T11:47:27+08:00',
          },
        ],
        //分页
        count1:0,
        count2:0,
      }
    },
    mounted(){
      if(this.change_tab_v == 1){
          this.chooseState(1)
      }else if(this.change_tab_v == 0){
        this.chooseState(0)
      }
    },

    created(){
//      this.getImf();
      this.netGetListAudits();
      this.netGetListOperationSettings();
    },
    methods:{
      isEmpty(item){
        if (item == undefined || item == null) {
          return true;
        } else {
          return false;
        }
      },
      checkList(){
        if(this.changeTab){
          this.netGetListAudits();
        }else {
          this.netGetListOperationSettings();
        }
      },
      //网络请求 start =============================================
      //1. 审核流程 list
      // GET /v1/admin/audit_settings 内审流程列表
      netGetListAudits(){
        var parm = {};
        parm.provider_id = this.$route.params.id;
        if(this.form1.name1.length > 0){
          parm.name = this.form1.name1;
        }
        if(this.form1.value1.length > 0){
          parm.created_at_gt = this.form1.value1;
        }
        if(this.form1.value2.length > 0){
          parm.created_at_lt = this.form1.value2;
        }
        parm.page = this.currnetPage1;
        parm.per = 10;
        var item = {params:parm}
//        this.showLoading();
        var url = API.url+'audit_settings';
        this.$http.get(url,item
        ).then((res)=>{
//          this.hiddenLoading();
//          console.log(res.body);
//          this.listDepartments = res.body.departments;
          this.feedbacks1 =  res.body.audit_settings;
          this.count1 = res.body.total_count;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      //2. 变更操作者 list
      // GET /v1/admin/operation_settings 变更操作者列表
      netGetListOperationSettings(){
        var parm = {};
        parm.provider_id = this.$route.params.id;
        if(this.form2.name2.length > 0){
          parm.name = this.form2.name2;
        }
        if(this.form2.value3.length > 0){
          parm.created_at_gt = this.form2.value3;
        }
        if(this.form2.value4.length > 0){
          parm.created_at_lt = this.form2.value4;
        }
        parm.page = this.currnetPage2;
        parm.per = 10;
        var item = {params:parm}
//        this.showLoading();
        var url = API.url+'operation_settings';
        this.$http.get(url,item
        ).then((res)=>{
//          this.hiddenLoading();
//          console.log(res.body);
//          this.listDepartments = res.body.departments;
          this.feedbacks2 =  res.body.operation_settings;
          this.count2 = res.body.total_count;
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },

      // 3. 变更操作者 删除
      // DELETE /v1/admin/operation_settings/{id} 变更操作者删除
      netDeleteListOperationSettings(id){
        if(this.isEmpty(id) || id <0){
          this.showMessage("error","您要删除的项目不存在");
          return;
        }
        var url = API.url+'operation_settings/'+id;
        this.$http.delete(url
        ).then((res)=>{
          // 删除成功 ,重新拉取一遍
          this.netGetListOperationSettings();
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      // 4. 内省 删除
      // DELETE /v1/admin/audit_settings/{id} 内审流程删除
      netDeleteListAuditSettings(id){
        if(this.isEmpty(id) || id <0){
          this.showMessage("error","您要删除的项目不存在");
          return;
        }
        var url = API.url+'audit_settings/'+id;
        this.$http.delete(url
        ).then((res)=>{
          // 删除成功 ,重新拉取一遍
          this.netGetListAudits();
        },(error)=>{
          this.showMessage("error","请求出错，请联系开发人员");
          this.hiddenLoading();
        })
      },
      //网络请求 end   =============================================
      //删除 内审
      deleteAudit(id){
        if(this.isEmpty(id) || id <0){
          this.showMessage("error","您要删除的项目不存在");
          return;
        }
        this.$confirm('确认是否删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.netDeleteListAuditSettings(id);
        }).catch(() => {
        });

      },
      //删除操作者
      deleteOperation(id){
        if(this.isEmpty(id) || id <0){
          this.showMessage("error","您要删除的项目不存在");
          return;
        }
        this.$confirm('确认是否删除?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.netDeleteListOperationSettings(id);
        }).catch(() => {
        });
      },
      //获取列表信息
      getImf(){

      },
      //切换状态
      chooseState(i){
        this.serviceState.forEach((v) => {
          v.active = false
        })
        this.changeTab = i;
//        if(i==0){
//          this.changeTab = true
//        }else if(i==1){
//          this.changeTab = false
//        }

        this.currentPage = 1
        this.serviceState[i].active = true
        this.status = this.serviceState[i].status
        this.checkList();
      },
      //分页
      handleCurrentChange1(val){
        this.currnetPage1= val;
        this.netGetListAudits();
      },
      //分页 2
      handleCurrentChange2(val){
        this.currnetPage2= val;
        this.netGetListOperationSettings();
      },
      //编辑操作者
      editOperator(id){
        this.$router.push({name:'editOperator', params: {provider_id:this.$route.params.id, setting_id: id }})
      },
      editVerification(id){
        this.$router.push({name:'editVerification',params: {provider_id:this.$route.params.id, setting_id: id }})
      }
    },
    watch: {
      '$route': 'checkList',
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .process-list{
    .blue-tab{
      padding-top:0;
      padding-bottom:0;
      height:60px;
      width: auto !important;
    }
    .form-box{
      display: block;
    }
    .form-box .el-form--inline .el-form-item{
      margin-right:39px;
    }
    .table-box{
      padding-right:0;
      padding-top:0;
    }
    .checkDtl{
      margin-right:10px;
    }
  }
</style>
