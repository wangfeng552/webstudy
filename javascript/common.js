/**
 * Created by wangfeng on 22/1/26.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 * parseTime(1642190107628,'{y}-{m}-{d} {h}:{i}:{s}')
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
  let date
  if (typeof time === "object") {
    date = time
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/")
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value]
    }
    return value.toString().padStart(2, "0")
  })
  return time_str
}

/**
 * 多久之前
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return "刚刚"
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前"
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前"
  } else if (diff < 3600 * 24 * 2) {
    return "1天前"
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    )
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 *
 * @param {number} v
 * @param {string} c
 * @param {number} d
 * @returns
 * currency(10000000,'$',2) => '$10,000,000.00'
 */
export function currency(v, c, d) {
  v = parseFloat(v)
  if (!isFinite(v) || (!v && v !== 0)) return ""
  c = c != null ? c : "￥"
  d = d != null ? d : 2
  var digitsRE = /(\d{3})(?=\d)/g //\d =[0~9],{3}匹配3次，
  var stringified = Math.abs(v).toFixed(d) //保留2位小数
  var _int = d ? stringified.slice(0, -1 - d) : stringified //取整
  var i = _int.length % 3 //=>1
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "" //2,
  var _float = d ? stringified.slice(-1 - d) : "" //.20
  var sign = v < 0 ? "-" : ""
  return sign + c + head + _int.slice(i).replace(digitsRE, "$1,") + _float
}

//bite转mb
export function byteConversion(v) {
  return (v / (1024 * 1024)).toFixed(2) + " Mb"
}

/**
 * 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function clearRepetition(arr) {
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

/**
 * @param {string} url
 * @returns {Object}
 * urlToObj('http://www.baidu.com?name=123&age=1')
 * =>{name: '123', age: '1'}
 *
 */
export function urlToObj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ")
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split("&")
  searchArr.forEach((v) => {
    const index = v.indexOf("=")
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 字符串操作
export var stringUtil = {
  // 对象转url
  params: function (obj) {
    var params = []
    for (var item in obj) {
      params.push(item + "=" + obj[item])
    }
    return params.join("&")
  },
  //   获取url参数的值
  getQueryValue: function (str, name) {
    if (!name) {
      name = str
      str = location.href + ""
    }
    var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&]*)(&|\x24)", "")
    var match = str.match(reg)
    return ((match && match[2]) || "").trim().split("#")[0]
  },
  //   str转Object
  getQueryJSON: function (str) {
    str = str || location.search
    if (str.indexOf("?") < 0) return {}
    var query = str.substr(str.indexOf("?") + 1),
      params = query.split("&"),
      len = params.length,
      result = {},
      key,
      value,
      item,
      param
    for (var i = 0; i < len; i++) {
      param = params[i].split("=")
      key = param[0]
      value = param[1]
      item = result[key]
      if ("undefined" == typeof item) {
        result[key] = value
      } else if (Object.prototype.toString.call(item) == "[object Array]") {
        item.push(value)
      } else {
        result[key] = [item, value]
      }
    }
    return result
  },
  //   addQueryValue('http://www.m.com','key','1234')
  //  => 'http://www.m.com?key=1234'
  addQueryValue: function (url, name, value) {
    var m = this,
      _hash = "",
      _val,
      a = "#"
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
  },
}

// 返回数据类型
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
      '[object Boolean]'  : 'boolean',
      '[object Number]'   : 'number',
      '[object String]'   : 'string',
      '[object Function]' : 'function',
      '[object Array]'    : 'array',
      '[object Date]'     : 'date',
      '[object RegExp]'   : 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]'     : 'null',
      '[object Object]'   : 'object'
  };
  return map[toString.call(obj)];
}

// deepCopy
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
      o = [];
  } else if ( t === 'object') {
      o = {};
  } else {
      return data;
  }

  if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
          o.push(deepCopy(data[i]));
      }
  } else if ( t === 'object') {
      for (let i in data) {
          o[i] = deepCopy(data[i]);
      }
  }
  return o;
}
