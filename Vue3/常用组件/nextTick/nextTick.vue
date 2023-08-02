<template>
  <div></div>
</template>
<script setup>
import { nextTick } from "vue"

// 方式 一
const handleClick = async () => {
  await nextTick()
  console.log('沐华')
}

// 方式二
nextTick(() => {
    console.log('沐华')
})

// 方式三
nextTick().then(() => {
    console.log('沐华')
  })
</script>
