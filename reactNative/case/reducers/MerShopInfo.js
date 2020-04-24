import * as types from '../actions/ActionTypes';

const initialState = {
  shopImg: '',
  shopName: '',
  shopPhone: '',
  shopAddress: '',
  isOpen: false,
  shopDetail: '',
};

export default function MerShopInfo(state = initialState, action) {
  switch (action.type) {
    case types.MER_SHOP_INFO_GET:
      return Object.assign({}, state, {
        shopImg: action.shopImg,
        shopName: action.shopName,
        shopPhone: action.shopPhone,
        shopAddress: action.shopAddress,
        isOpen: action.isOpen,
        shopDetail: action.shopDetail,
      });
    case types.MER_SHOP_IS_OPEN:
      return Object.assign({}, state, {
        isOpen: action.isOpen,
      });
    case types.MER_SHOP_INFO_CLEAR:
      return initialState;
    default:
      return state;
  }
}
