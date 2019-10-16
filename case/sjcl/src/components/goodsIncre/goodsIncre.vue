<template>
	<div id="wrapper" class="goods-incre" data-flex="dir:left main:left box:mean">
		<div class="btn-decrease" @click="decrease" data-flex="main:center cross:center">-</div>
		<input type="text" class="amount" data-flex="main:center cross:center" v-model="goodsNum"  onChange="reserver(goodsNum)"/>
		<div class="btn-increase" @click="increase" data-flex="main:center cross:center">+</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';	
	export default {
		name:'goodsIncre',
		props: {
			amount: {
				type: Number,
				default: 1
			},
			onChange:{
				type:Function
			}
		},
		data(){
			return {
				goodsNum:this.amount
			}
		},
		created(){
			
		},
		mounted(){
			
		},
		methods:{
			reserver(num){
				console.log(num);
			},
			decrease(){
				this.goodsNum--
				if(this.goodsNum<1){
					this.goodsNum=1
				}
				//this.onChange({type: 'decrease', num: this.goodsNum})
				//this.getCartGoodsAmount(this.goodsNum)
			},
			increase(){
				this.goodsNum++
				this.reserver(this.goodsNum)
				console.log(this.onChange)
				//this.onChange({type: 'increase', num: this.goodsNum})
				//this.getCartGoodsAmount(this.goodsNum)
			},
			//...mapActions(['getCartGoodsAmount'])
		},
		computed:{
			//...mapState(['cartGoodsAmount'])
		}
	}
</script>

<style lang="scss" scoped>
   @import '../../assets/style/mixin';
   @import '../../assets/style/common';
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
   
</style>