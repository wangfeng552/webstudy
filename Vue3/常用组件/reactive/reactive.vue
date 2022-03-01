<template>
  <div class="directive">
    <p>将解包所有深层的 refs，同时维持 ref 的响应性。</p>
    <input type="text" v-model="wfForm.name" />
    <input type="text" v-model="loginForm.name" />
  </div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue"
const count = ref(10)
// reactive创建响应式的对象和数组
const state = reactive({
  wfForm: {
    name: "123",
  },
  count,
})

const { wfForm, count } = toRefs(state)

// 当将 ref 分配给 reactive property 时，ref 将被自动解包。
console.log(state.count) // 10
console.log(state.count === count.value) // true
</script>

<script>
import { reactive, toRefs } from "vue"
export default {
  setup() {
    const state = reactive({
      loginForm: {
        name: "123",
      },
      count,
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>
