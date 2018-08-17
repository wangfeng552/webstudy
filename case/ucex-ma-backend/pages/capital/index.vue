<template>
    <div>配资管理</div>
</template>

<script>
    export default {
        name: "capital",
      data(){
        return {
          name:'健一网,网上药店,药房网,药品网,医药网123',
          des:'视图章节的内容阐述了如何在 Nuxt.js 应用中为指定的路由配置数据和视图，包括页面、布局和HTML头部等内容。'
        }
      },
  /*    head(){
          return {
            meta: [
              { charset: 'utf-8' },
              { name: 'description', content: this.des },
              { name: 'keywords', content: this.name }
            ],
            title:'的萨芬'
          }
      },*/
      head() {
        return this.$seo(this.name, this.des,[{keywords:'sdkfhasdf'}])
      }

    }
</script>
<style scoped>

</style>
