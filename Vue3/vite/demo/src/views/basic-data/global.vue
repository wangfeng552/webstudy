<template>
  <div>
    <h3>获取全局属性</h3>
    <div>{{ mes }}</div>
    <a-button @click="show"> 调用全局方法</a-button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()

let mes = appContext.config.globalProperties.$name

const show = () => {
  appContext.config.globalProperties.$showName('asa')
}
</script>

<style></style>
