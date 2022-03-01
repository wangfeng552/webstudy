import * as types from '../actions/ActionTypes';

const initialState = {
  recycleId: '',
};

export default function MerCouponRecycle(state = initialState, action) {
  switch (action.type) {
    case types.MER_COUPON_RECYCLE_INPUT_RECYCLEID:
      return Object.assign({}, state, {
        recycleId: action.recycleId,
      });
    case types.MER_COUPON_RECYCLE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
