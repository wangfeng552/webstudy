import CryptoJS from 'cryptojs';
import {imgBaseUrl} from '../../config/env';
// cookie方法
export	var cookieUtil = {
	load: function() {
		var tC = document.cookie.split('; ');
		var tO = {};
		var a = null;
		for (var i = 0; i < tC.length; i++) {
			a = tC[i].split('=');
			tO[a[0]] = a[1];
		}
		return tO;
	},
	get: function(name) {
		var value = this.load()[name];
		if (value) {
			try {
				return decodeURIComponent(value);
			} catch(e) {
				return unescape(value);
			}
		} else {
			return '';
		}
	},
	set: function(name, value, options) {
		options = (typeof(options) == 'object') ? options: {
			day: options
		};
		var path = options.path || '/';
		var domain = options.domain || '';
		var exptime = 0;
		if (options.day) {
			exptime = 1000 * 60 * 60 * 24 * options.day;
		} else if (options.hour) {
			exptime = 1000 * 60 * 60 * options.hour;
		} else if (options.minute) {
			exptime = 1000 * 60 * options.minute;
		} else if (options.second) {
			exptime = 1000 * options.second;
		}
		var exp = new Date(),
			expires = '';
		if (exptime > 0) {
			exp.setTime(exp.getTime() + exptime);
			expires = '; expires=' + exp.toGMTString();
		}
		domain = (domain) ? ('; domain=' + domain) : '';
		document.cookie = name + '=' + escape(value || '') + '; path=' + path + domain + expires;
	},
	del: function(name, options) {
		options = options || {};
		var path = '; path=' + (options.path || '/');
		var domain = (options.domain) ? ('; domain=' + options.domain) : '';
		document.cookie = name + '=' + path + domain + '; expires=Thu,01-Jan-70 00:00:01 GMT';
	}
};
// 字符串操作
export var stringUtil = {
	getQueryValue: function(str, name) {
		if (!name) {
			name = str;
			str = location.search;
		}
		var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
		var match = str.match(reg);
		return (match && match[2] || '').trim();
	}
};
// 浏览器判断
export var browserUtil = function() {
	var channel = stringUtil.getQueryValue('_channel_') || sessionStorage.getItem('debug.browser') || '';
	var ua = navigator.userAgent.toLowerCase();
	var weixin = !!ua.match(/micromessenger/i);
	var jfmore = ua.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i), appver = (jfmore && jfmore[2].trim()) || '';
	var obj = {
		ios: !!ua.match(/(iphone|ipod|ipad);?/i),
		android: !!ua.match(/android/i),
		weixin: weixin || (channel == 'weixin'),
		jfmore: appver || ((channel == 'jfmore') ? '0.0.0': ''),
		dev: !!location.hostname.match(/dev/),
		beta: !!location.hostname.match(/stg/),
		uat: !!location.hostname.match(/uat/),
		prd: !location.hostname.match(/dev|stg|uat/)
	};
	obj.envo = obj.dev ? 'dev' : obj.stg ? 'stg' : obj.uat ? 'uat' : 'prd';
	//
	var pageStatus = {};
	var pageEvents = [];
	if (obj.ios) {
		window.addEventListener('pagehide', function() {
			pageStatus.hide = true;
			pageStatus.show = false;
		});
		window.addEventListener('pageshow', function() {
			if (pageStatus.hide) {
				pageEvents.map(function(callback) {
					callback();
				});
			}
			pageStatus.hide = false;
			pageStatus.show = true;
		});
	}
	obj.checkRefresh = function(callback) {
		if (!this.ios) {
			pageEvents.push(callback);
			return false;
		}
	};
	obj.goBack = function() {
		if (document.referrer) {
			history.back();
		} else {
			if (this.jfmore) {
				if (this.jfmore > '0.0.0') {
					jfNative.open('device', 'closewebview');
				} else {
					console.log('关闭Webview');
				}
			}
		}
	};
	return obj;
};

// 添加数字签名
export var createSign = function(data) {
	let keys = [], sign = '', item, i;
	for (item in data) {
		if (item != 'sign') {
			keys.push(item);
		}
	}
	keys.sort();
	for (i=0; i<keys.length; i++) {
		sign += keys[i] + data[keys[i]];
	}
	// sign += '09FB84B1-D90E-4C14-84DB-DEE924A87B51';
	sign += '123456';// 测试环境
	
	return Crypto.MD5(sign).toString();
};

// 用户登录态相关
export	var userUtil = {
	data: {},
	init: function() {
		// 全局token处理
		var token = cookieUtil.get('login_token') || '';
		this.data = JSON.parse(sessionStorage.getItem('jflm.user') || '{}');
		//
		if (!this.data.token && token) {
			this.set('token', token);
		}
	},
	set: function(item, data) {
		if (typeof(data) != 'undefined') {
			this.data[item] = data;
		} else {
			this.data = item;
		}
		sessionStorage.setItem('jflm.user', JSON.stringify(this.data));
		cookieUtil.set('login_token', this.data.token);
	},
	get: function(item) {
		return (item) ? this.data[item]: this.data;
	},
	check: function() {				
		return (!!this.get('token'));
	},
	// checkLogin(url);
	// checkLogin(callback);
	checkLogin: function(callback, beforeLogin) {
		var that = this, url = '', isApp = !!navigator.userAgent.match(/jfmore/);
		if (typeof(callback) == 'string') {
			url = callback;
			callback = function() {
				location.href = url;
			};
		}
		if (this.check()) {
			callback(this.get());
		} else {
			if (isApp) {
				window.onLoginSuccess = function(res) {
					that.set(res);
					callback(res);
				};
				jfNative.open('user', 'login', null, 'onLoginSuccess');
			} else {
				if (beforeLogin) {
					beforeLogin();
				}
				location.href = imgBaseUrl+'/login/getlogincode.htm?callback='+ encodeURIComponent(url || location.href);
			}
		}
	}
};
export var initStat = function() {
		// 百度统计代码部署
		if (window._hmt) {
			console.error('页面上重复部署了百度统计，需要清除');
			return false;
		}
		window._hmt = window._hmt || [];
		var hm = document.createElement("script");
		var s = document.getElementsByTagName("script")[0];
		hm.src = "https://hm.baidu.com/hm.js?1d9e9535fc6315ff5b6e24dbc5e1ec15";
		s.parentNode.insertBefore(hm, s);
		//
		window.statUtil = {
			sendPage: function(page) {
				console.log('sendPage', page);
            	_hmt.push(['_trackPageview', page]);
			},
			sendEvent: function(button) {
            	_hmt.push(['_trackPageview', '/virtual/click/?site=h5&path='+ location.pathname +'&page='+ document.title +'&button='+ button]);
			}
		};
		// 全页点击事件监听
		document.addEventListener('mousedown', function(e) {
			var ele = e.target, i = 1;
			while (ele && ele.tagName && ele.tagName.toLowerCase()!='body' && ele.tagName.toLowerCase()!='html' && i < 4) {
				if (ele.getAttribute('data-stat')) {
					setTimeout(function() {
						statUtil.sendEvent(ele.getAttribute('data-stat'), document.title || '');
					}, 10);
					break;
				}
				ele = ele.parentNode;
				i ++;
			}
		});
		console.log('百度统计部署');
	}
	// native方法封装
export var jfNative = {
		//加载url，引起宿主的url的改变
		loadUrl: function(url) {
			console.log('--loadNativeUrl--');
			console.log(url);
			var f = document.createElement("iframe");
			f.setAttribute("src", url);
			f.setAttribute("style", "display:none;");
			f.setAttribute("height", "0");
			f.setAttribute("width", "0");
			f.setAttribute("frameborder", "0");
			document.body.appendChild(f);
			//发起请求后这个iframe就没用了，所以把它从dom上移除掉
			f.parentNode.removeChild(f);
			f = null;
		},
		open: function(host, action, data, callback) {
			//exam native://{host}?action={action}[&data={data}][&callback={callback}]
			var url = 'native://'+ host +'?action='+ action;
			if (data) {
				url += '&data='+ encodeURIComponent(JSON.stringify(data));
			}
			if (callback) {
				url += '&callback='+ callback;
			}
			this.loadUrl(url);
		}
	};
