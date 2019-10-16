var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	"data":{
		"allGoods|0-100":0,
		"carts|4": [{
			"shopName": "@cword(4, 4)",
	        "selectTime": /\d{13}/,
	        "payMoney|1-200.1-2": 1,
	        "points|1-100": 1,
	        "merid": /S\d{7}/,
	        "goods|3": [
	            {
	                "goodsPic": Random.image('116x116', Random.hex()),
	                "goodsTitle": "@cword(10, 12)",
	                "payType|1": ["cust","money"],
	                "storeCount": 100,
	                "outCount|1-100": 1,
	                "createTime": /\d{13}/,
	                "price|+1": 1,
	                "points|+1": 1,
	                "productid|1": /\d{8}\-[A-Z]\d{7}/,
	                "merid": /[A-Z]\d{7}/,
	                "goodsid": /\d{8}/,
	                "status|1": ['01', '02', '03', '04', '05'],
	                "purchasenum": 60
	            }
	        ]
		}]
	}
});
module.exports = {
	result: '000000',
	message: '成功',
	data: data.data
};
