<template>
  <div class="mk">
    {{ mk }}
    <button @click="qiehuan">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mk: {
        name: "小店",
      },
    }
  },
  methods: {
    qiehuan() {
      this.mk.name = "12"
    },
  },
  watch: {
    "mk.name": function (v, oldVal) {
      console.log(v)
      console.log(oldVal)
    },
    $route: {
      immediate: true, // 确认是否以当前的初始值执行handler的函数
      deep: true, //针对对象数组 启用深度监听
      handler() {
        this.getCaWashStatusList()
      },
    },
  },
}
</script>

<style lang="scss">
.mk {
  .wf {
    color: red;
  }
}
</style>
