<template>
  <div class="about">
    <div>{{name}}</div>
    <button @click="goSetName">触发action</button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.$store.dispatch("setName", { name: "张三" });
  },
  methods: {
    ...mapActions(["setName"]), // 将 `this.setName(amount)` 映射为 `this.$store.dispatch('setName', amount)`
    goSetName() {
      this.setName({ name: "李四" });
    },
  },
};
</script>

