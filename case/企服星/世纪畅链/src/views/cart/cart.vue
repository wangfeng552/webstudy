<template>
	<div class="cart-null" v-if="cartStatus">
		<!--<title-line :active="true" :name="name" v-if="!isWeChat" style="background:#fff;"></title-line>-->
		<mt-header fixed title="购物车" v-if="!isWeChat">
			<router-link to slot="left">
				<mt-button icon="back" @click.prevent="goBack()"></mt-button>
			</router-link>
		</mt-header>
		<div class="cart-wrapper"></div>
		<div class="cart-content">
			<p>购物车居然是空的</p>
			<p>赶紧用积分去兑换一些宝贝吧</p>
		</div>
		<div class="btn-to-home">
			<a href="javascript:;" @click="goBack()">回首页逛逛{{cartGoods.respCode}}</a>
		</div>
	</div>
	<div class="contains" v-else-if="cartGoods">
		<title-line :name="name" v-if="!isWeChat"></title-line>
		<div class="shop-name-wrapper" :class="{title:isWeChat}" v-for="(cart, index) in cartGoods.list" :mer-id="cart.merid" v-if="cart.goods.length>0">
			<div class="shop-title" data-flex="cross:center main:justify">
				<div data-flex="cross:center ">
					<a href="javascript:;" class="chose-all" @click="checkAll(cart)"  :class="{active:cart.checked}"></a>
					<p class="shop-name">{{cart.shopName}}</p>
				</div>
				<div class="btn-edit" @click="editor(cart)" v-if="!cart.edi">编辑</div>
				<div class="btn-delete-all" v-if="cart.edi" @click="delAllProduct(cart,index)">删除全部</div>
			</div>
			<div class="goods-list">
				<div class="goods-item" v-for="(item,k) in cart.goods "data-flex="cross:center" :goods-id="item.goodsid">
					<a href="javascript:;" class="chose-item" @click="selectProduct(cart,item)" :class="{active:item.checked}"></a>
					<div class="goods-right"data-flex="cross:center">
						<div class="goods-image">
							<img :src="'/'+item.goodsPic"/>
							<p class="sale-out" v-if="item.status=='02'">活动中</p>
							<p class="sale-out" v-if="item.status=='03'">已下架</p>
							<p class="sale-out" v-if="item.status=='04'">库存不足</p>
							<p class="sale-out" v-if="item.status=='05'">活动结束</p>
						</div>
						<div class="goods-info" data-flex="dir:top main:justify">
							<!--<goods-incre v-if="cart.edi" :amount="item.outCount" OnChange={this.handle}></goods-incre>-->
							<div id="wrapper" class="goods-incre" data-flex="dir:left main:left box:mean" v-if="cart.edi">
								<div class="btn-decrease" @click="changeNum(cart,item,-1)" data-flex="main:center cross:center">-</div>
								<input type="number" class="amount" data-flex="main:center cross:center" pattern="[0-9]"  v-model="item.outCount" />
								<div class="btn-increase" @click="changeNum(cart,item,1)" data-flex="main:center cross:center">+</div>
							</div>
							<p class="goods-title" v-if="!cart.edi">{{item.goodsTitle}}</p>
							<p class="limit-count" v-if="item.outCount>=item.purchasenum">限购{{item.purchasenum}}</p>
							<p class="store-count" v-if="item.outCount>=item.storeCount">最大库存{{item.storeCount}}</p>
							<p class="goods-price">{{item.points*item.outCount}}<i>积分</i>+{{item.price*item.outCount | twoNum}}<i>元</i>
								<i class="deduction" v-if="item.payType==='cust'">积分可抵扣</i>
							</p>
						</div>
						<div class="goods-amount" >
							<P v-if="!cart.edi">x{{item.outCount}}</P>
							<div class="btn-delete-single" v-if="cart.edi" @click="delProduct(cart,item,index,k)"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="total-price clear">
				<div class="total-left left" v-if="!cart.edi">
					<p>合计:</p>
					<p class="total">{{cart.points}}<i>积分</i>+{{cart.payMoney/100}}<i>元</i></p>
				</div>
				<div class="total-right right">
					<div class="calculate">
						<a href="javascript:;" v-if="!cart.edi" @click="checkMoney(cart)"> 结算</a>
						<a href="javascript:;" v-if="cart.edi"  @click="complite(cart)">完成</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import cartService from '../../service/CartService';
import titleLine from '../../components/titleLine/titleLine';
import {MessageBox} from 'mint-ui';
import {Toast} from 'mint-ui';
import {jfNative,cookieUtil} from'../../assets/js/common';

export default {
	data() {
		return {
			name:'购物车',
			amount:0,
			productList:[],
			cartStatus:false
		}
	},
	components:{
		titleLine,
		MessageBox
	},
	created(){
		var _this = this
		let token = cookieUtil.get('login_token');
		cartService.getCartList({login_token: token})
			.then(res => {
				if(res.respCode === '0000'){
					this.cartGoods.list = []
					var shop = JSON.parse(res.data.shop)
					if(shop.length>0){
						shop.forEach(function(cart,index){
							if(typeof cart.checked == 'undefined'){
								_this.$set(cart, 'checked',true);
							}else{
								cart.checked = !cart.checked;
							}
							if(cart.goods.length>0){
								cart.goods.forEach(function(item,index){
									if(typeof item.checked === 'undefined'){
										if(item.status!=='01'&& item.status!=='02'){
											_this.$set(item, "unchecked",false)
										}else {
											_this.$set(item, "checked",true)
											_this.colPrice(cart)
										}
									}else{
										item.checked = !item.checked;
										if(item.checked){
											_this.colPrice(cart)
										}
									}
								})
							}
						})
						this.loadCartList(shop);
					}
					if(res.data.count=='0'){
						this.cartStatus = true
					}else{
						this.cartStatus = false
					}
					//this.cartStatus=false
				}else{
					//this.cartStatus=true
				}
			})
	},
	mounted(){
	},
	filters:{
		twoNum(value){
			return value/100
		}
	},
	computed:{
		...mapState(['cartGoods','isWeChat'])
		
	},
	methods:{
		...mapActions(['loadCartList']),
		//编辑按钮
		editor(cart){
			if(typeof cart.edi == 'undefined'){
				this.$set(cart,"edi",true)
			}else {
				cart.edi = !cart.edi
			}
		},
		//完成按钮
		complite(cart){
			var _this = this
			var flagThree = false
			var amounts = {shop:{shopName:0,selectTime:0,payMoney:0,points:0,merid:0,goods:[]}}
			amounts.shop.shopName = cart.shopName
			amounts.shop.selectTime = cart.selectTime
			amounts.shop.payMoney = cart.payMoney
			amounts.shop.points= cart.points
			amounts.shop.merid = cart.merid
			cart.edi = !cart.edi
			cart.goods.forEach(function(item,index){
				if((item.outCount<=item.storeCount && item.outCount>0) && (item.outCount<=item.purchasenum)){
					amounts.shop.goods.push(item)
					flagThree = true
				}else if(item.outCount>item.purchasenum){
					flagThree = false
					item.outCount=item.purchasenum
					Toast('商品限购,请修改数量')
				}else if(item.outCount>item.storeCount){
					item.outCount=item.purchasenum
					flagThree = false
					Toast('商品库存不足,请修改数量')
				}else if(item.outCount<=0){
					item.outCount = 1
				}
			})
			
			if(flagThree){
				cartService.editCart({
					shop:JSON.stringify(amounts.shop)
				}).then(res => {
					if(res.respCode === '0000'){
						//Toast('编辑成功')
					}else{
						//Toast('编辑失败');
					}
				})
			}
		},
		//全选商品
		checkAll(cart){
			let _this = this;
			if(typeof cart.checked == 'undefined'){
				this.$set(cart, "checked",true);
			}else{
				cart.checked = !cart.checked;
			}
			cart.goods.forEach(function(item,index){
				if(typeof item.checked === 'undefined'){
					if(item.status!=='01' &&  item.status!=='02'){
						_this.$set(item, 'unchecked', false)
					}else {
						_this.$set(item, 'checked', cart.checked)
					}
				}else{
					item.checked = cart.checked
				}
			})
					this.colPrice(cart,cart.goods)
			
		},
		//单选商品
		selectProduct(cart,item){
			if(typeof item.checked === 'undefined'){
				if(item.status!=='01'&& item.status!=='02'){
					this.$set(item, "unchecked",false)
				}else {
					this.$set(item, "checked",true)
					this.colPrice(cart)
				}
			}else{
				item.checked = !item.checked;
				if(item.checked){
					this.colPrice(cart)
				}
			}
				this.colPrice(cart,item)
		},
		//商品数量加减
		changeNum(cart,item,flag){
			var amounts = {shop:{shopName:0,selectTime:0,payMoney:0,points:0,merid:0,goods:[]}}
			if(flag>0){
				item.outCount++
				if(item.outCount>item.purchasenum){
					item.outCount=item.purchasenum
				}
			}else{
				item.outCount--
				if(item.outCount<1){
					item.outCount=1
				}
			}
			this.colPrice(cart,item)
		},
		//价格计算
		colPrice(cart){
			var _this = this
			cart.payMoney=0
			cart.points=0
			var flag = false
			var flagFor = true
			var flagFiv = true
			cart.goods.forEach(function(item,index){
				if(item.checked && item.outCount<=item.storeCount && item.outCount<=item.purchasenum ){
					cart.payMoney+=item.outCount*item.price
					cart.points+=item.outCount*item.points
					flag = true
				}else if(item.checked && item.outCount>item.storeCount){
					flag = false
					flagFor = false
				}else if(item.checked && item.outCount>item.purchasenum){
					flag = false
					flagFiv = false
				}
			})
			if(!flagFor){
				this.lackProduct()
			}
			if(!flagFiv){
				this.limitBuy()
			}
			return flag
		},
		//计算总价(结算)
		checkMoney(cart){
			var accounts='' 
			var _this = this
			var flagOne = false
			var flagTwo = false
			cart.goods.forEach(function(item,index){
				if(item.checked && (item.status=='01'||item.status=='02')){
					_this.colPrice(cart)
					flagOne = true
					accounts+=item.productid+'&'+item.outCount+','
				}
				if((typeof item.checked =='undefined' || item.checked == false)&&(item.status=='01'||item.status=='02')){
					flagTwo = true
				}
				
			})
			if(!flagOne && flagTwo){
				this.unselectProduct()
			}
			if(this.colPrice(cart)){
				location.href='/confirm/confirmorder/shop/'+accounts+'.htm'
			}
		},
		//删除单个商品
		delProduct(cart,item,index,k){
			var _this = this
			var delSingleGoods = {shop:{shopName:0,selectTime:0,payMoney:0,points:0,merid:0,goods:[]}}
			MessageBox.confirm('',
			  '确定删除该商品么？'
		).then(
				function(){
						_this.cartGoods.list[index].goods.splice(k,1)
						if(_this.cartGoods.list[index].goods.length === 0){
							_this.cartGoods.list.splice(index,1)
						}
						if(_this.cartGoods.list.length === 0){
							_this.cartStatus = true
						}else {
							_this.cartStatus = false
						}
							delSingleGoods.shop.shopName = cart.shopName
							delSingleGoods.shop.selectTime = cart.selectTime
							delSingleGoods.shop.payMoney = cart.payMoney
							delSingleGoods.shop.points= cart.points
							delSingleGoods.shop.merid = cart.merid
							delSingleGoods.shop.goods.length = 0
							delSingleGoods.shop.goods.push(item)
							cartService.delCart({
								shop: JSON.stringify(delSingleGoods.shop)
							}).then(res => {
								if(res.respCode === '0000'){
									Toast('删除成功')
								}else{
									Toast(res.respMsg);
								}
							})
				}
				
			);
		},
		//删除全部商品
		delAllProduct(cart,index){
			var _this = this
			var delAllGoods = {shop:{shopName:0,selectTime:0,payMoney:0,points:0,merid:0,goods:[]}}
			MessageBox.confirm('',
			  '确定全部删除么？'
			).then(
				function(){
					cart.goods.forEach(function(item,k){
						if(cart.checked){
							_this.cartGoods.list.splice(index,1)
							delAllGoods.shop.shopName = cart.shopName
							delAllGoods.shop.selectTime = cart.selectTime
							delAllGoods.shop.payMoney = cart.payMoney
							delAllGoods.shop.points= cart.points
							delAllGoods.shop.merid = cart.merid
							delAllGoods.shop.goods.push(item)
						}else{
							_this.unselectAll()
						}
					})
					if(_this.cartGoods.list.length === 0){
							_this.cartStatus = true
						}else {
							_this.cartStatus = false
						}
					if(cart.checked){
						cartService.delCart({
							shop:JSON.stringify(delAllGoods.shop)
						})
						.then(res => {
							if(res.respCode === '0000'){
								Toast('删除成功')
							}else{
								Toast(res.respMsg);
							}
						})
					}else {
						_this.unselectAll()
					}
				}
			)
		},
		//库存不足弹框
		lackProduct(){
			MessageBox({
			  title: '所选商品库存不足,请修改',
			  showCancelButton: true,
			  showConfirmButton:true,
			  confirmButtonClass:'btn-confirm',
			  cancelButtonClass:'btn-cancel'
			});
		},
		//商品限购
		limitBuy(){
			MessageBox({
			  title: '商品限购',
			  showCancelButton: true,
			  showConfirmButton: true
			});
		},
		//未选中商品
		unselectProduct(){
			MessageBox({
			  title: '您还没有选择宝贝哦',
			  showCancelButton: true,
			  showConfirmButton: true
			});
		},
		//全选商品
		unselectAll(){
			MessageBox({
			  title: '您还没有全部选择哦',
			  showCancelButton: true,
			  showConfirmButton: true
			});
		},
		goBack(){
			if(this.$router.currentRoute.fullPath.indexOf('fromAPP')>0){
				window.jfNative = jfNative;
				window.jfNative.open('device', 'closewebview')
			}else{
				this.$router.push({path: '/index'});
			}
		}
		
	}
}

</script>

<style lang="scss">
 @import '../../assets/style/common';
 @import '../../assets/style/mixin';
 	#wrapper{
   	  @include wh(5.4rem, 1.3rem);
   	  @include borderRadius(0.3rem);
   	  @include sc(0.72rem, #bbb);
   	  border: 1px solid #bbb;
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
 	.cart-null{
 		.cart-wrapper{
			width:8.5rem;
			height:8rem;
			margin:5rem auto 2.1rem auto;
			background:url('../../assets/images/cartNull.jpg');
			background-size:100% 100%;
		}
		.cart-content{
			font-size:0.75rem;
			color:#b2b2b2;
			text-align:center;
			margin-bottom:1.1rem;
		}
		.btn-to-home{
			width:9rem;
			height:2.2rem;
			margin:0 auto;
			text-align:center;
			line-height:2.2rem;
			border-radius:1.1rem;
			background:#d3b669;
			font-size:0.8rem;
				a{
					color:#fff;
				}
		}
 	}
	.shop-name-wrapper{
		background:#fff;
		padding:2.8rem 0 0.8rem  0.5rem;
		.shop-title{
			padding-right:0.5rem;
			margin-bottom:0.5rem;
			font-size:0.75rem;
			.chose-all{
				width:1rem;
				height:1rem;
				margin-right:0.5rem;
				border-radius:50%;
				background:url('../../assets/images/check.jpg');
				background-size:100% 100%;
			}
			.chose-all.active{
				background:url('../../assets/images/checked.jpg');
				background-size:100% 100%;
			}
			.btn-edit{
				color:#d3b669;
			}
			.btn-delete-all{
				color:#d3b669;
				font-size:0.7rem;
			}
		}
		.goods-list{
			.goods-item{
				padding-top:0.5rem;
				.chose-item{
					width:1rem;
					height:1rem;
					border-radius:50%;
					background:url('../../assets/images/check.jpg');
					background-size:100% 100%;
				}
				.chose-item.active{
					background:url('../../assets/images/checked.jpg');
					background-size:100% 100%;
				}
				.goods-right{
					width: 100%;
					padding:0 0.5rem 0.6rem 0.5rem;
					border-bottom:thin solid #e5e5e5;
					.goods-image{
						position:relative;
						margin-right:0.5rem;
						.sale-out{
							position: absolute;
							top: 50%;
							left: 50%;
							margin-left:-1.5rem;
							margin-top:-1.5rem;
							height: 3rem;
							width: 3rem;
							background: #ababab;
							border: 1px solid #fcfcfc;
							border-radius: 50%;
							text-align: center;
							line-height: 3rem;
							color: #fff;
							font-size: 14px;
						}
						img{
							width:4rem;
							height:4rem;
						}
					}
					.goods-info{
						height:4.3rem;
						font-size:0.6rem;
						line-height:1rem;
						margin-right:0.3rem;
						.goods-title{
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
						p{
							width: 6.5rem;
						    height: 0.9rem;
						    overflow: hidden;
						    text-overflow: ellipsis;
						}
						.store-count{
							color:#ffab58;
						}
						.limit-count{
							color:#ffab58;
						}
						i{
							font-size:0.5rem;
						}
						.deduction{
							position:absolute;
							right:20px;
							padding:0 0.1rem;
							color:#ffab58;
							border:1px solid #ffab58;
						}
					}
					.goods-amount{
						width:0.9rem;
						height:5rem;
						margin-left: 1rem;
						vertical-align:top;
						font-size:0.6rem;
						.btn-delete-single{
							width:0.9rem;
							height:1rem;
							background:url('../../assets/images/delete.jpg');
							background-size:100% 100%;
						}
					}
				}
			}
		}
		.total-price{
			padding:0.5rem 0.5rem 0 1.5rem;
			p{
				font-size:0.75rem;
			}
			.total{
				font-size:1rem;
				color:#fe353f;
				i{
					color:#fe353f;
					font-size:0.6rem;
				}
			}
			.calculate{
				width:5rem;
				height:2rem;
				border-radius:1rem;
				text-align:center;
				line-height:2rem;
				font-size:0.8rem;
				background:#d3b669;
				a{
					display:block;
					color:#fff;
				}
			}
		}
	}
	.shop-name-wrapper.title{
 		padding:0.5rem 0 0.8rem  0.5rem;
 	}
	.mint-msgbox{
		width:15rem;
		border-radius:0.3rem;
		.mint-msgbox-content{
			padding:1.9rem 0 2rem 0;
			.mint-msgbox-title{
				height:2rem;
				color:#333;
				font-size:0.8rem;
			}
		}
		.mint-msgbox-header{
			padding:1.9rem 0 2rem 0;
			.mint-msgbox-title{
				color:#333;
				font-size:0.8rem;
			}
		}
		.mint-msgbox-btns{
				height:2.5rem;
				border-top:1px solid #ddd;
				.mint-msgbox-btn{
					font-size:0.9rem;
				}
				.mint-msgbox-confirm{
					color:#d9c07d;
				}
			}
	}
</style>