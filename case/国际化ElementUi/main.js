import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index'
import VueI18n from 'vue-i18n'
import store from "../../../project/biger_pc/src/home/store"
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.lang, // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-cn': require('@/../static/lang/zh-cn.json'), // 中文语言包
    'en': require('@/../static/lang/en.json') // 英文语言包
  }
})

new Vue({
  template: '<home />',
  i18n,
  components: {
    Home
  }
}).$mount('#app')

