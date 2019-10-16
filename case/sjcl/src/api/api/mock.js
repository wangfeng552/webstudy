var Mock =require('mockjs')
var Random = Mock.Random;// 随机数
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'data|5': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|1-9.1-10': 1,
    'isTrue|5-2':Boolean,
    'name|2':Random.name(),
    'age':Random.cparagraph(1, 3)
  }]
})

module.exports = {
  data:data.data,
  respCode: '0000',
  respMsg: 'SUCCESS'
}


/*
数据模板定义规范 DTD
数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
属性名   name
生成规则 rule
属性值   value
'name|rule': value*/

/*
'name|min-max': value
'name|count': value
'name|min-max.dmin-dmax': value
'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value
*/


/*
    "userName" : '@name',     //模拟名称
    "age|1-100":100,          //模拟年龄(1-100)
    "color"    : "@color",    //模拟色值
    "date"     : "@date('yyyy-MM-dd')",  //模拟时间
    "url"      : "@url()",     //模拟url
    "content"  : "@cparagraph()" //模拟文本
            */
