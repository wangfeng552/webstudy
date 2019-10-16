import fetch from  '../config/fetch';

class WaresListService {
	//获取商品列表
	getGoodsList(msg) {
		return fetch('goods/queryGoods', msg, 'POST')
	}
}

export default new WaresListService()
