<template>
  <div class="mainpart2">
    <!--<p class="qiyejihuo">忘记密码</p>-->
    <div class="revise-box">
      <img src="./images/success.png" class="success">
      <p class="one">恭喜你，支付成功</p>
      <ul class="pay-details">
        <li v-if="payMethods=='alipay'">支付方式：支付宝支付</li>
        <li v-else>支付方式：微信支付</li>
        <li>实际费用：{{fee | currency}}</li>
        <li>支付流水：{{iner_id}}</li>
        <li>创建时间：{{created_at | formatDate}}</li>
        <li>支付时间：{{pay_at | formatDate}}</li>
      </ul>
      <el-button type="primary" @click="goToDetails">返回查看详情</el-button>
    </div>
  </div>
</template>
<script>
  import {formatDate, currency} from 'assets/js/filter'
  import API from 'API/config'
  export default{
    data() {
      return {
        payMethods: '',  //支付方式
        fee: '',         //支付费用
        iner_id: '',     // 支付流水
        created_at: '',  //创建时间
        pay_at: '',       //支付时间
        projectId: '',     // 项目ID
        processStageId: '' // 阶段ID
      }
    },
    created(){
      var tradeId = this.$route.query.tradeId  //获取tradeId
      this.$http.get(API.url + 'customer/trade/' + tradeId).then((res) => {
        var resBody = res.body;
        var trade = resBody.trade;
        var project=trade.project;
        this.payMethods = trade.category;
        this.fee = trade.fee;
        this.iner_id = trade.iner_id;
        this.created_at = trade.created_at;
        this.pay_at = trade.pay_at;
        this.projectId = project.id;
        this.processStageId = project.process_stage_id;
      })
    },
    methods: {
      //查看详情
      goToDetails(){
        this.$router.push({
          name: 'serviceApply',
          params: {id: this.projectId, stage_id: this.processStageId}
        })
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      currency(val){
        return currency(val)
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .mainpart2 {
    background-color: #f5f5f5;
    position: relative;
    z-index: 1;
    padding-top: 20px;
  }

  .revise-box {
    padding: 98px 0 144px 0;
    width: 1048px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #e2e2e2;
    text-align: center;
    .pay-details {
      width: 216px;
      margin: 26px auto;
      text-align: left;
      font-size: 12px;
      color: #5c5c5c;
      line-height: 26px;
    }
  }

  .success {
    display: block;
    margin: 0 auto;
  }

  .one {
    font-size: 15px;
    color: #1b1b1b;
    margin-top: 20px;
  }
</style>
