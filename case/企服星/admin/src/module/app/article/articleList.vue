<template>
<div class="article">
  <div class="topart">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <router-link :to="{name:'addArticle'}">
      <el-button type="primary" class="add-btn-article">新增文章</el-button>
    </router-link>
  </div>

  <div class="table-box">
    <el-table :data="articles" border style="width: 100%">
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="category" label="一级分类" width="100">
        <template scope="scope">
          <span v-if="scope.row.category=='policy_news'">政策快讯</span>
          <span v-if="scope.row.category=='activity_news'">行业聚焦</span>
        </template>
      </el-table-column>
      <el-table-column prop="service_category" label="二级分类" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template scope="scope">
          <span v-if="scope.row.status=='online'">已上线</span>
          <span v-if="scope.row.status=='offline'">已下线</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="更新时间" width="200">
        <template scope="scope">
          <span>{{scope.row.updated_at | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <router-link :to="{name: 'editArticle',params: {id:scope.row.id}}">
            <el-button type="text">编辑</el-button>
          </router-link>
          <el-button type="text" @click="delArticle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="pagination">
    <div class="block">
      <el-pagination layout="total, prev, pager, next, jumper" :total="total_count | toInt" @current-change="handleCurrentChange":page-size="10">
      </el-pagination>
    </div>
  </div>

</div>
</template>

<script>
  import API from 'API/config'
  import {formatDate} from 'assets/js/filter'
  export default{
    created(){
      this._getArticle()
    },
    data() {
      return {
        total_count:1,
        articles:[],
      }
    },
    methods: {
      _getArticle(){
        this.$http.get(API.url+'articles').then((res)=>{
          var resBody=res.body;
          this.total_count=resBody.total_count
          this.articles=resBody.articles
        })
      },
      //分页
      handleCurrentChange(v){
        this.$http.get(API.url+'articles',{params:{page:v}}).then((res)=>{
          var resBody=res.body;
          this.total_count=resBody.total_count
          this.articles=resBody.articles
        })
      },
      //删除文章
      delArticle(v){
        this.$http.delete(API.url+'articles/'+v).then((res)=>{
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this._getArticle()
        }).catch((error)=>{
          this.$message({
            showClose: true,
            message: '删除失败',
            type: 'error'
          });
        })
      }
    },
    filters:{
      toInt(v){
        return parseInt(v)
      },
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style lang="scss" scoped>
.article {
  .topart{
    position: relative;
    .add-btn-article{
      position: absolute;
      right: 25px;
      top: 10px;
    }
  }

}
</style>
