const admin = {
  state: {
    admin:''
  },
  mutations: {
    LOGIN(state, val){
      state.admin = val
    },
    LOGOUT(state){
      state.admin = ''
    }
  },
  actions: {
    login({commit}, val){
      commit("LOGIN", val)
    },
    logout({commit}){
      commit("LOGOUT")
    }
  }
}

export default admin
