<template>
	<div class="notes">
		<div class="title notes-nav"><img src="../../assets/images/pdxz.png" class="titleL"/>拼团须知</div>
		<div class="notes-q">
			<ul>
				<li><img src="../../assets/images/hybp.png" /><span>好友帮拼</span></li>
				<li><img src="../../assets/images/song.png"/><span>人满发货</span></li>
				<li><img src="../../assets/images/tui.png"/><span>人不满退款</span></li>
			</ul>
			<dl v-show="gbGetIshow == 0">
				<dd>1.邀请新手帮拼，成团后团长可免费获得商品;</dd>
				<dd>2.帮拼团员必须通过拼团页面首次注册绑定兑分的用户才能参与;</dd>
				<dd>3.拼团失败会对已付款用户进行退款处理，退款在1-3个工作日内到账;</dd>
				<dd>4.成团后订单暂不支持退款，售后问题可联系平台客服处理。</dd>
			</dl>
			<dl v-show="gbGetIshow == 1">
				<dd> 1.邀请好友帮拼，成团后团长可免费获得商品，系统将随机抽取一位团员获得商品;</dd>
				<dd>2.拼团失败会对已付款用户进行退款处理，退款在1-3个工作日内到账;</dd>
				<dd>3.成团后订单暂不支持退款，售后问题可联系平台客服处理。</dd>
			</dl>
		</div>
		<div class="gbGet" v-if="gbGetIshow == 1">帮拼即有机会获得该商品</div>
	</div>
</template>

<script>
	export default{
		name:"notes",
		props:{
			gbGetIshow:{
				type:Number,
		        default:1,
		        required:false
			}
		}
	}
</script>

<style lang="scss">
	.notes {
		margin-top:.2rem;
		.notes-nav {

		}
		.notes-q {
			ul {
				height: .8rem;
				line-height: .8rem;
				background: #F1F1F1;;
				overflow: hidden;
				li {
					width:33.33%;
					text-align: center;
					color: #333;
					font-size: .24rem;
					float: left;
					img {
						height: .3rem;
					    position: relative;
					    display: inline-block;
					    top: .03rem;
					    right: .05rem;
					}
				}
			}
			dl {
				background: #F4F4F5;
				padding: .2rem .2rem .2rem .5rem;
				dd {
					font-size: .24rem;
					color: #666;
					line-height: .52rem;
				}
			}
		}
		.gbGet {
			position: relative;
			height: .9rem;
			line-height: .9rem;
			font-size: .34rem;
			color: #ff5346;
			background: #fff;
			text-align: center;
			&:before,
			&:after {
				content: "";
				position: absolute;
				width: .75rem;
				height: 1px;
				background: #ff5f53;
				top:.45rem;
			}
			&:before {
				left:1rem;
			}
			&:after {
				right: 1rem;
			}
		}
	}
</style>
