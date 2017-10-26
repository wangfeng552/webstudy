function wxshare(){
	//alert(type);
	//路径 判断
	var h = location.href;
	var index = h.indexOf("#");
	if(index && index > 0) {
		h = h.substring(0,h);
	}
	ajaxUtil.loadData({
		type:"get",
		url:location.origin+'/pointgate/wechat/jsapi/auth.htm',
		params:{
			"authUrl":h
		},
		onSuccess:function(data){
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: data.appId, // 必填，公众号的唯一标识
			    timestamp: data.timestamp, // 必填，生成签名的时间戳
			    nonceStr: data.nonceStr, // 必填，生成签名的随机串
			    signature: data.signature,// 必填，签名，见附录1
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
			
			wx.error(function(){
			});
			
		},
		onError:function(e){
		}
	})
}
