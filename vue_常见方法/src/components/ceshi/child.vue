<template>
  <div class="mk">
    <h2>123123</h2>
    <input type="text" v-model="text1" @blur="checkText">
</div>
</template>

<script>
  export default{
    data(){
      return {
        text1:''
      }
    },
    methods:{
      checkText(){
          if(this.text1==''){
            console.log(123)
          }
      }
    }
  }
</script>

<style>

</style>
