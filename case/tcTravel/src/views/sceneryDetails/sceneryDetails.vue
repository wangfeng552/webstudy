<template>
	<div class="scenery-details main-content" >
		<header-fix fixed :title="sceneryDetail.sceneryName"></header-fix>
		<div class="main" v-show="showNow">
			<!-- banner -->
			<!-- <mt-swipe :auto="4000">
				<mt-swipe-item v-for="pic in sceneryDetail.pictureListInfo" :key="pic.sceneryImgPath">
					<img :src="pic.sceneryImgPath">
				</mt-swipe-item>
			</mt-swipe> -->
			<router-link :to="{ name: 'sceneryPic',query:{sceneryName:sceneryDetail.sceneryName}}">
			    <div class="banner">
                     <img class="b-img" :src="sceneryDetail.pictureListInfo[0].sceneryImgPath">
					 <div class="b-msg">
						 <span>{{sceneryDetail.sceneryName}}</span>
						 <span>共( {{sceneryDetail.pictureListInfo.length}} )张</span>
					 </div>
				</div>
			</router-link>

			<!-- 地址 -->
			<mt-cell :title="sceneryDetail.sceneryAddress">
				<img slot="icon" src="../../assets/img/dw.png" width="23">
				<router-link :to="{ name: 'sceneryMap',query:{sceneryName:sceneryDetail.sceneryName,longitude:sceneryDetail.sceneryLongitude,latitude:sceneryDetail.sceneryLatitude}}">
					<img class="icon-img" src="../../assets/img/you.png">
				</router-link>
			</mt-cell>

			<!-- 景点特色 -->
			<mt-cell title="景点特色" style="margin-bottom:5px">
				<img slot="icon" src="../../assets/img/fj.png" width="23">
				 <router-link :to="{ name: 'sceneryDetailsIntroduce'}">
					<img class="icon-img" src="../../assets/img/you.png">
				 </router-link>
			</mt-cell>

			<!-- 票型选择 -->
			<div class="main-tickt" v-if="ticketCR.length">
				<mt-cell title="成人票">
					<span class="main-tickt-icon" @click="show('showCR')">
                         <img class="icon-img" v-show="showList.showCR" src="../../assets/img/xia.png">
                         <img class="icon-img" v-show="!showList.showCR" src="../../assets/img/shang.png">
                    </span>
				</mt-cell>
				<div v-show="showList.showCR" class="main-tickt-cont" v-for=" t in ticketCR " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time"> <img class="icon-bq" src="../../assets/img/bq.png"> {{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketET.length">
				<mt-cell title="儿童票">
					<span class="main-tickt-icon" @click="show('showET')">
                        <img class="icon-img" v-show="showList.showET" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showET" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showET" class="main-tickt-cont" v-for=" t in ticketET " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketLN.length">
				<mt-cell title="老年票">
					<span class="main-tickt-icon" @click="show('showLN')">
                        <img class="icon-img" v-show="showList.showLN" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showLN" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showLN" class="main-tickt-cont" v-for=" t in ticketLN " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketXS.length">
				<mt-cell title="学生票">
					<span class="main-tickt-icon" @click="show('showXS')">
                        <img class="icon-img" v-show="showList.showXS" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showXS" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showXS" class="main-tickt-cont" v-for=" t in ticketXS " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketTT.length">
				<mt-cell title="团体票">
					<span class="main-tickt-icon" @click="show('showTT')">
                        <img class="icon-img" v-show="showList.showTT" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showTT" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showTT" class="main-tickt-cont" v-for=" t in ticketTT " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketYD.length">
				<mt-cell title="优待票">
					<span class="main-tickt-icon" @click="show('showYD')">
                        <img class="icon-img" v-show="showList.showYD" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showYD" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showYD" class="main-tickt-cont" v-for=" t in ticketYD " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketJT.length">
				<mt-cell title="家庭票">
					<span class="main-tickt-icon" @click="show('showJT')">
                        <img class="icon-img" v-show="showList.showJT" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showJT" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showJT" class="main-tickt-cont" v-for=" t in ticketJT " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<div class="main-tickt" v-if="ticketQZ.length">
				<mt-cell title="亲子票">
					<span class="main-tickt-icon" @click="show('showQZ')">
                        <img class="icon-img" v-show="showList.showQZ" src="../../assets/img/xia.png">
                        <img class="icon-img" v-show="!showList.showQZ" src="../../assets/img/shang.png">
                     </span>
				</mt-cell>
				<div v-show="showList.showQZ" class="main-tickt-cont" v-for=" t in ticketQZ " :key="t.ticketPriceId">
					<div class="main-tickt-title">{{t.ticketName}}</div>
					<div class="main-tickt-time">{{t.reserveBeforeTime}}之前可预定今日票</div>
					<div class="main-tickt-dk-box"><span class="main-tickt-dk">积分抵扣</span></div>
					<span class="main-tickt-info" @click="goTicketTips(t)">票型说明 ></span>
					<span class="main-tickt-book" @click="goMakeOrder(t)">在线预订</span>
					<div class="main-tickt-money"><span>￥</span><span>{{t.tcAmountPrice}}</span></div>
				</div>
			</div>

			<!-- 购买须知 -->
			<div class="main-tip">
				<!--<mt-cell title="购买须知"></mt-cell>-->
				<div class="main-tip-main" v-if="sceneryDetail.userNotes.businessHours">
					<div class="main-tip-main-title">开放时间</div>
					<div>{{sceneryDetail.userNotes.businessHours}}</div>
				</div>
				<div class="main-tip-main" v-if="sceneryDetail.userNotes.favouredPolicy">
					<div class="main-tip-main-title">特惠政策</div>
					<div>{{sceneryDetail.userNotes.favouredPolicy}}</div>
				</div>
				<div class="see-more" @click="seeMore">查看更多<img src="../../assets/img/you.png"></div>
			</div>

			<div class="main-b-tips">
				{{tips}}
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Toast, Indicator } from 'mint-ui';
	import headerFix from "../../components/header";
	import api from "../../service/SceneryDetailsApi";
    import {Share} from "../../assets/js/common";
	Vue.component(Cell.name, Cell);

	export default {
		data() {
			return {
				sceneryDetail: { //景点详情
					userNotes: {
						"businessHours": "",
						"favouredPolicy": "",
						"getTicketAddress": "",
						"reminder": "",
						"ruYuanVoucher": ""
					},
					pictureListInfo: [],
					sceneryName: '', //景点名称
					tips: ''
				},
				ticketCR: [], //成人票型
				ticketET: [], //儿童
				ticketLN: [], //老年
				ticketXS: [], //学生
				ticketTT: [], //团体
				ticketYD: [], //优待
				ticketJT: [], //家庭
				ticketQZ: [], //亲子
				showList: {
					showCR: true,
					showET: true,
					showLN: true,
					showXS: true,
					showTT: true,
					showYD: true,
					showJT: true,
					showQZ: true,
				},
				showNow:false,
				sceneryId:''

			}
		},
		methods: {
			show: function(type) {
				this.showList[type] = !this.showList[type];
			},
			seeMore: function() {
				let {userNotes,sceneryTrafficGuide} = this.sceneryDetail;
				let data = {userNotes,sceneryTrafficGuide};
				this.$router.push({
					name: 'sceneryDetailsTips',
					query: {
						data:data
					}
				})
			},
			goTicketTips: function(par) {
				par['sceneryId'] = this.$route.params.sceneryId;
				// let data = encodeURIComponent(JSON.stringify(this.sceneryDetail.userNotes))
				this.$router.push({
					name: 'sceneryDetailsTicketInfo',
					query: {
						details: par
						// data: data
					}
				})
			},
			goMakeOrder: function(par) {
				let orderPar = {
					isReMark: par['isReMark'],
					// ticketPriceRemark: par['ticketPriceRemark'],
					ticketPriceId: par['ticketPriceId'],
					ticketName: par['ticketName'],
					tcAmountPrice: par['tcAmountPrice'],
					isScreening: par['isScreening'],
					reservecheckWay: par['reservecheckWay'],
					IsPost: par['IsPost'],
					ruYuanVoucher: this.sceneryDetail.userNotes['ruYuanVoucher'],
					sceneryId:this.$route.params.sceneryId,
					// getTicketMode:  par['getTicketMode'],
					// containedItems:  par['containedItems'],
					isRealName: par['isRealName'],  // 是否实名
					isNeedIdCard: par['isNeedIdCard'],  // 是否需要填写证件
					
				}
				this.$router.push({
					path: '/make-order',
					query: {
						details: JSON.stringify(orderPar)
					}
				})
			}
		},
		created(){
			this.tips = this.$root.tips;
		},
		activated() {
			let that = this;
			let sceneryId = this.$route.params.sceneryId;
			if(sceneryId == that.sceneryId) return;
			Indicator.open();
			that.sceneryId = sceneryId;
			that.showNow = false;
			that.ticketCR.lengh=0;
			that.ticketET.lengh=0;
			that.ticketLN.lengh=0;
			that.ticketXS.lengh=0;
			that.ticketTT.lengh=0;
			that.ticketYD.lengh=0;
			that.ticketJT.lengh=0;
			that.ticketQZ.lengh=0;
			that.sceneryDetail.sceneryName='';
			api.GetSceneryDetailService({
				sceneryId: sceneryId
			}).then((res) => {
				if(res.respCode == "0000") {
						//微信分享
						window._shareData = {
								title: {
									wechat: res.data.sceneryName,
									othTitle: res.data.sceneryName
								},
								content: res.data.scenerySummary,
								imageurl: res.data.pictureListInfo[0].sceneryImgPath,
								shareurl: location.href
							};
						if(that.$root.browser.weixin){
							Share.Weixin()
						}else if(that.$root.browser.jfmore){
							if (that.$root.browser.ios) {
								Share.Ios('hasShare', window._shareData);
							} else {
								Share.Android('user', 'share', window._shareData);
							}
						}
					    that.showNow = true;
						that.sceneryDetail = res.data;
						sessionStorage.detailsInfo =  res.data.sceneryDetailIntroduce;
						sessionStorage.detailsName =  res.data.sceneryName;
						sessionStorage.detailsPic  =  JSON.stringify(res.data.pictureListInfo);
						let list = res.data.ticketPriceList;
						list.forEach(e => {
							switch(e.consumers) {
								case 60301:
									that.ticketCR.push(e)
									break;
								case 60302:
									that.ticketET.push(e)
									break;
								case 60303:
									that.ticketLN.push(e)
									break;
								case 60304:
									that.ticketXS.push(e)
									break;
								case 60305:
									that.ticketTT.push(e)
									break;
								case 60306:
									that.ticketYD.push(e)
									break;
								case 60307:
									that.ticketJT.push(e)
									break;
								case 60308:
									that.ticketQZ.push(e)
									break;
							}
						});
						Indicator.close();
				} else {
					Indicator.close();
					Toast(res.respMsg);
				}
			})
		},
		computed: {},
		components: {
			headerFix
		}
	}

</script>
<style>
    /* .mint-swipe-indicators{
        display: flex;
	}
	.mint-cell-wrapper{
       font-size: .3rem
	} */
</style>
<style lang="scss" scoped>

    .banner{
		position: relative;
		img{
            width: 100%;
            display: block;
		}
		div{
			display: flex;
			align-items: center;
			justify-content:space-between;
			height: .7rem;
			position: absolute;
			bottom: 0;
			font-size: .28rem;
			padding: 0 10px;
			left: 0;
			right: 0;
		}
		span{
			color: #ffffff;
		}
		
	}
	
	.main-b-tips {
		font-size: .2rem;
		padding: 10px;
		color: #ccc;
	}
	
	.mint-swipe {
		height: 3.5rem
	}
	
	.mint-swipe-item {
		img {
			width: 100%;
		}
	}
	
	.main-top {
		margin-top: 40px
	}
	
	.mint-cell {
		border-bottom: solid thin #eeeeee !important;
	}
	
	.main-tickt-title {
		font-size: .3rem;
		color: #333333;
		padding-right: 2rem;
	}
	
	.main-tickt-cont {
		padding: 10px;
		position: relative;
		padding-bottom: 0;
		border-bottom: solid thin #dadada;
	}
	
	.main-tickt-time {
		margin: 7px 0 0 0;
		font-size: .23rem;
		color: #666666;
	}
	
	.main-tickt-dk {
		display: inline-block;
		color: #fff;
		background: #E40000;;
		font-size: .2rem;
		border-radius: .24rem;
		padding: 1px 5px;
	}
	
	.main-tickt-info {
		font-size: .23rem;
		color: #666666;
		margin-top: 3px;
		border-bottom: solid thin #eee;
		padding-bottom: 10px;
		display: flex;
		width: 2rem;
	}
	
	.main-tickt-book {
		position: absolute;
		right: 10px;
		bottom: 10px;
		background: #D7B667;
		color: #fff;
		border-radius: 1rem;
		padding: 7px 20px;
		font-size: .23rem;
	    background: linear-gradient(to right, #EDDCA0 ,#D7B667);
        -webkit-background: linear-gradient(to right, #EDDCA0 ,#D7B667);
	}
	
	.main-tickt-money {
		position: absolute;
		bottom: 1rem;
		right: 15px;
		display: flex;
		align-items: baseline;
		span:nth-child(2) {
			font-size: .48rem;
			color: #E40000;
			font-weight: bold;
		}
		span:nth-child(1) {
			font-size: .24rem;
			color: #E40000;
		}
	}
	
	.main-tip-main {
		padding: 10px 10px 0 10px;
		background: #ffffff;
		border-bottom: solid thin #efefef;
		.main-tip-main-title {
			font-size: .28rem;
			color: #333333;
		}
		div {
			font-size: .24rem;
			padding-bottom: 5px;
			color: #999999;
		}
	}
	
	.icon-img {
		width: 25px
	}
	
	.main-tickt-dk-box {
		display: flex;
		margin: 7px 0;
	}
	
	.main-content {
		position: absolute;
		background: #EEEEEE;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow-y: scroll;
	}
	
	.icon-bq {
		width: .3rem;
		vertical-align: middle;
	}
	
	.see-more {
		text-align: center;
		font-size: .24rem;
		height: .8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		color: #ccc;
		img {
			width: .5rem;
		}
	}
</style>