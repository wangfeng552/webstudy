<template>
  <chart :options="bar"/>
</template>

<script>
  export default {
    name: "UBar",
    props: {
      bar: {
        type: Object,
        require: true,
      }
    },
    data(){
      return {}
    }
  }
</script>

<style scoped>
  .echarts {
    height: 280px;
  }
</style>
