<template>
  <div class="project-list">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'project' }">项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-tab">
      <ul>
        <li v-for="(v,i) in location" @click="chooseLocation(i)" :class="{active:v.active}">{{v.place}}</li>
      </ul>
    </div>
    <div class="form-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="服务项目">
          <el-input v-model="formInline.no_or_product_service_name_cont" placeholder="项目编号或项目名称"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.corp_name_cont" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="服务商">
          <el-input v-model="formInline.provider_name_cont" placeholder="请输入服务商企业名称"></el-input>
        </el-form-item>
        <br>


        <el-form-item label="项目负责人">
          <el-input v-model="formInline.owner_name_cont" placeholder="请输入项目负责人"></el-input>
        </el-form-item>

        <el-form-item label="项目经办人">
          <el-input v-model="formInline.agent_name_cont" placeholder="请输入项目经办人"></el-input>
        </el-form-item>
        <el-form-item label="企业负责人">
          <el-input v-model="formInline.corp_principal_name_eq" placeholder="请输入企业负责人"></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="formInline.status_eq" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="项目进行中" value="proceeding"></el-option>
            <el-option label="项目已完成" value="finished"></el-option>
            <el-option label="项目已终止" value="stop"></el-option>
            <el-option label="项目已拒绝" value="deny"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目来源">
          <el-select v-model="formInline.source_eq" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="线上项目" value="online"></el-option>
            <el-option label="线下项目" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报年份">
          <el-select v-model="formInline.year_eq" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option :label="v" :value="v" v-for="v in yearArr" ></el-option>
          </el-select>
        </el-form-item>

        <br/>

        <el-form-item label="创建日期">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
                :editable="false"
                @change = 'datePicker1'
              >
              </el-date-picker>
            </div>
          </template>
          <span class="fl date-line"></span>
          <template>
            <div class="fl">
              <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions2"
                :editable="false"
                @change = 'datePicker2'
              >
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item style="margin-right:0;">
          <el-button type="primary" @click="toSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="xsx_list_none" v-if="count==0"></div>
    <div v-else>
      <table class="tableList">
        <tr>
          <th>项目名称</th>
          <th>服务商名</th>
          <th>项目编号</th>
          <th>项目状态</th>
          <th>企业负责人</th>
          <th>项目负责人</th>
          <th>项目经办人</th>
          <th>操作</th>
        </tr>
        <tr v-for="projects in projects">
          <td><span class="apply-year" v-if="projects.year!=null">{{projects.year}}年申报</span></td>
          <td>
            <a class="listItem" :title="projects.service">{{projects.service}}</a>
            <a class="small small2" :title="projects.corp_name">{{projects.corp_name}}</a>
          </td>
          <td>
            <a class="listItem" :title="projects.provider">{{projects.provider}}</a>
          </td>
          <td >
            <div class="online" v-if="projects.source == 'online'"><i></i><span>线上项目</span></div>
            <div class="offline"v-if="projects.source == 'offline'"><i></i><span>线下项目</span></div>
            <div class="no">{{projects.no}}</div>
          </td>
          <td>
            <div class="science">{{projects.process_stage}}</div>
            <div class="small">{{projects.audit_status}}</div>
          </td>
          <td>
            <p class="small">{{projects.corp_principal_name}}</p>
          </td>
          <td>
            <p class="small">{{projects.owner_name}}</p>
          </td>
          <td>
            <p class="small" v-if="projects.agent_name == null || projects.agent_name == ''">--</p>
            <p class="small" v-else>{{projects.agent_name}}</p>
          </td>
          <td>
            <p class="look" v-if="projects.status!='proceeding'"><router-link :to="{name:'serviceApply',params:{id:projects.id,stage_id:projects.first_stage_id}}">查看</router-link></p>
            <p class="look" v-if="projects.status=='proceeding'"><router-link :to="{name:'serviceApply',params:{id:projects.id,stage_id:projects.process_stage_id}}">查看</router-link></p>
          </td>
        </tr>
      </table>
    </div>
    <div class="pagination">
      <div class="block">
        <el-pagination
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="count"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'

  export default{
    data(){
      return {
        projects: [],
        count:0,
        range:'',
        currentPage1:1,
        location: [
          {
            active: true,
            place: '全部地区',
            range: ''
          },
          {
            active: false,
            place: '上海',
            range: '上海'
          }
        ],
        formInline: {
          corp_name_cont: '',
          owner_name_cont:'',
          agent_name_cont:'',
          status_eq: '',
          source_eq: '',
          provider_name_cont: '',
          created_at_gteq: '',
          created_at_lteq: '',
          no_or_product_service_name_cont: '',
          year_eq:'',
          corp_principal_name_eq:'',
        },
        value1: '',
        value2: '',
        stage_id:'',//获取项目详情的阶段id
        yearArr:[],//申报年份选择
      }
    },
    created(){
       if(this.$store.state.project.projectPage!=''){
       this.currentPage1 = this.projectPage
       this.getYear()
       this.obtainStatistics()
      }
    },
    computed:{
      ...mapGetters(['projectSearch','projectPage']),
    },
    beforeRouteEnter(to,from,next){
      next(vm=>{
        if(to.name=='project'){
        vm.formInline = vm.projectSearch
        vm.currentPage1 = vm.projectPage
        vm.value1= vm.formInline.created_at_gteq
        vm.value2= vm.formInline.created_at_lteq
        vm.toSearch()
      }
      })
    },
    beforeRouteLeave(to,from,next){
      var mark =false;
      if(to.name=='project'||to.name=='serviceApply'){
        mark = true
      }
      if(!mark){
        this.formInline = {
          no_or_product_service_name_cont: '',
          corp_name_cont: '',
          owner_name_cont:'',
          agent_name_cont:'',
          status_eq: '',
          source_eq: '',
          provider_name_cont: '',
          created_at_gteq: '',
          created_at_lteq: '',
          year_eq:'',
          corp_principal_name_eq:'',

        },
        this.currentPage1 = 1
        this.value1= ''
        this.value2= ''
        this.$store.dispatch('projectSearch', this.formInline)
          this.$store.dispatch('projectPage', this.currentPage1)
      }
      next(true)
    },
    methods: {
    	//获取地区总数
      obtainStatistics()
      {
        this.$http.get(API.url + 'projects/statistics'
        ).then((res) => {
          this.location[0].place = '全部地区（' + res.body.total_count + '）'
          this.location[1].place = '上海（' + res.body.total_count + '）'
        })
      },
    	//选择地区
      chooseLocation(i)
      {
        this.location.forEach((v) => {
          v.active = false
      })
        this.currentPage1 = 1
        this.range = this.location[i].range
        this.location[i].active = true
        this.toSearch()
      },

      //分页
      handleCurrentChange(val){
        this.$store.dispatch('projectPage', this.currentPage1)
        this.$http.get(API.url + 'projects?district=' + this.range + '&page='+val,{
          params: {
            q: this.clearParams(this.formInline),
            per:10,
          }//公共方法在clear里 把不需要的key删除
          }
        ).then((res) => {
          this.projects = res.body.projects
          this.count = res.body.total_count
        })
      },
      //查看项目详情
      checkDtl(id){
        this.$http.get(API.url + 'projects/' + id
        ).then((res) => {
          this.stage_id = res.body.project.stages[0].id
          this.$store.dispatch('projectSearch', this.formInline)
          this.$router.push({name:'serviceApply',params:{id:id,stage_id:this.stage_id}})
        })
      },
      datePicker1(val){
        console.log(val)
        this.formInline.created_at_gteq = val
      },
      datePicker2(val){
        this.formInline.created_at_lteq = val
      },
      //查询条件
      toSearch(){
        this.$http.get(API.url+'projects', {
          params: {
            q: this.clearParams(this.formInline),
            per:10,
            page:this.currentPage1
          }//公共方法在clear里 把不需要的key删除
        }).then((res)=>{
          this.projects = res.body.projects
          this.count = res.body.total_count

        })
      },
      //获取年份
      getYear(){
        var date=new Date;
        var year=date.getFullYear();
        var num = year -2013
        for(var i = num+1;i--;i>0){
          this.yearArr.push(year-i)
        }
        for(var i = 1;i<4;i++){
          this.yearArr.push(year+i)
        }
      },

    },

  }
</script>
<style lang="scss" rel="stylesheet/scss" scope>
  .project-list {
    height: 100%;
    padding:0;
      .el-breadcrumb:after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 1200px;
        height: 1px;
        background: #efefef;
      }
    .form-box{
      margin-left: 20px;
      margin-right:20px;
    }
    .online{
      i{
        display: inline-block;
        width:14px;
        height:11px;
        background: url("../../../assets/images/project/projecticon1.png") no-repeat;
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
        background: url("../../../assets/images/project/projecticon2.png") no-repeat;
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
  .project-list{
    .form-box .el-form--inline .el-form-item__label{
      width: 82px;
    }
  }
</style>
