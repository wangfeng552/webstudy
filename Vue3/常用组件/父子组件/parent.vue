<template>
  <div>
    <div @click="log">{{ msg }}</div>
    <Child ref="child" :msg="msg" @change-name="changeName"></Child>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue"
import Child from "./child.vue"
let msg = ref("hello!")

const child = ref(null)

onMounted(() => {
  // 访问子组件的属性
  console.log(child.value.childName)
})

watch(msg, () => {
  console.log(msg.value)
})

const log = () => {
  msg.value = "1234"
}

const changeName = (v) => {
  msg.value = v
}
</script>
