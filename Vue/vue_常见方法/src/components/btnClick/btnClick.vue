<template>
  <div>
    <button @click="add">点击1秒内只触发一次</button>
    <div>{{count}}</div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tID:null,
        count:1
      }
    },
    methods:{
      add(){
        clearTimeout(this.tID);
        this.tID=setTimeout(()=>{
          this.count += 1
        },1000)
      }
    }
  }
</script>

<style>

</style>
