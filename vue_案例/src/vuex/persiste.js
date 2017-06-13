const persiste= {
  state: {
    count: 0,
    name:'',
    number:'',
  },
  mutations: {
    addname(state,val){
      state.name = val.name
      state.number = val.number
    },
    delper(state){
      localStorage.removeItem('wf')
      // window.localStorage.removeItem('wf')
    }
  },
}

export default persiste


