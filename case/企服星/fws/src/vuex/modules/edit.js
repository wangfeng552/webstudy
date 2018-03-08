const editid_zr = {
  state: {
    editid_zr:''
  },
  mutations: {
   GETFWSID(state, val){
      state.editid_zr = val
    }
  },
  actions: {
    get_fws_id({commit}, val){
      commit("GETFWSID", val)
    }
  }
}

export default editid_zr
