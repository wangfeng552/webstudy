<template>
  <div class="life">生命周期{{ name }}</div>
</template>
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
} from "vue"
const name = ref("李四")
onBeforeMount(() => {
  console.log("onBeforeMount:" + name.value)
})
onMounted(() => {
  console.log("onMounted:" + name.value)
})
onBeforeUpdate(() => {
  console.log("onBeforeUpdate:" + name.value)
})
onUpdated(() => {
  console.log("onUpdated:" + name.value)
})
onBeforeUnmount(() => {
  console.log("onBeforeUnmount:" + name.value)
})
onUnmounted(() => {
  console.log("onUnmounted:" + name.value)
})
</script>
