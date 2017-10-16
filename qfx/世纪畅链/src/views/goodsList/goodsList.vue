<template>
	<div class="goods-list-view" :class="{titleW:isWeChat,titleS:showSearch,titleC:!showSearch}">
		<mt-header fixed title="商品列表" v-if="!isWeChat">
			<router-link to slot="left">
				<mt-button icon="back" @click.prevent="goBack()"></mt-button>
			</router-link>
		</mt-header>
		<div class="div-cover" v-show="subitemsExpanded"></div>
		<div class="allSort" :class="{allSortWechat:isWeChat}" v-if="!showSearch">
			<div class="sortMenu clearfix">
				<ul class="sortMenu-ul" v-if="!subitemsExpanded">
					<li class="cell" v-if="!subitemsExpanded" v-for="item in subCategoryList">
						<a href="javascript:;" :class="{active: item.categoryid===selectCategory}" @click="chooseCategory(item.categoryid)">{{item.categoryname}}</a>
					</li>
				</ul>
				<ul class="sortMenu-ul-null" v-if="subitemsExpanded">
					选择分类
				</ul>
				<div class="all" v-on:click="subitemsExpanded=!subitemsExpanded">
					<img src="../../assets/images/pullDown.png" alt=""v-if="!subitemsExpanded">
					<img src="../../assets/images/pullUp.png" alt="" v-else>
				</div>
				<div v-show="subitemsExpanded" class="pull-down">
					<ul class="pull-down-sort">
						<li class="" v-for="c in subCategoryList">
							<a href="javascript:;" :class="{active: c.categoryid===selectCategory}" @click="chooseCategory(c.categoryid)">{{c.categoryname}}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="search-bar-div" :class="{title:!isWeChat}" v-if="showSearch">
			<search-bar v-model="searchValue" placeholder="输入内容 / 点击关键词"></search-bar>
		</div>
		<mt-loadmore :top-method="pulldownRefresh" :bottom-method="pullupRefresh" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore" class="goods-content" :class="{title:isWeChat}" v-if="goodsListData.list&&goodsListData.list.length>0"> 
			<div class="goods-order" data-flex="box:mean">
				<a href="javascript:;" class="goods-order-item" :class="{select: selectSortType === sort.id}" @click.prevent="changeOrder(sort.id)" v-for="(sort, index) in sortType">{{sort.name}}<span v-if="index === 2 && selectSortType === '1'"><span class="arrow arrow-top" id="iarrowDown" :class="{arrowDown: priceSortDirection === 'desc'}"></span><span class="arrow arrow-bottom" id="iarrowUp" :class="{arrowuP: priceSortDirection === 'asc'}"></span></span></a>
			</div>
			<goods-list :goodsListData="goodsListData"></goods-list>
		</mt-loadmore>
		<div v-if="showNull" style="height: 100%; background: #fff;" data-flex="main:center cross:center">
			<div>
				<img class="img-off" src="../../assets/images/offshelf.png">
				<p class="ft16 tln-center">查询不到结果...</p>
			</div>
		</div>
		<div id="igoToTop" class="go-to-top" @click.prevent="goToTop()" v-show="showGoToTop">
    		<a class="to-top-triangle"></a>
    	</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import goodsListService from '../../service/goodsListService';
import goodsList from '../../components/goodsList/goodsList';
import searchBar from '../../components/searchBar/searchBar';
import {Toast} from 'mint-ui';
export default{
	data(){
		return {
			// path: '/',
			showSearch: false, // 是否显示搜索框
			subitemsExpanded: false, // 点击下拉箭头是否显示下拉内容
			showNull: false, // 显示查询不到结果页面
			searchValue: this.$route.query.keyWords,// 搜索内容
			showGoToTop: false, // 是否显示“回到顶部”按钮
			allLoaded: false,// 是否是全部数据
			sortType: [{ // 三种排序方式
				id: '0',
				name: '最新'
			},{
				id: '2',
				name: '销量'
			},{
				id: '1',
				name: '价格'
			}], 
			selectCategory: this.$route.query.categoryid, // 选中的分类id
			selectSortType: '0',// 当前选中的排序方式
			order: 'desc', // 排序方向
			priceSortDirection: '', // 价格此时的排序方式
			currentPage: 1, // 当前是第几页
			pageSize: 8, // 每页8个
			total: 0, // 商品总数
			pageNum:8 
		}
	},
	components: {
		goodsList,
		searchBar
	},
	computed: {
		...mapState(['goodsListData','isWeChat', 'subCategoryList'])
	},
	created() {
		// 判断入口是哪个页面，若有categoryID就表示从分类页面过来的，反之就是从搜索页面过来的
		if(this.selectCategory){
			this.showSearch = false;
			// this.path = '/category';
		}else{
			this.showSearch = true;
			// this.path = '/search';
		}
		getData(this);
	},
	mounted(){
		// 将分类存入session中，防止刷新页面时丢失
		// window.sessionStorage.setItem();
	},
	methods: {
		// 加载数据
		...mapActions(['loadListData']),
		// 下拉刷新
		pulldownRefresh(){
			console.log('别急，我在刷新哦！');
			var me = this;
			me.currentPage = 1;
			getData(me);
			me.allLoaded = true;
			me.$refs.loadmore.onTopLoaded();
		},
		// 上拉加载
		pullupRefresh(){
			var me = this;
			console.log('别急，我在使劲加载！');
			setTimeout(function() {  
				let count = Math.ceil(me.total/me.pageNum);
				if(count){
					if(count === 1){
						me.allLoaded = true;
					}else if (++me.currentPage > count) {
						me.allLoaded = true;
					}else {
						me.allLoaded = false;
						getData(me);
					}
					me.$refs.loadmore.onBottomLoaded();
				}
			}, 1500);
		},
		// 改变排序方式
		changeOrder(orderType) {
			this.selectSortType = orderType;
			this.currentPage = 1;
			if(!this.priceSortDirection){
				this.priceSortDirection = 'asc';
			}else if(this.priceSortDirection === 'asc'){
				this.priceSortDirection = 'desc';
			}else {
				this.priceSortDirection = 'asc';
			}
			getData(this);
		},
		// 返回顶部
		goToTop() {
			this.$el.ownerDocument.body.scrollTop = 0;
		},
		// 选择分类
		chooseCategory(categoryId){
			this.selectCategory = categoryId;
			getData(this);
		},
		// 返回
		goBack(){
			this.$router.go(-1);
		}
	}
}
var params = {};
// 获取后台数据
function getData(_this){
	// 传入的参数
	switch(_this.selectSortType){
		case '0': _this.order = 'desc'; break;
		case '1': _this.order = _this.priceSortDirection || 'asc'; break;
		case '2': _this.order = 'desc'; break;
	}
	params.categoryId =	_this.selectCategory || '';
	params.order = _this.order;
	params.page = _this.currentPage + '';
	params.pageSize = _this.pageSize + '';
	params.sort = _this.selectSortType;
	params.goodUse = "0";
	params.keyWords = _this.searchValue||'';
	//调用接口
	goodsListService.getGoodsList(params)
	.then(res => {
		if(res.respCode === '0000'){
			_this.total = parseInt(res.data.total);
			if(_this.total === 0){
				_this.showNull = true;
			}else {
				_this.showNull = false;
			}
			_this.pageNum = res.data.pageNum;
			let data = [];
			if(_this.currentPage === 1){
				data = res.data.item;
			}else if(Math.ceil(_this.total/_this.pageNum)>=_this.currentPage){
				data = [..._this.goodsListData.list, ...res.data.item];
			}
			
			_this.loadListData(data);
			console.log(_this.currentPage)
			// 判断“回到顶部”按钮的显示
			_this.currentPage > 3 ? _this.showGoToTop = true : _this.showGoToTop = false
		}else {
			Toast(res.respMsg)
		}
	})
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
	.titleS{
		margin-top: 4rem;
	}
	.titleW{
		margin-top: 2rem;
	}
	.titleC{
		margin-top: 0;
	}
	.goods-list-view{
		background: #fff;
		height: 100%;
		.back{
			height: 100%;
		}
		.mint-header{
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			font-size: 0.8rem;
			z-index: 10;
		}
		.goods-list-category{
			margin-top: 40px;
		}
		.search-bar-div{
			position: fixed;
			top:0;
		    width: 100%;
			height: 50px;
			z-index: 99;
			background: #f9f9f9;
			padding: 10px;
		}
		.search-bar-div.title{
			top:40px;
		}
		.mint-loadmore-text{
			font-size: 0.7rem;
		}
		.mint-searchbar-inner .mintui-search{
			font-size: 0.8rem;
		}
		.goods-order{
			height: 1.8rem;
			background: #f9f9f9;
		}
		.goods-order-item{
			display: inline-block;
			position: relative;
			height: 1.8rem;
			text-align: center;
		    line-height: 1.8rem;
		    font-size: 0.7rem;
		    color: #666;
		}
		.select{
			color: $gold;
		}
		.arrow {
			position: absolute;
			border-width:4px; 
			margin-left: 5px;
		}
		.arrow-top{
			top: 55%; 
			border-color:#aaa transparent transparent transparent; 
			border-style:solid dashed dashed dashed; 
			border-bottom:none;
		}
		.arrowuP{
			border-color:transparent transparent $gold transparent !important;
		}
		.arrow-bottom{
			bottom: 50%; 
			border-color:transparent transparent #aaa transparent;
			border-style:dashed dashed solid dashed; 
			border-top:none;
		}
		.arrowDown{
			border-color: $gold transparent transparent transparent !important; 
		}
		.go-to-top{
			position: fixed;
			bottom: 20px;
			right: 13px;
			background: #fff;
			width: 50px;
			height: 50px;
			z-index: 99;
			border: 1px solid #ddd;
			border-radius: 50%;
			text-align: center;
		}
		.to-top-triangle{
			position: absolute;
			left: 50%;
			top: 50%;
			margin: -5px 0 0 -9px;
			border-left: 2px solid;
			border-top: 2px solid;
			width: 20px;
			height: 20px;
			transform: rotate(45deg);
			color: #ddd;
		}
		.to-top-triangle:active{
			color: #ddd;
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

		.allSort.allSortWechat{
			margin-top:0;
		}
		.allSort{
			margin-top: 40px;
			position: relative;
			border-bottom: 1px solid #e5e5e5;
		}
		.sortMenu{
			width: 100%; 
			background-color:#fff; 
			overflow-x: scroll; 
			-webkit-overflow-x: scroll;
		}
		.sortMenu::-webkit-scrollbar{ 
			width: 0; 
			height: 0;   
			background-color: #fff;  
		}
		.sortMenu-ul { 
			min-width:500px;
			height: 40px; 
			display: flex;
			justify-content: flex-start;

			li a{
				display: inline-block;
				line-height: 40px;
				height: 40px;
			}
		}
		.sortMenu-ul-null{
			position: relative;
			min-width:500px;
			height: 40px; 
			display: flex;
			justify-content: flex-start;
			z-index: 10;
			background: #fff;
			font-size: 12px;
			line-height: 40px;
			padding-left: 10px;
			text-align: center;
		}
		.sortMenu .cell{ 
			display: inline-block; 
			font-size: 12px;
			margin: 0px 1em;
			height: 40px;
			line-height: 40px;
			text-align: center;
			position: relative;
			text-overflow: ellipsis;
			word-break: keep-all;
		}
		.sortMenu .cell.special a{
			color: #ff474c;
		}
		.sortMenu .cell.special:before {
			content: '';
			height: 2px;
			width: 100%;
			background: #ff474c;
			position: absolute;
			bottom: 0px;
		}
		.sortMenu .all{
			right: 0;
			top: 0;
			height: 35px;
			width: 35px;
			position: absolute;
			background: #fff;
			z-index: 10;
			display: flex;
			justify-content:center;
			align-items:center;
		}
		.sortMenu .all:before{
			content: '';
			height: 25px;
			width: 1px;
			position: absolute;
			box-shadow: 1px 0px 1px #e0e0e0;
			left: 0px;
		}
		.sortMenu .all img{
			display: block;
			width: 30px;
		}
		.sortMenu .pull-down{
			position: absolute;
			top: 40px;
			height:auto;
			width: 100%;
			background: #fff;
			z-index: 10;
			border-top: 1px solid #f2f2f2;
			border-bottom: 1px solid #f2f2f2;
		}
		.pull-down-sort{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			align-content: space-around;
			flex-wrap: wrap;
			flex-direction: row
		}
		.pull-down-sort li{
			float: left;
			padding: .1rem;
			font-size: 12px;
    		margin: 5px;
		}
		.pull-down-sort li a:hover{
			color: #ff474c;
		}
		.active{
			color: $gold;
			border-bottom: 2px solid $gold;
		}
		.div-cover{
			position: absolute; 
			height: 100%;
			width: 100%;
			top: 0px; 
			left: 0px; 
			background-color: #777;     
			z-index: 5; 
			opacity:0.5 !important; 
			-moz-opacity:0.5 !important;
		}
	}
</style>