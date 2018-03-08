<template>
  <div class="side-bar">
    <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark" :unique-opened="true">
      <el-menu-item index="1" v-if="isTreasurer">
        <router-link :to="{name:'project'}" active-class="active">项目管理</router-link>
      </el-menu-item>

      <el-submenu index="2" v-if="isOperator">
        <template slot="title">盈收管理</template>
        <el-menu-item index="2-1">
          <router-link :to="{name:'transaction'}" active-class="active">交易记录</router-link>
        </el-menu-item>
      </el-submenu>

        <el-menu-item index="3" v-if="isTreasurer">
          <router-link :to="{name:'coManagement'}" active-class="active">企业管理</router-link>
        </el-menu-item>

      <el-submenu index="4" v-if="isTreasurer">
        <template slot="title">平台账号管理</template>
        <el-menu-item index="4-1">
          <router-link :to="{name:'certification'}" active-class="active">企业认证审核</router-link>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="5" v-if="isTreasurer">
        <template slot="title">服务商管理</template>
        <el-menu-item index="5-1">
          <router-link :to="{path:'/system/servicePublish/1'}" active-class="active">服务发布</router-link>
        </el-menu-item>
        <el-menu-item index="5-2">
          <div active-class="active" @click="leftClick">服务表单</div>
        </el-menu-item>
        <el-menu-item index="5-3">
          <router-link :to="{path:'/system/interProcess/1'}" active-class="active">内部流程</router-link>
        </el-menu-item>
        <el-menu-item index="5-4">
          <router-link :to="{path:'/system/serviceImf/1'}" active-class="active">服务商信息</router-link>
        </el-menu-item>
        <el-menu-item index="5-5">
          <router-link :to="{path:'/system/suggestion/1'}" active-class="active">建议反馈</router-link>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="6" v-if="isTreasurer">
        <router-link :to="{name:'articleList'}" active-class="active">文章管理</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default{
	data(){
    return {
    }
  },
  computed:{
    ...mapGetters(['user_type']),
    isOperator(){
      if (this.$store.state.admin.admin && this.user_type=='operator') {
        return false
      }else{
      	return true
      }
    },
    isTreasurer(){
      if (this.$store.state.admin.admin && this.user_type=='treasurer') {
        return false
      }else{
      	return true
      }
    }

  },
  methods:{
    leftClick(id){
        this.$store.dispatch('get_fws_id',{'aaa':1})
        this.$router.push({name: 'serviceRight',params:{id:1}})
      },
  }
}
</script>
<style type="scss" rel="stylesheet/scss" scoped>

</style>
