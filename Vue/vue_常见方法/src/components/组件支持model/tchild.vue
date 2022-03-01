<template>
  <div>
    <div>我是第{{ ame }}届</div>
    <el-button @click="changAmz(1)">加</el-button>
    <el-button @click="changAmz(-1)">减</el-button>
  </div>
</template>

<script>
export default {
  props: {
    ame: {
      type: Number,
      default: 8,
    },
  },
  // 自定义v-model的格式
  model: {
    prop: "ame", // 代表 v-model 绑定的prop名
    event: "zard", // 代码 v-model 通知父组件更新属性的事件名
  },
  methods: {
    changAmz(step) {
      const newYear = this.ame + step
      this.$emit("zard", newYear)
    },
  },
}
</script>

<style lang="scss" scoped></style>
