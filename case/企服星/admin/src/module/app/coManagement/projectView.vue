<template>
  <div class="project-dtl">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'coManagement' }">企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{corpName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--<div class="form-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="项目">
          <el-input v-model="formInline.user1" placeholder="项目编号或项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-select v-model="formInline.region1" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="项目来源">
          <el-select v-model="formInline.region2" placeholder="全部">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
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
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <div class="table-box">
      <el-table :data="projects" style="width: 100%">
        <el-table-column prop="no" label="项目编号" width="180"></el-table-column>
        <el-table-column prop="service" label="项目名称" width="300"></el-table-column>
        <el-table-column prop="source" label="项目来源" width="140">
          <template scope="scope">
            <span v-if="scope.row.source=='offline'">线下项目</span>
            <span v-if="scope.row.source=='online'">线上项目</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建日期" width="200">
          <template scope="scope">
           <span>{{scope.row.created_at | formatDate}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="项目状态" width="180">
          <template scope="scope">
            <span v-if="scope.row.status=='proceeding'">项目进行中</span>
            <span v-else-if="scope.row.status=='deny'">项目已拒绝</span>
            <span v-else-if="scope.row.status=='stop'">项目已终止</span>
            <span v-else="scope.row.status=='finished'">项目已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template scope="scope">
            <span class="checkDtl"><router-link :to="{name:'serviceApply',params:{id:scope.row.id}}">查看</router-link></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination">
      <div class="block">
        <el-pagination
          :page-size="10"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total_count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from 'assets/js/filter'
  import API from 'API/config'
  export default{
    data(){
      return {
        itemID:'',
        projects:[],
        total_count:0,
        corpName:''
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$http.get(API.url+'projects?corp_id='+this.$route.params.id).then((res)=>{
         var resBody = res.body;
         this.total_count = resBody.total_count;
         this.projects = resBody.projects
          if(this.projects.length!=0){
            this.corpName = resBody.projects[0].corp_name
          }
         })
      },
      handleCurrentChange(val){
        this.$http.get(API.url+'projects?corp_id='+this.$route.params.id+'&per=10&page='+val).then((res)=>{
          var resBody = res.body;
          this.total_count = resBody.total_count;
          this.projects = resBody.projects
        })
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
