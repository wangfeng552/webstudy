<template>
  <div>{{ isApp(2) }}</div>
</template>

<script>
export default {
  data() {
    return {
      num: 2,
    }
  },
  computed: {
    //   计算属性传参
    isApp() {
      return function (n) {
        return n * this.num
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
