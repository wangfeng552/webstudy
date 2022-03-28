事故黑匣子接口文档

- [事故黑匣子接口文档](#事故黑匣子接口文档)
  - [版本履历](#版本履历)
  - [错误码定义](#错误码定义)
  - [接口一览](#接口一览)

## 版本履历

| Rev No. | 日期       | 修订人 | 修订模块 | 修订内容     |
| ------- | ---------- | ------ | -------- | ------------ |
| V1.0.0  | 2022/03/17 | 杨方召 | ALL      | 初版接口文档 |
|         |            |        |          |              |
|         |            |        |          |              |
|         |            |        |          |              |

## 错误码定义

| 错误码 | 含义 |
| ------ | ---- |
| 10000  | 成功 |
| 10001  | 失败 |

## 接口一览

| 接口编号                | 接口名称                   | 方法 | PATH                                                                            | 状态     | 外部公开 | 说明                                                             |
| ----------------------- | :------------------------- | :--- | :------------------------------------------------------------------------------ | :------- | :------- | :--------------------------------------------------------------- |
| [IF-1-1](#接口if-1-1)   | 事故黑匣子省份分布概况     | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/freqency   | 设计完成 | 是       | 返回各省份的事故次数，全国占比，和次数最多车辆                   |
| [IF-1-2](#接口if-1-2)   | 事故时刻驾驶状况统计       | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/driving    | 设计完成 | 是       | 通过选择省份和车辆状态参数，返回该参数的分布状态                 |
| [IF-1-3](#接口if-1-3)   | 事故时刻系统状态统计       | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/system     | 设计完成 | 是       | 通过选择省份，返回该省份发生的事故中各系统的启用情况分布         |
| [IF-1-4](#接口if-1-4)   | 事故过程平均时长统计       | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/duration   | 设计完成 | 是       | 通过选择省份，返回该省份事故中各过程的平均时长                   |
| [IF-1-5](#接口if-1-5)   | 事故过程设备状态统计       | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/equipment  | 设计完成 | 是       | 通过省份选择，返回各设备状态量的开启状态分布                     |
| [IF-1-6](#接口if-1-6)   | 不同时段事故频次统计       | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/hour       | 设计完成 | 是       | 通过选择省份，返回该省份不同时间段的事故发生次数                 |
| [IF-1-7](#接口if-1-7)   | 不同天气事故频次统计       | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/weather    | 设计完成 | 是       | 通过选择省份，返回该省份不同天气下的事故发生频次                 |
| [IF-1-8](#接口if-1-8)   | 事故黑匣子多车数据查询     | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/records/multiple     | 设计完成 | 是       | 通过条件进行事故黑匣子的多车查询                                 |
| [IF-1-9](#接口if-1-9)   | 事故黑匣子单车数据查询     | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/records/single       | 设计完成 | 是       | 通过 vin 码进行事故黑匣子的单车查询                              |
| [IF-1-10](#接口if-1-10) | 最新事故智能推送           | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/smart/rencent        | 设计完成 | 是       | 智能推送页面近期发生的事故数据                                   |
| [IF-1-11](#接口if-1-11) | 近期事故次数最多省份及数据 | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/smart/province       | 设计完成 | 是       | 智能推送页面近期发生事故次数最多省份及数据                       |
| [IF-1-12](#接口if-1-12) | 数据预览                   | POST | /uaes-accident-event-api/remote-monitor-accidentevent-view/records/preview      | 设计完成 | 是       | 返回一次事故黑匣子事件的数据预览                                 |
| [IF-1-13](#接口if-1-13) | 数据下载                   | POST | /uaes-accident-event-api/remote-monitor-accidentevent-download/records/download | 设计完成 | 是       | 事故黑匣子原始数据下载功能                                       |
| [IF-1-14](#接口if-1-14) | 预览信号查询               | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/condition/preview    | 设计完成 | 是       | 事故黑匣子信号列表一览，用于前端获得可被预览的事故前后和状态信号 |
| [IF-1-15](#接口if-1-15) | 筛选条件查询               | GET  | /uaes-accident-event-api/remote-monitor-accidentevent-view/condition/search     | 设计完成 | 是       | 事故黑匣子信号列表一览，用于前端获得可被筛选的过程信号和状态信号 |

---

## 接口 IF-1-1

- [请求](#1-1_1)
  - [请求头](#1-1_1_1)
  - [请求参数](#1-1_1_2)
  - [请求实例](#1-1_1_3)
- [响应](#1-1_2)
  - [响应体结构](#1-1_2_1)
  - [响应实例](#1-1_2_2)
    - [请求成功](#1-1_2_2_1)
    - [请求失败](#1-1_2_2_2)
- [说明](#1-1_3)

接口名称：事故黑匣子省份分布概况

接口描述：返回各省份的事故次数，全国占比，和次数最多车辆

### <a id="1-1_1">请求</a>

| 请求 URL                                                                                   | Method |           Content-Type            | Character encoding |
| :----------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/freqency |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-1_1_1">请求头</a>

| NO  | Name          | 必须 |  类型  | 说明                                                                           |
| :-: | :------------ | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-1_1_2">请求参数</a>

| NO  | Name    | 必须 |  类型  | 说明                                                                                                |
| :-: | :------ | :--: | :----: | :-------------------------------------------------------------------------------------------------- |
|  1  | brand   |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认所有品牌   |
|  2  | carType |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认所有车型 |

#### <a id="1-1_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/freqency?brand=xxx&carType=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-1_2">响应</a>

#### <a id="1-1_2_1">响应体结构</a>

| 字段     | 必须 |     类型     | 说明                                           |
| :------- | :--: | :----------: | :--------------------------------------------- |
| msgCode  |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg      |  是  |    String    | 消息返回说明                                   |
| contents |  是  | List<Object> | 消息对象列表                                   |

- contents 单个对象的结构

| 字段              | 必须 |  类型   | 说明                                                 |
| :---------------- | :--: | :-----: | :--------------------------------------------------- |
| province          |  是  | String  | 省份编码。如该省是北京时，返回的该字段值为：”110000“ |
| accidentCount     |  是  | Integer | 该省事故总次数                                       |
| accidentPropotion |  是  | Double  | 占全国事故比例，返回百分比                           |
| worstVin          |  否  | String  | 该省事故次数最多的车辆的 VIN 码                      |
| worstVinCount     |  否  | Integer | 该省事故次数最多的车辆的事故次数                     |

#### <a id="1-1_2_2">响应实例</a>

- ##### <a id="1-1_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "contents": [{
        "province":"130000",
        "accidentCount":200,
        "accidentPropotion":20,
        "worstVin":"LGWEF7A72JH296027",
        "worstVinCount":5
  },{
        "province":"130100",
        "accidentCount":200,
        "accidentPropotion":20,
        "worstVin":"LGWEF7A72JH296027",
        "worstVinCount":5
  },{
      ...
  }]
}
```

- ##### <a id="1-1_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-1_3">说明</a>

接口说明：一次性返回全国所有省份的数据

请求参数：默认返回所有车型

---

## 接口 IF-1-2

- [请求](#1-2_1)
  - [请求头](#1-2_1_1)
  - [请求参数](#1-2_1_2)
  - [请求实例](#1-2_1_3)
- [响应](#1-2_2)
  - [响应体结构](#1-2_2_1)
  - [响应实例](#1-2_2_2)
    - [请求成功](#1-2_2_2_1)
    - [请求失败](#1-2_2_2_2)
- [说明](#1-2_3)

接口名称：事故时刻驾驶状况统计

接口描述：通过选择省份和车辆状态参数，返回该参数的分布状态；默认情况下返回全国的车速分布状态

### <a id="1-2_1">请求</a>

| 请求 URL                                                                                  | Method |           Content-Type            | Character encoding |
| :---------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/driving |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-2_1_1">请求头</a>

| NO  | Name          | 必须 |  类型  | 说明                                                                           |
| :-: | :------------ | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-2_1_2">请求参数</a>

| NO  | Name     | 必须 |  类型  | 说明                                                                                                  |
| :-: | :------- | :--: | :----: | :---------------------------------------------------------------------------------------------------- |
|  1  | brand    |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认为所有品牌   |
|  2  | carType  |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认为所有车型 |
|  3  | province |  否  | String | 省份编码。如该省是北京时，返回的该字段值为：”110000“，为 null 时默认为全国                            |
|  4  | signal   |  是  | String | 状态参数（车速：carSpeed，加速度：acceleration，油门踏板：acceleratePedalPosition）                   |

#### <a id="1-2_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/driving?brand=xxx&carType=xxx&province=xxx&signal=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-2_2">响应</a>

#### <a id="1-2_2_1">响应体结构</a>

| 字段     | 必须 |     类型     | 说明                                           |
| :------- | :--: | :----------: | :--------------------------------------------- |
| msgCode  |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg      |  是  |    String    | 消息返回说明                                   |
| contents |  是  | List<Object> | 消息对象列表。                                 |

- contents 单个对象的结构：

| 字段   | 必须 |  类型   | 说明                 |
| :----- | :--: | :-----: | :------------------- |
| lvaue  |  否  | Integer | 区间最小值           |
| rvalue |  否  | Integer | 区间最大值           |
| count  |  是  | Integer | 该区间内事故发生次数 |

#### <a id="1-2_2_2">响应实例</a>

- ##### <a id="1-2_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "contents": [{
        "lvalue":0,
        "rvalue":20,
        "count":20
  },{
        "lvalue":20,
        "rvalue":40,
        "count":20
  },{
        "lvalue":40,
        "rvalue":60,
        "count":20
  },{
        "lvalue":60,
        "rvalue":80,
        "count":20
  },{
        "lvalue":80,
        "count":20
  }]
}
```

- ##### <a id="1-2_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-2_3">说明</a>

请求参数：默认返回所有车型，全国统计

返回结果中，如果 min/max 标签缺失表示该区间没有左/右边界

---

## 接口 IF-1-3

- [请求](#1-3_1)
  - [请求头](#1-3_1_1)
  - [请求实例](#1-3_1_2)
- [响应](#1-3_2)
  - [响应体结构](#1-3_2_1)
  - [响应实例](#1-3_2_2)
    - [请求成功](#1-3_2_2_1)
    - [请求失败](#1-3_2_2_2)
- [说明](#1-3_3)

接口名称：事故时刻系统状态统计<br>

接口描述：通过选择省份，返回该省份发生的事故中各系统的启用情况分布；默认返回全国的各系统启用状况

### <a id="1-3_1">请求</a>

| 请求 URL                                                                                 | Method |           Content-Type            | Character encoding |
| ---------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/system |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-3_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-2_1_2">请求参数</a>

| NO  | Name     | 必须 |  类型  | 说明                                                                                                  |
| :-: | :------- | :--: | :----: | :---------------------------------------------------------------------------------------------------- |
|  1  | brand    |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认为所有品牌   |
|  2  | carType  |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认为所有车型 |
|  3  | province |  否  | String | 省份编码。如该省是北京时，返回的该字段值为：”110000“，为 null 时默认为全国                            |

#### <a id="1-3_1_2">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/system?brand=xxx&carType=xxx&province=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-3_2">响应</a>

#### <a id="1-3_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |
| content |  是  | Object | 消息对象                                       |

- content 的结构

| 字段            | 必须 |  类型   | 说明               |
| :-------------- | :--: | :-----: | :----------------- |
| enableCount     |  是  | Integer | 展开次数           |
| enablePropotion |  是  | Double  | 展开比例，为百分数 |

#### <a id="1-3_2_2">响应实例</a>

- ##### <a id="1-3_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "content":
    {
      "abs": {
          "enableCounts": 1,
          "enablePropotion": 10
        },
      "esp": {
          "enableCounts": 1,
          "enablePropotion": 10
        },
      "brake": {
          "enableCounts": 1,
          "enablePropotion": 10
        },
      "tcs": {
          "enableCounts": 1,
          "enablePropotion": 10
        },
      "ccs": {
          "enableCounts": 1,
          "enablePropotion": 10
        },
      "accs": {
          "enableCounts": 1,
          "enablePropotion": 10
        }
     }
}
```

- ##### <a id="1-3_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-3_3">说明</a>

请求参数：默认返回所有车型，全国统计

---

## 接口 IF-1-4

- [请求](#1-4_1)
  - [请求头](#1-4_1_1)
  - [请求头](#1-4_1_2)
  - [请求实例](#1-4_1_3)
- [响应](#1-4_2)
  - [响应体结构](#1-4_2_1)
  - [响应实例](#1-4_2_2)
    - [请求成功](#1-4_2_2_1)
    - [请求失败](#1-4_2_2_2)
- [说明](#1-4_3)

接口名称：事故过程平均时长统计

接口描述：通过选择省份，返回该省份事故中各过程的平均时长；默认返回全国平均

### <a id="1-4_1">请求</a>

| 请求 URL                                                                                   | Method |           Content-Type            | Character encoding |
| ------------------------------------------------------------------------------------------ | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/duration |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-4_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-4_1_2">请求参数</a>

| NO  | Name     | 必须 |  类型  | 说明                                                                                                |
| :-: | :------- | :--: | :----: | :-------------------------------------------------------------------------------------------------- |
|  1  | brand    |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认所有品牌   |
|  2  | carType  |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认所有车型 |
|  3  | province |  否  | String | 省份编码。如该省是北京时，返回的该字段值为：”110000“，为 null 时默认全国                            |

#### <a id="1-4_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/duration?brand=xxx&carType=xxx&province=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-4_2">响应</a>

#### <a id="1-4_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |
| content |  是  | Object | 消息对象                                       |

- content 的结构

| 字段                       | 必须 | 类型 | 说明                         |
| :------------------------- | :--: | :--: | :--------------------------- |
| accidentTime               |  是  | Long | 事故持续时间(ms)             |
| driverFrontAirbagTime      |  是  | Long | 主正气囊平均展开时间(ms)     |
| sideLeftAirbagTime         |  是  | Long | 主侧气囊平均展开时间(ms)     |
| sideRightAirbagTime        |  是  | Long | 副侧气囊平均展开时间(ms)     |
| driverBeltPretensionerTime |  是  | Long | 主安全带预紧平均展开时间(ms) |

#### <a id="1-4_2_2">响应实例</a>

- ##### <a id="1-4_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
    "msgCode": "10000",
    "msg": "OK",
    "content": {
        "accidentTime": 20,
        "driverFrontAirbagTime": 18,
        "sideLeftAirbagTime": 18,
        "sideRightAirbagTime": 18,
        "driverBeltPretensionerTime": 18
    }
}
```

- ##### <a id="1-4_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-4_3">说明</a>

请求参数：默认返回所有车型，全国统计

---

## 接口 IF-1-5

- [请求](#1-5_1)
  - [请求头](#1-5_1_1)
  - [请求实例](#1-5_1_2)
- [响应](#1-5_2)
  - [响应体结构](#1-5_2_1)
  - [响应实例](#1-5_2_2)
    - [请求成功](#1-5_2_2_1)
    - [请求失败](#1-5_2_2_2)
- [说明](#1-5_3)

接口名称：事故过程设备状态统计<br>

接口描述：通过省份选择，返回各设备状态量的开启状态分布

### <a id="1-5_1">请求</a>

| 请求 URL                                                                                    | Method |           Content-Type            | Character encoding |
| ------------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/equipment |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-5_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-5_1_2">请求参数</a>

| NO  | Name     | 必须 |  类型  | 说明                                                                        |
| :-: | :------- | :--: | :----: | :-------------------------------------------------------------------------- |
|  1  | brand    |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL   |
|  2  | carType  |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL |
|  3  | province |  否  | String | 省份编码。如该省是北京时，返回的该字段值为：”110000“                        |

#### <a id="1-5_1_2">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/equipment?brand=xxx&carType=xxx&province=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-5_2">响应</a>

#### <a id="1-5_2_1">响应体结构</a>

| 字段     | 必须 |     类型     | 说明                                           |
| :------- | :--: | :----------: | :--------------------------------------------- |
| msgCode  |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg      |  是  |    String    | 消息返回说明                                   |
| contents |  是  | List<Object> | 消息对象列表                                   |

- contents 单个对象的结构

| 字段                   | 必须 | 类型                   | 说明           |
| ---------------------- | ---- | ---------------------- | -------------- |
| driverFrontAirbag      | 是   | EquipmentEnableCountVO | 主正气囊       |
| sideLeftAirbag         | 是   | EquipmentEnableCountVO | 主侧气囊       |
| sideRightAirbag        | 是   | EquipmentEnableCountVO | 副侧气囊       |
| driverBeltPretensioner | 是   | EquipmentEnableCountVO | 主安全带预紧器 |
| driverBeltBuckle       | 是   | EquipmentEnableCountVO | 主安全带锁扣   |

- 其中 equipmentEnableCountVO 的类型

| 字段                    | 必须 |  类型   | 说明                               |
| :---------------------- | :--: | :-----: | :--------------------------------- |
| accidentCrashCount      |  是  | Integer | 事故发生时展开次数                 |
| accidentCrashPropotion  |  是  | Double  | 事故发生时展开所占比例，返回百分数 |
| accidentFinishCount     |  是  | Integer | 事故发生后展开次数                 |
| accidentFinishPropotion |  是  | Double  | 事故发生后展开所占比例，返回百分数 |

#### <a id="1-5_2_2">响应实例</a>

- ##### <a id="1-5_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "contents":
    {
      // 主正气囊
      "driverFrontAirbag": {
          "accidentCrashCount": 1,
          "accidentCrashPropotion":10,
          "accidentFinishCount": 6,
          "accidentFinishPropotion":60
        },
      // 主侧气囊
      "sideLeftAirbag": {
          "accidentCrashCount": 1,
          "accidentCrashPropotion":10,
          "accidentFinishCount": 6,
          "accidentFinishPropotion":60
        },
      // 副侧气囊
      "sideRightAirbag": {
          "accidentCrashCount": 1,
          "accidentCrashPropotion":10,
          "accidentFinishCount": 6,
          "accidentFinishPropotion":60
        },
      // 主安全带预紧器
      "driverBeltPretensioner": {
          "accidentCrashCount": 1,
          "accidentCrashPropotion":10,
          "accidentFinishCount": 6,
          "accidentFinishPropotion":60
        },
      // 主安全带锁扣
      "driverBeltBuckle": {
          "accidentCrashCount": 1,
          "accidentCrashPropotion":10,
          "accidentFinishCount": 6,
          "accidentFinishPropotion":60
        }
     }
}
```

- ##### <a id="1-5_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-5_3">说明</a>

请求参数：默认返回所有车型，全国统计

事故发生时展开与事故发生后展开各自所占比例由前端根据展开次数计算得出

---

## 接口 IF-1-6

- [请求](#1-6_1)
  - [请求头](#1-6_1_1)
  - [请求头](#1-6_1_2)
  - [请求实例](#1-6_1_3)
- [响应](#1-6_2)
  - [响应体结构](#1-6_2_1)
  - [响应实例](#1-6_2_2)
    - [请求成功](#1-6_2_2_1)
    - [请求失败](#1-6_2_2_2)
- [说明](#1-6_3)

接口名称：不同时段事故频次统计

接口描述：通过选择省份，返回该省份不同时间段的事故发生次数

### <a id="1-6_1">请求</a>

| 请求 URL                                                                               | Method |           Content-Type            | Character encoding |
| -------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/hour |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-6_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-6_1_2">请求参数</a>

| NO  | Name     | 必须 |  类型  | 说明                                                                                                  |
| :-: | :------- | :--: | :----: | :---------------------------------------------------------------------------------------------------- |
|  1  | brand    |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认为所有品牌   |
|  2  | carType  |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认为全部车型 |
|  3  | province |  否  | String | 省份编码。如该省是北京时，返回的该字段值为：”110000“，为 null 时默认为全国                            |

#### <a id="1-6_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/hour?brand=xxx&carType=xxx&province=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-6_2">响应</a>

#### <a id="1-6_2_1">响应体结构</a>

| 字段     | 必须 |     类型     | 说明                                           |
| :------- | :--: | :----------: | :--------------------------------------------- |
| msgCode  |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg      |  是  |    String    | 消息返回说明                                   |
| contents |  是  | List<Object> | 消息对象                                       |

- contents 单个对象的结构：

| 字段   | 必须 |  类型   | 说明                 |
| :----- | :--: | :-----: | :------------------- |
| lvalue |  是  | Integer | 区间最小值           |
| rvalue |  是  | Integer | 区间最大值           |
| count  |  是  | Integer | 该区间内事故发生次数 |

#### <a id="1-6_2_2">响应实例</a>

- ##### <a id="1-6_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
    "msgCode": "10000",
    "msg": "OK",
    "contents": [{
        "lvalue":1,
        "rvalue":4,
        "count":20
  },{
        "lvalue":4,
        "rvalue":7,
        "count":20
  },{
        "lvalue":7,
        "rvalue":10,
        "count":20
  },{
        "lvalue":10,
        "rvalue":13,
        "count":20
  },{
        "lvalue":13,
        "rvalue":16,
        "count":16
  },{
        "lvalue":16,
        "rvalue":19,
        "count":20
  },{
        "lvalue":19,
        "rvalue":22,
        "count":20
  },{
        "lvalue":22,
        "rvalue":25,
        "count":20
  }]
}
```

- ##### <a id="1-6_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-6_3">说明</a>

请求参数：默认返回所有车型，全国统计

最后一个区间表示发生在 22 点（含 22 点）至第二天凌晨一点前的事故次数

## 接口 IF-1-7

- [请求](#1-7_1)
  - [请求头](#1-7_1_1)
  - [请求实例](#1-7_1_2)
- [响应](#1-7_2)
  - [响应体结构](#1-7_2_1)
  - [响应实例](#1-7_2_2)
    - [请求成功](#1-7_2_2_1)
    - [请求失败](#1-7_2_2_2)
- [说明](#1-7_3)

接口名称：不同天气事故频次统计<br>

接口描述：通过选择省份，返回该省份不同天气下的事故发生频次

### <a id="1-7_1">请求</a>

| 请求 URL                                                                                  | Method |           Content-Type            | Character encoding |
| ----------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/weather |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-7_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-7_1_2">请求参数</a>

| NO  | Name     | 必须 |  类型  | 说明                                                                                                  |
| :-: | :------- | :--: | :----: | :---------------------------------------------------------------------------------------------------- |
|  1  | brand    |  否  | String | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认为所有品牌   |
|  2  | carType  |  否  | String | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认为所有车型 |
|  3  | province |  否  | String | 省份编码。如该省是北京时，返回的该字段值为：”110000“，为 null 时默认为全国                            |

#### <a id="1-7_1_2">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/statistic/weather?brand=xxx&carType=xxx&province=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-7_2">响应</a>

#### <a id="1-7_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |
| content |  是  | Object | 消息对象                                       |

- content 的结构

| 字段          | 必须 |  类型   | 说明                       |
| :------------ | :--: | :-----: | :------------------------- |
| rain          |  是  | Integer | 降雨天气类型对应的故障次数 |
| snow          |  是  | Integer | 降雪天气类型对应的故障次数 |
| lowVisibility |  是  | Integer | 视障天气类型对应的故障次数 |
| wind          |  是  | Integer | 强风天气类型对应的故障次数 |
| other         |  是  | Integer | 其他天气类型对应的故障次数 |

#### <a id="1-7_2_2">响应实例</a>

- ##### <a id="1-7_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "content":
    {
      "rain": 1,
      "snow": 2,
      "lowVisibility": 3,
      "wind": 4,
      "other": 5
     }
}
```

- ##### <a id="1-7_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-7_3">说明</a>

请求参数：默认返回所有车型，全国统计

比例由前端通过次数推算得出（某种天气次数/总次数）

---

## 接口 IF-1-8

- [请求](#1-8_1)
  - [请求头](#1-8_1_1)
  - [请求头](#1-8_1_2)
  - [请求实例](#1-8_1_3)
- [响应](#1-8_2)
  - [响应体结构](#1-8_2_1)
  - [响应实例](#1-8_2_2)
    - [请求成功](#1-8_2_2_1)
    - [请求失败](#1-8_2_2_2)
- [说明](#1-8_3)

接口名称：事故黑匣子多车查询

接口描述：通过条件进行事故黑匣子的多车查询

### <a id="1-8_1">请求</a>

| 请求 URL                                                                                 | Method |           Content-Type            | Character encoding |
| ---------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/records/multiple |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-8_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-8_1_2">请求参数</a>

| NO  | Name           | 必须 |  类型   | 说明                                                                                                                                                         |
| :-: | :------------- | :--: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | brand          |  否  | String  | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认所有品牌                                                            |
|  2  | carType        |  否  | String  | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认所有车型                                                          |
|  3  | province       |  否  | String  | 省份编码。如该省是北京时，返回的该字段值为：”110000“，为 null 时默认为全国                                                                                   |
|  4  | weather        |  否  | String  | 天气（降雨天气：rain，降雪天气：snow，视障天气：lowVisibility，强风天气：wind，其他天气：other，全部：all），为 null 时默认为全部                            |
|  5  | current        |  否  | Integer | 页码，从 1 开始，为 null 时默认为 1                                                                                                                          |
|  6  | size           |  否  | Integer | 单页展示最大记录数，为 null 时默认为 5                                                                                                                       |
|  7  | startTime      |  否  |  Date   | 查询起始日期"YYYY-MM-dd"，为 null 时默认为 endTime 的 2 个月前                                                                                               |
|  8  | endTime        |  否  |  Date   | 查询结束日期"YYYY-MM-dd"，为 null 时默认为查询当日                                                                                                           |
|  9  | scopeCondition |  否  | String  | 范围条件（从接口/uaes-accident-event-api/condition/search 中获取），格式为：”信号 1：左边界，右边界；信号 2...“                                              |
| 10  | stateCondition |  否  | String  | 状态条件（从接口/uaes-accident-event-api/condition/search 中获取）格式为：”信号 1：状态值；信号 1：状态值；信号 3...“。其中状态值，1 表示 true，0 表示 false |

#### <a id="1-8_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/records/multiple?brand=xxx&carType=xxx&province=xxx&weather=xxx&current=1&size=5&startTime="YYYY-MM-dd"&endTime="YYYY-MM-dd"&scopeCondition="engineSpeed:0,2000;carSpeed:60,100;throttlePositionInfo:0,10;..."&stateCondition="turnLamp:1;tcsActive:0;espActive:0;..."
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-8_2">响应</a>

#### <a id="1-8_2_1">响应体结构</a>

| 字段        | 必须 |     类型     | 说明                                           |
| :---------- | :--: | :----------: | :--------------------------------------------- |
| msgCode     |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg         |  是  |    String    | 消息返回说明                                   |
| current     |  是  |   Integer    | 当前页数，从 1 开始                            |
| size        |  是  |   Integer    | 单页展示最大记录数                             |
| total       |  是  |   Integer    | 符合条件的总记录数                             |
| pages       |  是  |   Integer    | 总页数                                         |
| searchCount |  是  |   Boolean    | 标记是否进行了总数统计                         |
| contents    |  是  | List<Object> | 消息对象列表                                   |

- contents 中单一对象的结构

| 字段                    | 必须 |  类型   | 说明                               |
| :---------------------- | :--: | :-----: | :--------------------------------- |
| vin                     |  否  | String  | 车辆 vin 码                        |
| brand                   |  否  | String  | 品牌                               |
| carType                 |  否  | String  | 车型                               |
| accidentTime            |  否  |  Date   | 事故发生时间                       |
| location                |  否  | String  | 事件发生地点。省份名称+ 城市名称。 |
| weather                 |  否  | String  | 天气                               |
| carSpeed                |  否  | Double  | 车速                               |
| acceleration            |  否  | Double  | 加速度                             |
| gearboxPosition         |  否  | Integer | 挡位                               |
| steerWheelAngle         |  否  | Double  | 方向盘                             |
| acceleratePedalPosition |  否  | Double  | 油门                               |
| espActive               |  否  | Boolean | ESP                                |
| absActive               |  否  | Boolean | ABS                                |
| brakePedal              |  否  | Boolean | 刹车                               |

#### <a id="1-8_2_2">响应实例</a>

- ##### <a id="1-8_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
    "msgCode": "10000",
    "msg": "OK",
    "current":1,
    "size":5,
    "total":300,
    "pages":60,
    "searchCount":1,
    "contents": [
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       },
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       }
       ...
     ]
}
```

- ##### <a id="1-8_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-8_3">说明</a>

请求参数：参数列表中 province,weather,scopecondition,statecondition,startTime,endTime 均为空的情况下，默认返回该品牌车型全国近 100 次事故。

返回结果：记录按照事故时间降序排列

## 接口 IF-1-9

- [请求](#1-9_1)
  - [请求头](#1-9_1_1)
  - [请求头](#1-9_1_2)
  - [请求实例](#1-9_1_3)
- [响应](#1-9_2)
  - [响应体结构](#1-9_2_1)
  - [响应实例](#1-9_2_2)
    - [请求成功](#1-9_2_2_1)
    - [请求失败](#1-9_2_2_2)
- [说明](#1-9_3)

接口名称：事故黑匣子单车数据查询

接口描述：通过 vin 码进行事故黑匣子的单车查询

### <a id="1-9_1">请求</a>

| 请求 URL                                                                               | Method |           Content-Type            | Character encoding |
| -------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/records/single |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-9_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-9_1_2">请求参数</a>

| NO  | Name      | 必须 |  类型  | 说明                                                           |
| :-: | :-------- | :--: | :----: | :------------------------------------------------------------- |
|  1  | vin       |  是  | String | 车辆 vin 码                                                    |
|  2  | current   |  否  | String | 页码，从 1 开始，为 null 时默认为 1                            |
|  3  | size      |  否  | String | 单页展示最大记录数，为 null 时默认为 5                         |
|  4  | startTime |  否  |  Date  | 查询起始日期"YYYY-MM-dd"，为 null 时默认为 endTime 的 2 个月前 |
|  5  | endTime   |  否  |  Date  | 查询结束日期"YYYY-MM-dd"，为 null 时默认为查询当日             |

#### <a id="1-9_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/records/single?vin=xxx&current=1&size=5&startTime="YYYY-MM-dd"&endTime="YYYY-MM-dd"
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-9_2">响应</a>

#### <a id="1-9_2_1">响应体结构</a>

| 字段        | 必须 |     类型     | 说明                                           |
| :---------- | :--: | :----------: | :--------------------------------------------- |
| msgCode     |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg         |  是  |    String    | 消息返回说明                                   |
| current     |  是  |   Integer    | 当前页数，从 1 开始                            |
| size        |  是  |   Integer    | 单页展示最大记录数                             |
| total       |  是  |   Integer    | 符合条件的总记录数                             |
| pages       |  是  |   Integer    | 总页数                                         |
| searchCount |  是  |   Boolean    | 标记是否进行了总数统计                         |
| contents    |  是  | List<Object> | 消息对象列表                                   |

- contents 中单一对象的结构

| 字段                    | 必须 |  类型   | 说明                               |
| :---------------------- | :--: | :-----: | :--------------------------------- |
| vin                     |  否  | String  | 车辆 vin 码                        |
| brand                   |  否  | String  | 品牌                               |
| carType                 |  否  | String  | 车型                               |
| accidentTime            |  否  |  Date   | 事故发生时间                       |
| location                |  否  | String  | 事件发生地点。省份名称+ 城市名称。 |
| weather                 |  否  | String  | 天气                               |
| carSpeed                |  否  | Double  | 车速                               |
| acceleration            |  否  | Double  | 加速度                             |
| gearboxPosition         |  否  | Integer | 挡位                               |
| steerWheelAngle         |  否  | Double  | 方向盘                             |
| acceleratePedalPosition |  否  | Double  | 油门                               |
| espActive               |  否  | Boolean | ESP                                |
| absActive               |  否  | Boolean | ABS                                |
| brakePedal              |  否  | Boolean | 刹车                               |

#### <a id="1-9_2_2">响应实例</a>

- ##### <a id="1-9_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
    "msgCode": "10000",
    "msg": "OK",
    "current":1,
    "size":5,
    "total":300,
    "pages":60,
    "searchCount":1,
    "contents": [
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       },
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       }
       ...
     ]
}
```

- ##### <a id="1-9_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-9_3">说明</a>

返回结果：记录按照事故时间降序排列

---

## 接口 IF-1-10

- [请求](#1-10_1)
  - [请求头](#1-10_1_1)
  - [请求实例](#1-10_1_2)
- [响应](#1-10_2)
  - [响应体结构](#1-10_2_1)
  - [响应实例](#1-10_2_2)
    - [请求成功](#1-10_2_2_1)
    - [请求失败](#1-10_2_2_2)
- [说明](#1-10_3)

接口名称：最新事故智能推送<br>

接口描述：智能推送页面近期发生的事故数据

### <a id="1-10_1">请求</a>

| 请求 URL                                                                              | Method |           Content-Type            | Character encoding |
| ------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/smart/rencent |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-10_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-10_1_2">请求参数</a>

| NO  | Name    | 必须 |  类型   | 说明                                                                                                  |
| :-: | :------ | :--: | :-----: | :---------------------------------------------------------------------------------------------------- |
|  1  | brand   |  否  | String  | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认为所有品牌   |
|  2  | carType |  否  | String  | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认为所有车型 |
|  3  | current |  否  | Integer | 页码，从 1 开始，为 null 时默认为 1                                                                   |
|  4  | size    |  否  | Integer | 单页展示记录数，为 null 时默认为 5                                                                    |

#### <a id="1-10_1_2">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/smart/rencent?brand=xxx&carType=xxx&page=xxx&pageSize=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-10_2">响应</a>

#### <a id="1-10_2_1">响应体结构</a>

| 字段        | 必须 |     类型     | 说明                                           |
| :---------- | :--: | :----------: | :--------------------------------------------- |
| msgCode     |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg         |  是  |    String    | 消息返回说明                                   |
| current     |  是  |   Integer    | 当前页数，从 1 开始                            |
| size        |  是  |   Integer    | 单页展示最大记录数                             |
| total       |  是  |   Integer    | 符合条件的总记录数                             |
| pages       |  是  |   Integer    | 符合条件的总页数                               |
| searchCount |  是  |   Boolean    | 标记是否进行了总数统计                         |
| contents    |  是  | List<Object> | 消息对象列表                                   |

- contents 单个 object 的结构

| 字段                    | 必须 |  类型   | 说明                               |
| :---------------------- | :--: | :-----: | :--------------------------------- |
| vin                     |  否  | String  | 车辆 vin 码                        |
| brand                   |  否  | String  | 品牌                               |
| carType                 |  否  | String  | 车型                               |
| accidentTime            |  否  |  Date   | 事故发生时间                       |
| location                |  否  | String  | 事件发生地点。省份名称+ 城市名称。 |
| weather                 |  否  | String  | 天气                               |
| carSpeed                |  否  | Double  | 车速                               |
| acceleration            |  否  | Double  | 加速度                             |
| gearboxPosition         |  否  | Integer | 挡位                               |
| steerWheelAngle         |  否  | Double  | 方向盘                             |
| acceleratePedalPosition |  否  | Double  | 油门                               |
| espActive               |  否  | Boolean | ESP                                |
| absActive               |  否  | Boolean | ABS                                |
| brakePedal              |  否  | Boolean | 刹车                               |

#### <a id="1-10_2_2">响应实例</a>

- ##### <a id="1-10_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
    "msgCode": "10000",
    "msg": "OK",
    "current":1,
    "size":5,
    "total":300,
    "pages":60,
    "searchCount":1,
    "contents": [
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       },
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       }
       ...
     ]
}
```

- ##### <a id="1-10_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-10_3">说明</a>

请求参数：默认返回所有车型第一页数据

返回结果：记录按照事故时间降序排列

---

## 接口 IF-1-11

- [请求](#1-11_1)
  - [请求头](#1-11_1_1)
  - [请求头](#1-11_1_2)
  - [请求实例](#1-11_1_3)
- [响应](#1-11_2)
  - [响应体结构](#1-11_2_1)
  - [响应实例](#1-11_2_2)
    - [请求成功](#1-11_2_2_1)
    - [请求失败](#1-11_2_2_2)
- [说明](#1-11_3)

接口名称：近期发生事故次数最多省份及数据

接口描述：智能推送页面近期发生事故次数最多省份及数据

### <a id="1-11_1">请求</a>

| 请求 URL                                                                               | Method |           Content-Type            | Character encoding |
| -------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/smart/province |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-11_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-11_1_2">请求参数</a>

| NO  | Name    | 必须 |  类型   | 说明                                                                                                |
| :-: | :------ | :--: | :-----: | :-------------------------------------------------------------------------------------------------- |
|  1  | brand   |  否  | String  | 品牌。品牌的字符串形式的描述,如:”WEY“, 如果是查询所有品牌，则该参数为 ALL，为 null 时默认所有品牌   |
|  2  | carType |  否  | String  | 车型。车型的字符串形式的参数,如:"CHB071",如果是查询所有车型，则该参数为 ALL，为 null 时默认所有车型 |
|  3  | current |  否  | Integer | 页码，从 1 开始，为 null 时默认为 1                                                                 |
|  4  | size    |  否  | Integer | 单页展示记录数，为 null 时默认为 5                                                                  |

#### <a id="1-11_1_3">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/smart/province?brand=xxx&carType=xxx&page=xxx&pageSize=xxx
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-11_2">响应</a>

#### <a id="1-11_2_1">响应体结构</a></a>

| 字段        | 必须 |     类型     | 说明                                           |
| :---------- | :--: | :----------: | :--------------------------------------------- |
| msgCode     |  是  |    String    | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg         |  是  |    String    | 消息返回说明                                   |
| current     |  是  |   Integer    | 当前页数，从 1 开始                            |
| size        |  是  |   Integer    | 单页展示最大记录数                             |
| total       |  是  |   Integer    | 符合条件的总记录数                             |
| pages       |  是  |   Integer    | 符合条件的总页数                               |
| searchCount |  是  |   Boolean    | 标记是否进行了总数统计                         |
| province    |  是  |    String    | 频率最高的省份                                 |
| contents    |  是  | List<Object> | 消息对象列表                                   |

- contents 单个对象的结构

| 字段                    | 必须 |  类型   | 说明                               |
| :---------------------- | :--: | :-----: | :--------------------------------- |
| vin                     |  否  | String  | vin 码                             |
| brand                   |  否  | String  | 品牌                               |
| carType                 |  否  | Integer | 车型                               |
| accidentTime            |  否  | Integer | 发生时间                           |
| location                |  否  | String  | 事件发生地点。省份名称+ 城市名称。 |
| weather                 |  否  | String  | 天气                               |
| carSpeed                |  否  | Double  | 车速                               |
| acceleration            |  否  | Double  | 加速度                             |
| gearboxPosition         |  否  | Integer | 挡位                               |
| steerWheelAngle         |  否  | Double  | 方向盘                             |
| acceleratePedalPosition |  否  | Double  | 油门                               |
| espActive               |  否  | Boolean | ESP                                |
| absActive               |  否  | Boolean | ABS                                |
| brakePedal              |  否  | Boolean | 刹车                               |

#### <a id="1-11_2_2">响应实例</a>

- ##### <a id="1-11_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
    "msgCode": "10000",
    "msg": "OK",
    "current":1,
    "size":5,
    "total":300,
    "pages":60,
    "searchCount":1,
    "province":"河北",
    "contents": [
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steerWheelAngle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       },
       {
           "vin": "LNBMCUKK7KT940105",
           "brand": "WEY",
           "carType": "CHB071",
           "accidentTime": "2021-07-13 17:18:56",
           "location": "河北省邯郸市",
           "weather": "晴",
           "carSpeed": 80,
           "acceleration": 80,
           "gearboxPosition": 3,
           "steer_wheel_angle": 30,
           "accelerate_pedal_position": 20,
           "espActive": 80,
           "absActive": 80,
           "brakePedal": 80
       }
       ...
     ]
}
```

- ##### <a id="1-11_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-11_3">说明</a>

请求参数：默认为空返回全部车型的对应数据：

返回结果：记录按照事故时间降序排列

## 接口 IF-1-12

- [请求](#1-12_1)
  - [请求头](#1-12_1_1)
  - [请求实例](#1-12_1_2)
- [响应](#1-12_2)
  - [响应体结构](#1-12_2_1)
  - [响应实例](#1-12_2_2)
    - [请求成功](#1-12_2_2_1)
    - [请求失败](#1-12_2_2_2)
- [说明](#1-12_3)

接口名称：数据预览接口<br>

接口描述：返回一次事故黑匣子事件的数据预览

### <a id="1-12_1">请求</a>

| 请求 URL                                                                                | Method |           Content-Type            | Character encoding |
| --------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/records/preview |  POST  | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-12_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-12_1_2">请求参数</a>

| NO  | Name         | 必须 |  类型  | 说明                   |
| :-: | :----------- | :--: | :----: | :--------------------- |
|  1  | vin          |  是  | String | 车辆 vin               |
|  2  | accidentTime |  是  | String | 被预览的记录的发生时间 |

#### <a id="1-12_1_2">请求实例</a>

```http
POST /uaes-accident-event-api/remote-monitor-accidentevent-view/records/preview
{
    "vin": "LNBMCUKK7KT940105",
    "accidentTime": "2021-07-13 17:18:56"
}
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-12_2">响应</a>

#### <a id="1-12_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |
| content |  是  | Object | 消息对象                                       |

- content 结构

| 字段                  | 必须 | 类型                       | 说明               |
| --------------------- | ---- | -------------------------- | ------------------ |
| accidentBeforeRecords | 是   | List<AccidentBeforeRecord> | 事故发生前数据记录 |
| accidentAfterRecords  | 是   | List<AccidentAfterRecord>  | 事故发生后数据记录 |
| accidentStateRecords  | 是   | List<AccidentStateRecord>  | 事故状态数据记录   |

- accidentBeforeRecords/accidentAfterRecords/accidentStateRecords 单个对象的结构

| 字段                                  | 必须 |  类型   | 说明                                                                                                                                                                           |
| :------------------------------------ | :--: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rc                                    |  是  | Integer | rollingcounter                                                                                                                                                                 |
| engineSpeed/carSpeed/turnLampState... |  否  |         | 事故发生前，事故发生后以及事故状态具体信号见 t_accident_before_cache, t_accident_after_cache, t_accident_state_cache 三张表的标注橘黄色字段，json 结构体中使用字段的小驼峰格式 |

#### <a id="1-12_2_2">响应实例</a>

- ##### <a id="1-12_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "content":
    {
      "accidentBeforeRecords":
      [{
          "rc": 0,
          "engineSpeed": 3000,
          "carSpeed": 60,
          "turnLampState": 1,
          "tcsActiveState":1,
          ...
        },
       {
          "rc": 1,
          "engineSpeed": 3000,
          "carSpeed": 60,
          "turnLampState": 1,
          "tcsActiveState":1,
          ...
        },
      ...
     ],
     "accidentAfterRecords":
      [{
          "rc": 0,
          "acceleration": 30.1,
          "speedChange": 20.3,
          "lateral_acceleration": 1.4
        },
       {
          "rc": 1,
          "acceleration": 30.1,
          "speedChange": 20.3,
          "lateral_acceleration": 1.4
        },
      ...
     ],
     "accidentStateRecords":
      [{
          "rc": 0,
          "crasDuration": 300,
          "maxSpeedChange": 10,
          "maxSpeedChangeTime": 10,
          "ignitionCycleCrash":1,
          ...
        },
       {
          "rc": 1,
          "crasDuration": 300,
          "maxSpeedChange": 30,
          "maxSpeedChangeTime": 10,
          "ignitionCycleCrash":1,
          ...
        },
      ...
     ]
}
```

- ##### <a id="1-12_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-12_3">说明</a>

无

---

## 接口 IF-1-13

- [请求](#1-13_1)
  - [请求头](#1-13_1_1)
  - [请求头](#1-13_1_2)
  - [请求实例](#1-13_1_3)
- [响应](#1-13_2)
  - [响应体结构](#1-13_2_1)
  - [响应实例](#1-13_2_2)
    - [请求成功](#1-13_2_2_1)
    - [请求失败](#1-13_2_2_2)
- [说明](#1-13_3)

接口名称：数据下载

接口描述：事故黑匣子原始数据下载功能

### <a id="1-13_1">请求</a>

| 请求 URL                                                                                     | Method |           Content-Type            | Character encoding |
| -------------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-download/records/download |  POST  | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-13_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-13_1_2">请求参数</a>

| NO  | Name         | 必须 |  类型  | 说明                   |
| :-: | :----------- | :--: | :----: | :--------------------- |
|  1  | vin          |  是  | String | 车辆 vin               |
|  2  | accidentTime |  是  | String | 被下载的记录的发生时间 |

#### <a id="1-13_1_3">请求实例</a>

```http
POST /uaes-accident-event-api/remote-monitor-accidentevent-download/records/download
{
    "vin": "LNBMCUKK7KT940105",
    "accidentTime": "2021-07-13 17:18:56"
}
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-13_2">响应</a>

#### <a id="1-13_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |

#### <a id="1-13_2_2">响应实例</a>

- ##### <a id="1-13_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

二进制文件流
```

- ##### <a id="1-13_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-13_3">说明</a>

无

---

## 接口 IF-1-14

- [请求](#1-14_1)
  - [请求头](#1-14_1_1)
  - [请求实例](#1-14_1_2)
- [响应](#1-14_2)
  - [响应体结构](#1-14_2_1)
  - [响应实例](#1-14_2_2)
    - [请求成功](#1-14_2_2_1)
    - [请求失败](#1-14_2_2_2)
- [说明](#1-14_3)

接口名称：预览信号查询<br>

接口描述：事故黑匣子信号列表一览，用于前端获得可被预览的事故前后和状态信号

### <a id="1-14_1">请求</a>

| 请求 URL                                                                                  | Method |           Content-Type            | Character encoding |
| ----------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/condition/preview |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-14_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-14_1_2">请求参数</a>

| NO  | Name | 必须 | 类型 | 说明 |
| :-: | :--- | :--: | :--: | :--- |
|     | 无   |      |      |      |

#### <a id="1-14_1_2">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/condition/preview
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-14_2">响应</a>

#### <a id="1-14_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |
| content |  是  | Object | 消息对象                                       |

- content 的结构

| 字段                  | 必须 |  类型  | 说明             |
| :-------------------- | :--: | :----: | :--------------- |
| accidentBeforeSignals |  是  | Object | 事故前信号列表   |
| accidentAfterSignals  |  是  | Object | 事故后信号列表   |
| accidentStateSignals  |  是  | Object | 事故状态信号列表 |

- 每个信号单元的结构

| 字段       | 必须 | 类型   | 说明       |
| ---------- | ---- | ------ | ---------- |
| signalName | 是   | String | 信号中文名 |
| unit       | 否   | String | 信号单位   |

#### <a id="1-14_2_2">响应实例</a>

- ##### <a id="1-14_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "content":
    {
      "accidentBeforeSignals":
      {
         "engineSpeed":{signalName:"发动机转速", unit:"r/min"},
         "carSpeed":{signalName:"车速", unit:"km/h"},
         ...
       },
     "accidentAfterSignals":
      {
         "acceleration":{signalName:"发动机转速", unit:"m/s^2"},
         "speedChange":{signalName:"车辆速度变化量", unit:"km/h"},
         ...
       },
     "accidentStateSignals":
      {
         "crashDuration":{signalName:"事故持续时间", unit:"s"},
         "ignitionCycleCrash":{signalName:"事故中点火次数"},
         ...
       }
     }
}
```

- ##### <a id="1-14_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-14_3">说明</a>

根据数据库不断变化可筛选条件，前端根据此接口获取筛选条件

---

## 接口 IF-1-15

- [请求](#1-15_1)
  - [请求头](#1-15_1_1)
  - [请求实例](#1-15_1_2)
- [响应](#1-15_2)
  - [响应体结构](#1-15_2_1)
  - [响应实例](#1-15_2_2)
    - [请求成功](#1-15_2_2_1)
    - [请求失败](#1-15_2_2_2)
- [说明](#1-15_3)

接口名称：筛选条件查询<br>

接口描述：事故黑匣子信号列表一览，用于前端获得可被筛选的范围信号和状态信号

### <a id="1-15_1">请求</a>

| 请求 URL                                                                                 | Method |           Content-Type            | Character encoding |
| ---------------------------------------------------------------------------------------- | :----: | :-------------------------------: | :----------------: |
| http://<host>/uaes-accident-event-api/remote-monitor-accidentevent-view/condition/search |  GET   | application/x-www-form-urlencoded |       UTF-8        |

#### <a id="1-15_1_1">请求头</a>

| NO  |     Name      | 必须 |  类型  | 说明                                                                           |
| :-: | :-----------: | :--: | :----: | :----------------------------------------------------------------------------- |
|  1  | Authorization |  是  | String | 格式: "Bearer" + token <br/> Bearer 为固定字符串，token 为认证后获取的访问令牌 |

#### <a id="1-15_1_2">请求参数</a>

| NO  | Name | 必须 | 类型 | 说明 |
| :-: | :--- | :--: | :--: | :--- |
|     | 无   |      |      |      |

#### <a id="1-15_1_2">请求实例</a>

```http
GET /uaes-accident-event-api/remote-monitor-accidentevent-view/condition/search
Host: api-iot.uaes.com (ip:port或者域名)
Accept: application/json;charset=utf-8
```

### <a id="1-15_2">响应</a>

#### <a id="1-15_2_1">响应体结构</a>

| 字段    | 必须 |  类型  | 说明                                           |
| :------ | :--: | :----: | :--------------------------------------------- |
| msgCode |  是  | String | 错误编码。"10000"表示成功，大于“10000”表示出错 |
| msg     |  是  | String | 消息返回说明                                   |
| content |  是  | Object | 消息对象                                       |

- content 的结构

| 字段         | 必须 |  类型  | 说明         |
| :----------- | :--: | :----: | :----------- |
| scopeSignals |  是  | Object | 范围信号列表 |
| stateSignals |  是  | Object | 状态信号列表 |

- 每个信号单元的结构

| 字段       | 必须 | 类型   | 说明       |
| ---------- | ---- | ------ | ---------- |
| signalName | 是   | String | 信号中文名 |
| unit       | 否   | String | 信号单位   |

#### <a id="1-15_2_2">响应实例</a>

- ##### <a id="1-15_2_2_1">请求成功</a>

```http
HTTP/1.1 200 Ok
Content-Type: application/json;charset=UTF-8
Content-Length: 250

{
  "msgCode": "10000",
  "msg": "OK",
  "content":
    {
      "scopeSignals":
      {
         "engineSpeed":{signalName:"发动机转速", unit:"r/min"},
         "carSpeed":{signalName:"车速", unit:"km/h"},
         ...
       },
     "stateSignals":
      {
         "crashDuration":{signalName:"事故持续时间", unit:"s"},
         "ignitionCycleCrash":{signalName:"事故中点火次数"},
         ...
       }
     }
}
```

- ##### <a id="1-15_2_2_2">请求失败</a>

```http
HTTP/1.1 500 Internal Server Error
```

### <a id="1-15_3">说明</a>

根据数据库不断变化可筛选条件，前端根据此接口获取筛选条件

### vue-signature 签名组件

    import vueSignature from "vue-signature"
    Vue.use(vueSignature)
    <vueSignature ref="signature" :w="'560px'" :h="'300px'" :sigOption="signOption"></vueSignature>
    signOption: {
      penColor: "rgb(0, 0, 0)",
      backgroundColor: "rgb(255,255,255)"
    },
    保存： this.picURL = this.$refs.signature.save()
    清除： this.$refs.signature.clear();

### postcss-pxtorem px 转 rem

    .postcssrc.js
    module.exports = {
      "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "autoprefixer": {},
        "postcss-pxtorem": {
          rootValue: 100,
          propList: ["*"],
          selectorBlackList: ["body"]
        }
      }

}

### vconsole 开发工具

    import Vconsole from 'vconsole'
    let vConsole = new Vconsole()
    export default vConsole

### babel-polyfill es6-promise

    兼容IE浏览器
    在main.js里添加
    import 'babel-polyfill'
    import Es6Promise from 'es6-promise'
    require('es6-promise').polyfill()
    Es6Promise.polyfill()

    在store.js里添加
    import Es6Promise from 'es6-promise'
    Es6Promise.polyfill()

### clipboard 复制文本

    div id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target" @click="copyPolicyNo"
    import Clipboard from "clipboard"
    let clipboard = new Clipboard("#copyBtn")
    clipboard.on("success", function(e) {
        e.clearSelection()
    })

### vue-photo-preview 图片放大缩小预览

    import preview from 'vue-photo-preview'
    import 'vue-photo-preview/dist/skin.css'
    Vue.use(preview)
    <li v-for="(pic,index) in picList" :key="index"><img :src="pic.attachment" preview="1"></li>
    mounted() {
      let self = this;
      //异步插入的图片
      setTimeout(() => {
        self.$previewRefresh()
      }, 2000);
      //图片查看器打开后，打印本次查看器的实例（事件、方法、属性的示例）
      this.$preview.on('imageLoadComplete', (e, item) => {
        // console.log(this.$preview.self)
      })
    }

### qrcode.vue 生成二维码

    import QrcodeVue from 'qrcode.vue';
    components: {
        QrcodeVue
    },
    <qrcode-vue :value="jxc_seller_sn" :size="200" level="H" className='wf'></qrcode-vue>

### vue-marquee-ho 文字横向滚动

    import VueMarquee from 'vue-marquee-ho';
     components:{
      "vue-marquee": VueMarquee
    },
    <vue-marquee :content="msgScroll" class="two"  :showtwo="false" :speed="'slow'"></vue-marquee>
    this.msgScroll = msgList.join(' ')

### big.js 处理计算

    + 	plus
    - 	minus
    * 	times
    / 	div
    %	mod
    Big(0.00001).times(Big(0.000002)).toFixed()

### vue-awesome-swiper 焦点图

### better-scroll 滚动

### js-cookie

    import jsCookie from "js-cookie"
    jsCookie.get("bounsId")
    jsCookie.set("bounsId",{name:'123'})
