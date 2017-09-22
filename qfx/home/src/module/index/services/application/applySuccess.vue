<template>
  <div class="mainpart">
    <div class="min-width">
      <div class="breadcrumb">
        <ul>
          <li>
            <router-link :to="{name:'category',params: { id: this.$route.params.category_id }}">
              {{products.service_category}}
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'proIndex',params: { id: this.$route.params.id }}">
              {{products.service}}
            </router-link>
          </li>
          <li>服务申请</li>
        </ul>
      </div>
      <div class="sa-success">
        <h3 class="fs16 fc1b1 fw-bold">{{products.service}}-服务申请表</h3>
        <div class="success-box">
          <h1 class="fs24 fc1b1 fw-bold">信息填写成功</h1>
          <p class="fs14 fc5c5">请耐心等待服务机构与您联系，</p>
          <p class="fs14 fc5c5">您也可以在
            <router-link :to="{name:'userCenterDefault'}" class="fw-bold my-apply">“用户中心”</router-link>
            中查看进度详情。
          </p>
          <router-link :to="{name:'index'}" class="return fs14">&lt&lt返回首页</router-link>
          <i class="icon icon-success"></i>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import API from 'API/config'
  export default{
    data(){
      return {
        products: '',
      }
    },
    created(){
      this.getImf()
    },
    methods: {
      getImf(){
        this.$http.get(API.url + 'services/' + this.$route.params.id + '/products/online').then((res) => {
          this.products = res.body.products[this.$route.params.products_id]
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
