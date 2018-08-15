<template>
  <chart :options="pie" @mouseover="$emit('mouseover',$event)" />
</template>

<script>
  export default {
    name: "UPie",
    props:{
      pie:{
        type:Object,
        require:true,
      }
    },
    data(){
      return {}
    }
  }
</script>

<style scoped>
  .echarts {
    height: 325px;
    width: 325px;
  }
</style>
