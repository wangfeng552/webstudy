<template>
  <img :src="src" >
</template>
<script>
export default {
  name: "UImage",
  props: {
    type: {
      required: true
    }
  },
  computed: {
    src() {
      const v = this.type
      switch (v) {
        case "pic-logo":
          return require("~/assets/image/logo.png")
          break
        case "pic-photo":
          return require("~/assets/image/photo.jpg")
          break
        case "pic-msg":
          return require("~/assets/image/msg.png")
          break
        case "pic-abbrev":
          return require("~/assets/image/abbrev.png")
          break
        default:
          break
      }
    }
  }
}
</script>
<style>
</style>
