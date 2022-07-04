<template>
  <div>
    <a-button @click="getChildList">获取子组件的list</a-button>
    <a-divider orientation="left">子组件</a-divider>
    <Child ref="child" name="lisi" :data="data" @on-click="getList"></Child>
  </div>
</template>

<script setup lang="ts">
import Child from './child.vue'
const data = reactive<number[]>([1, 2, 3, 5, 6])

// 接收子组件传递过来的值
const getList = (list: number[], name: string) => {
  console.log(list, '父组件接收子组件')
  console.log(name, '父组件接收子组件')
}

// 从父组件获取子组件实例通过ref
const child = ref(null)
const getChildList = () => {
  // 获取子组件的list
  console.log(child.value.list)
}
</script>

<style></style>
