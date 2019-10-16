<template>
  <div class="organization">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="supperAdmin">
      <div class="custom-btn" v-if="showNewProject">
        <router-link :to="{name:'addProject'}"><el-button>新增项目</el-button></router-link>
      </div>
    </div>
    <div class="form-box mb20 projectlist">
      <el-form :inline="true" :model="projectlist" class="demo-form-inline" v-if="iflogin">
        <el-form-item label="企业名称" style="margin-right: 0">
          <el-input v-model="projectlist.corp_name_cont" style="width: 200px;" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" style="margin-left: 15px;">
          <el-input v-model="projectlist.product_service_name_cont" style="width: 200px;" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" style="margin-left: 15px;">
          <el-input v-model="projectlist.owner_name_cont" style="width: 200px;" placeholder="请输入项目负责人"></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="projectlist.status_eq" style="width: 200px;" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="项目进行中" value="proceeding"></el-option>
            <el-option label="项目已完成" value="finished"></el-option>
            <el-option label="项目已终止" value="stop"></el-option>
            <el-option label="项目已拒绝" value="deny"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目经办人" style="margin-left: 15px;">
          <el-input v-model="projectlist.agent_name_cont" style="width: 200px;" placeholder="请输入项目经办人"></el-input>
        </el-form-item>
        <el-form-item label="项目来源" style="margin-left: 15px;">
          <el-select v-model="projectlist.source_eq" style="width: 200px;" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="线上项目" value="online"></el-option>
            <el-option label="线下项目" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <div v-show="queryHide">
          <el-form-item label="项目编号" style="margin-left: 0;">
            <el-input v-model="projectlist.no_cont" style="width: 200px;" placeholder="请输入项目编号"></el-input>
          </el-form-item>
          <el-form-item label="企业负责人" style="margin-left: 15px;">
            <el-input v-model="projectlist.corp_principal_name_eq" style="width: 200px;" placeholder="请输入企业负责人"></el-input>
          </el-form-item>
          <el-form-item label="申报年份" style="margin-left: 15px;">
            <el-select v-model="projectlist.year_eq" style="width: 200px;" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="year in yearcont" :label="year" :value="year" :key="year"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item style="margin-right: 0">
          <span>
            <el-button type="primary" @click="queryData">查询</el-button>
          </span>
        </el-form-item>
        <el-form-item style="margin-right: 42px;" class="open">
          <img src="../../assets/images/shangjiantou.png" height="7" width="10" class="huisejiant" v-show="down">
          <img src="../../assets/images/shangjiantou.png" height="7" width="10" v-show="up">
          <span class="openTips" @click="moreSearch" v-show="openTips">{{openTipsContent}}</span>
        </el-form-item>
      </el-form>
    </div>
    <div>{{showSeach}}</div>
    <div class="xsx_list_none" v-if="total_count==0"></div>
    <div v-else>
      <div class="xsxm_list">
       <table class="tableList">
         <tr>
           <th>项目名称</th>
           <th>项目编号</th>
           <th>项目状态</th>
           <th>企业负责人</th>
           <th>项目负责人</th>
           <th>项目经办人</th>
           <th>操作</th>
         </tr>
         <tr v-for="products in products">
            <td>
              <a class="listItem" :title="products.service">{{products.service}}</a><!-- 最多可放16个字 -->
              <a class="small small2" :title="products.corp_name">{{products.corp_name}}</a><!-- 最多可放19个字 -->
            </td>
            <td >
              <div class="online" v-if="products.source == 'online'"><i></i><span>线上项目</span></div>
              <div class="offline"v-if="products.source == 'offline'"><i></i><span>线下项目</span></div>
              <div class="no">{{products.no}}</div>
            </td>
            <td>
              <div class="science">{{products.process_stage}}</div>
              <div class="small">{{products.audit_status}}</div>
            </td>
            <!-- 企业负责人 -->
            <td>
              <p class="small" v-if="products.corp_principal_name == null || products.corp_principal_name == ''">--</p>
              <p class="small">{{products.corp_principal_name}}</p>
            </td>
            <!-- 项目负责人 -->
            <td>
              <p class="small" v-if="products.owner_name == null || products.owner_name == ''">--</p>
              <p class="small">{{products.owner_name}}</p>
            </td>
            <!-- 经办人 -->
            <td>
              <p class="small" v-if="products.agent_name == null || products.agent_name == ''">--</p>
              <p class="small" v-else>{{products.agent_name}}</p>
            </td>
            <td>
              <p class="look" v-if="products.status!='proceeding'" type="text" @click="lookDetails(products.id,products.first_stage_id)">查看</p>
              <p class="look" v-if="products.status=='proceeding'" @click="lookDetails(products.id,products.process_stage_id)">查看</p>
            </td>
            <div v-if="products.year == null">
              <span class="shenbao" style="display:none;"></span>
            </div>
             <div v-else>
              <span class="shenbao">{{products.year}}年申报</span>
            </div>
         </tr>
       </table>
      </div>
      <div class="pagination">
        <div class="block">
          <el-pagination layout="total, prev, pager, next, jumper" :total="total_count| toInt" @current-change="handleCurrentChange" :page-size="10" :current-page="page">
          </el-pagination>
        </div>
      </div>
    </div>
<!-- getTime()/1000/60/60/24 -->
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  import {formatDate} from 'assets/js/filter'
  export default{
    data(){
      return {
        id:'',
        page:1,
        state_id:'',
        total_count:-1,
        products:[],
        service:'',//服务分类数据
        projectlist: {
          no_cont: '',//项目编号
          product_service_name_cont: '',//项目名字
          corp_name_cont: '',//企业用户
          status_eq:'proceeding',//项目状态
          source_eq: '',//项目来源
          product_service_category_id_eq: '',//服务分类
          corp_principal_name_eq:'',//企业负责人
          owner_name_cont: '',//项目负责人
          agent_name_cont:'',//项目经办人
          year_eq:'',//申报年份
        },
        stage_name: '项目管理',
        down:true,//下箭头
        up:false,//上箭头
        openTipsContent:'展开更多筛选条件',
        queryHide:false,
        openTips:true,
        yearcont:[],

      }
    },
    //根据路由判断显示的数据
     beforeRouteEnter (to, from, next) {
      next(vm => {
        // 从列表页跳转详情页
        if ((/serviceApply/.test(from.name))) {
          vm.page = vm.projectpage//让page等于vuex里的page
          vm.projectlist.status_eq = 'proceeding'
          vm.projectlist = vm.projectlist_zr
          // 加载数据
          vm.$http.get(API.url+'projects',{
            params:{
              q: vm.clearParams(vm.projectlist),
              per:10,
              page:vm.projectpage
            }
          }).then((res) => {
            var resBody= res.body
           vm.products = res.body.products
           vm.total_count = resBody.total_count
           })
        }else{
          vm.$store.dispatch('project')
          vm.page = vm.projectpage//让page等于vuex里的page
          vm.projectlist = vm.projectlist_zr
          // 加载数据
          vm.projectlist.status_eq = 'proceeding'
          vm.$http.get(API.url+'projects',{
            params:{
              q: vm.clearParams(vm.projectlist),
              per:10,
              page:vm.projectpage
            }
          }).then((res) => {
            var resBody= res.body
           vm.products = res.body.products
           vm.total_count = resBody.total_count
           })
        }
      })
    },
    created(){
      this.serviceSorts();
      this.getYear()
      this.page = this.projectpage

    },
    computed:{
      //角色权限项目新建
      ...mapGetters(['projectlist_zr','projectpage','dist_type','queryHide_zr']),//[] ,获取筛选条件,获取当前页,是否超级管理员
      iflogin(){
        if (this.$store.state.listscreen.projectlist) {
          return true
        } else {
          return false
        }
      },
      //角色权限
      showNewProject(){
        if(this.supperAdmin){
          var roleAbility = this.$store.state.admin.admin.user.role.ability;
          var isShow = roleAbility.some((v)=>{
            return v=='new_project'
          })
          return isShow
        }
      },
      //判断是否是超级管理员
      supperAdmin(){
        return this.dist_type=='Supplier'
      },
      showSeach(){
        if (this.queryHide_zr == true) {
          this.queryHide = true
          this.up = true
          this.down = false
          this.openTipsContent = '收起更多筛选条件'
        }else{
          this.queryHide = false
        }
        if (this.queryHide_zr == '') {
          this.up = false
          this.down = true
          this.openTipsContent = '展开更多筛选条件'
        }
      }
    },
    methods:{
      //查询
      queryData(){
        this.page = 1
        this.$http.get(API.url+'projects', {
          params: {
            q: this.clearParams(this.projectlist),
            per:10,
            page:this.page
          }//公共方法在clear里 把不需要的key删除
        }).then((res)=>{
            var resBody= res.body
           this.products = res.body.products
           this.total_count = resBody.total_count
        })
      },
      // 查看
      lookDetails(id,stateid){
        this.$router.push({name: 'serviceApply',params :{ id:id , state_id:stateid},query:{name:this.stage_name}})
        this.$store.dispatch('getprojectlist',{'projectlist':this.projectlist,'projectpage':this.page,'queryHide_zr':this.queryHide})
      },
      // 服务分类
      serviceSorts(){
        this.$http.get(API.serviceurl+'service_categories'
        ).then((res)=>{
            this.service = res.body.service_categories
        })
      },
      //分页
      handleCurrentChange(v){
        this.page = v
        this.$http.get(API.url+'projects',{
          params:{
            q: this.clearParams(this.projectlist),
            per:10,
            page:v
          }
        }).then((res) => {
          var resBody= res.body
          this.products = res.body.products
          this.total_count = resBody.total_count
        })
      },
      getTime(val){
        this.projectlist.created_at_gteq = val
      },
      getTime2(val){
        this.projectlist.created_at_lteq = val
      },
      moreSearch(){
        this.queryHide = !this.queryHide
        this.up = !this.up
        this.down = !this.down
        if (this.queryHide) {
            this.openTipsContent = '收起更多筛选条件'
        }else{
           this.openTipsContent = '展开更多筛选条件'
        }
      },
      getYear(){
        var date=new Date;
        var year=date.getFullYear();
        var num = year -2013
        var arr= []
        for(var i = num+1;i--;i>0){
          arr.push(year-i)
        }
        for(var i = 1;i<4;i++){
          arr.push(year+i)
        }
        this.yearcont = arr
      }
    },
    filters:{
      toInt(v){
        return parseInt(v)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  //搜索
  .form-box{
    padding:30px 20px 8px 20px;
    background: #f5f5f5;
    .el-form-item{
      margin-right: 0;
    }
  }

  .custom-btn{
    .el-button{
      padding:0;
    }
  }
  .serviceName{
    width: 250px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-input__icon+.el-input__inner{
    color: #999;
  }
  .el-table_1_column_1{
    padding-top: 20px;
  }
  .open{
    float: right;
    .openTips{
      font-size: 12px;
      color: #3C8CED;
      cursor: pointer;
    }
    .huisejiant{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg);   /* IE 9 */
      -moz-transform:rotate(180deg);  /* Firefox */
      -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
      -o-transform:rotate(180deg);
    }
  }
  .organization{
    .online{
      i{
        display: inline-block;
        width:14px;
        height:11px;
        background: url("../../assets/images/projecticon1.png") no-repeat;
        vertical-align: middle;
        margin-right:4px;
      }
      span{
        vertical-align: middle;
      }
    }
    .offline{
      i{
        display: inline-block;
        width:14px;
        height:14px;
        background: url("../../assets/images/projecticon2.png") no-repeat;
        vertical-align: middle;
        margin-right:4px;
      }
      span{
        vertical-align: middle;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .projectlist{
    .el-form--inline .el-form-item__label{
      width:82px;
    }
  }

  </style>
