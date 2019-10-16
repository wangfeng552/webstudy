<template>
  <div class="check-dtl" v-if="tradesDtl">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'transaction' }">交易记录</el-breadcrumb-item>
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-title">
      项目信息
    </div>
    <div class="detail-imf">
      <ul class="main-dtl clearfix">
        <li ><span class="tit">项目号：</span><span class="content" v-if="tradesDtl.project!=null">{{tradesDtl.project.no}}</span></li>
        <li><span class="tit">企业名称：</span><span class="content">{{tradesDtl.corp.name}}</span></li>
        <li ><span class="tit">项目名称：</span><span class="content" v-if="tradesDtl.project!=null">{{tradesDtl.project.service}}</span></li>
        <li ><span class="tit">服务机构：</span><span class="content" v-if="tradesDtl.provider!=null">{{tradesDtl.provider.name}}</span></li>
      </ul>
      <p class="pay-imf">支付信息</p>
      <ul class="clearfix">
        <li ><span class="tit">支付流水号：</span><span class="content" v-if="tradesDtl.iner_id!=null">{{tradesDtl.iner_id}}</span></li>
        <li><span class="tit">创建时间：</span><span class="content">{{tradesDtl.created_at.substring(0,10)}} {{tradesDtl.created_at.substring(11,16)}}</span></li>
        <li><span class="tit">支付金额：</span><span class="content">{{tradesDtl.fee}}元</span></li>
        <li ><span class="tit">支付时间：</span><span
          class="content" v-if="tradesDtl.status=='success'&&tradesDtl.pay_at!=null">{{tradesDtl.pay_at|formatDate}}</span></li>
        <li style="width: 100%;"><span class="tit">支付方式：</span>
          <span class="content" v-if="tradesDtl.category=='wechatpay'">微信支付</span>
        <span class="content" v-if="tradesDtl.category=='offline'"><span class="tit">银行汇款</span>
        <span class="content" v-if="tradesDtl.category=='offline'">| {{tradesDtl.bank_sn}}</span>
        </span><span class="content"  v-if="tradesDtl.category=='alipay'">支付宝</span>
        </li>
        <li><span class="tit">支付状态：</span><span class="fcff7"  v-if="tradesDtl.status=='uncompleted'">等待确认</span>
        <span class="content" v-if="tradesDtl.status=='success'">付款成功</span>
        <span class="content" v-show="tradesDtl.receiver=='others'&&tradesDtl.receiver!=null">—非平台支付</span>
      </li>
      </ul>
      <el-button type="primary" v-show="project.state=='等待确认'" class="mt50">确认到账</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
  import {formatDate, currency, byteConversion} from 'assets/js/filter'
  import API from 'API/config'
  export default{
    data(){
      return {
        project: {
          number: 5676789908,
          corp: '上海耀皮工程玻璃有限公司',
          name: '软件和集成电路发展专项资金',
          service: '上海豫谦财务事务所',
          flowNum: '5763998670-2',
          createTime: '2017-02-06 08:31',
          price: '18000元',
          payTime: '2017-02-06 15:31',
          payWay: '微信支付',
          state: '付款成功'
        },
        tradesId: '',
        tradesDtl:'',

      }
    },
    created: function () {
      this.gitId()
    },
    methods: {
      gitId(){
        this.$http.get(API.url + 'trades/' + this.$route.params.id
        ).then((res) => {
          this.tradesDtl = res.body.trade
      })
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.tradesId = to.params.id
    })
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      currency(val){
        return currency(val)
      },
      byteConversion(val){
        return byteConversion(val)
      }

    },
    watch: {
      '$route': 'gitId',
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
