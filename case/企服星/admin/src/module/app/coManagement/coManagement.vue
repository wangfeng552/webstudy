<template>
  <div class="qy-management">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-tab">
      <ul>
        <li v-for="(v,i) in location" @click="chooseLocation(i)" :class="{active:v.active}">{{v.place}}</li>
      </ul>
      <router-link :to="{name:'createEnterprise'}" class="btn-addqiye">
        <el-button type="primary" class="addEtr">新增企业</el-button>
      </router-link>
    </div>

    <div class="form-box">
      <el-form :inline="true" :model="enterprise" class="demo-form-inline">
        <el-form-item label="企业名称">
          <el-input v-model="enterprise.name" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="创建来源">
          <el-select v-model="enterprise.type" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="平台" value="admin"></el-option>
            <el-option label="服务商" value="supplier"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="enterprise.name" placeholder="请输入创建者名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="enterprise.state" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="有效" value="1"></el-option>
            <el-option label="冻结" value="2"></el-option>
            <el-option label="等待认领" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入驻日期">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
                :editable="false"
                @change = 'datePicker1'
              >
              </el-date-picker>
            </div>
          </template>
          <span class="fl date-line"></span>
          <template>
            <div class="fl">
              <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions2"
                :editable="false"
                @change = 'datePicker2'
              >
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-box">
      <el-table :data="businessList" style="width: 100%">
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="category" label="企业类型">
          <template scope="scope">
            <span v-if="scope.row.category=='customer'">用户注册</span>
            <span v-if="scope.row.category=='supplier'">服务商创建</span>
            <span v-if="scope.row.category=='admin'">平台创建</span>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="创建者">
          <template scope="scope">
            <span v-if="scope.row.user">{{scope.row.user.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="入驻日期">
          <template scope="scope">
            <span>{{scope.row.created_at.substring(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template scope="scope">
            <span v-if="scope.row.status=='effective'">有效</span>
            <span v-else-if="scope.row.status=='freeze'">冻结</span>
            <span v-else="scope.row.status=='unclaimed'">待激活</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template scope="scope">

            <el-popover trigger="click" placement="bottom">
              <div class="jihuo">
                <input type="text" :value="activ_url">
                <el-button type="primary" size="small" @click.prevent="copyLink()">复制链接
                </el-button>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-button type="text" v-if="scope.row.status=='unclaimed'" @click="activation(scope.row.id)">激活</el-button>
              </div>
            </el-popover>

            <router-link :to="{name: 'enterpriseDtl',params: {id:scope.row.id}}">
              <el-button type="text">查看 </el-button>
            </router-link>

              <el-button type="text" v-if="scope.row.status=='effective' || scope.row.status=='freeze'" @click="watchProject(scope.row.name)">项目一览</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <input type="text" ref="jhm" class="jhmhidden" :value="jihuoma">
    <div class="pagination">
      <div class="block">
        <el-pagination layout="total, prev, pager, next, jumper" :total="total_count| toInt" @current-change="handleCurrentChange":page-size="10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  export default{
    created(){
      this.$http.get(API.url+'corps?per=10').then((res) => {
        this.businessList = res.body.corps
        this.total_count = res.body.total_count
      })
    },
    data(){
      return {
        activ_url:'',
        jihuoma: '',
        location: [
          {
            active: true,
            place: '全部地区'
          },
          {
            active: false,
            place: '上海'
          }
        ],
        enterprise: {
          name: '',
          type: '',
          state: ''
        },
        businessList:[],
        total_count:1,
        formInline: {
          no_or_product_service_name_cont: '',
          owner_name_cont:'',
          agent_name_cont:'',
          corp_name_cont: '',
          status_eq: '',
          source_eq: '',
          provider_name_cont: '',
          created_at_gteq: '',
          created_at_lteq: '',
        },
        value1:'',
        value2:''
      }
    },
    methods: {
      //分页
      handleCurrentChange(v){
        this.$http.get(API.url+'corps?per=10&page='+v).then((res) => {
          this.businessList = res.body.corps
          this.total_count = res.body.total_count
        })
      },
      //选城市
      chooseLocation(i) {
        this.location.forEach((v) => {
          v.active = false
        })
        this.location[i].active = true
      },
      // table帅选
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      // 删除账号
      delAccount(i, row){
        this.$confirm('确认删除该企业账号?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData.splice(i, 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //激活
      activation(id){
        this.$http.get(API.url+'corps/'+id+'/active_url?id='+id).then((res)=>{
          this.$nextTick(()=>{
            this.activ_url = res.body.url
          })
        })
      },
      //复制链接
      copyLink(){
        this.jihuoma = this.activ_url
        this.$nextTick(function () {
          this.$refs.jhm.select();
          document.execCommand("copy");
        })
        this.$message({
          message: '复制成功！',
          type: 'success'
        });
      },
      watchProject(name){
      	this.formInline.corp_name_cont = name
        this.$router.push({name:'project'})
        this.$store.dispatch('projectSearch', this.formInline)
      },
      datePicker1(val){
        this.formInline.created_at_gteq = val
      },
      datePicker2(val){
        this.formInline.created_at_lteq = val
      }
    },
    filters:{
      toInt(v){
        return parseInt(v)
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .addEtr{
    position: absolute;
    top:2px;
    right:-373px;
  }
  .jihuo {
    input {
      border: none;
    }
    button {
      margin-left: 10px;
    }
  }

  .jhmhidden {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -55;
  }

  .name-wrapper {
    float: left;
    margin-right: 14px;
  }
  .qy-management{
    .form-box{
      margin:0 20px;
    }
  }
</style>
