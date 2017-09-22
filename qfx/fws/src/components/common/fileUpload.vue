<template>
  <div :class="{'del-listfile':isShowListfile}">
    <el-upload
      multiple
      :data="file_data"
      class="upload-demo2"
      :action="qiniuURL"
      :on-remove="removeFile"
      :http-request="httpRequest"
      :on-success="successFile"
      :on-progress="progressFile"
      :on-error="errorFile"
      :before-upload="beforeFileUpload">
      <el-button class="text-c" size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import API from 'API/api'
  export default{
    props:{
      listAttachmentsId: { // 取得文件的ID
        type: Array,
        default: function () {
          return []
        }
      },
      isFileEmpty:{ //正在上传中
        type:Object,
        default:function () {
          return {isShow:false}
        }
      }
    },
    data(){
      return {
        count:0,
        qiniuURL:API.qiniu,
        isShowListfile:false,
        file_data: {},
      }
    },
    computed:{
      ...mapGetters(['token']),
    },
    methods:{
      //上传之前同步执行
      beforeFileUpload(file){
        if(!this.beforeUpLoadFileValidateGol(file)) {
          this.$message.error(this.fileUploadFailWaringwordsGol);
          return false
        }else{
          this.isFileEmpty.isShow = true
          var xmlhttp = new XMLHttpRequest()
          var serverUrl = API.url+ 'qiniu/token'
          xmlhttp.open( "POST", serverUrl, false );
          xmlhttp.setRequestHeader('Accept', 'application/json');
          xmlhttp.setRequestHeader('Content-Type', 'application/json');
          xmlhttp.setRequestHeader('Access-Token', this.token);
          xmlhttp.send(JSON.stringify({
            attachment: {
              name: file.name,
              file_size: file.size,
              content_type: file.type
            }
          }));
          var res = JSON.parse(xmlhttp.responseText)
          this.file_data[file.name] ={
            token: res.token,
            key :res.key,
            id: res.attachment.id
          }
          this.count ++;
          return Promise.resolve(true)
        }
      },
      // 提交到七牛
      httpRequest(request){
          let form_data = new FormData()
          form_data.append('token', this.file_data[request.file.name]['token'])
          form_data.append('key', this.file_data[request.file.name]['key'])
          form_data.append('file', request.file)
          // 报错在这里
          this.$http.post(this.qiniuURL, form_data, {
            progress: event => {
              event.percent = event.loaded / event.total * 100
              request.onProgress(event)
            }
          }).then(
            response => { request.onSuccess() },
            response => { request.onError() }
          )
      },
      //成功
      successFile(response, file, fileList){
        this.listAttachmentsId.push(this.file_data[file.name]['id'])
        file.id = this.file_data[file.name]['id']
        this.count --
        if(this.count == 0){  // 全部传成功
          this.isFileEmpty.isShow = false; // 按钮变亮
          this.isShowListfile = false
        }
        this.$emit('successFileQFX')
      },
      //失败
      errorFile(err, file, fileList){
        this.count --
        if(this.count == 0){
          this.$message({
            type: 'error',
            message: "上传失败请重新上传！"
          })
          this.isFileEmpty.isShow = false;
        }
      },
      //删除
      removeFile(file, fileList){
        if(file!=null){
          let id = file.id;
          let index = this.listAttachmentsId.indexOf(id);
          this.count--
          if(this.count<=0){
            this.count = 0;
          }
          this.listAttachmentsId.splice(index, 1);
          this.$message({
            type: 'success',
            message: "删除成功！"
          })
        }
      },
      //上传中
      progressFile(event, file, fileList){
        this.isShowListfile = true
      }
    }
  }
</script>
<style lang="scss">
  .del-listfile .el-upload-list__item:hover .el-icon-close{display: none;}
</style>
