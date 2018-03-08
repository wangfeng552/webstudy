<template>
  <div class="service-imf">
    <el-breadcrumb separator="">
      <el-breadcrumb-item :to="{path:'/system/serviceImf/providerImf'}">服务商信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <div class="service-menu scroll-beauty">
        <p class="tit">服务商</p>
        <ul>
          <li v-for="(v,i) in providers" @click="leftClick(v.id)">
            <router-link :to="{name:'providerImf',params: { id: v.id }}" active-class="active" :title="v.name">
              <span class="corp-name">{{v.name}}</span>
              <div class="jihuo-box">
                <el-popover trigger="click" placement="bottom">
                  <div class="jihuo">
                    <input type="text" :value="activ_url">
                    <el-button type="primary" size="small" @click.prevent="copyLink()">复制链接
                    </el-button>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <el-button type="text" v-if="v.status=='unclaimed'" @click="activation()">激活</el-button>
                  </div>
                </el-popover>
              </div>
            </router-link>

          </li>
        </ul>
        <el-button type="primary" class="mt20 ml10" @click="createProvider">新增服务商</el-button>
      </div>
      <div class="service-main">
        <router-view></router-view>
      </div>
    </div>
    <input type="text" ref="jhm" class="jhmhidden" :value="jihuoma">
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
        this.providers = res.body.providers
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
      createProvider(){
        this.$router.push({name: 'createProvider'})
      },
      //激活
      activation(id){
        this.$http.get(API.url+'providers/'+this.$route.params.id+'/active_url').then((res)=>{
          this.$nextTick(()=>{
            this.activ_url = res.body.url
          })
        })
      },
      //复制链接
      copyLink(){
        this.jihuoma = this.activ_url
        this.$nextTick(function () {
          this.$refs.jhm.select();
          document.execCommand("copy");
        })
        this.$message({
          message: '复制成功！',
          type: 'success'
        });
      },
//把服务商id放到vuex里
      leftClick(id){
        this.$store.dispatch('get_fws_id',{'aaa':id})
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
<style lang="scss" rel="stylesheet/scss">
.service-imf{
  .main-content{
    .service-menu{
      li{
        a.active .el-button--text{
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  .service-imf {
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
            /*transition: color .3s;*/
          }
          .corp-name{
            width:150px;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .be-white{
            color: #FFFFFF;
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
    .jihuo-box{
      position: absolute;
      right:0;
      top:6px;
    }
  }


</style>
