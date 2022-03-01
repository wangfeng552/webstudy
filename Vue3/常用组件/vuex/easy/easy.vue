<template>
  <div>
    <div class="count">{{ count }}</div>
    <div class="count">{{ count2 }}</div>
    <button @click="addCount">count++ actions载荷形式分发</button>
    <button @click="addCountObject">count++ actions对象形式分发</button>
    <button @click="addCountCommit">count++ mutations</button>
    <button @click="goActionA">promise</button>
  </div>
</template>
<script setup>
import { INCREMENT } from "@/store"
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()

// 在 computed 函数中访问 state
const count = computed(() => {
  return store.state.count
})
// 在 computed 函数中访问 getter
const count2 = computed(() => {
  return store.getters.count
})
// 使用 action以载荷形式分发
const addCount = () => {
  store.dispatch("increment", { name: "李四" })
}

// 使用 action以对象形式分发
const obj = {
  name: "李四",
  age: 21,
  isShow: true,
}
const addCountObject = () => {
  store.dispatch({
    type: "increment",
    ...obj,
  })
}

// 使用 mutation
const addCountCommit = () => {
  store.commit(INCREMENT)
}

// promise 组合Action
const goActionA = () => {
  store
    .dispatch("actionA", { isShow: true })
    .then(() => {
      console.log("yes")
    })
    .catch(() => {
      console.log("error")
    })
}
</script>
