<template>
<div class="bgf5f">
  <div class="w1200">
    <div class="breadcrumb">
      <ul>
        <li><router-link :to="{name:'userCenterDefault'}">用户中心</router-link></li>
        <li>企业信息管理</li>
      </ul>
    </div>
    <div class="corpmain">
      <div class="corp-info">
        <ul>
          <li><strong>企业名称 : </strong>{{myproject.name}}</li>
          <li><strong>注册地址 : </strong>{{myproject.address}}</li>
          <li v-if="myproject.auth_status == 'verifying'"><strong>企业认证 : </strong><span class="yellow1">认证中</span></li>
          <li v-else-if="myproject.auth_status == 'failed'">
            <strong>企业认证 : </strong>
            <router-link :to="{name:'corpApply'}">[重新申请认证]</router-link>
            <p class="rz_error"><span class="red1">认证失败</span> | {{myproject.reject_reason}}</p>
          </li>
          <li v-else-if="myproject.auth_status == 'verified'"><strong>企业认证 : </strong>已认证</li>
          <li v-else><strong>企业认证 : </strong>未认证  <router-link :to="{name:'corpApply'}">[申请企业认证]</router-link></li>
        </ul>
      </div>
      <div class="tx-center">
        <router-link :to="{name:'userCenterDefault'}">
           <a href="" class="btn btn-default_blue">返回</a>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import API from 'API/config'
  export default{
    data(){
      return{
        myproject:''
      }
    },
    created(){
      this.myProjectInfo()
    },
    methods:{
      // 获取企业信息
      myProjectInfo(){
        this.$http.get(API.url+'customer/corps'
        ).then((res)=>{
          this.myproject = res.body.corp
        })
      }
    }
  }
</script>

<style lang="scss">
.corpmain{
  background-color: #fff;
  padding: 30px;
  .corp-info{
    font-size: 14px;
    border-bottom:1px solid #eaeaea;
    margin-bottom: 40px;
    li{
      color:#5c5c5c;
      padding-bottom: 20px;
      strong{
        color:#1b1b1b;
      }
      .yellow1{
        color: #fda924;
      }
      .red1{
        color: #e65c5c;
      }
      .rz_error{
        text-indent: 5em;
        line-height: 24px;
      }
    }
  }
  .tx-center{
    text-align: center;
  }
}
</style>
