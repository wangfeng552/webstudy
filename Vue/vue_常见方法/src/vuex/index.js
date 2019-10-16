import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
const state = {
  name: 0,
  count: '你好'
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})

export default store
