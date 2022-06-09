<template>
  <div>
    <div>
      {{ count }}
    </div>
    <div>{{ mapcount }}</div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue"
// 基本数据类型计算
const shCount = ref(0)

const shCountComputed = computed(() => {
  return shCount.value + 10
})

// 引用数据类型计算
const state = reactive({
  count: 0,
})
const mapcount = computed(() => {
  return state.count + 10
})

// getter 和 setter
const firstName = ref("李")
const lastName = ref("动气")
const fullName = computed({
  get() {
    return firstName.value + lastName.value
  },
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    ;[firstName.value, lastName.value] = newValue.split(" ")
  },
})
const changeFullName = () => {
  fullName.value = "李 动气"
}
</script>
