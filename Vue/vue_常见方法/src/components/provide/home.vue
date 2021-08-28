<template>
  <div class="wrap">
    provide 和 inject
    帮助我们解决多层次嵌套嵌套通信问题。在provide中指定要传递给子孙组件的数据，子孙组件通过inject注入祖父组件传递过来的数据。
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
  // provide：Object | () => Object
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
