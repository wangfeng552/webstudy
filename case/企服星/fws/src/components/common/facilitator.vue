<template>
  <div class="facilitator">
    <top-bar></top-bar>
    <top-header></top-header>
    <div class="mi-height w1200">
      <router-view></router-view>
    </div>
    <sideWindow></sideWindow>
    <black-footer></black-footer>
  </div>
</template>
<script>
  import topBar from './topBar.vue'
  import topHeader from './topHeader.vue'
  import blackFooter from './blackFooter.vue'
  import API from 'API/api'
  import sideWindow from './sideWindow.vue'
  export default {
    name: 'app',
    components: {topBar,topHeader,blackFooter,sideWindow}
  }
</script>

