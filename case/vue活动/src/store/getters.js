const getters = {
  userInfo: state => state.admin.userInfo,
  token: state => state.admin.userInfo.token,
  sourceParam: state => state.admin.sourceParam
};
export default getters;
