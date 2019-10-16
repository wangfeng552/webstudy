<template>
  <form action="">
    <input type="text" v-model="tel">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="true"
      :on-change="beforeAvatarUpload"
      :multiple="true"
      :auto-upload="false">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i  class="el-icon-plus avatar-uploader-icon" v-else></i>
    </el-upload>

    <button @click.prevent="submit()">提交</button>
  </form>
</template>

<script>
  import dataURItoBlob from './dataUritoBlob'
  export default {
    data() {
      return {
        imageUrl: '',
        tel:'',
        filename1:''
      };
    },
    computed: {
      image: function() {
        if (this.imageUrl === "http://oneword.ufile.ucloud.com.cn/info.jpg") {
          return null
        } else {
          return dataURItoBlob(this.imageUrl)
        }
      }
    },
    methods: {
      beforeAvatarUpload(file,fileList,i) {
        console.log(i)
        this.filename1 = file.raw.name
        if (file && /^image\//i.test(file.raw.type)) {  //type = image 图片进行压缩
          console.log(22)
          var reader = new FileReader()
          reader.onloadend = () => {
            var img = new Image()
            img.src = reader.result
            img.onload = () => {
              var w = Math.min(400, img.width)
              var h = img.height * (w / img.width)
              var canvas = document.createElement('canvas')
              var ctx = canvas.getContext('2d')
              canvas.width = w
              canvas.height = h
              ctx.drawImage(img, 0, 0, w, h)
              var dataURL = canvas.toDataURL('image/png')
              this.imageUrl = dataURL
            }
          }
          reader.readAsDataURL(file.raw)
        }
      },
      submit(){
        var blob = dataURItoBlob(this.imageUrl);
        var fd = new FormData();
        /* var certifications = [];
         certifications.push({name: this.filename1, file: blob, type: 'business'});
         fd.append("certifications", certifications)*/
        fd.append('file',blob)
        this.$http.post('http://192.168.1.117:49008/api/v1/admin/corps',fd).then().catch()
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

