import * as types from '../actions/ActionTypes';

const initialState = {
  info: {},
};

export default function MerHome(state = initialState, action) {
  switch (action.type) {
    case types.MERHOME_GET_INFO:
      return Object.assign({}, state, {
        info: action.info,
      });
    case types.MERHOME_INFO_CLEAR:
      return initialState;
    default:
      return state;
  }
}
