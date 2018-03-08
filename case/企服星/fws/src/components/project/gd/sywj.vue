<template>
  <div class="bgfff">
    <p>索要文件</p>
    <p>创建</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">索要文件</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit input-tit">文件夹</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
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
        <i class="tit-sywj"></i>
        <span class="describe">专利文件</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请上传专利文件</span>
        <p class="grey-border"></p>
        <p class="not-upload">
          <i class="icon-notup"></i>
          <span>对方暂未上传文件</span>
        </p>
      </div>
    </div>
    <p>审核文件</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">专利文件</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-wait"></i>
          <span>等待处理</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请上传专利文件</span>
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
        <div class="examine-box">
          <p class="check-result">
            <span class="is-required tit">审核结果</span>
            <el-radio class="radio" v-model="radio" label="1">通过</el-radio>
            <el-radio class="radio" v-model="radio" label="2">拒绝</el-radio>
          </p>
          <p class="note clearfix">
            <span class="tit">备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </p>
        </div>
        <p class="grey-border"></p>
        <div class="btn-box">
          <el-button type="primary">发送给企业</el-button>
        </div>

      </div>
    </div>
    <p>审核通过</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">专利文件</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已经确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请上传专利文件</span>
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
          <span>通过</span>
        </p>
        <p class="detail">
          <i class="icon-remarks"></i>
          <span>文件已通过我司审核，将对您提供的文件进行整理，请耐心等待</span>
        </p>

      </div>
    </div>
    <p>审核拒绝</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">专利文件</span>
        <div class="status bge65">
          <i class="icon-status icon-refuse"></i>
          <span>文件不通过</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请上传专利文件</span>
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
          <i class="icon-deny"></i>
          <span>拒绝｜材料有误</span>
        </p>
        <p class="detail">
          <i class="icon-remarks"></i>
          <span>高新技术企业认定合同书.txt 文件存在部分区域不清晰，请修改后将所有的文件重新上传</span>
        </p>
        <p class="grey-border"></p>
        <div class="btn-box">
          <el-button type="primary">重新发起</el-button>
        </div>
      </div>
    </div>
    <p>重新发送工单</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">专利文件</span>
        <div class="status bge65">
          <i class="icon-status icon-refuse"></i>
          <span>文件不通过</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请上传专利文件</span>
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
          <i class="icon-deny"></i>
          <span>拒绝｜材料有误</span>
        </p>
        <p class="detail">
          <i class="icon-remarks"></i>
          <span>高新技术企业认定合同书.txt 文件存在部分区域不清晰，请修改后将所有的文件重新上传</span>
        </p>
      </div>
    </div>
    <div class="gd-box">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">专利文件</span>
        <div class="status bgf1b">
          <i class="icon-status icon-wait"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">请上传专利文件</span>
        <p class="grey-border"></p>
        <p class="not-upload">
          <i class="icon-notup"></i>
          <span>对方暂未上传文件</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        textarea: '',
        radio:''
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
