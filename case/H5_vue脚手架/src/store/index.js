import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store=new Vuex.Store({
  modules:{admin},
  getters,
  plugins:[createPersistedState({
    key:'admin'
  })]

})
export default store
