import {
	GET_LIST_DATA,
	GET_LIST_ISFETCHING,
	GET_SLIDERDATA_LIST,
	GET_GOODS_CATEGORY_LIST,
	GET_QUALITYGOODS_LIST,
	GET_CARTGOODS_LIST,
	GET_HISTORY_SEARCH,
	GET_HOT_SEARCH,
	GET_GOODS_DETAIL,
	GET_LOGINSTATUS,
	GET_ISWECHAT,
	SHOW_NULL_PAGE,
	GET_SUB_CATEGORY_LIST,
	GET_LIST_DATAONE,
	GET_LIST_DATATWO,
	GET_LIST_DATATHREE,
	GET_LIST_DATAFOUR,
	GET_LIST_DATAFIVE,
	GET_LIST_DATASIX,
	GET_LIST_DATASEVEN,
	GET_LIST_DATAEIGHT,
	GET_LIST_DATANINE,
	GET_LIST_DATATEN
} from './mutation-types.js'


export default {
	[GET_LIST_ISFETCHING](state){
		// state.goodsListData.isFetching = true;
	},
	[GET_LOGINSTATUS](state,payload){
		state.loginStatus = payload.data;
	},
	[GET_ISWECHAT](state,payload){
		state.isWeChat = payload.data;
	},
	[GET_LIST_DATA](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListData.list = payload.data;
	},
	[GET_LIST_DATAONE](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataOne.list = payload.data;
	},
	[GET_LIST_DATATWO](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataTwo.list = payload.data;
	},
	[GET_LIST_DATATHREE](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataThree.list = payload.data;
	},
	[GET_LIST_DATAFOUR](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataFour.list = payload.data;
	},
	[GET_LIST_DATAFIVE](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataFive.list = payload.data;
	},
	[GET_LIST_DATASIX](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataSix.list = payload.data;
	},
	[GET_LIST_DATASEVEN](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataSeven.list = payload.data;
	},
	[GET_LIST_DATAEIGHT](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataEight.list = payload.data;
	},
	[GET_LIST_DATANINE](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataNine.list = payload.data;
	},
	[GET_LIST_DATATEN](state, payload) {
		// state.list.data = payload.data;
		// state.goodsListData.hasMore = payload.data.hasMore;
		state.goodsListDataTen.list = payload.data;
	},
	[GET_SLIDERDATA_LIST](state,payload) {
		state.sliderData.list = payload.data;
	},
	// [GET_GOODS_CATEGORY_LIST](state, payload) {
	// 	state.goodsCategoryList = payload.data;
	// },
	[GET_QUALITYGOODS_LIST](state, payload) {
		state.qualityGoods.list = payload.data;
	},
	[GET_CARTGOODS_LIST](state, payload) {
		state.cartGoods.list = payload.data;
	},
	[GET_HISTORY_SEARCH](state, payload) {
		state.search.historySearch = payload.data;
	},
	[GET_HOT_SEARCH](state, payload) {
		state.search.hotSearch = payload.data;
	},
	// 改变商品详情的state
	[GET_GOODS_DETAIL](state, payload){
		state.goodsDetail = payload.data;
	},
	// 
	[SHOW_NULL_PAGE](state, payload){
		state.showNull = payload.data;
	},
	// 改变三级分类
	[GET_SUB_CATEGORY_LIST](state, payload){
		state.subCategoryList = payload.data;
	}
}
