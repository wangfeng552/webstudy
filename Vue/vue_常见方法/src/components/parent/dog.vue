<template>
  <div class="animal">
    <div>我是子元素</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '我是一只老虎'
    }
  },
  methods: {
    getParent() {
      this.$parent.age // 访问父组件的值
      this.$parent.show() // 访问父组件的方法
    }
  }
}
</script>
