import * as types from '../actions/ActionTypes';

const initialState = {
  count: 1,
};

export default function Splash(state = initialState, action) {
  switch (action.type) {
    case types.SPLASH_ADD_COUNT:
      return Object.assign({}, state, {
        count: action.count,
      });
    default:
      return state;
  }
}
