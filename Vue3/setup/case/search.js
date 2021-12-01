import { ref, computed } from "vue"

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref("")
  // computed 函数传递了第一个参数，它是一个类似 getter 的回调函数，输出的是一个只读的响应式引用.
  // 为了访问新创建的计算变量的 value，我们需要像 ref 一样使用 .value property
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter((repository) => {
      return repository.name.includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery,
  }
}
