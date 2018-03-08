
<template>
  <div class="transaction">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'transaction' }">交易记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-tab">
      <ul>
        <li v-for="(v,i) in state" @click="chooseState(v,i)" :class="{active:v.active}">{{v.type}}</li>
      </ul>
    </div>
    <div class="form-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="服务项目">
          <el-input v-model="formInline.project_no_or_iner_id_cont" placeholder="支付流水号或项目编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.corp_name_cont" placeholder="请输入企业名称"></el-input>
        </el-form-item>
         <el-form-item label="服务商名称">
          <el-input v-model="formInline.provider_name_cont" placeholder="请输入服务商名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="工单发起者">
          <el-input v-model="formInline.supplier_name_cont" placeholder="请输入工单发起者姓名"></el-input>
        </el-form-item>
        <el-form-item label="交易状态">
          <el-select v-model="formInline.status_in" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="付款成功" value="success"></el-option>
            <el-option label="等待确认" value="uncompleted"></el-option>
            <el-option label="付款失败" value="failed"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="formInline.category_in" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="微信支付" value="wechatpay"></el-option>
            <el-option label="支付宝支付" value="alipay"></el-option>
            <el-option label="银行汇款" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="支付时间">
          <template>
            <div class="fl">
              <el-date-picker
                v-model="value1"
                type="datetime"
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
                type="datetime"
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
          <el-button type="primary" @click="toSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <!--<p class="mb10">下载账单：<i class="icon-download"></i> <a class="fc3c6 cp">Excel格式</a></p>-->
      <el-table
        :data="trades"
        style="width: 100%">
        <el-table-column
          label="项目编号|支付流水号"
          width="170"
        >
          <template scope="scope">
            <span class="project-no">
              <span v-if="scope.row.project" >{{scope.row.project.no}}</span>
            </span>
            <br>
            <span  v-if="scope.row.iner_id">{{scope.row.iner_id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="corp.name"
          label="企业名称"
          width="135"
        >
        </el-table-column>
        <el-table-column
          prop="provider.name"
          label="服务商名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="工单发起者"
          width="90"
        >
          <template scope="scope">
            <span v-if="scope.row.supplier_name!=null">{{scope.row.supplier_name}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="金额"
          width="110"
        >
          <template scope="scope">
            <span>{{scope.row.fee|currency}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支付方式"
          width="170">
          <template scope="scope">
            <i class="icon-wechat" v-show="scope.row.category=='wechatpay'"></i>
            <i class="icon-card" v-show="scope.row.category=='offline'"></i>
            <i class="icon-alipay" v-show="scope.row.category=='alipay'"></i>
            <span v-if="scope.row.category=='wechatpay'">微信支付</span>
            <span v-if="scope.row.category=='offline'">银行汇款</span>
            <span v-if="scope.row.category=='alipay'">支付宝</span>
            <a class="account" v-if="scope.row.category=='offline'">{{ scope.row.bank_sn }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="交易状态|支付时间"
          width="160"
        >
          <template scope="scope">
            <span v-if="scope.row.status=='uncompleted'">等待确认</span>
            <span v-if="scope.row.status=='success'">付款成功</span>
            <br>
            <span v-if="scope.row.pay_at==null">--</span>
            <span v-else>{{scope.row.pay_at|formatDate}}</span>

            <!--<p v-if="scope.row.receiver=='others'&&scope.row.status=='success'">—服务商账户</p>-->
            <!--<p v-if="scope.row.receiver=='platform'&&scope.row.status=='success'">—企服星账户</p>-->
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="170"
        >
          <template scope="scope">
            <span class="checkDtl">
              <el-button type="primary" v-show="scope.row.status=='uncompleted'&&scope.row.category=='offline'" class="mr10"
                         @click="confirmTrade(scope.row.id,scope.row.corp.name,scope.row.fee,scope.row.bank_sn)">确认到账</el-button>
              <router-link :to="{name: 'checkDtl',params: { id: scope.row.id }}">
              <el-button type="text">
                查看
              </el-button>
              </router-link>

            </span>
            <div class="dialog">
            <el-dialog
              title="确认到账"
              :visible.sync="dialogVisible"
              size="tiny"
              :close-on-click-modal="false"
            >
              <div class="el-message-box__status el-icon-warning" style="margin-left:20px;margin-top:-40px"></div>
              <el-form :model="ruleForm" ref="ruleForm">
                <p class="pay-item"><span class="pay-tit">企业名称</span><span class="pay-con">{{con_name}}</span></p>
                <p class="pay-item"><span class="pay-tit">支付金额</span><span class="pay-con">￥{{con_fee}}</span></p>
                <p class="pay-item"><span class="pay-tit">汇款识别码</span><span class="pay-con">{{con_bank_sn}}</span></p>
                <!--<el-form-item>-->
                  <!--<span class="blue-btn" v-for="(v,i) in btnBox" @click="chooseWay(i,v)" :class="{'btn-active':v.isActive}">{{v.name}}</span>-->
                  <!--<span class="del ml10" v-if="errorShow">请选择付款方式</span>-->
                <!--</el-form-item>-->
                <p class="mb10 pay-item mt10">确认到账时间</p>
                <el-form-item prop="datetime">
                    <el-date-picker
                      v-model="ruleForm.datetime"
                      type="datetime"
                      placeholder="选择日期时间"
                      @change="chooseTime"
                    >
                    </el-date-picker>
                    <span class="del ml10" v-if="errorShow1">请选择到账时间</span>
                </el-form-item>
                <el-form-item>
                  <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-dialog>
            </div>
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
</template>
<script>
  import {formatDate,currency} from 'assets/js/filter'
  import {mapGetters} from 'vuex'

  import API from 'API/config'
  export default{
    data(){
      return {
        value: '',
        dialogVisible: false,
        currentPage1: 1,//分页当前页
        ruleForm: {
          region: '',
          datetime:''
        },
        btnBox:[
          {name:'企服星账户',type:'platform',isActive:false},
          {name:'服务商账户',type:'others',isActive:false},
        ],
        receiver:'',
        state: [
          {
            active: true,
            type: '企服星账户',
            project_source_eq:'online'
          },
          {
            active: false,
            type: '其他账户',
            project_source_eq:'offline'
          },
        ],
        formInline: {
          project_no_or_iner_id_cont: '',//服务项目
          corp_name_cont: '',//企业名称
          provider_name_cont:'',//服务商名称
          supplier_name_cont:'',//负责人
          status_in: '',//交易状态
          category_in: '',//支付方式
          created_at_gteq:'',//支付时间
          created_at_lteq:'',//支付时间
          project_source_eq:''//收款方
        },
        value1:'',
        value2:'',
        trades: [],
        confirmId: '',
        count: 0,
        errorShow:false,//验证弹框选择
        errorShow1:false,//验证弹框选择
        page:'',
        con_name:'',//确认收款弹框内容
        con_fee:'',
        con_bank_sn:'',
        checkType:'',
      }

    },
    computed:{
      ...mapGetters(['tradeSearch','tradePage','receiverIndex','tradePage']),
    },
    beforeRouteEnter(to,from,next){
     next(vm =>{
     	if(to.name=='transaction'){
        vm.formInline = vm.tradeSearch
        vm.value1= vm.formInline.created_at_gteq
        vm.value2= vm.formInline.created_at_lteq
        vm.chooseState(vm.state[vm.receiverIndex],vm.receiverIndex)
      }
     })
    },
    beforeRouteLeave(to,from,next){
      var mark =false;
      if(to.name=='transaction'||to.name=='checkDtl'){
        mark = true
      }
      if(!mark){
        this.formInline = {
          project_no_or_iner_id_cont: '',//服务项目
          corp_name_cont: '',//企业名称
          provider_name_cont:'',//服务商名称
          supplier_name_cont:'',//负责人
          status_in: '',//交易状态
          category_in: '',//支付方式
          created_at_gteq:'',//支付时间
          created_at_lteq:'',//支付时间
          project_source_eq:''//收款方
        },
        this.currentPage1 = 1
        this.value1= ''
        this.value2= ''
        this.$store.dispatch('tradeSearch', this.formInline)
        this.$store.dispatch('tradePage', this.currentPage1)
        this.chooseState(this.state[0],0)
      }
      next(true)
    },
    created(){
      this.obtainStatistics()
      this.currentPage1 = this.tradePage
    },
    methods: {
    	//选择支付平台
      chooseState(v,i){
        this.state.forEach((v) => {
          v.active = false
        })
        this.state[i].active = true
        this.formInline.project_source_eq = v.project_source_eq
        this.toSearch()
        this.$store.dispatch('receiverIndex', i)

      },
      obtainTrades()
      {
        this.$http.get(API.url + 'trades',
          {
            params: {
              q: this.clearParams(this.formInline)
            }
          }
        ).then((res) => {
          this.trades = res.body.trades
          this.count = res.body.total_count

//          this.state[0].type ='全部（' +res.body.total_count+'）'
        })
      },
      obtainStatistics()
      {
        this.$http.get(API.url + 'trades/statistics'
        ).then((res) => {
          this.state[0].type = '企服星账户（' + res.body.platform_count + '）'
          this.state[1].type = '其他账户（' + res.body.others_count + '）'
        })
      },
      confirmTrade(id,name,fee,bank_sn){
        this.dialogVisible = true
        this.receiver = ''
        this.btnBox.forEach((v)=>{
          v.isActive = false
        })
        this.ruleForm.datetime=''
        this.confirmId = id
        this.con_name = name
        this.con_fee = fee
        this.con_bank_sn = bank_sn
        this.errorShow1 = false
        this.errorShow = false
      },
      chooseTime(val){
        if(val!=''){
      		this.errorShow1 = false
        }else {
        	this.errorShow1 = true
        }
      },

      //提交表单
      submitForm() {
        if(this.ruleForm.datetime ==''||this.ruleForm.datetime==undefined){
          this.errorShow1 = true
        }else{
          this.errorShow1 = false
        }
        if(!this.errorShow1){
        	var receiver = ''
        	if(this.formInline.project_source_eq=="online"){
            receiver ='platform'
          }else if(this.formInline.project_source_eq=="offline"){
            receiver ='others'
          }
          this.$http.patch(API.url + 'trades/' + this.confirmId + '/confirm',
            {receiver: receiver,pay_at:this.ruleForm.datetime}
          ).then((res) => {
            this.dialogVisible = false
            this.$message({
              message: '已确认到账',
              type: 'success'
            });
            this.currentPage1 = 1
          }).then(this.obtainStatistics).then(this.obtainTrades)
        }


      },
      handleCurrentChange(val){
      	this.page = val
        this.$http.get(API.url + 'trades?page='+val,
          {
            params: {
              q: this.clearParams(this.formInline)
            }
          }
        ).then((res) => {
          this.trades = res.body.trades
          this.$store.dispatch('tradePage', val)
      })
      },
      //查询条件
      toSearch(){
        this.$http.get(API.url+'trades', {
          params: {
            q: this.clearParams(this.formInline),
            per:10,
            page:this.page
          }
        }).then((res)=>{
          this.trades = res.body.trades
          this.count = res.body.total_count
          this.$store.dispatch('tradeSearch', this.formInline)
        })
      },
      datePicker1(val){
      	this.formInline.created_at_gteq = val
      },
      datePicker2(val){
        this.formInline.created_at_lteq = val
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      currency(val,c,d){
        return currency(val,c,0)
      }

    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
      }
    },


  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .mt20{
    margin-top:10px;
  }
  .el-dialog--tiny{
    min-width:515px;
  }
  .icon-wechat {
    display: inline-block;
    height: 19px;
    width: 18px;
    background: url("../../../assets/images/project/wechat.png") no-repeat 0/cover;
    vertical-align: middle;
    margin-top: -3px;
  }

  .icon-card {
    display: inline-block;
    height: 12px;
    width: 17px;
    background: url("../../../assets/images/project/card.png") no-repeat 0/cover;
    vertical-align: middle;
    margin-top: -3px;
  }

  .icon-alipay {
    display: inline-block;
    height: 18px;
    width: 18px;
    background: url("../../../assets/images/project/alipay.png") no-repeat 0/cover;
    vertical-align: middle;
    margin-top: -3px;
  }

  .fc3c6 {
    color: #3c6ea9;
  }

  .transaction {
    height: 100%;
    .form-box{
      margin-left: 20px;
      margin-right:20px;
    }
    .account {
      font-size: 14px;
      color: #5c5c5c;
      display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
      -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .el-dialog__body {
      .el-message-box__status.el-icon-warning {
        margin-top: -31px;
      }
    }
    .dialog-footer {
      text-align: right;
    }
    .dialog{
      .el-form {
        width: 500px;
        padding: 0 30px 0 80px;
      }
    }
    .project-no{
      display: inline-block;
      width:91px;
    }
    .pay-item{
      position: relative;
      span{
        color: #1b1b1b;
      }
    }
    .pay-tit{
      position: absolute;
      top:0;
      left:0;
      display: inline-block;
      width:100px;
    }
    .pay-con{
      padding-left:100px;
      display: inline-block;
      width:350px;
      font-weight:bold;
    }
    .el-dialog--tiny{
      min-height:380px;
    }

    .blue-btn{
      display:inline-block;
      width:88px;
      height:36px;
      color: #20a0ff;
      border:1px solid #20a0ff;
      text-align: center;
      margin-right:16px;
      -webkit-border-radius:4px;
      -moz-border-radius:4px;
      border-radius:4px;
      cursor: pointer;
    }
    .btn-active{
      color: #FFFFFF;
      background: #20a0ff;
    }
    .form-box .el-form--inline .el-form-item__label{
      width:90px;
    }
  }


</style>
