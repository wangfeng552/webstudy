<template>
  <div>
    <div>npm install el-table-infinite-scroll</div>
    <el-table
      :data="collectDataList"
      v-el-table-infinite-scroll="loadMoreData"
      infinite-scroll-disabled="disabled"
      height="600px"
    >
      <el-table-column prop="id" label="日期" width="180"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import elTableInfiniteScroll from 'el-table-infinite-scroll'
export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll,
  },
  data() {
    return {
      arrIndex: 0,
      dataItems: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
        { id: 19 },
        { id: 20 },
        { id: 21 },
        { id: 22 },
        { id: 23 },
        { id: 24 },
        { id: 25 },
        { id: 26 },
        { id: 27 },
        { id: 28 },
        { id: 29 },
        { id: 30 },
        { id: 31 },
        { id: 32 },
        { id: 33 },
        { id: 34 },
        { id: 35 },
        { id: 36 },
        { id: 37 },
        { id: 38 },
        { id: 39 },
      ],
      collectDataList: [],
      loading: false,
      subsectionArr: [], // 分段数组
    }
  },
  created() {
    // 将数组切割成每份50个元素
    var arrLen = 50
    for (var i = 0; i < this.dataItems.length; i += arrLen) {
      console.log(i)
      this.subsectionArr.push(this.dataItems.slice(i, i + arrLen))
    }
  },
  methods: {
    loadMoreData() {
      if (!this.noMore) {
        this.loading = true
        setTimeout(() => {
          this.collectDataList = this.collectDataList.concat(this.subsectionArr[this.arrIndex])
          this.loading = false
          this.arrIndex++
          if (this.arrIndex >= this.dataItems.length / 50) {
            this.$message.error('已经到底了')
          }
        }, 1000)
      }
    },
  },
  computed: {
    noMore() {
      return this.arrIndex >= this.dataItems.length / 50
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
}
</script>
