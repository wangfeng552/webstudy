import fetch from  '../config/fetch';

class DetailService {
	//获取商品详情 /pointgate/collage/ptGoodsDetails/query
	getDetail(params){
		return fetch('pointgate/collage/ptGoodsDetails/query',params,"post");
	};
	//获取 团详情 /pointgate/collage/collageTeamDetails/query
	getTuanDetail(params) {
		return fetch('pointgate/collage/collageTeamDetails/query',params,"post");
	}
}
export default new DetailService();
