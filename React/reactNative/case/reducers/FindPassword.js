import * as types from '../actions/ActionTypes';

const initialState = {
  phone: '',
  password: '',
  repassword: '',
  code: '',
  token: '',
  codeButton: {
    status: 'idle',
    value: '获取验证码',
  },
  isShowPasswordDiv: true,
};

export default function FindPassword(state = initialState, action) {
  switch (action.type) {
    case types.FIND_INPUT_PHONE:
      return Object.assign({}, state, {
        phone: action.phone,
      });
    case types.FIND_INPUT_CODE:
      return Object.assign({}, state, {
        code: action.code,
      });
    case types.FIND_INPUT_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case types.FIND_INPUT_SECOND_PASSWORD:
      return Object.assign({}, state, {
        repassword: action.repassword,
      });
    case types.FIND_SET_CODEBUTTON:
      return Object.assign({}, state, {
        codeButton: {
          status: action.status,
          value: action.value,
        },
      });
    case types.FIND_SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
    case types.FIND_SHOW_PASSWORD_DIV:
      return Object.assign({}, state, {
        isShowPasswordDiv: action.isShowPasswordDiv,
      });
    case types.FIND_CLEAR:
      return initialState;
    default:
      return state;
  }
}
