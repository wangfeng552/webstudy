<template>
 <div class="ceshi">
   <ul>
     <li v-for="(v,i) in mk" :class="v | filterClass(isTruy)">的首付款</li>
   </ul>
 </div>
</template>

<script>
export default {
  data(){
    return {
      mk:[{name:11},{name:12},{name:11}],
      isTruy:false
    }
  },
  methods:{},
  filters:{
    filterClass(v,a){
      if(v.name==11&&!a){
        return 'red'
      }
    }
  }
}
</script>
<style lang="scss">
</style>
