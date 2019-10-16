import fetch from  '../config/fetch';
class GetHotCityService {
  //获取热门城市
  getHotCity(params) {
    return fetch('pointgate/service/ad/recommend', {keyId:'TC_HotCity_key'}, 'POST')
  }
}

export default new GetHotCityService()