/*
 * REM布局和浏览器判断
 * Webview初始化
 */
(function() {

	// REM布局处理
	var docElm = document.documentElement;
	var pageWidth = docElm.getAttribute('data-pagewidth') || 750;
	var baseFont = 16;
	var adjustEvent = function() {
		if (docElm.clientWidth) {
			docElm.style.fontSize = 100 * (docElm.clientWidth / pageWidth) * 16 / baseFont +'px';
		}
	};
	try {
		baseFont = window.getComputedStyle(docElm,null).fontSize.replace('px','') || 16;
	} catch(e) {}
	//
	window.addEventListener(('orientationchange' in window ? 'orientationchange': 'resize'), adjustEvent, false);
	document.addEventListener('DOMContentLoaded', adjustEvent, false);
	docElm.classList.add('webview-rem');
	adjustEvent();

	// 浏览器判断
	window.browserUtil = (function() {
		var channel = sessionStorage.getItem('debug.browser') || '';
		var ua = navigator.userAgent.toLowerCase();
		var weixin = !!ua.match(/micromessenger/i);
		var jfmore = ua.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i), appver = (jfmore && jfmore[2].trim()) || '';
		var obj = {
			ios: !!ua.match(/ios/i),
			android: !!ua.match(/android/i),
			weixin: weixin || (channel == 'weixin'),
			jfmore: appver || ((channel == 'jfmore') ? '0.0.0': ''),
			dev: !!location.hostname.match(/dev/),
			beta: !!location.hostname.match(/stg/),
			uat: !!location.hostname.match(/uat/),
			prd: !location.hostname.match(/dev|stg|uat/)
		};
		return obj;
	})();
	// 微信视图判断
	if (browserUtil.weixin) {
		docElm.classList.add('webview-wx');
	} else if (browserUtil.jfmore) {
		docElm.classList.add('webview-app');
	}
	if (browserUtil.ios) {
		docElm.classList.add('webview-ios');
	} else if (browserUtil.android) {
		docElm.classList.add('webview-android');
	}

})();