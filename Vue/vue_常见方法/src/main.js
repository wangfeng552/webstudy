import Vue from 'vue'
import Es6Promise from 'es6-promise'
import QS from 'qs'
Es6Promise.polyfill()
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUi from 'element-ui'
import App from './App'
import router from './router'
import store from './vuex/store'
// import VueResource from 'vue-resource'
import VueFroala from 'vue-froala-wysiwyg'
import './assets/green/index.css'
import axios from 'axios'
Vue.prototype.$http = axios

require('froala-editor/js/froala_editor.pkgd.min')
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUi)
Vue.use(VueFroala)
// Vue.http.options.root = 'http://192.168.1.117:49008/api/v1/';
// Vue.http.options.before = function(request) {
//   request.headers.set('Access-Token', localStorage.getItem('wf'))
// }

axios.defaults.baseURL = 'http://192.168.1.117:49008/api/v1';

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







