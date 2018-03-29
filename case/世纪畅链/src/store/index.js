import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
	scene: '',
	isWeChat: false,
	showNull: false,
	list: {
		isFetching: false,
		data: [
	    	{id: 0},
	    	{id: 1},
		]
	},
	loginStatus:false,
	goodsListData:{
		hasMore: true,
		list: []
	},
	goodsListDataOne:{
		hasMore:true,
		list:[]
	},
	goodsListDataTwo:{
		hasMore:true,
		list:[]
	},
	goodsListDataThree:{
		hasMore:true,
		list:[]
	},
	goodsListDataFour:{
		hasMore:true,
		list:[]
	},
	goodsListDataFive:{
		hasMore:true,
		list:[]
	},
	goodsListDataSix:{
		hasMore:true,
		list:[]
	},
	goodsListDataSeven:{
		hasMore:true,
		list:[]
	},
	goodsListDataEight:{
		hasMore:true,
		list:[]
	},
	goodsListDataNine:{
		hasMore:true,
		list:[]
	},
	goodsListDataTen:{
		hasMore:true,
		list:[]
	},
	sliderData:{
		list:[]
	},
	subCategoryList: [],
	qualityGoods:{
		list:[]
	},
	cartGoods:{
		list:[]
	},
	search: {
		searchValue: '',
		hotSearch: [],
		historySearch: []
	},
	goodsDetail: {
		
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})