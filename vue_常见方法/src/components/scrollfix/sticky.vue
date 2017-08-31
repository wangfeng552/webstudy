<template>
  <div>
    <div v-sticky="stickyConfig">
      <nav>
        <div v-if="!loading">to be sticky</div>
      </nav>
    </div>
    <div class="mk22">
      123123
    </div>
  </div>
</template>
<script>
  import VueSticky from 'vue-sticky'
  export default {
    name: 'App',
    data() {
      return {
        loading: true,
        stickyConfig: {
          zIndex: 100,
          stickyTop: 0
        },
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 1000)
      setTimeout(() => {
        this.stickyConfig.stickyTop = 0
      }, 1000)
    },
    directives: {
      'sticky': VueSticky,
    },
  }
</script>
<style>
  nav {
    background-color: #eee;
    line-height: 3;
    box-shadow: 0 8px 20px 0 rgba(0,0,0,.2);
  }
  .mk22{
    height: 2000px;
    background-color: #00a2d4;
  }
</style>
