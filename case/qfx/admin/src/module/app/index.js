import Vue from 'vue'
import app from './app.vue'
import VueResource from 'vue-resource'
import $ from 'jquery'
import EelementUi from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from 'src/router/router'
import store from 'src/vuex/store'
import '../../assets/js/amazeui.min.js'
import common  from '../../assets/js/common';
import clear from '../../assets/js/clear';

Vue.use(VueResource)
Vue.use(EelementUi)
Vue.use(common)
Vue.use(clear)
Vue.http.options.withCredentials = true;

Vue.http.options.before = function(request) {
  request.headers.set('Access-Token', sessionStorage.getItem('admin')?JSON.parse(sessionStorage.getItem('admin')).admin.admin.token:'')
}

// require('assets/sass/amazeui.min.css')
require('assets/sass/main.scss')

//登录状态限制
router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.admin.admin) //true 用户已登录， false 用户未登录
  if (auth && !isLogin && path !== '/') {
    return next({ path: '/' })
  }else if(store.state.admin.admin && path === '/'){
    return next(false)
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
