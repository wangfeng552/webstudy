<template>
  <div>
    <div class="mk" v-if="userInfo">{{userInfo.name}}</div>
    <input type="text" v-if="userInfo" v-model="userInfo.name">
  </div>

</template>

<script>
  export default{
    props:{
      userInfo:{
        type:Object
      }
    },
    computed:{
      quhao(){
        return this.userInfo.name.split('-')[0]
      }
    },
    methods:{
    }
  }
</script>

<style>

</style>
