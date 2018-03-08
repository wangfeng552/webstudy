<template>
  <div class="bgfff">
    <p>发送文件</p>
    <p>创建</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">文件确认</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="chooose-file">
            <p class="tit">{{fileSupportFormatGol}}</p>
            <span class="orange-btn">
              <el-button>选择文件</el-button>
            </span>
          </div>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
              <el-button>取消</el-button>
            </span>
            <el-button type="primary">发送给企业</el-button>
          </div>

        </div>
      </div>
    </div>
    <p>创建成功</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">专利文件</span>
        <span class="return">撤回当前事项</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已发送</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请根据提供的模板整理好专利文件</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li>
              <i class="icon-file icon-doc"></i>
              <span class="name">高新技术企业认定合同书.doc</span>
              <span class="size">2.01MB</span>
              <span class="date">2017-03-06</span>
              <span class="download">下载</span>
              <span class="file-preview">预览</span>
            </li>
            <li>
              <i class="icon-file icon-xls"></i>
              <span class="name">高新技术企业认定合同书.xls</span>
              <span class="size">2.01MB</span>
              <span class="date">2017-03-06</span>
              <span class="download">下载</span>
              <span class="file-preview">预览</span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        textarea:'',
        radio:''
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
