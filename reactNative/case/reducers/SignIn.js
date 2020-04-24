import * as types from '../actions/ActionTypes';

const initialState = {
  modle: 0,
  phone: '13761401502',
  password: '',
  code: '',
  tempToken: '',
  codeButton: {
    status: 'idle',
    value: '获取验证码',
  },
};

export default function SignIn(state = initialState, action) {
  switch (action.type) {
    case types.SIGNIN_SET_MODLE:
      return Object.assign({}, state, {
        modle: action.modle,
      });
    case types.SIGNIN_INPUT_PHONE:
      return Object.assign({}, state, {
        phone: action.phone,
      });
    case types.SIGNIN_INPUT_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case types.SIGNIN_INPUT_CODE:
      return Object.assign({}, state, {
        code: action.code,
      });
    case types.SIGNIN_SET_CODEBUTTON:
      return Object.assign({}, state, {
        codeButton: {
          status: action.status,
          value: action.value,
        },
      });
    case types.SIGNIN_SET_TEMPTOKEN:
      return Object.assign({}, state, {
        tempToken: action.tempToken,
      });
    case types.SIGNIN_CLEAR:
      return initialState;
    default:
      return state;
  }
}
