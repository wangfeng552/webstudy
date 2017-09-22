<template>
      <div class="serviceRight">
        <!-- <div class="form-box form-box2">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="表单名称">
              <el-input v-model="formInline.userone" placeholder="请输入表单名称" ></el-input>
            </el-form-item>
            <el-form-item label="表单归属">
              <el-select v-model="formInline.region1" placeholder="请输入表单名称">
                <el-option label="表单一" value="shanghai"></el-option>
                <el-option label="表单二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表单类型">
              <el-select v-model="formInline.region2" placeholder="全部">
                <el-option label="申请表" value="shanghai"></el-option>
                <el-option label="问卷" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="服务名称">
              <el-select v-model="formInline.region3" placeholder="全部">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="专项资金申报" value="beijing"></el-option>
                <el-option label="税收减免" value="beijing"></el-option>
                <el-option label="知识产权" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="formInline.region4" placeholder="全部">
                <el-option label="类型一" value="shanghai"></el-option>
                <el-option label="类型二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <template>
                <div class="block fl">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
              </template>
              <span class="fl date-line"></span>
              <template>
                <div class="block fl">
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div> -->
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="name" label="表单名称" width="140">
            <template scope="scope">
              <router-link :to="{name:'formdetails'}">
                <span>{{scope.row.content.name}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="表单类型" width="100"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="360">
              <template scope="scope">
                  <div class="tips">
                    <img src="../assets/images/create/shenbao.png" height="28" width="28">专项资金申报
                  </div>
                  <div class="tips2">
                    <img src="../assets/images/create/chanquan.png">知识产权
                  </div>
                  <div class="tips3">
                    <img src="../assets/images/create/shuishou.png" height="24" width="24">税收减免
                  </div>
                  <div class="proName">上海市产业转型升级发展专项资金项目（重点技术改造）</div>
              </template>
          </el-table-column>
          <el-table-column prop="created_at" label="发布时间" width="150"></el-table-column>
          <el-table-column prop="ascription" label="表单归属" width="120"></el-table-column>
          <el-table-column prop="address" label="操作" width="90">
            <template scope="scope">
              <router-link :to="{name:'formdetails'}">
                <el-button size="small" class="del">编辑</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange"  layout=" total, prev, pager, next, jumper" :total=" total" :page-size="10">
        </el-pagination>
      </div>
      </div>
</template>
<script>
  import API from 'API/config'
  export default {
    components: { },
    data(){
      return {
        list:[
          {content: { name: ""}}
        ],
        coverBackground:false,
        delAlert:false,
        id:'',
        formInline: {
          userone: '',
          usertwo: '',
          userthree: '',
          region1: '',
          region2:'',
          region3:'',
          region4:''
        },
        value1: '',
        value2: '',
      }
    },
    created(id){
      this.getList()
    },
    methods:{
      /*删除当前项
      open2(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(API.url+'/service/chart/'+id
          ).then((res)=>{
            this.id = res.body
            this.getList()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },*/
      getList(){
        this.$http.get(API.url+'/service/charts?'+'per='+10+'&'+'page=' + 1
        ).then((res)=>{
          this.total = res.body.total_count
          this.list = res.body.charts
        })
      },
      handleCurrentChange(val) {
        this.$http.get(API.url+'/service/charts?'+'per='+10+'&'+'page=' +val
        ).then((res)=>{
             this.list = res.body.charts
        })
      },
      clear(){
        localStorage.removeItem('items');
        this.$router.push({path: 'formcreate'})
      }
    }
  }
</script>
