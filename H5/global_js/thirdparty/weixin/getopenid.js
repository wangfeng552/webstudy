var getWeixinOpenId = function(callback) {
	var openId = sessionStorage.getItem('weixin.openid') || '';
	//需要重定向的页面
	//wx8226a225de914a2f
	//alert(appid);
	// 判断不在微信中，直接返回null作为openId值
	if (!navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
		return 'null';
	}
	if (openId == '') {
		sessionStorage.setItem('weixin.returl', location.href);
		setTimeout(function(){
			var iObj = $("#iframeWx");
			if(iObj.length == 0) {
				window.setWeixinOpenId = function(openId) {
					callback(openId);
					$('#iframeWx').remove();
				};
				$("body").prepend('<iframe id="iframeWx" src="../../static/js/thirdparty/weixin/getopenid.html?type=iframe" style="display:none" ></iframe>');
			}
		},200);
	} else {
		return openId;
	}
};



