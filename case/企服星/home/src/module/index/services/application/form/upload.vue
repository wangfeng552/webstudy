<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu" v-html="message.describe"></p>
    <div class="compact_stage upload-module-g">
      <div v-for="(item,i) in  list_data" class="file_item" v-if="message.answer.attachments">
        <i :class="item.name | filterIconClass"></i>
        <a :title="item.name" class="file_name">{{item.name}}</a>
        <span class="del" @click="removeInlistFileContract(item,i)">
          <i class="icon-del-g"></i>
          </span>
      </div>
      <div class="first">
        <span>单个文件大小不能超过20MB，支持jpg、jpeg、png、txt、doc、docx、xls、xlsx、ppt、pptx、pdf</span>
      </div>
      <div style="margin: 0 auto">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="changeFileContract"
          :auto-upload="false"
          :show-file-list="false"
        >
          <el-button slot="trigger">选取文件</el-button>
        </el-upload>
      </div>
    </div>
    <div @blur="showError"></div>
    <transition name="fade">
    <div class="errormessage" v-show="show.error">请选择文件</div>
    </transition>
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import {filterIconClass} from 'assets/js/filter'
  export default{
    name: 'upload',
    props: ['message', 'index'],
    data(){
      return {
        show: {
          error: false
        },
        user: {
          inputValue: ''
        },
        yuandian: false,
        check: '',
        list_data:[],

      }
    },
    computed: {
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check6'));
        if (this.check == true) {
          this.yuandian = true
        } else {
          this.yuandian = false
        }
      },
    },
    methods: {
      showError(){
        if (this.message.rules == 'required') {
          if (this.message.answer.attachments.length==0) {
            this.show.error = true
            this.message.error = true

          } else {
            this.show.error = false
            this.message.error = false

          }
        }
      },
      //添加文件
      changeFileContract(file, fileLis) {
        if (!this.verifyUpLoadTypeGol(file)) {
          this.$message({
            message: '请上传支持的文件类型，并且小于20M',
            type: 'warning'
          });
          return
        }
          file.isOriginal = false;
          this.message.answer.attachments.push(file);
          this.list_data.push(file)
          if (this.message.rules[0] == 'required') {
            if (this.message.answer.attachments.length == 0) {
              this.show.error = true
              this.message.error = true
            } else {
              this.show.error = false
              this.message.error = false

            }
          }
      },
      //删除文件
      removeInlistFileContract(item, index){
        this.message.answer.attachments.splice(index, 1);
        this.list_data.splice(index,1)
        if (this.message.rules[0] == 'required') {
          if (this.message.answer.attachments.length == 0) {
            this.show.error = true
            this.message.error = true
          }else{
            this.show.error = false
            this.message.error = false

          }
        }
      }
    },
    filters: {
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
