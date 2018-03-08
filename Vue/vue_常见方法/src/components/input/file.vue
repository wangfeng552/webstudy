<template>
  <div>
    <a href="http://blog.csdn.net/sinat_17775997/article/details/58585142">图片上传参考地址</a>
    <input type="file" ref="inputfile" @change="showFile">
    <div>
      <ul>
        <li v-for="v in fileList">{{v.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        fileList:[],
        file:{}
      }
    },
    methods:{
      showFile(){
        console.log(123123)
        let inputDom = this.$refs.inputfile;
        // 通过DOM取文件数据
        this.file = inputDom.files[0];
        let size = (this.file.size / 1024 / 1024).toFixed(2);// 保留2位小数 mb
        this.fileList.push(this.file)
        console.log(this.fileList)
      }
    }
  }
</script>
<style lang="scss">
</style>
