var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data|3": [{
		"picName": "@cword(2, 2)",
		"picture": Random.image('100x100', '#ccc', 'hello world'),
		"picLink|1":"#",
		"picOrder":"@cword(2, 2)",
		"picStatus|1":"true",
		"sliderNumber|+1":1,
		"goodsId|1-100": 1
		
	}]
});
module.exports = {
	result: '000000',
	message: '成功',
	data: data.data
};
