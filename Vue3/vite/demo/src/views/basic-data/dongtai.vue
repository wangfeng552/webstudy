<template>
  <div>
    <component :is="current"></component>
    <div>
      <li v-for="(v, i) in tab" :key="i" @click="changeComponent(v)">{{ v.name }}</li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import A from './components/A.vue'
import B from './components/B.vue'

const tab = reactive([
  {
    name: 'A组件',
    comName: markRaw(A),
  },
  {
    name: 'B组件',
    comName: markRaw(B),
  },
])

let current = shallowRef(A)

const changeComponent = (v) => {
  current.value = v.comName
}
</script>

<style></style>
