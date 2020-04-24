const phoneRegex = /^1[34578]\d{9}$/;
// const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{6,20}$/;
const passwordRegex = /^[0-9a-zA-Z]{6,20}$/;

export function isEmpty(text) {
  // 校验全为空字符串
  // trim() 该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）。
  // '\r\nabc \t'.trim() // 'abc'
  if (text && text.trim() !== '') {
    return false;
  }
  return true;
}

export function isPhone(phone) {
  let is = false;
  if (phone && phone.length === 11) {
    const reg = new RegExp(phoneRegex);
    is = reg.test(phone);
  }
  return is;
}

export function isAuthCode(code) {
  if (code && code.length === 6) {
    return true;
  }
  return false;
}

export function indexOf(string) {
  if (!string || string.length === 0) {
    return '';
  }
  return string[0];
}

// 检验密码是否符合要求
export function isPassword(password) {
  let is = false;
  if (password) {
    const reg = new RegExp(passwordRegex);
    is = reg.test(password);
  }
  return is;
}
