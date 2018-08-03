<template>
  <div>
    <!--<Breadcrumb :style="{padding: '16px 0 16px 32px',background: '#fff','border-top':'1px solid #E9EDF1'}">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem :to="urlPath.prev">Components</BreadcrumbItem>
        <BreadcrumbItem>Layout</BreadcrumbItem>
      </Breadcrumb>
      <div class="breadtitle">用户列表</div>-->
  </div>
</template>

<script>
  export default {
    name: "UMenu",
    computed: {
      urlPath() {
        const matched = this.$route.matched
        const index = matched.map(({path}) => path).indexOf(this.$route.path)

        return {
          prev: matched[index - 1].path
        }
      }
    },
  }
</script>

<style scoped>

</style>
