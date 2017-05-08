<template>
	<div>{{totalPrice}}</div>
	<div>{{payDesc}}</div>
	<div class="pay" :class='payClass'></div>
</template>
<script type="text/javascript">
	export default{
		props: {
			selectFoods:{
				type:Array,  //Array或Object类型
				default() {  //设置初始值要函数返回
					return [
						{price:10,count:2} //初始价格10,1件
					]
				}
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) =>{
					tptal += food.price*food.count;  //遍历所有选择的商品和数量的总价
				})
				return total;
			}
		},
		payDesc(){
			if(this.totalPrice===0){
				return `${this.minPrice}元起送`
			}else if(this.totalPrice<this.minPrice) {
				let diff = this.minPrice-this.totalPrice;
				return `还差${diff}元起送` 
			}else{
				return ' 去结算'
			}
		},
		//class计算显示div
		payClass(){
			if(this.totalPrice<this.minPrice){
				return 'not-enough'
			}else{
				return 'enough'
			}
		}
	}
</script>


 <!-- 显示不同的ico -->