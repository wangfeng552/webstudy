<template>
  <div class="wrap">
    子组件
    <div @click="show()">点击</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '123'
    }
  },
  // inject：Array<string> | { [key: string]: string | Symbol | Object }
  inject: ['showText', 'children'],
  methods: {
    show() {
      this.showText()
      console.log(this.children)
    }
  }
}
</script>
