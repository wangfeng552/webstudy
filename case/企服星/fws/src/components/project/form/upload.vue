<template>
  <div class="typeline" v-loading.body="loadingMarkUpload">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>

    <div class="upload-module-g" v-if="showForm">
      <div  class="file-list">
        <ul>
          <li v-for="(item,i) in listFileUpload">
            <i class="icon-file" :class="item.name | filterIconClass"></i>
            <a :title="item.name" class="name">{{item.name}}</a>
            <i class="icon-del-g fr" @click="removeInlistFileContract(item,i)"></i>
          </li>
        </ul>
      </div>
      <div class="first">
        <span>{{fileSupportFormatGol}}</span>
      </div>
      <div class="file-upload-parcel">
        <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
      </div>
    </div>
    <div  class="file-list" v-else>
      <ul>
        <li v-for="(item,i) in listFileUpload">
          <i class="icon-file" :class="item.name | filterIconClass"></i>
          <a :title="item.name" class="name">{{item.name}}</a>
          <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
        </li>
      </ul>
    </div>
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import API from 'API/api'
  import {filterIconClass} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  import fileUpload from 'components/common/fileUpload'
  export default{
    components:{fileUpload},
    name: 'textarea',
    props:['message','index','fix','hasAnswer'],
    watch:{
      message(curVal,oldVal){
        this.list_data = this.message.answer.attachments;
      },
      listAttachmentsId(curVal,oldVal){
        this.message.answer.listAttachmentsId = this.listAttachmentsId;
      },
      'message.answer.attachments':{
        handler:function (val,oldVal) {
          if(!this.isEmpty( this.listAttachmentsId)) this.listAttachmentsId = [];
        },
        deep:true
      },
      'isFileEmpty.isShow':{
        handler:function (val,oldVal) {
          this.message.answer.isFileEmpty = {};
          this.message.answer.isFileEmpty.isShow =val;
        },
        deep:true
      },

    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
    },
    data(){
      return{
        isFileEmpty:{isShow:false},
        listAttachmentsId:[],
        show:{ error:false },
        user:{inputValue:''},
        yuandian:false,
        check:'',
        list_data:this.message.answer.attachments,
        listFileLocal:[],
        loadingMarkUpload:false
      }
    },
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      // 禁用状态  默认是禁用
      isDisabled(){
        var mark = true;
        if(this.hasAnswer){
          if(this.hasRoot && this.fix && this.isNotComplete && this.canOperation) mark = false;
        }else {// 没有答案
          if(this.hasRoot && this.isNotComplete && this.canOperation) mark = false;
        }
        return mark;
      },
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
      },
      list_ji(){
        return this.message.answer.attachments;
      },
      listFileUpload(){
        var list = [];
        this.list_data.forEach(function (item,index) {
          list.push(item);
        })
        this.listFileLocal.forEach(function (item,index) {
          list.push(item);
        })
        return  list;
      },
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check6'));
        if (this.check == true) {
          this.yuandian = true
        }else{
          this.yuandian = false
        }
      },
      showForm(){
        if(this.hasAnswer){ // 有答案
          if(this.fix){ //点击修改
            return true;
          }else {
            return false;
          }
        }else { // 没有答案
          return true;
        }
      }
    },
    methods:{
      reSet(){
      },
      showLoading(){
        this.loadingMarkUpload = true;
      },
      hiddenLoading(){
        this.loadingMarkUpload = false;
      },
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
      input_blur(){
        if (this.message.rules == 'required') {
          if (this.user.inputValue !== '') {
            this.show.error = false
          }else{
            this.show.error = true
          }
        }
      },
      changeFileContract(file, fileLis) {
        if(!this.verifyUpLoadTypeGol(file)) {
          this.showMessage("warning",this.fileUploadFailWaringwordsGol);
          return;
        }
        file.isOriginal = false;
        this.message.answer.attachments.push(file);
      },
      removeInlistFileContract(item,index){

        this.$confirm('确认删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.isEmpty(item.id) || item.id <0){ //直接删除
            this.message.answer.attachments.splice(index,1);
          }else { //需要做网络请求去删除
//          this.$emit('changeFormDeleteAttchments',item);
            // 做网络请求，然后自己操作
            var file_id = item.id;
            if(this.isEmpty(file_id) || file_id <0 ){
              this.showMessage("warning","需要删除的附件不存在");
              return;
            }
            this.$http.delete(API.serviceurl + 'supplier/form_answers_attachments/'+file_id,
            ).then((res) => {
              this.hiddenLoading();
              var file =   this.clearParams(this.message.answer.attachments[index]);
              this.message.answer.attachments.splice(index,1);
              this.$emit('changeFormDeleteAttchmentsSuccessful',file);
              //做对应的删除工作
            },(error)=>{
              this.showMessage("warning","请求失败");
              this.hiddenLoading();
            });
          }
        }).catch(() => {
        });
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .file-upload-parcel{
    .el-upload{
      display: block;
    }
  }
</style>


<style lang="scss" rel="stylesheet/scss" scoped="">

  .file-list{
    padding-left: 5px;
    padding-right: 5px;
  }
  .flie_item {
    position: relative;
  }
  .text-ingrog{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    color: #1b1b1b;
  }
  .icon-file {
    /*top: 2px;*/
    /*left: 15px;*/
    /*position: absolute;*/
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .icon-doc {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    background: url("../../../assets/images/gd_ico/doc.png") no-repeat 0/cover;
  }
  .icon-jpg {
    background: url("../../../assets/images/gd_ico/jpg.png") no-repeat 0/cover;
  }
  .icon-txt {
    background: url("../../../assets/images/gd_ico/txt.png") no-repeat 0/cover;
  }
  .icon-ppt {
    background: url("../../../assets/images/gd_ico/ppt.png") no-repeat 0/cover;
  }
  .icon-pdf {
    background: url("../../../assets/images/gd_ico/pdf.png") no-repeat 0/cover;
  }
  .icon-xls {
    background: url("../../../assets/images/gd_ico/xls.png") no-repeat 0/cover;
  }
  .typeline{
    margin-top: 20px;
    position: relative;
    .block{
      margin-top: 20px;
    }
    .yuandian{
      position: absolute;
      left: -11px;
    }
    .compact_stage {
      .first {
        /*font-family:MicrosoftYaHei;*/
        font-size:14px;
        color:#a9a9a9;
        letter-spacing:0;
        line-height:14px;
        text-align:left;
        margin: 0 auto;
        height: 40px;
        span{
          display: inline-block;
          margin-top: 13px;
          width: 100%;
          text-align: center;
        }
      }

      /*上传按钮*/
      .button_upload {
        /*background-color: red;*/
        width: 90px;
        margin: 0 auto;
        height: 80px;
        padding-top: 20px;
      }
    }

  }

</style>
