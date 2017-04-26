<template>
  <div class="common">
    <h2 v-for="v in name">{{v | toInt}}</h2>
  </div>
</template>
<script>
  export default{
      data(){
          return{
             name:[445.25,25.36,555.23]
          }
      },
      //过滤
      filters:{
          toInt(value){
              return parseInt(value); //返回整数
          }
      }
  }
</script>
