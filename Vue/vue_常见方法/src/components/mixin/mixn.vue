<template>
  <div class="news">
    <p>执行顺序:全局混入--->局部混入--->构造器</p>
    <p>混入的方法和构造器里的方法重名，混入的方法不执行</p>
  </div>
</template>

<script>
import wf from "./wf";
export default {
  data() {
    return {
      name: "com",
      age: 24,
    };
  },
  mixins: [wf],
  created() {
    console.log(222);
  },
  methods: {
    bar() {
      console.log("bar");
    },
    conflicting() {
      console.log("form self");
    },
  },
};
</script>
