<template>
  <div class="mainpart">
    <div class="uc-index">
      <div class="content">
        <div class="breadcrumb">
          <ul>
            <li>
              <router-link :to="{name:'userCenterDefault'}">用户中心</router-link>
            </li>
            <li v-if="twoBread[routerName]!=''">&gt; {{twoBread[routerName]}}</li>
          </ul>
        </div>

        <!-- <router-view :user-info="userInfo"></router-view> -->
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  export default{

  }
</script>

<style lang="scss" rel="stylesheet/scss" scope>
  .uc-index {
    .breadcrumb {
      border-bottom: 1px solid #ccc;
    }
  }

</style>
