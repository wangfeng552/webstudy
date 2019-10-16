import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  scene: '',
  isWeChat: false,
  showNull: false,
  loginStatus: false,
  ticketList: [],
  cityList: [],
  orderList: [],
  orderDetail: {},
  time: {},
  orderUser: {},
  nowRoute:'',
  invoiceInfo: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
