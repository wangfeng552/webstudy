<template>
	<div class="gbList">
		<div class="title">
			<img  src="../../assets/images/pdrs.png" class="titleL"/>
			已有{{cyrs}}人参与
		</div>

		<div class="gbList-con">
			<ul v-if="tuanDetail.length > 0">
				<li v-for="(item,index) in tuanDetail" :key="index" :class="{showTz:item.userType == 0,showZj:item.userType == 1 && item.deliveryStatus == 1}">
					<div>{{item.userPosition}}</div>
					<div>{{item.userName}}</div>
					<div>{{item.mobileNo}}</div>
				</li>
			</ul>
			<div class="gbList-bot" v-if="joinState =='0'&& teamStatus==0">
				<p><router-link :to="{path:'detail',query:{collageId:collageId}}">成为团长？发起拼团》</router-link></p>
				<div><router-link :to="{path:'bookingList'}">更多拼团<img src="../../assets/images/rj.png" class="rjt"/></router-link></div>
			</div>
			<div class="btnToIndex" v-else @click.prevent="btnShare">{{teamStatus?'看看其他的吧':'邀请好友帮拼'}}</div>
		</div>
		<div class="cover"  v-show="shareState" @click.prevent="btnCloseWx"></div>
		<div class="cover-msg" v-show="shareState" @click.prevent="btnCloseWx">
			<img src="../../assets/images/booking_group_008.png" alt=""/>
			<p>还差{{goodsDetail.personNum- goodsDetail.teamPersonNum}}人,点击右上角邀请好友帮拼吧~</p>
		</div>
		<div class="cover-app" v-show="shareAppState" @click.prevent="btnClose"></div>
		<div class="cover-app-msg" v-show="shareAppState" >
			<p>分享成功</p>
			<p>分享3次以上,拼团成功率高达96%以上哦</p>
			<p @click.prevent="btnAppShare">继续分享</p>
		</div>
	</div>
</template>

<script>
  import {userUtil,browserUtil,cookieUtil,Share,stringUtil} from'../../assets/js/common';
	export default {
		name:"gbList",
		props:{
			tuanDetail:{
				default:[],
				type:Array,
				required:true
			},
			cyrs:{
				default:0,
				type:Number,
				required:true
			},
			collageId:{
				default:"",
				required:true
			},
			joinState:{
			  default:"0",
				require:false
			},
			teamStatus:{
			  default:0
			},
			goodsDetail:{
			  type:Object,
				default:{}
			}
		},
		data(){
			return{
				personNum:4,
				teamPersonNum:1,
				msg:'看看其他的吧',
				data:[

				],
        shareState:false,
        shareAppState:false
			}
		},
		created(){
		},
		mounted(){
      if(this.goodsDetail.collageType == 0){
        window._shareData = {
          title: {
            wechat: '立即支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'帮团长助力'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元获得拼团好物',
            othTitle: '立即支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'帮团长助力'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元获得拼团好物'
          },
          content: '我在畅由拼团发现了一个超值好物，邀请'+(this.goodsDetail.personNum-this.goodsDetail.teamPersonNum)+'位新用户即可获得，快来看看吧',
          imageurl: location.origin +'/'+ this.goodsDetail.itemPopPic[0],
          shareurl: location.origin +'/groupBooking/#/detail?teamCode='+this.goodsDetail.teamCode+'&channel_source=02005212'
        };
      }else{
        window._shareData = {
          title: {
            wechat: '帮我支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'即有机会获得拼团好物',
            othTitle: '帮我支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元,'+'即有机会获得拼团好物',
          },
          content: '我在畅由拼团发现了一个超值好物,支付'+(this.goodsDetail.collagePrice/100).toFixed(2)+'元即有机会获得，快来看看吧',
          imageurl: location.origin +'/'+ this.goodsDetail.itemPopPic[0],
          shareurl: location.origin +'/groupBooking/#/detail?teamCode='+this.goodsDetail.teamCode+'&channel_source=02005212'
        };
      }
		},
		methods:{
      //关闭app分享弹框
      btnClose(){
        this.shareAppState = !this.shareAppState;
      },
		  btnCloseWx(){
        this.shareState = !this.shareState;
			},
			//
			btnShare(){
			  if(!this.teamStatus){
          if(browserUtil().jfmore){
            Share.appShare('share',window._shareData,(response)=>{
              if(response.status){
                this.shareAppState = !this.shareAppState
              }
            })
          }else{
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.shareState = !this.shareState;
            Share.Weixin()
          }
				}else{
			    spm.refresh('/groupBooking/#/index')
				}
			},
      //app点击分享
      btnAppShare(){
        Share.appShare('share',window._shareData,(response)=>{
          if(response.status){

          }
        })
      },
		}
	}
</script>

<style lang="scss">
	.gbList {
		margin-top:.2rem;
		padding-bottom:0.2rem;
		background: #fff;
		ul {
			li {
				padding-left: .8rem;
				height: .8rem;
				line-height: .8rem;
				border-bottom:1px solid #E5E5E5;
				overflow: hidden;
				div {
					font-size: .28rem;
					float: left;
					color:#666;
					&:nth-child(1) {
						width:30%
					}
					&:nth-child(2) {
						width:30%
					}
					&:nth-child(3) {
						width:40%
					}
				}
			}
			.showTz{
				background-image: url(../../assets/images/booking_group_011.png);
				background-repeat: no-repeat;
				background-size:.95rem .65rem;
				background-position:0 0;
			}
			.showZj{
				background-image: url(../../assets/images/booking_group_010.png);
				background-repeat: no-repeat;
				background-size:.49rem .49rem;
				background-position:.17rem center;
			}
		}
		.gbList-bot {
			padding: 0 .3rem;
		    font-size: .28rem;
		    height: 1rem;
		    line-height: 1rem;
		    p a {
		    	color: #FF8076;
    			float: left;
		    }
		    div a {
		    	float: right;
   				 color: #666;
		    }
		}
		.btnToIndex{
			width:6.74rem;
			line-height:.8rem;
			text-align:center;
			border-radius:.4rem;
			background-image: linear-gradient(-128deg, #E6D08F 0%, #DABC70 100%);
			color:#fff;
			font-size:.3rem;
			margin:.24rem auto 0 auto;
		}
	}
	.cover{
		position:absolute;
		top:0;
		left:0;
		z-index:99;
		width:100%;
		height:100%;
		background:#1F1F1F;
	}
	.cover-msg{
		position:absolute;
		top:.5rem;
		left:50%;
		transform:translateX(-50%);
		width:100%;
		z-index:100;
		img{
			display: block;
			width:100%;
		}
		p{
			font-size:.35rem;
			color:#FFBF23;
			text-align:center;
			margin:.4rem auto;

		}
	}
	.cover-app{
		position:absolute;
		top:0;
		left:0;
		z-index:99;
		width:100%;
		height:100%;
		background:#666;
		opacity: 0.5;
	}
	.cover-app-msg{
		position:absolute;
		top:30%;
		left:50%;
		transform:translate(-50%,-50%);
		width:5.92rem;
		height:5rem;
		border-radius:0.2rem;
		background:#fff;
		z-index:100;
		font-size:.4rem;
		background-image:url(../../assets/images/booking_group_009.png);
		background-repeat: no-repeat;
		background-size:100%  1.79rem;
		background-position:0 0;
		p{
			text-align:center;
		}
		p:nth-child(1){
			font-weight:600;
			color:#D7B667;
			margin-top:2rem;
		}
		p:nth-child(2){
			font-size:.3rem;
			color:#333;
			margin:.5rem auto;
		}
		p:nth-child(3){
			font-size:.3rem;
			color:#333;
			width:5rem;
			line-height:.8rem;
			border-radius:.4rem;
			background:#D7B667;
			color:#fff;
			margin:0 auto;
			letter-spacing: .05rem;
		}

	}
</style>
