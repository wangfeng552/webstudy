import {
  GET_LOGINSTATUS,
  GET_ISWECHAT,
  GET_INDEX_LIST,
  GET_WAITING_LIST,
  GET_GROUPING_LIST
} from './mutation-types.js'



export default {
  confirmLogin({commit,state},data) {
    commit(GET_LOGINSTATUS,{data});
  },
  confirmWeChat({commit,state},data) {
    commit(GET_ISWECHAT,{data});
  },
  getIndexList({commit,state},data) {
    commit(GET_INDEX_LIST,{data});
  },
  getWaitingList({commit,state},data) {
    commit(GET_WAITING_LIST,{data});
  },
  getGroupingList({commit,state},data) {
    commit(GET_GROUPING_LIST,{data});
  }
}
