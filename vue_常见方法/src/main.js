import Vue from 'vue'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUi from 'element-ui'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'
import './assets/green/index.css'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUi)
Vue.http.options.root = 'http://192.168.1.117:49008/api/v1/';
Vue.http.options.before = function(request) {
  request.headers.set('Access-Token', localStorage.getItem('wf'))
}

/*window.onload=function(){
  if(!window.FormData){//IE9以下
    /!* eslint-disable no-new *!/
    var vm = new Vue({
      el: '#app',
      render: h => h(Appp)
    })
  }else{
  }
}*/

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})







