<template>
  <div class="pagewrapper">
    <top-bar></top-bar>
    <white-header :servicename="servicename"></white-header>
    <router-view :index-data="indexData"></router-view>
    <grey-footer></grey-footer>
  </div>
</template>

<script>
  import API from 'API/config'
  import topBar from 'components/topBar.vue'
  import whiteHeader from 'components/whiteHeader.vue'
  import greyFooter from 'components/greyFooter.vue'
  import indexLayout from './indexLayout.vue'
  export default {
    data(){
      return {
        servicename: [],
        indexData: {},
      }
    },
    components: {topBar, whiteHeader, greyFooter, indexLayout},
    created(){
      this.$http.get(API.url + 'customer/home/index').then(
        (res) => {
          var resBody = res.body;
          this.indexData = resBody;
          this.servicename = resBody.categories;
        })
    }
  }
</script>
