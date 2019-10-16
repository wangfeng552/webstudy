<template>
	<div class="score">
		<div class="score-left">
			<img src="../../assets/images/score.png" />我的积分
		</div>
		<div class="score-right">
			{{sc}}
			<div @click.prevent="toGj">积分兑入</div>
		</div>
	</div>
</template>

<script>
  import getUserPointsService from '../../service/GetUserPointsService';
  import {userUtil,jfNative,cookieUtil,stringUtil,browserUtil} from'../../assets/js/common';
	export default {
		name:"score",
		props:{

		},
		data(){
			return  {
				sc:0,
				token:''
			}
		},
		created(){

		},
		mounted(){
		  this.token = cookieUtil.get('login_token');
      getUserPointsService.getPoints({
				login_token:this.token
			})
				.then(res => {
				  if(res.respCode=='0000'){
				    this.sc = res.data.points
					}
				})
		},
		methods:{
			toGj(){
				spm.refresh('/butler/index.htm');
			}
		}
	}
</script>

<style lang="scss">
	.score {
		background: #fff;
		height: 1rem;
		line-height: 1rem;
		padding: 0 .3rem;
		border-top: 1px solid #E5E5E5;
		.score-left {
			position: relative;
			width: 2.1rem;
			font-size: .3rem;
			padding-left: .6rem;
			float: left;
			img {
				position: absolute;
			    width: .5rem;
			    left: 0;
			    top: .25rem;
			}
			&:before {
				content: "";
				position: absolute;
				width: 1px;
				height: .42rem;
				top:.29rem;
				right: 0;
				background: #e5e5e5;
				
			}
		}
		.score-right {
			float: left;
			font-size: .34rem;
			padding-left: .3rem;
			width:4.8rem;
			color:#333;
			& > div{
				float: right;
				
					width: 1.6rem;
				    height: .44rem;
				    line-height: .44rem;
				    display: block;
				    margin-top:.28rem;
				    font-size: .24rem;
				    text-align: center;
				    color: #fff;
				    border-radius:.22rem;
				    background: -webkit-linear-gradient(left, #EDDCA0 0%,#DABB6E 100%);
				
			}
		}
	}
</style>