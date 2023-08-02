<template>
  <div class="animal">
    <div>我是父元素</div>
    <dog @click.native="emptyInputText"></dog>
  </div>
</template>
<script>
import dog from './dog'

export default {
  data() {
    return {
      age: '45'
    }
  },
  created() {
    this.$children[0].name // 访问自组件的name
  },
  methods: {
    show() {},
    emptyInputText(){}
  }
}
</script>
