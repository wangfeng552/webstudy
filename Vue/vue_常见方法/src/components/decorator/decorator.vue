<template>
  <div style="padding: 30px">
    <el-button @click="test(1)">点击</el-button>
  </div>
</template>
<script>
import { confirm } from "./confirm"
export default {
  data() {
    return {}
  },
  methods: {
    @confirm("删除门店", "请确认是否删除门店？")
    test(id) {
      console.log(123)
    },
  },
}
</script>
