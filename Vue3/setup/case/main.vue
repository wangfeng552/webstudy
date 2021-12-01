<template>
  <div class="main"></div>
</template>
<script>
import useUserRepositories from "./useUserRepositories"
import useRepositoryNameSearch from "./search"
import { toRefs } from "vue"
export default {
  components: { RepositoriesFilters, RepositoriesSortBy },
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props) // {user:''}

    // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
    const { user } = toRefs(props)

    // 如果 title 是可选的 prop，则传入的 props 中可能没有 title 。在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它
    const title = toRef(props, "title")
    console.log(title.value)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const { searchQuery, repositoriesMatchingSearchQuery } =
      useRepositoryNameSearch(repositories)

    return {
      // 因为我们并不关心未经过滤的仓库
      // 我们可以在 `repositories` 名称下暴露过滤后的结果
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
    }
  },
}
</script>
