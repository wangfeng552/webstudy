<template>
	<div  @click.prevent="goCart">
		<div id="cart" class="shopping-cart">
			<div class="good-status" v-if="cartStatus && loginStatus"></div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import cartService from '../../service/CartService';
import {userUtil,browserUtil} from'../../assets/js/common';
import {jfNative,cookieUtil} from'../../assets/js/common';
import {Toast} from 'mint-ui';
	export default{
		name:'shoppingCart',
		data(){
			return{
				cartStatus:true
			}
		},
		created(){
			let token = cookieUtil.get('login_token');
			cartService.getCartList({login_token: token})
				.then(res => {
					if(res.respCode === '0000'){
						this.loadCartList(res.data.shop);
						if(res.data.count == '0'){
							this.cartStatus=false
						}else{
							this.cartStatus=true
						}
					}
				})
		},
		methods:{
			...mapActions(['loadCartList']),
			goCart(){
				if (this.$root.checkLogin()) {
					this.$router.push('/cart');
				}else{
					userUtil.checkLogin(location.origin+location.pathname+'#/cart');
				}
				
			}
		},
		computed:{
			...mapState(['cartGoods','loginStatus'])
		}
	}
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin';
  @import '../../assets/style/common';
    #cart{
    	position:fixed;
    	top: 80%;
    	right:0.4rem;
    	z-index:999;
    	@include wh(3rem, 3rem);
    	@include borderRadius(1.5rem);
    	background:url('../../assets/images/cart.png');
    	background-size:100% 100%;
    	box-shadow: 1px 3px 20px #666;
    	a{
    		display:block;
    	}
    	img{
    		@include wh(1.5rem, 1.5rem);
    		@include center;
    	}
    	.good-status{
    		position:absolute;
    		top:10px;
    		right:0;
    		@include wh(0.5rem, 0.5rem);
    		@include borderRadius(0.25rem);
    		background:url('../../assets/images/status.png');
    		background-size:100% 100%;
    		
    	}
    } 
</style>