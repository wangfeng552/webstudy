<template>
  <div>
    <button @click="addName">啥地方的撒</button>
    <button @click="addDot">啥地方的撒</button>
    <div>{{family}}</div>
  </div>
</template>

<script>
  export default{
    props:{
      parentList:{
        type:Array,
        default:function () {
          return []
        }
      },
      family:{
        type:Object,
      }
    },
    methods:{
      addName(){
        this.parentList.push({name:'123'})
      },
      addDot(){
        this.$emit('isDot',25,46,28) // 监听父组件方法 可以传多个值
        // 方法二
        this.$parent.isDot(2,3,4)
      }
    }
  }
</script>

<style>

</style>
