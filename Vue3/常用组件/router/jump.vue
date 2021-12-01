<template>
  <div class="login">
    <button @click="goRegisterNew">去注册new</button>
  </div>
</template>

<script setup>
// useRoute =  this.$route()
// useRouter =  this.$router()
import { useRoute, useRouter } from "vue-router"

// 获取url上的参数
const route = useRoute()
console.log(route.query)
console.log(route.params)

const router = useRouter()
const goRegisterNew = () => {
  router.push({
    name: "register",
    params: {
      id: 1,
    },
  })
}
</script>
