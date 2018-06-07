import fetch from  '../config/fetch';
class GetServerDateService {
  //获取系统时间
  getServerTime(params) {
    return fetch('pointgate/common/getServerDate', params, 'GET')
  }
}

export default new GetServerDateService()