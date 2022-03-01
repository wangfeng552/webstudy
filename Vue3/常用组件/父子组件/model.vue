<template>
  <div>
    <!-- 父组件 -->
    <Child v-model:name="name"></Child>
  </div>
</template>

<script setup>
// 子组件使用update更新值, 不需要再通过触发父组件的方法修改
import { defineProps, defineEmits } from "vue"

const props = defineProps({
  name: String,
})

const emit = defineEmits(["changeName"])

const changeParentName = () => {
  emit("update:name", "子组件的名称传递过来")
}
</script>

<style lang="scss" scoped></style>
