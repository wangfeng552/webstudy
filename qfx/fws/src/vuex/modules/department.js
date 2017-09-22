const department_zr = {
  state: {
    department_zr:[],
    number:[],
    activeName:'',
    roleActiveName:''
  },
  mutations: {
    GETDEPARTID(state, val){
      state.department_zr = val
    },
    GETNUMBER(state,val){
      state.number = val
    },
    GETACTIVENAME(state,val){
      state.activeName = val
    },
    GETROLEACTIVENAME(state,val){
      state.roleActiveName = val
    }
  },
  actions: {
    department_id({commit}, val){
      commit("GETDEPARTID", val)
    },
    number_zr({commit}, val){
      commit("GETNUMBER", val)
    },
    activeNameZr({commit}, val){
      commit("GETACTIVENAME", val)
    },
    roleactiveName_zr({commit}, val){
      commit("GETROLEACTIVENAME", val)
    }
  }
}

export default department_zr
