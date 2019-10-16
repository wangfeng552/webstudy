import fetch from  '../config/fetch';
import {cookieUtil} from'../assets/js/common';
var token = cookieUtil.get('login_token') || '';
class GoodDetailService {
	getGoodsDetail(msg){
		return fetch('goodsinfo/goodsInfo', msg, 'POST');
	}
	
	addInCart(params){
		// params.login_token = token;
		return fetch('trolley/addCart', params, 'POST');
	}
};
export default new GoodDetailService();