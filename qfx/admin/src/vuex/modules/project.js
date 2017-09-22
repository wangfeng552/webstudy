/**
 * Created by pc2 on 2017/8/25.
 */
const project = {
  state: {
    projectSearch: {
      corp_name_cont: '',
      owner_name_cont:'',
      agent_name_cont:'',
      status_eq: '',
      source_eq: '',
      provider_name_cont: '',
      created_at_gteq: '',
      created_at_lteq: '',
      no_or_product_service_name_cont: '',
      year_eq:'',
      corp_principal_name_eq:'',
    },
    projectSource: '',
    projectPage: 1,
    projectImf: {},
    nextStep: false,//开启下一阶段
    closeState: true,//判断是否关闭项目
    stageCategory:'',//当前阶段状态
    stageStatus:'',//当前阶段状态
    projectStatus:''//当前项目状态
  },
  mutations: {
    PROJECTSOURCE(state, val){
      state.projectSource = val
    },
    PROJECTSEARCH(state, val){
      state.projectSearch = val
    },
    PROJECTPAGE(state, val){
      state.projectPage = val
    },
    PROJECTIMF(state, val){
      state.projectImf = val
    },
    //开启下一阶段
    NEXTSTEP(state, val){
      state.nextStep = val
    },
    CLOSESTATE(state, val){
      state.closeState = val
    },
    STAGECATEGORY(state, val){
      state.stageCategory = val
    },
    STAGESTATUS(state, val){
      state.stageStatus = val
    },
    PROJECTSTATUS(state, val){
      state.projectStatus = val
    },

  },
  actions: {
    projectSource({commit}, val){
      commit("PROJECTSOURCE", val)
    },
    projectSearch({commit}, val){
      commit("PROJECTSEARCH", val)
    },
    projectPage({commit}, val){
      commit("PROJECTPAGE", val)
    },
    projectImf({commit}, val){
      commit("PROJECTIMF", val)
    },
    //开启下一阶段
    nextStep({commit}, val){
      commit("NEXTSTEP", val)
    },
    //判断是否关闭项目

    closeState({commit}, val){
      commit("CLOSESTATE", val)
    },
    //判断当前阶段状态

    stageCategory({commit}, val){
      commit("STAGECATEGORY", val)
    },
    //判断当前阶段状态

    stageStatus({commit}, val){
      commit("STAGESTATUS", val)
    },
    //判断当前项目状态
    projectStatus({commit}, val){
      commit("PROJECTSTATUS", val)
    }

  }
}

export default project
