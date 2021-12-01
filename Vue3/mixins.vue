<template>
  <div>
    <div class="wf-btn">{{ message }}</div>
    <div class="wf-btn">{{ foo }}</div>
    <a-button @click="showmixin">show</a-button>
  </div>
</template>
<script>
const myMixin = {
  data() {
    return {
      mssage: "hello",
      foo: "abc",
    }
  },
  created() {
    // 同名钩子函数将合并为一个数组，因此都将被调用。另外，mixin 对象的钩子将在组件自身钩子之前调用。
    console.log("mixin对象的钩子")
  },
  methods: {
    show() {
      console.log("show-mixin")
    },
    showmixin() {
      console.log("show-mixin")
    },
  },
}
export default {
  mixins: [myMixin],
  data() {
    return {
      message: "123",
      count: 2,
    }
  },
  created() {
    console.log(this.$data) // 当组件和 mixin 对象含有同名选项时，以组件自身的数据为优先
  },
  methods: {
    show() {
      // 例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
      console.log("show")
    },
  },
}
</script>
