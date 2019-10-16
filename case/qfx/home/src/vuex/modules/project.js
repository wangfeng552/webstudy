const project = {
  state: {
    action:'',
    revenue:'税收减免',//税收减免
    servicelist:[],
    listPage:1,
    change_tab_v:-100,
    projectTab:0,//项目详情tab值
  },
  mutations: {
    getImf(state,val){
      state.action = val
    },
    GETTAB(state, val){
      state.change_tab_v = val
    },
    REVENUEZR(state,val){
      state.revenue = val
    },
    SERVICELIST(state,val){
      state.servicelist = val
    },
    LISTPAGE(state,val){
      state.listPage = val
    },
    PROJECTTAB(state,val){
      state.projectTab = val
    },

  },
  actions: {
    getImf({commit},val){
      commit("getImf",val)
    },
    revenueZr({commit},val){
      commit("REVENUEZR",val)
    },
    servicelist({commit},val){
      commit("SERVICELIST",val)
    },
    listPage({commit},val){
      commit("LISTPAGE",val)
    },
    get_chnage_tab({commit}, val){
      commit("GETTAB", val)
    },
    //项目详情tab切换
    projectTab({commit}, val){
      commit("PROJECTTAB", val)
    },

  }
}

export default project
