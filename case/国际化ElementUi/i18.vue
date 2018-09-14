<i18n>
  {
  "zh-cn":{
  "edit":"123"
  }
  }
  <i18n>
<template>
  <div>
    <div v-t="edit">{{$t('edit')}}</div>
    <el-tab-pane :label="$t('edit')" name="first"></el-tab-pane>
  </div>
</template>

<script>
  export default {
    name: "i18",
    watch: {
      '$route': {
        immediate: true,
        handler({path}) {
          if (path != this.routePath.Info) {
            return
          }
          this.getAuthenticationState()
        }
      }
    },
  }
</script>
  
<style>
  .mk {
    background: #fff url("~@/assets/images/notice.png") 50px 12px no-repeat;
  }
</style>