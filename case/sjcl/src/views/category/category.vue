<template>
	<div class="category">
		<mt-header fixed title="分类" v-if="!isWeChat">
			<router-link to slot="left">
				<mt-button icon="back" @click.prevent="goBack()"></mt-button>
			</router-link>
		</mt-header>
		<ul class="category-ul" :class="{title:!isWeChat}">
			<li class="category-li" v-for="(c, i) in categoryList" @click="selectCategory(c.categoryid)"><a class="category-a" :class="{active: select === c.categoryid}" href="javascript:;" title="">{{c.categoryname}}</a></li>
		</ul>
	
		<div class="category-item-div" v-if="categoryListTwo.length>0">
			<!-- <img :src="categoryListTwo.picture" alt=""> -->
			<div v-for="(c,index) in subCategoryList">
				<goods-category-line :title="c.categoryname"></goods-category-line>
				<goods-category :categoryArray="c.list" ></goods-category>		
			</div>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import goodsCategory from '../../components/goodsCategory/goodsCategory';
import goodsCategoryLine from '../../components/goodsCategoryLine/goodsCategoryLine';
import goodsCategoryService from '../../service/GoodsCategoryService';
import {Toast} from 'mint-ui';
export default{
	data(){
		return {
			categoryList:[],// 获取到的所有商品分类
			categoryListTwo: [], // 遍历得到的所有非一级分类
			subCategoryList: [], // 遍历得到所有二级分类
			select: 0, // 选中的大类
			selectPic: ''// 选中的大类对应的图片
		}
	},
	components: {
		goodsCategory,
		goodsCategoryLine
	},
	created(){
		let _this = this;
		// 获取分类列表
		goodsCategoryService.getGoodsCategoryList()
		.then(res => {
			if(res.respCode === '0000'){
				for(let c of res.data){
					if(c.lev === 0){
						_this.categoryList.push(c);
					}else{
						_this.categoryListTwo.push(c);
					}
				}
				// 默认选中第一个分类
				_this.selectCategory(_this.categoryList[0].categoryid);

			} else{
				Toast(res.respMsg);
			}
		})

	},
	computed: {
		...mapState(['goodsCategoryList','isWeChat'])
	},
	methods: {
		...mapActions(['getGoodsCategoryList']),
		// 选择分类
		selectCategory(categoryid){
			this.subCategoryList = [];
			if(this.categoryList.length>0){
				this.select = categoryid;
				for(let item of this.categoryListTwo){
					// 得到二级分类
					var category = {
						list: []
					};
					if(this.select === item.parentid && item.lev === 1){
						let categoryid = item.categoryid;
						category.categoryname = item.categoryname;
						for(let i of this.categoryListTwo){
							if(i.parentid === categoryid && i.lev !== 1){
								category.list.push(i);
							}
						}
						this.subCategoryList.push(category);

					}
				}
			}
		},
		goBack(){
			this.$router.go(-1);
		}
	}
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
	.category{
		background: #fff;
		height: 100%;
		position: relative;

		.mint-header{
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			font-size: 0.8rem;
		}
		.category-ul{
			position: fixed;
			float: left;
			width: 5rem;
			height: 100%;
			background: #fff;
			overflow: scroll;
			border-right: 1px solid #e5e5e5;
		}
		.category-ul.title{
			margin-top:40px;
			font-size:20px;
		}
		.category-li{
			position: relative;
			height: 30px;
			line-height: 30px;
			margin-top: 18px;
			text-align: center;
		}

		.active{
			color: $gold;
			border-left: 3px solid $gold !important;
		}

		.category-a{
			display: inline-block;
			position: absolute;
			top: 0;
			left: 0;
			font-size: 0.8rem;
			padding-left: 1.0em;
			border-left: 3px solid #fff;
		}
		.category-item-div{
			text-align: center;
			padding-top: 35px;
			margin-left: 5rem;
			overflow: scroll;
			height: 100%;
		}
}
</style>