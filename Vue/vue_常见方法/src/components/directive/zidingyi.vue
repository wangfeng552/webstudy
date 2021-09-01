<template>
  <div>
    <p>它的作用价值在于对普通DOM元素进行操作的时候。</p>
    <span v-permission="['1']"></span>
  </div>
</template>

<script>
import permission from './index'
export default {
  directives: {
    permission
  }
}
</script>

<style>
</style>
