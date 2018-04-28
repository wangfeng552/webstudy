var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data|26": [{
    "firstWord|+1": ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    "cities|3-6":[{
      "cityName":Random.city(),
      "cityId|100-200":1
    }]
  }]
});
module.exports = {
  respCode: '0000',
  respMsg: 'SUCCESS',
  data: data.data
};