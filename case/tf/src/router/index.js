import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = r =>
  require.ensure([], () => r(require("@/view/index")), "index")

const demo = r =>
  require.ensure([], () => r(require("@/view/echart")), "index")

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo
  }
]

const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
