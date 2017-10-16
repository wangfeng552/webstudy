import fetch from  '../config/fetch';
import {cookieUtil} from'../assets/js/common';
var token = cookieUtil.get('login_token') || '';

class GoodsListService {
	getGoodsList(params) {
		if(token){params.login_token = token;}
		return fetch('goods/queryGoods', params,'POST');
	}
}
export default new GoodsListService();

