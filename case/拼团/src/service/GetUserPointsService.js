import fetch from  '../config/fetch';

class GetUserPointsService {
  //获取用户积分
  getPoints(params){
    return fetch('pointgate/service/member/points/query',params,'POST','fetch',false)
  }
}

export default new GetUserPointsService()
