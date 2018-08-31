<template>
  <div class="transaction">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item>支付管理</el-breadcrumb-item>
    </el-breadcrumb>
  <div class="form-box">
      <el-form :inline="true" :model="payment" class="demo-form-inline">
        <el-form-item label="企业名称">
          <el-input v-model="payment.corp_name_cont" style="width: 200px;" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="交易状态" >
          <el-select v-model="payment.status_eq" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="等待确认" value="uncompleted"></el-option>
            <el-option label="付款成功" value="success"></el-option>
            <el-option label="付款失败" value="failed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" style="margin-right: 0">
          <el-select v-model="payment.category_eq" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="微信支付" value="wechatpay"></el-option>
            <el-option label="支付宝支付" value="alipay"></el-option>
            <el-option label="银行汇款" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付时间">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="payment.pay_at_gteq"
                type="date"
                placeholder="选择日期" @change="getTime">
              </el-date-picker>
            </div>
          </template>
          <span class="fl date-line"></span>
          <template>
            <div class="fl" style="margin-left: 10px;">
              <el-date-picker
                v-model="payment.pay_at_lteq"
                type="date"
                placeholder="选择日期" @change="getTime2">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input v-model="payment.iner_id_cont" style="width: 200px;" placeholder="请输入流水号"></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 0">
          <span style="margin-left:14px;">
          <el-button type="primary" @click="queryData">查询</el-button>
            </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="trades" style="width: 100%">
        <el-table-column prop="outer_id" label="支付流水号 | 创建时间" width="175">
          <template scope="scope">
            <span>{{scope.row.iner_id}}</span><br>
            <span class="account">{{scope.row.created_at | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fee" label="金额" width="160">
          <template scope="scope">
            <span class="fw-bold fc5c5">{{scope.row.fee | currency}}元</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="170">
          <template scope="scope">
            <span v-if="scope.row.service=='wechatpay'">
              <i class="icon-wechat" ></i>
              <span class="fw-bold">微信支付</span>
            </span>
            <span v-else-if="scope.row.category=='offline'">
               <i class="icon-card" ></i>
               <span class="fw-bold">银行汇款</span>
              <span class="account">{{ scope.row.bank_sn }}</span>
            </span>
            <span v-else-if="scope.row.category=='alipay'">
               <i class="icon-alipay" ></i>
               <span class="fw-bold">支付宝支付</span>
            </span>
            <span v-else>
               <span>--</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="corp" label="企业名称" width="260">
          <template scope="scope">
            <a class="table-corp-name" :title="scope.row.corp.name">{{scope.row.corp.name}}</a>
          </template>
        </el-table-column>
        <el-table-column label="交易状态 | 支付时间" width="170">
          <template scope="scope">
            <div v-if="scope.row.status == 'success'">
              <span>付款成功</span><br>
              <span class="account">{{scope.row.pay_at | formatDate}}</span>
            </div>
            <div v-else-if="scope.row.status == 'success' && scope.row.receiver == 'others'">
              <span>付款成功</span><br>
              <span class="account">{{scope.row.pay_at | formatDate}}</span>
            </div>
            <div v-else-if="scope.row.status=='uncompleted'">
              <span>等待确认</span>
            </div>
            <div v-else="scope.row.status=='failed'">
              <span>付款失败</span><br>
              <span class="account">{{scope.row.pay_at | formatDate}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="pagination">
      <div class="block">
        <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="total_count" @current-change="handleCurrentChange" :current-page="page"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate,currency} from 'assets/js/filter'
  import API from 'API/api'
  export default{
    data(){
      return {
        trades:[],
        page:1,
        total_count:0,
        state: [
          {
            active: true,
            type: '全部'
          },
          {
            active: false,
            type: '等待确认'
          },
          {
            active: false,
            type: '付款成功'
          }
        ],
        payment: {
          iner_id_cont:'',//流水号
          corp_name_cont: '',//企业名称
          status_eq: '',//支付状态
          pay_at_gteq:'',//开始时间
          pay_at_lteq: '',//结束时间
          category_eq: '',//支付方式
        }
      }
    },
    created(){
      this.$http.get(API.url+'trades',{
        params:{
          q: this.clearParams(this.payment),
          per:10,
          page:this.page
        }
      }).then(this._getTrades).catch()
    },
    methods: {
      //分页
      handleCurrentChange(v){
        this.page = v
        this.$http.get(API.url+'trades?per=10&page='+v,{
          params: {
            q: this.clearParams(this.payment),
            per:10,
            page:v
          }
        }).then(this._getTrades).catch()
      },
      // 获取支付列表
      _getTrades(res){
        var resBody= res.body;
        this.trades = resBody.trades;
        this.total_count = resBody.total_count
      },
       //查询
      queryData(){
        this.page = 1
        this.$http.get(API.url+'trades', {
          params: {
            q: this.clearParams(this.payment),
            per:10,
            page:this.page
          }//公共方法在clear里 把不需要的key删除
        }).then((res)=>{
          var resBody= res.body;
          this.trades = resBody.trades;
          this.total_count = resBody.total_count
        })
      },
      getTime(val){
        this.payment.pay_at_gteq = val
      },
      getTime2(val){
        this.payment.pay_at_lteq = val
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      currency(val,c,d){
        return currency(val,c,0)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .table-corp-name{
    color: #1b1b1b;
    width:220px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  //搜索
  .form-box{
    padding:30px 20px 8px 20px;
    background: #f5f5f5;
    .el-form-item{
      margin-right:42px;
    }

  }
  .fcff7{
    color: #ff7904;
  }
  .fw-bold{
    font-weight:bold;
  }
  .icon-wechat {
    display: inline-block;
    height: 19px;
    width: 18px;
    background: url("../../assets/images/project/wechat.png") no-repeat 0/cover;
    vertical-align: middle;
    margin-top: -3px;
  }
  .table-box{
  	padding: 20px 0;
  }
  .el-table__header,.el-table__body{
  	width: 939px !important;
  }

  .icon-card {
    display: inline-block;
    height: 12px;
    width: 17px;
    background: url("../../assets/images/project/card.png") no-repeat 0/cover;
    vertical-align: middle;
    margin-top: -3px;
  }

  .icon-alipay {
    display: inline-block;
    height: 18px;
    width: 18px;
    background: url("../../assets/images/project/alipay.png") no-repeat 0/cover;
    vertical-align: middle;
    margin-top: -3px;
  }

  .fc3c6 {
    color: #3c6ea9;
  }

  .transaction {
    height: 100%;
    .account{
      font-size:14px;
      color:#999;
      display: -webkit-box;//将对象作为弹性伸缩盒子模型显示
      -webkit-box-orient:vertical;//设置或检索伸缩盒对象的子元素的排列方式
      -webkit-line-clamp:1;
      overflow: hidden;
    }
  }

  .el-message-box__status.el-icon-warning {
    margin-top: -31px;
  }
  .el-dialog__body{
    p{
      margin-left:50px;
    }
    .el-select{
      margin-left:50px;
    }
  }

</style>
