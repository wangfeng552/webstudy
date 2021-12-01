import { fetchUserRepositories } from "@/api/repositories"
import { ref, onMounted, watch } from "vue"

export default function useUserRepositories(user) {
  const repositories = ref([]) // 声明响应式的变量,ref 接收参数并将其包裹在一个带有 value property 的对象中返回
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories) // 生命周期前缀为on
  watch(user, getUserRepositories) // 一个想要侦听的响应式引用或 getter 函数 | 一个回调 | 可选的配置选项

  //这里返回的任何内容都可以用于组件的其余部分
  return {
    repositories,
    getUserRepositories, // 返回的函数与方法的行为相同
  }
}
