import * as types from '../actions/ActionTypes';

const initialState = {
  list: [
    {
      createTimeShow: '2019-11-13 15:54',
      title: '您获得10000积分',
      content: '您于2019-11-13 15：54收到一份来自"xxx"转增的10000积分',
    },
    {
      createTimeShow: '2019-11-13 15:54',
      title: '您获得10000积分',
      content: '您于2019-11-13 15：54收到一份来自"xxx"转增的10000积分',
    },
  ],
  requestType: false,
  start: 0,
  length: 10,
  total: 0,
};

export default function MerInformation(state = initialState, action) {
  switch (action.type) {
    case types.MERINFORMATION_GET_LIST:
      let listData = [];
      if (action.start === 0) {
        listData = action.list;
      } else if (action.start - state.start === 10) {
        listData = state.list.concat(action.list);
      }
      return Object.assign({}, state, {
        list: listData,
        total: action.total,
        start: action.start,
      });
    case types.MERINFORMATION_REQUEST_TYPE:
      return Object.assign({}, state, {
        requestType: action.requestType,
      });
    case types.MERINFORMATION_CLEAR:
      return initialState;
    default:
      return state;
  }
}
