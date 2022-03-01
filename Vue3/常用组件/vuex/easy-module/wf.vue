<template>
  <div>
    <div class="count">{{ count }}</div>
    <button @click="addCount">count++ actions载荷形式分发</button>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()

// 在 computed 函数中访问 state
const count = computed(() => {
  return store.state.user.count
})

const addCount = () => {
  store.dispatch("user/increment")
}
</script>
