/*
 * 页面全局方法
 */
(function($) {

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
				str = location.href + '';
			}
			var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
			var match = str.match(reg);
			return ((match && match[2] || '').trim()).split('#')[0];
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
				url = url || '/jfmall/index.htm';
				if (typeof(spm) == "object" && spm && spm._getPageCode()) {
					url = spm.addSpm(url);
				}
				var source = 'channel_source';
				var source_val = stringUtil.getQueryValue(source);
				if (source_val) {
					url = stringUtil.addQueryValue(url, source, source_val)
				}
				location.href = url;
			}
		};
		return obj;
	})();

	// ajaxUtil
	var TOKENKEY = 'login_token', ajaxUtil = {
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
								msg: data?data.respMsg:''
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
		check_v1: function(callback) {
			var m = this, __token, __key, __run;
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
			__run = function (token) {
				m.__callbacks.map(function(item) {
					setTimeout(function() {item(token);}, 0);
				});
				delete m.__callbacks;
			}
			if (!__token) {
				__run('');
				return;
			}
			ajaxUtil.loadData({
				type : 'payload',
				url : '/pointgate/service/validate/loginToken',
				params : {login_token:__token},
				onSuccess : function(data) {
					__token = (data && data.validResult == '00') ? __token : '';
					cookieUtil.set(TOKENKEY, __token);
					__run(__token);
					__token && cache.set(__key, __token, 1000 * 5);
				},
				onError : function(data) {
					__run('');
				}
			});
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
	window.stringUtil = stringUtil;
	window.cookieUtil = cookieUtil;
	window.browserUtil = browserUtil;
	window.ajaxUtil = ajaxUtil;
	//
})(window.mui || window.Zepto);

