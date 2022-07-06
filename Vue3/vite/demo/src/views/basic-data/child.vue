<template>
  <div>
    <h3>我是子组件</h3>
    <div>{{ name }}</div>
    <div>{{ data }}</div>
    <div>{{ age }}</div>
    <a-button @click="clickTap">派发给父组件</a-button>
  </div>
</template>

<script setup lang="ts">
// 通过defineProps 来接受 defineProps是无须引入的直接使用即可
type Props = {
  name?: string
  data?: number[]
  age?: number
}
const props = defineProps<Props>()

// 子组件给父组件传参 defineEmits 派发一个事件
const list = reactive<number[]>([1, 2, 3, 4])
const emit = defineEmits(['on-click'])
const clickTap = () => {
  emit('on-click', list, props.name)
}

// 暴露属性
defineExpose({
  list,
})
</script>

<style></style>
