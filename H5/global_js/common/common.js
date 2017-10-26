/*
 * mui.extend 扩展方法
 */
(function($) {
	if (!$) {
		return false;
	}
	$.fn.find = function(selector) {
		return $(this.selector +' '+ selector);
	};
	$.fn.html = function(htmlStr) {
		if (typeof(htmlStr) == 'undefined') {
			return (this[0] && this[0].innerHTML) || '';
		} else {
			this.each(function(index, element) {
				element.innerHTML = htmlStr;
			});
			return this;
		}
	};
	$.fn.attr = function(name, value) {
		if (typeof(value) == 'undefined') {
			return (this[0] && this[0].getAttribute(name)) || '';
		} else {
			this.each(function(index, element) {
				element.setAttribute(name, value);
			});
			return this;
		}
	};
	$.fn.show = function() {
		this.each(function(index, element) {
			element.style.display = 'block';
		});
		return this;
	};
	$.fn.hide = function() {
		this.each(function(index, element) {
			element.style.display = 'none';
		});
		return this;
	};
	$.fn.tap = function(callback) {
		this.each(function(index, element) {
			element.addEventListener('tap', callback);
		});
		return this;
	};
	$.fn.addClass = function(className) {
		this.each(function(index, element) {
			element.classList.add(className);
		});
		return this;
	};
	$.fn.removeClass = function(className) {
		this.each(function(index, element) {
			element.classList.remove(className);
		});
		return this;
	};
})(window.mui);

/*
 * mui.extend 模板处理
 */
(function($) {
	var stringUtil = {
		template: function(tmpl, datas) {
			var tmpls = [], i;
			if (typeof(tmpl) == 'function') {
				tmpl = String(tmpl).replace(/^[^\{]*\{\s*\/\*!?|\*\/[;|\s]*\}$/g, '').replace(/(^\s*)|(\s*$)/g, '');
			}
			if (datas) {
				if (typeof(datas)=='object' && datas.constructor.name=='Array') {
					for (i = 0; i < datas.length; i ++) {
						if (typeof(datas[i].index) == 'undefined') {
							datas[i].index = i + 1;
						}
						tmpls.push(this.substitute(tmpl, datas[i]));
					}
				} else {
					tmpls.push(this.substitute(tmpl, datas));
				}
				return tmpls.join('');
			}
			return tmpl;
		},
		substitute: function(tmpl, data) {
			var that = this;
			if (data && typeof(data) == 'object') {
				// 循环判断 {#attr}{/attr} 属性值为数组时，生成列表
				// 条件判断 {#attr}{/attr} 属性值为非false(''/0/false/undefined/null等)情况，使用属性值object或者父data数据
				tmpl = tmpl.replace(/\{#([^{}#/=!?]+)\}([\s|\S]*?)\{\/\1\}/g, function(match, key, str) {
					if (data[key]) {
						if (typeof(data[key]) == 'object') {
							return that.template(str, data[key]);
						} else {
							return that.substitute(str, data);
						}
					}
					return '';
				});
				// 条件判断 {#!attr}{/attr} 属性值为false(''/0/false/undefined/null等)或空数组情况
				tmpl = tmpl.replace(/\{#!([^{}#/=!?]+)\}([\s|\S]*?)\{\/\1\}/g, function(match, key, str) {
					if (!data[key] || JSON.stringify(data[key])=='[]') {
						return that.substitute(str, data);
					}
					return '';
				});
				// 条件判断 {#attr=value}{/attr}
				tmpl = tmpl.replace(/\{#([^{}#/=!?]+)=(.*?)\}([\s|\S]*?)\{\/\1\}/g, function(match, key, value, str) {
					if ((data[key] + '') == value) {
						return that.substitute(str, data);
					}
					return '';
				});
				// 属性名称 {attr}
				tmpl = tmpl.replace(/\{([^{}#/=!?]+)\}/g, function(match, key) {
					return (data[key] !== undefined) ? (data[key] + '') : '';
				});
			}
			return tmpl;
		}
	};
	$.fn.template = function(data, template) {
		this.each(function(index, element) {
			var tmpl = template || element.querySelector('[type="text/template"]').innerHTML.trim();
			element.innerHTML = stringUtil.template(tmpl, data);
		});
		return this;
	};
})(window.Zepto || window.mui);

/*
 * 页面全局方法
 */
(function($) {

	// native方法封装
	var jfNative = {
		//加载url，引起宿主的url的改变
		loadUrl: function(url) {
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
		},
		bridge: {
			check: function(callback) {
				var that = this;
				if (browserUtil.jfmore < '1.0.2') {
					callback('您的APP版本过低，请升级APP。');
					return false;
				}
				if (!window.WebViewJavascriptBridge) {
					this.load();
				}
				if (window.WebViewJavascriptBridge) {
					//console.log('WebViewJavascriptBridge inited');
					callback();
				} else {
					document.addEventListener('WebViewJavascriptBridgeReady', function() {
						//console.log('WebViewJavascriptBridgeReady');
						callback();
					}, false);
				}
			},
			load: function() {
				if (!this.loaded) {
					this.loaded = true;
					window.WVJBCallbacks = [];
					//
					var WVJBIframe = document.createElement('iframe');
					WVJBIframe.style.display = 'none';
			        WVJBIframe.src = 'https://__bridge_loaded__';
			        document.documentElement.appendChild(WVJBIframe);
			        setTimeout(function() {
			        	document.documentElement.removeChild(WVJBIframe);
			        }, 0);

				}
			},
			open: function(action, params, callback) {
				if (!window.WebViewJavascriptBridge) {
					alert('您的APP版本过低，请升级APP。');
					return false;
				}
				//console.log('jsCallNative', action, params);
				WebViewJavascriptBridge.callHandler('jsCallNative', {
					action: action,
					params: params
				}, function(response) {
					if (callback) {
						callback(response);
					}
				});
			}
		},
		sharePage: function(pagekey) {
			var that = this;
			ajaxUtil.loadShareData(pagekey, function(data) {
				var params = {
					title: {
						wechat:document.title,
						othTitle:document.title
					},
					content: $('meta[name=description]').attr('content') || '',
					shareurl: location.href
				};
				$.extend(params, window._shareData || {});
				$.extend(params, data || {});
				if (!params.imageurl) {
					params.imageurl = location.origin +'/static/images/common/sharelogo.jpg';
				}
				that.bridge.open('share', params, function(response) {
					//console.log('callback', response);
				});
			});
		}
	};

	// string方法
	var stringUtil = {
		comma: function(str, length) {
			if (!length || length < 1) length = 3;
			var source = ('' + str).split('.');
			source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
			return source.join('.');
		},
		params: function(obj) {
			var params = [];
			for (var item in obj) {
				params.push(item +'='+ obj[item]);
			}
			return params.join('&');
		},
		//getQueryValue(str, name)
		getQueryValue: function(str, name) {
			if (!name) {
				name = str;
				str = location.search;
			}
			var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
			var match = str.match(reg);
			return (match && match[2] || '').trim();
		},
		//getQueryJSON()
		//getQueryJSON(str)
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
		formatTime: function(time, format) {
			var o = {
				'M+': time.getMonth() + 1,
				'd+': time.getDate(),
                'h+': time.getHours(),
				'H+': time.getHours(),
				'm+': time.getMinutes(),
				's+': time.getSeconds(),
				'S': time.getMilliseconds(),
				'W': ['日', '一', '二', '三', '四', '五', '六'][time.getDay()],
				'q+': Math.floor((time.getMonth() + 3) / 3)
			};
			if (format.indexOf('am/pm') >= 0) {
				format = format.replace('am/pm', (o['h+'] >= 12) ? '下午': '上午');
				if (o['h+'] >= 12) o['h+'] -= 12;
			}
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp('('+ k +')').test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
				}
			}
			return format;
		},
		createSign: function(data, options) {
			var keys = [], sign = [], item, i;
			options = options || {};
			for (item in data) {
				if (item != 'sign') {
					keys.push(item);
				}
			}
			keys.sort();
			for (i=0; i<keys.length; i++) {
				sign.push(keys[i] +(options.sepStr || '')+ data[keys[i]]);
			}
			sign.push(options.signKey || '09FB84B1-D90E-4C14-84DB-DEE924A87B51');
			//console.log(sign.join(options.joinStr || ''));
			//
			return CryptoJS.MD5(sign.join(options.joinStr || '')).toString();
		},
		getQueryTmpl: function(str, name) {
			var reg = new RegExp('\\{#'+ name +'\\}([\\s|\\S]*?)\\{\\/'+ name +'\\}', '');
			var match = str.match(reg);
			return (match && match[1] || '').trim();
		},
		getScriptTmpl: function($element, name) {
			return this.getQueryTmpl($element.find('script[type="text/template"]').html(), name);
		}
	};

	// cookie方法
	var cookieUtil = {
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

	// 浏览器判断
	var browserUtil = (function() {
		var channel = stringUtil.getQueryValue('_channel_') || sessionStorage.getItem('debug.browser') || '';
		var ua = navigator.userAgent.toLowerCase();
		var weixin = !!ua.match(/micromessenger/i);
		var jfmore = ua.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i), appver = (jfmore && jfmore[2].trim()) || '';
		var obj = {
			ios: /(iphone|ipod|ipad|ios)/i.test(ua),
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
			if (this.ios) {
				pageEvents.push(callback);
				return false;
			}
		};
		obj.closeWebview = function() {
			if (this.jfmore > '0.0.0') {
				jfNative.open('device', 'closewebview');
			} else {
				$ && $.toast && $.toast('关闭Webview');
			}
		};
		// 返回上一页
		obj.goBack = function() {
			if (document.referrer) {
				history.back();
			} else if (this.jfmore) {
				this.closeWebview();
			}
		};
		// 返回首页
		obj.goHome = function(url) {
			if (this.jfmore) {
				this.closeWebview();
			} else {
				location.href = url || '/jfmall/index.htm';
			}
		};
		return obj;
	})();

	// ajaxUtil
	var ajaxUtil = {
		loadData: function(options) {
			var postData = {
				authType: 'MD5',
				msgVersion: browserUtil.jfmore || '1.0.0',
				custString: browserUtil.jfmore ? 'jfmore_app_h5': 'jfmore_h5',
				platform: browserUtil.ios ? 'ios': 'android',
				appId: (browserUtil.jfmore ? 'jfmore_h5': browserUtil.weixin ? 'weixin_h5': 'h5'),
				coordinate: '120,30',
				machineNo: 'abcdefgh1234567890',
				reqTime: ''+ new Date().getTime()
			};
			//
			options.params = options.params || {};
			options.onSuccess = options.onSuccess || function(data) {
				console.log('loadData Success', data);
			};
			options.onError = options.onError || function(data) {
				console.log('loadData Error', data);
			};
			//
			for (var item in options.params) {
				postData[item] = options.params[item];
			}
			postData.sign = stringUtil.createSign(postData, {signKey:options.type=='payload'?'123456':''});
			//
			if ($) {
				var ajaxSetting = {
					type: options.type || 'post',
					url: options.url,
					data: postData,
					dataType: 'json',
					cache: true,
					success: function(data) {
						options.onBefore&&options.onBefore(data);
						if (data && data.respCode) {
							if (data.respCode == '0000') {
								if (data.data) {
									options.onSuccess(data.data);
								} else {
									options.onSuccess(data);
								}
							} else {
								options.onError({
									code: data.respCode,
									msg: data.respMsg
								});
							}
						} else if( data && data.code == '0000' ){
                            options.onSuccess(data);
                        }  else {
							options.onError({
								code: '9999',
								msg: data.respMsg
							});
						}
					},
					error: function() {
						options.onError({
							code: '9999',
							msg: '系统异常'
						});
					}
				};
				if (options.type == 'payload') {
					ajaxSetting.type = 'post';
					ajaxSetting.data = JSON.stringify(postData);
					ajaxSetting.contentType = 'application/json';
				}
				$.ajax(ajaxSetting);
			}
		},
		currTime : function(callback) {
			var that = this, getTime = function() {
				return new Date((+new Date()) + that.__daTime);
			};
			if (that.__isAsync) {
				return callback(getTime());
			}
			if (that.__callbacks) {
				return that.__callbacks.push(callback);
			}
			that.__callbacks = [ callback ];
			that.loadData({
				type:'get',
				url : '/pointgate/common/getServerDate',
				onSuccess : function(data) {
					that.__daTime = data.serverDate - (+new Date());
					that.__isAsync = true;
					that.__callbacks.map(function(item) {
						item(getTime());
					});
					delete that.__callbacks;
				}
			});
		},
		loadShareData: function(pagekey, callback) {
			if (pagekey == 'true') {
				callback();
				return false;
			}
			// 需要根据keyId到后台查询相应的分享图标和文案信息
			/*
			this.loadData({
				type: 'payload',
				url: '/pointgate/service/share/query',
				params: {
					keyId: pagekey
				},
				onSuccess: function(data) {
					// 根据接口返回的data，重新定义shareData，并返回
					var shareData = {
						title: '',
						content: '',
						imageurl: '',
						shareurl: location.href
					};
					callback(shareData);
				},
				onError: function() {
					callback();
				}
			});
			*/
		}
	};
	
	// 用户登录态相关
	var TOKENKEY = 'login_token',userUtil = {
		data: {
			token: cookieUtil.get(TOKENKEY) || ''
		},
		set: function(item, data) {
			if (typeof(data) != 'undefined') {
				this.data[item] = data;
			} else {
				this.data = item;
			}
			if (this.data.token) {// app 登录后
				cookieUtil.set(TOKENKEY, this.data.token);
			}
		},
		get: function(item) {
			return (item) ? this.data[item]: this.data;
		},
		check: function() {
			return !!this.get('token');
		},// 增加版验证登录
		check_v1: function(callback) {
			var m = this, __token, __key ;
			__key = '__cache_key';
			__token = cookieUtil.get(TOKENKEY);
			callback = callback || function () {};
			// 缓存5秒
			if (cache.get(__key)) {
				return callback(cache.get(__key));
			}
			if (m.__callbacks) {
				return m.__callbacks.push(callback);
			}
			m.__callbacks = [ callback ];
			ajaxUtil.loadData({
				type : 'payload',
				url : '/pointgate/service/validate/loginToken',
				params : {login_token:__token},
				onSuccess : function(data) {
					m.data.token = (data && data.validResult == '00') ? __token : '';
					m.__callbacks.map(function(item) {
						item(m.data.token);
					});
					delete m.__callbacks;
					m.data.token && cache.set(__key, m.data.token, 1000 * 5);
				},
				onError : function(data) {
					m.__callbacks.map(function(item) {
						item('');
					});
					delete m.__callbacks;
				},
			});
		},
		// checkLogin(url);
		// checkLogin(callback);
		checkLogin: function(callback, beforeLogin) {
			var that = this, url = '';
			if (typeof (callback) == 'string') {
				url = callback;
				callback = function() {
					if (!!(window.history && history.pushState)) {
						history.pushState(null, null, location.href);
					}
					location.replace(url);
				};
			}
			that.check_v1(function(token) {
				if (token) {
					callback(that.get());
				} else {
					if (browserUtil.jfmore) {
						window.onLoginSuccess = function(res) {
							that.set(res);
							callback(res);
						};
						jfNative.open('user', 'login', null, 'onLoginSuccess');
					} else {
						if (beforeLogin) {
							beforeLogin();
						}
						var _channel = stringUtil.getQueryValue('channel_source'), channel_source = (_channel ? '&channel_source=' + _channel : "");
						location.href = '/login/getlogincode.htm?callback='	+ encodeURIComponent(url || location.href) + channel_source;
					}
				}
			});
		},
		checkLink: function(container) {
			var that = this;
			if ($) {
				container.on('click', 'a[href*="needlogin=true"], a[data-needlogin="true"]', function() {
					that.checkLogin(this.href);
					return false;
				});
			} else {
				container.querySelectorAll('a[href*="needlogin=true"], a[data-needlogin="true"]').addEventListener('click', function() {
					that.checkLogin(this.href);
					return false;
				});
			}
		}
	};
	var cache = {
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
	    					_ext = window.cache._opts.ext;
	    					_time = new Date().getTime();
	    					for (key in localStorage) {
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
		}
	//
	window.cache = cache;
	window.jfNative = jfNative;
	window.stringUtil = stringUtil;
	window.cookieUtil = cookieUtil;
	window.browserUtil = browserUtil;
	window.userUtil = userUtil;
	window.ajaxUtil = ajaxUtil;
	//
	window.loadAjaxData = function(url, params, onSuccess, onError, mockCount) {
		if (typeof(params) == 'function') {
			onError = onSuccess;
			onSuccess = params;
			params = {};
		}
		var serverLibs = {
			dev: '/static/mockdata',
			stg: '/pointgate',
			uat: '/pointgate',
			prd: '/pointgate'
		};
		var server = decodeURIComponent(stringUtil.getQueryValue('debugdomain')) || sessionStorage.getItem('jflm.debug.domain') || serverLibs[browserUtil.envo];
		if (server.indexOf('mockdata') >= 0) {
			if (mockCount) {
				url += '.'+ Math.floor(Math.random() * mockCount);
			}
			url += '.json';
		}
		ajaxUtil.loadData({
			url: server + url,
			params: params,
			onSuccess: onSuccess,
			onError: onError
		});
	};

})(window.mui || window.Zepto);

/*
 * 微信分享
 */
(function(){
	if(browserUtil.weixin) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
		head.appendChild(script);
		script.onload = script.onreadystatechange = function(){
			if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
				share();
			}
		};

		function share(){
			var h = location.href;
			var index = h.indexOf("#");
			if(index && index > 0) {
				h = h.substring(0,index);
			}
			ajaxUtil.loadData({
				type: "get",
				url: '/pointgate/wechat/jsapi/auth.htm',
				params:{
					"authUrl": h
				},
				onSuccess:function(data){
					wx.config({
						debug: false,
						appId: data.appId,
						timestamp: data.timestamp,
						nonceStr: data.nonceStr,
						signature: data.signature,
						jsApiList:['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone']
					});
					wx.ready(function(){
						var shareData = {};
						if(window._shareData){
							shareData = {
								title: window._shareData.title.othTitle,
								link: window._shareData.shareurl,
								imgUrl: window._shareData.imageurl,
								desc: window._shareData.content
							}
						}

						//分享给朋友
						wx.onMenuShareAppMessage(shareData);
						//分享到朋友圈
						wx.onMenuShareTimeline(shareData);
						//分享到qq
						wx.onMenuShareQQ(shareData);
						//分享到qq空间
						wx.onMenuShareQZone(shareData);
					});
					wx.error(function(){
						//mui.toast("网络错误，请稍后再试");
					});
				},
				onError:function(e){

				}
			})



		}
	}
})();

/*
 * 全局处理
 */
(function($,mui) {
	var page = {
		init: function() {
			var that = this;
			// 微信视图判断
			if (browserUtil.weixin) {
				document.querySelector('html').classList.add('webview-wx');
			} else if (browserUtil.jfmore) {
				document.querySelector('html').classList.add('webview-app');
			}
			// 系统判断
			if (browserUtil.ios) {
				document.querySelector('html').classList.add('webview-ios');
			} else if (browserUtil.android) {
				document.querySelector('html').classList.add('webview-android');
			}
			// iframe内嵌判断
			if (parent.document != document && window.name == 'inframe') {
				document.querySelector('html').classList.add('webview-inframe');
			}
			//
			window.addEventListener('load', function() {
				that.initHead();
				that.initMain();
				that.initStat();
				if(browserUtil.weixin&&(!userUtil.check() || (userUtil.check()&&true))&&window.g&&window.g.followme){
					that.initFollow();
				}
			});
		},
		initHead: function() {
			var headElm = document.querySelector('.mui-bar-nav');
			var backBtn = document.querySelector('.mui-bar-nav .mui-icon-left-nav');
			var referrer = stringUtil.getQueryValue('referrer');
			var sharemode = stringUtil.getQueryValue('sharemode') || document.body.getAttribute("data-sharemode") || '';
			if (browserUtil.jfmore) {
				var closeBtn = document.createElement('a');
				closeBtn.className = 'mui-icon mui-icon-closeempty mui-pull-left';
				closeBtn.setAttribute('data-stat', '标题栏-关闭');
				closeBtn.addEventListener('tap', function() {
					if (browserUtil.jfmore > '0.0.0') {
						jfNative.open('device', 'closewebview');
					} else {
						$ && $.toast && $.toast('关闭Webview');
					}
					return false;
				});
				headElm && headElm.insertBefore(closeBtn, headElm.querySelector('.mui-title'));
				//
				if (sharemode!='') {
					var shareBtn = document.createElement('a');
					shareBtn.className = 'mui-icon mui-icon-upload mui-icon-share mui-pull-right';
					shareBtn.setAttribute('data-stat', '标题栏-分享');
					shareBtn.setAttribute('data-sharepage', sharemode);
					headElm && headElm.insertBefore(shareBtn, headElm.querySelector('.mui-title'));
				}
			}else{
				if (headElm) headElm.style.display = 'none';
			}
			if(!browserUtil.weixin){
				if (headElm) headElm.style.display = 'block';
				if(window.getComputedStyle(document.documentElement,null).fontSize.replace('px','') > 40){
					document.body.style.paddingTop = '.88rem';
				}else{
					document.body.style.paddingTop = 100*document.documentElement.clientWidth/750*16/window.getComputedStyle(document.documentElement,null).fontSize.replace('px','')*0.88 + 'px';
				}
			}
			if (backBtn) {
				var status = (!document.referrer || referrer=='no' || browserUtil.weixin) ? 'none': 'block';
				backBtn.style.display = status;
				backBtn.setAttribute('data-stat', '标题栏-返回');
			}
			//console.log('页头初始化');
		},
		initMain: function() {
			if (document.querySelector('body').getAttribute('data-needrefresh') == 'true') {
				browserUtil.checkRefresh(function() {
					location.reload();
				});
			}
			// 页面上的分享按钮初始化
			var $share = mui('[data-sharepage]');
			if (browserUtil.jfmore && $share.length > 0 && browserUtil.ios) {
				jfNative.bridge.check(function(message) {
					$share.tap(function() {
						if (message) {
							alert(message);
						} else {
							jfNative.sharePage(this.getAttribute('data-sharepage') || 'true');
						}
					});
				});
			}else{
				$share.tap(function(){
					if(browserUtil.jfmore < '1.0.2'){
						alert('您的APP版本过低，请升级APP。')
						return;
					}
					window.android.getShareData(JSON.stringify(window._shareData));
				})
			}
		},
		//window.android.getShareData()
		initStat: function() {
			// 百度统计代码部署
			if (window._hmt) {
				console.error('页面上重复部署了百度统计，需要清除');
				return false;
			}
			window._hmt = window._hmt || [];
			var hm = document.createElement("script");
			var s = document.getElementsByTagName("script")[0];
			// hm.src = "https://hm.baidu.com/hm.js?1d9e9535fc6315ff5b6e24dbc5e1ec15";
			hm.src = "https://hm.baidu.com/hm.js?3e59e3f2895f6e1d9327fd615c867a97";
			s.parentNode.insertBefore(hm, s);
			//
			window.statUtil = {
				sendPage: function(page) {
					_hmt.push(['_trackPageview', page]);
				},
				sendEvent: function(button, page) {
                	_hmt.push(['_trackPageview', '/virtual/click/?site=h5&path='+ location.pathname +'&page='+ (page||document.title) +'&button='+ button]);
				}
			};
			// 全页点击事件监听
			document.addEventListener('mousedown', function(e) {
				var ele = e.target, i = 1;
				while (ele && ele.tagName && ele.tagName.toLowerCase()!='body' && ele.tagName.toLowerCase()!='html' && i < 4) {
					if (ele.getAttribute('data-stat')) {
						setTimeout(function() {
							statUtil.sendEvent(ele.getAttribute('data-stat'));
						}, 10);
						break;
					}
					ele = ele.parentNode;
					i ++;
				}
			});
			//console.log('百度统计部署');
		},
		initFollow: function(){
			var btncss = document.createElement('style'),
				headEle = document.getElementsByTagName('head')[0];
			btncss.type = 'text/css';
			btncss.innerHTML = [
				'@keyframes bounceInDown{0%,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:none;transform:none}}.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}',
				'.animated{-webkit-animation-duration:.6s;animation-duration:.6s;-webkit-animation-fill-mode:both;animation-fill-mode:both}',
				'#btn-follow { position:fixed; z-index:10; top:2rem; right:0; width:1.2rem; height:1.92rem; background:url("/static/images/common/follow.png") no-repeat; background-size:100%; -webkit-transition:right .3s ease-in-out; transition:right .3s ease-in-out }',
				'#btn-follow.active { right:-1.5rem }',
				'#pop-mask {-webkit-user-select:none;-webkit-touch-callout:none; position:fixed; z-index:20; top:0; right:0; bottom:0; left:0; background:rgba(0,0,0,.5) }',
				'#pop-mask img { position:absolute; top:50%; left:50%; margin-top:-2.65rem; margin-left:-2.2rem; width:4.4rem; height:5.3rem }'
			].join('\n');
			headEle.appendChild(btncss);
			var btn = document.createElement('a');
			btn.id = 'btn-follow';
			btn.href = 'javascript:void(0)';
			document.body.appendChild(btn);
			document.getElementById('btn-follow').onclick = function(){
				document.getElementById('btn-follow').className = 'active';
				if(!document.getElementById('pop-mask')){
					followPop();
				}else{
					document.getElementById('pop-mask').style.display = 'block';
				}
			};
			function followPop(){
				var pop = document.createElement('div');
				pop.id = 'pop-mask';
				pop.className = 'animated bounceInDown';
				pop.innerHTML = '<img src="/static/images/common/follow_qr.png?v=20170914">';
				document.body.appendChild(pop);
				document.getElementById('pop-mask').onclick = function(e){
					document.getElementById('pop-mask').style.display = 'none';
					document.getElementById('btn-follow').className = '';
				}
			}
		}
	};
	page.init();


})(window.jQuery || window.Zepto,window.mui);