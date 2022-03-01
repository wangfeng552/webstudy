import * as types from '../actions/ActionTypes';
const initialState = {
  total: 0,
  currentIndex: 0,
  pageLength: 10,
  history: [
    {title: '发放给185******59', dateShow: '2020-01-06 14:50:00', count: '-10'},
    {title: '系统分发', dateShow: '2020-01-06 14:50:00', count: '+10'},
    {title: '使用', dateShow: '2020-01-06 14:50:00', count: '-10'},
  ],
  pullUpRefreshing: false,
  pullDownRefreshing: false,
};

export default function MerPointDetail(state = initialState, action) {
  switch (action.type) {
    case types.MER_POINT_DETAIL_PULLDOWN:
      return Object.assign({}, state, {
        pullDownRefreshing: action.pullDownRefreshing,
      });
    case types.MER_POINT_DETAIL_PULLUP:
      return Object.assign({}, state, {
        pullUpRefreshing: action.pullUpRefreshing,
      });

    case types.MER_POINT_DETAIL_GET_INFO: {
      if (action.currentIndex === state.currentIndex) {
        let h = [];
        if (action.currentIndex === 0) {
          h = action.history;
        } else {
          h = [...state.history, ...action.history];
        }
        let index = parseInt(action.currentIndex, 10) + action.history.length;
        return Object.assign({}, state, {
          history: h,
          total: action.total,
          currentIndex: index,
        });
      } else {
        return Object.assign({}, state, {});
      }
    }
    case types.MER_POINT_DETAIL_CLEAR:
      return initialState;
    default:
      return state;
  }
}
