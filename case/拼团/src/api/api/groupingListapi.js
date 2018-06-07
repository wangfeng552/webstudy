var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data": {
    "gdsCollageTeamList|6":[{
      "teamCode|+1":123456,
      "userPosition": Random.city(),
      "userName": Random.first(),
      "mobileNo":/^1\d{10}$/,
      "personNum|+1":10,
      "teamPersonNum|+1":2,
      "teamEndTime|+3000":1526572320000
    }]
  }
});
module.exports = {
  respCode: '0000',
  respMsg: 'SUCCESS',
  data: data.data
};