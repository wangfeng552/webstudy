var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data|10": [{
		"label": "@cword(2, 4)",
		"id|+1": 0
		}]	
});
module.exports = {
	result: '000000',
	message: '成功',
	data: data.data
};