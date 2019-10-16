<template>
  <div class="assignment">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item>线上项目指派</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xsx_list_none" v-if="total_count==0"></div>
    <div v-else>
      <div class="xsxm_list">
        <table class="tableList2">
         <tr>
           <th>项目名称</th>
           <th>项目编号</th>
           <th>选择负责人</th>
         </tr>
         <tr v-for="(v,i) in products">
            <td>
              <a class="listItem listItem2" :title="v.service">{{v.service}}</a>
              <a class="small small3" :title="v.corp_name">{{v.corp_name}}</a>
            </td>
            <td>
              <div class="online" v-if="v.source == 'online'"><i style="margin-right: 5px;"><img src="../../assets/images/projecticon1.png" height="11" width="14"></i>线上项目</div>
              <div class="offline"v-if="v.source == 'offline'"><i style="margin-right: 5px;"><img src="../../assets/images/projecticon2.png" height="11" width="14"></i>线下项目</div>
              <div class="no">{{v.no}}</div>
            </td>
            <td>
              <el-button type="primary" @click.prevent="showPeopleChoose(v.id)">选择人员</el-button>
            </td>
         </tr>
       </table>
      </div>
      <div class="pagination">
        <div class="block">
          <el-pagination layout="total, prev, pager, next, jumper" :total="total_count"
                         @current-change="handleCurrentChange" :page-size="10">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="人员选择" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <el-table :data="gridData" max-height="320" highlight-current-row @current-change="handleCurrentPerson">
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="position" label="职能"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="savePerson">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible2" size="tiny" :before-close="handleClose">
     <i class="tishizhipai"><img src="../../assets/images/tishizhipai.png" height="60" width="60"></i> <p class="sure">确定指派该项目给{{zhipaiName}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click.prevent="zhipaiPerson">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import API from 'API/api'
  export default{
    created(){
      // 获取人员
      this.$http.get(API.url + 'users/descendants').then(this._getPerson)
      // 获取项目指派
      this.$http.get(API.url + 'projects/online?per=10').then(this._getProjects)
    },
    data(){
      return {
        total_count: -1,
        fenye: 1,
        currentRow: '',
        count: '',
        renyuanid:'',
        zhipaiName:'',
        gridData: [],
        products: [],
        fullscreenLoading: false,
        dialogVisible: false,
        dialogVisible2:false
      }
    },
    methods: {
      //分页
      handleCurrentChange(v){
        this.fenye = v
        this.$http.get(API.url + 'projects/online', {
          params: {
            per: 10,
            page: v
          }
        }).then(this._getProjects)
      },
      // 点击更换人员
      showPeopleChoose(i){
        this.dialogVisible = true
        this.count = i
      },
      // X关闭
      handleClose(){
        this.dialogVisible = false
        this.dialogVisible2 = false
      },
      // 选择单行数据时使用色块表示
      handleCurrentPerson(val) {
        this.currentRow = val;
        this.renyuanid = this.currentRow.id
        this.zhipaiName = this.currentRow.name
      },
      // 获取人员姓名和id
      savePerson(id){
        this.dialogVisible = false
        this.$confirm('确定指派给'+this.zhipaiName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.patch(API.url + 'projects/' + this.count + '/operator', {
            operator_id: this.renyuanid,
            id: this.count
          }).then(this._assignSuccess).catch(this._assignError)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消指派'
          });          
        });
      },
      //确定指派
     /* zhipaiPerson(){
        this.$http.patch(API.url + 'projects/' + this.count + '/operator', {
          operator_id: this.renyuanid,
          id: this.count
        }).then(this._assignSuccess).catch(this._assignError)
      },*/
      // 获取人员
      _getPerson(res){
        var resBody = res.body;
        this.gridData = resBody.descendants
      },
      // 获取项目指派
      _getProjects(res){
        var resBody = res.body
        this.products = resBody.products
        this.total_count = resBody.total_count
      },
      // 指派成功
      _assignSuccess(res){
        this.dialogVisible2 = false
        this.$confirm('指派成功！', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'success'
        }).then(() => {
          this.$http.get(API.url + 'projects/online', {
            params: {
              per: 10,
              page: this.fenye
            }
          }).then(this._getProjects)
        })
      },
      // 指派失败
      _assignError(error){
        this.fullscreenLoading = false;
        this.$confirm('指派失败', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'error'
        }).then()
        this.dialogVisible2 = false
        return false;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
.sure{
  font-size: 14px;
  text-align: center;
  position: relative;
}
.tishizhipai{
  position: absolute;
  left: 132px;
  top: 54px;
}
</style>
