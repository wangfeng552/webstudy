import VeeValidate, { Validator } from 'vee-validate';
//手机号码判断规则
Validator.extend('phone_number', {
  messages: {
    en:field => field
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

//密码判断规则
Validator.extend('password', {
  messages: {
    zh_CN: field => field,
  },
  validate: value => {
    return /^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value)
  }
});

//重复密码
Validator.extend('password_confirmation', {
  messages: {
    zh_CN: field => '必须由6-20位字母，数字和符号两种以上组合',
  },
  validate: value => {
    return /^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test(value)
  }
});

//区号
Validator.extend('prefix', {
  messages: {
    zh_CN: field => '固定电话号码格式不正确',
  },
  validate: value => {
    return /^[\d\-]+$/.test(value)
  }
});

//电话
Validator.extend('number', {
  messages: {
    zh_CN: field => '区号或电话号码格式不正确',
  },
  validate: value => {
    return /^\d{7,8}$/.test(value)
  }
});

//邀请人编号
Validator.extend('invitor_id', {
  messages: {
    zh_CN: field => '请输入正确的邀请人编号',
  },
  validate: value => {
    return /^[a-zA-Z0-9]{0,10}$/.test(value)
  }
});

//账号配判断规则
Validator.extend('account', {
  messages: {
    en:field => field
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

//姓名
Validator.extend('name', {
  messages: {
    en:field => field
  },
  validate: value => {
    return /^[\u4e00-\u9fa5a-zA-Z\-]{2,20}$/.test(value)
  }
});

//职位
Validator.extend('position', {
  messages: {
    en:field => field
  },
  validate: value => {
    return /^[\u4e00-\u9fa5a-zA-Z\-]{2,20}$/.test(value)
  }
});
