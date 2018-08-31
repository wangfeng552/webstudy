const listscreen = {
  state: {
    // 客户管理数据
    client:{
      formInline:{
        name_cont:'',
        status_eq:'',
        created_at_gteq:'',//开始时间
        created_at_lteq: '',//结束时间
        province_cont: '',//省
        city_cont: '', //市
        district_cont: '',//区
        corp_principals_principal_name_cont:'',//企业负责人
        sortsInfo:''
      },
      listpage:1
    },
    // 项目管理数据
    projectlist:{
      projectlist:{
        no_cont: '',//项目编号
          product_service_name_cont: '',//项目名字
          corp_name_cont: '',//企业用户
          status_eq:'proceeding',//项目状态
          source_eq: '',//项目来源
          year_eq:'',//申报年份
          product_service_category_id_eq: '',//服务分类
          corp_principal_name_eq:'',//企业负责人
          owner_name_cont: '',//项目负责人
          agent_name_cont:'',//经办人
      },
      projectpage:1,
      queryHide_zr:'',//高级选项是否显示
    }
  },
  mutations: {
    GETLISTSCREEN(state, val){
      state.client = val
    },
    GETPROJECTLIST(state, val){
      state.projectlist = val
    },
    // 清空客户管理
    CLIENT(state){
      state.client.formInline.name_cont = '',
      state.client.formInline.status_eq = '',
      state.client.formInline.created_at_gteq = '',
      state.client.formInline.created_at_lteq = '',
      state.client.formInline.province_cont = '',
      state.client.formInline.city_cont = '',
      state.client.formInline.district_cont = '',
      state.client.formInline.corp_principals_principal_name_cont = '',
      state.client.formInline.sortsInfo = '',
      state.client.listpage = 1
    },
    // 清空项目管理
    PROJECT(state){
      state.projectlist.projectlist.no_cont = '',
      state.projectlist.projectlist.product_service_name_cont = '',
      state.projectlist.projectlist.corp_name_cont = '',
      state.projectlist.projectlist.status_eq = '',
      state.projectlist.projectlist.source_eq = '',
      state.projectlist.projectlist.year_eq = '',
      state.projectlist.projectlist.product_service_category_id_eq = '',
      state.projectlist.projectlist.owner_name_cont = '',
      state.projectlist.projectlist.corp_principal_name_eq = '',
      state.projectlist.projectlist.agent_name_cont = '',
      state.projectlist.projectpage = 1
      state.projectlist.queryHide_zr = ''
    }
  },
  actions: {
    getlistscreen({commit}, val){
      commit("GETLISTSCREEN", val)
    },
    getprojectlist({commit}, val){
      commit("GETPROJECTLIST", val)
    },
    client({commit}){
      commit("CLIENT")
    },
    project({commit}){
      commit("PROJECT")
    }
  }
}

export default listscreen
