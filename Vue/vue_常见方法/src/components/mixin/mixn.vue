<template>
  <div class="news">值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。</div>
</template>

<script>
import wf from "./wf"
export default {
  data() {
    return {
      name2: "com"
    }
  },
  mixins: [wf],
  created() {
    console.log(222)
    console.log(this.name)
  },
  methods: {}
}
</script>


