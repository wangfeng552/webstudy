import {ADD, GETCOUNT} from './mutations-types'

export default {
  add({commit}) {
    commit(ADD)
  },
  getcount({commit}, data) {
    commit(GETCOUNT, data)
  }
}
