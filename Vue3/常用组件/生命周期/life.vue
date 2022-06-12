<template>
  <div>
    <div ref="refShowName">{{ name }}</div>
    <div id="showID">{{ name }}</div>
    <div class="life">生命周期{{ name }}</div>
  </div>
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
const refShowName = ref()
onBeforeMount(() => {
  console.log("onBeforeMount:" + name.value)
})
onMounted(() => {
  console.log("onMounted:" + name.value)
  console.log(refShowName.value)
})
onBeforeUpdate(() => {
  console.log("onBeforeUpdate:" + name.value)
})
onUpdated(() => {
  console.log("onUpdated:" + name.value)
  console.log(document.getElementById("showID").textContent)
})
onBeforeUnmount(() => {
  console.log("onBeforeUnmount:" + name.value)
})
onUnmounted(() => {
  console.log("onUnmounted:" + name.value)
})
</script>
