<template>
  <div class="app-container">
    <div class="wf-content">
      <div class="chart-content">
        <div class="charts" :style="{ height: chartHeight + 'px' }">
          <LineMarker id="linechart" height="100%" width="100%" :lineChart="lineChart"></LineMarker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineMarker from '@/components/Charts/LineMarker'
const data = [
  [0, 116],
  [1, 129],
  [2, 135],
  [3, 86],
  [4, 73],
  [5, 85],
  [6, 73],
  [7, 68],
  [8, 92],
  [9, 130],
  [10, 245],
  [11, 139],
  [12, 115],
  [13, 111],
  [14, 309],
  [15, 206],
  [16, 137],
  [17, 128],
  [18, 85],
]
const data1 = [
  [0, 8.79],
  [1, 11.04],
  [2, 2.86],
  [3, 2.86],
  [4, 6.37],
  [5, 7.28],
  [6, 8.96],
  [7, 8.98],
  [8, 3.05],
  [9, 3.05],
  [10, 5.42],
  [11, 5.13],
  [12, 1.64],
  [13, 3.2],
  [14, 4.37],
  [15, 4.27],
  [16, 1.68],
  [17, 1.71],
  [18, 11.31],
]

const data2 = [
  [0, 1],
  [1, 0],
  [2, 1],
  [3, 1],
  [4, 0],
  [5, 1],
  [6, 1],
  [7, 0],
  [8, 1],
  [9, 1],
  [10, 1],
  [11, 0],
  [12, 1],
  [13, 1],
  [14, 0],
  [15, 1],
  [16, 0],
  [17, 1],
  [18, 0],
]
const dateList = data.map(function (item) {
  return item[0]
})
const valueList = data.map(function (item) {
  return item[1]
})
const valueList1 = data1.map(function (item) {
  return item[1]
})

const valueList2 = data2.map(function (item) {
  return item[1]
})
export default {
  name: 'lookData',
  data() {
    return {
      chartHeight: 600,
      lineChart: {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 2,
          },
        ],
        title: [
          {
            top: '0',
            left: 'left',
            text: 'throttVlvPosi',
          },
          {
            top: '25%',
            left: 'left',
            text: 'altud',
          },
          {
            top: '50%',
            left: 'left',
            text: 'XXX',
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        xAxis: [
          {
            data: [
              '2022-02-01',
              '2022-02-02',
              '2022-02-03',
              '2022-02-04',
              '2022-02-05',
              '2022-02-06',
              '2022-02-07',
              '2022-02-08',
              '2022-02-09',
              '2022-02-10',
              '2022-02-11',
              '2022-02-12',
              '2022-02-13',
              '2022-02-14',
              '2022-02-15',
              '2022-02-16',
              '2022-02-17',
              '2022-02-18',
              '2022-02-19',
              '2022-02-20',
              '2022-02-21',
              '2022-02-22',
              '2022-02-23',
            ],
            boundaryGap: false,
            gridIndex: 0,
            axisLabel: {
              show: false,
            },
          },
          {
            data: [
              '2022-02-01',
              '2022-02-02',
              '2022-02-03',
              '2022-02-04',
              '2022-02-05',
              '2022-02-06',
              '2022-02-07',
              '2022-02-08',
              '2022-02-09',
              '2022-02-10',
              '2022-02-11',
              '2022-02-12',
              '2022-02-13',
              '2022-02-14',
              '2022-02-15',
              '2022-02-16',
              '2022-02-17',
              '2022-02-18',
              '2022-02-19',
              '2022-02-20',
              '2022-02-21',
              '2022-02-22',
              '2022-02-23',
            ],
            boundaryGap: false,
            gridIndex: 1,
            axisLabel: {
              show: false,
            },
          },
          {
            data: [
              '2022-02-01',
              '2022-02-02',
              '2022-02-03',
              '2022-02-04',
              '2022-02-05',
              '2022-02-06',
              '2022-02-07',
              '2022-02-08',
              '2022-02-09',
              '2022-02-10',
              '2022-02-11',
              '2022-02-12',
              '2022-02-13',
              '2022-02-14',
              '2022-02-15',
              '2022-02-16',
              '2022-02-17',
              '2022-02-18',
            ],
            gridIndex: 2,
            boundaryGap: false,
            axisLabel: {
              show: true,
            },
          },
        ],
        yAxis: [
          { gridIndex: 0 },
          {
            gridIndex: 1,
          },
          {
            gridIndex: 2,
          },
        ],
        grid: [
          { left: '10%', top: '0%', width: '90%', height: '31%' },
          { left: '10%', top: '33%', width: '90%', height: '31%' },
          { left: '10%', top: '66%', width: '90%', height: '31%' },
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: valueList1,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              normal: {
                color: '#768dd1', // 折线线条颜色
              },
            },
          },
          {
            type: 'line',
            showSymbol: false,
            data: valueList,
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle: {
              normal: {
                color: '#768dd1',
              },
            },
          },
          {
            type: 'line',
            showSymbol: false,
            data: valueList2,
            step: 'start',
            xAxisIndex: 2,
            yAxisIndex: 2,
            lineStyle: {
              normal: {
                color: '#768dd1',
              },
            },
          },
        ],
      },
    }
  },
  components: {
    LineMarker,
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
  },
}
</script>
<style lang="scss" scoped>
.chart-content {
  background-color: #fff;
  padding: 20px;
  .charts {
    position: relative;
    width: 100%;
    height: 600px;
  }
}
</style>
