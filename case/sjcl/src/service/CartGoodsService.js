class CartGoodsService {
	getCartsList( options = {} ) {
		return fetch('/api/cartGoods', {
			type: 'guess'
		});
	}
}
export default new CartGoodsService();

