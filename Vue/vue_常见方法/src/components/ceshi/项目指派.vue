<template>
  <div class="pop_xmzp_chooseperson">

    <div v-for="(v,i) in gridData">
      <button @click="showPeopleChoose(i)">点击 </button>
      <span>{{v.showname}}</span>
      <button v-if="v.showname">保存</button>
    </div>

    <el-dialog title="人员选择" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <el-table :data="gridData" max-height="320" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="address" label="职能"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePerson">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        dialogVisible: false,
        currentRow:'',
        count:'',
        gridData: [{
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:'123'
        }, {
          name: 'dsfg',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '规范',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '萨阿迪',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '工会发的',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '玩儿',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: 'dsfg',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '规范',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '萨阿迪',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '工会发的',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }, {
          name: '玩儿',
          address: '上海市普陀区金沙江路 1518 弄',
          showname:''
        }],
      }
    },
    methods: {
      // 点击更换人员
      showPeopleChoose(i){
        this.dialogVisible = true
        this.count = i
      },
      // X关闭
      handleClose(){
        this.dialogVisible = false
      },
      // 选择单行数据时使用色块表示
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      // 确定
      savePerson(){
        this.dialogVisible = false
        this.gridData[this.count].showname= this.currentRow.name
      }
    }
  }
</script>
<style lang="scss">
</style>
