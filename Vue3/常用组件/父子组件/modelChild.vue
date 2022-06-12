<template>
  <div>
    <div>{{ name }}-{{ age }}</div>
    <button @click="changeParentPerson">改变父组件的值</button>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
})
// update:modelValue 默认值
const emit = defineEmits(["update:modelValue", "update:name", "update:age"])
const changeParentPerson = () => {
  emit("update:modelValue", "newValue")
  emit("update:name", "新名字")
  emit("update:age", 20)
}
</script>
