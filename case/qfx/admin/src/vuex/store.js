import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import formzr from './modules/form_zr'
import project from './modules/project'
import trade from './modules/trade'
import stage from './modules/stage'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store=new Vuex.Store({
  modules:{formzr,admin,stage,project,trade},
  getters,
  plugins:[createPersistedState({
    key:'admin',
    storage: window.sessionStorage
  })]

})

export default store
