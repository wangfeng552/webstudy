<template>
  <div class="parentthird">
    <button>父元素按钮</button>
    <child-thrid :getName='getName' :name.sync="name"></child-thrid>
  </div>
</template>
<script>
import childThrid from './childThird'
export default {
  data(){
    return {
      name:'lisi'
    }
  },
  components:{
    childThrid
  },
  methods:{
    getName(){
      console.log('父元素')
    }
  }
}
</script>
