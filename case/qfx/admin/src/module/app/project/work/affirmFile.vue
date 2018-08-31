<template>
  <div class="bgfff">
    <div class="gd-box"  v-if="type=='one'">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="position-re">
          <p  class="not-upload"><i class="icon-notup"></i> <span>等待操作者发送资料</span></p>
          <div class="offline-mask" v-if="ifOffline">
          </div>
          <div class="offline-text" v-if="ifOffline">
            本项目为线下项目，企业无法在平台上进行文件确认操作，请通过其他方式与企业进行确认。请务必在所有文件确认完之后，再开启下一步。
          </div>
        </div>
      </div>
    </div>
    <!--<p>确认处理中</p>-->
    <div class="gd-box"  v-if="type=='two'">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" v-if="ticket.content">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content"></p>
        <div class="file-list">
          <ul>
            <li v-for="item in ticket.attachments">
              <i :class="item.name | filterIconClass" class="icon-default-g"></i>
              <span class="name">{{item.name}}</span>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
              <!--<span class="size">{{file_size}}</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="download">下载</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--<p>企业已确认</p>-->
    <div class="gd-box"  v-if="type=='three'">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>企业已确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" v-if="ticket.content">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content"></p>
        <div class="file-list">
          <ul>
            <li v-for="item in ticket.attachments">
              <i :class="item.name | filterIconClass" class="icon-default-g"></i>
              <span class="name">{{item.name}}</span>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="download">下载</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>

          </ul>
        </div>
        <p class="grey-border"></p>
        <p class="deny">
          <i class="icon-pass"></i>
          <span class="fs14 fc5c5">已确认</span>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
  import API from 'API/config'
  import {filterIconClass} from 'assets/js/filter'
  export default{
    props: ['type','ticket','index'],
    data(){
      return {
        textarea: '',
        radio: '1',
        dialogVisible:false,
        listFile:[],
        listFileCurrent:"",
        ListFileDetail:[],
        listFileDetailCurrent:"",
        listFileLocal:[]
      }
    },
    computed:{
      ifOffline(){
        if (this.$store.state.project.projectSource=='offline') {
          return true
        } else {
          return false
        }
      }
    },
    methods:{
    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .content{
    position: relative;
    .mask{
      background-color: black;
      width: 100%;
      height:calc(100% + 10px);
      position:absolute;
      z-index: 100;
      opacity: 0.5;
      left: -1px;
      top: -1px;
      span{
        font-family:MicrosoftYaHei;
        font-size:14px;
        color:#ffffff;
        display: inline-block;
        width: 100%;
        height: 100%;
        padding-top: 15%;
        text-align: center;
        /*line-height: 350px;*/
      }
    }
  }

  .flie_item {
    margin-bottom:0px !important;
    height: auto!important;
    margin-left: 20px;
    margin-right: 30px;
    > span:nth-child(2){
      font-family:MicrosoftYaHei;
      font-size:14px;
      color:#1b1b1b;
      line-height:14px;
      text-align:left;
    }
    > span:nth-child(3){
      margin-left: 100px;
      font-family:MicrosoftYaHei;
      font-size:14px;
      color:#5c5c5c;
      text-align:left;
    }
    > span:last-child{
      float: right;
    }
  }


</style>
<style lang="scss" rel="stylesheet/scss">
  .content_dialog{
    .el-select{
      margin-bottom:20px;
    }
  }
</style>
