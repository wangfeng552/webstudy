<template>
  <div class="layout">
    <div>{{ name }}</div>
    <div>{{ address }}</div>
    <div>{{ sex }}</div>
    <button @click="changeValue">改变值</button>
  </div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue"

// ref声明响应式数据，用于声明基本数据类型
const name = ref("Jerry")
// 修改
name.value = "Tom"

// reactive声明响应式数据，用于声明引用数据类型
const state = reactive({
  address: "Jerry",
  sex: "男",
})
// 修改
state.address = "Tom"

const books = reactive([ref("Vue3")])
console.log(books[0].value)

const map = reactive(new Map([["name", ref(10)]]))
console.log(map.get("name").value)

// 声明method方法
const changeValue = () => {
  name.value = "改变了"
  state.address = "上海"
}

// 使用toRefs解构
const { address, sex } = toRefs(state)
// template可直接使用{{address}}、{{sex}}
</script>
