const city={
  state:{
    city:''
  },
  mutations:{
    GETCITY(state,val){
      state.city = val
    },
    CANCELCITY(state){
      // Object.keys(state).forEach(k => Vue.delete(state, k))
      state.city = ''
    }
  },

  actions:{
    getCity({commit},val){
      commit('GETCITY',val)
    },
    cancelCity({commit}){
      commit('CANCELCITY')
    }
  }
}
export default city
