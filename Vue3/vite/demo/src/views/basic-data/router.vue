<template>
  <div>
    <div>
      <div v-for="(v, i) in person" :key="i">
        {{ v.name }} <a-button @click="jump(v)">跳转</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

type Shop = {
  name: string
  age: number
}

const router = useRouter()
const person = reactive<Shop[]>([
  {
    name: '哭诉',
    age: 23,
  },
  {
    name: '哭诉2',
    age: 233,
  },
])
const jump = (item: Shop) => {
  router.push({
    name: 'routerdetail',
    query: item,
  })
}
</script>

<style></style>
