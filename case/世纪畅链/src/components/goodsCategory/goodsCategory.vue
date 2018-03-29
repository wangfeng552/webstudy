<template>
	<div class="goods-category" >
		<div class="clear">
			<div  class="category-item" v-for="(c,index) in categoryArray" >
				<div @click="goList(c.categoryid)">
					<img class="category-icon" :src="'/'+c.poppic" alt="" >
					<label class="category-name">{{c.categoryname}}</label> 
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
	export default{
		name: 'goodsCategory',
		data(){
			return {
			}
		},
		props: {
			categoryArray: {
				type: Array,
				required: true
			}
		},
		created(){

		},
		mounted(){

		},
		computed: {
			...mapState(['goodsListData'])
		},
		methods: {
			...mapActions(['getSubCategoryList']),
			goList(categoryid){
				this.goodsListData.list = [];
				this.$router.push({path:'/goodsList',query: {categoryid: categoryid}});
				this.getSubCategoryList(this.categoryArray);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.goods-category{
		background: #fff;
		.category-item{
			width: 33%;
			float: left;
			height: 80px;
			margin: 15px 0;
			text-align: center;
		}
		.category-icon{
			display: block;
			width: 50px;
			height: 50px;
			margin-left: 25%;
			border-radius: 50%;
		}
		.category-name{
			font-size: 14px;
			color: #666;
		}
	}
</style>