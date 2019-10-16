import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  scene:'',
  isWeChat: false,
  showNull: false,
  loginStatus: false,
  indexList:{},
  waitingList:[],
  groupingList:[]
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
