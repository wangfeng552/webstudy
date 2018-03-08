<template>
  <div class="payindex">
    <top-bar></top-bar>
    <div class="simple-header">
      <div class="w1200">
        <div class="fllogin">
          <router-link class="logo" :to="{name:'index'}">
            <img src="../../../assets/images/qfx-logo.png" width="200" height="70" alt="企服星">
          </router-link>
          <span class="ms-tit">收银台</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <grey-footer></grey-footer>
  </div>
</template>

<script>
  import API from 'API/config'
  import topBar from 'components/topBar.vue'
  import greyFooter from 'components/greyFooter.vue'
  export default{
    components: {topBar,greyFooter},
  }
</script>

<style>

</style>
