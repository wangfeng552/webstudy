import fetch from  '../config/fetch';
class CancelOrderService {
  //取消订单
  cancelOrder(params) {
    return fetch('pointgate/ly/order/cancel', params, 'POST')
  }
}

export default new CancelOrderService()