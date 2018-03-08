<template>
  <div class="side-bar">
    <ul>
      <li v-for="v in showSideBar" v-if="v.isShow"><router-link :to="{name:v.name}" active-class="active">{{v.text}}</router-link></li>
      <li v-if="isDistType"><router-link :to="{name:'userCenter'}" active-class="active">账号信息</router-link></li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import API from 'API/api'
  export default {
    created(){
      // 权限控制菜单栏显示
      this.$http.get(API.url+'users/menus').then((res)=>{
        var resBody = res.body;
        this.menus=resBody.menus;
        this.showSideBar.filter((v)=>{
          if(this.menus.indexOf(v.contrast)!=-1){
          v.isShow=true
          }
        })
      })
    },
    computed:{
      ...mapGetters(['dist_type']),
      isDistType(){
        if (this.$store.state.admin.admin && this.dist_type=='Supplier') {
          return true
        } else {
          return false
        }
      }
    },
    data(){
      return {
        menus:[],
        showSideBar:[
          {name:'assignment',text:'线上项目指派',isShow:false,contrast:'assign'},
          {name:'toDoList',text:'待办事项',isShow:false,contrast:'process'},
          {name:'projectList',text:'项目管理',isShow:false,contrast:'project'},
          {name:'payment',text:'支付管理',isShow:false,contrast:'trade'},
          {name:'clientList',text:'客户管理',isShow:false,contrast:'customer'},
          {name:'messageList',text:'消息中心',isShow:false,contrast:'message'},
          {name:'organization',text:'组织架构',isShow:false,contrast:'organization'},
          {name:'form',text:'表单管理',isShow:false,contrast:'form'},
        ]
      }
    }
  }
</script>
<style type="scss" rel="stylesheet/scss" scoped>

</style>
