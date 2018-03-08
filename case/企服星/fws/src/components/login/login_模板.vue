<template>
  <div class="login">
    <top-header></top-header>
    <div class="w1200 mi-height">
      <div class="w1046">
        <h2 class="title01">服务商登录</h2>
        <div class="wf_main">

        </div>
      </div>
      <button @click="login">login</button>
    </div>
    <black-footer></black-footer>
  </div>
</template>
<script>
  import topHeader from '../common/topHeader.vue'
  import blackFooter from '../common/blackFooter.vue'
	export default{
    components: {topHeader,blackFooter},
		methods:{
			login(){
				this.$router.push({path:'/facilitator/assignment'})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
