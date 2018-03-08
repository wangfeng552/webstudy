<template>
  <div>
    <!--父组件-->
    <!--<div :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></div>-->
    <div>
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import API from 'API/api'
  export default{
    props: {
      listAttachmentsId: { // 上传文件对应的ID
        type: Array,
        default: function () {
          return []
        }
      },
      isFileEmpty: { //正在上传中
        type: Object,
        default: function () {
          return {isShow: false}
        }
      }
    },
    data(){
      return {
        count: 0,
        qiniuURL: API.qiniu,
        file_data: {},
      }
    },
    computed: {
      ...mapGetters(['token']),
    },
    methods: {
      //上传之前同步执行
      beforeFileUpload(file){
        //上传之前验证格式
        if (!this.beforeUpLoadFileValidateGol(file)) {
          this.$message.error("请上传正确的文件格式，并且小于20M");
          debugger
          return false
        } else {
          this.isFileEmpty.isShow = true
          // 是一个浏览器接口，使得Javascript可以进行HTTP(S)通信
          var xmlhttp = new XMLHttpRequest();
          var serverUrl = API.url + 'qiniu/token'

          //初始化 HTTP 请求参数，例如 URL \ HTTP 方法 \ false 同步执行,但是并不发送请求。
          //语法：open(method, url, async, username, password)
          xmlhttp.open("POST", serverUrl, false);

          //setRequestHeader()向一个打开但未发送的请求设置或添加一个 HTTP 请求。
          xmlhttp.setRequestHeader('Accept', 'application/json');
          xmlhttp.setRequestHeader('Content-Type', 'application/json');
          xmlhttp.setRequestHeader('Access-Token', this.token);

          //发送一个 HTTP 请求
          //语法：send(body) body 参数指定了请求体，作为一个字符串或者 Document 对象
          xmlhttp.send(JSON.stringify({
            attachment: {
              name: file.name,
              file_size: file.size,
              content_type: file.type
            }
          }));
          var res = JSON.parse(xmlhttp.responseText)
          this.file_data[file.name] = {  // 拿file.name来做key 这样就不重名了
            token: res.token,
            key: res.key,
            id: res.attachment.id
          }
          this.count++;
          return Promise.resolve(true)
        }
      },
      // 提交到七牛
      httpRequest(request){
        let form_data = new FormData()
        form_data.append('token', this.file_data[request.file.name]['token'])  // 从file_data 的file的名字去拿数据
        form_data.append('key', this.file_data[request.file.name]['key'])
        form_data.append('file', request.file)
        this.$http.post(this.qiniuURL, form_data, {
          //回调函数来处理上传的ProgressEvent
          progress: event => {
            event.percent = event.loaded / event.total * 100 //event.total是需要传输的总字节，event.loaded是已经传输的字节
            request.onProgress(event)
          },
          //回调函数在发送请求选项之前修改它
          before(req) {
            this.file_data[request.file.name]['request'] = req;  //上传前把这个request存储下来里面有abort()方法来终止上传
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
        this.count--
        if (this.count == 0) {  // 全部传成功
          this.$message({
            type: 'success',
            message: "上传成功！"
          })
          this.isFileEmpty.isShow = false; // 按钮变亮
        }
        this.$emit('successFileQFX')
      },
      //失败
      errorFile(err, file, fileList){
        this.count--
        if (this.count == 0) {
          this.$message({
            type: 'error',
            message: "上传失败请重新上传！"
          })
          this.isFileEmpty.isShow = false;
        }
      },
      //删除
      removeFile(file, fileList){
        //终止上传
        if (file != null) {
          this.file_data[file.name]['request'].abort()  // 移除的时候终止上传
          delete this.file_data[file.name]   // 并且删除这个对象
        } else if (file.id !== undefined) {
          let id = file.id;
          let index = this.listAttachmentsId.indexOf(id);
          this.listAttachmentsId.splice(index, 1)
        }
        this.count--
        if (this.count <= 0) {
          this.count = 0;
          this.isFileEmpty.isShow = false;
        }
      },
      //上传中
      progressFile(event, file, fileList){
      }
    }
  }
</script>
