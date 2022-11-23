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
    },
    name:{
      type:String,
      default:''
    }
  },
  data(){
    return {
      userName:this.name
    }
  },
  methods:{
    getParentMethod(){
      this.getName()
    }
  },
  watch:{
    // 方法1
    userName(newVal,oldVal){
      this.$emit('update:name',newVal)
    },
    // 方法2
    userName2:{
      immediate:true,
      deep:true,
      handler(newVal,oldVal){
        this.$emit('update:name',newVal)
        console.log(newVal);
        console.log(oldVal);
      }
    }
  }

  
}
</script>
