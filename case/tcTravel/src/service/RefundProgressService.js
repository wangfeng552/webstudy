import fetch from  '../config/fetch';
class RefundProgressService {
  //退款进度
  refundProgress(params) {
    return fetch('pointgate/ly/city/query', params, 'POST')
  }
}

export default new RefundProgressService()