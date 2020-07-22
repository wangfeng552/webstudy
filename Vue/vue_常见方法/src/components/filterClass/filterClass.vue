<template>
  <div>
    <div class="showico">
      <ul>
        filterClass 被定义为接收2个参数的过滤器函数。其中 v 的值作为第一个参数，i 作为第二个参数。
        <li v-for="(v,i) in name" :key="i">
          <span v-if="v.message=='leader'">
            <div :class="v | filterClass(i)">{{v.val}}</div>
          </span>
          <span v-else>
            <div :class="v | filterClass">{{v.val}}</div>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: [
        { val: 123, message: "leader" },
        { val: 222, message: "other" },
        { val: 333, message: "des" },
        { val: 444, message: "des" }
      ]
    }
  },
  filters: {
    filterClass(v, i) {
      if (v.val == 123) {
        return "red"
      } else if (v.val == 222) {
        return "green"
      } else {
        return "#ccc"
      }
    }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
