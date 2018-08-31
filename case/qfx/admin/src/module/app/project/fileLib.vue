<template>
  <div class="file-lib">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'project' }">项目管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name:'projectCon',params:{id:projectId,state_id:stageId} }">上海张江国家自主创新示范区专项发展资金</el-breadcrumb-item>
      <el-breadcrumb-item >文件夹</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-title">项目文件库</div>
    <div class="file-box clearfix">
      <ul>
        <li v-for="v in project_folders">
          <router-link :to="{name:'fileDtl',params:{pro_id:projectId,id:v.id,stage_id:stageId}}">
            <img src="../../../assets/images/project/flie-lib.png">
            <p>{{v.name}}</p>
          </router-link>
        </li>

      </ul>
    </div>
    <div class="blue-title">服务商内部文件库</div>
    <div class="file-box clearfix">
      <ul>
        <li v-for="v in inside_folders">
          <router-link :to="{name:'fileDtl',params:{pro_id:projectId,id:v.id,stage_id:stageId}}">
          <img src="../../../assets/images/project/flie-lib.png">
          <p>{{v.name}}</p>
          </router-link>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'

  export default{
    data(){
      return{
        project_folders:'',
        inside_folders:'',
        projectId:'',
        stageId:''
      }
    },
    created(){
      this.getFile()
    },
    methods:{
      getFile(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id + '/folders'
        ).then((res) => {
          this.project_folders = res.body.project_folders
          this.inside_folders = res.body.inside_folders
          this.projectId = this.$route.params.id
          this.stageId = this.$route.params.stage_id
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .file-lib{
    .file-box{
      padding:20px;
      height:243px;
      li{
        float: left;
        width:60px;
        text-align: center;
        margin-right:50px;
        cursor: pointer;
      }
      p{
        font-size:14px;
        color:#1b1b1b;
      }
    }

  }
</style>
