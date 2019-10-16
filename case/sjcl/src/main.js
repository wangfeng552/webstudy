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
import {userUtil,browserUtil,initStat, cookieUtil} from'./assets/js/common';
import { Header,Loadmore,Swipe, SwipeItem,Button,MessageBox,Toast,Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header);
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
	window.statUtil.sendPage('/mall/#'+to.path);
	// 初次进入首页或者直接进入页面
	var toPath = to.fullPath;
	var toPath_app = toPath;
	if(from.path === '/' && browserUtil().jfmore && toPath.indexOf('fromAPP')<0){
		toPath_app += (toPath_app.indexOf('?')>=0?'&':'?') + 'fromAPP=jfmore';
		next(toPath_app);
	}else {
		next();
	}
	// if (window.history.length < 2 && browserUtil.jfmore && toPath.indexOf('fromAPP')<0) {
	// 	toPath_app += (toPath_app.indexOf('?')>=0?'&':'?') + 'fromAPP=jfmore';
	// 	next(toPath_app);
	// } else {
	// 	next();
	// }
})

new Vue({
	router,
	store,
	data() {
		return {
			browser:browserUtil()
		}
	},
	created(){
		userUtil.init();
		this.checkLogin();
	},
	methods: {
		...mapActions(['confirmLogin','confirmWeChat']),
		// 检查是否登录
		checkLogin() {
			this.checkScene();
			if(!cookieUtil.get('login_token')){
				// 如果未登录
				
				this.confirmLogin(false);
				return false;
			} else {
				
				this.confirmLogin(true);
				return true;
			}
			console.log(this.getCookieValue('login_token'))
		},
		// 判断场景，微信还是APP
		checkScene() {
			if(this.browser.weixin){
				this.scene = 'wechat';
				this.confirmWeChat(true)
			}else if(this.browser.jfmore){
				this.scene = 'app';
				this.confirmWeChat(false)
			}
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

