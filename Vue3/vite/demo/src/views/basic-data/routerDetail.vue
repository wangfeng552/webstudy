<template>
  <div>2</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.name)
let t = route.query.name
console.log('t', t)
</script>

<style></style>
