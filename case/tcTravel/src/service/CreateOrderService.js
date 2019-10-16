import fetch from  '../config/fetch';
class CreateOrderService {
  //下单接口
  createOrder(params) {
    return fetch('pointgate/ly/order/create', params, 'POST')
  }
}

export default new CreateOrderService()