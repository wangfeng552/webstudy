<template>
  <div>
    <Tchild v-model="timk"></Tchild>
  </div>
</template>

<script>
import Tchild from "./tchild.vue"
export default {
  data() {
    return {
      timk: 8,
    }
  },
  components: {
    Tchild,
  },
}
</script>

<style lang="scss" scoped></style>
