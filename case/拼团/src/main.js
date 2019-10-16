import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import store from './store/';
import {routerMode} from './config/env';
import './config/rem';
import 'mint-ui/lib/style.css';

// import FastClick from 'fastclick';
import 'flex.css/dist/data-flex.css';
import 'fetch-polyfill';
import CryptoJS from 'cryptojs';
import {mapState, mapActions} from 'vuex';
import {userUtil,browserUtil,initStat, cookieUtil,jfNativeBack} from'./assets/js/common';
import { Header,Loadmore,Swipe, SwipeItem,Button,MessageBox,Toast,Spinner,Tabbar,TabItem,InfiniteScroll,Picker } from 'mint-ui';

Vue.component(Spinner.name, Spinner);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Picker.name, Picker);
Vue.use(InfiniteScroll);

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }

Vue.use(VueRouter);
Vue.use(CryptoJS);
initStat();
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior: () => ({ y: 0 })
})
// 遍历路由，为每个路由跳转添加百度统计
router.beforeEach((to, from, next) => {
	//console.log(to,from)
  // 初次进入首页或者直接进入页面
  // var toPath = to.fullPath;
  // var toPath_app = toPath;
  // var toPath_wx = toPath;
  // var oldUrl = document.referrer;
  // var fullPath = to.fullPath;
  // var nowUrl = spm.sliceBefore(document.URL,'#');
	// var spmUrl = spm.addSpm(nowUrl , spm.getPageCode())+'#'+fullPath;
	// jfNativeBack.open('device',location.origin+location.pathname+'#'+to.fullPath)

  var fullPath = to.fullPath;
  var nowUrl = spm.sliceBefore(document.URL,'#');
	var spmUrl = spm.addSpm(nowUrl , spm.getPageCode())+'#'+fullPath+'?channel_source=02005212';
  jfNativeBack.open('device',location.origin+location.pathname+'#'+fullPath)

	var toPathName =  to.name;
	switch(toPathName){
		case 'index':spm.setPageCode('100383','畅由拼团');spm.push(['_trackPageview', spmUrl]);next();break;
		case 'detail':spm.setPageCode('100384','拼团详情');spm.push(['_trackPageview', spmUrl]);next();break;
		default:
		next()
	}
});

// router.beforeEach((to,from,next)=>{
// 	var toPath =  to.name;
// 	var fullPath = to.fullPath;
// 	var nowUrl = spm.sliceBefore(document.URL,'#');
// 	var spmUrl = spm.addSpm(nowUrl , spm.getPageCode())+'#'+fullPath;
// 	var toFullPathApp = fullPath;
// 	var oldUrl = document.referrer
// 	//console.log(from)
// 	switch(toPath){
// 		case 'index':spm.setPageCode('100321','景点门票');spm.push(['_trackPageview', spmUrl]);next();break;
// 		case 'sceneryDetails':spm.setPageCode('100322','门票详情');spm.push(['_trackPageview', spmUrl]);next();break;
// 		case 'make-order':spm.setPageCode('100323','订单确认');spm.push(['_trackPageview', spmUrl]);next();break;
// 		case 'orderList':spm.setPageCode('100324','订单列表');spm.push(['_trackPageview', spmUrl]);next();break;
// 		case 'orderDetail':spm.setPageCode('100325','订单详情');spm.push(['_trackPageview', spmUrl]);next();break;

// 	}
// 	next()
// })

new Vue({
	router,
	store,
	data() {
		return {
			browser:browserUtil(),
			val:'',
			merId:'S9000001',
			tips:'温馨提示：门票服务由同程旅游提供，使用过程中，如遇到问题请联系同程客服：0512-82209599',
			paymentUrl:(document.domain == "m.changyoyo.com" ? 'https://m.changyoyo.com/cashier/index.htm' : 'http://www.ppppoints.com/unipay/cashier/index.htm')
		}
	},
	created(){
		userUtil.init();
		this.checkLogin();
//		this.val= spm.getQueryValue(document.URL,'spm');
//		spm.push(['_trackPageview', spm.addSpm(document.URL, spm.getPageCode())]);
//		if(this.val){
//			location.href=location.origin+location.pathname+location.hash;
//		}
	},
	methods: {
		...mapActions(['confirmLogin','confirmWeChat']),
		// 检查是否登录
		// checkLogin() {
		// 	this.checkScene();
		// 	if(!cookieUtil.get('login_token')){
		// 		// 如果未登录
    //
		// 		this.confirmLogin(false);
		// 		return false;
		// 	} else {
    //
		// 		this.confirmLogin(true);
		// 		return true;
		// 	}
		// 	console.log(this.getCookieValue('login_token'))
		// },
		// 判断场景，微信还是APP
		checkScene() {
			if(this.browser.weixin){
				//this.scene = 'wechat';
				this.confirmWeChat(true)
			}else if(this.browser.jfmore){
				//this.scene = 'app';
				this.confirmWeChat(true)
			}else{
        this.confirmWeChat(false)
			}
		},
    checkLogin(){
      this.checkScene();
      var that = this;
      userUtil.check_v1(function(token){
        if(!token){
          that.confirmLogin(false);

        }else{
          that.confirmLogin(true);
        }

      })
    },
		// 获取对应key的cookie值
		getCookieValue(key){
			const COOKIE = document.cookie;
			var cookieName = encodeURIComponent(key) + "=",
				cookieStart = COOKIE.indexOf(cookieName),
				cookieValue = null,
				cookieEnd;

				if (cookieStart > -1){
				cookieEnd = COOKIE.indexOf(";", cookieStart);
				if (cookieEnd == -1){
				    cookieEnd = COOKIE.length;
				}
				cookieValue = decodeURIComponent(COOKIE.substring(cookieStart + cookieName.length, cookieEnd));
				}
			return cookieValue;
		}
	},
	computed: {
		...mapState(['isWeChat', 'scene', 'loginStatus'])
	}
}).$mount('#app')

