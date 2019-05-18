<template>
  <div class="mk">
    <child :parentList="parentList" :family="family" @isDot="isDot" ref="childwf"></child>
    <div>{{parentList}}</div>
    <button @click="parentClick">点击父元素触发子组件方法</button>
  </div>
</template>

<script>
  import child from './child.vue'
 export default {
   data(){
     return {
       parentList:[],
       family:{
         zs:'45',
         sadf:'49',
         ghdf:'53',
       }
     }
   },
   components:{
     child
   },
   methods:{
     isDot(x,y,z){  //$emit 监听
       console.log(x)
       console.log(y)
       console.log(z)
     },
     parentClick(){
       this.$refs.childwf.addDot() //点击父元素触发子组件方法
     }
   }
 }
</script>
