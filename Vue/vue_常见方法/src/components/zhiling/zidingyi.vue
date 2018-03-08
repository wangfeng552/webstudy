<template>
  <div><input type="text" v-focus></div>
</template>

<script>
  export default{
    directives:{
      //注册一个局部指令focus
      focus:{
        //当绑定元素插入到DOM中
        inserted(el){
          el.focus()
        }
      }
    }
  }
</script>

<style>

</style>
