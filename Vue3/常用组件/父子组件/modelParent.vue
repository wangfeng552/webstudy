<template>
  <div>
    <!-- 父组件 -->
    <Child v-model:name="name" v-model:age="age"></Child>
  </div>
</template>

<script setup>
// 子组件使用update更新值, 不需要再通过触发父组件的方法修改
import { reactive } from "vue"

const state = reactive({
  name: "张三",
  age: 20,
})
</script>

<style lang="scss" scoped></style>
