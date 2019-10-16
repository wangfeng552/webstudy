<template>
  <div class="bgfff">
    <!--<p>发送文件</p>-->

    <!--观察者视角 start=========================-->
    <div class="gd-box" v-if="type=='one' && !hasRoot">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'"> 本项目为线下项目，请通过其他方式将项目的资料模板发送给企业。</div>
        <div class="input-item">
          <p class="not-upload">
            <i class="icon-notup"></i>
            <span>等待操作者发送文件</span>
          </p>
        </div>
      </div>
    </div>
    <!--观察者视角 end=========================-->


    <!--<p>创建</p>-->
    <div class="gd-box" v-if="type=='zero'">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="top-title describe">
        <el-input placeholder="发送文件" v-model="ticket_ji.title" :disabled='isDisabled'></el-input>
        </span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled='isDisabled'
              v-model="ticket.content">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="chooose-file clearfix">
            <div  class="file-list">
              <ul>
                <li v-for="(item,index) in ticket_ji.attachments" v-if="ticket_ji.attachments">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(index)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket_ji.attachments.length>0"></p>
            <div class="tit clearfix">
              <div class="file-upload-send-file file-upload-work-nomal">
                <div class="file-note">{{fileSupportFormatGol}}</div>
                <!--<el-upload-->
                  <!--class="upload-demo"-->
                  <!--ref="upload"-->
                  <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--:on-change="changeFileContractJi"-->
                  <!--:show-file-list="false"-->
                  <!--:multiple="true"-->
                  <!--:auto-upload="false">-->
                  <!--<el-button type="text" v-if="hasRoot && isNotComplete && canOperation" slot="trigger" class="upload-btn">{{ticket_ji.attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                <!--</el-upload>-->
                <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
              </div>
            </div>
          </div>
          <p class="grey-border"></p>

          <div class="btn-box">
              <span class="custom-btn">
              <el-button :disabled="isFileEmpty.isShow" @click='changeEventCancelStage'>取消</el-button>
            </span>
            <el-button type="primary"
                       v-if="hasRoot && isNotComplete && canOperation"
                       @click="changeEvent"
                       :disabled="isFileEmpty.isShow">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="gd-box" v-if="type=='one' && hasRoot">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">

        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'"> 本项目为线下项目，请通过其他方式将项目的资料模板发送给企业。</div>


        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled='isDisabled'
              v-model="ticket.content">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="chooose-file clearfix">
            <div  class="file-list">
              <ul>
                <li v-for="(item,index) in ticket_ji.attachments" v-if="ticket_ji.attachments">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(index)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket_ji.attachments.length>0"></p>
            <div class="tit clearfix">
              <div class="file-upload-send-file file-upload-work-nomal">
                <div class="file-note">{{fileSupportFormatGol}}</div>
                <!--<el-upload-->
                  <!--class="upload-demo"-->
                  <!--ref="upload"-->
                  <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                  <!--:on-change="changeFileContractJi"-->
                  <!--:show-file-list="false"-->
                  <!--:multiple="true"-->
                  <!--:auto-upload="false">-->
                  <!--<el-button type="text" v-if="hasRoot && isNotComplete && canOperation" slot="trigger" class="upload-btn">{{ticket_ji.attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                <!--</el-upload>-->

                <file-upload :listAttachmentsId="listAttachmentsId"
                             v-if="hasRoot && isNotComplete && canOperation"
                             :isFileEmpty="isFileEmpty"></file-upload>

              </div>
            </div>
          </div>
          <!--展示图片 start ==================================-->
          <p class="grey-border"></p>
          <div class="btn-box">
            <el-button type="primary"
                       v-if="hasRoot && isNotComplete && canOperation"
                       @click="changeEvent"
                       :disabled="isFileEmpty.isShow">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<p>创建成功</p>-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return"  v-if="ticket.temporary && hasRoot && isNotComplete && canOperation" @click="changeStageDelete">撤回当前事项</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已发送</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket.content | filterTicketContent" v-if="ticket.content!=''">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content!=''"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {filterIconClass} from 'assets/js/filter'
  import fileUpload from 'components/common/fileUpload'
  export default{
    components:{fileUpload},
    props: ['type','ticket','index'],
    watch:{
      'ticket.attachments':{
        handler:function (val,oldVal) {
          if(!this.isEmpty( this.listAttachmentsId)) this.listAttachmentsId = [];
        },
        deep:true
      }
    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
      filterTicketContent(val){
        if(val == undefined || val == null || val.length<1) return 'bg-clear-g'
        else return '';
      }
    },
    data(){
      return{
        isFileEmpty:{isShow:false}, // 上传中禁止按钮提交
        listAttachmentsId:[],  // 上传七牛返回的ID
        textarea:'',
        radio:''
      }
    },
    //计算属性
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      ticket_ji(){
        var item = this.ticket;
        if(this.isEmpty(item.attachments)){
          item.attachments = [];
        }
        if(this.isEmpty(item.title)){
          item.title = "确认文件";
        }
        if(this.isEmpty(item.content)){
          item.content = "";
        }
        if(this.isEmpty(item.affirm_file_type)){
          item.affirm_file_type = "";
        }
        return item;
      },
      //是否可以操作 整个项目 停止 或则 关闭 返回 false
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      }
    },
    mounted(){
      if(this.ticket.attachments != undefined && this.ticket.attachments != null &&this.ticket.attachments.length>0 && this.type == 'one'){
        if(this.hasRoot && this.canOperation && this.isNotComplete && this.currentProject.source=='online'){
          this.changeEvent();
        }
      };
    },
    methods:{
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      // 提示框 总汇
      showMessage(type,str){
        if(type == null || type == undefined || type.length<1){
          this.$message(str);
        }else {
          if(type == "success"){
            this.$message({
              message: str,
              type: 'success'
            });
          }else if(type == "warning"){
            this.$message({
              message: str,
              type: 'warning'
            });
          }else if(type == "error"){
            this.$message.error(str);
          }else {
            this.$message(str);
          }
        }
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      changeEvent(){
        if(this.ticket.status == 'zero'){ //新建的
          this.ticket.listAttachmentsId = this.listAttachmentsId;
          this.$emit('changeEvent',this.type,this.index,this.ticket_ji);
        }else{ //其他的
          this.ticket.listAttachmentsId = this.listAttachmentsId;
          this.$emit('changeEvent',this.type,this.index,this.ticket);
        }
      },
      changeFileContract(file, fileLis) {
        file.isOriginal = false;
        this.ticket.attachments.push(file);
      },
      changeFileContractJi(file, fileLis){
        if(!this.verifyUpLoadTypeGol(file)) {
          this.showMessage("warning",this.fileUploadFailWaringwordsGol);
          return;
        }
        file.isOriginal = false;
        this.ticket_ji.attachments.push(file);
      },
      changeStageDelete(){
        this.$confirm('确认是否撤销?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('changeStageDelete',this.type,this.index,this.ticket);
        }).catch(() => {
        });
      },
      changeStartContractDeleteScan(item,index){
        var item1 =   this.ticket_ji.attachments[index];
        if(this.isEmpty(item1.id) || item1.id <0){ //直接删除
          this.ticket_ji.attachments.splice(index,1);
        }else { //需要做网络请求去删除
          this.$emit('changeStartContractDeleteScan',this.type,this.index,this.ticket,item);
        }
      },
      removeFileLocal(index){
        this.ticket_ji.attachments.splice(index,1);
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .content{
    position: relative;
    .mask{
      background-color: black;
      width: calc(100% + 2px);
      height:calc(100% + 10px);
      position:absolute;
      z-index: 100;
      opacity: 0.8;
      left: -1px;
      top: -1px;
      span{
        font-size:14px;
        color:#ffffff;
        display: inline-block;
        width: 100%;
        height: 100%;
        padding-top: 15%;
        text-align: center;
      }
    }
    .mask-text{
      width:100%;
      height:100%;
      padding-top:18%;
      font-size:14px;
      position:absolute;
      z-index: 100;
      color: #FFFFFF;
      text-align: center;
    }
  }
</style>
