<template>
  <div>
    <a href="https://blog.csdn.net/a1021397257/article/details/115210822"
      >表格树参考地址</a
    >
    <el-button @click="search">搜索</el-button>
    <el-table
      :data="tableData1"
      ref="wftable"
      @expand-change="expandUpdate"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          hasChildren: true,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          hasChildren: true,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "lisi",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          hasChildren: true,
        },
      ],
      rowCaches: {}, // 定义缓存行数据的属性字段
    }
  },
  methods: {
    load(row, treeNode, resolve) {
      this.rowCaches[row.id] = { row, treeNode, resolve, first: true } //  在load的时候需要把当前行相关的数据缓存起来
      setTimeout(() => {
        resolve([
          {
            id: new Date().getTime() / 2,
            date: "2016-05-011",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            hasChildren: true,
          },
          {
            id: new Date().getTime() / 3,
            date: "2016-05-012",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            hasChildren: true,
          },
        ])
      }, 1000)
    },
    expandUpdate(row, open) {
      // 在菜单打开和收缩的时候会触发这个函数,如果是第一次打开不需要去加载数据,如果是收缩的话则把子级缓存数据清空还原,如果是第二次及以后展开的话则触发resolve去加载数据
      let obj = this.rowCaches[row.id]
      if (obj.first) {
        obj.first = false
      } else {
        if (!open) {
          this.$set(
            this.$refs.wftable.$refs.tableHeader.store.states.lazyTreeNodeMap,
            row.id,
            []
          )
          this.$refs.wftable.$refs.tableHeader.store.states.treeData[
            row.id
          ].loaded = false
        } else {
          obj.resolve(row)
        }
      }
    },
    search() {
      //  在查询列表的时候,不会把已经展开的子级列表收起来,所以需要在查询的时候把展开的菜单收缩起来
      for (let key in this.rowCaches) {
        this.$refs.wftable.toggleRowExpansion(this.rowCaches[key].row, false)
        // this.getList()
      }
    },
  },
}
</script>
