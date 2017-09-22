const form_zr = {
  state: {
    form_zr:'',
    detailsCont:{content:''},
    summary:'',
    formTop:'',
    formServiceId:'',
    formSearch:{
      name_cont: '',
      owner_eq: '',
      category_eq: '',
      service_id_eq: '',
      created_at_gteq: '',
      created_at_lteq: '',
      provider_id_eq:'',
      service_category_id_eq:''
    },
    formPage:1,
    editable_zr:'',//表单是否可编辑
  },
  mutations: {
    GETFWSID(state, val){
      state.form_zr = val
    },
    GETCONTENT(state,val){
      state.detailsCont = val
    },
    GETQZSM(state,val){
      state.summary = val
    },
    GETFORMTOP(state,val){
      state.formTop = val
    },
    FORMSERVICEID(state,val){
      state.formServiceId = val
    },
    FORMSEARCH(state,val){
      state.formSearch = val
    },
    FORMPAGE(state,val){
      state.formPage = val
    },
    EDITABLE(state,val){
      state.editable_zr = val
    },
  },
  actions: {
    get_fws_id({commit}, val){
      commit("GETFWSID", val)
    },
    getContent({commit}, val){
      commit("GETCONTENT", val)
    },
    getQzsm({commit}, val){
      commit("GETQZSM", val)
    },
    getformtop({commit}, val){
      commit("GETFORMTOP", val)
    },
    formServiceId({commit}, val){
      commit("FORMSERVICEID", val)
    },
    formSearch({commit}, val){
      commit("FORMSEARCH", val)
    },
    formPage({commit}, val){
      commit("FORMPAGE", val)
    },
    editable_zr({commit}, val){
      commit("EDITABLE", val)
    },
  }
}

export default form_zr
