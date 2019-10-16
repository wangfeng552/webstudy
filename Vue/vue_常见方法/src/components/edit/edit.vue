<template>
  <div>
    <div id="app">
      <froala :tag="'textarea'" :config="config" v-model="model"></froala>
    </div>
    <div>{{model}}</div>
  </div>
</template>

<script>
  import VueFroala from 'vue-froala-wysiwyg';
  export default{
    data () {
      return {
        config: {
          imageUploadURL:'/upload_image',  // 上传到服务器的地址
          imageUploadMethod: 'POST',
          events: {
            'froalaEditor.initialized': function (e, editor) {
            },
            'froalaEditor.image.beforeUpload':function (e,editor,img) { // 在将图像上传到服务器之前触发
              console.log(img)
            }
          }
        },
        model: 'Edit Your Content Here!'
      }
    }
  }
</script>

<style>

</style>
