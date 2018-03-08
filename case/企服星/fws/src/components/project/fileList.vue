<template>
  <div class="file-dtl">
    <div class="w1200">
      <el-breadcrumb separator=">" class="mb20">
        <el-breadcrumb-item :to="{name:'projectList'}" v-if="this.$route.query.name=='项目管理'">{{this.$route.query.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'toDoList'}" v-if="this.$route.query.name=='待办事项'">{{this.$route.query.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'serviceApply',params:{id:projectId,state_id:stageId},query:{name:this.$route.query.name}}">{{service}}</el-breadcrumb-item>
        <el-breadcrumb-item>文件库</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main-box">
       <div class="left-part">
         <ul>
           <li v-for="(v,i) in file" @click="chooseItem(v,i)" :class="{active:v.active}" class="select-file">
             <i class="icon-w-file"></i>
             <span>{{v.name}}</span>
           </li>
         </ul>
       </div>
        <div v-if="project_folders!=''">
        <div class="center-part scroll-beauty">
         <ul>
         <li v-for="(v,i) in project_folders" @click="chooseLib(v,i)" :class="{active:isActive(i)}" class="select-file" v-show="fileShow">
           <i class="icon-s-file"></i>
           <a class="file-name" :title="v.name">{{v.name}}</a>
         </li>
         </ul>
       </div>
       <div class="right-part">
         <div v-if="attachments.length!==0" class="scroll-beauty">
           <ul>
           <li v-for="(v,i) in attachments">
             <i :class="v.name | filterIconClass" class="icon-default-g fl"></i>
             <a class="name" :title="v.name">{{v.name}}</a>
             <a class="size">{{v.file_size | byteConversion}}</a>
             <a class="date">{{v.created_at | formatDate}}</a>
             <!--<a class="watch">预览</a>-->
             <a class="download" :href="v.download_url">下载</a>
           </li>
           </ul>
         </div>

       </div>
        </div>
        <div v-else class="none-data-box">
          <div class="non-data">
            <img src="../../assets/images/project/no-file.png" alt="">
            <p class="non-text">文件夹空空如也~</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  import {filterIconClass,formatDate,byteConversion} from 'assets/js/filter'
  export default{
  	data(){
  		return{
         file:[
           {name:"项目文件库",active:true},
           {name:"内部文件库",active:false}
         ],
        project_folders:'',
        projectId:'',
        stageId:'',
        service:'',//面包屑
        fileShow:true, //项目文件和内部文件切换
        attachments:'',
        activeIndex:0,
      }
    },
    created(){
  		this.stageId = this.$route.params.stage_id
      this.projectId = this.$route.params.id
      this.getInitial()
      this.getProject()
    },
    methods:{
    	//一级目录选中逻辑
      chooseItem(v,i){
        this.file.forEach((item)=>{
          item.active = false
        })
      	v.active = true
        if(v.name=='项目文件库'){
        	this.getFile(1)
        }else{
          this.getFile(2)
          this.activeIndex = 0
        }
      },
      //二级目录选中逻辑
      chooseLib(v,i){
      	this.activeIndex = i
        this.isActive(i)
        this.getImf(v.id)
      },
      isActive(i){
      	if (i ===this.activeIndex){
            return true
        }else{
          return false
        }
      },
      //初始化请求二级目录和三级目录
      getInitial(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id + '/folders'
        ).then((res) => {
            this.project_folders = res.body.project_folders
          if(this.project_folders!=''&&this.project_folders!=null&&this.project_folders!='undefined'){
            var floders_id  = this.project_folders[0].id
            this.getImf(floders_id)
          }
        })
      },
      //获得文件二级目录
      getFile(i){
        this.$http.get(API.url + 'projects/' + this.$route.params.id + '/folders'
        ).then((res) => {
        	if(i===1){
            this.project_folders = res.body.project_folders
            if(this.project_folders==''){
            	this.attachments = ''
            }
          }else if(i===2)
          this.project_folders = res.body.inside_folders
          if(this.project_folders!=''&&this.project_folders!='undefined'&&this.project_folders!=null){
            var folders_id = this.project_folders[0].id
            this.getImf(folders_id)
          }else if(this.project_folders==''){
            this.attachments = ''
          }

        })
      },
      //获得文件三级目录
      getImf(folders_id){
        this.$http.get(API.url + 'projects/' + this.projectId + '/folders/' + folders_id + '/attachments'
        ).then((res) => {
          this.attachments = res.body.attachments
        })
      },
      //服务面包屑
      getProject(){
        this.$http.get(API.url +'projects/'+this.projectId).then((res)=>{
          this.service = res.body.project.service
        })
      }
    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      byteConversion(val){
        return byteConversion(val)
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .file-dtl {
    background: #f5f5f5;
    .el-breadcrumb{
      margin-bottom:0;
      margin-top:17px;
    }
    .main-box {
      background: #FFFFFF;
      height:624px;
      .left-part,.center-part,.right-part{
        float: left;
        height:100%;
        border-right:1px solid #efefef;
        padding-top:23px;

      }
      .left-part{
        width:176px;
      }
      .center-part{
        width:298px;
        .file-name{
          display: inline-block;
          width:220px;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .right-part{
        border-right:none;
        width:726px;

      }
      .non-data{
        width:330px;
        height:250px;
        margin:169px auto 0 auto;
        .non-text{
          margin-top: 22px;
          color: #666666;
          font-size:14px;
          text-align: center;
        }
      }
      ul{
        height:585px;
        overflow-y: auto;
      }
      li{
        position: relative;
        width:100%;
        padding-left:14px;
        height:24px;
        line-height:24px;
        margin-bottom:15px;
        span{
          display: inline-block;
          color: #1b1b1b;
          font-size:14px;
          margin-left:3px;
        }
        a{
          color: #5c5c5c;
          font-size:14px;
          display: inline-block;
          overflow: hidden;
          float: left;
        }
        .name{
          width:292px;
          text-overflow: ellipsis;
          white-space:nowrap;
          margin-right:58px;
        }
        .size{
          color: #a9a9a9;
          margin-right:28px;
        }
        .date{
          color: #a9a9a9;
          margin-right:35px;
        }
        .watch{
          color: #3c8ced;
          margin-right:12px;
          cursor: pointer;
        }
        .download{
          color: #3c8ced;
          cursor: pointer;
        }
      }
      li.active{
        background: #efefef;
        transition: background .3s;
      }
      li.select-file{
        cursor: pointer;
          &:after{
            content: '';
            position: absolute;
            right:7px;
            top:7px;
            border-top: 5px solid transparent;
            border-left: 9px solid #a9a9a9;
            border-bottom: 5px solid transparent;
          }
      }
    }
    .icon-default-g{
      margin-top:3px;
      margin-right:5px;
    }
    .icon-w-file{
      display: inline-block;
      width:20px;
      height:15px;
      background: url("../../assets/images/project/w-file.png") no-repeat;
      vertical-align: middle;
    }
    .icon-s-file{
      display: inline-block;
      width:20px;
      height:15px;
      float: left;
      margin-right:8px;
      margin-top:4px;
      vertical-align: middle;
      background: url("../../assets/images/project/s-file.png") no-repeat;
    }
    .none-data-box{
      float: left;
      width:1024px;
    }
  }
</style>
