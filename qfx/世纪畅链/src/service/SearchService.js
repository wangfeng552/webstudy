import fetch from  '../config/fetch';
import {cookieUtil} from'../assets/js/common';
var token = cookieUtil.get('login_token') || '';

class SearchService {
	// 获取热门搜索
	getHotSearch(){
		// return fetch('hotword/queryHotWord', {},'POST');
		return fetch('ad/recommend', {keyId: 'Mall_search'},'POST');
	}
	// 获取历史搜索记录
	getHistorySearch(){
		return fetch('historyWord/queryHistoryWord', {login_token: token},'POST');
	}
	// 按照搜索关键字搜索商品
	searchGoods(params){
		return fetch('goods/queryGoods', params,'POST');
	}
}
export default new SearchService();