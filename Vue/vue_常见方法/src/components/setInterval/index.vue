<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    fn() {
      let timer = setInterval(() => {
        //具体执行代码
        console.log("1")
      }, 1000)
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer)
        timer = null
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
