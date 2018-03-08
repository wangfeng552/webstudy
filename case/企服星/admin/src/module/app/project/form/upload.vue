<template>
  <div class="typeline" v-loading.body="loadingMarkUpload">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <p class="leftshouru">({{index+1}})&nbsp;{{message.title}}</p>
    <p class="beizhu">{{message.describe}}</p>


    <div v-if="hasAnswer" class="upload-module-g">
      <div v-if="!showForm">
        <div v-for="(item,i) in  listFileUpload" class="file_item beizhu">
          <i :class="item.name | filterIconClass" class="icon-default-g"></i>
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
      </div>
    </div>
    <div v-if="hasTicket" class="upload-module-g">
      <div v-for="(item,i) in  listFileUpload" class="file_item beizhu">
        <i :class="item.name | filterIconClass"></i>
        <a class="file_name" :title="item.name">{{item.name}}</a>
        <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
      </div>
    </div>
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
      	if(this.message.answer.attachments!=null){
          this.list_data = this.message.answer.attachments;
        }
      }
    },

    computed: {
      listFileUpload(){
        var list = [];
        if(this.list_data!=''){
          this.list_data.forEach(function (item, index) {
            list.push(item);
          })
        }
        return list;
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
