<template>
  <div class="typeline" v-loading.body="loadingMarkUpload">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <p class="leftshouru">({{index+1}})&nbsp;{{message.title}}</p>
    <p class="beizhu">{{message.describe}}</p>


    <div v-if="hasAnswer" class="upload-module-g">
      <div v-if="!showForm">
        <div v-for="(item,i) in  listFileUpload" class="file_item answer">
          <i :class="item.name | filterIconClass"></i>
          <a class="file_name" :title="item.name">{{item.name}}</a>
          <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
          </span>
        </div>
      </div>
      <div v-if="showForm" class="upload-box">
        <div v-for="(item,i) in listFileUpload" class="file_item">
          <i :class="item.name | filterIconClass"></i>
          <a class="file_name" :title="item.name">{{item.name}}</a>
          <span class="del" @click="removeInlistFileContract(item,i)">
          <i class="icon-del-g"></i>
          </span>
        </div>
        <div class="first">
          <span>单个文件大小不能超过20MB，支持jpg.png、txt、doc、docx、xls、xlsx、ppt、pptx、pdf</span>
        </div>
        <div style="margin: 0 auto;width: 700px">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="changeFileContract"
            :show-file-list="false"
            :auto-upload="false"
            :file-list="fileList">
            <el-button slot="trigger">选取文件</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <div v-if="hasTicket" class="upload-module-g">
      <div class="compact_stage" v-if="type=='two'">
        <div v-for="(item,i) in listFileUpload" class="file_item">
          <i :class="item.name | filterIconClass"></i>
          <a class="file_name" :title="item.name">{{item.name}}</a>
          <span class="del" @click="removeInlistFileContract(item,i)">
          <i class="icon-del-g"></i>
          </span>
        </div>
        <div class="first">
          <span>单个文件大小不能超过20MB，支持jpg、png、txt、doc、docx、xls、xlsx、ppt、pptx、pdf</span>
        </div>
        <div style="margin: 0 auto;width: 700px">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="changeFileContract"
            :show-file-list="false"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger">选取文件</el-button>
          </el-upload>
        </div>
      </div>
      <!--不是编辑的时候的显示的文件-->
      <div v-for="(item,i) in  listFileUpload" class="file_item beizhu" v-if="type=='three'">
        <i :class="item.name | filterIconClass"></i>
        <a class="file_name" :title="item.name">{{item.name}}</a>
        <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
      </div>
    </div>
    <div @blur="showError"></div>
    <transition name="fade">
      <div class="errormessage" v-show="show.error">请选择文件</div>
    </transition>
  </div>
</template>
<script>
  import API from 'API/config'
  import {filterIconClass} from 'assets/js/filter'
  export default{
    name: 'textarea',
    props: ['message', 'index', 'fix', 'hasAnswer', 'type','hasTicket'],
    watch: {
      example0(curVal, oldVal){
        console.log(curVal, oldVal);
      }
    },
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
        loadingMarkUpload: false,
        fileList: [],
        list_data: this.message.answer.attachments,
      }
    },
    created(){
    },
    watch: {
      message(curVal, oldVal){
        this.list_data = this.message.answer.attachments;
      }
    },

    computed: {
      listFileUpload(){
        var list = [];
        this.list_data.forEach(function (item, index) {
          list.push(item);
        })
        return list;
      },
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check6'));
        if (this.check == true) {
          this.yuandian = true
        } else {
          this.yuandian = false
        }
      },
      showForm(){
        if (this.fix) { //点击修改
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      //判断非空
      isEmpty(item){
        if (item == undefined || item == null) {
          return true;
        } else {
          return false;
        }
      },
      // 提示框 总汇
      showMessage(type, str){
        if (type == null || type == undefined || type.length < 1) {
          this.$message(str);
        } else {
          if (type == "success") {
            this.$message({
              message: str,
              type: 'success'
            });
          } else if (type == "warning") {
            this.$message({
              message: str,
              type: 'warning'
            });
          } else if (type == "error") {
            this.$message.error(str);
          } else {
            this.$message(str);
          }
        }
      },
      showError(){
        if (this.message.rules == 'required') {
          if (this.message.answer.attachments.length == 0) {
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
        console.log(this.message.answer.attachments)
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
        console.log(this.message)
        if (this.isEmpty(item.id) || item.id < 0) { //直接删除
          this.message.answer.attachments.splice(index, 1);
          if (this.message.rules[0] == 'required') {
            if (this.message.answer.attachments.length == 0) {
              this.show.error = true
              this.message.error = true
            } else {
              this.show.error = false
              this.message.error = false

            }
          }
        } else { //需要做网络请求去删除
//          this.$emit('changeFormDeleteAttchments',item);
          // 做网络请求，然后自己操作
          var file_id = item.id;
          if (this.isEmpty(file_id) || file_id < 0) {
            this.showMessage("warning", "需要删除的附件不存在");
            return;
          }
          this.$http.delete(API.url + 'customer/form_answers_attachments/' + file_id,
          ).then((res) => {
            this.message.answer.attachments.splice(index, 1);
            if (this.message.rules[0] == 'required') {
              if (this.message.answer.attachments.length == 0) {
                this.show.error = true
                this.message.error = true
              } else {
                this.show.error = false
                this.message.error = false

              }
            }
            //做对应的删除工作
          }, (error) => {
            this.showMessage("warning", "请求失败");
          });
        }
      },
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
