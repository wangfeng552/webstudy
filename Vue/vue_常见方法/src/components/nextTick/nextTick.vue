<template>
<div class="layout">
  <div>{{name}}</div>
  <button @click="changName()">点击</button>

</div>
</template>

<script>
export default {
  data() {
    return {
      name: '张三'
    }
  },
  methods: {
    changName() {
      this.name = 'changed'
      //想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
      console.log(this.$el.textContent) // 并不会得到'changed'

      //这样可以，nextTick里面的代码会在DOM更新后执行
      this.$nextTick(() => {
        console.log(this.$el.textContent) //可以得到'changed'
      })
    }
  }

}
</script>

<style lang="less" scoped>
.layout {}
</style>
