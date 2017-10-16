<template>
	<div v-if="imgDirection === 'left'"  class="goods-list">
		<div class="goods-list-item-left"  v-for="(goods,index) in goodsListData.list" data-flex="" @click.prevent="goDetail(goods.productId)">
			<div data-flex-box="0" class="goods-img-left">
				<div class="" :style="{width:'100%',height:'150px',backgroundImage:'url('+'/'+goods.centerPic+')',backgroundSize:'100% 100%'}"></div>
				<p class="sale-out-left" v-if="goods.storeCount === '0'">抢光了</p>
			</div>
			<div data-flex-box="1" class="goods-content">
				<h4 class="goods-title">{{goods.goodsName}}</h4>
				<p class="goods-name goods-name-left">{{goods.subtitle}}</p>
				<p class="cost" v-if="goods.payType === 'cash'">
					<label class="cost-label">{{goods.price/100}}</label>元
				</p>
				<p class="cost" v-if="goods.payType === 'points'">
					<label class="cost-label">{{goods.points}}</label>积分
				</p>
				<p class="cost" v-if="goods.payType === 'comb'">
					<label class="cost-label">{{goods.points}}</label>积分 + <label class="cost-label">{{goods.price/100}}</label>元
				</p>
				<p class="cost" v-if="goods.payType === 'cust'">
					<label class="cost-label">{{goods.price/100}}</label>元
					<label class="label-style">积分可扣减</label>
				</p>
			</div>
		</div>
	</div>

	<div class="goods-list"  v-else-if="goodsListData.list && goodsListData.list.length>0">
		<div class="goods-list-item" v-for="(goods,index) in goodsListData.list" @click.prevent="goDetail(goods.productId)">
			<div class="" :style="{width:'100%',height:'150px',backgroundImage:'url('+'/'+goods.centerPic+')',backgroundSize:'100% 100%'}"></div>
			<p class="sale-out" v-if="goods.storeCount === '0'">抢光了</p>
			<p class="goods-name">{{goods.goodsName}}</p>
			<p class="cost" v-if="goods.payType === 'cash'">
				{{goods.price/100}}元
			</p>
			<p class="cost" v-if="goods.payType === 'points'">
				{{goods.points}}积分
			</p>
			<p class="cost" v-if="goods.payType === 'comb'">
				{{goods.points}}积分 + {{goods.price/100}}元
			</p>
			<p class="cost" v-if="goods.payType === 'cust'">
				{{goods.price/100}}元
				<label class="label-style">积分可扣减</label>
			</p>
		</div>
		<div id="igoToTop" class="go-to-top" v-if="showGoToTop">
			<a class="to-top-triangle"></a>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'goodsList',
		props: {
			goodsListData: Object,
			imgDirection: {
				type: String,
				default: 'top'
			}
		},
		data(){
			return {
				showGoToTop: false
			}
		},
		created(){

		},
		mounted(){

		},
		computed: {

		},
		methods: {
			goDetail(productId){
				this.$router.push({path: '/goodsDetail', query: {productId: productId}});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.goods-list{
		padding-left: 10px;
    	background: #fff;
    	padding-top: 10px;
    	.goods-title{
    		color: #4a4a4a;
			height: 20px;
			line-height: 20px;
			margin-bottom: 5px;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
    	}
		.goods-name{
			color: #4a4a4a;
			height: 40px;
			line-height: 20px;
			margin-bottom: 5px;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.sale-out{
			position: absolute;
			top: 15%;
			left: 20%;
			height: 100px;
			width: 100px;
			background: #000;
			border-radius: 50%;
			text-align: center;
			line-height: 100px;
			color: #fff;
			font-size: 18px;
			opacity:0.6;
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

		.goods-list-item{
			display: inline-block;
			width: 50%;
			background: #fff;
			box-shadow: none;
			position: relative;
			font-size: 14px;
			text-align: left;
			padding: 0 10px 10px 0;
		}
		.goods-list-item .goods-img{
			width: 100%;
			height: 150px;
		}

		.cost{
			color: #f82525;
		}
		.cost .label-style{
			display:inline-block;
			line-height:1.5;
			border: 1px solid #ffc993;
			font-size: 14px;
			padding: 0 2px;
			color: #ffc993;
			margin-left: 10px;
		}
		.goods-name-left{
			color: #999;
			height: 40px;
			font-size: 14px;
			margin: 5px 0;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

		}
		.goods-list-item-left{
			display: block;
			position: relative;
			width: 100%;
			padding-top: 10px;
			font-size: 14px;

			.goods-img-left{
				width: 120px;
				height: 120px;
				float: left;
			}
			.goods-content{
				height: 120px;
				margin-left: 130px;
				margin-right: 10px;
				padding: 10px 0;
				border-bottom: 1px solid #e5e5e5;
			}
			.sale-out-left{
				position: absolute;
				top: 0;
				left: 0;
				height: 100px;
				width: 100px;
				background: #ababab;
				border: 1px solid #fcfcfc;
				border-radius: 50%;
				text-align: center;
				line-height: 100px;
				color: #fff;
				font-size: 18px;
				margin-top: 20px;
    			margin-left: 10px;

			}
			.cost-label{
				font-size: 24px;
			}
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