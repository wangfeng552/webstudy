<template >
  <div :class="{nk:isShow}">123</div>
</template>

<script>
export default {
  name:"child",
    data(){
      return{
          isShow:true
      }
    },
  methods:{
      showClick(e){
          console.log(e);
          return this.isShow=this.isShow===false?true:false
      }
  }
}
</script>
<style>
  .nk{color: red;}
</style>