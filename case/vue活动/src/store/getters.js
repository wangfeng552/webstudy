const getters = {
  userInfo: state => state.admin.userInfo,
  token: state => state.admin.userInfo.token,
  sourceParam: state => state.admin.sourceParam,
  activityId: state => state.admin.activityId
};
export default getters;
