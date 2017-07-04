const loc = {
  //放置公用状态  即共享的数据
  state: {
    name:JSON.parse(sessionStorage.getItem('SESSION_NAME')) || {}
  },
  mutations: {
    LOGIN(state,val = {}){
      state.name = Object.assign({},state.name,val);
      sessionStorage.setItem('SESSION_NAME', JSON.stringify(val))
    }
  },
  actions: {
    login({commit}, val){
      commit("LOGIN", val)
    }
  }
}

export default loc


