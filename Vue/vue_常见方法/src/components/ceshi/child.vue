<template>
  <div class="file">
    <a href="" @click.prevent="getParent">dianji</a>
</div>
</template>

<script>
  export default{
    props:{
      parentsChild:{
        type:Object,
        default:function () {
          return {
            name:'11',
            name:'22'
          }
        }
      }
    },
    methods:{
      getParent(){
        this.$emit('showWf','你好')
      }
    }
  }
</script>

<style>

</style>
