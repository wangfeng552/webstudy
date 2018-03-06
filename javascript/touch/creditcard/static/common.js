(function(cui) {

	/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);


	// 浏览器判断
	window.browserUtil = (function() {
		var channel = sessionStorage.getItem('debug.browser') || '';
		var ua = navigator.userAgent.toLowerCase();
		var weixin = !!ua.match(/micromessenger/i);
		var jfmore = ua.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i),
			appver = (jfmore && jfmore[2].trim()) || '';
		var obj = {
			ios: /(iphone|ipod|ipad|ios)/i.test(ua),
			android: !!ua.match(/android/i),
			weixin: weixin || (channel == 'weixin'),
			jfmore: appver || ((channel == 'jfmore') ? '0.0.0': ''),
			dev: !!location.hostname.match(/dev/),
			beta: !!location.hostname.match(/stg/),
			uat: !!location.hostname.match(/uat/),
			prd: !location.hostname.match(/dev|stg|uat/)
		}
		return obj;
	})();

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

	//加签
	var createSign = function(options){
		options = options || {};
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
		for (var item in options) {
			postData[item] = options[item];
		}
		postData.sign = stringUtil.createSign(postData, {signKey:options.type=='payload'?'123456':''});
		return postData;
	}

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
			sign.push(options.signKey || '123456');
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
			for(var i = 0; i < tC.length; i++) {
				a = tC[i].split('=');
				tO[a[0]] = a[1];
			}
			return tO;
		},
		get: function(name) {
			var value = this.load()[name];
			if(value) {
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
			options = (typeof(options) == 'object') ? options : {
				day: options
			};
			var path = options.path || '/';
			var domain = options.domain || '';
			var exptime = 0;
			if(options.day) {
				exptime = 1000 * 60 * 60 * 24 * options.day;
			} else if(options.hour) {
				exptime = 1000 * 60 * 60 * options.hour;
			} else if(options.minute) {
				exptime = 1000 * 60 * options.minute;
			} else if(options.second) {
				exptime = 1000 * options.second;
			}
			var exp = new Date(),
				expires = '';
			if(exptime > 0) {
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

	var userUtil = {
		data: {
			token: cookieUtil.get('login_token') || ''
		},
		set: function(item, data) {
			if(typeof(data) != 'undefined') {
				this.data[item] = data;
			} else {
				this.data = item;
			}
			if(this.data.token) {
				cookieUtil.set('login_token', this.data.token);
			}
		},
		get: function(item) {
			return(item) ? this.data[item] : this.data;
		},
		check: function() {
			return !!this.get('token');
		},
		// checkLogin(url);
		// checkLogin(callback);
		checkLogin: function(callback, beforeLogin) {
			var that = this,
				url = '';
			if(typeof(callback) == 'string') {
				url = callback;
				callback = function() {
					if(!!(window.history && history.pushState)) {
						history.pushState(null, null, location.href);
					}
					location.replace(url);
				};
			}
			if(this.check()) {
				callback(this.get());
			} else {
				if(browserUtil.jfmore) {
					window.onLoginSuccess = function(res) {
						that.set(res);
						callback(res);
					};
					jfNative.open('user', 'login', null, 'onLoginSuccess');
				} else {
					if(beforeLogin) {
						beforeLogin();
					}
					location.href = '/login/getlogincode.htm?callback=' + encodeURIComponent(url || location.href);
				}
			}
		},
		checkLink: function(container) {
			var that = this;
			container.querySelectorAll('a[href*="needlogin=true"], a[data-needlogin="true"]')[0].addEventListener('touchend', function() {
				that.checkLogin(this.href);
				return false;
			});
		}
	};

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
				if (!window.WebViewJavascriptBridge) {
					this.load(callback);
				}
				if (window.WebViewJavascriptBridge) {
					console.log('WebViewJavascriptBridge inited');
					callback();
				} else {
					document.addEventListener('WebViewJavascriptBridgeReady', function() {
						console.log('WebViewJavascriptBridgeReady');
						callback();
					}, false);
				}
			}
		}
	};
	window.CryptoJS = CryptoJS;
	window.cookieUtil = cookieUtil;
	window.browserUtil = browserUtil;
	window.userUtil = userUtil;
	window.stringUtil = stringUtil;
	window.jfNative = jfNative;

	//通用方法
	var setId = '';
	var cui = {
		loading: function(msg){
			return '<div id="loading"><span class="pullTxt">'+msg+'</span><span class="scale-point active-1 scalePoint"></span><span class="scale-point active-2 scalePoint"></span><span class="scale-point active-3 scalePoint"></span></div>';
		},
		alert: function(msg, times) {
			msg = msg || '提示信息';
			times = times || 3000;
			var $alert = document.getElementById('pop-alert');
			if($alert){
				$alert.innerHTML = msg;
			}else{
				var el = document.createElement('div');
				el.id = 'pop-alert';
				el.innerHTML = msg;
				document.body.appendChild(el);
				el.style['max-width'] = '50%';
				el.style['left'] = '50%';
				el.style['margin-left'] = '-1rem';
				el.style['bottom'] = '-3rem';
				el.style['line-height'] = '.4rem';
				el.style['padding'] = '.2rem .4rem';
				el.style['font-size'] = '.28rem';
				el.style['color'] = '#fff';
				el.style['background'] = 'rgba(0,0,0,.7)';
				el.style['-webkit-transition'] = 'bottom .1s ease-in-out';
				el.style['transition'] = 'bottom .1s ease-in-out';
				el.style['position'] = 'fixed';
				el.style['text-align'] = 'center';
				el.style['word-wrap'] = 'break-word';
				el.style['border-radius'] = '4px';
				setTimeout(function() {
					el.style.bottom = '2rem';
				}, 100);
			}
			document.getElementById('pop-alert').style.marginLeft = '-' + document.getElementById('pop-alert').clientWidth/2 + 'px';
			clearTimeout(setId);
			setId = setTimeout(function() {
				if(document.getElementById('pop-alert'))document.getElementById('pop-alert').outerHTML = '';
			}, times + 100);
		},
		confirmPop: function(param) {
			if(document.getElementById('confirm')){
				return false;
			}
			var title = param.title || '',
				content = param.content || '',
				confirm = param.confirm || {},
				cancel = param.cancel || {},
				close = param.close || {},
				style = param.style || {};
			confirm = {
				show: confirm.show !== undefined ? confirm.show.constructor === Boolean ? confirm.show : true : false,
				callback: confirm.callback !== undefined ? confirm.callback.constructor === Function ? confirm.callback : null : null
			}
			cancel = {
				show: cancel.show !== undefined ? cancel.show.constructor === Boolean ? cancel.show : true : false,
				callback: cancel.callback !== undefined ? cancel.callback.constructor === Function ? cancel.callback : null : null
			}
			close = {
				show: close.show !== undefined ? close.show.constructor === Boolean ? close.show : true : false,
				callback: close.callback !== undefined ? close.callback.constructor === Function ? close.callback : null : null
			}
			style = {
				width: style.width !== undefined ? style.width.constructor === Number ? style.width/100 : '' : '',
				height: style.height !== undefined ? style.height.constructor === Number ? style.height/100 : '' : '',
				background: style.background !== undefined ? style.background.constructor === String ? style.background : '' : ''
			}

			var self = this;
			var tpl = '<div class="pop-confirm">'+
				'<div class="confirm-main" style="'+
				(style.width ? 'width:' + style.width + 'rem;margin-left:-' + style.width/2 + 'rem;' : '')+
				(style.height ? 'height:' + style.height + 'rem;margin-top:-' + style.height/2 + 'rem;' : '')+
				'">'+
				(close.show ? '<a class="confirm-close shake-rotate animated" href="javascript:void(0)"><span></span><span></span></a>' : '')+
				'<div class="confirm-content" style="'+
				(style.background ? 'background:' + style.background : '') + '">'+
				(title ? '<p class="c-title">' + title + '</p>' : '')+
				(content ? '<div class="c-content">'+ content +'</div>' : '')
				'</div>'+
				confirm.show || cancel.show ? '<div class="confirm-bottom clearfix">' : '' +
				(cancel.show ? '<a class="confirm-btn confirm-cancel" href="javascript:void(0)">取消</a>' : '')+
				(confirm.show ? '<a class="confirm-btn confirm-confirm" href="javascript:void(0)">确认</a>' : '') +
				confirm.show || cancel.show ? '</div>' : ''+
				'</div>'+
				'</div>';
			var div = document.createElement('div');
			div.id = "confirm";
			div.style.width = '100%';
			div.style.height = '100%';
			div.style.position = 'fixed';
			div.style.top = 0;
			div.style.left = 0;
			div.style.zIndex = 1000;
			document.body.appendChild(div);
			document.getElementById('confirm').innerHTML = tpl;
			if(cancel.show!=confirm.show){
				document.querySelector('.confirm-btn').style.width='100%';
			}
			var $confirm = document.querySelector('.pop-confirm');
			setTimeout(function() {
				$confirm.className += ' active';
			}, 50);
			close.show ? $confirm.querySelector('.shake-rotate').className += ' shakeRotate' : '';
			$confirm.querySelector('.confirm-main').style.marginTop = -$confirm.querySelector('.confirm-main').clientHeight / 2 + 'px';
			if(cancel.show){
				$confirm.querySelector('.confirm-cancel').addEventListener('touchend', function() {
					cancel.callback && cancel.callback();
					removePop();
				});
			}
			if(close.show){
				$confirm.querySelector('.confirm-close').addEventListener('touchend', function() {
					close.callback && close.callback();
					removePop();
				});
			}
			if(confirm.show){
				$confirm.querySelector('.confirm-confirm').addEventListener('touchend', function() {
					confirm.callback && confirm.callback();
					removePop();
				});
			}

			function removePop() {
				$confirm.className = $confirm.className.replace(/\s+active/g, '');
				setTimeout(function() {
					$confirm.outerHTML = '';
				}, 200);
				setTimeout(function(){
					document.getElementById('confirm').outerHTML = '';
				},300);
			}
		},
		ajax: function(param) {
			var config = {
				type: param.type || 'POST',
				dataType: param.dataType || 'json',
				contentType: param.contentType || 'application/json',
				url: param.url || '',
				data: param.data || null,
				success: param.success || function() {},
				error: param.error || function() {},
				complete: param.complete || function() {},
				fail: param.fail || function() {}
			};
			var ajaxData = createSign(config.data);
			var xhr = new XMLHttpRequest();
			xhr.responseType = config.dataType;
			xhr.open(config.type, config.url);
			xhr.setRequestHeader('content-type', config.contentType);
			xhr.send(JSON.stringify(ajaxData));
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.response) {
					if(xhr.status == 200) {
						config.success({
							data: xhr.response.data,
							respCode: xhr.response.retCode || xhr.response.respCode,
							respMsg: xhr.response.retMsg || xhr.response.respMsg
						});
					}
				} else {
					config.fail(xhr.response);
				}
			}
		},
		initDate: function(format, timestamp) {
			var a, jsdate = ((timestamp) ? new Date(timestamp) : new Date());
			var pad = function(n, c) {
				if((n = n + "").length < c) {
					return new Array(++c - n.length).join("0") + n;
				} else {
					return n;
				}
			}
			var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var txt_ordin = {
				1: "st",
				2: "nd",
				3: "rd",
				21: "st",
				22: "nd",
				23: "rd",
				31: "st"
			};
			var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var f = {
				// Day
				d: function() {
					return pad(f.j(), 2)
				},
				D: function() {
					return f.l().substr(0, 3)
				},
				j: function() {
					return jsdate.getDate()
				},
				l: function() {
					return txt_weekdays[f.w()]
				},
				N: function() {
					return f.w() + 1
				},
				S: function() {
					return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
				},
				w: function() {
					return jsdate.getDay()
				},
				z: function() {
					return(jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
				},

				// Week
				W: function() {
					var a = f.z(),
						b = 364 + f.L() - a;
					var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
					if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
						return 1;
					} else {
						if(a <= 2 && nd >= 4 && a >= (6 - nd)) {
							nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
							return date("W", Math.round(nd2.getTime() / 1000));
						} else {
							return(1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
						}
					}
				},

				// Month
				F: function() {
					return txt_months[f.n()]
				},
				m: function() {
					return pad(f.n(), 2)
				},
				M: function() {
					return f.F().substr(0, 3)
				},
				n: function() {
					return jsdate.getMonth() + 1
				},
				t: function() {
					var n;
					if((n = jsdate.getMonth() + 1) == 2) {
						return 28 + f.L();
					} else {
						if(n & 1 && n < 8 || !(n & 1) && n > 7) {
							return 31;
						} else {
							return 30;
						}
					}
				},

				// Year
				L: function() {
					var y = f.Y();
					return(!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
				},
				//o not supported yet
				Y: function() {
					return jsdate.getFullYear()
				},
				y: function() {
					return(jsdate.getFullYear() + "").slice(2)
				},

				// Time
				a: function() {
					return jsdate.getHours() > 11 ? "pm" : "am"
				},
				A: function() {
					return f.a().toUpperCase()
				},
				B: function() {
					// peter paul koch:
					var off = (jsdate.getTimezoneOffset() + 60) * 60;
					var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
					var beat = Math.floor(theSeconds / 86.4);
					if(beat > 1000) beat -= 1000;
					if(beat < 0) beat += 1000;
					if((String(beat)).length == 1) beat = "00" + beat;
					if((String(beat)).length == 2) beat = "0" + beat;
					return beat;
				},
				g: function() {
					return jsdate.getHours() % 12 || 12
				},
				G: function() {
					return jsdate.getHours()
				},
				h: function() {
					return pad(f.g(), 2)
				},
				H: function() {
					return pad(jsdate.getHours(), 2)
				},
				i: function() {
					return pad(jsdate.getMinutes(), 2)
				},
				s: function() {
					return pad(jsdate.getSeconds(), 2)
				},
				//u not supported yet

				// Timezone
				//e not supported yet
				//I not supported yet
				O: function() {
					var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
					if(jsdate.getTimezoneOffset() > 0) t = "-" + t;
					else t = "+" + t;
					return t;
				},
				P: function() {
					var O = f.O();
					return(O.substr(0, 3) + ":" + O.substr(3, 2))
				},
				//T not supported yet
				//Z not supported yet

				// Full Date/Time
				c: function() {
					return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
				},
				//r not supported yet
				U: function() {
					return Math.round(jsdate.getTime() / 1000)
				}
			};

			return format.replace(/[\]?[a-zA-Z]/g, function(t, s) {
				return f[t]();
			});
		}
	}
	window.cui = cui;

	var head = {
		init: function() {
			var navbar = stringUtil.getQueryValue('navbar') || (document.body.attributes['data-navbar'] ? document.body.attributes['data-navbar'].value : '') || '';
			// 在微信里或者navbar=no时，不显示标题栏
			if (navbar!='no' && !browserUtil.weixin) {
				this.initStyle();
				this.initHtml();
			}
		},
		initStyle: function() {
			var styleStr = ['<style>',
					'body { padding-top:0.88rem; }',
					'.v-navbar { position:fixed; top:0; left:0; right:0; padding:0 0.2rem; height:0.88rem; line-height:0.88rem; background-color:#fff; z-index:999; overflow:hidden; font-family:Helvetica Neue,Helvetica,sans-serif; box-shadow:0px 2px 6px rgba(0,0,0,.1) }',
					'.v-navbar h1 { position:absolute; left:50%; width:50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); font-size:0.32rem; text-align:center; height:0.88rem; line-height:.88rem; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; color:#333; font-weight:400; margin:0; padding:0; }',
					'.v-navbar .navigate-left, .v-navbar .navigate-close { float:left; position:relative; width:0.48rem; height:0.88rem; }',
					'.v-navbar .navigate-left:after { content:""; position:absolute; display:block; left:50%; top:50%; width:0.17rem; height:0.17rem; border-right:solid .04rem #d3b669; border-bottom:solid .04rem #d3b669; -webkit-transform:translate(-25%, -50%) rotate(135deg); transform:translate(-25%, -50%) rotate(135deg); }',
					'.v-navbar .navigate-close:before, .v-navbar .navigate-close:after { content:""; position:absolute; display:block; left:50%; top:50%; width:0.34rem; height:0; }',
					'.v-navbar .navigate-close:before { border-bottom:solid 0.04rem #666; -webkit-transform:translateX(-50%) rotate(45deg); transform:translateX(-50%) rotate(45deg); }',
					'.v-navbar .navigate-close:after { border-top:solid 0.04rem #666; -webkit-transform:translateX(-50%) rotate(-45deg); transform: translateX(-50%) rotate(-45deg); }',
					'.v-navbar .navigate-share { float:right; width:0.6rem; height:0.88rem; background:url(/static/images/common/btn_share.png) no-repeat center center; background-size:0.4rem 0.4rem; }',
				'</style>'].join('');
			var headStyle = document.createElement('style');
			headStyle.type = 'text/css';
			if(headStyle.styleSheet){
				headStyle.styleSheet.cssText = styleStr;
			}else{
				headStyle.innerHTML = styleStr;
			}
			document.getElementsByTagName('head')[0].appendChild(headStyle);
		},
		initHtml: function() {
			// url 上面添加？sharemode=true时会自动添加分享按钮；或者在body里添加属性
			var sharemode = stringUtil.getQueryValue('sharemode') || (document.body.attributes['data-sharemode'] ? document.body.attributes['data-sharemode'].value : '') || '';
			var headElm = document.createElement('div');
			headElm.className = 'v-navbar';
			headElm.innerHTML = '<h1 class="navigate-title">'+document.title+'</h1>';
			document.body.insertBefore(headElm, document.getElementsByTagName('div')[0]);
			document.body.style.paddingTop = '.88rem';
			if (document.referrer && stringUtil.getQueryValue('referrer')!='no') {
				var backBtn = document.createElement('a');
				backBtn.className = 'navigate-left';
				backBtn.href = 'javascript:history.back()';
				backBtn.setAttribute('data-stat', '标题栏-返回');
				headElm.insertBefore(backBtn, headElm.querySelector('.navigate-title'));
			}
			if (browserUtil.jfmore) {
				var closeBtn = document.createElement('a');
				closeBtn.className = 'navigate-close';
				closeBtn.setAttribute('data-stat', '标题栏-关闭');
				closeBtn.addEventListener('touchend', function() {
					if (browserUtil.jfmore > '0.0.0') {
						jfNative.open('device', 'closewebview');
					} else {
						$ && $.toast && $.toast('关闭Webview');
					}
					return false;
				});
				headElm.insertBefore(closeBtn, headElm.querySelector('.navigate-title'));
			}
//			if (browserUtil.jfmore && sharemode!='' && browserUtil.jfmore != '1.0.0') {
//				html += '<a class="navigate-share" otype="button" data-stat="标题栏-分享" data-sharepage="'+ sharemode +'"></a>';
//			}
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
	}

	var init_G = function(){
		head.init();
		if(browserUtil.weixin&&(!userUtil.check() || (userUtil.check()&&true))&&window.g&&window.g.followme){
			that.initFollow();
		}
		//登录态
//		if(!userUtil.check()){
//			userUtil.checkLogin(location.href);
//		}
	}
	init_G();

})();


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
			$.ajax({
				type: 'get',
				url: '/pointgate/wechat/jsapi/auth.htm',
				data:{
					"authUrl": h
				},
				success:function(data){
					data = JSON.parse(data).data;
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
					wx.error(function(e){
						//mui.toast("网络错误，请稍后再试");
					});
				}
			})



		}
	}
})();