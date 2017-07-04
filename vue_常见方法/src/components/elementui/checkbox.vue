<style>
</style>
<template>
  <div class="mk">
      <h2>多选</h2>
      <el-table :data="tableData" border style="width: 100%" ref="wf">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="排序" style="text-align: center" width="100"></el-table-column>
        <el-table-column prop="date" label="日期" width="200" ></el-table-column>
        <el-table-column prop="name" label="姓名" width="400"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-button @click="delSelection()">取消选择</el-button>
    <el-button @click="delSelection(even)">取消选择</el-button>
    <div>{{even}}</div>
  </div>
</template>
<script>
  export default {
    methods: {
      delSelection(rows){
        if (rows) {
          rows.forEach((v) => {
            this.$refs.wf.toggleRowSelection(v)
          })
        }
        else {
          this.$refs.wf.clearSelection()
        }
      }
    },
    computed: {
      even(){
        var arr = []
        for (let [i, v] of this.tableData.entries()) {
          if (i % 2 == 0) { //取偶数的值
            arr.push(v)
          }
        }
        return arr
      }
    },
    data(){
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

