<template>
  <div class="bgfff">
    <!--发送文件-->
    <div class="gd-box" v-if="type=='one'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bgf1b">
          <i class="icon-status icon-wait"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">
        <div class="position-re">
          <span class="tips" v-if="ticket.content">{{ticket.content}}</span>
          <p class="grey-border" v-if="ticket.content"></p>
          <p class="not-upload"><i class="icon-notup"></i> <span >对方暂未上传文件</span></p>
          <div class="offline-mask" v-if="ifOffline">
          </div>
          <div class="offline-text" v-if="ifOffline">
            本项目为线下项目，请线下询问企业索要文件
          </div>
        </div>

      </div>
    </div>
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bgf1b">
          <i class="icon-status icon-wait"></i>
          <span>服务商确认中</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" v-if="ticket.content">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content"></p>
        <div class="input-item">
          <div class="chooose-file clearfix">
            <!--展示选择的文件 start =====-->
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in listFileUpload">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" v-if="ticket.content">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content"></p>
        <div class="chooose-file clearfix">
          <!--展示选择的文件 start =====-->
          <div  class="file-list">
            <ul>
              <li v-for="(item,i) in listFileUpload">
                <i class="icon-file" :class="item.name | filterIconClass"></i>
                <a :title="item.name" class="name">{{item.name}}</a>
                <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
              </li>
            </ul>
            <p class="grey-border"></p>
            <p class="deny"><i class="icon-pass"></i> <span>通过</span></p>
            <p class="detail" v-if="ticket.note"><i class="icon-remarks"></i> <span>{{ticket.note}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="gd-box" v-if="type=='four'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bge65">
          <i class="icon-status icon-having"></i>
          <span>文件不通过</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" v-if="ticket.content">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content"></p>
          <div class="chooose-file clearfix">
            <!--展示选择的文件 start =====-->
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in listFileUpload">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
                </li>
              </ul>
              <p class="grey-border"></p>
              <p class="deny"><i class="icon-deny"></i> <span>拒绝｜</span><span>{{ticket.reject_type}}</span></p>
              <p class="detail" v-if="ticket.note"><i class="icon-remarks"></i> <span>{{ticket.note}}</span></p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import API from 'API/config'
  import {filterIconClass} from 'assets/js/filter'

  export default {
    props: ['type', 'ticket', 'index'],
    data() {
      return {
        fullscreenLoading:false
      }
    },
    //计算属性 changeEventInRequestFile
    computed: {
      listFileUpload(){
        var list = [];
        this.ticket.attachments.forEach(function (item,index) {
          list.push(item);
        })
        return  list;
      },
      ifOffline(){
        if (this.$store.state.project.projectSource=='offline') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      isEmpty(item){
        if (item == undefined || item == null) {
          return true;
        } else {
          return false;
        }
      },
      //添加文件
      changeFile(file, fileLis) {
        if(!this.verifyUpLoadTypeGol(file)) {
          this.$message({
            message: '请上传支持的文件类型，并且小于20M',
            type: 'warning'
          });
          return
        }
        file.isOriginal = false;
        this.ticket.attachments.push(file);
      },
      //删除文件
      removeFile(item,index){
        this.ticket.attachments.splice(index,1);
      },
      sendFile(){
        if(this.ticket.attachments==''){
          this.$message({
            message: '请选择文件发送',
            type: 'warning'
          });
        }else{
          var fd = new FormData();
          this.fullscreenLoading = true
          this.ticket.attachments.forEach((obj)=>{
            if(obj.name != undefined && obj.name != null && obj.name.length > 0){
              fd.append("attachments[][name]", obj.name);
              fd.append("attachments[][file]", obj.raw);
            }
          })
          this.$http.put(API.url + 'customer/stages/' + this.$route.params.stage_id+'/tickets/'+this.ticket.id+'/demand',fd).then((res)=>{
            this.$emit('reloadImf')
          },(error)=>{
            this.$message({
              message: '文件发送失败',
              type: 'warning'
            });
          })
        }
      }
    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .content {
    position: relative;
    .mask {
      background-color: black;
      width: 100%;
      height: calc(100% + 10px);
      /*height:100%;*/
      /*height: 250px; //此处需要在做调整 TODO*/
      position: absolute;
      z-index: 100;
      opacity: 0.5;
      left: -1px;
      top: -1px;
      span {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #ffffff;
        display: inline-block;
        width: 100%;
        text-align: center;
        /*line-height: 250px;*/
        height: 100%;
        padding-top: 7%;
      }
    }
  }
</style>
