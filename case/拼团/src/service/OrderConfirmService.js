import fetch from  '../config/fetch';

class OrderConfirmService {
  //订单确认页获取商品详情
  getGoodsDetail(params){
    return fetch('pointgate/collage/order/confirm',params,'POST')
  }
  //订单确认页，订单提交
  orderDown(params){
    return fetch('pointgate/collage/order/submit',params,'POST')
  }
}

export default new OrderConfirmService()
