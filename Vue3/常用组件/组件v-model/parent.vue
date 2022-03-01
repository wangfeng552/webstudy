<template>
  <child v-model:name="state.name" v-model:age="state.age" />
</template>

<script setup>
import { reactive } from "vue"
// 引入子组件
import child from "./child.vue"

const state = reactive({
  name: "Jerry",
  age: 20,
})
</script>
