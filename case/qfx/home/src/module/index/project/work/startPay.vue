<template>
  <div class="bgfff">
    <!--等待服务商发起支付-->
    <div class="gd-box" v-if="type=='one'">
      <div class="title bgefe">
        <i class="tit-fqzf02"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="not-upload"><i class="icon-notup"></i> <span >等待服务商发起支付</span></p>
      </div>
    </div>

    <div class="gd-box" v-if="type=='two'">
      <div class="title bgf1b">
        <i class="tit-fqzf01"></i>
        <span class="describe fcfff">{{ticket.title}}</span>
        <div class="status ">
          <i class="icon-status icon-wait"></i>
          <span>等待处理</span>
        </div>
      </div>
      <div class="content">
        <p class="clearfix pay-title">
          <span class="tit input-tit">实际费用：</span>
          <span class="fce65 fs20 fw-bold">{{ticket.fee_value|currency}}</span>
          <span class="fw-bold fs14 fc5c5">元</span>
          <span class="fr outer-id">支付流水号：<span class="ml10">{{ticket.trade.iner_id}}</span></span>
        </p>
        <p class="grey-border"></p>
        <p class="detail pay-detail" v-if="ticket.content">
          <i class="icon-remarks"></i>
          <span class="fs12 fc999">{{ticket.content}}</span>
        </p>
        <div class="choose-box clearfix">
          <span class="pay-item" v-for="(v,i) in payItem" :class="{'alipay-pay':i===0,'wechat-pay':i===1,'offline-pay':i===2,'pay-active':i===payIndex}" @click="payWays(i)">
            <i class="icon-chosen"></i>
          </span>
        </div>
        <p class="grey-border" v-if="payIndex===0||payIndex===1||payIndex===2"></p>
        <div class="pay-box" v-if="payIndex===0">
          <span class="pay-way">支付方式：支付宝支付</span>
          <a class="pay-btn" @click.prevent="thirdPay('支付宝')">去付款</a>
        </div>
        <div class="pay-box" v-if="payIndex===1">
          <span class="pay-way">支付方式：微信支付</span>
          <a class="pay-btn" @click.prevent="thirdPay('微信')">去付款</a>
        </div>
        <div class="bank-box" v-if="payIndex===2">
          <p><span class="bank-sn">您的汇款识别码为：</span><span class="number">{{ticket.trade.bank_sn}}</span></p>
          <p class="bank-mention">请通过银行转账（网银或银行柜台）给企服星指定银行账户,汇款时备注“汇款识别码”</p>
          <div class="bank-accout">
            <ul>
              <li><span class="tit">户名：</span><span class="content">上海企服星科技发展有限公司</span></li>
              <li><span class="tit">账号：</span><span class="content">3101170120100020000</span></li>
              <li><span class="tit">开户行：</span><span class="content">泰隆银行上海市闸北支行</span></li>
            </ul>
          </div>
          <p class="bank-attention">注意事项：汇款时需要注意以下信息，请牢记！</p>
          <div class="attention-box">
            <ul>
              <li>（1）线下银行柜台转账时需将此汇款识别码填写在电汇申请单【汇款用途】、【附言】、【摘要】 等栏。</li>
              <li>（2）企业网银转账时需将汇款识别码填写到【附言】、【摘要】、【备注】等栏内。</li>
              <li>（3）线下银行汇款或企业网银转账时必须备注汇款识别码，否则无法确认资金是否到账；</li>
              <li>（4）汇款金额请与应付金额保持一致，请勿多汇款或者少汇款。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--<p>对方处理中≤2万 已支付</p>-->
    <div class="gd-box" v-if="type=='three'">
      <div class="title bg55b">
        <i class="tit-fqzf01"></i>
        <span class="describe fcfff">{{ticket.title}}</span>
        <div class="status">
          <i class="icon-status icon-yes"></i>
          <span>已支付</span>
        </div>
      </div>
      <div class="content">
        <p class="clearfix pay-title">
          <span class="tit input-tit">实际费用：</span>
          <span class="fce65 fs20 fw-bold">{{ticket.fee_value|currency}}</span>
          <span class="fw-bold fs14 fc5c5">元</span>
          <span class="fr outer-id">支付流水号：<span class="ml10">{{ticket.trade.iner_id}}</span></span>
        </p>
        <p class="grey-border"></p>
        <p class="detail " v-if="ticket.content">
          <i class="icon-remarks"></i>
          <span class="fc999 fs12">{{ticket.content}}</span>
        </p>
        <p class="fs12 fc5c5 mt20"><span class="pay-state">支付状态：<span>{{ticket.trade.status | filterStatus}}</span></span><span>支付方式：<span>{{ticket.trade.category | filterPayWay}}</span></span>
        </p>
        <p class="fs12 fc5c5 mt10 mb30"><span class="pay-state">创建时间：<span>{{ticket.trade.created_at | formatDate}}</span></span><span>支付时间：<span>{{ticket.trade.pay_at | formatDate}}</span></span>
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
        payIndex:'',//付款方式
        payImf:'',
        item:{
          project_id:'',
          stage_id:'',
          ticket_id:'',
          return_url:'',
        },
        payItem:[
          {name:'alipay-pay',active:false},
          {name:'wechat-pay',active:false},
          {name:'offline-pay',active:false},
        ]
      }
    },
    created(){
    	if(this.type=="two"){
    		if(this.payWay=="offline"){
    			this.payIndex = 2
        }
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      currency(val,c,d){
        return currency(val,'',0)
      },
      filterStatus(val){
        if(val == 'uncompleted'){
          return "未完成"
        }
        else  if(val == 'success'){
          return "付款成功"
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
          return "微信支付"
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
      //微信阿里支付
      thirdPay(v){
        if(v=='支付宝'){
          this.item.return_url = API.alipayUrl+'/project/'+this.item.project_id+'/serviceApply/'+this.item.stage_id
          this.$http.post(API.url+'customer/trade/alipay',this.item).then((res)=>{
            var resBody=res.body;
            window.location.href = resBody.url
          })
        }else if(v=='微信'){
          this.$http.post(API.url+'customer/trade/wechat',this.item).then((res)=>{
            var resBody=res.body;
            var tradeId=resBody.trade.id
            this.$router.push({name:'payMethod',query: {tradeId}})
          })
        }
      },
    	//银行支付
      payWays(index){
      	this.payIndex = index
      	this.item.project_id = this.$route.params.id
        this.item.stage_id = this.$route.params.stage_id
        this.item.ticket_id = this.ticket.id
        if(this.payIndex===2){
          this.$http.post(API.url + 'customer/trade/bank',this.item
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

</style>

