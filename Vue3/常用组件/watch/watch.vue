<template>
  <div>
    <button @click="changeVlaue">点击变值</button>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs, computed, watch } from "vue"

const person = ref("lisi")
const state = reactive({
  name: "",
})

const changeVlaue = () => {
  person.value = "aa"
  state.name = "lisi"
}

watch(
  () => state.name,
  (newVal, oldVal) => {
    console.log(newVal + "=newVal")
    console.log(oldVal + "=oldVal")
  },
  {
    immediate: true,
    deep: true,
  }
)
watch(
  () => person.value,
  (newVal, oldVal) => {
    console.log(newVal + "=newValPerson")
    console.log(oldVal + "=oldValPerson")
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>
