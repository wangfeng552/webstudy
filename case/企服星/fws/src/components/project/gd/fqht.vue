<template>
  <div class="bgfff">
    <p>发起合同</p>
    <p>创建</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">发起合同</span>
      </div>
      <div class="content">
        <div class="input-item">
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
        <i class="tit-fqht"></i>
        <span class="describe">补充合同</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业确认</span>
        </div>
      </div>
      <div class="content">
        <span class="fs14 fc5c5">合同草案</span>
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
        <div class="btn-box">
          <el-button type="primary">修改合同草案</el-button>
        </div>
      </div>
    </div>
    <p>企业已确认</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">补充合同</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>企业已确认</span>
        </div>
      </div>
      <div class="content">
        <span class="fs14 fc5c5">合同草案</span>
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
        <p class="fs14 fc5c5"><span class="mr20">快递信息</span> <span>顺丰快递 </span><span>10100202393899</span><span
          class="ml10 cp fc3c8 ">修改</span></p>
        <p class="grey-border"></p>
        <p class="fs14 fc5c5"><span>合同签署盖章扫描件</span><span class="ml10 cp fc3c8">上传</span></p>
      </div>
    </div>
    <p>合同签署盖章扫描件</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">补充合同</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>企业已确认</span>
        </div>
      </div>
      <div class="content">
        <span class="fs14 fc5c5">合同草案</span>
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
        <p class="fs14 fc5c5"><span class="mr20">快递信息</span> <span>顺丰快递</span><span>10100202393899</span><span
          class="ml10 cp fc3c8 " @click="express=!express">修改</span>
          <span class="express" v-show="express">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          <span class="cp fs14 fca9a ml10" @click="express=false">取消</span>
          <span class="cp fs14 fc3c8" @click="save">保存</span>
        </span>

        </p>

        <p class="grey-border"></p>
        <p class="fs14 fc5c5"><span>合同签署盖章扫描件</span><span class="ml10 cp fc3c8">上传</span></p>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li>
              <i class="icon-file icon-doc"></i>
              <span class="name">高新技术企业认定合同书.doc</span>
              <span class="size">2.01MB</span>
              <span class="date">2017-03-06</span>
              <span class="delete">删除</span>
              <span class="download">下载</span>
              <span class="file-preview">预览</span>
            </li>
            <li>
              <i class="icon-file icon-xls"></i>
              <span class="name">高新技术企业认定合同书.xls</span>
              <span class="size">2.01MB</span>
              <span class="date">2017-03-06</span>
              <span class="delete">删除</span>
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
      return {
        input: '',
        textarea: '',
        radio: '',
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
        express: false//快递信息修改
      }
    },
    methods: {
      save(){
      	//发送请求
        this.express = false
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
