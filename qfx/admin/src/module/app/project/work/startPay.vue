<template>
  <div class="bgfff">
    <!--等待服务商发起支付-->
    <div class="gd-box" v-if="type=='one'">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="not-upload"><i class="icon-notup"></i> <span >等待操作者发起支付</span></p>
      </div>
    </div>
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业支付</span>
        </div>
      </div>
      <div class="content">
        <p class="actual-cost">实际费用</p>
        <p class="fs14 fc1b1 input-tit">
          <span class="fce65 fs20">{{ticket.fee_value}}</span> 元
          <span class="fr mt5">支付流水号：{{ticket.trade.iner_id }}</span>
        </p>
        <div class="clearfix"></div>
        <p class="grey-border"></p>
        <div class="position-re">
          <p class="detail" v-if="ticket.content">
            <i class="icon-remarks"></i>
            <span class="fc5c5 fs14">{{ticket.content}}</span>
          </p>
          <p class="fs14 fc5c5 mt10">
            <span class="pay-state">支付状态<span class="fc3c8 ml10">{{ticket.trade.status | filterStatus}}</span></span>
          </p>
          <p class="fs14 fc5c5 mt10">
            <span class="pay-state">创建时间<span class="ml10">{{ticket.trade.created_at | formatDate}}</span></span>
          </p>
          <div class="offline-mask" v-if="ifOffline">
          </div>
          <div class="offline-text" v-if="ifOffline">
            本项目为线下项目，企业无法在平台上进行支付为确保收款顺利，请通过其他方式通知企业付款，并在“支付管理”确认收款进度。
          </div>
        </div>

      </div>
    </div>
    <!--<p>对方处理中≤2万 已支付</p>-->
    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已支付</span>
        </div>
      </div>
      <div class="content">
        <p class="actual-cost">实际费用</p>
        <p class="fs14 fc1b1 input-tit">
          <span class="fce65 fs20">{{ticket.fee_value}}</span> 元
          <span class="fr mt5">支付流水号：{{ticket.trade.iner_id }}</span>
        </p>
        <div class="clearfix"></div>
        <p class="grey-border"></p>

        <p class="detail" v-if="ticket.content">
          <i class="icon-remarks"></i>
          <span class="fc5c5 fs14">{{ticket.content}}</span>
        </p>
        <p class="fs14 fc5c5 mt10"><span class="pay-state">支付状态<span class="fc3c8 ml10">{{ticket.trade.status | filterStatus}}</span></span><span>支付方式<span class="ml10">{{ticket.trade.category | filterPayWay}}</span></span>
        </p>
        <p class="fs14 fc5c5 mt10"><span class="pay-state">创建时间<span class="ml10">{{ticket.trade.created_at | formatDate}}</span></span><span>支付时间<span class="ml10">{{ticket.trade.pay_at | formatDate}}</span></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {formatDate,currency} from 'assets/js/filter'

  export default{
    props: ['type','ticket','index','payWay'],
    data(){
      return {
        input: '',
        input2: '',
        textarea: '',
        money: true,
        modifyBox: false,
        hasFixed:false,
        payRadio:'',//付款方式
        payImf:'',
        item:{
          project_id:'',
          stage_id:'',
          ticket_id:''
        },
      }
    },
    created(){
    	if(this.type=="two"){
    		if(this.payWay=="offline"){
    			this.payRadio = 3
        }
      }

    },
    computed:{
      ifOffline(){
        if (this.$store.state.project.projectSource=='offline') {
          return true
        } else {
          return false
        }
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      currency(val){
        return currency(val)
      },
      filterStatus(val){
        if(val == 'uncompleted'){
          return "未完成"
        }
        else  if(val == 'success'){
          return "支付成功"
        }else {
          return '';
        }
      },
      filterPayWay(val){
        if(val == 'offline'){
          return "银行支付"
        }
        else  if(val == 'alipay'){
          return "支付宝支付"
        }
        else  if(val == 'wechatpay'){
          return "微信支付支付"
        }else {
          return '';
        }
      },
      filterTime(val){
        return val;
      },
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
    },
    methods: {
    	//银行支付
      payWays(){
      	this.item.project_id = this.$route.params.id
        this.item.stage_id = this.$route.params.stage_id
        this.item.ticket_id = this.ticket.id
        if(this.payRadio==3){
          this.$http.post(API.url + 'customer/bank',this.item
          ).then((res) => {
            this.payImf = res.body.trade
          },(error)=>{

          })
        }

      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .choose-box{
    margin-top:30px;
    margin-bottom:23px;
    li{
      float: left;
      label{
        display: block;
        width:246px;
      }
    }
    .pay-item{
      margin-left:10px;
      display: inline-block;
      width:165px;
      height:54px;
      border:1px solid #d1d1d1;
    }
    .wechat-pay{
      background: url("../../../../assets/images/gd_ico/wechat.png") center no-repeat;
    }
    .alipay-pay{
      background: url("../../../../assets/images/gd_ico/alipay.png") center no-repeat;
    }
    .offline-pay{
      background: url("../../../../assets/images/gd_ico/offline.png") center no-repeat;
    }
  }
  .pay-box{
    margin-top:20px;
    background: #f5f5f5;
    padding:15px;
    height:73px;
    .pay-btn{
      display:inline-block;
      float: right;
      background:#3c8ced;
      width:142px;
      height:42px;
      line-height:42px;
      color: #FFFFFF;
      text-align: center;
      -webkit-border-radius:2px;
      -moz-border-radius:2px;
      border-radius:2px;
    }
    .pay-way{
      display: inline-block;
      margin-top:12px;
    }
  }
  .bank-box{
    .bank-sn{
      font-size:16px;
      color:#1b1b1b;
      vertical-align: middle;
    }
    .number{
      color:#e65c5c;
      font-size:16px;
      font-weight:bold;
      vertical-align: middle;
    }
    .bank-mention{
      margin-top:27px;
      margin-bottom:10px;
      font-size:14px;
      color:#f1b846;
    }
    .bank-accout{
      background:#f5f9ff;
      border:1px solid #e6f0fd;
      height:126px;
      width:660px;
      padding-top:20px;
      padding-left:29px;
      li{
        margin-bottom:10px;
        font-size:14px;
        .tit{
          display: inline-block;
          width:68px;
          color:#1b1b1b;
          background: none;
          padding:0;
        }
        .content{
          color: #5c5c5c;
        }
      }
    }
    .bank-attention{
      font-size:14px;
      color:#5c5c5c;
      margin:18px auto;
    }
    .attention-box{
      font-size:14px;
      color:#858585;
      line-height:20px;
    }
  }
  .fee-input{
    height:30px;
    line-height:30px;
    width:150px;
    text-indent:10px;
  }
  .content{
    position: relative;
    .mask{
      background-color: black;
      width: 100%;
      height:72px;
      position:absolute;
      z-index: 100;
      opacity: 0.5;
      left: -1px;
      top: 85px;
      span{
        font-family:MicrosoftYaHei;
        font-size:14px;
        color:#ffffff;
        display: inline-block;
        width: 100%;
        text-align: center;
        line-height: 72px;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
  .choose-box{
    .el-radio-group .el-radio{
      margin-right:30px;
    }
  }
</style>
