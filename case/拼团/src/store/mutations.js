import {
  GET_LOGINSTATUS,
  GET_ISWECHAT,
  GET_INDEX_LIST,
  GET_WAITING_LIST,
  GET_GROUPING_LIST
} from './mutation-types.js'


export default {
  [GET_LOGINSTATUS](state, payload) {
    state.loginStatus = payload.data;
  },
  [GET_ISWECHAT](state, payload) {
    state.isWeChat = payload.data;
  },
  [GET_INDEX_LIST](state, payload) {
    state.indexList = payload.data;
  },
  [GET_WAITING_LIST](state, payload) {
    state.waitingList = payload.data;
  },
  [GET_GROUPING_LIST](state, payload) {
    state.groupingList = payload.data;
  }
}
