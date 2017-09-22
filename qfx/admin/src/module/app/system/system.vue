<template>
  <div class="system">
    <top-bar></top-bar>
    <main-part></main-part>
  </div>
</template>

<script>
  import mainPart from 'components/common/mainPart.vue'
  import topBar from 'components/common/topBar.vue'
  export default {
    components: {topBar,mainPart}
  }
</script>

<style>

</style>
