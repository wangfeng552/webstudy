<template>
  <div>
    <div>child{{ msg }}</div>
    <button @click="changeName">子组件修改父组件数据</button>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, defineExpose } from "vue"
const childName = ref("childName")
const props = defineProps({
  msg: {
    type: String,
    default: "请输入",
  },
  // 带有默认值的数组
  personList: {
    type: Object,
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
      return []
    },
    // 箭头函数
    default: () => [],
  },
  // 带有默认值的对象
  dogInfo: {
    type: Object,
    default: function () {
      return {}
    },
    default: () => ({}),
  },
})

const emit = defineEmits(["changeName"])

const changeName = () => {
  console.log(props.msg)
  emit("changeName", "wf")
}

// 暴露出去的属性
defineExpose({
  childName,
})
</script>
