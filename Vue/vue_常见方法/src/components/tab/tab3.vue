<template>
<div class="tab2-layout">
  <tab-child :a1="a1" @chuandi="jiehsou"></tab-child>
  <!--<comp :foo="bar" @update:foo="val => bar = val"></comp>-->
  <div>{{a1}}</div>
</div>
</template>

<script>
  import tabChild from './tab3_child.vue'
  export default{
    data(){
      return {
        a1:1
      }
    },
    components:{
      tabChild
    },
    methods:{
      jiehsou(v){
        this.a1 = v //外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      }
    }
  }
</script>

<style scoped="">

</style>
