import * as types from '../actions/ActionTypes';

const initialState = {
  name: '',
  oldPhone: '',
  oldCode: '',
  phone: '',
  SMSCode: '',
  codeButton: {
    status: 'idle',
    value: '获取验证码',
  },
  addressName: '',
  shopAddress: '',
  addressCode: {},
  isBindPhone: false,
  shopDetail: '',
};

export default function MerEditShop(state = initialState, action) {
  switch (action.type) {
    case types.MER_EDIT_SHOP_NAME:
      return Object.assign({}, state, {
        name: action.name,
      });
    case types.MER_EDIT_SHOP_TEL:
      return Object.assign({}, state, {
        phone: action.phone,
      });
    case types.MER_EDIT_SHOP_ADDRESS_CODE:
      return Object.assign({}, state, {
        addressCode: action.addressCode,
      });
    case types.MER_EDIT_SHOP_OLD_TEL:
      return Object.assign({}, state, {
        oldPhone: action.oldPhone,
      });
    case types.MER_EDIT_SHOP_OLD_SMSCODE:
      return Object.assign({}, state, {
        oldCode: action.oldCode,
      });
    case types.MER_EDIT_SHOP_GET_SMSCODE:
      return Object.assign({}, state, {
        SMSCode: action.SMSCode,
      });
    case types.MER_EDIT_SHOP_ADDRESS_AREA:
      return Object.assign({}, state, {
        shopAddress: action.shopAddress,
      });
    case types.MER_EDIT_SHOP_SET_CODEBUTTON:
      return Object.assign({}, state, {
        codeButton: {
          status: action.status,
          value: action.value,
        },
      });
    case types.MER_EDIT_SHOP_ADDRESS_NAME:
      return Object.assign({}, state, {
        addressName: action.addressName,
      });
    case types.MER_EDIT_SHOP_BIND_PHONE:
      return Object.assign({}, state, {
        isBindPhone: action.isBindPhone,
      });
    case types.MER_EDIT_SHOP_INPUT_SHOP_DETAIL:
      return Object.assign({}, state, {
        shopDetail: action.shopDetail,
      });
    case types.MER_EDIT_SHOP_CLEAR:
      return initialState;
    default:
      return state;
  }
}
