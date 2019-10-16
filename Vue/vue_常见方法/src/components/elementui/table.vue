<template>
<div class="table">
  <el-table :data="tabelData" style="width: 100%" stripe>
    <el-table-column prop="name" width="200">
    </el-table-column>
    <el-table-column prop="age">

    </el-table-column>
  </el-table>

  <!--
  table 参数
  stripe        斑马线
  border        带竖线边框
  height="250"  固定表头
  max-height    最大高度超出有滚动条
  rowClassName  属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
  highlight-current-row 行单选
  default-sort  默认排序
  show-summary  合计

  table 事件
  current-change 当表格的当前行发生变化的时候会触发该事件

  table 方法
  clearSelection(selection) 清空用户选择
  toggleRowSelection(row,selected)  切换选择
  setCurrentRow(row)  用于单选表格，设定某一行为选中，如果不加参数，则会取消目前高亮状态


  column 参数
  type      index/selection/expend  排序/多选/展开按钮
  prop      对应对象中的健名即可填入数据
  fixed     固定列 left/right
  label     定义表格的列名
  width     定义列宽
  show-overflow-tooltip 当内容过长被隐藏时显示 tooltip
  -->
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tabelData:[{
          name:"123",
          age:'sadf'
        }]
      }
    }
  }
</script>

<style>

</style>
