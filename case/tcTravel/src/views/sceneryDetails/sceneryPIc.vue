<template>
	<div class="scenery-pic">
		<header-fix fixed :title="name"></header-fix>
			<div class="main">
				<div class="img-box" v-for="(img, i) in pic" :key="i">
					<img  v-lazy="img.sceneryImgPath" @click="showNow(i)">
				</div>
			</div>
			<div class="swiper-box" v-if="show" @click.self="showNow()">
				<mt-swipe :show-indicators="false" :auto="0" :defaultIndex="index">
					<mt-swipe-item v-for="(img,i) in pic" :key="i">
						<img :src="img.sceneryImgPath" >
					</mt-swipe-item>
				</mt-swipe>
			</div>
			
	</div>
</template>
<script>
	import headerFix from "../../components/header";
	import { Lazyload } from 'mint-ui';
	import Vue from "vue";
    Vue.use(Lazyload);
	export default {
		data() {
			return {
				pic:JSON.parse(sessionStorage.detailsPic),
				show:false,
				name:'景点图片',
				index:0
			}
		},
		methods: {
			showNow(i){
				(i || i == 0) && (this.index = i);
				this.show = !this.show;
			}
		},
		created(){
			this.name = this.$route.query.sceneryName;
			console.log(Vue.prototype)
		},
		computed: {},
		components: {
			headerFix
		}
	}
</script>
<style lang="scss" scoped>
   .img-box{
	    float: left;
		width: 50%;
		box-sizing: border-box;
		padding: 5px 2px 0 2px;
	   img{
		   width: 100%;
		   display: block;
	   }
   }
   .mint-swipe{
		height: 250px;
		img{
			width: 100%;
			display: block;
		}
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		width: 100%;
	}
	.swiper-box{
		background: #000;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>