import * as types from '../actions/ActionTypes';

const initialState = {
  sections: [
    {
      title: '商铺管理',
      data: [
        {tit: '商铺信息', img: require('../images/ic_MerchantInfo.png')},
        {tit: '商户认证', img: require('../images/ic_MerchantCA.png')},
        {tit: '积分管理', img: require('../images/ic_point.png')},
      ],
      index: 0,
    },
    {
      title: '员工管理',
      data: [{tit: '员工管理', img: require('../images/ic_account.png')}],
      index: 1,
    },
    {
      title: '消息',
      data: [
        // {tit: '安全设置', img: require('../images/ic_user.png')},
        {tit: '消息', img: require('../images/ic_news.png')},
      ],
      index: 2,
    },
  ],
  info: {
    imgIcon: '',
    shopName: '--',
    shopId: '--',
    isAuthentication: '',
    staffNo: '',
  },
  uncheckPersonCount: 0,
};

export default function MerMine(state = initialState, action) {
  switch (action.type) {
    case types.MERMINE_ADD_INFO:
      return Object.assign({}, state, {
        info: action.info,
      });
    case types.MERMINE_UNCHECKED_PERSON:
      return Object.assign({}, state, {
        uncheckPersonCount: action.uncheckPersonCount,
      });
    case types.MERMINE_INFO_CLEAR:
      return initialState;
    default:
      return state;
  }
}
