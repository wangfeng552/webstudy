import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const jiucai = r => require.ensure([], () => r(require('@/view/jiucai')), 'jiucai')

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/jiucai',
      name: 'jiucai',
      component: jiucai,
      meta:{
        title:'首页入口'
      }
    }
  ]
})
