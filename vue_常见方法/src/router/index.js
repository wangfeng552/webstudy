import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import swiper from 'components/swiper/swiper'
// 路由懒加载
const vuex1 = resolve => require(['components/vuex/vuex'], resolve)
const persiste = resolve => require(['components/vuex/persiste'], resolve)
const vueresource = resolve => require(['components/vueResource/vueResource'], resolve)
const star = resolve => require(['components/star/star'], resolve)
const tab = resolve => require(['components/tab/tab'], resolve)
const tab2 = resolve => require(['components/tab/tab2'], resolve)
const tab3 = resolve => require(['components/tab/tab3'], resolve)
const ceshi = resolve => require(['components/ceshi/ceshi'], resolve)
const selectcity = resolve => require(['components/city/select_city'], resolve)
const city2 = resolve => require(['components/city2/city2'], resolve)
const city4 = resolve => require(['components/city4/city4'], resolve)
const trans = resolve => require(['components/transition/demo1'], resolve)
const luyou = resolve => require(['components/luyou/luyou'], resolve)
const promise1 = resolve => require(['components/promise/index'], resolve)
const elementui = resolve => require(['components/elementui/elementui'], resolve)
const input = resolve => require(['components/input/input'], resolve)
const validate = resolve => require(['components/validate/validate'], resolve)
const btnClick = resolve => require(['components/btnClick/btnClick'], resolve)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',    // 改变热点
  routes: [
    {path: '/swiper', component: swiper},
    {path: '/vuex1', components: {
      default:vuex1,
      persiste
    }},
    {path: '/vueresource', component: vueresource},
    {path: '/star', component: star},
    {
      path: '/tab', components: {
      default: tab,
      tab2,
      tab3,
      }
    },
    {path: '/ceshi', component: ceshi,beforeLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
     console.log(to)
    }},
    {path: '/selectcity', component: selectcity},
    {path: '/city2', component: city2},
    {path: '/city4', component: city4},
    {path: '/trans', component: trans},
    {path: '/luyou', component: luyou, meta: { requiresAuth: true }},
    {path: '/promise1', component: promise1},
    {path: '/elementui', component: elementui},
    {path: '/input', component: input},
    {path: '/validate', component: validate},
    {path: '/btnClick', component: btnClick},
    {path: '*', redirect: '/swiper'}
  ]
})

//路由元信息
/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
   console.log(1)
  } else {
    next() // 确保一定要调用 next()
  }
})*/

export default router
