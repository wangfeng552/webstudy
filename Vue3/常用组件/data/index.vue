<template>
  <div class="layout">
    <div>{{ name }}</div>
  </div>
</template>
<script setup>
import { reactive, toRefs } from "vue"
// Reactive 仅适用于对象和数组
const state = reactive({
  name: "",
  address: "",
  isShow: true,
  list: [],
})
state.name = "李四"
const { name, address, isShow, list } = toRefs(state)
</script>
