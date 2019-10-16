<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='one'">
      <div class="title bgefe">
        <i class="tit-fswj02"></i>
        <span class="describe fc5c5">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="not-upload"><i class="icon-notup"></i> <span >服务商正在准备文件</span></p>
      </div>
    </div>
    <div class="gd-box" v-if="type=='two'">
      <div class="title bg55b">
        <i class="tit-fswj01"></i>
        <span class="describe fcfff">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="tips" v-if="ticket.content" >
          <p v-for="v in contentValue">{{v}}</p>
        </div>
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
      contentValue(){
        if(this.ticket.content.length>0){
          var str = this.ticket.content.split('\n')
          return str;
        }else {
          return "";
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
