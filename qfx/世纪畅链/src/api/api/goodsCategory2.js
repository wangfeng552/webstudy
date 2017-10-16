var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data": {
		"picture": Random.image('200x100', Random.hex()),
		"category|4": [{
			"categoryName": "@cword(4, 4)",
			"categoryId|+1": 0,
			"item|8": [{
				"categoryId|+1":1, 
				"order|+1": 0,
				"name": "@cword(2, 2)",
				"icon": Random.image('50x50', Random.hex())
			}]	
		}]
	}
});
module.exports = {
	result: '000000',
	message: '成功',
	data: data.data
};