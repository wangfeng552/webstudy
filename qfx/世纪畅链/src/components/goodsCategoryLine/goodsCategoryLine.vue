<template>
	<div class="category-line">
		<hr class="hr-line">
		<label for="" class="lable-title">{{title}}</label>
		<hr class="hr-line">
		<a :href="site" class="has-more"  v-if="hasMore">更多></a>
	</div>
</template>
<script>
	export default{
		name: 'goodsCategoryLine',
		props: {
			title: {
				type: String,
				required: true,
				default:'爆款直降'
			},
			hasMore: {
				type: Boolean,
				default: false
			},
			site: {
				type: String,
				default:'https://m.jfmore.com/mall/#/goodsList?categoryid=000120'
			}
		},
		data(){
			return {
			}
		},
		created(){
		},
		mounted(){

		},
		methods: {
			findMore(){
				this.$emit('findMore');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.category-line{
		position: relative;
		text-align: center;
		background: #fff;
		color: #333;
		font-size: 16px;
		line-height: 50px;
		.hr-line{
			display: inline-block;
			width: 50px;
			height: 1px;
    		margin-bottom: 3px;
			border: none;
			border-top:1px solid #ccc;
		}
		.lable-title{
			margin: 0 10px;
			font-size: 14px;
		}
		.has-more{
			position: absolute;
			top: 0;
			right: 0;
			font-size: 14px;
			background: #fff;
			color: #999;
    		margin-right: 5px;
		}
	}
</style>