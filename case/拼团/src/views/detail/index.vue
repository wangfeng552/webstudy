<template>
	<div class="detail" v-if="goodsDetails.itemPopPic && goodsDetails.itemPopPic.length>0">
		<headerComponent title="商品名称"></headerComponent>
		<div class="gsInfo">
			<div class="swipeBox">
				<mt-swipe :show-indicators="false" @change="handleChange" :auto="4000">
					<mt-swipe-item v-for="(item,index) in goodsDetails.itemPopPic" :key="index"><img :src="'/'+item" /></mt-swipe-item>
				</mt-swipe>
				<label class="swipe-index-label">{{index}}/{{goodsDetails.itemPopPic.length}}</label>
				<div class="xrL" v-show="goodsDetails.collageType == 0">
					<p>新人专享</p>
					<p>帮拼立减{{(goodsDetails.discountPrice/100).toFixed(2)}}元</p>
				</div>
				<div class="tzmd" v-show="goodsDetails.collageType == 0 || goodsDetails.collageType == 1"><img src="../../assets/images/booking_group_002.png" /></div>
			</div>
			<div class="gsTitle">{{goodsDetails.itemName}}</div>
			<div class="gbTypeBox">
				<span class="gsMoney">￥&nbsp;<span>{{(goodsDetails.collagePrice/100).toFixed(2)}}</span></span>
				<span class="startB" v-if="gbType == 0">{{freight}}</span>
				<span class="gbedNum">{{goodsDetails.personNum}}人成团</span>
				<div class="gbType-right">
					<span v-if="goodsDetails.collageType == 0 && gbType != 2 && gbType !=3" class="newUser">{{goodsDetails.labelRemark}}</span>
					<span v-if="gbType == 2" class="yct"><img src="../../assets/images/yct.png" /></span>
					<span v-if="gbType == 3" class="overtime">已超时</span>
				</div>
			</div>
			<div class="detail-c">
				<div v-if="gbType == 0">
					<notes :gbGetIshow="goodsDetails.collageType"></notes>
					<div class="fqpt">
						<div class="title title-i"><img src="../../assets/images/pdrs.png" class="titleL">大家正在拼,可直接参与 <router-link :to="{path:'groupingList',query:{collageId:collageId}}" >查看更多<img src="../../assets/images/rj.png" class="rjt"/></router-link></div>
						<div class="pingList">
							<ul>
								<li v-for="(item,index) in teamList" :key="index">
									<div class="l1">
										<div class="l11">
											{{item.userPosition}}&nbsp;{{item.userName}}
										</div>
										<div class="l12">
											{{item.mobileNo}}
										</div>
									</div>
									<div class="l2">
										<div class="l11 cl333">
											还差<span class="clff5346">{{item.personNum - item.teamPersonNum}}人</span>拼成
										</div>
										<div class="l12">
											剩余<countDown :endTime="item.teamEndTime | timeFormat" :position="index" @listenToChildEvent="receiveA"></countDown>
										</div>
									</div>
									<div class="l3"><a href="javascript:;" :class="{active:item.isStatus?item.isStatus:false}" @click.prevent="goDetail(item)">{{item.isStatus?'已结束':'去帮拼'}}</a></div>
								</li>
							</ul>
						</div>
					</div>
					<div class="detail-d">
						<div class="title title-t">商品详情</div>
						<div class="goods-desc" v-html="goodsDetails.description">
						<img>
					</div>
				</div>
				</div>
				<div v-else-if="gbType == 1">
					<score v-show="loginStatus"></score>
					<div class="countDown" v-show="countDownState">
						<p>帮拼既有机会获得该商品仅剩<b>{{goodsDetails.personNum - goodsDetails.teamPersonNum}}个</b>名额</p>
						<div v-if="goodsDetails.teamEndTime">距结束<countDown :endTime="goodsDetails.teamEndTime | timeFormat" :timeStyle="true" @listenToChildEvent="receiveB"></countDown></div>
					</div>
					<gbList :goodsDetail="goodsDetails" :tuanDetail="tuanDetail" :cyrs="goodsDetails.teamPersonNum" :collageId="collageId" :joinState="joinState" :teamStatus="goodsDetails.teamStatus"></gbList>
					<notes :gbGetIshow="goodsDetails.collageType"></notes>
					<div class="detail-d">
						<div class="title title-t">商品详情</div>
						<div class="goods-desc" v-html="goodsDetails.description">
					</div>
				</div>
				</div>
				<div v-else-if="gbType == 2">
					<gbList :goodsDetail="goodsDetails" :tuanDetail="tuanDetail" :cyrs="goodsDetails.teamPersonNum" :collageId="collageId" :joinState="joinState" :teamStatus="goodsDetails.teamStatus"></gbList>
					<score></score>
					<notes :gbGetIshow="goodsDetails.collageType"></notes>
					<div class="erCode">
						<img src="../../assets/images/booking_group_007.png" alt=""/>
						<p>可关注微信公众号“畅由平台”查看订单信息</p>
					</div>
				</div>
				<div v-else-if="gbType == 3">
					<gbList :goodsDetail="goodsDetails" :tuanDetail="tuanDetail" :cyrs="goodsDetails.teamPersonNum" :collageId="collageId" :joinState="joinState" :teamStatus="goodsDetails.teamStatus"></gbList>
					<score></score>
					<notes :gbGetIshow="goodsDetails.collageType"></notes>
					<div class="erCode">
						<img src="../../assets/images/booking_group_007.png" alt=""/>
						<p>可关注微信公众号“畅由平台”查看订单信息</p>
					</div>
				</div>
			</div>

		</div>

		<!-- 去付款   -->
		<div v-if="(gbType ==0 || gbType == 1)&& joinState==0" class="botToPay">
			<div class="tpLeft" @click.prevent="toMallDt">单独购买￥<span>{{(goodsDetails.itemPrice/100).toFixed(2)}}</span></div>
			<div class="tpRight" @click.prevent="toOrderConfirm(goodsDetails.collageId)">￥{{gbType?(goodsDetails.collagePrice/100).toFixed(2):0.00}}&nbsp;<b>{{gbType?'去帮拼':'发起拼团'}}</b></div>
		</div>
	</div>
</template>

<script>
	import headerComponent from '../../components/header';
	import notes from "../../components/detail/notes";
	import gbList from "../../components/detail/gbList";
	import score from "../../components/detail/score";
	import countDown from "../../components/countDown";
	import getGoodsDetail from '../../service/GetGoodsDetail';
	import {mapState} from 'vuex';
	import {Toast,Indicator} from 'mint-ui';
  import {userUtil,jfNative,cookieUtil,stringUtil,browserUtil} from'../../assets/js/common';
	export default {
		data(){
			return {
				collageId:"", //拼团商品ID
				teamCode:"", //团ID
				orderId:"",//订单id
				gbType:0, //0发起拼团 1帮拼团 2已成团 3已超时
				freight:"免运费",
				goodsDetails:{}, //拼团商品的详情
				teamNum:"",//正在拼团的数量
				teamList:{}, //该商品正在拼团的列表
				tuanDetail:[], //团详情
				token:'',
				countDownState:true,//倒计时状态
				joinState:0, //用户参团状态 0未参团 1已参团；
				index:1

			}
		},
		created(){
			//Indicator.open();

//			if(this.collageId == "" && this.teamCode == "") {
//				Toast("错误");
//				setTimeout(() => {this.$route.push("/index");return;},2000);
//			}
			this.changePage();
		},
		mounted(){
		},
		computed:{
			...mapState(['loginStatus'])
		},
		components:{
			headerComponent,
			notes,
			score,
			countDown,
			gbList
		},
		filters:{
		  timeFormat(val){
		    return Date.parse(new Date(val))|| Date.parse(new Date(val.substring(0,19).replace(/-/g,'/')))
			},
			imgFormat(val){
		    return val.split('@@')
			}
		},
		methods:{
      // 轮播图更换时，下方的数字跟着改变
      handleChange(index){
        index = index + 1;
        this.index = index;
      },
      goDetail(val){
        if(val.isStatus){
          return false;
        }else{
          this.$router.push({path:'/detail',query:{teamCode:val.teamCode}})
        }
      },
      //接受子组件传递得信息
      receiveB(val){
        if(val.isStatus){
          this.countDownState = false;
          this.gbType = 3;
				}
      },
      //接受子组件传递得信息
      receiveA(val){
        this.$set(this.teamList[val.position],'isStatus',val.isStatus);
      },
			//获取商品接口数据
			getGdFn(params){
				return getGoodsDetail.getDetail(params)
			},
			//获取团详情接口数据
			getTuanFn(params){
				return getGoodsDetail.getTuanDetail(params);
			},
			// 页面加载
			changePage(){
				//发起拼团
				this.collageId = this.$route.query.collageId || "";
				this.teamCode = this.$route.query.teamCode || "";
				this.orderId = this.$route.query.orderId || "";
        this.token = cookieUtil.get('login_token') || "";
				if(this.collageId != "" && this.teamCode == "") {
					this.gbType = 0;
					this.getGdFn({collageId:this.collageId})
					.then(res => {
						this.goodsDetails = res.data.ptGoodsDetails;
            this.goodsDetails.itemPopPic = this.goodsDetails.itemPopPic.split('@@')
						this.teamNum = res.data.gdsCollageTeamNum;
						this.teamList = res.data.gdsCollageTeamList;
            this.joinState = 0;
					});
				}

				//帮拼
				if(this.collageId == "" && (this.teamCode != ""||this.orderId!="")) {
					this.gbType = 1;
					var params = {};
					if(this.teamCode){
					  if(this.token){
					    params.login_token = this.token;
					    params.teamCode = this.teamCode;
						}else{
					    params.teamCode = this.teamCode;
						}
					}else{
            if(this.token){
              params.login_token = this.token;
              params.orderId = this.orderId;
            }else{
              params.orderId = this.orderId;
            }
					}
					this.getTuanFn(params)
					.then(res => {
						this.goodsDetails = res.data.collageTeamDetails;
						this.goodsDetails.itemPopPic = this.goodsDetails.itemPopPic.split('@@');
						switch (res.data.collageTeamDetails.teamStatus){
							case 0:this.gbType = 1;break;
							case 1:this.gbType = 2;break;
							case 2:this.gbType = 3;break;
							default:
							  this.gbType = 1;
						}
						this.collageId = this.goodsDetails.collageId;
						this.tuanDetail = res.data.collageTeamUserList;
						this.joinState = res.data.isJoin;
					})
				}
			},
			toMallDt(){
				spm.refresh("/mall/#/goodsDetail?productId="+this.goodsDetails.itemId);
			},
			//  e)	点击“发起拼团”，验证用户是否登录，之后跳转到订单确认页
      toOrderConfirm(val){
				userUtil.checkLogin(location.href,()=>{
          this.$router.push({path:'/orderConfirm',query:{collageId:val,goodsNum:1,teamCode:this.goodsDetails.teamCode}})

				},true)
			}


		},
		mounted(){
			Indicator.close();
		},
		watch:{
//			gbType(n,l) {
//				if(n != l) {
//					Indicator.open();
//				}
//			}
			"$route":"changePage"

		},
		beforeRouteUpdata(to,from,next) {
			location.reload();
			next();
		}
//,
//		beforeRouteEnter(to,from,next){
//			this.collageId = this.$route.params.collageId || "";
//			let teamCode = this.$route.params.teamCode || "";
//
//			if(this.collageId == "" && teamCode == "") {
//				Toast("错误");
//				setTimeout(() => {this.$route.push("/index");},2000);
//			}
//		}
	}
</script>

<style lang="scss">
	.detail {
		position:relative;
		.swipeBox {
			position: relative;
			width:100%;
			height:7.5rem;
			.swipe-index-label{
				position: absolute;
				bottom: 0;
				right: 0;
				margin: 10px;
				color: #d3b669;
				letter-spacing: 2px;
				font-size:.4rem;
			}
			img {
				width:100%;
				height: 100%;
			}
			.xrL {
				position: absolute;
				top:0;
				left:-.5rem;
				width: 2.75rem;
				height: .7rem;
				background-image: linear-gradient(-139deg, #FFD280 0%, #FC603E 100%);
				border-radius: .35rem;
				p{
					text-align: center;
					color:#fff;
					font-size:.24rem;
				}
			}
			.tzmd {
				position: absolute;
				top:0;
				right: 0;
				width: .8rem;
				img{
					display: block;
					width:100%;
				}
			}
		}
		.gsTitle {
			font-size: .3rem;
			color: #333;
			line-height: .42rem;
			padding:.1rem .2rem;
			background: #fff;
		}
		.gbTypeBox {
			position: relative;
			background: #fff;
			padding: 0 .2rem .2rem;
			font-size: .24rem;
			.gsMoney {
				font-size:.28rem;
				color:#ff5346;
				span {
					font-size: .34rem;
					font-weight: bold;
					color:#ff5346;
				}
			}
			.startB {
				margin-left: .2rem;
			    background: #ff5346;
			    color: #fff;
			    width: .96rem;
			    height: .34rem;
			    display: inline-block;
			    text-align: center;
			    border-radius: .17rem;
			    top: -.3rem;
			}
			.gbedNum {
				color: #999;
				margin-left:.1rem;
			}
			.gbType-right {
				width:5rem;
				height:1.36rem;
				position:absolute;
				right:0;
				top:70%;
				transform:translateY(-70%);
				span {
					color: #ff5346;
				}
				img{
					display: block;
					width:1.77rem;
					height:1.32rem;
				}
				span.newUser{
					position:absolute;
					top:60%;
					transform:translateY(-60%);
					right:0.3rem;
				}
				span.overtime{
					position:absolute;
					right:0.3rem;
					top:50%;
					transform:translateY(-50%);
					width:1.88rem;
					line-height:.59rem;
					text-align:center;
					border-radius:.94rem;
					background:#ededed;
					color:#666;
				}
				span.yct{
					position:absolute;
					right:0.3rem;
					top:50%;
					transform:translateY(-50%);
				}
			}
		}

		.detail-c {
			margin-top:.2rem ;
			.title-i a {
				float:right;
				font-size: .28rem;
				color: #666;
			}
			.fqpt {
				margin-top: .2rem;
				.title a {
					float: right;
				}
				.pingList {
					background: #fff;
					ul {
						padding-left: .3rem;
					    font-size: .28rem;
						li {
							position: relative;
							padding-bottom: .2rem;
							border-bottom: 1px solid #E4E4E4;
							overflow: hidden;
							.l1 {
								width:2.5rem;
								 color: #666;
							}
							.l11 {
								color: #666;
							}
							.l12 {
								margin-top:.1rem;
								color: #666;
							}
							.l3 a {
							    position: absolute;
							    width: 1.9rem;
							    height: .6rem;
							    line-height: .6rem;
							    right: .3rem;
							    top: 50%;
							    margin-top: -.3rem;
							    text-align: center;
							    color:#fff;
							    border-radius:.3rem;
							    background: -webkit-linear-gradient(left, #EDDCA0 0%,#DABB6E 100%);
							}
							.l3 a.active{
								background:#666;
							}
							div.l1,div.l2 {
								float: left;
							    padding-top: .2rem;

							}

							&:last-child {
								border-bottom: none;
							}
						}
					}

				}
			}
			.countDown {
				margin-top: .2rem;
			    background: #fff;
			    height: 2.3rem;
			    text-align: center;
			    padding-top: .35rem;
			    p {
			    	font-size: .24rem;
   					color: #666;
   					b {
   						font-size: .34rem;
   					 	color: #dbbd71;
   					}
			    }
			    & > div {
			    	font-size: .34rem;
    				margin-top: .3rem;
			    }
			}
			.erCode{
				img{
					display: block;
					width:100%;
				}
				p{
					font-size:.28rem;
					color:#5a5a5a;
					margin:0 auto;
					padding:.1rem 0 .52rem 0;
					background:#fff;
					text-align:center;
				}
			}
		}

		.detail-d {
			margin-top: .2rem;
			.goods-desc{
				padding-bottom:1.2rem;
				p{
					img{
						display: block;
						width:100%;
					}
				}
			}
		}
		.title {
			position: relative;
			height: .9rem;
			line-height: .9rem;
			font-size: .3rem;
			padding: 0 .3rem;
			background: #fff;
			color: #dabc70;
			border-bottom:1px solid #E4E4E4;
			img.titleL {
				width: .32rem;
			    margin-right: .1rem;
			    top: .05rem;
			    position: relative;
			}
		}
		.title-t {
			color: #666 !important;
		}
		.rjt {
			position: relative;
		    width: .1rem;
		    height: .2rem;
		    margin-left: .2rem;
		    margin-right: .05rem;
		}
		.botToPay {
				position: fixed;
		    width: 100%;
		    bottom: 0;
		    padding: .2rem;
		    background: #fff;
		    .tpLeft {
					padding:0 .17rem;
			    font-size: .22rem;
			    color: #D9BA6D;
			    float: left;
			    height: .8rem;
			    line-height: .8rem;
			    border: 1px solid;
			    border-radius: .4rem;
			    span {
			    	font-size: .4rem;
				    color: #D9BA6D;
				    display: inline-block;
				    line-height: initial;
				    top: .01rem;
				    position: relative;
			    }
		    }
		    .tpRight {
		    	float: right;
			    width: 4rem;
			    height: .8rem;
			    line-height: .8rem;
			    font-size: .3rem;
			    color: #fff;
			    text-align: center;
			    border-radius: .4rem;
			    background: -webkit-linear-gradient(left, #EDDCA0 0%,#DABB6E 100%);
			    b {
			    	font-size: .34rem;
			    	color: #fff;

			    }
		    }
		}
	}
	.cl333 {
		color: #333 !important;
	}
	.clff5346 {
		color:#ff5346
	}
</style>
