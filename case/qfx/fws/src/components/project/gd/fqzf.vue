<template>
  <div class="bgfff">
    <p>发起支付</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">发起支付</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit input-tit">实际费用</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </p>
          <p class="clearfix">
            <span class="tit">备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入备注信息"
              v-model="textarea">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
              <el-button>取消</el-button>
            </span>
            <el-button type="primary">发送给企业</el-button>
          </div>

        </div>
      </div>
    </div>
    <p>对方处理中≤2万</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">企业付款</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业支付</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc1b1">实际费用：<span class="fce65 fs20">18,000 </span>元<span class="cp fc3c8 ml10">修改</span>
          <span class="fr mt5">支付流水号：201705180001-1</span>
        </p>
        <p class="grey-border"></p>

        <p class="detail">
          <i class="icon-remarks"></i>
          <span>此次为申报阶段服务费</span>
        </p>
        <p class="fs14 fc5c5 mt10">支付状态：<span class="fc3c8">待支付</span></p>
        <p class="fs14 fc5c5 mt10">创建时间：<span>2017-01-16 17:06:36</span></p>
      </div>
    </div>
    <p>对方处理中≤2万</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">企业付款</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已支付</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc1b1">实际费用：<span class="fce65 fs20">18,000 </span>元<span class="cp fc3c8 ml10">修改</span>
          <span class="fr mt5">支付流水号：201705180001-1</span>
        </p>
        <p class="grey-border"></p>

        <p class="detail">
          <i class="icon-remarks"></i>
          <span>此次为申报阶段服务费</span>
        </p>
        <p class="fs14 fc5c5 mt10"><span class="pay-state">支付状态：<span class="fc3c8">付款成功</span></span><span>支付方式：<span>支付宝支付</span></span>
        </p>
        <p class="fs14 fc5c5 mt10"><span class="pay-state">创建时间：<span>2017-01-16 17:06:36</span></span><span>支付时间：<span>2017-01-16 17:06:36</span></span>
        </p>
      </div>
    </div>
    <p>对方处理中＞2万</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">企业付款</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业支付</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc1b1">实际费用：<span class="fce65 fs20">38,000 </span>元<span class="cp fc3c8 ml10"
        >修改</span>
          <span class="fr mt5">支付流水号：201705180001-1</span>
        </p>
        <p class="grey-border"></p>

        <p class="detail">
          <i class="icon-remarks"></i>
          <span>此次为申报阶段服务费</span>
        </p>
        <p class="fs14 fc5c5 mt10">支付状态：<span class="fc3c8">待支付</span></p>
        <p class="fs14 fc5c5 mt10">创建时间：<span>2017-01-16 17:06:36</span></p>
      </div>
    </div>
    <p>对方处理中>2万</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">企业付款</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已支付</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc1b1">实际费用：
          <span class="fce65 fs20" v-show="money">38,000 </span>
          <el-input v-model="input2" v-show="modifyBox"></el-input>
          元
          <span class="cp fc3c8 ml10" @click="modifyAmount" v-show="money">修改</span>
          <span class="cp fc3c8 ml10" v-show="modifyBox" @click="confirm">确定</span>
          <span class="cp fc3c8 ml10" v-show="modifyBox" @click="cancel">取消</span>
          <span class="fr mt5">支付流水号：201705180001-1</span>
        </p>
        <p class="grey-border"></p>

        <p class="detail">
          <i class="icon-remarks"></i>
          <span>此次为申报阶段服务费</span>
        </p>
        <p class="fs14 fc5c5 mt10"><span class="pay-state">支付状态：<span class="fc3c8">付款成功</span></span><span>支付方式：<span>银行支付</span></span>
        </p>
        <p class="fs14 fc5c5 mt10"><span class="pay-state">创建时间：<span>2017-01-16 17:06:36</span></span><span>支付时间：<span>2017-01-16 17:06:36</span></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        input: '',
        input2: '',
        textarea: '',
        money: true,
        modifyBox: false,
      }
    },
    methods: {
      //修改金额
      modifyAmount(){
        this.money = false
        this.modifyBox = true
      },
      //确定修改金额
      confirm(){
        //发送请求
        this.money = true
        this.modifyBox = false
      },
      //取消修改金额
      cancel(){
        this.money = true
        this.modifyBox = false
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
