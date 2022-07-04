<template>
  <div>
    <h3>to全家桶</h3>
    <a-button @click="change">按钮</a-button>
    {{ state }}

    <div>{{ name }}</div>

    <div>{{ yiyi }}</div>
    <a-button @click="changeYiyi">切换</a-button>
  </div>
</template>
<script lang="ts" setup>
import { toRef, reactive, toRefs } from 'vue'

const obj = {
  foo: 1,
  bar: 1,
}

const state = toRef(obj, 'bar')
// bar转化为响应式对象

const change = () => {
  state.value++
  console.log(obj, state)
}

// 2.toRefs
const person = reactive({
  name: '李四',
  age: 12,
})

let { name, age } = toRefs(person)

// 3.toRaw 将响应式对象转为普通对象
const animal = reactive({
  name: 'yiyi',
  shuxing: '猫',
})
const yiyi = toRaw(animal) // 转换为普通对象

const changeYiyi = () => {
  console.log(animal)
  console.log(yiyi)
}

console.log(yiyi)
</script>
