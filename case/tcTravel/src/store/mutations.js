import {
  GET_LOGINSTATUS,
  GET_ISWECHAT,
  GET_TICKET_LIST,
  GET_CITY_LIST,
  GET_ORDER_LIST,
  GET_ORDER_DETAIL,
  GET_Time,
  GET_ORDER_USER,
  CHANGE_NOW_ROUTE,
  GET_INVOICE_INFO
} from './mutation-types.js'


export default {
  [CHANGE_NOW_ROUTE](state, payload) {
    state.nowRoute = payload.data;
  },
  [GET_LOGINSTATUS](state, payload) {
    state.loginStatus = payload.data;
  },
  [GET_ISWECHAT](state, payload) {
    state.isWeChat = payload.data;
  },
  [GET_TICKET_LIST](state, payload) {
    state.ticketList = payload.data;
  },
  [GET_CITY_LIST](state, payload) {
    state.cityList = payload.data;
  },
  [GET_ORDER_LIST](state, payload) {
    state.orderList = payload.data;
  },
  [GET_ORDER_DETAIL](state, payload) {
    state.orderDetail = payload.data;
  },
  [GET_Time](state, payload) {
    state.time = payload.data;
  },
  [GET_ORDER_USER](state, payload){
    state.orderUser = payload.data;
  },
  [GET_INVOICE_INFO](state, payload){
    state.invoiceInfo = payload.data;
  }
}
