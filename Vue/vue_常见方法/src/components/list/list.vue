<template>
<div id="app">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = Number(localStorage.scrollTop)
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
export default {
  beforeRouteLeave(to, from, next) {
    let position = this.getScrollTop();
    localStorage.setItem('scrollTop', position);
    if (to.path == '/shopDetails') {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true;
      }
      next()
    } else {
      from.meta.keepAlive = false
      to.meta.keepAlive = false
      next()
      window.location.reload()
    }
  },
  methods: {
    getScrollTop() {
      let yScroll;
      let self = this;
      if (self.pageYOffset) {
        yScroll = self.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
      } else if (document.body) { // all other Explorers
        yScroll = document.body.scrollTop;
      }
      return yScroll;
    }
  }
}
</script>
