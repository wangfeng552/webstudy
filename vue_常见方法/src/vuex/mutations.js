import {ADD, GETCOUNT} from './mutations-types'
export default {
  [ADD](state) {
    state.name++
  },
  [GETCOUNT](state, data) {
    state.count = data.age
  }
}
