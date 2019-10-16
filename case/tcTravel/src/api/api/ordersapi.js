var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data": {
    "totalCounts":32,
    "list|6": [{
      "status|+1": ['A', 'B', 'N', 'I', 'F', 'J'],
      "orderId|11111-88888": 1,
      "paySeq|222222-999999": 1,
      "tcSerialId|1-100": 1,
      "sceneryName": Random.cparagraph(1, 3),
      "travelDate": Random.date('yyyy-MM-dd'),
      "priceID|+1": 100,
      "ticketsNum|1-10": 1,
      "tcAmount|50-300": 1,
      "sceneryScreeningInfo": {
        "screeningId|111-999": 1,
        "beginTime": Random.date('yyyy-MM-dd'),
        "endTime": Random.date('yyyy-MM-dd')
      },
      "travelerInfo": {
        "travelerName": Random.cname(),
        "travelerMobile|11111111111-19999999999": 1,
        "travelerCerType": '6050201',
        "travelerIdCardNo": '3224188909229876'

      },
      "amount|50-300": 1
    }]
  }
});
module.exports = {
  respCode: '0000',
  respMsg: 'SUCCESS',
  data: data.data
};