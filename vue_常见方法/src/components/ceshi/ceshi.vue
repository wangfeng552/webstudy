<template>
  <div class="mk">
    <child :parents-child="parents"></child>
  </div>
</template>
<script>
  import child from './child.vue'
export default {
  data(){
    return {
      parents:{
        name:'站是固定',
        name:'sdaf'
      }
    }
  }
}
</script>
<style>

</style>
