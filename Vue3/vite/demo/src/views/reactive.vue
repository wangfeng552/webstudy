<template>
  <div>
    <h3>reactive 用来绑定复杂的数据类型 例如 对象 数组</h3>
    <div>{{ person.name }}</div>

    <div>{{ count }}</div>
    <div>{{ apple.list }}</div>

    <div>{{ age }}</div>
    <div>{{ copy }}</div>

    <a-button @click="change1">test1</a-button>
    <a-button @click="changeTwo">test2</a-button>
    <div>{{ state }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, readonly, shallowReactive } from 'vue'
let person = reactive({
  name: '小那边',
})
person.name = '到了'

// 2.数组异步赋值问题
// 方案1
let count = reactive<number[]>([])
setTimeout(() => {
  //   count = [1, 2, 3, 5] 不是响应式
  const arr = [1, 2, 3, 5]
  count.push(...arr)
  console.log(count)
}, 1000)

// 方案2 包裹一层对象
type Flut = {
  list?: Array<number>
}

let apple = reactive<Flut>({
  list: [],
})

setTimeout(() => {
  apple.list = [1, 2, 43, 4]
}, 1000)

// 3.readonly 拷贝一份proxy对象将其设置为只读
const age = reactive({ count: 1 })
const copy = readonly(age)
// age.count++
// copy.count++   // 报错

// 4.shallowReactive 智能对浅层的数据 如果是深层的数据只会改变值 不会改变视图
const obj = {
  a: 1,
  fitst: {
    b: 2,
    second: {
      c: 3,
    },
  },
}
const state = shallowReactive(obj)

const change1 = () => {
  state.a = 7
  console.log(state)
}

const changeTwo = () => {
  state.a = 7
  state.fitst.b = 10
  console.log(state)
}
</script>

<style></style>
