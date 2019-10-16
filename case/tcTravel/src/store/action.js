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
  GET_INVOICE_INFO,
} from './mutation-types.js'



export default {
  changeNowRoute({commit,state},data) {
    commit(CHANGE_NOW_ROUTE,{data});
  },
  confirmLogin({commit,state},data) {
    commit(GET_LOGINSTATUS,{data});
  },
  confirmWeChat({commit,state},data) {
    commit(GET_ISWECHAT,{data});
  },
  getTicketList({commit,state},data) {
    commit(GET_TICKET_LIST,{data});
  },
  getCityList({commit,state},data) {
    commit(GET_CITY_LIST,{data});
  },
  getOrderList({commit,state},data) {
    commit(GET_ORDER_LIST,{data});
  },
  getOrderDetail({commit,state},data) {
    commit(GET_ORDER_DETAIL,{data});
  },
  getTime({commit,state},data) {
    commit(GET_Time,{data});
  },
  getOrderUser({commit,state}, data){
    commit(GET_ORDER_USER, {data});
  },
  getInvoiceInfo({commit,state}, data){
    commit(GET_INVOICE_INFO, {data});
  },
}
