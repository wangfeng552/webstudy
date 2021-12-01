<template>
  <div ref="root">this is a root element</div>
</template>
<script>
import { ref, onMounted, watchEffect } from "vue"
export default {
  setup() {
    const root = ref(null)
    onMounted(() => {
      // DOM 元素将在初始渲染后分配给 ref
      console.log(root.value) // <div>This is a root element</div>
    })

    // 使用模板引用的侦听器应该用 flush: 'post' 选项来定义，这将在 DOM 更新后运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素。
    watchEffect(
      () => {
        console.log(root.value) // <div>This is a root element</div>
      },
      {
        flush: "post",
      }
    )
    return {
      root,
    }
  },
}
</script>
