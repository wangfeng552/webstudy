<template>
  <div>
    <h2>{{isName}}456</h2>
    <h2>{{name}}123</h2>

  </div>
</template>

<script>
  export default {
    created(){
      console.log(this)
    },
    data(){
      return {
        name:'123',
        isName:this.name
      }
    },
  }
</script>
<style lang="scss">
</style>
