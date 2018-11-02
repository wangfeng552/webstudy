import CryptoJS from 'cryptojs';
import {imgBaseUrl} from '../../config/env';
import checkLoginService from '../../service/CheckLoginService';
import fetch from  '../../config/fetch';
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
//数组操作
export var arrayUtil = {
  clearRepetition:function(arr){
    var result = [];
    var obj = {};
    for(var i=0;i<arr.length;i++){
      if(!obj[arr[i]]){
        result.push(arr[i])
        obj[arr[i]]=1;
      }
    }
    return result;
  }
};
// 字符串操作
export var stringUtil = {
  getQueryValue: function(str, name) {
    if (!name) {
      name = str;
      str = location.href + '';
    }
    var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
    var match = str.match(reg);
    return ((match && match[2] || '').trim()).split('#')[0];
  },
	getQueryJSON: function(str) {
			str = str || location.search;
			if (str.indexOf('?') < 0) return {};
			var query = str.substr(str.indexOf('?') + 1),
				params = query.split('&'),
				len = params.length,
				result = {},
				key,
				value,
				item,
				param;
			for (var i = 0; i < len; i++) {
				param = params[i].split('=');
				key = param[0];
				value = param[1];
				item = result[key];
				if ('undefined' == typeof item) {
					result[key] = value;
				} else if (Object.prototype.toString.call(item) == '[object Array]') {
					item.push(value);
				} else {
					result[key] = [item, value];
				}
			}
			return result;
  },
  addQueryValue: function(url, name, value) {
    var m = this, _hash = '', _val, a = "#";
    value = value || '';
    _val = m.getQueryValue(url, name);
    if (_val) {
      url = url.replace(name + '=' + _val, name + '=' + value);
    } else {
      if (url.indexOf(a) != -1) {
        _hash = a + url.slice(url.indexOf(a) + 1);
        url = url.substring(0, url.indexOf(a));
      }
      url += ((url.indexOf('?') > -1) ? '&' : '?') + name + "=" + value;
    }
    return url + _hash;
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
export var cache = {
			_libs : { },
			_opts : {ext:'__t__m_', t: 1000 * 60 * 30},
			debug : false,
			set : function(item, value, time) {
				var m = this, _time = new Date().getTime() + ((m.debug ? 1 : time) || m._opts.t);
				if (m.localStorage) {
					m.localStorage.setItem(item, JSON.stringify(value));
					m.localStorage.setItem(m._opts.ext + item, _time);
				} else {
					m._libs[item] = value;
				}
	    	},
	    	get : function(item) {
	    		var m = this, value, _time;
	    		if (m.localStorage) {
	    			_time = m.localStorage.getItem(m._opts.ext + item)
	    			value = m.localStorage.getItem(item);
	    			value = JSON.parse(value);
	    			if (value && _time && new Date().getTime() > _time) {
	    				value = null;
	    				m.del(item);
	    			}
	    		} else {
	    			value = m._libs[item];
	    		}
	    		return value;
	    	},
	    	del : function(item) {
	    		var m = this;
	    		delete m._libs[item];
	    		if (m.localStorage) {
	    			m.localStorage.removeItem(item);
	    			m.localStorage.removeItem(m._opts.ext + item);
	    		}
	    	},
	    	localStorage : function() {
	    		var tid, _ext, _time, storage, cItem;
	    		storage = window.localStorage;
	    		if (storage) {
	    			try {
	    				storage.setItem("__has_", true);
	    				storage.removeItem("__has_");
	    				tid = setTimeout(function() {
	    					_ext = cache._opts.ext;
	    					_time = new Date().getTime();
	    					for (var key in localStorage) {
	    						cItem = storage.getItem(_ext + key) || 0;
	    						if (key.indexOf(_ext) > 0 && cItem && _time > cItem) {
	    							localStorage.removeItem(key);
	    							localStorage.removeItem(_ext + key);
	    						}
	    					}
	    				}, 50);
	    				return storage;
	    			} catch (e) {
	    				clearTimeout(tid);
	    				return false;
	    			}
	    		}
	    		return false;
	    	}()
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
	check_v1: function(callback) {
			var m = this, __token, __key,__run;
			__key = '__cache_key';
			__token = cookieUtil.get('login_token');
			callback = callback || function () {};
			// 缓存5秒
			if (cache.get(__key)) {
				return callback(cache.get(__key));
			}
			if (m.__callbacks) {
				return m.__callbacks.push(callback);
			}
			m.__callbacks = [ callback ];
      __run = function (token) {
        m.__callbacks.map(function(item) {
          item(token);
        });
        delete m.__callbacks;
      }
      if (!__token) {
         __run('');
         return
      }
			checkLoginService.getLogin({login_token:__token})
			.then(res => {
				if(res.respCode === '0000'){
					m.data.token = (res.data && res.data.validResult == '00') ? __token : '';
          cookieUtil.set('login_token', m.data.token);
          __run(m.data.token);
					m.data.token && cache.set(__key, m.data.token, 1000 * 5);
				}else{
					//Toast(res.respMsg)
          __run('');
				}
			})
	},
	// checkLogin(url);
	// checkLogin(callback);
	checkLogin: function(callback, beforeLogin,status) {
		var that = this, url = '', isApp = !!navigator.userAgent.match(/jfmore/);
		if (typeof(callback) == 'string') {
			url = callback;
			callback = function() {
				location.href = url;
			};
		}
		that.check_v1(function(token) {
				if (token) {
          if(beforeLogin){
            beforeLogin();
          }
				} else if(status) {
            if (isApp) {
              window.onLoginSuccess = function(res) {
                that.set(res);
                callback(res);
              };
              jfNative.open('user', 'login', null, 'onLoginSuccess');
            } else {
              var _channel = stringUtil.getQueryValue(location.href,'channel_source'), channel_source = (_channel ? '&channel_source=' + _channel : "");
              if(url.indexOf('goodsDetail')>0){
                location.replace('/login/getlogincode.htm?callback='	+ encodeURIComponent(url || location.href) + channel_source)
              }else{
                location.href='/login/getlogincode.htm?callback='	+ encodeURIComponent(url || location.href) + channel_source
              }

            }
				}else{
				  if(beforeLogin){
            beforeLogin();
          }
        }
			})
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
		hm.src = "https://hm.baidu.com/hm.js?3e59e3f2895f6e1d9327fd615c867a97";
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

export var jfNativeBack = {
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
  open: function(host, url, data, callback) {
    //exam native://{host}?action={action}[&data={data}][&callback={callback}]
    var url = 'native://'+ host +'?url='+ url;
    if (data) {
      url += '&data='+ encodeURIComponent(JSON.stringify(data));
    }
    if (callback) {
      url += '&callback='+ callback;
    }
    this.loadUrl(url);
  }
};

//分享
export let  Share = {
	Weixin(){  //微信分享
			let h = location.href;
			let index = h.indexOf("#");
			if(index && index > 0) {
				h = h.substring(0,h);
			}
			fetch('pointgate/wechat/jsapi/auth.htm', {authUrl:h}).then((res)=>{
					wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: res.data.appId, // 必填，公众号的唯一标识
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
							signature: res.data.signature,// 必填，签名，见附录1
							jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					
					wx.ready(function(){
							wx.onMenuShareTimeline({
								title: window._shareData.title.othTitle, // 分享标题
								link: window._shareData.shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: window._shareData.imageurl, // 分享图标
								success: function () { 
										// 用户确认分享后执行的回调函数
								},
								cancel: function (e) { 
										// 用户取消分享后执行的回调函数
									// alert("朋友圈："+e.toString())
								}
						});
							
						wx.onMenuShareAppMessage({
								title: window._shareData.title.othTitle, // 分享标题
								desc: window._shareData.content, // 分享描述
								link: window._shareData.shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: window._shareData.imageurl, // 分享图标
								type: '', // 分享类型,music、video或link，不填默认为link
								dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
								success: function () { 
										
								},
								cancel: function () { 
										// 用户取消分享后执行的回调函数
								}
						});
						wx.onMenuShareQQ({
								title: window._shareData.title.othTitle, // 分享标题
								desc: window._shareData.content, // 分享描述
								link: window._shareData.shareurl, // 分享链接
								imgUrl: window._shareData.imageurl, // 分享图标
								success: function () { 
									// 用户确认分享后执行的回调函数
								},
								cancel: function () { 
									// 用户取消分享后执行的回调函数
								}
						});
						wx.onMenuShareWeibo({
								title: window._shareData.title.othTitle, // 分享标题
								desc: window._shareData.content, // 分享描述
								link: window._shareData.shareurl, // 分享链接
								imgUrl: window._shareData.imageurl, // 分享图标
								success: function () { 
									// 用户确认分享后执行的回调函数
								},
								cancel: function () { 
										// 用户取消分享后执行的回调函数
								}
						});
						wx.onMenuShareQZone({
								title: window._shareData.title.othTitle, // 分享标题
								desc: window._shareData.content, // 分享描述
								link: window._shareData.shareurl, // 分享链接
								imgUrl: window._shareData.imageurl, // 分享图标
								success: function () { 
									// 用户确认分享后执行的回调函数
								},
								cancel: function () { 
										// 用户取消分享后执行的回调函数
								}
						});
					});
					// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421137522
					wx.error(function(){
					});

			});
	},
	loadUrl(url) {
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
	check(callback) {
		if (window.WebViewJavascriptBridge) {
					return callback();
			}
			if (window.WVJBCallbacks) {
					return window.WVJBCallbacks.push(callback);
			}
			window.WVJBCallbacks = [callback];
			var WVJBIframe = document.createElement('iframe');
			WVJBIframe.style.display = 'none';
			WVJBIframe.src = 'https://__bridge_loaded__';
			document.documentElement.appendChild(WVJBIframe);
			setTimeout(function() {
					document.documentElement.removeChild(WVJBIframe)
			}, 0)
	},
	Ios(action, params, callback) {   //ios 分享
		this.check(function() {
			if (!window.WebViewJavascriptBridge) {
				alert('您的APP版本过低，请升级APP。');
				return false;
			}
			window.WebViewJavascriptBridge.callHandler('jsCallNative', {
				action : action,
				params : params
			}, function(response) {
				callback && callback(response);
			});
		});
	},
	Android(host, action, data, callback) {  //安卓分享
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
}

//图片懒加载
export let lazyImg = ( cla = '.lazy') => {
    let aImg = document.querySelectorAll(cla);
    let len = aImg.length; //图片数量
    let n = 0;//存储图片加载到的位置，避免每次都从第一张图片开始遍历
    let seeHeight = document.documentElement.clientHeight; //窗口高度
	for (let i = n; i < len; i++) {
		if (aImg[i].offsetTop < seeHeight) {
			//console.log(seeHeight+' '+i+' '+aImg[i].offsetTop)
			aImg[i].src = aImg[i].getAttribute('from');
			aImg[i].onload = ()=>{
				aImg[i].setAttribute('lazy','');
			}
			n = i + 1;
		}
	}
    window.onscroll = function() {
        if(n == len) return;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        for (let j = n; j < len; j++) {
            if (aImg[j].offsetTop < seeHeight + scrollTop) {
                aImg[j].src = aImg[j].getAttribute('from');
                aImg[j].setAttribute('lazy','');
                n = j + 1;
            }
        }
    };
}