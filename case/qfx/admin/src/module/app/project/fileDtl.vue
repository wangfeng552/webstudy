<template>
  <div class="file-dtl">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'project' }">项目管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name:'projectCon',params:{id:pro_id,state_id:stage_id} }">上海张江国家自主创新示范区专项发展资金</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'fileLib',params:{id:pro_id}}">文件夹</el-breadcrumb-item>
      <el-breadcrumb-item>专利文件</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="file-list">
      <p class="tit">专利文件</p>
      <p class="grey-border"></p>
      <ul>
        <li v-for="v in attachments">
          <i class="icon-file icon-doc" v-if="isContain(v.name, 'doc')"></i>
          <i class="icon-file icon-jpg" v-if="isContain(v.name, 'jpg')"></i>
          <i class="icon-file icon-txt" v-if="isContain(v.name, 'txt')"></i>
          <i class="icon-file icon-xls" v-if="isContain(v.name, 'xls')"></i>
          <i class="icon-file icon-pdf" v-if="isContain(v.name, 'pdf')"></i>
          <i class="icon-file icon-ppt" v-if="isContain(v.name, 'doc')"></i>
          <i class="icon-file icon-jpg" v-if="isContain(v.name, 'png')"></i>
          <span class="name">{{v.name}}</span>
          <span class="size">{{v.file_size|byteConversion}}</span>
          <span class="date">{{v.created_at|formatDate}}</span>
          <a class="download" :download="v.name" :href="v.url">下载</a>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import {formatDate, currency, byteConversion} from 'assets/js/filter'
  import API from 'API/config'

  export default{
    data(){
      return {
        attachments: '',
        pro_id:'',
        stage_id:''
      }
    },
    created(){
      this.getFile()
    },
    methods: {
      getFile(){
        this.$http.get(API.url + 'projects/' + this.$route.params.pro_id + '/folders/' + this.$route.params.id + '/attachments'
        ).then((res) => {
          this.attachments = res.body.attachments
          this.pro_id = this.$route.params.pro_id
          this.stage_id = this.$route.params.stage_id
        })
      },
      isContain(str, substr){
        return new RegExp(substr).test(str);
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      currency(val){
        return currency(val)
      },
      byteConversion(val){
        return byteConversion(val)
      }

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .file-dtl{
    .tit{
      font-size:14px;
      color:#5c5c5c;
      font-weight:bold;
      margin-bottom: 26px;
    }
    .file-list {
      padding:20px;
      background: #FFFFFF;
      li {
        padding:15px 20px 19px 20px;
        &:nth-child(2n){
          background: #f5f5f5;
        }
      }
      .icon-file {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      .icon-doc {
        background: url("../../../assets/images/serviceadd/doc.png") no-repeat 0/cover;
      }
      .icon-jpg {
        background: url("../../../assets/images/serviceadd/jpg.png") no-repeat 0/cover;
      }
      .icon-txt {
        background: url("../../../assets/images/serviceadd/text.png") no-repeat 0/cover;
      }
      .icon-ppt {
        background: url("../../../assets/images/serviceadd/ppt.png") no-repeat 0/cover;
      }
      .icon-pdf {
        background: url("../../../assets/images/serviceadd/pdf.png") no-repeat 0/cover;
      }
      .icon-xls {
        background: url("../../../assets/images/serviceadd/xls.png") no-repeat 0/cover;
      }

      span {
        display: inline-block;
        font-size: 14px;
        color: #5c5c5c;
        vertical-align: middle;
      }
      .name {
        width: 350px;
      }
      .size, .date {
        width: 200px;
      }
      .file-preview, .download {
        float: right;
        color: #3c8ced;
        cursor: pointer;
        margin-right:5px;

      }
      .delete{
        float: right;
        color: #e65c5c;
        cursor: pointer;
        margin-right:5px;
      }
    }
    .download{
      font-size:14px;
    }
  }
</style>
