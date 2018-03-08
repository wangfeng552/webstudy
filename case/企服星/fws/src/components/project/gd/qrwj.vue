<template>
  <div class="bgfff">
    <p>确认文件</p>
    <p>创建</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-qrwj"></i>
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
          <p class="clearfix">
            <span class="tit">文件夹</span>
            <el-radio class="radio" v-model="radio" label="1">选取文件库的文件</el-radio>
            <el-radio class="radio" v-model="radio" label="2">上传新文件</el-radio>
          </p>
          <p class="grey-border"></p>
          <div class="chooose-file" v-show="radio=='1'">
            <p class="tit">请选择文件库中需要企业确认的文件</p>
            <span class="orange-btn">
              <el-button>选择文件</el-button>
            </span>
          </div>
          <div class="chooose-file" v-show="radio=='2'">
            <p class="tit">{{fileSupportFormatGol}}</p>
            <span class="orange-btn">
              <el-button>上传文件</el-button>
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
    <p>对方处理中</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">专利文件</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请对我司整理好的专利文件进行确认</span>
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
    <p>企业已确认</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">专利文件</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已经确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请对我司整理好的专利文件进行确认</span>
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
        <p class="grey-border"></p>
        <p class="deny">
          <i class="icon-pass"></i>
          <span>已确认</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        textarea: '',
        radio: '1'
      }
    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
