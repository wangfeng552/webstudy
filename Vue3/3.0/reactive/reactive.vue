<template>
  <div>
    {{ name }} ：{{age}}
    <button @click="changeName">改变name</button>
  </div>
</template>

<script lang="ts">
import {  ref, reactive, toRefs } from "vue"

export default ({
  setup() {
    const state = reactive({
      name: "aaa",
      age: 12,
      changeName: () => {
        state.name = "真嘎部分三"
        state.age = 25
      },
    })

    const refsState = toRefs(state)

    return {
      ...refsState,
    }
  },
})
</script>

<style scoped></style>
