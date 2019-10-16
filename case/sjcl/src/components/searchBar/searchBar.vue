<template>
	<div class="search-bar">
		<img class="search-bar-icon" src="../../assets/images/search.png" alt="">
		<input
		ref="input"
		@focus="startSearch()"
		type="search"
		v-model="currentValue"
		:placeholder="placeholder"
		class="search-bar-input">
		<a
		href="javascript:;"
		class="search-bar-cancel"
		v-show="visible"
		@click="searchValue()"
		v-text="searchText">
		</a>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import searchService from '../../service/SearchService';
import {Toast} from 'mint-ui';
export default {
	name: 'searchBar',

	data() {
		return {
			visible: false,
			currentValue: this.value
		};
	},

	watch: {
		currentValue(val) {
			this.visible = true;
			this.$emit('input', val);
		},
		value(val) {
			this.currentValue = val;
		}
	},
	computed: {
		...mapState(['goodsListData'])
	},
	props: {
		value: String,
		searchText: {
			default: '搜索'
		},
		placeholder: {
			default: '搜索'
		}
	},
	methods:{
		...mapActions(['loadListData','getHistorySearch']),
		searchValue(){
			if(this.currentValue){
				this.visible = false;
				// this.getHistorySearch([{keywords: this.currentValue}]);
				let localStorage = window.localStorage;
				// 获取存储
				let history = JSON.parse(localStorage.getItem('historySearch')) || [];
				// 添加新的记录
				history.push({'keywords': this.currentValue});
				debugger
				localStorage.setItem('historySearch',JSON.stringify(history));
				this.$router.push({path: '/goodsList', query: {keyWords: this.currentValue}});
			}
		},
		startSearch(){
			this.visible = true;
			console.log('开始搜搜');
			if(this.$router.currentRoute.path !== '/search') {
				this.$router.push({path: '/search', query:{keyWords: this.currentValue}});
			}
		}
	}
};
</script>

<style lang="css">
	.search-bar{
		display: flex;
		width: 100%;
		position: relative;
	}
	.search-bar-icon{
		position: absolute;
		top: 0;
		left: 0;
		width: 15px;
		margin-top: 10px;
		margin-left: 10px;
	}
	.search-bar-input, .search-bar-input:focus{
		line-height: 25px;
		height: 37px;
		width: 100%;
		border: 1px solid #eee;
		padding: 5px 10px 5px 35px;
		border-radius: 20px;
		background: #eee;
		box-sizing: border-box;
	}
	.search-bar-cancel{
		width: 35px;
		line-height: 40px;
		font-size: 0.6rem;
		color: #222;
		margin-left: 10px;
	}
</style>
