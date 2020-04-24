import * as types from '../actions/ActionTypes';

const initialState = {
  phone: '',
  SMSCode: '',
  codeButton: {
    status: 'idle',
    value: '获取验证码',
  },
};

export default function SafeSetting(state = initialState, action) {
  switch (action.type) {
    case types.SAFE_EDIT_PHONE:
      return Object.assign({}, state, {
        phone: action.phone,
      });
    case types.SAFE_GET_SMSCODE:
      return Object.assign({}, state, {
        SMSCode: action.SMSCode,
      });
    case types.SAFE_SET_CODEBUTTON:
      return Object.assign({}, state, {
        codeButton: {
          status: action.status,
          value: action.value,
        },
      });
    case types.SAFE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
