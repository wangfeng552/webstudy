<template>
  <div class="header">
    这是子组件的header
    <div><slot name="header" v-bind:users="user"></slot></div>
    <div>---------------------</div>
    <div><slot name="main" v-bind:users="user"></slot></div>
    <div>---------------------</div>
    <div><slot name="footer"></slot></div>
    <div>---------------------</div>
    <div><slot name="person"></slot></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "张三",
    };
  },
};
</script>