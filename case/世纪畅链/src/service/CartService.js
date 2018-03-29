import fetch from  '../config/fetch';
import {cookieUtil} from'../assets/js/common';
var token = cookieUtil.get('login_token') || '';

class CartService {
	//购物车数量查询
	getCartList(params){
		return fetch('trolley/queryCart', params, 'POST')
	}
	//购物车商品数量编辑
	editCart(params){
		params.login_token = token;
		return fetch('trolley/editCart', params, 'POST')
	}
	//购物车商品数量删除
	delCart(params){
		params.login_token = token;
		return fetch('trolley/removeCart',params, 'POST')
	}
}

export default new CartService()
