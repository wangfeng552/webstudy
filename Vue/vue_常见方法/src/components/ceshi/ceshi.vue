<template>
  <div class="mk">
    <child @showWf="show" ref="childwf"></child>
    <button @click="parentClick">点击父</button>
  </div>
</template>
<script>
  import child from './child.vue'
  export default {
    components:{
      child
    },
    data() {
      return {
      }
    },
    methods:{
      show(a){
        console.log(a)
      },
      parentClick(){
        this.$refs.childwf.getParent()
      }
    }
  }
</script>
<style>

</style>
