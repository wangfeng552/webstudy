<template>
	<div class="scenery-details-introduce">
		<header-fix fixed :title="title"></header-fix>
        <div class="main">
            <div class="content-sd" v-html="rawHtml"></div>
        </div>
	</div>
</template>
<script>
import headerFix from "../../components/header";
import {lazyImg} from "../../assets/js/common";
export default{
	name:"sceneryDetailsIntroduce",
	data(){
		return {
            title:"",
            rawHtml:''
		}
    },
	created(){
		this.rawHtml = sessionStorage.detailsInfo.replace(/src=/g,'lazy="loading" class="lazy" from=') || '';
		this.title = sessionStorage.detailsName || '';
	},
    components: {
		headerFix
	},
	methods: {
	},
	mounted(){
		lazyImg()
	}
}
</script>
<style lang="scss" scoped>
	.content-sd  {
		padding: 10px;
		font-size: .3rem;
		& /deep/ {
			h4{
				margin: 5px 0;
			}
			img[lazy=loading]{
				height: 3rem;
			}
			img{
				display: block;
				width: 100%;
			}
			.intro_head{
				font-size: .4rem;
				font-weight: bold;
				margin: 5px 0;
			}
			.intro_information{
				font-size: .25rem;
			}
			.reason_ul{
				font-size: .25rem;
			}
		}
	}
</style>
