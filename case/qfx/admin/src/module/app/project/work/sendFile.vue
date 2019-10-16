<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='one'">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="position-re">
          <p class="not-upload"><i class="icon-notup"></i> <span >等待操作者发送文件</span></p>
          <div class="offline-mask" v-if="ifOffline">
          </div>
          <div class="offline-text" v-if="ifOffline">
            本项目为线下项目，请通过其他方式将项目的资料模板发送给企业
          </div>
        </div>
      </div>
    </div>
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fswj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已发送</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" v-if="ticket.content!=''">{{ticket.content}}</span>
        <p class="grey-border" v-if="ticket.content!=''"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.attachments">
              <i :class="item.name | filterIconClass" class="icon-default-g"></i>
              <span class="name">{{item.name}}</span>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="download">下载</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {filterIconClass} from 'assets/js/filter'
  export default{
    props: ['type','ticket','index'],
    data(){
      return{
        textarea:'',
        radio:''
      }
    },
    computed:{
      ifOffline(){
        if (this.$store.state.project.projectSource=='offline') {
          return true
        } else {
          return false
        }
      }
    },
    methods:{

    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
