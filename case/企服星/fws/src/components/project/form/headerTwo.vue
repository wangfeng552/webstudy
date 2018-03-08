<template>
  <div class="header">
    <span class="titleleft">糖果表单</span>
    <div class="backDiv">
		<i class="iconfont icon-u-arrow3-left"></i>
    <span class="back" @click="linkTo">返回</span>
	</div>
  </div>
</template>
<script>
    export default{
        name: 'headerTwo',
        methods:{
          linkTo(){
            this.$router.push({path: '/formindex'})
            location.reload()
          }
        }
    }
</script>
