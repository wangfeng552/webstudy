const washcar = {
  state: {
    userInfo: ''
  },
  mutations: {
    LOGIN(state, val) {
      state.userInfo = val
    }
  },
  actions: {
    login({ commit }, val) {
      commit("LOGIN", val)
    }
  }
}
export default washcar
