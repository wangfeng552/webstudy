/**
 * Created by ADMIN on 2017/7/21.
 */
const stage_v = {
  state: {
    change_tab_v:-100,
    change_page:-100,
    current_providers:undefined,
    type_service_add:-100,
  },
  mutations: {
    GETTAB(state, val){
      state.change_tab_v = val
    },
    GETPAGE(state, val){
      state.change_page = val
    },
    GETPROVIDERS(state, val){
      state.current_providers = val
    },
    GETSERVICE(state, val){
      state.type_service_add = val
    },

  },
  actions: {
    get_chnage_tab({commit}, val){
      commit("GETTAB", val)
    },
    get_page({commit}, val){
      commit("GETPAGE", val)
    },
    get_current_paoviders({commit}, val){
      commit("GETPROVIDERS", val)
    },
    get_type_service_add({commit}, val){
      commit("GETSERVICE", val)
    }
  }
}

export default stage_v
