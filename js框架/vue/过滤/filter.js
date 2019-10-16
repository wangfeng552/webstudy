export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function currency(v,c,d) {
  v=parseFloat(v);
  if (!isFinite(v) || !v && v !== 0) return '';
  c = c != null ? c : '￥';
  d = d != null ? d : 2;
  var digitsRE = /(\d{3})(?=\d)/g;  //\d =[0~9],{3}匹配3次，
  var stringified = Math.abs(v).toFixed(d);//保留2位小数
  var _int = d ? stringified.slice(0, -1 - d) : stringified;//取整
  var i = _int.length % 3; //=>1
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''; //2,
  var _float = d ? stringified.slice(-1 - d) : ''; //.20
  var sign = v < 0 ? '-' : '';
  return sign + c + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
}
