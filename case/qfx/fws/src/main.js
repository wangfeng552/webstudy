import Vue from 'vue'
import ElementUi from 'element-ui'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'
import App from './App'
import clear from './assets/js/clear.js'
import common  from './assets/js/common.js';

Vue.use(clear)
Vue.use(common)

Vue.use(VueResource)
Vue.use(ElementUi)
// Vue.http.options.withCredentials = true

Vue.http.options.before = function(request) {
  if (request.url != 'http://up-z2.qiniu.com/') {
    request.withCredentials = true
    request.headers.set('Access-Token', sessionStorage.getItem('admin') ? JSON.parse(sessionStorage.getItem('admin')).admin.admin.token : '')
  } else {
    request.credentials = false
  }
  // 360 兼容模式  如果在 PATCH 和 POST 的时候 body 为空，那么就加上去
  if(request.method == 'POST' || request.method == 'PATCH'){
    if(request.body == undefined || request.body == null){
      request.body = '{}';
    }
  }
}
//基于inteceptor实现请求错误时的提示画面
/*Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if(res.status == 404){
      router.push({name: 'notFound'})
    }
  })
})*/

import 'element-ui/lib/theme-default/index.css'
import 'assets/scss/main.scss'

//登录状态限制
router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.admin.admin) //true 用户已登录， false 用户未登录
  if (auth && !isLogin && path !== '/') {
    return next({ path: '/' })
  }else if(isLogin && path === '/'){
    return next(false)
  }
  next()
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function() {
      return EventBus;
    }
  }
});
