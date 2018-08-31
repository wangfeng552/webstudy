import fetch from  '../config/fetch';
class GoodsCategoryService {
	getGoodsCategoryList() {
		return fetch('category/queryCategory', {}, 'POST');
	}
}
export default new GoodsCategoryService();

