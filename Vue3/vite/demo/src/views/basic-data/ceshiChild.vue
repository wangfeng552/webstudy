<template>
  <div>
    <div>我是子组件</div>
    <div>{{ name }}</div>
    <div>{{ person }}</div>
    <a-button @click="toParent">派发给父组件</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
type IPerson = {
  name: string
  age: number
  address: string
  isShow: boolean
}
type Props = {
  name?: string
  person: IPerson
}

const props = defineProps<Props>()

const message = reactive({
  content: 'sadlfjh',
  time: '2022-02-15',
})
const emit = defineEmits(['on-message'])

const toParent = () => {
  emit('on-message', message)
}

defineExpose({
  message,
})
</script>

<style></style>
