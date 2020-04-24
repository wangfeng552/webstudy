import * as types from '../actions/ActionTypes';

const initialState = {
  account: '',
  password: '',
  rePassword: '',
};

export default function RegisterInfo(state = initialState, action) {
  switch (action.type) {
    case types.REGISTERINFO_INPUT_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account,
      });
    case types.REGISTERINFO_INPUT_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case types.REGISTERINFO_INPUT_REPASSWORD:
      return Object.assign({}, state, {
        rePassword: action.rePassword,
      });
    default:
      return state;
  }
}
