import fetch from  '../config/fetch';
import {cookieUtil} from'../assets/js/common';
class CheckLoginService {
	//获取商品列表
	getLogin(params) {
		return fetch('pointgate/service/validate/loginToken', params, 'POST','fetch',false)
	}
}

export default new CheckLoginService()