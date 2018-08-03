import Vue from "vue"
import ECharts from "vue-echarts/components/ECharts"

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/bar"
// import "echarts/lib/component/tooltip"
import "echarts/lib/chart/line"
import "echarts/lib/component/polar"
// register component to use
Vue.component("chart", ECharts)
