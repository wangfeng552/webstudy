<template>
  <div class="wrap">
    提示：provide 和 inject
    绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
    <child></child>
  </div>
</template>

<script>
import child from './child'
export default {
  data() {
    return {
      name: '123',
      children: [
        { name: '张三', age: 45 },
        { name: '张三2', age: 451 },
        { name: '张三1', age: 425 }
      ]
    }
  },
  components: {
    child
  },
  // 父组件中返回要传给下级的数据
  provide() {
    return {
      showText: this.showText,
      children: this.children
    }
  },
  methods: {
    showText() {
      console.log('1234')
    }
  }
}
</script>
