<template>
	<div class="header-fix"  v-if="show">
		<mt-header fixed :title="title">
            <span slot="left" v-if="back">
               <a href="javascript:history.back()"> <mt-button icon="back"></mt-button></a>
            </span>
        </mt-header>
	</div>
</template>
<script>
	export default {
		name: "headerFix",
		data() {
			return {
				show:true
			}
		},
		props: {
			title: {
				type: String,
				required: false,
				default:''
			},
			back: {
				required: false,
				default:true
			}
		},
		created:function(){
			if(this.$root.browser.jfmore || this.$root.browser.weixin ){
                 this.show = false;
			}
		}
	}
</script>
<style scoped>
	.mint-header{
		height: .9rem;
		background: #ffffff;
	}
	.header-fix{
        height: .9rem;
        border-bottom: solid thin #CCCCCC;
        box-sizing: content-box;
	}
	.mint-header >>> .mint-header-title{
		font-size: .34rem;
	}
</style>

