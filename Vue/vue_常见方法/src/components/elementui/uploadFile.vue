<template>
  <div class="mk">
    <el-upload
      multiple
      :data="file_data"
      class="upload-demo"
      action="http://up-z2.qiniu.com/"
      :on-remove="removeFile"
      :on-success="successFile"
      :before-upload="beforeFileUpload"
      :http-request="httpRequest"
      :file-list="fileList3">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <div>
      <ul>
        <li v-for="v in fileList">{{v.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        file_data: {},
        fileList:[],
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }]
      };
    },
    methods: {
      //上传之前
      beforeFileUpload(file){
        var xmlhttp = new XMLHttpRequest()
        var serverUrl = 'http://192.168.1.167:49002/api/v1/qiniu/token'
        xmlhttp.open( "POST", serverUrl, false );
        xmlhttp.setRequestHeader('Accept', 'application/json');
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify({
          attachment: {
            name: file.name,
            file_size: file.size,
            content_type: file.type
          }
        }));
        var res = JSON.parse(xmlhttp.responseText)
        console.log(res)
        this.file_data = {
          token: res.token,
          key :res.key
        }
        return Promise.resolve(true)
      },
      httpRequest(request){
        let form_data = new FormData()
        form_data.append('token', this.file_data.token)
        form_data.append('key', this.file_data.key)
        form_data.append('file', request.file)
        this.$http.post(this.uploadAuth.host, form_data, {
          progress: event => {
            event.percent = event.loaded / event.total * 100
            request.onProgress(event)
          }
        }).then(
          response => {
            this.$message({
              type: 'success',
              message: `${request.file.name}  上传成功！`
            })
            request.onSuccess()
          },
          response => {
            request.onError()
          })
      },
      //成功
      successFile(response, file, fileList){
        console.log('123123123')
      },
      //删除
      removeFile(){
        console.log('del')
      }
    }
  }
</script>
<style>

</style>
