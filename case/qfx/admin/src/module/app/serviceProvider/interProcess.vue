<template>
  <div class="inter-process">
    <el-breadcrumb separator="">
      <el-breadcrumb-item>内部流程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <div class="service-menu scroll-beauty">
        <p class="tit">服务商</p>
        <ul>
          <li v-for="(v,i) in providers" @click="leftClick(v.id,v)">
            <router-link :to="{name:'processList',params: { id: v.id }}" active-class="active" :title="v.name">{{v.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="service-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard';
  import {mapGetters} from 'vuex'
  import API from 'API/config'
  export default {
    created(){
      this.$http.get(API.url + 'providers'
      ).then((res) => {
        this.providers = res.body.providers;
        var that = this;
        var target = undefined;
        this.providers.forEach(function (item,index) {
          if(item.id == 1) target = item;
        })
        if(target != undefined)  that.$store.dispatch('get_current_paoviders',target);
      })
    },
    computed: {
      ...mapGetters(['user_id', 'name', 'token'])
    },
    data(){
      return {
        activ_url:'',//获取激活码
        jihuoma: '',//获取激活码
        providers: '',
        formInline: {
          user1: '',
          user2: '',
          user3: '',
          region1: '',
          region2: ''
        },
      }
    },
    methods: {
      //把服务商id放到vuex里
      leftClick(id,v){
        this.$store.dispatch('get_fws_id',{'aaa':id});
        this.$store.dispatch('get_current_paoviders',v);
      }
    },
    mounted() {
      let clipboard = new Clipboard('.btn');
      clipboard.on('success', e => {
        e.clearSelection();
      });
      document.addEventListener('click', this.hideOnClickDocument, false);
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .inter-process {
    .main-content {
      padding: 20px 21px 0 0;
      .tit {
        padding-left:10px;
        font-size: 16px;
        color: #1b1b1b;
      }
    }
    .add-service {
      float: right;
      margin-right: 17px;
    }
    .service-menu {
      float: left;
      width: 220px;
      ul {
        margin-top: 9px;
        padding-bottom: 20px;
        height:590px;
        overflow-y: scroll;
        li {
          position: relative;
          height:39px;
          line-height:39px;
          font-size: 14px;
          a {
            padding-left: 10px;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #1b1b1b;
            width:100%;
            height:39px;
          }
          a.active {
            color: #FFFFFF;
            background: #20a0ff;
          }
        }
      }

    }
    .service-main {
      margin-left: 220px;
    }
    .blue-tab {
      padding-left: 0;
    }
    .el-button--text:hover {
      color: #20a0ff;
    }
    .active-btn {
      float: right;
      margin-top: 3px;
      padding: 0;
    }
    .name-wrapper {
      float: left;
      margin-right: 14px;
    }
    .name-wrapper {
      position: absolute;
      right:0;
      top:-7px;
    }
    .jhmhidden {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -55;
    }
  }
</style>
