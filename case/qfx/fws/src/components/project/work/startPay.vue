<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='zero'">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="top-title describe">
        <el-input v-if="currentProject.source=='online'" placeholder="发起支付" v-model="ticket_ji.title" :disabled='isDisabled'></el-input>
         <span v-else>{{ticket.title}}</span>
        </span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit input-tit">实际费用</span>
            <el-input
              v-model="ticket_ji.fee_value"
              @keyup.native="keyupNative"
              :disabled='isDisabled'
              placeholder="请输入内容"></el-input>
            <span class="tit input-tit span-yuan">元</span>
          </p>
          <p class="clearfix">
            <span class="tit">备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入备注信息"
              :disabled='isDisabled'
              v-model="ticket_ji.content">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
              <el-button @click='changeEventCancelStage'>取消</el-button>
            </span>
            <el-button type="primary" v-if="hasRoot && isNotComplete" @click="changeStartPaySendOther">{{currentProject | filterTextSend}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--观察者视角 start=========================-->
    <div class="gd-box" v-if="type=='one' && !hasRoot">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="not-upload">
            <i class="icon-notup"></i>
            <span>等待操作者发起支付</span>
          </p>
        </div>
      </div>
    </div>
    <!--观察者视角 end=========================-->

    <!--<p>发起支付</p>-->
    <div class="gd-box" v-if="type=='one' && hasRoot">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit input-tit">实际费用</span>
            <el-input v-model="ticket.fee_value" placeholder="请输入内容" :disabled='isDisabled'></el-input>
            <span class="tit input-tit span-yuan">元</span>
          </p>
          <p class="clearfix">
            <span class="tit">备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入备注信息"
              :disabled='isDisabled'
              v-model="ticket.content">
            </el-input>
          </p>
          <p class="grey-border" v-if="hasRoot && isNotComplete && canOperation"></p>
          <div class="btn-box" v-if="hasRoot && isNotComplete && canOperation">
            <!--<span class="custom-btn">-->
            <!--<el-button>取消</el-button>-->
            <!--</span>-->
            <el-button type="primary"  @click="changeStartPaySendOther">{{currentProject | filterTextSend}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<p>对方处理中≤2万</p>-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fqzf"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation" @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业支付</span>
        </div>
      </div>
      <div class="content">

        <p class="actual-cost">实际费用</p>
        <p class="fs14 fc1b1 input-tit fl">
          <input type="text" v-if="hasFixed"  v-model="ticket.fee_value" class="fee-input" :disabled='isDisabled'>
          <span v-else class="fce65 fs20">{{ticket.fee_value|currency}}</span> <span>元</span>
          <span class="cp fc3c8 ml10" v-if="hasRoot && isNotComplete &&!hasFixed && canOperation" @click="hasFixedCilck">修改</span>
          <span class="cp fca9a ml10" v-show="modifyBox" @click="cancel">取消</span>
          <span class="cp fc3c8 ml10" v-show="modifyBox" @click="confirm">保存</span>
          <span class="fr mt5">支付流水号<span class="fee-flow"><span v-if="ticket.trade!=null" >{{ticket.trade.iner_id }}</span></span></span>
        </p>
        <div class="clearfix"></div>
        <p class="grey-border"></p>

        <p class="detail">
          <i class="icon-remarks"></i>
          <span>{{ticket.content}}</span>
        </p>

        <!--线下项目需要有遮罩 start=============-->
        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'"> 本项目为线下项目，企业无法在平台上进行支付
          为确保收款顺利，请通过其他方式通知企业付款，并在“支付管理”确认收款进度。</div>
        <!--线下项目需要有遮罩 end=============-->

        <p class="fs14 fc5c5 mt10">支付状态<span v-if="ticket.trade" class="fc3c8 ml10">{{ticket.trade.status | filterStatus}}</span></p>
        <p class="fs14 fc5c5 mt10">创建时间<span v-if="ticket.trade" class="ml10">{{ticket.trade.created_at | formatDate}}</span></p>

      </div>
    </div>
    <!--<p> 已支付</p>-->
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
        <p class="fs14 fc1b1 input-tit" style="width: 100%;">
          <span class="fce65 fs20">{{ticket.fee_value |currency}}</span><span>元</span>
          <span class="cp fca9a ml10" v-show="modifyBox" @click="cancel">取消</span>
          <span class="cp fc3c8 ml10" v-show="modifyBox" @click="confirm">保存</span>
          <span class="fr mt5">支付流水号<span class="fee-flow"><span v-if="ticket.trade!=null">{{ticket.trade.iner_id }}</span></span></span>
        </p>
        <div class="clearfix"></div>
        <p class="grey-border"></p>

        <p class="detail">
          <i class="icon-remarks"></i>
          <span>{{ticket.content}}</span>
        </p>
        <p class="fs14 fc5c5 mt10">
          <span class="pay-state">
          <span class=" mr10">支付状态</span><span class="fc3c8">{{ticket.trade.status | filterStatus}}</span></span>
          <span class="pay-state">
            <span class="mr10">支付方式</span><span>{{ticket.trade.category | filterPayWay}}</span></span>
        </p>
        <p class="fs14 fc5c5 mt10">
          <span class="pay-state">
            <span class=" mr10">创建时间</span><span>{{ticket.trade.created_at | formatDate}}</span></span>
          <span class="pay-state">
            <span class="mr10">支付时间</span><span>{{ticket.trade.pay_at | formatDate}}</span></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {formatDate,currency} from 'assets/js/filter'
  export default{
    props: ['type','ticket','index'],
    data(){
      return {
        fee_value_pre:-100,
        input: '',
        input2: '',
        textarea: '',
        money: true,
        modifyBox: false,
        hasFixed:false
      }
    },
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      ticket_ji(){
        var item = this.ticket;
        if(this.isEmpty(item.title)){
          item.title = "发起文件";
        }
        if(this.isEmpty(item.content)){
          item.content = "";
        }
        if(this.isEmpty(item.fee_type)){
          item.fee_type = "fixed";
        }
        return item;
      },
      //是否可以操作 整个项目 停止 或则 关闭 返回 false
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete') return false;
        else return true;
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
          return "银行汇款"
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
      currency(v,c,d){
        return currency(v,c,0)
      },
      filterTextSend(val){
        if(val.source=='online') return '发送给企业';
        else return '发起支付'
      }
    },
    methods: {
      showMessage(type,str){
        if(type == null || type == undefined || type.length<1){
          this.$message(str);
        }else {
          if(type == "success"){
            this.$message({
              message: str,
              type: 'success'
            });
          }else if(type == "warning"){
            this.$message({
              message: str,
              type: 'warning'
            });
          }else if(type == "error"){
            this.$message.error(str);
          }else {
            this.$message(str);
          }
        }
      },
      keyupNative(event){
//        event.target.value = parseInt(event.target.value);
      },
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      //修改金额
      modifyAmount(){
        this.money = false
        this.modifyBox = true
      },
      //确定修改金额
      confirm(){
        if(!this.isNumberIntGol(this.ticket.fee_value)){
          this.showMessage("warning","请检查实际费用，具体金额用数字填写");
          return;
        }
        //发送请求
        this.hasFixed = false
        this.modifyBox = false
        if(this.hasFixed == false){ // 点击确定了，做网络请求
          this.$emit('changeEventPayFix',this.type,this.index,this.ticket);
        }
      },
      //取消修改金额
      cancel(){
        this.hasFixed = false
        this.modifyBox = false
        //将之前的值再次复制过来
        if( this.fee_value_pre >0){
          this.ticket.fee_value = this.fee_value_pre
          this.fee_value_pre = -100;
        }
      },
      sendOther(){
        this.type = 'two';
      },
      hasFixedCilck(){
        this.modifyBox = true
        this.hasFixed = !this.hasFixed;
        // 需要将之前的金额 先全部预存一份
        this.fee_value_pre = this.ticket.fee_value;
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      changeStartPaySendOther(){
        //需要注意：当新建的一个的时候，那么发送的是 ticket_ji,否则是 ticket
        if(this.type == 'zero'){ //全新创建的
          this.$emit('changeStartPaySendOther',this.type,this.index,this.ticket_ji);
        }else {
          this.$emit('changeStartPaySendOther',this.type,this.index,this.ticket);
        }
      },
      changeStageDelete(){
        this.$confirm('确认是否撤销?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('changeStageDelete',this.type,this.index,this.ticket);
        }).catch(() => {
        });
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .span-yuan{
    float: none !important;
    text-align: left !important;
  }
  .mr10{
    margin-right:10px;
  }
  .fee-flow{
    display: inline-block;
    width:110px;
    margin-left:10px;
    margin-top:-4px;
  }
  .input-tit{
    width:91%;
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
      width: calc(100% + 2px);
      height:115px;
      /*height: 100%;*/
      position:absolute;
      z-index: 100;
      opacity: 0.8;
      left: -1px;
      top: 60px;
      span{
        /*font-family:MicrosoftYaHei;*/
        font-size:14px;
        color:#ffffff;
        display: inline-block;
        width: 100%;
        text-align: center;
        height: 100%;
        padding-top: 5%;
        /*line-height: 72px;*/
      }
    }
    .mask-text{
      width:100%;
      height:115px;
      padding-top:5%;
      font-size:14px;
      position:absolute;
      top:60px;
      left:-1px;
      z-index: 100;
      color: #FFFFFF;
      text-align: center;
    }
  }
</style>
