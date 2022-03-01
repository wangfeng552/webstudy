<template>
  <div class="child">
    <slot></slot>
    <slot name="title"></slot>
    <slot name="footer" :scope="state"></slot>
  </div>
</template>
<script setup>
import { reactive } from "vue"
const state = reactive({
  name: "李四",
  age: 24,
})

// const slots = useSlots()
// 匿名插槽使用情况
// const defaultSlot = reactive(slots.default && slots.default().length)
// console.log(defaultSlot)

// 具名插槽使用情况
// const titleSlot = reactive(slots.title && slots.title().length)
// console.log(titleSlot)
</script>
