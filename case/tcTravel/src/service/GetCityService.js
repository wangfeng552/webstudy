import fetch from  '../config/fetch';
class GetCityService {
  //获取城市列表
  getCity(params) {
    return fetch('pointgate/ly/city/query', params, 'POST')
  }
}

export default new GetCityService()