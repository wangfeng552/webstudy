<template>
	<div class="mainpart" style="padding-top: 20px;">
		<div class="w1200 consulttab">
			<ul>
	       		<li>
	       			<router-link active-class="current" :to="{name:'consultList'}">政策快讯</router-link>
	       		</li>
		       	<li>
		       		<router-link active-class="current" :to="{name:'industry'}" style="height: 61px;">行业聚焦</router-link>
		       	</li>
		    </ul> 
		</div>
		<div>{{show}}</div>
		<router-view ref="revenue"></router-view>
    </div>
</template>
<script>
  import API from 'API/config'
  export default {
    components: {  },
    data(){
      return {
        
      }
    },
    computed:{
    	show(){
    		if (this.$route.path !== '/consultationTab/industry') {
    			this.$store.dispatch('listPage',1)
    		}
    	}
    },
    methods:{
    	
    }
  }
</script>
<style lang="scss" scoped>
.consulttab{
	background: #fff;
	ul{
		overflow: hidden;
		zoom:1;
		background:#5b80a3;
		color: #fff;
		font-size: 16px;
		li{
			width: 126px;
			height: 60px;
			line-height: 58px;
			float: left;
			cursor: pointer;
			text-align: center;
			a{
				width: 126px;
				display: inline-block;
				color: #fff;
			}
		}
		.current{
			background:#fff;
			color: #5b80a3;
			border: 1px solid #e2e2e2;
		}
	}
}
	
	.potion{
		height: 50px;
		line-height:50px;
		padding-left: 55px;
		.item{
			width: 126px;
			font-size: 14px;
			margin-right: 55px;
			cursor: pointer;
		}
		.teitem{
			color: #5b80a3;
		}
	}
</style>
