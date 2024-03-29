import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import swiper from 'components/swiper/swiper'
// 路由懒加载
const vuex1 = resolve => require(['components/vuex/vuex'], resolve)
const persiste = resolve => require(['components/vuex/persiste'], resolve)
const vueresource = resolve => require(['components/axios/axios'], resolve)
const star = resolve => require(['components/star/star'], resolve)
const tab = resolve => require(['components/tab/tab'], resolve)
const tab2 = resolve => require(['components/tab/tab2'], resolve)
const tab3 = resolve => require(['components/tab/tab3'], resolve)
const ceshi = resolve => require(['components/ceshi/ceshi'], resolve)
const selectcity = resolve => require(['components/city/select_city'], resolve)
const city2 = resolve => require(['components/city2/city2'], resolve)
const propsChild = resolve => require(['components/props/parent'], resolve)
const trans = resolve => require(['components/transition/demo1'], resolve)
const luyou = resolve => require(['components/luyou/luyou'], resolve)
const promise1 = resolve => require(['components/promise/index'], resolve)
const elementui = resolve => require(['components/elementui/elementui'], resolve)
const input = resolve => require(['components/input/input'], resolve)
const file = resolve => require(['components/input/file'], resolve)
const radioCheckbox = resolve => require(['components/input/radioCheckbox'], resolve)
const validate = resolve => require(['components/validate/validate'], resolve)
const btnClick = resolve => require(['components/btnClick/btnClick'], resolve)
const filterClass = resolve => require(['components/filterClass/filterClass'], resolve)
const zhiling = resolve => require(['components/zhiling/zidingyi'], resolve)//自定义指令
const sticky = resolve => require(['components/scrollfix/sticky'], resolve)//滚动固定
const maodian= resolve => require(['components/href/maodian'], resolve)//锚点跳转
const edit= resolve => require(['components/edit/edit'], resolve)//文本编辑器

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
    {path: '/propsChild', component: propsChild},
    {path: '/trans', component: trans},
    {path: '/luyou', component: luyou, meta: { requiresAuth: true }},
    {path: '/promise1', component: promise1},
    {path: '/elementui', component: elementui},
    {path: '/sticky', component: sticky},
    {
      path: '/input', components: {
      default: input,
      tab2: file,
      tab3:radioCheckbox
    }
    },
    {path: '/validate', component: validate},
    {path: '/btnClick', component: btnClick},
    {path: '/zhiling', component: zhiling},
    {path: '/filterClass', component: filterClass,name:'filterClass'},
    {path: '/maodian', component: maodian,name:'maodian'},
    {path: '/edit', component: edit,name:'edit'},
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
