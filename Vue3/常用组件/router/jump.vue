<template>
  <div class="login">
    <button @click="goRegisterNew">去注册new</button>
  </div>
</template>

<script setup>
// useRoute =  this.$route()
// useRouter =  this.$router()
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router"

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

// 添加一个导航守卫，在当前组件将要离开时触发。
onBeforeRouteLeave((to, from, next) => {
  next()
})

// 添加一个导航守卫，在当前组件更新时触发。
// 在当前路由改变，但是该组件被复用时调用。
onBeforeRouteUpdate((to, from, next) => {
  next()
})
</script>
