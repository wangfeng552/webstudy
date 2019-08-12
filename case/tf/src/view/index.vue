<template>
<div class="layout">
  <!-- 顶部 -->
  <div class="header">
    <img src="~@/assets/images/banner.png" alt="">
    <div class="weather">
      <span class="date">2017-07-25</span>
      <span class="date">12:34:52</span>
      <span class="date">星期五</span>
      <span class="date">多云</span>
    </div>
  </div>
  <!-- 主模块 -->
  <div class="main clear">
    <div class="m-l">
      <!-- 活动数量 -->
      <div class="column">
        <div class="column-main amount clear">
          <div class="jb-line"></div>
          <div class="w162">
            <h2 class="title">活动数量</h2>
            <div class="tuxing">
              <div class="circle-main">
                <div class="percentage">50%</div>
                <div class="wave"></div>
                <!-- top -50px 到50px -->
                <div class="wave-mask" style="top: 20px"></div>
              </div>
            </div>
            <div class="text">度假区活动占比</div>
          </div>
          <div class="w276">
            <div class="bz-top">
              <div class="bz-list">
                <span class="b-sekuai"></span>
                <span class="text">度假区</span>
              </div>
              <div class="bz-list">
                <span class="b-sekuai pd-sekuai"></span>
                <span class="text">浦东新区</span>
              </div>
            </div>
            <div class="bz-main">
              <div class="area-list">
                <div class="person">1000人以下</div>
                <div class="person-bfb">
                  <div>50</div>
                  <div class="p-zhu">
                    <div class="number">10%</div>
                    <div class="green"></div>

                  </div>
                  <div>227</div>
                </div>
              </div>
              <div class="area-list">
                <div class="person">1000人以下</div>
                <div class="person-bfb">
                  <div>50</div>
                  <div class="p-zhu">
                    <div class="number">10%</div>
                    <div class="green"></div>

                  </div>
                  <div>227</div>
                </div>
              </div>
              <div class="area-list">
                <div class="person">1000人以下</div>
                <div class="person-bfb">
                  <div>50</div>
                  <div class="p-zhu">
                    <div class="number">10%</div>
                    <div class="green"></div>

                  </div>
                  <div>227</div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
      <!-- 度假区 -->
      <div class="column">
        <div class="column-main">
          <h2 class="title">度假区区域数据</h2>
          <div class="echart">
            <chart class="zsy" :options="dujia"></chart>
          </div>
        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
      <!-- 活动类别 -->
      <div class="column">
        <div class="column-main">
          <h2 class="title">活动类别</h2>
          <div class="echart">
            <chart class="zsy" :options="huodong"></chart>
          </div>
        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
      <!-- 企业名称 -->
      <div class="column">
        <div class="column-main prise-name">
          <div class="title2">
            <ul>
              <li class="fl1"></li>
              <li class="fl2">企业名称</li>
              <li class="fl3">活动数量</li>
              <li class="fl4">信用等级</li>
            </ul>
          </div>
          <div class="prise-main">
            <div class="prise-list" v-for="(v,i) in 5">
              <div class="fl1">1</div>
              <div class="fl2">浦东新区上岛咖啡就拉水电</div>
              <div class="fl3">21</div>
              <div class="fl4">A</div>
            </div>

          </div>

        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="m-c">
      <div class="mapmain">
        <div class="column-map">
          <div class="map-top-bg"></div>

        </div>

      </div>
      <div class="column column-center">
        <div class="column-main prise-name">
          <div class="title2">
            <ul>
              <li class="fl1"></li>
              <li class="fl2">活动名称</li>
              <li class="fl3">人数</li>
              <li class="fl4">状态</li>
            </ul>
          </div>
          <div class="prise-main">
            <div class="prise-list" v-for="(v,i) in 5">
              <div class="fl1">1</div>
              <div class="fl2">浦东新区上岛咖啡就拉水电</div>
              <div class="fl3">21人</div>
              <div class="fl4 act">进行中</div>
            </div>

          </div>

        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="m-r">
      <!-- 动态监管 -->
      <div class="column column-176">
        <div class="column-main">
          <h2 class="title">动态监管</h2>
          <div class="echart"></div>
        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
      <!-- 风险监管 -->
      <div class="column">
        <div class="column-main">
          <h2 class="title">风险监管</h2>
          <div class="echart"></div>
        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
      <!-- 信用监管 -->
      <div class="column">
        <div class="column-main">
          <h2 class="title">信用监管</h2>
          <div class="echart"></div>
        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>
      <!-- 分类监管 -->
      <div class="column column-176">
        <div class="column-main">
          <h2 class="title">风险监管</h2>
          <div class="echart"></div>
        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>

      <!-- 平台 -->
      <div class="column column-71">
        <div class="column-main pingtai">
          <div class="jb"></div>
          <div class="ptname">度假区大型活动申请平台>></div>
          <div class="ptname">度假区大型活动审批平台>></div>

        </div>
        <div class="topliner"></div>
        <div class="bian tl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian tr-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian bl-jiao">
          <i class="xiejiao"></i>
        </div>
        <div class="bian br-jiao">
          <i class="xiejiao"></i>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      dujia: {
        color: ['#00a2ff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '6%',
          top: '10%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['迪斯尼', '购物村', '星愿湖', '生态园', '迪斯尼'],
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#00a2ff',
              width: 1, //这里是为了突出显示加上的
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#00a2ff',
              width: 1, //这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#0c448a'],
              width: 1,
              type: 'solid'
            }
          }

        }],
        series: [{
          name: '直接访问',
          type: 'bar',
          barWidth: '50%',
          data: [10, 52, 200, 60, 90]
        }]
      },
      huodong: {
       title: {
          x: 'center'
        },
        color:['#00a2ff', '#1ab545','#a136e5','#e23ca9','#f19917'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          textStyle:{
            color:'#0abfe6'
          },
          right: '20',
          top:'10',
          data: ['体育赛事', '节庆旅游', '展览展会', '文艺演出', '影视娱乐']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          center: ['35%', '50%'],
          data: [{
              value: 335,
              name: '体育赛事'
            },
            {
              value: 310,
              name: '节庆旅游'
            },
            {
              value: 234,
              name: '展览展会'
            },
            {
              value: 135,
              name: '文艺演出'
            },
            {
              value: 1548,
              name: '影视娱乐'
            }
          ],
            label:{
            normal:{
              position:'inside',
              color:'#fff',
              formatter:'{d}%',
              fontSize:'14'
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },
  methods: {
    show() {
      alert(123)
    }
  }
};
</script>

<style lang="less">
.layout {
  background-color: #00134f;

  .header {
    font-size: 0;
    margin-bottom: 29px;
    position: relative;

    .weather {
      position: absolute;
      right: 32px;
      top: 40px;

      .date {
        font-size: 20px;
        font-weight: 700;
        display: inline-block;
        margin-left: 20px;
        color: #24ccff;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#b0f9ff), to(#24ccff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

}

.main {
  padding: 0 17px 22px;

  /* 左边模块 */
  .m-l {
    width: 446px;
    float: left;

  }

  /* 中间模块 */
  .m-c {
    width: 940px;
    margin: 0 27px;
    float: left;
  }

  /* 右边模块 */
  .m-r {
    width: 446px;
    float: left;
  }
}

// 地图容器需添加切角样式
.mapmain {
  margin-bottom: 20px;

  .column-map {
    width: 940px;
    height: 700px;
    background: #1f378b;
    background: linear-gradient(135deg, transparent 14px, #1f378b 0) top left,
      linear-gradient(-135deg, transparent 14px, #1f378b 0) top right,
      linear-gradient(-45deg, transparent 14px, #1f378b 0) bottom right,
      linear-gradient(45deg, transparent 14px, #1f378b 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    position: relative;
    font-size: 0;
    overflow: hidden;

    .map-top-bg {
      pointer-events: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 940px;
      height: 701px;
      background: url('~@/assets/images/map_bg.png') 0 0 no-repeat;
      background-size: 100%;
    }
  }
}

// 企业名称
.prise-name {
  .fl1 {
    width: 40px;
    text-align: center;
  }

  .fl2 {
    width: 218px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fl3 {
    width: 90px;
    text-align: center;
  }

  .fl4 {
    width: 90px;
    text-align: center;
  }

  .title2 {
    background-color: #1a4ba4;
    font-size: 16px;
    height: 37px;
    border-bottom: 1px solid #0263be;
    background: linear-gradient(135deg, transparent 8px, #1a4ba4 0) top left,
      linear-gradient(-135deg, transparent 8px, #1a4ba4 0) top right;
    background-size: 50% 100%;
    background-repeat: no-repeat;

    li {
      height: 37px;
      line-height: 37px;
      float: left;
      color: #0abfe6;
    }
  }

  .prise-main {
    background-color: #062466;
    font-size: 16px;
    height: 180px;
    background: linear-gradient(-45deg, transparent 8px, #062466 0) bottom right,
      linear-gradient(45deg, transparent 8px, #062466 0) bottom left;
    background-size: 50% 100%;
    background-repeat: no-repeat;

    .prise-list {
      height: 36px;
      line-height: 36px;

      >div {
        float: left;
        color: #0abfe6;

      }

      .fl4 {
        color: #ffbc41;
      }
    }

    .prise-list:nth-child(2n) {
      background-color: #0c3078;
    }

  }

}

/* 切角矩形 */
.column {
  width: 440px;
  height: 220px;
  margin: 0 auto 20px;
  background-color: #0263be;
  background: linear-gradient(135deg, transparent 8px, #0263be 0) top left,
    linear-gradient(-135deg, transparent 8px, #0263be 0) top right,
    linear-gradient(-45deg, transparent 8px, #0263be 0) bottom right,
    linear-gradient(45deg, transparent 8px, #0263be 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  position: relative;
  font-size: 0;

  .column-main {
    width: 438px;
    height: 218px;
    background-color: #0c357e;
    background: linear-gradient(135deg, transparent 8px, #0c357e 0) top left,
      linear-gradient(-135deg, transparent 8px, #0c357e 0) top right,
      linear-gradient(-45deg, transparent 8px, #0c357e 0) bottom right,
      linear-gradient(45deg, transparent 8px, #0c357e 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    position: absolute;
    left: 1px;
    top: 1px;

    .title {
      font-size: 18px;
      font-weight: 700;
      color: #ffb233;
      margin-top: 16px;
      height: 24px;
      padding-left: 17px;
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#ffd76b), to(#ffb233));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .echart {
      height: 178px;
      font-size: 14px;
    }

    .zsy {
      width: 100%;
      height: 100%;
    }

  }

  .topliner {
    height: 1px;
    width: 438px;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(90deg, transparent, #13def4, transparent)
  }

  .bian {
    position: absolute;
  }

  .br-jiao {
    right: 0;
    bottom: 0;
  }

  .br-jiao:before {
    position: absolute;
    right: 10px;
    bottom: -3px;
    content: "";
    display: block;
    height: 1px;
    width: 30px;
    background-color: #13e2f6;
  }

  .br-jiao:after {
    position: absolute;
    right: -3px;
    bottom: 10px;
    content: "";
    display: block;
    height: 30px;
    width: 1px;
    background-color: #13e2f6;
  }

  .br-jiao .xiejiao {
    display: block;
    width: 1px;
    height: 18px;
    background-color: #13e2f6;
    position: absolute;
    left: -4px;
    bottom: -5px;
    transform: rotate(45deg);
  }

  .tr-jiao {
    right: 0;
    top: 0;
  }

  .tr-jiao:before {
    position: absolute;
    right: 10px;
    top: -3px;
    content: "";
    display: block;
    height: 1px;
    width: 30px;
    background-color: #13e2f6;
  }

  .tr-jiao:after {
    position: absolute;
    right: -3px;
    top: 10px;
    content: "";
    display: block;
    height: 30px;
    width: 1px;
    background-color: #13e2f6;
  }

  .tr-jiao .xiejiao {
    display: block;
    width: 1px;
    height: 18px;
    background-color: #13e2f6;
    position: absolute;
    left: -4px;
    top: -5px;
    transform: rotate(135deg);
  }

  .bl-jiao {
    left: 0;
    bottom: 0;
  }

  .bl-jiao:before {
    position: absolute;
    left: 10px;
    bottom: -3px;
    content: "";
    display: block;
    height: 1px;
    width: 30px;
    background-color: #13e2f6;
  }

  .bl-jiao:after {
    position: absolute;
    left: -3px;
    bottom: 10px;
    content: "";
    display: block;
    height: 30px;
    width: 1px;
    background-color: #13e2f6;
  }

  .bl-jiao .xiejiao {
    display: block;
    width: 1px;
    height: 18px;
    background-color: #13e2f6;
    position: absolute;
    left: 3px;
    bottom: -5px;
    transform: rotate(-45deg);
  }

  .tl-jiao {
    left: 0;
    top: 0;
  }

  .tl-jiao:before {
    position: absolute;
    left: 10px;
    top: -3px;
    content: "";
    display: block;
    height: 1px;
    width: 30px;
    background-color: #13e2f6;
  }

  .tl-jiao:after {
    position: absolute;
    left: -3px;
    top: 10px;
    content: "";
    display: block;
    height: 30px;
    width: 1px;
    background-color: #13e2f6;
  }

  .tl-jiao .xiejiao {
    display: block;
    width: 1px;
    height: 18px;
    background-color: #13e2f6;
    position: absolute;
    left: 3px;
    top: -5px;
    transform: rotate(-135deg);
  }
}

.column-center {
  width: 934px;

  .column-main {
    width: 932px;

    .fl1 {
      width: 40px;
      text-align: center;
    }

    .fl2 {
      width: 612px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .fl3 {
      width: 140px;
      text-align: left;
    }

    .fl4 {
      width: 140px;
      text-align: left;
    }

    .act {
      color: #ffbc41;
    }
  }
}

.column-176 {
  height: 174px;

  .column-main {
    height: 172px;
  }
}

.column-71 {
  height: 72px;

  .column-main {
    height: 70px;
  }
}

// 平台
.pingtai{
  position: relative;
  .jb{
    width: 1px;
    height: 70px;
    position: absolute;
    left: 50%;
     background: linear-gradient(0, transparent, #13def4, transparent)
  }
  .ptname{
    float: left;
      padding-left: 10px;
    width: 50%;
    height: 70px;
    line-height: 70px;
    font-size: 15px;
    color: #24ccff;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#b0f9ff), to(#24ccff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

  }

  
}

/* 活动数量 */
.amount .jb-line {
  position: absolute;
  left: 162px;
  top: 0;
  width: 1px;
  height: 216px;
  background: url('~@/assets/images/line.png') 0 0 no-repeat;
}

.amount .w162 {
  width: 162px;
  float: left;
}

.amount .w162 .tuxing {
  padding-top: 20px;
  margin-bottom: 10px;
  position: relative;
}

.amount .w162 .circle-main {
  width: 105px;
  height: 105px;
  margin: 0 auto;
  border-radius: 50%;
  border: 4px solid #00a2ff;
  background-color: #264783;
  /* transform: translate(-50%, -50%); */
  padding: 4px;
  overflow: hidden;
  position: relative;
}

.amount .w162 .percentage {
  color: #fff;
  font-size: 18px;
  text-align: center;
  width: 105px;
  height: 30px;
  position: absolute;
  left: 0;
  top: 30px;
  z-index: 21;

}

.amount .w162 .wave {
  position: relative;
  left: 0;
  top: 0;
  width: 90px;
  height: 90px;
  background-color: #00a2ff;
  border-radius: 50%;
}

.amount .w162 .wave-mask {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0px;
  left: 50%;
  border-radius: 40%;
  background-color: #264783;
  transform: translate(-50%, -70%) rotate(0);
  animation: toRotate 10s linear -5s infinite;
  z-index: 20;
}

.amount .w162 .text {
  font-size: 16px;
  color: #0abfe6;
  text-align: center;
}

@keyframes toRotate {
  50% {
    transform: translate(-50%, -70%) rotate(180deg);
  }

  100% {
    tansform: translate(-50%, -70%) rotate(360deg)
  }
}

.amount .w276 {
  width: 276px;
  float: left;
}

.amount .w276 .bz-top {
  padding: 15px 0 0 40px;
  height: 50px;

}

.amount .w276 .bz-top .bz-list {
  float: left;
  margin-right: 23px;
  line-height: 24px;
}

.amount .w276 .bz-top .bz-list .b-sekuai {
  display: inline-block;
  width: 18px;
  height: 6px;
  background-color: #00a2ff;
  margin-right: 8px;
  position: relative;
  top: -3px;
}

.amount .w276 .bz-top .bz-list .pd-sekuai {
  background-color: #19af43;
}

.amount .w276 .bz-top .bz-list .text {
  color: #0abfe6;
  font-size: 14px;
}

.amount .w276 .bz-main {
  padding: 0 20px 0 14px;
}

.amount .w276 .bz-main .area-list {
  font-size: 14px;
  margin-bottom: 15px;
}

.amount .w276 .bz-main .area-list .person {
  color: #fff;
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.amount .w276 .bz-main .area-list .person-bfb {
  height: 20px;
}

.amount .w276 .bz-main .area-list .person-bfb>div {
  float: left;
  color: #0abfe6;
  width: 31px;
  height: 20px;
}

.amount .w276 .bz-main .area-list .person-bfb .p-zhu {
  width: 170px;
  background-color: #00a2ff;
  margin-right: 10px;
  position: relative;

}

.amount .w276 .bz-main .area-list .person-bfb .p-zhu .green {
  position: absolute;
  width: 10%;
  height: 20px;
  right: 0;
  top: 0;
  background-color: #19af43;
}

.amount .w276 .bz-main .area-list .person-bfb .p-zhu .number {
  text-align: center;
  color: #000;
  font-weight: 700;
}
</style>
