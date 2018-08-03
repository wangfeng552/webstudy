<template>
  <i-button >
    <slot/>
  </i-button>
</template>
<script>
export default {
  name: "UButton",
  methods: {
    alert() {
      alert("test")
    }
  }
}
</script>

<style lang="less">
</style>
