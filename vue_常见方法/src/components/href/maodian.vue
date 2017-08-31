<template>
  <div class="mk">
    <child  ref="child"></child>
    <button @click="jump">跳转1</button>
    <div class="pl">sadfasfd</div>
  </div>
</template>
<script>
  import child from './child.vue'
  export default {
    components:{
      child,
    },
    methods:{
      jump(){
        this.$refs.child.getHeight1()
      }
    }
  };
</script>
<style>
.pl{
  height: 2000px;
  background-color: #f60;
}
</style>
