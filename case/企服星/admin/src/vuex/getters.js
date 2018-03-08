const getters = {
  user_id:state => state.admin.admin.user.id,
  name:state => state.admin.admin.user.name,
  token:state => state.admin.admin.token,
  user_type:state => state.admin.admin.user.admin_role,
  form_id_zr:state => state.formzr.form_zr.aaa,
  details_zr:state => state.formzr.detailsCont.content, //后来表单数据
  summary_zr:state => state.formzr.summary.summary, //前置说明
  // preview_zr:state => state.formzr.preview.previewdetails,//预览存入的数据
  formtop_zr:state => state.formzr.formTop.formTop,//详情页头部信息
  change_tab_v:state => state.stage.change_tab_v,
  change_page:state => state.stage.change_page,
  current_providers:state =>  state.stage.current_providers,
  type_service_add:state =>  state.stage.type_service_add,
  projectSource:state =>  state.project.projectSource,
  projectSearch:state =>  state.project.projectSearch,
  projectPage:state =>  state.project.projectPage,
  projectImf:state =>  state.project.projectImf,//项目详情内容
  formServiceId:state =>  state.formzr.formServiceId,
  formSearch:state =>  state.formzr.formSearch,
  formPage:state =>  state.formzr.formPage,
  editable_zr:state =>  state.formzr.editable_zr,
  tradeSearch:state =>  state.trade.tradeSearch,
  tradePage:state =>  state.trade.tradePage,
  receiverIndex:state =>  state.trade.receiverIndex,
  nextStep:state =>  state.project.nextStep,//开启项目下一阶段
  closeState:state =>  state.project.closeState,//判断项目是否被关闭
  stageCategory:state =>  state.project.stageCategory,//当前阶段状态
  stageStatus:state =>  state.project.stageStatus,//当前阶段状态
  projectStatus:state =>  state.project.projectStatus,//当前项目状态

}
export default getters
