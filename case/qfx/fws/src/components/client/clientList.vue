<template>
  <div class="organization" v-if="iflogin">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="custom-btn" v-if="supperAdmin">
      <router-link :to="{name:'createEnterprise'}"><el-button>新增企业</el-button></router-link>
    </div>
    <div class="form-box clientList" style="margin-top: 20px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" >
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name_cont" style="width: 200px;" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业负责人" style="margin-left: 15px;">
          <el-input v-model="formInline.corp_principals_principal_name_cont" style="width: 200px;" placeholder="请输入企业负责人"></el-input>
        </el-form-item>

        <el-form-item label="注册地址">
          <div class="clearfix">
            <div class="fl choose-box">
              <v-distpicker :province="formInline.province_cont" :city="formInline.city_cont"
                            :area="formInline.district_cont"
                            @province="selectProvince" @city="selectCity" @area="selectArea" :static-placeholder='true'>
              </v-distpicker>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="状态" style="margin-left: 15px;">
          <el-select v-model="formInline.status_eq" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="有效" value="effective"></el-option>
            <el-option label="冻结" value="freeze"></el-option>
            <el-option label="待激活" value="unclaimed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入驻日期" class="clientListDate" style="margin-left:0;">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="formInline.created_at_gteq"
                type="date"
                placeholder="选择日期" @change="getTime">
              </el-date-picker>
            </div>
          </template>
          <span class="fl date-line"></span>
          <template>
            <div class="fl" style="margin-left: 10px;">
              <el-date-picker
                v-model="formInline.created_at_lteq"
                type="date"
                placeholder="选择日期" @change="getTime2">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <span>
          <el-button type="primary" @click="queryData">查询</el-button>
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="customers" style="width: 100%" v-if="customers">
        <el-table-column prop="name" label="企业名称" width="200">
          <template scope="scope">
            <a class="table-corp-name" :title="scope.row.name">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="企业负责人" width="180">
          <template scope="scope" >
            <span v-if="scope.row.principal_name!=null&&scope.row.principal_role!=null">
            <span v-if="scope.row.principal_name">{{scope.row.principal_name}}</span>
            <span style="color: #a9a9a9;" v-if="scope.row.principal_role"> | </span>
            <span v-if="scope.row.principal_role"> {{scope.row.principal_role.name}}</span>
            </span>
           <span v-else>
            <span>--</span>
           </span>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="注册地址" width="180">
          <template scope="scope">
            <span v-if="scope.row.province.match('市')">{{scope.row.province +  scope.row.district}}</span>
            <span v-else>{{scope.row.province + scope.row.city + scope.row.district}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="入驻日期" width="120">
          <template scope="scope">
            <span>{{scope.row.created_at | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template scope="scope">
            <span v-if="scope.row.status=='effective'">有效</span>
            <span v-else-if="scope.row.status=='freeze'">冻结</span>
            <span class="fcff7" v-else="scope.row.status=='unclaimed'">待激活</span>
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
            <el-button type="text" @click="lookDetails(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 倒序 -->
    <img src="../../assets/images/shangjiantou.png" height="7" width="10" class="shangjiantou" @click="reverse" v-model="formInline.sorts">
    <img src="../../assets/images/lansejiantou.png" height="7" width="10" class="shangjiantou" v-show="lanse" @click="reverse">
    <!-- 顺序 -->
    <img src="../../assets/images/shangjiantou.png" height="7" width="10" class="shangjiantou2" @click="order">
    <img src="../../assets/images/lansejiantou.png" height="7" width="10" class="shangjiantou2" v-show="lanse2" @click="order">
    <input type="text" ref="jhm" class="jhmhidden" :value="jihuoma">
    <div class="pagination">
      <div class="block">
        <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :total="total_count" :current-page="page">
        </el-pagination>
      </div>
    </div>
    <div>{{jiantoushow}}</div>
    <!-- <div>222{{formInline_ji}}</div> -->
  </div>
</template>
<script>
  import API from 'API/api'
  import {formatDate} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  import VDistpicker from 'v-distpicker'
  export default{
    components: {VDistpicker},
    data() {
      return {
        id:'',
        page:1,
        jihuoma:'',
        activ_url:'',
        total_count:0,
        customers: [],
        lanse:false,
        lanse2:false,
        formInline: {
          name_cont: '',
          status_eq: '',
          created_at_gteq:'',//开始时间
          created_at_lteq: '',//结束时间
          province_cont:'',//省
          city_cont: '', //市
          district_cont: '',//区
          corp_principals_principal_name_cont:'',//企业负责人
          sorts:''
        },
        query:'',
      }
    },
    //根据路由判断显示的数据
     beforeRouteLeave (to, from, next) {
      if (!(/\/facilitator\/client/.test(to.fullPath))) {
        this.$store.dispatch('client')
        this.$store.state.listscreen.client.sortsInfo = 'created_at desc'//点击侧边栏给 赋倒序值
      }
      next(true)
    },
    computed:{
      ...mapGetters(['listscreen_zr','listpage','sortsInfo','dist_type']),
      iflogin(){
        if (this.$store.state.listscreen.client) {
          return true
        } else {
          return false
        }
      },
      //箭头状态显示
      jiantoushow(){
        if (this.sortsInfo == 'created_at asc') {
          this.lanse = false
          this.lanse2 = true
        }else{
          this.lanse = true
          this.lanse2 = false
        }
      },
      supperAdmin(){
        return this.dist_type=='Supplier'
      }
    },
    created(){
      this.formInline = this.listscreen_zr
      this.page = this.listpage
      this.$http.get(API.url+'customers', {
          params:{
              q: this.clearParams(this.formInline),
              per:10,
              page:this.listpage,
              'q[sorts]':this.sortsInfo
            }//公共方法在clear里 把不需要的key删除
        }).then((res)=>{
          this.customers = res.body.customers
          this.total_count = res.body.total_count
        })
    },
    methods:{
      /*城市*/
      selectProvince(value) {
        this.formInline.province_cont = value
      },
      selectCity(value) {
        this.formInline.city_cont = value
      },
      selectArea(value) {
        this.formInline.district_cont = value
      },
      //顺序
      order(){
        this.lanse = false
        this.lanse2 = true
        this.page = 1
        this.listpage = this.page
        this.$http.get(API.url+'customers', {
            params:{
              q: this.clearParams(this.formInline),
              per:10,
              page:this.page,
              'q[sorts]': 'created_at asc',
            }
          }).then(this._getCustomers)
        this.$store.dispatch('getlistscreen',{'formInline':this.formInline,'listpage':1,'sortsInfo':'created_at asc'})
      },
      //倒序
      reverse(){
        this.lanse = true
        this.lanse2 = false
        this.page = 1
        this.listpage = this.page
        this.$http.get(API.url+'customers', {
            params:{
              q: this.clearParams(this.formInline),
              per:10,
              page:this.page,
              'q[sorts]': 'created_at desc',
            }
          }).then(this._getCustomers)
        this.$store.dispatch('getlistscreen',{'formInline':this.formInline,'listpage':1,'sortsInfo':'created_at desc'})
      },
      //激活
      activation(id){
        this.$http.get(API.url+'customers/active_url').then((res)=>{
          this.$nextTick(()=>{
            this.activ_url = res.body.url
          })
        })
      },
      //查询
      queryData(){
        this.page = 1
        this.$http.get(API.url+'customers', {
          params: {
            q: this.clearParams(this.formInline),
            per:10,
            page:this.page,
            'q[sorts]':this.sortsInfo
          }//公共方法在clear里 把不需要的key删除
        }).then((res)=>{
          this.customers = res.body.customers
          this.total_count = res.body.total_count
        })
      },
      // 查看
      lookDetails(id){
        this.sorts = this.sortsInfo
        this.$router.push({name: 'clientDetails',params :{ id : id }})
        this.$store.dispatch('getlistscreen',{'formInline':this.formInline,'listpage':this.page,'sortsInfo':this.sortsInfo})
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
      // 分页
      handleCurrentChange(v){
        this.page = v
        this.$http.get(API.url+'customers', {
          params:{
            q: this.clearParams(this.formInline),
            per:10,
            page:v,
            'q[sorts]':this.sortsInfo
          }
        }).then(this._getCustomers)
      },
      // 获取客户数据
      _getCustomers(res){
        var resBody = res.body;
        this.customers = resBody.customers
        this.total_count = resBody.total_count
      },
      getTime(val){
        this.formInline.created_at_gteq = val
      },
      getTime2(val){
        this.formInline.created_at_lteq = val
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      currency(val){
        return currency(val)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scope>
  .table-corp-name{
    color: #1b1b1b;
    width:190px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  //搜索
  .form-box{
    padding:30px 20px 18px 20px;
    background: #f5f5f5;
  }
  .custom-btn{
    .el-button{
      padding:0;
    }
  }
  .table-box{
    padding-right:0;
    padding-left:0;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
.shangjiantou,.shangjiantou2{
  position:absolute;
  right: 297px;
  top: 319px;
  z-index: 1;
  cursor: pointer;
}
.shangjiantou2{
  right: 297px;
  top: 328px;
  transform:rotate(180deg);
  -ms-transform:rotate(180deg);   /* IE 9 */
  -moz-transform:rotate(180deg);  /* Firefox */
  -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
  -o-transform:rotate(180deg);
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
  .clientList{
    .el-form-item{
      margin-bottom: 14px;
    }
  }
  .clientListDate{
    margin-left: 15px;
    .el-input__inner{
      width: 158px;
    }
    .el-input__icon{
      right: 12px;
    }
    .el-date-editor{
      width: 170px;
    }
  }
  .organization{
    .form-box{
      .choose-box {
        select {
          width: 100px;
          height: 40px;
          font-size: 14px !important;
          margin-right:7px;
        }
      }
    }
  }
</style>
