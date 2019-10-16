const admin = {
  state: {
    userInfo:'',
    token:''
  },
  mutations: {
    LOGIN(state, val){
      state.userInfo = val
      state.token = '123sadfasdfasdf'
    },
    LOGOUT(state){
      state.token = ''
      state.userInfo = {}
    }
  },
  actions: {
    login({commit}, val){
      commit("LOGIN", val)
    },
    logout({commit}){
      commit("LOGOUT")
      localStorage.clear()
      sessionStorage.clear()
      location.href = '/'
    }
  }
}

export default admin
