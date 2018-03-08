const user = {
  state: {
    user:'',
    error:'',
    tabId:'',//切换专项资金和税收减免的ID
  },
  mutations: {
    LOGIN(state, val){
      state.user = val
    },
    LOGOUT(state){
      state.user = ''
    },
    TABID(state,val){
      state.tabId = val
    },
  },
  actions: {
    login({commit}, val){
      commit("LOGIN", val)
    },
    logout({commit}){
      commit("LOGOUT")
    },
    tabID_zr({commit},val){
      commit("TABID",val)
    },
  }
}

export default user
