<template>
  <div class="suggest-list">
    <div class="form-box">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="提交日期">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="form.value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </template>
          <span class="fl date-line"></span>
          <template>
            <div class="fl">
              <el-date-picker
                v-model="form.value2"
                type="date"
                placeholder="选择日期"
                >
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTime">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="no-data" v-if="count==0">未查询到相关信息</div>
    <div v-else>
      <!--<div class="download">-->
        <!--<span class="mention">根据查询条件下载所有建议反馈</span>-->
        <!--<el-button type="primary" @click="download(tagname)">下载</el-button>-->
      <!--</div>-->
      <div class="table-box">
        <el-table
          :data="feedbacks"
          style="width: 100%">
          <el-table-column
            prop="content"
            label="内容"
          >
          </el-table-column>
          <el-table-column
            prop="supplier_name"
            label="提交人"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="提交日期"
            width="150"
          >
            <template scope="scope">
              <span>{{scope.row.updated_at|formatDate}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="count"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {formatDate} from 'assets/js/filter'
  import API from 'API/config'
  var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
      base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g,
          function(m, p) { return c[p]; }) }
    return function(table, name) {
    	name = '建议反馈'
      table = document.getElementsByTagName('table')[1]
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      console.log(format(template, ctx))
      window.location.href = uri + base64(format(template, ctx))
    }
  })()
  export default{
		data(){
			return{
        form: {
          value1: '',
          value2: ''
        },
        feedbacks:[],
        count:0,
        pageVal:1,
        idTmr:''
      }
    },
    created: function () {
      this.suggestList()
    },
    methods:{
			//获取列表
      suggestList(){
        this.$http.get(API.url + 'feedbacks?q[supplier_provider_id_eq]='+this.$route.params.id+'&page=1'+'&per=10'
        ).then((res) => {
          this.feedbacks = res.body.feedbacks
          this.count = res.body.total_count
          this.form.value1 = ''
          this.form.value2 = ''
        })
      },
      //分页
      handleCurrentChange(val){
        this.$http.get(API.url + 'feedbacks?q[supplier_provider_id_eq]='+this.$route.params.id+'&q[created_at_gteq]='+this.form.value1+'&q[created_at_lteq]='+this.form.value2+'&page='+val+'&per=10'
        ).then((res) => {
          this.feedbacks = res.body.feedbacks
          this.count = res.body.total_count
          this.pageVal = val
        })
      },
      //查询
      searchTime(){
          this.$http.get(API.url + 'feedbacks?q[supplier_provider_id_eq]='+this.$route.params.id+'&q[created_at_gteq]='+this.form.value1+'&q[created_at_lteq]='+this.form.value2+'&page='+ this.pageVal+'&per=10'
          ).then((res) => {
            this.feedbacks = res.body.feedbacks
            this.count = res.body.total_count
          })


      },
      getExplorer(){
        var explorer = window.navigator.userAgent ;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
          return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
          return 'Firefox';
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
          return 'Chrome';
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
          return 'Opera';
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
          return 'Safari';
        }
      },
      Cleanup() {
        window.clearInterval(this.idTmr);
        CollectGarbage();
      },
//      tableToExcel() {
//        var uri = 'data:application/vnd.ms-excel;base64,',
//          template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
//          base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
//          format = function(s, c) {
//            return s.replace(/{(\w+)}/g,
//              function(m, p) { return c[p]; }) }
//
//        return function(table, name) {
//          console.log("-------5555")
//          if (!table.nodeType) table = document.getElementsByTagName('table')
//          console.log("------------")
//          console.log(table)
//          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
//          window.location.href = uri + base64(format(template, ctx))
//        }
//      },
      download(tagname){
        if(this.getExplorer()=='ie')
        {
          var curTbl = document.getElementsByTagName(tagname);
          var oXL = new ActiveXObject("Excel.Application");
          var oWB = oXL.Workbooks.Add();
          var xlsheet = oWB.Worksheets(1);
          var sel = document.body.createTextRange();
          sel.moveToElementText(curTbl);
          sel.select();
          sel.execCommand("Copy");
          xlsheet.Paste();
          oXL.Visible = true;

          try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
          } catch (e) {
            print("Nested catch caught " + e);
          } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            this.idTmr = window.setInterval("Cleanup();", 1);
          }

        }
        else
        {
          tableToExcel(tagname)
        }
      }
    },
    watch: {
      '$route': 'suggestList',
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .form-box{
    display: block;
  }
  .suggest-list{
    .download{
      margin-top:20px;
      text-align: right;
      .mention{
        font-size:14px;
        color:#a9a9a9;
        margin-right:20px;
      }
    }
    .table-box{
      padding:20px 0;
    }
    .no-data{
      text-align: center;
      margin-top:26px;
      font-size:14px;
      color:#a9a9a9;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  /*超出15行滚动*/
  .suggest-list{
    .table-box .el-table td{
      height:auto;
      max-height:360px;
      overflow: auto;
    }
    .table-box .el-table .cell{
      max-height:360px;
    }
  }
</style>
