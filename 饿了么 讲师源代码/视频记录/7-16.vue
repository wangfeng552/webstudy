<template>
	<div class="cartconcol">
		<div class="cart-decrease" @click="decreasecart" v-show="food.count>0">-</div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click="addCart">+</div>
	</div>
</template>
<script>
import Vue from 'vue'
	export default {
		props:{
			food:{
				type:Object
			}
		}
		methods:{
			_initScroll(){
				this.menuScroll=new BScroll(this.$els.menuWrapper,{		//使用better-scroll里的元素点击事件设置为true
					click:true
				})
			},

			addCart(event) {
				if(!event._constructed){ 	//点击出发一次
					return
				}
				if(!this.food.count){  //判断food.count是否存在
					this.food.count=1 //这个方法不能用
					//新增和删除
					Vue.set(this.food,'count',1)
				}else {
					this.food.count++
				}
			},

			decreasecart(event){
				if(!event._constructed){ 	//点击出发一次
					return
				}
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>
