const getters = {
  token:state => state.admin.admin.token,
  userName:state => state.admin.admin.user.name,  //用户名
  phone_number:state => state.admin.admin.user.phone_number,// 手机号
  fixed_phone:state => state.admin.admin.user.fixed_phone, // 固定电话
  dist_type:state => state.admin.admin.user.type, // 区分从admin登录还是服务商登录
  userId:state => state.admin.admin.user.id,
  provider_id:state => state.admin.admin.user.provider_id,
  provider_name:state => state.admin.admin.user.provider_name,
  department:state => state.admin.admin.user.department, //部门
  editid_id_zr:state =>state.editid.editid_zr.editId,
  stepName:state => state.step.step,
  stageStaus:state => state.step.stageStaus,
  currentProject:state => state.step.currentProject,
  hasRoot:state => state.step.hasRoot,
  listscreen_zr:state => state.listscreen.client.formInline,//客户管理的筛选条件
  listpage:state => state.listscreen.client.listpage,//客户管理的当前分页
  sortsInfo:state => state.listscreen.client.sortsInfo,//顺序

  projectlist_zr:state => state.listscreen.projectlist.projectlist,//项目管理筛选条件
  projectpage:state => state.listscreen.projectlist.projectpage,//项目管理的当前分页
  queryHide_zr:state => state.listscreen.projectlist.queryHide_zr,//项目管理的当前分页
  currentUser:state => state.admin.admin.user,
  currentStage:state => state.step.currentStage,
  departmentZr:state => state.department_zr.department_zr.departmentZr,//部门ID
  numberZr:state => state.department_zr.number.numberZr,//存成员名称
  activeName_zr:state => state.department_zr.activeName.activeName_zr,//存部门、角色的tab名称
  roleactiveName_zr:state => state.department_zr.roleActiveName.roleactiveName_zr,//权限设置，选择成员tab名称
  hasJumpInApply:state => state.step.hasJumpInApply,
  yearChange:state => state.step.yearChange,
}
export default getters
