<template>
<div class="tab2-layout">
  <tab-child :a1="a1" @onPropsChange="jiehsou"></tab-child>
  <div>{{a1}}</div>
</div>
</template>

<script>
  import tabChild from './tab2_child.vue'
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
      jiehsou(propName,newVal,oldVal){
        this.a1 = newVal //外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
        console.log(propName+'---'+oldVal)
      }
    }
  }
</script>

<style scoped="">

</style>
