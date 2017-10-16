(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.spm = factory());
}(this, function () {
	var SPMKEY ='spm', SPMSIGN = ".", NOSPM = 'no', ITEM = 'item', LIST = 'list', historyArr = [];
	// 浏览器相关
	var ua = navigator.userAgent, platform, browser, system = {
		jfmore : /_jfmore_(\d\.\d\.\d)/.test(ua) ? (/android/i.test(ua) ? 'android' : 'ios') : '', // App
		inIos : !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 	// ios 终端
		inAndroid : /(android)/i.test(ua), 						// android 终端
		inPc : !/Android|webOS|iphone|ipod|ipad|BlackBerry/i.test(ua),// pc 端
		inWeixin : !!ua.match(/micromessenger/i),
		browser : {
			version : (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, '0' ])[1],
			safari : /webkit/i.test(ua),
			uc : /Linux/i.test(ua),
			opera : /opera/i.test(ua),
			msie : /msie/i.test(ua) && !/opera/.test(ua),
			mozilla : /mozilla/i.test(ua) && !/(compatible|webkit)/i.test(ua)
		}
	};// 平吧
	platform = (function() {
		var str = "";
		if (system.jfmore) {
			str = system.jfmore;
		} else if (system.inWeixin) {
			str = "weixin";
		} else if (system.inPc) {
			str = "pc";
		} else if (system.inIos) {
			str = "ios-h5";
		} else if (system.inAndroid) {
			str = "android-h5";
		}
		return str;
	})();// 浏览器
	browser = (function() {
		var str = '', browser = system.browser;
		for ( var _key in browser) {
			if (browser[_key] && browser.hasOwnProperty(_key) && _key != 'version') {
				str = _key;
				break;
			}
		}
		return str;
	})();
	
	// util 帮助类
	var util = {
		get : function(selector) {
			return typeof selector == "object" ? selector : document.querySelector(selector);
		},
		getAll : function(selector) {
			return typeof selector == "object" ? selector : document.querySelectorAll(selector);
		},
		getDir : function(elem, dir) {
			var matched = [], cur = elem[dir];
			while (cur && cur != document) {
				if (cur.nodeType == 1) matched.push(cur);
				cur = cur[dir];
			}
			return matched;
		},
		createElem : function(tag, attrs) {
			tag = document.createElement(tag);
			for (var _key in attrs) {
				tag[_key] = attrs[_key];
			}
			return tag;
		},
		isArray : function(E) {
			return Object.prototype.toString.call(E) === "[object Array]";
		},
		format : function (str) {
			if (arguments.length > 1) {
				var parameters = (arguments.length == 2 && this.isArray(arguments[1])) ? arguments[1] : this.makeArray(arguments).slice(1);
				this.each(parameters, function(i, n) {
					n = n == undefined ? '' : n;
					str = str.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
			}
			return str;
		},
		makeArray : function(G) {
			var E = [], F = G.length;
			while (F) {E[--F] = G[F];}
			return E;
		},
		each : function(arr, callback) {
			arr = arr || [];
			for ( var i = 0, len = arr.length; i < len; i++) {
				if (callback.call(arr[i], i, arr[i]) == false) {
					break;
				}
			}
		},
		param : function(data) {
			var arr = [];
			for ( var _key in data || {}) {
				if (data.hasOwnProperty(_key)) {
					arr.push(_key + "=" + data[_key]);
				}
			}
			return arr.join("&");
		},
		cookie : {
			set : function(a, b, d) {
		        var k;d = d || {};
		        d.K && (k = new Date, k.setTime(k.getTime() + d.K));
		        document.cookie = a + "=" + b + (d.domain ? "; domain=" + d.domain : "") + (d.path ? "; path=" + d.path : "") + (k ? "; expires=" + k.toGMTString() : "") + (d.rb ? "; secure" : "");
		    },
		    get : function(a) {
		        return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : null;
		    }
		},
		getSiteCode : function(url) {
			var data, _spm, site = '';
			data = spmObj.getQueryValue(url || '', SPMKEY);
			_spm = data.split(SPMSIGN);
			if (_spm[0] != '' && _spm[1] != '') {
				site = _spm.slice(0, 2).join(SPMSIGN);
			}
			return site;
		}, // 获得body spm
		getPageCode : function(url) {
			var data, _spm;
			data = spmObj.getQueryValue(url || '', SPMKEY);
			_spm = data.split(SPMSIGN);
			return _spm[2] || '';
		}, // 获得位置 spm
		getPosCode : function(url) {
			var data, _spm;
			data = spmObj.getQueryValue(url || '', SPMKEY);
			_spm = data.split(SPMSIGN);
			return _spm[3] || '';
		}
	};
	
	// ----------------------------
	var spmObj = {
		url :'http://172.16.20.18:8080/test/servlet/Spm',
		//		url :'http://172.16.17.74:9300/pointgate/datacenter/ckd',
		send : function (data) {
			(new Image()).src = this.url + '?' + util.param(data);
		},
		sendInfo : function(_spm, opts) {
			var m = this, _data = {}, token = 'login_token';
			opts.action == 'click' && (opts.action = '02');
			
			_data.useragent 	= ua;// 代理
			_data.jfmore 		= system.jfmore;
			_data.browser 		= platform + '_' + browser + '_' + system.browser.version;// 终端_浏览器_版本
			_data.domain 		= document.domain; // 域名
			_data.iscookie		= navigator.cookieEnabled ? 1 : 0;
			_data.sid 			= spmObj.getPVID(); 		// 会话id
			_data.token 		= util.cookie.get(token) || ''; // 会员id
			_data.eventType 	= opts.action; 		 // 事件类型
			_data.remark	 	= opts.extend || ''; // 备注
			_data.preSiCode 	= ''; // 前置页站点编码
			_data.prePaCode 	= ''; // 前置页页面编码
			_data.preMoCode 	= ''; // 前置页模块编码
			_data.moCode 		= 0; // 模块编码
			_data.spm		 	= 0; // 模块的位置
			_data.siCode 		= m.getSiteCode(); 		// 站点编码
			_data.paCode		= m.getPageCode() || 0; // 页面编码
			if (opts.action == '02') {
				_data.moCode	= _spm[3] || 0; // 模块编码
				_data.spm		= _spm[4] || 0; // 模块的位置
			}
			_data.preurl 		= document.referrer;// 前置页url
			historyArr.length > 0 && (_data.preurl = historyArr[historyArr.length - 1]);// 单页面的时候
			if (/00|01|page/.test(opts.action)) {			   // PV类型
				_data.curUrl 	= opts.url || ''; 			   // 当前页url
				_data.preSiCode 	= util.getSiteCode(_data.curUrl); // 前置页站点编码
				_data.prePaCode 	= util.getPageCode(_data.curUrl); // 前置页页面编码
				_data.preMoCode = util.getPosCode(_data.curUrl);; // 前置页模块编码
				historyArr.push(_data.curUrl);
			} else {// 非PV类型
				_data.curUrl 	= historyArr[historyArr.length - 1]; 
				_data.preSiCode 	= util.getSiteCode(_data.curUrl); // 前置页站点编码
				_data.prePaCode 	= util.getPageCode(_data.curUrl); // 前置页页面编码
				_data.preMoCode = util.getPosCode(_data.curUrl);; // 前置页模块编码
			}
			
			_data.curUrl 	= encodeURIComponent(_data.curUrl); // 编码链接
			_data.preurl 		= encodeURIComponent(_data.preurl);		// 编码链接
			m.send(_data);
		},
		domain :/changyoyo.com|ppppoints.com/,
		data: ['','','','','',''], //用于存储 spm 6段key值
		attr: {
			base:  'data-spm',
			type:  'data-spm-type',
			page:  'data-spm-page',
			form:  'data-spm-form',
			list:  'data-spm-list',
			item:  'data-spm-item',
			count: 'data-spm-count'
		},
		tmpl: {
			page: '{0}.{1}.{2}.0.0.{5}',    //页面spm值结构
			form: '{0}.{1}.{2}.{3}.0.{5}',  //模块spm值结构
			list: '{0}.{1}.{2}.{3}.0.{5}',  //模块spm值结构
			item: '{0}.{1}.{2}.{3}.{4}.{5}' //内容spm值组成
		},
		selector: {
			link: 'a,area', //用于查找链接内容
			button: '[data-spm]:not(a):not(area)' //用于查找按钮内容:非a,area
		},
		status: 0, // 0未初始化  1页面已初始化
		// 初始化处理
		install: function() {
			var m = this;
			if (!m.status) {
				m.initDebug();
				m.initPage();
				m.bindEvent();
			}
		},
		// 页面body、meta spm值初始化
		initPage: function() {
			var m = this, body, meta, spm_id;
			body = util.get("body");
			meta = util.get('meta[name=' + m.attr.base + ']');
			m.setSiteCode(meta ? meta.getAttribute('content') : '');
			m.setPageCode(body ? body.getAttribute(m.attr.base) : '');
			spm_id = body ? body.getAttribute(m.attr.page) : '';
			if (m.data[0] == '') {
				m.debug("warn", '001', "页面spm初始化失败： 请在页面<meta>中定义站点ID和站点类型");
			} else if (m.data[1] == '') {
				m.debug("warn", '401', "页面spm初始化失败： 请在页面<meta>或<body>中定义站点ID");
			} else if (m.data[2] == '') {
				m.debug("warn", '100', "页面spm初始化失败： 请在页面<body>中定义页面ID");
			} else {
				m.status = 1;
				m.debug("info", '100', "页面初始化， spm = " + spm_id);
			}
		},
		bindEvent: function() {
			var m = this, w = window, d = document, ae, s, e, tm, n, time = 350, dom;
			var st = 0, et = 0, sl = 0, x = 0, y = 0, cx = 0, cy = 0, len = 6;
			n = 'undefined';
			ae = 'addEventListener';
			if (typeof (w.ontouchstart) != n) {
				s = 'touchstart';
				e = 'touchend';
				tm = 'touchmove';
				dom = w;
			} else {
				s = 'mousedown';
				e = 'mouseup';
				tm = 'mousemove';
				dom = d;
			}
			
			dom[ae](s, function(e) {
				st = new Date().getTime();
				if (e.touches && e.touches[0]) {
					x = e.touches[0].pageX;
					y = e.touches[0].pageY;
				}
				m.execute(e, false);
				ismove = false;
			}, false);
			dom[ae](tm, function(e) {
				ismove = true;
			}, false);
			
			dom[ae](e, function(e) {
				et = new Date().getTime();
				if (e.touches && e.touches[0]) {
					cx = e.touches[0].pageX;
					cy = e.touches[0].pageY;
				}
				if (ismove || et - st >= time) {
					return;
				}
				m.execute(e, true);
			}, false);
			
		},
		// 页面点击事件处理
		execute: function(e, isSta) {
			var m = this, ele = e.target, tag, listElm ;
			while (ele && ele.tagName && (tag = ele.tagName.toLowerCase())) {
				listElm = [];
				if (/^(body|html)$/.test(tag)) {
					break;
				}
				util.each(util.getDir(ele, 'parentNode'), function() {
					this.getAttribute(m.attr.base) && listElm.push(this);
				});
				if (listElm.length && (tag == 'a' || tag == 'area')) {
					m.updateModContent(listElm[0]);
				} else if (listElm.length && ele.getAttribute(m.attr.base)) {
					m.updateModContent(listElm[0]);
				} else if (tag == 'form' && ele.getAttribute(m.attr.base)) {
					m.updateModContent(ele);
				} else if (ele.getAttribute(m.attr.base)) {
					m.updateItemContent(ele);
				}
				if (isSta && ele.getAttribute(m.attr.item)) {// 是元素统计
					m.addClickStat(ele);
				}
				ele = ele.parentNode;
			}
		},
		addClickStat: function(ele) {
			var spm_id, spm_action, spm_extend, lastClickTime, thisClickTime;
			spm_id = ele.getAttribute(this.attr.item) || NOSPM;
			spm_action = ele.getAttribute('data-spm-action') || '02';
			spm_extend = ele.getAttribute('data-spm-extend') || '';
			lastClickTime = ele.lastClickTime || 0;
			thisClickTime = new Date().getTime();

			if (spm_id != NOSPM && thisClickTime - lastClickTime > 600) {
				this._trackEvent(spm_id, spm_action, spm_extend);
				ele.lastClickTime = thisClickTime;
			}
		},
		
		_trackPageview: function(url) {// 页面统计
			var m = this, _spm = [];
			if (url && m.getQueryValue(url, SPMKEY)) {
				_spm = m.spmToArr(m.getQueryValue(url, SPMKEY));
			}
			url = url || document.URL;
			try {
				m.sendInfo(_spm, {action : '00', extend : '',	url : url});
				m.debug('info', 208, '添加PV统计成功，spm = ' + url);
			} catch (e) {
				m.debug('warn', 408, '添加PV统计失败，spm = ' + url);
			}
		},
		_trackEvent: function(idPos, action, extend) {// 其他事件统计
			var m = this, _spm = m.spmToArr(idPos);
			if (_spm.length < 4) {
				_spm = m.setModuleCode(idPos);
			}
			try {
				m.sendInfo(_spm, {action : action, extend : extend});
				m.debug('info', 209, '添加点击统计成功，spm = ' + idPos);
			} catch (e) {
				m.debug('warn', 409, '添加点击统计失败，spm = ' + idPos);
			}
		},
		// 批量处理模块下内容spm值
		updateItemContent : function(elem) {
			var m = this, tag, dataSpm;
			var type = ITEM, form = 'form';
			tag = elem.tagName.toLowerCase();
			dataSpm = elem.getAttribute(m.attr.base);
			if (!dataSpm) return;
			tag == form && (type = form);
			m.setModuleCode(dataSpm, elem, type);
			elem.getAttribute(m.attr[type]);
			m.debug('info', '元素初始化， spm = ' + dataSpm);
		},
		updateModContent: function(elem) {
			var m = this, tag, dataSpm, spm;
			var type = LIST, form = 'form';
			tag = elem.tagName.toLowerCase();
			dataSpm = elem.getAttribute(m.attr.base);
			if (!dataSpm) return;
			m.debug('group', '模块初始化， spm = ' + dataSpm);
			m.debug('time', '初始化耗时');
			
			tag == form && (type = form);
			spm = m.setModuleCode(dataSpm, elem, type);
			m.updateModLinks(elem, spm);
			m.updateModButtons(elem, spm);
			
			m.debug('timeEnd', '初始化耗时');
			m.debug('groupEnd', '模块初始化， spm = ' + dataSpm);
		},
		// 批量处理模块下链接spm值
		updateModLinks: function(elem, spm) {
			var m = this, type, count = 0;
			type = elem.getAttribute(m.attr.type) || 'child';
			elem.removeAttribute(m.attr.type);
			if (type == 'all') {
				util.each(elem.querySelectorAll(this.selector.link), function(i) {
					m.updateLink(this, spm, i + 1);
					count++;
				});
			} else if (type == 'child') {
				util.each(elem.children, function(i) {
					if (/^(a|area)$/.test(this.tagName.toLowerCase())) {
						m.updateLink(this, spm, i + 1);
						count++;
					}
				});
			}
			elem.setAttribute(m.attr.count, count);
			m.debug('info', 203, '共处理 '+ count +' 个链接内容');
		},
		// 批量处理模块下按钮spm值
		updateModButtons: function(elem, spm) {
			var m = this, count = 0;
			util.each(elem.querySelectorAll(m.selector.button), function(index) {
				if (this.getAttribute(m.attr.item)) {
					return;
				}
				m.setElemItem(this, spm, index + 1);
				count++;
			});
			elem.setAttribute(m.attr.count, elem.getAttribute(m.attr.count) + '|' + count);
			m.debug('info', 204, '共处理 ' + count + ' 个按钮内容');
		},
		// 处理指定连接的spm值
		updateLink: function(elem, spm, index) {
			var m = this, linkUrl, currUrl, dataSpm;
			if (elem.getAttribute(m.attr.item)) {
				return false;
			}
			currUrl = document.location.href;
			linkUrl = (elem.getAttribute('href') || '').trim();
			if (!linkUrl || /^(#|javascript).?/i.test(linkUrl) || linkUrl == currUrl) {
				m.debug('info', 403, '链接' + linkUrl + '不用处理');
				return false;
			}
			dataSpm = elem.getAttribute(m.attr.base);
			m.setElemItem(elem, spm, index);
			if (dataSpm == NOSPM) {
				m.debug('info', 403, '链接' + linkUrl + '已设置为不需要spm');
			} else {
				m.debug('info', 403, '链接' + linkUrl + '已设置为不需要spm');
			}
			return true;
		},// 初始化debug
		initDebug: function() {
			this.console = window && window.console || {};
			if (!this.console.log)      this.console.log      = function() {};
			if (!this.console.info)     this.console.info     = function() {};
			if (!this.console.warn)     this.console.warn     = function() {};
			if (!this.console.group)    this.console.group    = function() {};
			if (!this.console.groupEnd) this.console.groupEnd = function() {};
			if (!this.console.time)     this.console.time     = function() {};
			if (!this.console.timeEnd)  this.console.timeEnd  = function() {};
		},// 日志类型：0 站点 1 页面 2 模块 3 链接 4 按钮 5其他， 100 开始 200 完成 400 错误，组合401页面开始
		debug: function(type, id, message) {
			if (!this.debugMode) return;
			this.console[type](message ? id + ' ' + message : id);
		},// 开户debug
		setDebugOn: function(onOff) {
			this.debugMode = onOff;
		},// 设置站点 spm
		setSiteCode : function(code) {
			var m = this;
			code = m.spmToArr(code);
			code.length && (m.data[0] = code.shift());
			code.length && (m.data[1] = code.shift());
		},// 获取站点 spm
		getSiteCode : function() {
			return this.arrToSpm(this.data.slice(0, 2));;
		},// 设置body spm
		setPageCode : function(code) {
			var m = this, spm_id, body = util.get("body");
			code = m.spmToArr(code);
			code.length && (m.data[2] = code.pop());
			code.length && (m.data[1] = code.pop());
			code.length && (m.data[0] = code.pop());
			m.data[5] = m.getPVID();
			spm_id = util.format(m.tmpl.page, m.data);
			body.setAttribute(m.attr.page, spm_id);
			body.removeAttribute(m.attr.base);
		},// 获得body spm
		getPageCode : function() {
			return this.data[2];
		},// 生成模块 spm type:list||form
		setModuleCode : function(code, elem, type) {
			var m = this, spm = m.data.slice(0), spm_id;
			code = m.spmToArr(code);
			if (!code.length) return code;
			code.length && (spm[3] = code.pop());
			code.length && (spm[2] = code.pop());
			code.length && (spm[1] = code.pop());
			code.length && (spm[0] = code.pop());
			if (elem) {
				type = type || ITEM;
				type == ITEM && (spm[4] = '0');
				spm_id = util.format(m.tmpl[type], spm);
				if (type == 'form') {
					elem.appendChild(util.createElem('input', {name : SPMKEY, value : spm_id, type :'hidden'}));
					elem.action ? (elem.action = m.addSpm(elem.action, spm_id)) : '';
				}
				elem.setAttribute(m.attr[type], spm_id);
				elem.removeAttribute(m.attr.base);
			}
			return spm;
		},// 设置元素spm
		setElemItem : function(elem, spmArr, index) {
			var m = this, dataSpm, spm_id, tag = 'a';
			dataSpm = elem.getAttribute(m.attr.base);
			spmArr[4] = dataSpm || index;
			spm_id = util.format(m.tmpl.item, spmArr);
			dataSpm == NOSPM && (spm_id = NOSPM);
			elem.setAttribute(m.attr.item, spm_id);
			elem.removeAttribute(m.attr.base);
			if (elem.tagName.toLowerCase() == tag) {
				elem.setAttribute('href', m.addSpm(elem.getAttribute('href'), spm_id));
			}
		},// 统计方法
		push : function (arr) {
			var m = this, method = arr.shift();
			m[method].apply(m, arr);
		},// 刷新页面
		refresh: function(url, reload) {
			if (typeof url == "boolean") {
				reload = url;
				url = '';
			}
			!url && (url = document.location.href);
			if (url.indexOf(SPMKEY + '=') < 0) {// spm应该放在配置里
				url = this.addSpm(url, this.data);
			}
			if (reload) {
				location.replace(url);
			} else {
				document.location.href = url;
			}
		},// 数组转spm格式
		arrToSpm: function(arr) {
			return (arr || []).join(SPMSIGN);
		},// spm转数组格式
		spmToArr: function(spm) {
			return (spm || '').split(SPMSIGN);
		},// 截取分隔符前部分
		sliceBefore : function(str, a) {
	        return str.indexOf(a) >= 0 ? str.substring(0, str.indexOf(a)) : '';
		},// 截取分隔符后部分
	    sliceAfter : function(str, a) {
			return (str.indexOf(a) >= 0) ? str.substring(str.indexOf(a) + a.length, str.length) : '';
	    },// 获取参数
		getQueryValue : function(url, name) {
			if (!name) {
				name = url;
				url = location.search;
			}
			var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", '');
			var match = url.match(reg);
			return (match && match[2] || '').trim();
		},
		addSpm : function(url, spm) {
			var m = this, hash = '', val;
			val = m.getQueryValue(url, SPMKEY);
			if (val) {
				url = url.replace(val, spm);
			} else {
				hash = m.sliceAfter(url, "#");
				if (hash) {
					hash = '#' + hash;
					url = m.sliceBefore(url, "#");
				}
				url += ((url.indexOf('?') > 0) ? '&' : '?') + SPMKEY + "=" + spm;
			}
			return url + hash;
		},// 获得PVID
		getPVID : function() {
			var m = this, date, pvid, chars, chlen, spm;
			var _t = '_P_U_V_', _t_v, refer;
			_t_v = util.cookie.get(_t);
			if (!_t_v) {
				refer = document.referrer;
				if (m.domain.test(refer)) {
					spm = m.spmToArr(m.getQueryValue(SPMKEY));
					spm = spm[5] || '';
					(spm.length < 6 || !/^[0-9]*$/.test(spm)) && (spm = '');
					spm && (_t_v = spm) && util.cookie.set(_t, _t_v);
				} else {
					// 从APP端获得
				}
				
				if (!spm) {
					date = new Date();
					pvid = '';
					chars = '0123456789';
					chlen = chars.length;
					while (pvid.length < 6) {
						pvid += chars.substr(Math.floor(Math.random() * chlen), 1);
					}
					_t_v = pvid + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours();
					util.cookie.set(_t, _t_v);
				}
			}
			return _t_v;
		}
	};
	return spmObj;
}));

