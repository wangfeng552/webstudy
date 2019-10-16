import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = r =>
  require.ensure([], () => r(require("@/view/index")), "index")
const askList = r =>
  require.ensure([], () => r(require("@/view/ask/askList")), "askList")
const askDetails = r =>
  require.ensure([], () => r(require("@/view/ask/askDetails")), "askDetails")

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      deepth: 0.5
    }
  },
  {
    path: '/askList',
    name: 'askList',
    component: askList,
    meta: {
      keepAlive: true,
      deepth: 1
    }
  },
  {
    path: '/askdetails/:id',
    name: 'askDetails',
    component: askDetails,
    meta: {
      deepth: 2
    }
  },

 
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
