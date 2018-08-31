<template>
	<div class="contains index">
		<div class="allStore" v-if="sliderData.list.length>0">
			<div class="search-wrapper" data-flex="dir:left main:left cross:center">
				<img src="../../assets/images/backTo.png" class="back-to" @click.prevent="goBack()"/>
				<div class="search-bar-div">
					<search-bar v-model="searchValue" placeholder="输入内容 / 点击关键词"></search-bar>
				</div>
				<button type="" class="btn-classify" data-stat="分类">
					<router-link to="/category">
						<img src="../../assets/images/classify.png" />
					</router-link>
				</button>
			</div>
			<shopping-cart data-stat="购物车"></shopping-cart>
			<mt-loadmore :top-method="pulldownRefresh" :bottom-method="pullupRefresh" :bottom-all-loaded="allLoaded" :autoFill="false" :bottomDistance="10" ref="loadmore" class="goods-content"> 
				<div class="auto-swipe">
					<mt-swipe :auto="4000" v-if="sliderData.list.length>0">
						<mt-swipe-item v-for=" banner in sliderData.list " :key="banner.adId" data-stat="轮播图">
							<a :href="banner.adUrl | adFilter" :data-stat="banner.id" :style="{backgroundImage:'url('+'/'+banner.adContent+')',backgroundSize:'100% 100%'}">
							</a>
						</mt-swipe-item>
					</mt-swipe>
					<img src="../../assets/images/slider1.png" class="default-image" v-else/>
				</div>
				<div class="statement" data-flex="dir:left main:left cross:center">
					<img src="../../assets/images/statement.png" />
					<span>本页面活动与苹果公司(Apple Inc.)无关</span>
				</div>
				<div class="quality-wrapper" v-if="quality.length>0">
					<goods-category-line  :title="quality[0].positionName"></goods-category-line>
					<div class="quality-life clear">
						<div class="quality-left left" v-if="quality[0]">
							<a :href="quality[0].adUrl | adFilter" :data-stat="quality[0].id" :style="{backgroundImage:'url('+'/'+quality[0].adContent+')',backgroundSize:'100% 100%'}">
							</a>
						</div>
						
						<div class="quality-right right">
							<div class="quality-top" v-if="quality[1]">
								<a :href="quality[1].adUrl | adFilter" :data-stat="quality[1].id" :style="{backgroundImage:'url('+'/'+quality[1].adContent+')',backgroundSize:'100% 100%'}">
								</a>
							</div>
							<div class="quality-bottom" v-if="quality[2]">
								<a :href="quality[2].adUrl | adFilter" :data-stat="quality[2].id" :style="{backgroundImage:'url('+'/'+quality[2].adContent+')',backgroundSize:'100% 100%'}">
								</a>
							</div>
						</div>
					</div>
					<div class="quality-other" v-if="qualityOther.length>0">
							<a  v-for="quality in qualityOther" :key="quality.id" :href="quality.adUrl | adFilter"  :data-stat="quality.id" :style="{backgroundImage:'url('+'/'+quality.adContent+')',backgroundSize:'100% 100%'}">
							</a>
					</div>
				</div>
				<mt-spinner class="loading" v-if="state" color="#26a2ff" :size="100" type="fading-circle"></mt-spinner>
				<div class="all-content" v-else>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataOne.list.length>0">
						<goods-category-line :title="goodsListDataOne.list[0].activityName" :hasMore="true" :site="goodsListDataOne.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataOne" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataTwo.list.length>0">
						<goods-category-line :title="goodsListDataTwo.list[0].activityName" :hasMore="true" :site="goodsListDataTwo.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataTwo" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataThree.list.length>0">
						<goods-category-line :title="goodsListDataThree.list[0].activityName" :hasMore="true" :site="goodsListDataThree.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataThree" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataFour.list.length>0">
						<goods-category-line :title="goodsListDataFour.list[0].activityName" :hasMore="true" :site="goodsListDataFour.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataFour" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataFive.list.length>0">
						<goods-category-line :title="goodsListDataFive.list[0].activityName" :hasMore="true" :site="goodsListDataFive.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataFive" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataSix.list.length>0">
						<goods-category-line :title="goodsListDataSix.list[0].activityName" :hasMore="true" :site="goodsListDataSix.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataSix" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataSeven.list.length>0">
						<goods-category-line :title="goodsListDataSeven.list[0].activityName" :hasMore="true" :site="goodsListDataSeven.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataSeven" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataEight.list.length>0">
						<goods-category-line :title="goodsListDataEight.list[0].activityName" :hasMore="true" :site="goodsListDataEight.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataEight" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataNine.list.length>0">
						<goods-category-line :title="goodsListDataNine.list[0].activityName" :hasMore="true" :site="goodsListDataNine.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataNine" ></goods-list>
						</div>
					</div>
					<div class="shop-wrapper wrapper-list" v-if="goodsListDataTen.list.length>0">
						<goods-category-line :title="goodsListDataTen.list[0].activityName" :hasMore="true" :site="goodsListDataTen.list[0].linkUrl"></goods-category-line>
						<div class="shopList">
							<goods-list :goods-list-data="goodsListDataTen" ></goods-list>
						</div>
					</div>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import sliderService from '../../service/SliderService';
import qualityService from '../../service/qualityService';
import goodsListService from '../../service/goodsListService';
import homeService from '../../service/HomeService';
import titleLine from '../../components/titleLine/titleLine';
import goodsCategoryLine from '../../components/goodsCategoryLine/goodsCategoryLine';
import goodsList from '../../components/goodsList/goodsList';
import shoppingCart from '../../components/shoppingCart/shoppingCart';
import searchBar from '../../components/searchBar/searchBar';
import {Toast} from 'mint-ui';
import {imgBaseUrl} from '../../config/env';
import {jfNative} from'../../assets/js/common';
	export default {
		data(){
			return {
				searchValue:'',
				title:'品质好货',
				title2:'洗护专场',
				title3:'数码专场',
				title4:'家居生活',
				title5:'服装专场',
				title6:'食品专区',
				title7:'体育器材',
				title8:'厨房用品',
				quality:[],
				qualityOther:[],
				state:false,
				site:'http://www.baidu.com',
				total:10,
				currentPage:1,
				pageNum:1,
				allLoaded:false
			}
		},
		components:{
			titleLine,
			goodsCategoryLine,
			goodsList,
			shoppingCart,
			searchBar
		},
		//路由跳转前
		beforeRouteEnter (to, from, next) {
			next(vm => {
				homeService.getSliderList()
				.then(res => {
					if(res.respCode === '0000'){
						vm.loadSliderData(res.data)
					}else{
						Toast(res.respMsg)
					}
				})
				
				homeService.getQualityList()
				.then(res => {
					if(res.respCode === '0000'){
						vm.loadQualityList(res.data)
						vm.quality = res.data
						vm.qualityOther = res.data.slice(3)
					}else{
						Toast(res.respMsg)
					}
				})
			});
		},
		created(){
			// homeService.getSliderList()
			// 	.then(res => {
			// 		if(res.respCode === '0000'){
			// 			this.loadSliderData(res.data)
			// 		}else{
			// 			 Toast(res.respMsg)
			// 		}
			// 	})
				
			// homeService.getQualityList()
			// 	.then(res => {
			// 		if(res.respCode === '0000'){
			// 			this.loadQualityList(res.data)
			// 			this.quality = res.data
			// 			this.qualityOther = res.data.slice(3)
			// 			console.log(this.quality)
			// 		}else{
			// 			Toast(res.respMsg)
			// 		}
			// 	})
		},
		mounted(){
		},
		computed:{
			...mapState(['sliderData',
			'goodsListDataOne',
			'goodsListDataTwo',
			'goodsListDataThree',
			'goodsListDataFour',
			'goodsListDataFive',
			'goodsListDataSix',
			'goodsListDataSeven',
			'goodsListDataEight',
			'goodsListDataNine',
			'goodsListDataTen',
			'qualityGoods'
			])
		},
		//过滤http
		filters:{
			adFilter(value){
				value = value.replace(/(http.*?.jfmore.com)(\/.*)/, '$2')
				return value
			}
		},
		methods:{
			...mapActions(['loadSliderData',
			'loadListData',
			'loadListDataOne',
			'loadListDataTwo',
			'loadListDataThree',
			'loadListDataFour',
			'loadListDataFive',
			'loadListDataSix',
			'loadListDataSeven',
			'loadListDataEight',
			'loadListDataNine',
			'loadListDataTen',
			'loadQualityList'
			]),
			//发现更多
			findMore(){
				this.$router.push({path: '/category'});
			},
			//去详情页
			goDetail(productId){
				this.$router.push({path:'/goodsDetail', query: {productId:productId}})
			},
			//返回按钮
			goBack(){
				if(this.$router.currentRoute.fullPath.indexOf('fromAPP')>0){
					window.jfNative = jfNative;
					window.jfNative.open('device', 'closewebview')
				}else{
					this.$router.go(-1);
				}
			},
			// 下拉刷新
			pulldownRefresh(){
				var me = this;
				me.currentPage = 1;
				me.allLoaded = true;
				me.$refs.loadmore.onTopLoaded();
			},
			// 上拉加载
			pullupRefresh(){
				var me = this;
				console.log('别急，我在使劲加载！');
				setTimeout(function() { 
					let count = Math.ceil(me.total/me.pageNum)
					switch(++me.currentPage){
						case 1: me.allLoaded = true; break;
						case 2: homeService.getActiveListOne()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataOne(res.data)
									}else{
										 //Toast('未请求到数据')
									}
								}); break;
						case 3: homeService.getActiveListTwo()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataTwo(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 4: homeService.getActiveListThree()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataThree(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 5: homeService.getActiveListFour()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataFour(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 6: homeService.getActiveListFive()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataFive(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 7: homeService.getActiveListSix()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataSix(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 8: homeService.getActiveListSeven()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataSeven(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 9: homeService.getActiveListEight()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataEight(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 10: homeService.getActiveListNine()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataNine(res.data)
									}else{
										// Toast(res.respMsg)
									}
								}); break;
						case 11: homeService.getActiveListTen()
								.then(res => {
									if(res.respCode === '0000'){
										me.loadListDataTen(res.data)
									}else{
										// Toast(res.respMsg)
									}
								});me.allLoaded = true;break;
					}
					me.$refs.loadmore.onBottomLoaded();
				}, 1500);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../assets/style/common';
	.contains{
		.loading{
			position: fixed;
		    left: 50%;
		    top: 50%;
		    margin-left: -50px;
		    margin-top: -50px;
		}
		.search-wrapper{
			width:100%;
			height:2.2rem;
			position:fixed;
			top:0;
			z-index:10;
			background:#93c4ea;
			.mint-button-icon{
				margin-left:0.4rem;
			}
			img.back-to {
			    margin: 0.55rem 0.2rem 0.55rem 0.55rem;
			    height: 1rem;
			}
			img.close-web{
				width: 0.8rem;
				height: 0.8rem;
				margin: 0.55rem 0 0.55rem;
			}
			.search-bar-div{
				position:absolute;
				top:0.3rem;
				left:1.6rem;
				width:12rem;
				height:1.6rem;
				.search-bar-input{
					padding-left:2rem;
					background-image:url('../../assets/images/search.png');
					background-repeat:no-repeat;
					background-size:25px 25px;
					background-position:0.5rem center;
				}
				.search-bar-icon{
					display:none;
				}
			}
			.btn-classify{
				position:absolute;
				top:0.8rem;
				right:10px;
				background:transparent;
				img{
					width:1rem;
					height:0.6rem;
				}
			}
		}
		.auto-swipe{
			height:11.25rem;
			margin-top:2.2rem;
			a{	
				display: block;
				height:100%;
			}
			img{
				display:inline-block;
				width:100%;
				height:100%;
			}
			.mint-swipe-indicators{
				width:50%;
				left:65%;
				text-align:right;
				.mint-swipe-indicator{
					background:#fff;
					opacity:1;
				}
				.mint-swipe-indicator.is-active{
					background:#d3b669;
				}
			}
		}
		.statement{
				width:100%;
				height:1.45rem;
				padding-left:0.75rem;
				margin-bottom:0.45rem;
				line-height:1.45rem;
				background:#fff;
				img{
					width:0.8rem;
					height:0.8rem;
					margin-right:0.45rem;
				}
				span{
					font-size:0.6rem;
				}
		}
		.default-quality-img{
			width:100%;
			height:10rem;
			margin-bottom:15px;
		}
		.quality-life{
			height:10.5rem;
			padding: 0 0.5rem 0.5rem 0.5rem;
			margin-bottom:15px;
			background:#fff;
			a{
				display: block;
				width:100%;
				height:100%;
			}
			img{
				width:100%;
				height:100%;
			}
			.quality-left{
				width: 50%;
				height: 100%;
				padding-right: 6px;
				a{
					display: block;
					width:100%;
					height:100%;
				}
			}
			.quality-right{
				width: 50%;
				height: 100%;
				.quality-top{
					height: 50%;
					padding-bottom: 6px;
					a{
						display: block;
						width:100%;
						height:100%;
					}
				}
				.quality-bottom{
					height: 50%;
					a{
						display: block;
						width:100%;
						height:100%;
					}
				}
			}
		}
		.quality-other{
			background:#fff;
			padding: .5rem .5rem 0.1rem 0.5rem;
				a{
					display: block;
					width:100%;
					height:6rem;
					margin-bottom: 0.5rem;
					img{
						width:100%;
						height:100%;
					}
				}
		}
		.wrapper-list{
			margin-top:15px;
		}
		.mint-loadmore-content {
		    padding-bottom: 10px;
		}
	}
</style>