import * as types from '../actions/ActionTypes';
const initialState = {
  avatar: '',
  token: '',
  username: '', //权益号
  mobile: '',

  isGuest: true, // 1=游客
  telePhone: '',
};

export default function UserInfo(state = initialState, action) {
  switch (action.type) {
    case types.USERINFO_INIT_USERTOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
    case types.USERINFO_UPGRADE_USERTOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
    case types.USERINFO_SET_AVATAR:
      return Object.assign({}, state, {
        avatar: action.avatar,
      });
    case types.USERINFO_SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        avatar: action.avatar,
        username: action.username,
        mobile: action.mobile,
        pointCount: action.pointCount,
        isGuest: action.isGuest,
      });
    case types.USERINFO_SET_BASIC:
      return Object.assign({}, state, {
        token: action.token,
        avatar: action.avatar,
        username: action.username,
        mobile: action.mobile,
        pointCount: action.pointCount,
        brandIcons: action.brandIcons,
        isGuest: action.isGuest,
      });
    case types.USERINFO_SET_MOBILE:
      return Object.assign({}, state, {
        mobile: action.mobile,
        token: action.token,
      });
    case types.USERINFO_SET_PHONE:
      return Object.assign({}, state, {
        telePhone: action.telePhone,
      });
    case types.USERINFO_SET_REALNAMEAUTH:
      return Object.assign({}, state, {
        isCertify: action.isCertify,
      });
    case types.USERINFO_SET_VEHICLELIST:
      return Object.assign({}, state, {
        vehicleList: action.vehicleList,
      });
    case types.USERINFO_SET_VEHICLELIST:
      return Object.assign({}, state, {
        vehicleList: action.carList,
      });
    case types.USERINFO_SET_POINTCOUNT:
      return Object.assign({}, state, {
        pointCount: action.pointCount,
      });
    case types.USERINFO_SET_UPGRADE:
      return Object.assign({}, state, {
        version: {
          isUpgrade: action.isUpgrade,
          isForce: action.isForce,
          code: action.code,
          name: action.name,
        },
      });
    case types.USERINFO_CLEAR:
      return initialState;
    default:
      return state;
  }
}
