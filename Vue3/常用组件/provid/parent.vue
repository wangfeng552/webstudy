<template>
  <div class="main">
    <Lisi></Lisi>
    <div>{{ name }}</div>
  </div>
</template>
<script setup>
import { provide, reactive, toRefs } from "vue"
import Lisi from "./lisi"

const state = reactive({
  name: "张三",
})

setTimeout(() => {
  state.name = "11111"
}, 1500)

provide("provideState", {
  state,
})
const { name } = toRefs(state)
</script>
