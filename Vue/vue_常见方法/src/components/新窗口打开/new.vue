<template>
  <div>
    <router-link :to="{path:'/'}" target="_blank">新窗口打开</router-link>
  </div>
</template>
<script>

export default {
methods:{
  tioa(){
      const { href } = this.$router.resolve({
          name: 'jdgoodslist',
          query: {
            sku: v.sku
          }
        })
        window.open(href, '_blank')
  }
}
}
</script>
