var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data": {
    "list|6":[{
      "sceneryID|1000-9999": 1111,
      "sceneryName": Random.cparagraph(1, 3),
      "sceneryGrade|+1": 3,
      "sceneryImgPath": Random.url(),
      "sceneryPrice|60-100": 1,
      "scenerySummary": Random.cparagraph(1, 3)
    }],
		"TotalCount":32
  }
});
module.exports = {
	respCode: '0000',
	respMsg: 'SUCCESS',
	data: data.data
};