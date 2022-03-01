<template>
  <span @click="changeInfo">我叫{{ name }}，今年{{ age }}岁</span>
</template>

<script setup>
import { defineEmits, defineProps } from "vue"
// defineEmits和defineProps在<script setup>中自动可用，无需导入
// 需在.eslintrc.js文件中【globals】下配置【defineEmits: true】、【defineProps: true】

defineProps({
  name: String,
  age: Number,
})

const emit = defineEmits(["update:name", "update:age"])
const changeInfo = () => {
  // 触发父组件值更新
  emit("update:name", "Tom")
  emit("update:age", 30)
}
</script>
