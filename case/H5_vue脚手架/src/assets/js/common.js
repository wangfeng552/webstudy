//数组去重
/**
 *
 * @param {Array} arr
 * @returns Array
 */
export function clearRepetition(arr) {
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

// 字符串操作
export var stringUtil = {
  comma: function (str, length) {
    if (!length || length < 1) length = 3;
    var source = ("" + str).split(".");
    source[0] = source[0].replace(
      new RegExp("(\\d)(?=(\\d{" + length + "})+$)", "ig"),
      "$1,"
    );
    return source.join(".");
  },
  params: function (obj) {
    var params = [];
    for (var item in obj) {
      params.push(item + "=" + obj[item]);
    }
    return params.join("&");
  },
  getQueryValue: function (str, name) {
    if (!name) {
      name = str;
      str = location.href + "";
    }
    var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "");
    var match = str.match(reg);
    return ((match && match[2]) || "").trim().split("#")[0];
  },
  getQueryJSON: function (str) {
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
  addQueryValue: function (url, name, value) {
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
  },
};

// 浏览器判断
export var browserUtil = function () {
  var u = navigator.userAgent;
  return {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: u.indexOf("Mobile") > -1, //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端
    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf("MicroMessenger") > -1, //是否微信
    qq: u.indexOf("QQBrowser") > -1, //是否QQ浏览器
    mobile_qq: u.indexOf("MQQBrowser") > -1, //是否是手机QQ浏览器
    uc: u.indexOf("UCBrowser") > -1, //是否是uc浏览器
    baidu: u.indexOf("Baidu") > -1, //是否是百度浏览器
    firefox: u.indexOf("Firefox") > -1, //是否是火狐浏览器
    lieBao: u.indexOf("LieBao") > -1, //是否是猎豹浏览器
    sogou: u.indexOf("SogouMobile") > -1, //是否是搜狗手机浏览器
    bjhb: u.indexOf("BJQD") > -1,
  };
};

//app交互
export var jsBridge = (function () {
  function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function () {
          callback(WebViewJavascriptBridge);
        },
        false
      );
    }
  }

  return {
    init: function (fn) {
      connectWebViewJavascriptBridge(function (WebViewJavascriptBridge) {
        WebViewJavascriptBridge.init(function (message, responseCallback) {});
        fn();
      });
    },
    getSid: function (callback) {
      WebViewJavascriptBridge.callHandler("getSid", {}, function (response) {
        callback(response);
      });
    },
    close: function () {
      WebViewJavascriptBridge.callHandler("close", {}, function (response) {});
    },
    showAppPage: function (obj) {
      WebViewJavascriptBridge.callHandler(
        "showAppPage",
        { pageID: obj.pageID },
        function (response) {}
      );
    },
    showWebPage: function (obj) {
      WebViewJavascriptBridge.callHandler(
        "showWebPage",
        { title: obj.title, pageUrl: obj.pageUrl },
        function (response) {}
      );
    },
    callClipboard: function (obj) {
      WebViewJavascriptBridge.callHandler(
        "callClipboard",
        { data: obj.data },
        function (response) {}
      );
    },
    phoneCall: function (obj) {
      WebViewJavascriptBridge.callHandler(
        "phoneCall",
        { phone: obj.phone },
        function (response) {}
      );
    },
    getSysInfo: function (obj) {
      WebViewJavascriptBridge.callHandler(
        "getSysInfo",
        {},
        function (response) {
          // response { clientType 手机类型  systemVersion 系统版本  appVersion APP版本}
          if (response) {
            obj.done(dataUtil.stringToJson(response));
          } else {
            obj.error();
          }
        }
      );
    },
  };
})();
