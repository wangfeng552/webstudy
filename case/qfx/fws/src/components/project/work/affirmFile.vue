<template>
  <div class="bgfff">

    <!--<p>确认文件</p>-->
    <!--观察者视角 start=========================-->
    <div class="gd-box" v-if="type=='one' && !hasRoot">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">{{ticket_ji.title}}</span>
      </div>
      <div class="content">
        <!--蒙版 start ===== -->
        <div class="mask" v-if="currentProject.source=='offline'">
          <div class="mask-text" v-if="currentProject.source=='offline'" style="padding-top: 4%"> 本项目为线下项目，企业无法在平台上进行文件确认操作，请通过其他方式与企业进行确认。
            请务必在所有文件确认完之后，再开启下一步。</div>
        </div>
        <div class="input-item">
          <p class="not-upload">
            <i class="icon-notup"></i>
            <span>等待操作者发起合同草案</span>
          </p>
        </div>
      </div>
    </div>
    <!--观察者视角 end=========================-->

    <!--<p>创建</p>-->
    <div class="gd-box" v-if="type=='zero'">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">
          <el-input class="top-title" placeholder="确认文件" v-model="ticket_ji.title" :disabled='isDisabled'></el-input>
        </span>
      </div>
      <div class="content">
        <!--蒙版 start ===== -->
        <!--<div class="mask" v-if=false>-->
        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'"> 本项目为线下项目，企业无法在平台上进行文件确认操作，请通过其他方式与企业进行确认。
          请务必在所有文件确认完之后，再开启下一步。</div>
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled='isDisabled'
              v-model="ticket_ji.content">
            </el-input>
          </p>
          <p class="clearfix">
            <span class="tit">文件夹</span>
            <el-radio class="radio" v-model="radio" label="1" :disabled='isDisabled'>选取文件库的文件</el-radio>
            <el-radio class="radio" v-model="radio" label="2" :disabled='isDisabled'>上传新文件</el-radio>
          </p>
          <p class="grey-border"></p>
          <div class="chooose-file clearfix" v-show="radio=='1'">
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in ticket_ji.attachments" v-if="ticket_ji.attachments">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileInfiles(i)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket_ji.attachments.length>0"></p>
            <div class="tit clearfix">
              <div class="fl">
                <el-button type="text" v-if="hasRoot && isNotComplete && canOperation" slot="trigger" class="upload-btn" @click="chooseFile">{{ticket_ji.attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>
              </div>
              <div class="fl">请选择文件库中需要企业确认的文件</div>
            </div>
          </div>
          <div class="chooose-file clearfix" v-show="radio=='2'">
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in listFileLocal" v-if="listFileLocal">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(i)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="listFileLocal.length>0"></p>
            <div class="tit clearfix">
              <div class="file-upload-affirm-file file-upload-work-nomal">
                <div class="file-note">{{fileSupportFormatGol}}</div>
                <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
                <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--ref="upload"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:on-change="changeFileContract"-->
                <!--:show-file-list="false"-->
                <!--:multiple="true"-->
                <!--:auto-upload="false">-->
                <!--<el-button type="text" v-if="hasRoot && isNotComplete && canOperation" slot="trigger" class="upload-btn">{{listFileLocal.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                <!--</el-upload>-->
              </div>

            </div>
          </div>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
              <el-button :disabled="disabledSend" @click='changeEventCancelStage'>取消</el-button>
            </span>
            <el-button v-if="hasRoot && isNotComplete && canOperation" type="primary" :disabled="disabledSend" @click="changeAffirmFileSendOther">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="gd-box" v-if="type=='one' && hasRoot">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">{{ticket_ji.title}}</span>
      </div>
      <div class="content">
        <!--蒙版 start ===== -->
        <!--<div class="mask" v-if=false>-->
        <div class="mask" v-if="currentProject.source=='offline'">
          <div class="mask-text" v-if="currentProject.source=='offline'"> 本项目为线下项目，企业无法在平台上进行文件确认操作，请通过其他方式与企业进行确认。
            请务必在所有文件确认完之后，再开启下一步。</div>
        </div>
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled='isDisabled'
              v-model="ticket_ji.content">
            </el-input>
          </p>
          <p class="clearfix">
            <span class="tit">文件夹</span>
            <el-radio class="radio" v-model="radio" label="1" :disabled='isDisabled'>选取文件库的文件</el-radio>
            <el-radio class="radio" v-model="radio" label="2" :disabled='isDisabled'>上传新文件</el-radio>
          </p>
          <p class="grey-border"></p>
          <div class="chooose-file clearfix" v-show="radio=='1'">
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in ticket_ji.attachments" v-if="ticket_ji.attachments">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileInfiles(i)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="ticket_ji.attachments.length>0"></p>
            <div class="tit clearfix">
              <div class="fl">
                <el-button type="text" v-if="hasRoot && isNotComplete && canOperation" slot="trigger" class="upload-btn" @click="chooseFile">{{ticket_ji.attachments.length>0 ? '继续上传' :'选取文件'}}</el-button>
              </div>
              <div class="fl">请选择文件库中需要企业确认的文件</div>
            </div>
          </div>
          <div class="chooose-file clearfix" v-show="radio=='2'">
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in listFileLocal" v-if="listFileLocal">
                  <i class="icon-file" :class="item.name | filterIconClass"></i>
                  <a :title="item.name" class="name">{{item.name}}</a>
                  <i class="icon-delete fr" v-if="!isDisabled" @click="removeFileLocal(i)"></i>
                </li>
              </ul>
            </div>
            <p class="grey-border" v-if="listFileLocal.length>0"></p>
            <div class="tit clearfix">
              <div class="file-upload-affirm-file file-upload-work-nomal">
                <div class="file-note">{{fileSupportFormatGol}}</div>

                <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--ref="upload"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:on-change="changeFileContract"-->
                <!--:show-file-list="false"-->
                <!--:multiple="true"-->
                <!--:auto-upload="false">-->
                <!--<el-button type="text" v-if="hasRoot && isNotComplete && canOperation" slot="trigger" class="upload-btn">{{listFileLocal.length>0 ? '继续上传' :'选取文件'}}</el-button>-->
                <!--</el-upload>-->

                <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
              </div>
            </div>
          </div>
          <p class="grey-border"></p>
          <div class="btn-box">
            <!--<span class="custom-btn">-->
            <!--<el-button @click='cancelZero'>取消</el-button>-->
            <!--</span>-->
            <el-button v-if="hasRoot && isNotComplete && canOperation" type="primary" :disabled="disabledSend" @click="changeAffirmFileSendOther">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<p>对方处理中</p>-->
    <div class="gd-box"  v-if="type=='two'">
      <div class="title">
        <i class="tit-qrwj"></i>
        <span class="describe">{{ticket_ji.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation" @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket_ji.content | filterTicketContent">{{ticket_ji.content}}</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="item in ticket_ji.attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="size">{{file_size}}</span>-->
              <!--<span class="date">2017-03-06</span>-->
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
        <span class="describe">{{ticket_ji.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已经确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket_ji.content | filterTicketContent">{{ticket_ji.content}}</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="item in ticket_ji.attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
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

    <!--弹窗-->
    <el-dialog
      title="选择文件"
      :visible.sync="dialogVisible"
      size="tiny"
    >
      <div class="content_dialog">
        <div>
          <el-select v-model="listFileCurrent" placeholder="请选择"  @change="changeListFile">
            <el-option
              v-for="item in listFile"
              :key="item.id"
              :label="item.name"
              @change="changeListFile"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="listFileDetailCurrent" placeholder="请选择">
            <el-option
              v-for="item in ListFileDetail"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="comfirmFile">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  import {filterIconClass} from 'assets/js/filter'
  import fileUpload from 'components/common/fileUpload'
  export default{
    components:{fileUpload},
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
        listFileLocal:[],
        isFileEmpty:{isShow:false}, // 上传中禁止按钮提交
        listAttachmentsId:[],  // 上传七牛返回的ID
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
    //计算属性
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      disabledSend(){
        if(this.radio == 2 && this.isFileEmpty.isShow) return true;
        return false;
      },
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
      // 项目结束，或则终止
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
    // 选择文件夹 的内容
    mounted(){
      this.project_id = this.$route.params.id;
      this.state_id = this.$route.params.state_id;
      this.getFileList(this.project_id);
      // 预设工单 的自动发送

      if(this.type == 'one' && !this.isEmpty(this.ticket_ji.attachments) && this.ticket_ji.attachments.length>0){
        if(this.hasRoot && this.canOperation && this.isNotComplete && this.currentProject.source=='online'){
          this.changeAffirmFileSendOther();
        }
      }
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
      cancelZero(){
      },
      //发送给对方 改变 状态
      sendToOther(){
        this.type = "two";
      },
      chooseFile(){
        // 如果没有 内部文件，直接提示
        if(this.isEmpty(this.listFile) || this.listFile.length < 1){
          this.showMessage("warning","温馨提示: 文件库暂无文件");
          return;
        }
        this.dialogVisible = true;
        this.listFileCurrent="";
        this.listFileDetailCurrent="";
      },
      changeListFile(event){
        this.getFileDetail(event);
      },
      changeFileContract(file, fileList){
        if(!this.verifyUpLoadTypeGol(file)) {
          this.showMessage("warning",this.fileUploadFailWaringwordsGol);
          return;
        }
        this.listFileLocal.push(file);
      },
      changeListFile(val){
        if(!this.isEmpty(val) && val >0){
          this.getFileDetail(val);
        }
      },
      //点击确认文件
      comfirmFile(){
        var currentItem = null;
        var that = this;
        this.ListFileDetail.forEach(function (item,index) {
          if(item.id ==  that.listFileDetailCurrent){
            currentItem = item;
          }
        });
        // 去重复
        if(!this.isEmpty(currentItem)){
          var mark = false;
          this.ticket_ji.attachments.forEach(function (item,index) {
            if(currentItem.id == item.id){
              mark = true;
            }
          })
          if(mark){
            this.dialogVisible = false;
            this.showMessage("warning","该文件已经选择，请重新选择，谢谢");
            return;
          }
        }
        if(!this.isEmpty(currentItem)){
          this.ticket_ji.attachments.push(currentItem);
        };
        this.dialogVisible = false;
      },
      removeFileInfiles(index){
        //此处需要 动态 TODO ====
        this.ticket_ji.attachments.splice(index,1);
      },
      removeFileLocal(index){
        this.listFileLocal.splice(index,1);
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      //发送给对方
      changeAffirmFileSendOther(){
        if(this.radio == 1){
          this.ticket_ji.affirm_file_type = 'folder';
          if(this.ticket_ji.attachments.length<1){
            this.showMessage("warning","请选取文件");
            return;
          }
        }
        else if(this.radio == 2){
          this.ticket_ji.affirm_file_type = 'upload';
//          if(this.listFileLocal.length<1){
//            this.showMessage("warning","请选取文件");
//            return;
//          }
          if(this.listAttachmentsId.length<1){
            this.showMessage("warning","请选取文件");
            return;
          }
        }else {
          return;
        }
//        this.ticket_ji.listFileLocal = this.listFileLocal;
        this.ticket_ji.listAttachmentsId = this.listAttachmentsId;
        this.$emit('changeAffirmFileSendOther',this.type,this.index,this.ticket_ji);
      },
      // GET /v1/supplier/projects/{project_id}/folders   // 文件库
      getFileList(project_id){
        var that = this;
        this.$http.get(API.serviceurl + 'supplier/'+"projects/"+project_id+"/folders"
        ).then((res) => {


          // 只取内部文件
          if(!that.isEmpty( res.body.inside_folders)){
            res.body.inside_folders.forEach(function (item,index) {
              that.listFile.push(item);
            });
          }

//          if(!that.isEmpty( res.body.inside_folders)) {
//            res.body.project_folders.forEach(function (item,index) {
//              that.listFile.push(item);
//            });
//          }

        },(error)=>{
          this.showMessage("warning","请求失败");
        })
      },
      getFileDetail(file_id){
        var that = this;
        this.$http.get(API.serviceurl + 'supplier/'+"projects/"+ this.project_id+"/folders/"+file_id+"/attachments"
        ).then((res) => {
          this.ListFileDetail = res.body.attachments;
        },(error)=>{
          this.showMessage("warning","请求失败");
        })
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
      }
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
        /*font-family:MicrosoftYaHei;*/
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
    .mask-text{
      width:100%;
      height:100%;
      padding-top:15%;
      font-size:14px;
      position:absolute;
      z-index: 100;
      color: #FFFFFF;
      text-align: center;
    }
  }

  .flie_item {
    margin-bottom:0px !important;
    height: auto!important;
    margin-left: 20px;
    margin-right: 30px;
    > span:nth-child(2){
      /*font-family:MicrosoftYaHei;*/
      font-size:14px;
      color:#1b1b1b;
      line-height:14px;
      text-align:left;
    }
    > span:nth-child(3){
      margin-left: 100px;
      /*font-family:MicrosoftYaHei;*/
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
