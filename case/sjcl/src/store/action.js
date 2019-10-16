import {
	GET_LIST_DATA,
	GET_LIST_ISFETCHING,
	GET_SLIDERDATA_LIST,
	GET_GOODS_CATEGORY_LIST,
	GET_QUALITYGOODS_LIST,
	GET_CARTGOODS_LIST,
	GET_HOT_SEARCH,
	GET_HISTORY_SEARCH,
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
	confirmWeChat({commit,state},data) {
		commit(GET_ISWECHAT,{data});
	},
	confirmLogin({commit,state},data) {
		commit(GET_LOGINSTATUS,{data});
	},
	loadListData({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListData.list,...data];
		setTimeout(() => commit(GET_LIST_DATA, {data}), 500);
	},
	loadListDataOne({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataTwo.list,...data];
		setTimeout(() => commit(GET_LIST_DATAONE, {data}), 500);
	},
	loadListDataTwo({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataTwo.list,...data];
		setTimeout(() => commit(GET_LIST_DATATWO, {data}), 500);
	},
	loadListDataThree({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataThree.list,...data];
		setTimeout(() => commit(GET_LIST_DATATHREE, {data}), 500);
	},
	loadListDataFour({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataFour.list,...data];
		setTimeout(() => commit(GET_LIST_DATAFOUR, {data}), 500);
	},
	loadListDataFive({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataFive.list,...data];
		setTimeout(() => commit(GET_LIST_DATAFIVE, {data}), 500);
	},
	loadListDataSix({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataSix.list,...data];
		setTimeout(() => commit(GET_LIST_DATASIX, {data}), 500);
	},
	loadListDataSeven({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataSeven.list,...data];
		setTimeout(() => commit(GET_LIST_DATASEVEN, {data}), 500);
	},
	loadListDataEight({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataEight.list,...data];
		setTimeout(() => commit(GET_LIST_DATAEIGHT, {data}), 500);
	},
	loadListDataNine({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataNine.list,...data];
		setTimeout(() => commit(GET_LIST_DATANINE, {data}), 500);
	},
	loadListDataTen({commit, state},data) {
		commit(GET_LIST_ISFETCHING);
		//data = [...state.goodsListDataTen.list,...data];
		setTimeout(() => commit(GET_LIST_DATATEN, {data}), 500);
	},
	loadSliderData({commit,state},data) {
		// data = [...state.sliderData.list, ...data];
		setTimeout(() => commit(GET_SLIDERDATA_LIST, {data}), 500);
	},
	// 获取goodsCategoryList中的数据，并触发对应的mutation
	// getGoodsCategoryList({commit, state},data){
	// 	data = {...state.goodsCategoryList,...data};
	// 	setTimeout(() => commit(GET_GOODS_CATEGORY_LIST, {data}), 500);
	// },
	loadQualityList({commit, state},data){
		// data = {...state.qualityGoods.list,...data};
		setTimeout(() => commit(GET_QUALITYGOODS_LIST, {data}), 500);
	},
	loadCartList({commit, state},data){
		// data = {...state.cartGoods.list,...data};
		setTimeout(() => commit(GET_CARTGOODS_LIST, {data}), 500);
	},
	// 获取热门搜索
	getHotSearch({commit,state},data){
		setTimeout(() => commit(GET_HOT_SEARCH, {data}), 500);
	},
	// 获取历史搜索
	getHistorySearch({commit,state},data){

		data = [...state.search.historySearch, ...data];
		if(data.length>5){
			data = data.slice(-5);
		}
		setTimeout(() => commit(GET_HISTORY_SEARCH, {data}), 500);
	},
	// 获取商品详情
	getGoodsDetail({commit,state},data){
		setTimeout(() => commit(GET_GOODS_DETAIL, {data}), 500);
	},
	// 显示搜索为空页面
	showNullPage({commit,state},data){
		setTimeout(() => commit(SHOW_NULL_PAGE, {data}), 500);
	},
	getSubCategoryList({commit,state},data){
		setTimeout(() => commit(GET_SUB_CATEGORY_LIST, {data}), 500);
	}
}