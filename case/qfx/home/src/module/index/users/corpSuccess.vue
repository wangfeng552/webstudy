<template>
  <div class="bgf5f">
    <div class="w1200">
      <div class="breadcrumb">
        <ul>
          <li>
            <router-link :to="{name:'userCenterDefault'}">用户中心</router-link>
          </li>
          <li>
            <router-link :to="{name:'corp'}">企业信息管理</router-link>
          </li>
          <li>企业认证</li>
        </ul>
      </div>
      <div class="mainpart">
        <div class="register">
          <div class="register_success">
            <div class="icosuccess"></div>
            <h3 class="title04">申请完成</h3>
            <p class="djs">企服星会在1~2个工作日内完成审核</p>
            <router-link class="btn-msdl" :to="{name:'corp'}">返回企业信息管理&gt;&gt;</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{}
</script>

<style>

</style>
