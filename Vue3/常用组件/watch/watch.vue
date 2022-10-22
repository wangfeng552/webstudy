<template>
  <div>
    <button @click="changeVlaue">点击变值</button>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs, computed, watch } from "vue"

const person = ref("lisi")
const x = ref(0)
const state = reactive({
  name: "",
})

const changeVlaue = () => {
  person.value = "aa"
  state.name = "lisi"
}

// 单个 ref
watch(person, (newVal, oldVal) => {
  console.log(newVal + "=newVal")
  console.log(oldVal + "=oldVal")
})

// getter 函数
watch(
  () => person.value + x.value,
  () => {}
)
watch(
  () => state.name,
  (newVal, oldVal) => {
    console.log(newVal + "=newName")
    console.log(oldVal + "=oldName")
  },
  {
    immediate: true,
    deep: true,
    // 谨慎使用
    // 深度侦听需要遍历被侦听对象中的所有嵌套的 property，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
  }
)

watch([a,b,c]) // 监听多个值
</script>
