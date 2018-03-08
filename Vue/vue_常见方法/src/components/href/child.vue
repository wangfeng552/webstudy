<template>
  <div class="mk">
    <h2>123123</h2>
    <input type="text" ref="wf">
</div>
</template>

<script>
  export default{
    data(){
      return {
      }
    },
    methods:{
      getHeight1(){
        var productHeight = this.$refs.wf.offsetTop;
        document.body.scrollTop = productHeight //谷歌
        document.documentElement.scrollTop = productHeight // 火狐
      }

    }
  }
</script>

<style>

</style>
