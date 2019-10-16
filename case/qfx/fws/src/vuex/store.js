import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import editid from './modules/edit.js'
import department_zr from './modules/department.js'
import step from './modules/step.js'
import listscreen from './modules/listscreen.js'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store=new Vuex.Store({
  modules:{department_zr,listscreen,editid,admin,step},
  getters,
  plugins:[createPersistedState({
    key:'admin',
    storage: window.sessionStorage
  })]

})

export default store
