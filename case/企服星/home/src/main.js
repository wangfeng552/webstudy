import Vue from 'vue'
/*require('es6-promise').polyfill()
// ES6模块方式
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from 'src/router/router'
import EelementUi from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import bigbox from './App.vue'
import store from './vuex/store'
import common  from './assets/js/common.js';
require('assets/sass/main.scss')

Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
Vue.use(EelementUi)
Vue.use(common)

Vue.http.options.withCredentials = true;
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.emulateJSON = true;
Vue.http.options.before = function(request) {
  request.headers.set('Access-Token', localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')).user.user.token:'')
}
//基于inteceptor实现请求错误时的提示画面
Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if(res.status == 401){
      store.dispatch('logout')
      localStorage.removeItem('items')
      router.push({name: 'login'})
      return res;
    }
  })
})

//登录状态限制
router.beforeEach(({meta, path,name}, from, next) => {
  var isLogin = Boolean(store.state.user.user) //true 用户已登录， false 用户未登录
  if(isLogin && name == 'login'){
    return next({path:'/'})
  }if(!isLogin && name == 'userCenterDefault'){
    return next({name:'login'})
  }if(!isLogin && name == 'application'){
    return next({name:'login'})
  }if(!isLogin && name == 'serviceApply'){
    return next({name:'login'})
  }
  next()
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(bigbox)
})
