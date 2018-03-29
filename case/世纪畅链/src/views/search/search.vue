<template>
	<div class="search">
		<img class="left" src="../../assets/images/back.png" @click.prevent="goBack()">
		<search-bar v-model="searchValue" placeholder="输入内容 / 点击关键词" ></search-bar>
		<div class="">
			<p class="search-label">热门搜索</p>
			<span class="hot-search-item" v-for="hot in search.hotSearch" @click.prevent="searchGoods(hot.adContent)">{{hot.adContent}}</span>
			<p class="search-label" v-if="search.historySearch&&search.historySearch.length>0">历史搜索</p>
			<p class="history-search-item" v-for="history in search.historySearch" @click.prevent="searchGoods(history.keywords)">{{history.keywords}}<img class="img-delete" src="../../assets/images/delete.png" alt=""></p>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import searchService from '../../service/SearchService';
import goodsList from '../../components/goodsList/goodsList';
import searchBar from '../../components/searchBar/searchBar';
import {Toast} from 'mint-ui';
export default{
	data() {
		return{
			searchValue: this.$route.query.keyWords
		}
	},
	computed: {
		...mapState(['search', 'goodsListData'])
	},
	components: {
		goodsList,
		searchBar
	},
	created() {
		// 获取热门搜索
		searchService.getHotSearch()
		.then(res => {
			if(res.respCode === '0000'){
				this.getHotSearch(res.data)
			}else{
				Toast(res.respMsg);
			}
		})
		// 获取历史搜索
		searchService.getHistorySearch()
		.then(res => {
			if(res.respCode === '0000'){
				if(res.data.length <=0){
					let localStorage = window.localStorage;
					// 获取存储
					let history = JSON.parse(localStorage.getItem('historySearch')) || [];
					if(history.length>5){
						history = history.slice(-5);
					}
					this.getHistorySearch(history);
				}else {
					this.getHistorySearch(res.data);
				}
			}else{
				Toast(res.respMsg);
			}
		})
		
		this.goodsListData.list = [];
	},

	methods: {
		...mapActions(['getHistorySearch', 'getHotSearch', 'loadListData']),
		// 根据关键字搜索相关商品
		searchGoods(value){
			this.searchValue = value;

			let localStorage = window.localStorage;
			// 获取存储
			let history = JSON.parse(localStorage.getItem('historySearch')) || [];
			// 添加新的记录
			history.push({'keywords': this.searchValue});
			localStorage.setItem('historySearch',JSON.stringify(history));
			// this.getHistorySearch([{keywords: value}]);

			this.$router.push({path: '/goodsList', query: {keyWords: this.searchValue}});
		},
		goBack(){
			this.$router.go(-1);
		}
	}
}
</script>
<style lang="scss">
	.search{
		.search-head{
			.mint-button-icon{
				margin-right:0.8rem;
			}
		}
		height: 110%;
		background: #fff;
		padding: 10px 20px 0 20px;
		img.left{
			width:2rem;
			height:2rem;
			margin: -0.15rem 0.5rem 0 -1rem;
		}
		.search-bar{
			width:82%;
		}
		.search-label{
			height: 2rem;
			line-height: 2rem;
			font-size: 14px;
			color: #666;
			margin-top: 10px;
		}
		.hot-search-item{
			display: inline-block;
			margin: 10px;
			padding: 5px;
			border: 1px solid #999;
			border-radius: 5px;
			font-size: 14px;
			text-align: center;
			color: #222;

		}
		.history-search-item{
			position: relative;
			height: 2rem;
    		line-height: 2rem;
    		font-size: 14px;
    		border-bottom: 1px solid #e5e5e5;
    		color: #222;
    		padding-right: 15px;
    		word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.img-delete{
    		position: absolute;
    		top: 50%;
    		right: 0;
			width: 20px;
    		height: 20px;
    		margin-top: -10px;
		}
		.img-off{
			width: 10rem;
		}
		.ft16{
			font-size: 16px;
			color: #666;
		}
		.tln-center{
			text-align:center
		}
	}
</style>