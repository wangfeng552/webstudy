<template>
  <div>
      <!-- lazy 鼠标失焦触发 -->
      <input type="text" v-model.lazy="name">

      <!-- number -->
      {{typeof count}}
      <input type="text" v-model.number="count">

      <!-- trim 去除首位空格 -->

  </div>
</template>

<script>
export default {
    data(){
        return {
            name:'',
            count:null
        }
    }
}
</script>

<style>

</style>