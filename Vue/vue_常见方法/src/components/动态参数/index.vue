<template>
  <div>
      <h2 :[name]="title"></h2>
      <button @[event]="show"></button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            name:'title',
            title:'今日标题内容',
            event:'click'
        }
    },
    methods:{
        show(){
            console.log(1111);
        }
    }
}
</script>

<style>

</style>