<template>
  <div class="layout" @click="toggleWFdiv($event)">
    <div class="closediv" id="toggleDiv" v-if="isShowDiv">要切换的div</div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      isShowDiv:false
    }
  },
  methods:{
    toggleWFdiv(event){
      let sp = document.getElementById("toggleDiv");
      if(sp){
        if(!sp.contains(event.target)){ // 这句是说如果我们点击到了id为myPanel以外的区域
          this.isShowDiv = false
        }
      }
    }
  }
}
</script>
