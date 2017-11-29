(function() {
	_fmOpt = {
		partner: 'changyou',
		appName: 'changyou_web',
		token: 'changyou' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2)
	};
	var cimg = new Image(1, 1);
	cimg.onload = function() {
		_fmOpt.imgLoaded = true;
	};
	cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=changyou&appName=changyou_web&tokenId=" + _fmOpt.token;
	if (!/changyoyo\.com/.test(document.domain)) {
		_fmOpt.fpHost = 'https://fptest.fraudmetrix.cn';
		_fmOpt.staticHost = 'statictest.fraudmetrix.cn';
		_fmOpt.tcpHost = 'fpflashtest.fraudmetrix.cn';
		_fmOpt.wsHost = 'fptest.fraudmetrix.cn:9090';
		cimg.src = "https://fptest.fraudmetrix.cn/fp/clear.png?partnerCode=changyou&appName=changyou_web&tokenId=" + _fmOpt.token;
	};
	var fm = document.createElement('script');
	fm.type = 'text/javascript';
	fm.async = true;
	fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(fm, s);
	window._fmOpt = _fmOpt;
})();