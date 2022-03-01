<template>
  <div class="main">
    <div class="title">你好</div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
const state = reactive({
  mainColor: "red",
})
</script>

<style scoped>
.title {
  color: v-bind("state.mainColor");
}
</style>
