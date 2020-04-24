import * as types from '../actions/ActionTypes';

const initialState = {
  phone: '',
  SMSCode: '',
  account: '',
  password: '',
  rePassword: '',
  codeButton: {
    status: 'idle',
    value: '获取验证码',
  },
};

export default function Register(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_INPUT_PHONE:
      return Object.assign({}, state, {
        phone: action.phone,
      });
    case types.REGISTER_INPUT_SMSC:
      return Object.assign({}, state, {
        SMSCode: action.SMSCode,
      });
    case types.REGISTER_INPUT_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account,
      });
    case types.REGISTER_INPUT_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case types.REGISTER_INPUT_REPASSWORD:
      return Object.assign({}, state, {
        rePassword: action.rePassword,
      });
    case types.REGISTER_SET_CODEBUTTON:
      return Object.assign({}, state, {
        codeButton: {
          status: action.status,
          value: action.value,
        },
      });
    case types.REGISTER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
