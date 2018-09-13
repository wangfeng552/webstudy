import { getJsapiSignature } from "@/api/http";
//数组操作
export var arrayUtil = {
  clearRepetition: function(arr) {
    var result = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        result.push(arr[i]);
        obj[arr[i]] = 1;
      }
    }
    return result;
  }
};

// 字符串操作
export var stringUtil = {
  comma: function(str, length) {
    if (!length || length < 1) length = 3;
    var source = ("" + str).split(".");
    source[0] = source[0].replace(
      new RegExp("(\\d)(?=(\\d{" + length + "})+$)", "ig"),
      "$1,"
    );
    return source.join(".");
  },
  params: function(obj) {
    var params = [];
    for (var item in obj) {
      params.push(item + "=" + obj[item]);
    }
    return params.join("&");
  },
  getQueryValue: function(str, name) {
    if (!name) {
      name = str;
      str = location.href + "";
    }
    var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
    var match = str.match(reg);
    return ((match && match[2]) || "").trim().split("#")[0];
  },
  getQueryJSON: function(str) {
    str = str || location.search;
    if (str.indexOf("?") < 0) return {};
    var query = str.substr(str.indexOf("?") + 1),
      params = query.split("&"),
      len = params.length,
      result = {},
      key,
      value,
      item,
      param;
    for (var i = 0; i < len; i++) {
      param = params[i].split("=");
      key = param[0];
      value = param[1];
      item = result[key];
      if ("undefined" == typeof item) {
        result[key] = value;
      } else if (Object.prototype.toString.call(item) == "[object Array]") {
        item.push(value);
      } else {
        result[key] = [item, value];
      }
    }
    return result;
  },
  addQueryValue: function(url, name, value) {
    var m = this,
      _hash = "",
      _val,
      a = "#";
    value = value || "";
    _val = m.getQueryValue(url, name);
    if (_val) {
      url = url.replace(name + "=" + _val, name + "=" + value);
    } else {
      if (url.indexOf(a) != -1) {
        _hash = a + url.slice(url.indexOf(a) + 1);
        url = url.substring(0, url.indexOf(a));
      }
      url += (url.indexOf("?") > -1 ? "&" : "?") + name + "=" + value;
    }
    return url + _hash;
  }
};

// 浏览器判断
export var browserUtil = function() {
  var u = navigator.userAgent;
  return {
    bigerIos: u.indexOf("--biger.in--ios") > -1, //iosApp
    bigerAndroid: u.indexOf("--biger.in--android") > -1, //安卓App
    mobile: u.indexOf("Mobile") > -1, //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端
    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf("MicroMessenger") > -1 //是否微信
  };
};

//app交互
export var jsBridge = (function() {
  function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function() {
          callback(WebViewJavascriptBridge);
        },
        false
      );
    }
  }

  return {
    init: function(fn) {
      connectWebViewJavascriptBridge(function(WebViewJavascriptBridge) {
        WebViewJavascriptBridge.init(function(message, responseCallback) {});
        fn();
      });
    },
    getSid: function(callback) {
      WebViewJavascriptBridge.callHandler("getSid", {}, function(response) {
        callback(response);
      });
    },
    close: function() {
      WebViewJavascriptBridge.callHandler("close", {}, function(response) {});
    },
    recharge: function() {
      WebViewJavascriptBridge.callHandler("recharge", {}, function(
        response
      ) {});
    },
    share: function(obj) {
      WebViewJavascriptBridge.callHandler("share", obj, function(response) {});
      return false;
    }
  };
})();

//分享
export let Share = {
  Weixin() {
    //微信分享
    let h = location.href;
    let index = h.indexOf("#");
    if (index && index > 0) {
      h = h.substring(0, index);
    }
    var data = { url: h };
    getJsapiSignature(data).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: window._shareData.title.othTitle, // 分享标题
          link: window._shareData.shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window._shareData.imageurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function(e) {
            // 用户取消分享后执行的回调函数
            // alert("朋友圈："+e.toString())
          }
        });

        wx.onMenuShareAppMessage({
          title: window._shareData.title.othTitle, // 分享标题
          desc: window._shareData.content, // 分享描述
          link: window._shareData.shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window._shareData.imageurl, // 分享图标
          type: "", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {},
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareQQ({
          title: window._shareData.title.othTitle, // 分享标题
          desc: window._shareData.content, // 分享描述
          link: window._shareData.shareurl, // 分享链接
          imgUrl: window._shareData.imageurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareWeibo({
          title: window._shareData.title.othTitle, // 分享标题
          desc: window._shareData.content, // 分享描述
          link: window._shareData.shareurl, // 分享链接
          imgUrl: window._shareData.imageurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
        wx.onMenuShareQZone({
          title: window._shareData.title.othTitle, // 分享标题
          desc: window._shareData.content, // 分享描述
          link: window._shareData.shareurl, // 分享链接
          imgUrl: window._shareData.imageurl, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });

      wx.error(function() {});
    });
  },
  Ios(action, params, callback) {
    //ios 分享
    window.WebViewJavascriptBridge.callHandler(
      "share",
      {
        action: action,
        params: params
      },
      function(response) {
        callback && callback(response);
      }
    );
  },
  Android(host, action, data, callback) {
    //安卓分享
    //exam native://{host}?action={action}[&data={data}][&callback={callback}]
    /* var url = "native://" + host + "?action=" + action;
    if (data) {
      url += "&data=" + encodeURIComponent(JSON.stringify(data));
    }
    if (callback) {
      url += "&callback=" + callback;
    }
    this.loadUrl(url);*/
    document.addEventListener("DOMContentLoaded", function() {
      var a = document.createElement("a");
      a.setAttribute("href", "js://?event=appShare");
      document.body.appendChild(a);
      a.click();
    });
  }
};
