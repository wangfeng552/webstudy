<template>
	<div class="goods-detail" v-if="goodsDetail.popPicList.length>0">
		<div class="div-cover" v-show="showCover"></div>
		<div class="goods-detail-header">
			<img class="left" src="../../assets/images/back.png" @click.prevent="goBack()">
			<img class="right" src="../../assets/images/cart2.png" alt="" @click.prevent="goCart()">
			<label class="cart-badge">{{badgeNum}}</label>
		</div>
		<div class="goods-detail-swipe">
			<mt-swipe :auto="0" :show-indicators="false" @change="handleChange" v-if="goodsDetail.popPicList.length>0">
				<mt-swipe-item v-for=" slider in goodsDetail.popPicList" :key="slider.sliderNumber" >
						<img :src="'/'+slider" />
				</mt-swipe-item>
			</mt-swipe>
			<label class="swipe-index-label">{{index}}/{{goodsDetail.popNum}}</label>
		</div>
		<div class="goods-detail-content">
			<h4 class="goods-title">{{goodsDetail.goodsName}}</h4>
			<p class="goods-name-left">{{goodsDetail.subTitle}}</p>
			<p class="cost" v-if="goodsDetail.payType === 'cash'">
				<label class="cost-label">{{goodsDetail.price/100}}</label>元
				<del class="goods-detail-label">市场价{{goodsDetail.marketPrice/100}}</del>
			</p>
			<p class="cost" v-if="goodsDetail.payType === 'points'">
				<label class="cost-label">{{goodsDetail.points}}</label>积分
				<del class="goods-detail-label" v-if="(goodsDetail.amount/100)<=goodsDetail.marketPrice">市场价{{goodsDetail.marketPrice/100}}</del>
			</p>
			<p class="cost" v-if="goodsDetail.payType === 'comb'">
				<label class="cost-label">{{goodsDetail.points}}</label>积分 + <label class="cost-label">{{goodsDetail.price/100}}</label>元
				<del class="goods-detail-label">市场价{{goodsDetail.marketPrice/100}}</del>
			</p>
			<p class="cost" v-if="goodsDetail.payType === 'cust'">
				<label class="cost-label">{{goodsDetail.price/100}}</label>元
				<del class="goods-detail-label">市场价{{goodsDetail.marketPrice/100}}</del>
			</p>
			<p class="goods-detail-label">
				<label for="">库存：{{goodsDetail.storeCount}}</label>
				<label for="" class="right">快递： 免运费</label>
			</p>
			<p class="campaign" v-if="goodsDetail.goodsType === '1'&&goodsDetail.goodsSource==='0'&&goodsDetail.expDate">
				本券有效期至:{{goodsDetail.expDate}}
			</p>
			<p class="returnSales" v-if="goodsDetail.goodsType==='1'">
				本商品为电子券商品, 一经售出, 无法退货!
			</p>
		</div>
		<button class="btn" type="">商品详情</button>
		<div class="goods-detail-introduce" v-html="goodsDetail.description">
		</div>
		<p class="explain">
			{{goodsDetail.serviceInfo}}
		</p>
		<!-- 判断显示哪种button -->
		<div v-if="goodsDetail.goodsType === '0'&&goodsDetail.storeCount !== '0'" class="btn-div">
			<button class="btn btn-default " type="" @click.prevent="buyNow()">立即购买</button>
			<button class="btn btn-default" type="" @click.prevent="addInCart(goodsDetail.productId)">加入购物车</button>
		</div>
		<div v-else-if="goodsDetail.goodsType === '1'&&goodsDetail.storeCount !== '0'">
			<button class="btn btn-buy" type="" @click.prevent="buyNow()">立即购买</button>
		</div>
		<div v-else>
			<button class="btn btn-disable" type="disabled" @click.prevent="">暂无库存</button>
		</div>
		<!-- 点击立即购买之后弹出 -->
		<div class="buy-now-div" v-show="showCover">
			<img class="btn-close" src="../../assets/images/close.png" alt="" @click.prevent="handleClose()">
			<div  data-flex="" class="pd20">
				<div data-flex-box="0" class="goods-img-left">
					<img class="" :src="'/'+goodsDetail.adPic" style="width: 120px;height: 120px;">
				</div>
				<div data-flex-box="1" class="pd20">
					<p class="cost" v-if="goodsDetail.payType === 'cash'">
						<label class="cost-label">{{goodsDetail.price/100}}</label>元
					</p>
					<p class="cost" v-if="goodsDetail.payType === 'points'">
						<label class="cost-label">{{goodsDetail.points}}</label>积分
					</p>
					<p class="cost" v-if="goodsDetail.payType === 'comb'">
						<label class="cost-label">{{goodsDetail.points}}</label>积分 + <label class="cost-label">{{goodsDetail.price/100}}</label>元
					</p>
					<p class="cost" v-if="goodsDetail.payType === 'cust'">
						<label class="cost-label">{{goodsDetail.price/100}}</label>元
					</p>
				</div>
			</div>
			<p class="goods-amount pd20">
				商品数量：
				<span>(每单限购{{goodsDetail.purchaseNum}})</span>
			</p>
			<div id="wrapper" class="goods-incre" data-flex="dir:left main:left box:mean">
				<div class="btn-decrease" @click="decrease" data-flex="main:center cross:center">-</div>
				<input type="number" class="amount" data-flex="main:center cross:center" pattern="[0-9]" v-model="goodsNum"/>
				<div class="btn-increase" @click="increase" data-flex="main:center cross:center">+</div>
			</div>
			<button class="btn btn-sure" type="" @click.prevent="buyGoods()">确定</button>
		</div>
	</div>	
	<div v-else data-flex="main:center cross:center" style="height:100%;width:100%;">
		<div>
			<p class="">加载中...</p>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import goodsDetailService from  '../../service/GoodsDetailService';
import cartService from '../../service/CartService';
import {Toast} from 'mint-ui';
import {userUtil,jfNative,cookieUtil} from'../../assets/js/common';
export default{
	data() {
		return {
			flag: '0',// 判断点击的是哪个按钮。0：立即购买，1：加入购物车
			index: '1', // 轮播图的index
			showCover: false, // 是否显示遮罩层
			goodsNum: 1, // 购买数量
			badge: '', // 购物车旁数字
			productid:this.$route.query.productId || location.href.split('=')[1], // 产品id
			token: '' // 用户token
		}
	},
	created(){
		this.token = cookieUtil.get('login_token'); // 获取token
		// 获取详情
		goodsDetailService.getGoodsDetail({productid:this.productid})
		.then(res =>{
			if(res.respCode === '0000'){
				this.getGoodsDetail(res.data[0])
				console.log(res.data[0])
			}
		})
		// 初始化时判断是否登录，若登录则显示购物车数字
		if(this.$root.checkLogin()){
			cartService.getCartList({login_token: this.token})
			.then(res => {
				if(res.respCode === '0000'){
					this.badge = res.data.count
				}
			})
		}
	},
	// 页面消失的时候清空详情页面数据
	destroyed(){
		this.getGoodsDetail({});

	},
	computed:{
		...mapState(['goodsDetail','isWeChat','loginStatus']),
		badgeNum() {
			if(this.badge >= 10){
				return 'N';
			}else{
				return this.badge;
			}
		}
	},
	methods: {
		...mapActions(['getGoodsDetail']),
		// getQueryString(name){  
		// 	let url = window.location.hash;
		// 	let index = url.indexOf('=');  
		// 	let id = url.substr((index+1), url.length);
		// 	return id; 
		// },
		// 轮播图更换时，下方的数字跟着改变
		handleChange(index){
			index = index + 1;
			this.index = index;
		},
		// 点击立即购买
		buyNow(){
			if (this.$root.checkLogin()) {
				if(this.goodsDetail.goodsType === '1'){
					this.buyGoods();
				}else{
					this.showCover = true;
					this.flag = '0';
				}
			}else{
				userUtil.checkLogin(location.origin+location.pathname+'#/goodsDetail?productid='+this.productid);
			}
		},
		// 加入购物车
		addInCart(productid){
			if (this.$root.checkLogin()) {
				this.showCover = true;
				this.flag = '1';
			}else{
				userUtil.checkLogin(location.origin+location.pathname+'#/goodsDetail?productid='+this.productid);
			}
		},
		// 关闭选择数量弹框
		handleClose(){
			this.showCover = false;
		},
		// 增加数量
		increase(){
			this.goodsNum++;
			if(this.goodsNum>this.goodsDetail.purchaseNum){
				Toast('不能超过限购数量');
				this.goodsNum = this.goodsDetail.purchaseNum;
			}else{

			}
		},
		// 减少数量
		decrease(){
			this.goodsNum <= 1 ? this.goodsNum = 1 : this.goodsNum--
		},
		// 确认购买
		buyGoods(){
			if(!this.goodsNum){
				Toast('商品数量不能小于1');
			}else if(this.flag === '1'){
				this.token = cookieUtil.get('login_token');
				goodsDetailService.addInCart({
					productid: this.productid,
					goodscount: this.goodsNum + '',
					login_token: this.token
				}).then(res => {
						if(res.respCode === '0000'){
							Toast(res.data);
							this.showCover = false;
							cartService.getCartList({login_token:this.token})
							.then(res => {
								if(res.respCode === '0000'){
									this.badge = res.data.count;
								}
							})
						}else {
							Toast(res.respMsg);
						}
					})
			}else {
				location.href = '/confirm/confirmorder/'+this.goodsNum+'/'+this.productid+'.htm';
			}
		},
		// 回退
		goBack(){
			console.log('router', this.$router);
			if(this.$router.currentRoute.fullPath.indexOf('fromAPP')>0){
				window.jfNative = jfNative;
				window.jfNative.open('device', 'closewebview')
			}else{
				location.href='';
				this.getGoodsDetail({});
				this.$router.go(-1);
			}
			
		},
		// 点击购物车按钮，去购物车页面
		goCart(){
			if (this.$root.checkLogin()) {
				this.$router.push({path: '/cart'});
			} else{
				userUtil.checkLogin(location.origin+location.pathname+'#/cart');
			}
		},
		// 回首页
		goHome (){
			// this.$router.push({path: '/index'});
			window.jfNative.open('device', 'closewebview');
		}
	},
	watch: {
		goodsNum(value){
			if(!value){
				Toast('商品数量不能小于1');
			}else{
				value = parseInt(value);
				if(value<1){
					Toast('商品数量不能小于1');
					this.goodsNum = 1;
				}else if(value>this.goodsDetail.purchaseNum){
					Toast('不能超过限购数量');
					this.goodsNum= this.goodsDetail.purchaseNum;
				}
			}
			
		}
	}
}
</script>
<style lang="scss">
@import '../../assets/style/common';
@import '../../assets/style/mixin.scss';
 	.goods-detail{
 		height: 100%;
 		.goods-detail-header{
 			position: fixed;
			top: 10px;
			width: 100%;
			z-index: 99;
			padding: 0 20px;
			font-weight: bold;
			img{
				width: 35px;
			}
			.cart-badge{
				position: absolute;
				right: 0;
				color: #f42a38;
				font-size: 8px;
				width: 5px;
				height: 5px;
				margin-right: 25px;
			}
 		}
		.goods-detail-swipe{
			position: relative;
		}
		.mint-swipe {
			height: 300px;
			img{
				width: 100%;
			}
		}
		.swipe-index-label{
			position: absolute;
			bottom: 0;
			right: 0;
			margin: 10px;
			color: #fff;
			letter-spacing: 2px;
		}
		.goods-detail-content{
			padding: 10px;
			background: #fff;
			.campaign {
			    margin-top: 0.7rem;
			    font-size: 0.7rem;
			    line-height: 2.5rem;
			    border-top: 1px solid #ededed;
			}
			.returnSales {
			    font-size: 0.7rem;
			    line-height: 2.5rem;
			    border-top: 1px solid #ededed;
			}
			.goods-title{
				font-size: 18px;
			}
		}
		.goods-detail-introduce{
			img{
				width: 100%;
			}
		}
		.explain{
			margin-bottom: 50px;
		}
		.goods-name-left{
			color: #999;
			font-size: 14px;
			margin: 5px 0;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

		}
		.goods-img-left{
			width: 120px;
			height: 120px;
			float: left;
		}
		.cost{
			color: #f42a38;
			padding: 10px 0 5px 0;
		}
		.goods-detail-label{
			color: #9f9f9f;
			font-size: 12px;
		}
		.btn{
			width: 100%;
			height: 50px;
			margin-top: 10px;
			font-size: 0.7rem;
			color: #666;
			letter-spacing: 2px;
			background: #fff;
			border-bottom: 1px solid #eee;
		}
		.btn-buy{
			position: fixed;
			bottom: 0;
			background-color: $gold;
			color: #fff;
		}
		.btn-sure{
			background-color: $gold;
			color: #fff;
		}
		.btn-close{
			position: absolute;
			right: 0;
			height: 35px;
			margin: 10px;
		}
		.btn-default{
			width: 50%;
			float: left;
			border: 1px solid #eee;
			background-color: $gold;
		}
		.btn-disable{
			position: fixed;
			bottom: 0;
			background-color: #e5e5e5;
			color: #999;
		}
		.btn-go-home{
			width: 6rem;
			height: 50px;
			background: $gold;
			margin-top: 20px;
			color: #fff;
			font-size: 0.7rem;
			letter-spacing: 2px;
			border-radius: 25px;
		}
		.btn-go-back{
			width: 6rem;
			height: 50px;
			background: #fff;
			font-size: 0.7rem;
			color: $gold;
			margin-top: 20px;
			border: 1px solid $gold;
			letter-spacing: 2px;
			border-radius: 25px;
		}
		.btn-div{
			position: fixed;
		    bottom: 0;
		    width: 100%;
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
		.img-off{
			width: 10rem;
		}
		.ft16{
			font-size: 16px;
		}
		.buy-now-div{
			position: fixed;
			bottom: 0;
			width: 100%;
			background: #fff;
			z-index: 99;
		}
		.pd20{
			padding: 20px;
		}
		.goods-amount{
			font-size: 0.7rem;
			padding-top: 5px;
			padding-bottom: 5px;
		}
		#wrapper{
			@include wh(5.4rem, 1.3rem);
			@include borderRadius(0.3rem);
			@include sc(0.72rem, #bbb);
			border: 1px solid #bbb;
			margin: 0 20px;
			.btn-decrease{
				height: 1.2rem;
				border-right: 1px solid #bbb;
			}
			.amount{
				height: 1.2rem;
				line-height:1.2rem;
				text-align: center;
				border-right: 1px solid #bbb;
			}
		}
	}
</style>