import fetch from  '../config/fetch';
class GetOrderListService {
  //获取订单列表
  getOrders(params) {
    return fetch('pointgate/ly/order/query', params, 'POST')
  }
}

export default new GetOrderListService()