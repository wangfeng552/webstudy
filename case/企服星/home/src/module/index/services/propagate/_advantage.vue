<template>
  <div class="myadvantage" ref='myadvantage'>
    <h2>为什么要选择企服星</h2>
    <div class="bgf4f9fe">
      <div class="w1200">
        <dl class="clearfix">
          <dt>
            <h3>服务高品质保障</h3>
            <p>现有服务商曾为多家世界五百强及中国知名企业提供优质服务，服务品质经市场认可和平台认定。 </p>
          </dt>
          <dd><img src="./images/ys_01.jpg" width="374" height="283" alt=""></dd>
        </dl>
      </div>
    </div>
    <div class="bgfff">
      <div class="w1200">
        <dl class="clearfix">
          <dd><img src="./images/ys_02.jpg" width="412" height="277" alt=""></dd>
          <dt>
          <h3>企业掌控整个服务流程</h3>
          <p>服务协议签署之后，企业对服务流程一目了然，当前负责人、下一阶段事项清晰明了，可视化的流程让企业真正做到在服务过程中占据主导地位。 </p>
          </dt>
        </dl>
      </div>
    </div>
    <div class="bgf4f9fe">
      <div class="w1200">
        <dl class="clearfix">
          <dt>
          <h3>平台对交易资金安全负责</h3>
          <p>企业服务有时需要在服务完成前就要付款，企业担心费用支付后使自己处于被动地位。在企服星选择服务，资金托管至平台，企业认可服务成果后再将交易金额结算给服务商，免去后顾之忧。 </p>
          </dt>
          <dd><img src="./images/ys_03.jpg" width="415" height="289" alt=""></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    methods:{
      getHeight3(){
        var a = this.$refs.myadvantage.offsetTop;
        document.body.scrollTop = a - 82
        // Firefox
        document.documentElement.scrollTop = a - 82
        // Safari
        window.pageYOffset = a - 82
      }
    }
  }
</script>

<style lang="scss" scoped="">
.myadvantage{
  h2{
    font-size: 34px;
    color: #1b1b1b;
    text-align: center;
    padding: 0 0 40px 0;
  }
  .bgf4f9fe{
    background-color: #f4f9fe;
    padding: 20px 0;
  }
  .bgfff{
    background-color: #fff;
    padding: 20px 0;
  }
  dt,dd{
    float: left;
    width: 600px;
  }
  dt{
    padding:90px 160px 0 80px;
    h3{
      font-size: 20px;
      padding-bottom: 35px;
    }
    p{
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
