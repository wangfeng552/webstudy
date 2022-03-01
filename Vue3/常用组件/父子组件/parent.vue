<template>
  <div>
    <div @click="log">{{ msg }}</div>
    <div>-----------------------</div>
    <Child ref="child" :msg="msg" @change-name="changeName"></Child>
    <div>-----------------------</div>
    <div>{{ twiceTheCounter }}</div>
    <button @click="getChildMethod">调用子组件方法</button>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, nextTick } from "vue"
import Child from "./child.vue"
let msg = ref("hello!")

const child = ref(null)

onMounted(() => {
  // 访问子组件的属性
  console.log(child.value.childName)
})

nextTick(() => {
  // 获取子组件name
  console.log(child.value.name)
  // 执行子组件方法
  child.value.changeName()
})

watch(msg, () => {
  console.log(msg.value)
})

const log = () => {
  msg.value = "1234"
}

// 获取子组件方法
const getChildMethod = () => {
  child.value.getName()
  console.log(child.value.childName)
}

const changeName = (v) => {
  msg.value = v
}
</script>
