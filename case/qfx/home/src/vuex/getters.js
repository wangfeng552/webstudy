const getters = {
  user_id:state => state.user.user.user.id,
  name:state => state.user.user.user.name,
  token:state => state.user.user.token,
  phonenumber:state => state.user.user.user.phone_number,
  avatar:state => state.user.user.user.avatar,
  error:state => state.user,
  user:state => state.user.user.user,
  action:state => state.project.action,
  tabid:state => state.user.tabId,
  revenuezr:state => state.project.revenue,
  servicelist:state => state.project.servicelist,
  listPage:state => state.project.listPage,
  change_tab_v:state => state.project.change_tab_v,
  projectTab:state => state.project.projectTab,
}
export default getters
