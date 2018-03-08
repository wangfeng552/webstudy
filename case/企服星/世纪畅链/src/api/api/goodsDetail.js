var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data": {
		"slider|5": [{
			"picName": "@cword(2, 2)",
			"picture": Random.image('375x300', Random.hex()),
			"picLink|1":"#",
			"picOrder":"@cword(2, 2)",
			"picStatus|1":"true",
			"sliderNumber|+1":1,
			"sliderName":"@cword(2,2)"
		}],
		"spec":"",
		"goodsId":Random.character(),
		"merId":Random.character(),
		"brandId":Random.character(),
		"productId":Random.character(),
		"picture1":Random.image('375x450', Random.hex()),
		"picture2":Random.image('375x450', Random.hex()),
		"picture3":Random.image('375x450', Random.hex()),
		"picture4":Random.image('375x450', Random.hex()),
		"amount":Random.character('number'),
		"price":Random.character('number'),
		"payType":"comb",
		"points":Random.character('number'),
		"stoodel":"",
		"goodsName":"JBL蓝牙耳机J303BT",
		"goodsTitle": "Iphone 32G 金色 移动联通手机",
		"goodsType":"0",
		"status": "00",
		"storeCount": Random.character('number'),
		"delivery": "免运费",
		"purchasenum" : "5"
	}
});
module.exports = {
	result: '000000',
	message: '成功',
	data: data.data
};