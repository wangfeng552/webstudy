<template>
  <div class="fromContent">
    <div class="from-main">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>服务表单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">
        <router-link  :to="{name:'formcreate',params:{id:this.$route.params.id}}">
          <el-button type="primary" @click="clear" class="fr mr20">新建表单</el-button>
          <!--<span class="new" ></span>-->
        </router-link>
      </div>
      <div class="serviceCont">
        <div class="serviceLeft scroll-beauty">
          <div class="leftTitle" >服务商</div>
          <ul class="titleList">
            <li v-for="serviceList in serviceList" @click="leftClick(serviceList.id,serviceList)">
              <router-link :to="{name:'serviceRight',params:{id:serviceList.id}}" active-class="active" :title="serviceList.name">{{serviceList.name}}</router-link>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import API from 'API/config'
  export default {
    components: { },
    data(){
      return {
        serviceList:'',
        leftid:''
      }
    },
    created(){
      this.getLeftService()
    },
    methods:{
      // 创建表单时清除localstorage的值
      clear(){
        // location.reload()
        localStorage.removeItem('items');
        localStorage.removeItem('summary');
        localStorage.removeItem('formname');
        localStorage.removeItem('typeInfo');
        localStorage.removeItem('serviceId');
        localStorage.removeItem('service_id');
        localStorage.removeItem('check');
        localStorage.removeItem('check2');
        localStorage.removeItem('check3');
        localStorage.removeItem('check4');
        localStorage.removeItem('check5');
        localStorage.removeItem('check6');
        localStorage.removeItem('check7');
      },
      //左侧服务商列表
      getLeftService(){
        this.$http.get(API.url+'providers'
        ).then((res)=>{
          this.serviceList = res.body.providers
          var that = this;
          var target = undefined;
          this.serviceList.forEach(function (item,index) {
            if(item.id == 1) target = item;
          })
          if(target != undefined)  that.$store.dispatch('get_current_paoviders',target);
        })
      },
      leftClick(id,v){
        this.$store.dispatch('get_fws_id',{'aaa':id})
        this.$store.dispatch('get_current_paoviders',v);
      }
    }
  }
</script>
<style type="text/css">
  .scroll-beauty{
  ::-webkit-scrollbar {
    width:8px;
    height:10px;
  }
  ::-webkit-scrollbar-track     {
    background: #efefef;
  }
  ::-webkit-scrollbar-thumb{
    background: #c1c1c1;
    border-radius:4px;
  }
  ::-webkit-scrollbar-corner {
    background:#82AFFF;
  }

  }
</style>
