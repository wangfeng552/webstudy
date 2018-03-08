<template>
  <div class="header bgfff">
    <div class="content">
      <router-link class="fl" :to="{name:'index'}">
        <img src="../assets/images/re-logo.png" alt="Qfx logo">
      </router-link>
      <hr class="fengexian">
      <img src="../assets/images/slogan.png" height="46" width="164" style="vertical-align: top;margin-left: 10px;">
      <ul class="fr fs16 link-black">
        <li>
          <router-link :to="{name:'index'}" exact>首页</router-link>
        </li>
        <li v-for="v in servicename" v-if="v.name=='专项资金申报'||v.name=='税收减免'" @click="tabClick(v.id)">
          <router-link :to="{name: 'category', params: { id: v.id }}" >{{v.name}}</router-link>
        </li>
        <li>
          <router-link :to="{name:'consultList'}">资讯中心</router-link>
        </li>
        <li><router-link :to="{name:'newHelp'}">帮助中心</router-link></li>
        <li><router-link :to="{name:'about'}">关于企服星</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'whiteHeader',
    props:{
      servicename:{
        type: Array
      }
    },
    data(){
      return{
        id:''
      }
    },
    methods:{
      tabClick(id){
        this.id = id
        this.$store.dispatch('tabID_zr',this.id)
        // console.log(this.id)
      }
    }
  }
</script>
<style lang="scss">
  .fengexian{
      width: 1px;
      height: 23px;
      display: inline-block;
      margin: 13px 0 0 12px;
      border: 0;
      border-left: 2px solid #3c8ced;
  }
</style>
