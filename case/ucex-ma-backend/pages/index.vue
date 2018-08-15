<template>
  <div class="page-index">
    <i-row :gutter="16" class="mb15">
      <i-col span="6">
        <div class="t-list">
          <h3 class="title">当前总资产（包含子账户）</h3>
          <div class="count">¥ 126,560</div>
          <div class="zf">昨日资产增幅<em class="fcred plr8">+12,423</em>USTD</div>
        </div>
      </i-col>
      <i-col span="6">
        <div class="t-list">
          <h3 class="title">24小时成交量</h3>
          <div class="count">¥ 126,560</div>
          <div class="zf">近7小时的成交量 12,423</div>
        </div>
      </i-col>
      <i-col span="6">
        <div class="t-list">
          <h3 class="title">当前总挂单数（所有子账户）</h3>
          <div class="count">1456</div>
          <div class="zf">今日挂单数 76</div>
        </div>
      </i-col>
      <i-col span="6">
        <div class="t-list">
          <h3 class="title">近7天新增用户数</h3>
          <div class="count">50</div>
          <div class="zf">用户总数 12,423</div>
        </div>
      </i-col>
    </i-row>
    <div class="i-main">
      <h3 class="title">触发预警线的用户</h3>
      <div class="tb">
        <div class="t-chart">
          <u-pie :pie="pie"/>
        </div>
        <div class="t-table">
          <i-table :columns="columns1" :data="data1" class="mb40"/>
          <div class="fy"><i-page :total="40" show-elevator show-sizer />
          </div>
        </div>
      </div>
    </div>

    <div class="i-main">
      <h3 class="title">近7天资产趋势</h3>
      <div class="tb">
        <div class="t-chart t-bar">
          <h4 class="tit">销售额趋势</h4>
          <u-bar :bar="bar"/>
        </div>
        <div class="t-table">
          <h4 class="tit">用户资产排名</h4>
          <ul class="paiming">
            <li><span class="first">1</span><span>asdfgh12</span><span>¥ 323,234</span></li>
            <li><span class="first">2</span><span>asdfgh12</span><span>¥ 323,234</span></li>
            <li><span class="first">3</span><span>asdfgh12</span><span>¥ 323,234</span></li>
            <li><span class="first">4</span><span>asdfgh12</span><span>¥ 323,234</span></li>
            <li><span class="first">5</span><span>asdfgh12</span><span>¥ 323,234</span></li>
            <li><span class="first">6</span><span>asdfgh12</span><span>¥ 323,234</span></li>
            <li><span class="first">7</span><span>asdfgh12</span><span>¥ 323,234</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="i-main hbzc">
      <h3 class="title">货币资产分布</h3>
      <div class="tb">
        <div class="t-chart">
          <u-pie :pie="pie2" :style="{width:'325px',height:'250px'}" @mouseover="mouseoverHandler" />
        </div>
        <div class="t-table">
          <i-table :columns="columns2" :data="data2"/>

        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import { http, queryApp } from "Api"
import UPie from "@/components/chart/Upie"
import UBar from "@/components/chart/UBar"
export default {
  components: {
    http,
    UPie,
    UBar
  },
  // asyncData({ route }) {
  //   console.log(route)
  //   return {
  //     test: route
  //   }
  // },
  data() {
    return {
      columns1: [
        {
          title: "触发时间",
          key: "date"
        },
        {
          title: "用户账号",
          key: "name"
        },
        {
          title: "当前资产",
          key: "age"
        },
        {
          title: "预警线",
          key: "address",
          className: "demo-table-info-column"
        }
      ],
      data1: [
        {
          date: "2016-10-03 07:50:08",
          name: "John Brown",
          age: "26.00万",
          address: "34.00万"
        },
        {
          date: "2016-10-03 07:50:08",
          name: "John Brown",
          age: "26.00万",
          address: "34.00万"
        },
        {
          date: "2016-10-03 07:50:08",
          name: "John Brown",
          age: "26.00万",
          address: "34.00万"
        },
        {
          date: "2016-10-03 07:50:08",
          name: "John Brown",
          age: "26.00万",
          address: "34.00万"
        },
        {
          date: "2016-10-03 07:50:08",
          name: "John Brown",
          age: "26.00万",
          address: "34.00万"
        }
      ],
      columns2: [
        {
          title: " ",
          key: "title",
          className: "demo-table-info-column2"
        },
        {
          title: "占比",
          key: "zb"
        },
        {
          title: "数量",
          key: "count"
        },
        {
          title: "单价",
          key: "sale"
        },
        {
          title: "总额",
          key: "all"
        }
      ],
      data2: [
        {
          title: "BTC 比特币",
          zb: "36%",
          count: "256365",
          sale: "$ 7899",
          all: "52636565"
        },
        {
          title: "ETF 以太坊",
          zb: "36%",
          count: "256365",
          sale: "$ 7899",
          all: "52636565"
        },
        {
          title: "LTC 莱特币",
          zb: "36%",
          count: "256365",
          sale: "$ 7899",
          all: "52636565"
        },
        {
          title: "USDT 泰达币",
          zb: "36%",
          count: "256365",
          sale: "$ 7899",
          all: "52636565"
        },
        {
          title: "EOS 柚子",
          zb: "36%",
          count: "256365",
          sale: "$ 7899",
          all: "52636565"
        },
        {
          title: "DCC Distr…",
          zb: "36%",
          count: "256365",
          sale: "$ 7899",
          all: "52636565"
        }
      ]
    }
  },
  computed: {
    pie() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: ["#EE714A", "#ccc"],
        textStyle: {
          color: '#EE714A'
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },
            data: [
              { value: 30, name: "触发预警比例\n{a}" },
              { value: 70, name: "不触发" }
            ]
          }
        ]
      }
    },
    bar() {
      return {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    },
    pie2() {
      return {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["1", "2", "3", "4", "5", "6"]
        },
        color: [
          "#8543E0",
          "#509AF0",
          "#13C2C2",
          "#99D576",
          "#FACC14",
          "#EE714A"
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            data: [
              { value: 32, name: "2" },
              { value: 38, name: "3" },
              { value: 30, name: "8" },
              { value: 30, name: "4" },
              { value: 30, name: "85" },
              { value: 30, name: "866" }
            ]
          }
        ]
      }
    }
  },
  methods: {
    mouseoverHandler() {},
    showName() {
      console.log(123)
    }
  }
}
</script>
<style lang="less">
.ivu-table td.demo-table-info-column {
  color: #ee714a;
}
.hbzc .ivu-table td.demo-table-info-column2 {
  position: relative;
  padding-left: 15px;
}
.hbzc .ivu-table td.demo-table-info-column2:after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  position: absolute;
  left: 15px;
  top: 20px;
  background-color: #509af0;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.hbzc .ivu-table .ivu-table-row:nth-child(2) .demo-table-info-column2:after {
  background-color: #cc4545;
}
.hbzc .ivu-table .ivu-table-row:nth-child(3) .demo-table-info-column2:after {
  background-color: #99d576;
}
.hbzc .ivu-table .ivu-table-row:nth-child(4) .demo-table-info-column2:after {
  background-color: #fad337;
}
.hbzc .ivu-table .ivu-table-row:nth-child(5) .demo-table-info-column2:after {
  background-color: #f2637b;
}
.hbzc .ivu-table .ivu-table-row:nth-child(6) .demo-table-info-column2:after {
  background-color: #975fe4;
}

.page-index {
  margin-top: 15px;
  .t-list {
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: #fff;
    padding: 20px 15px 15px 20px;
    .title {
      font-size: 14px;
      height: 16px;
      line-height: 16px;
      color: #adadad;
      margin-bottom: 15px;
      background: url("~assets/image/gth.png") right center no-repeat;
    }
    .count {
      font-size: 28px;
      color: #5d5d5c;
      padding-bottom: 15px;
      border-bottom: 1px solid #e9edf1;
      margin-bottom: 10px;
    }
    .zf {
      font-size: 14px;
      color: #5d5d5c;
      em {
        color: #99d576;
      }
      em.fcred {
        color: red;
      }
    }
  }
  .i-main {
    padding: 20px 25px 25px;
    background-color: #fff;
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      color: #5d5d5c;
      padding-bottom: 20px;
      border-bottom: 1px solid #e9edf1;
      margin-bottom: 25px;
    }
    .tb {
      display: -webkit-flex;
      display: -moz-flex;
      display: flex;
      .t-chart {
        -webkit-flex: 0 0 325px;
        -moz-flex: 0 0 325px;
        flex: 0 0 325px;
        width: 325px;
      }
      .t-bar {
        -webkit-flex: 0 0 620px;
        -moz-flex: 0 0 620px;
        flex: 0 0 620px;
        width: 620px;
      }
      .t-table {
        -webkit-flex: 1;
        -moz-flex: 1;
        flex: 1;
        overflow: hidden;
        .fy {
          text-align: right;
          height: 38px;
        }
        .paiming {
          margin-top: 30px;
          li {
            display: -webkit-flex;
            display: -moz-flex;
            display: flex;
            height: 20px;
            line-height: 20px;
            margin-bottom: 19px;
            span {
              -webkit-flex: 1;
              -moz-flex: 1;
              flex: 1;
              font-size: 14px;
              color: #5d5d5c;
            }
            .first {
              background-color: #eff2f5;
              display: inline-block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              font-size: 12px;
              color: #5d5d5c;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              -webkit-flex: 0 0 20px;
              -moz-flex: 0 0 20px;
              flex: 0 0 20px;
              width: 20px;
              margin-right: 20px;
            }
          }
          li:nth-child(1) {
            .first {
              background-color: #509af0;
              color: #fff;
            }
          }
          li:nth-child(2) {
            .first {
              background-color: #509af0;
              opacity: 0.8;
              color: #fff;
            }
          }
          li:nth-child(3) {
            .first {
              background-color: #509af0;
              opacity: 0.6;
              color: #fff;
            }
          }
        }
      }
      .tit {
        font-size: 14px;
        color: #5d5d5c;
      }
    }
  }
  .i-main:last-child {
    margin-bottom: 0;
  }
}
</style>
