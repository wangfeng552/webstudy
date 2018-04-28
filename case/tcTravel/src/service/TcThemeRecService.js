import fetch from  '../config/fetch';
class TcThemeRecService {
  //筛选主题获取
  getTheme(params) {
    return fetch('pointgate/service/ad/recommend', {keyId:'TC_Theme_key'}, 'POST')
  }
}

export default new TcThemeRecService()