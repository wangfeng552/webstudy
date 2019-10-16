var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data": {
    "ptRealInitiateRecords|5":[{
      "userPosition": Random.province() + Random.city() + Random.county(),
      "userName": Random.first(),
      "createTime": Random.now('yyyy-MM-dd HH:mm:ss'),
      "itemName": Random.ctitle(5, 10),
      "teamCode|+1":123456
    }],
    "ptHotPinTeamList|8":[
      {
      "teamCode|+1":123456,
      "itemImg":Random.image(),
      "itemName":Random.ctitle(10, 26),
      "collagePrice|+1":1000,
      "personNum|+1":10,
      "teamPersonNum|+1":3
      }
    ],
    "ptGoodsList|6":[
      {
        "collageId":Random.id(),
        "itemImg":Random.image(),
        "itemName":Random.ctitle(10, 26),
        "collagePrice|+10":1000,
        "personNum|+1":3,
        "collageType|1":[0,1],
        "discountPrice|+1":1000
      }
    ]
  }
});
module.exports = {
  respCode: '0000',
  respMsg: 'SUCCESS',
  data: data.data
};