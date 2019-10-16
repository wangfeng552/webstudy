var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data|4": [{
		"order_num|43431223-93431223": 43431223,
		"order_time": "2016-10-29",
		"count|+1": 3,
		"price|1-100": 100,
		"status|1-10": 1,
		"productImages|3-4": [{
			"product_id|+1": 1,
			"image_name": Random.image('150x150', Random.hex())
		}]
	}]
});
module.exports = {
	result: '000000',
	message: '成功',
	data: data.data
};