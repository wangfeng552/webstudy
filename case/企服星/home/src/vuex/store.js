import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import project from './modules/project'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store=new Vuex.Store({
   modules:{user,project},
    getters,
  plugins:[createPersistedState({
    key:'items',
    // storage: window.sessionStorage
  })]

})

export default store
