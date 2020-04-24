import Vue from 'vue'
import Vuex from 'vuex'
import washcar from './modules/washcar'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { washcar },
  getters,
  plugins: [createPersistedState({
    key: 'washcar'
  })]

})
export default store
