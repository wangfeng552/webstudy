<template>
  <div>
    <p>
      Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了
      HTML，而不必求助于全局状态或将其拆分为两个组件。
    </p>
    <button @click="showDialog">显示弹窗</button>
    <!-- 弹窗 Teleport 这个 HTML 到该‘body’标签”-->
    <teleport to="body">
      <div class="model">
        <h3 class="title">提示</h3>
      </div>
    </teleport>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowDialog: false,
    }
  },
  methods: {
    showDialog() {
      this.isShowDialog = true
    },
  },
}
</script>
