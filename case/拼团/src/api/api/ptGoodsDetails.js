var Mock =require("mockjs");
var data = Mock.mock({
	"data":{
		ptGoodsDetails:{
			itemPopPic:"http://m.changyoyo.com/uploadimage/9b28d3c93e4fb2ffc5f4a67f75cc4ff4.jpg",
			itemName:"啦啦啦啦阿拉啦",
			collagePrice:1,
			personNum:10,
			labelRemark:"新拼团用户帮拼立减10元",
			collageType:0,
			discountPrice:1000,
			description:"testeste",
			itemPrice:200,
			itemType:1
			
		},
	gdsCollageTeamNum:"5",
	"gdsCollageTeamList|3":[{
		"teamCode|1-100":100,
		"userPosition|1":["上海","深圳"],
		"userName":"test",
		"mobileNo":123123,
		"personNum":10,
		"teamPersonNum|1-10":10,
		"teamEndTime":20191919
	}]
	}
})

module.exports = {
  respCode: '0000',
  respMsg: 'SUCCESS',
  data: data.data
};