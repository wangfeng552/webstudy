import fetch from  '../config/fetch';

class GoShareService {
  //分享
  btnShare(params){
    return fetch('pointgate/wechat/jsapi/auth.htm',params,'GET','fetch',false)
  }
}

export default new GoShareService()
