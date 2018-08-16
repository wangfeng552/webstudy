<template>
    <div>
      <child></child>
      <dog></dog>
    </div>
</template>

<script>
  import child from './child'
  import dog from './dog'
    export default {
      components:{child,dog}
    }
</script>

<style scoped>

</style>
