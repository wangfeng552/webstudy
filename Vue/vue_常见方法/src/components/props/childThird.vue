<template>
  <div class="third">
    <button @click="getParentMethod()">点击</button>
  </div>
</template>
<script>
export default {
  props:{
    getName:{
      type:Function,
      default:null
    }
  },
  methods:{
    getParentMethod(){
      this.getName()
    }
  }
  
}
</script>
