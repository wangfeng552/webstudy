<template>
  <div class="main">
    {{ provideState.state.name }}
  </div>
</template>
<script setup>
import { inject } from "vue"
const provideState = inject("provideState")
</script>
