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
