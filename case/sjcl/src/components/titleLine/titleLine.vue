<template>
		<mt-header :title="name" :class="{styleObj:isActive}" v-if="titleHas" class="title-line">
			<router-link to slot="left"  v-if="active" >
		    	<mt-button icon="back" @click.prevent="goBack()">
		    	</mt-button>
		  	</router-link>
		</mt-header>
</template>

<script>
export default {
	name:'titleLine',
	props: {
		name: {
			type:String,
			default:'积分商城'
		},
		titleHas: {
			default:true
		},
		active: {
			default:true
		},
		back: {
			default:'/'
		},
		isActive: {
			default:'true'
		}
		
	},
	data() {
		return {
			
		}
	},
	created() {
		
	},
	computed: {
		
	},
	methods: {
		goBack(){
				this.$router.go(-1);
			}
	}
	
}
</script>

<style lang="scss" >
	.styleObj{
		position:fixed;
		top:0;
		z-index:10;
		width:100%;
		background:#fff;
		font-size: 16px;
		letter-spacing: 4px;
	}
	.mint-header-button.is-left{
		a{
			display: block;
			width: 100%;
			.mint-button{
				width:100%;
				.mint-button-icon{
					display: block;
				}
			}
		}
		img.back{
			height:100%;
		}
		.mint-button-icon{
			display: none;
		}
		height:100%;
	}
</style>