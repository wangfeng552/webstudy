// 数组操作
export var arrayUtil = {
  clearRepetition: function (arr) {
    var result = []
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        result.push(arr[i])
        obj[arr[i]] = 1
      }
    }
    return result
  }
}

// 字符串操作
export var stringUtil = {
  comma: function (str, length) {
    if (!length || length < 1) length = 3
    var source = ("" + str).split(".")
    source[0] = source[0].replace(
      new RegExp("(\\d)(?=(\\d{" + length + "})+$)", "ig"),
      "$1,"
    )
    return source.join(".")
  },
  params: function (obj) {
    var params = []
    for (var item in obj) {
      params.push(item + "=" + obj[item])
    }
    return params.join("&")
  },
  getQueryValue: function (str, name) {
    if (!name) {
      name = str
      str = location.href + ""
    }
    var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "")
    var match = str.match(reg)
    return ((match && match[2]) || "").trim().split("#")[0]
  },
  getQueryJSON: function (str) {
    str = str || location.search
    if (str.indexOf("?") < 0) return {}
    var query = str.substr(str.indexOf("?") + 1)
    var params = query.split("&")
    var len = params.length
    var result = {}
    var key
    var value
    var item
    var param
    for (var i = 0; i < len; i++) {
      param = params[i].split("=")
      key = param[0]
      value = param[1]
      item = result[key]
      if (typeof item === "undefined") {
        result[key] = value
      } else if (Object.prototype.toString.call(item) == "[object Array]") {
        item.push(value)
      } else {
        result[key] = [item, value]
      }
    }
    return result
  },
  addQueryValue: function (url, name, value) {
    var m = this
    var _hash = ""
    var _val
    var a = "#"
    value = value || ""
    _val = m.getQueryValue(url, name)
    if (_val) {
      url = url.replace(name + "=" + _val, name + "=" + value)
    } else {
      if (url.indexOf(a) != -1) {
        _hash = a + url.slice(url.indexOf(a) + 1)
        url = url.substring(0, url.indexOf(a))
      }
      url += (url.indexOf("?") > -1 ? "&" : "?") + name + "=" + value
    }
    return url + _hash
  }
}

// 浏览器判断
export var browserUtil = function () {
  var u = navigator.userAgent
  return {
    bigerIos: u.indexOf("--biger.in--ios") > -1, // iosApp
    bigerAndroid: u.indexOf("--biger.in--android") > -1, // 安卓App
    mobile: u.indexOf("Mobile") > -1, // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // android终端
    iPhone: u.indexOf("iPhone") > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, // 是否iPad
    webApp: u.indexOf("Safari") == -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf("MicroMessenger") > -1 // 是否微信
  }
}

// 数字转大写 moneyToCapital(102562)
export var moneyToCapital = function (num) {
  var fuhao = "";
  var text = num + "";
  if (text.indexOf("-") > -1) {
    num = text.replace("-", "");
    fuhao = "负"
  }
  var money1 = new Number(num);
  var monee = Math.round(money1 * 100).toString(10);
  var leng = monee.length;
  var monval = "";
  for (let i = 0; i < leng; i++) {
    monval = monval + to_upper(monee.charAt(i)) + to_mon(leng - i - 1)
  }
  return fuhao + repace_acc(monval)
}
// 将数字转为大写的中文字
function to_upper(a) {
  switch (a) {
    case "0":
      return "零";
      break;
    case "1":
      return "壹";
      break;
    case "2":
      return "贰";
      break;
    case "3":
      return "叁";
      break;
    case "4":
      return "肆";
      break;
    case "5":
      return "伍";
      break;
    case "6":
      return "陆";
      break;
    case "7":
      return "柒";
      break;
    case "8":
      return "捌";
      break;
    case "9":
      return "玖";
      break;
    default:
      return ""
  }
}
function to_mon(a) {
  if (a > 10) {
    a = a - 8;
    return (to_mon(a))
  }
  switch (a) {
    case 0:
      return "分";
      break;
    case 1:
      return "角";
      break;
    case 2:
      return "元";
      break;
    case 3:
      return "拾";
      break;
    case 4:
      return "佰";
      break;
    case 5:
      return "仟";
      break;
    case 6:
      return "万";
      break;
    case 7:
      return "拾";
      break;
    case 8:
      return "佰";
      break;
    case 9:
      return "仟";
      break;
    case 10:
      return "亿";
      break
  }
}
function repace_acc(Money) {
  Money = Money.replace("零分", "");
  Money = Money.replace("零角", "零");
  var yy;
  var outmoney;
  outmoney = Money;
  yy = 0;
  while (true) {
    var lett = outmoney.length;
    outmoney = outmoney.replace("零元", "元");
    outmoney = outmoney.replace("零万", "万");
    outmoney = outmoney.replace("零亿", "亿");
    outmoney = outmoney.replace("零仟", "零");
    outmoney = outmoney.replace("零佰", "零");
    outmoney = outmoney.replace("零零", "零");
    outmoney = outmoney.replace("零拾", "零");
    outmoney = outmoney.replace("亿万", "亿零");
    outmoney = outmoney.replace("万仟", "万零");
    outmoney = outmoney.replace("仟佰", "仟零");
    yy = outmoney.length;
    if (yy == lett) {
      break
    }
  }
  yy = outmoney.length;
  if (outmoney.charAt(yy - 1) == "零") {
    outmoney = outmoney.substring(0, yy - 1)
  }
  yy = outmoney.length;
  if (outmoney.charAt(yy - 1) == "元") {
    outmoney = outmoney + "整"
  }
  return outmoney
}

// 日期格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length)
}

// 商品金额转换 
export function currency(v, c, d) {
  v = parseFloat(v)
  if (!isFinite(v) || (!v && v !== 0)) return ""
  c = c != null ? c : "￥"
  d = d != null ? d : 2
  var digitsRE = /(\d{3})(?=\d)/g // \d =[0~9],{3}匹配3次，
  var stringified = Math.abs(v).toFixed(d) // 保留2位小数
  var _int = d ? stringified.slice(0, -1 - d) : stringified // 取整
  var i = _int.length % 3 // =>1
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "" // 2,
  var _float = d ? stringified.slice(-1 - d) : "" // .20
  var sign = v < 0 ? "-" : ""
  return sign + c + head + _int.slice(i).replace(digitsRE, "$1,") + _float
}