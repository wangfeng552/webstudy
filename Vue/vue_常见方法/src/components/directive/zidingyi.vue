<template>
  <div>
    <span v-permission="['1']"></span>
  </div>
</template>

<script>
import permission from './index'
  export default{
    directives:{
      permission
    }
  }
</script>

<style>

</style>
