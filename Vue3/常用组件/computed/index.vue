<template>
  <div>
    <div>
      {{ count }}
    </div>
    <div>{{ mapcount }}</div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue"
const state = reactive({
  count: 0,
})
const mapcount = computed(() => {
  return state.count + 10
})
</script>
