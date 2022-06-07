<template>
  <div>
    <div>
      {{ count }}
    </div>
    <div>{{ mapcount }}</div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue"
// 基本数据类型计算
const shCount = ref(0)

const shCountComputed = computed(() => {
  return shCount.value + 10
})

// 引用数据类型计算
const state = reactive({
  count: 0,
})
const mapcount = computed(() => {
  return state.count + 10
})
</script>
