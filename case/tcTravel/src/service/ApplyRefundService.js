import fetch from  '../config/fetch';
class ApplyRefundService {
  //申请退款
  applyRefund(params) {
    return fetch('pointgate/ly/city/query', params, 'POST')
  }
}

export default new ApplyRefundService()