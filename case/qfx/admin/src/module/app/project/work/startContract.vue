<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='one'" style="padding-bottom: 0px">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow" style="margin-bottom:0;">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <div class="position-re">
          <p class="not-upload"><i class="icon-notup"></i> <span >服务商正在准备合同草案</span></p>
            <div class="offline-mask" v-if="ifOffline">
            </div>
            <div class="offline-text" v-if="ifOffline">
              本项目为线下项目，请线下与企业确认合同并签署，然后开启下一步。请务必确保在“企业付款”前将双方已盖章的合同扫描件上传至平台。
            </div>
        </div>
        <div class="mt10" v-if="ifOffline">
          <p class="fs14 fc5c5" v-if="ticket.temporary==false">
            <span class="mr20">申报年份</span>
            <span v-if="ticket.year==null" class="fca9a">服务商还未上传申报年份信息，请耐心等待</span>
            <span v-else>{{ticket.year}}</span>
          </p>
          <p class="grey-border" v-if="ticket.temporary==false"></p>
          <p class="fs14 fc5c5">
            <span class="mr20">合同签署盖章扫描件</span>
            <span v-if="ticket.scan_contract_attachments==''" class="fca9a">服务商还未上传合同签署盖章扫描件，请耐心等待</span>
          </p>
          <p class="grey-border"></p>
          <div class="file-list" v-if="ticket.scan_contract_attachments!=''">
            <ul>
              <li v-for="(item ,index) in ticket.scan_contract_attachments">
                <i class="icon-file icon-doc"></i>
                <span class="name">{{item.name}}</span>
                <!--<span class="size">2.01MB</span>-->
                <!--<span class="date">2017-03-06</span>-->
                <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
                <!--<span class="file-preview">预览</span>-->
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <div class="gd-box" v-if="type=='two'" style="padding-bottom: 0px">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bgf1b"><i class="icon-status icon-having"></i> <span >等待企业确认</span></div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <div class="input-item">
          <div class="chooose-file clearfix">
            <!--展示选择的文件 start =====-->
            <div  class="file-list">
              <ul>
                <li v-for="(item,i) in ticket.contract_attachments">
                  <i class="icon-file icon-doc"></i>
                  <span class="name">{{item.name}}</span>
                  <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
                </li>
              </ul>
            </div>
          </div>
          <!--<p class="grey-border"></p>-->
          <!--<div class="btn-box">-->
            <!--<el-button type="primary" @click="confirmContract">确认合同草案</el-button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>企业已确认</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">合同签署流程：</p>
        <div class="sign-flow">
          <ul class="clearfix">
            <li>
              <i class="icon-step first-step"></i>
              <p class="step-content">
                服务商发出合同草案<br>企业确认合同草案
              </p>
            </li>
            <li>
              <i class="icon-step second-step"></i>
              <p class="step-content">
                服务商盖章寄送合同给企业<br>一式两份

              </p>
            </li>
            <li>
              <i class="icon-step third-step"></i>
              <p class="step-content">
                企业收到服务商寄送的合同<br>共两份
              </p>
            </li>
            <li>
              <i class="icon-step fourth-step"></i>
              <p class="step-content">
                企业盖章寄送合同给服务商<br>一份寄出，一份留底
              </p>
            </li>
          </ul>
        </div>
        <span class="fs14 fc5c5">合同草案</span>
        <p class="grey-border"></p>
        <!--点击修改合同草案，之后样式变化成 上传的样式 start ===============================-->
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.contract_attachments">
              <i class="icon-file icon-xls"></i>
              <span class="name">{{item.name}}</span>
              <!--<span class="size">{{item.file_size | byteConversion}}</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>

              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
        <p class="grey-border"></p>
        <p class="fs14 fc5c5"><span class="mr20">快递信息</span>
          <span v-if="ticket.expressage==null" class="fca9a">服务商还未上传快递信息，请耐心等待</span>
          <span v-if="ticket.expressage!=null">{{ticket.expressage.category}}</span>
          <span v-if="ticket.expressage!=null">{{ticket.expressage.no}}</span></p>
        <p class="grey-border"></p>
        <p class="fs14 fc5c5" v-if="ticket.temporary==false">
          <span class="mr20">申报年份</span>
          <span v-if="ticket.year==null" class="fca9a">服务商还未上传申报年份信息，请耐心等待</span>
          <span v-else>{{ticket.year}}</span>
        </p>
        <p class="grey-border" v-if="ticket.temporary==false"></p>
        <p class="fs14 fc5c5">
          <span class="mr20">合同签署盖章扫描件</span>
          <span v-if="ticket.scan_contract_attachments==''" class="fca9a">服务商还未上传合同签署盖章扫描件，请耐心等待</span>
        </p>
        <p class="grey-border"></p>
        <div class="file-list" v-if="ticket.scan_contract_attachments!=''">
          <ul>
            <li v-for="(item ,index) in ticket.scan_contract_attachments">
              <i class="icon-file icon-doc"></i>
              <span class="name">{{item.name}}</span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a> </span>
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate, currency, byteConversion} from 'assets/js/filter'
  import API from 'API/config'
  export default{
    props: ['type','ticket','index'],
    data(){
      return {
        input: '',
        textarea: '',
        radio: '',
        listExpress:["顺丰快递","圆通快递","圆通快递","申通快递","韵达快递","天天快递","汇通快递","德邦快递","宅急送","EMS","其他"],
        currentExpressCa:'',
        currentExpressNo:'',
        value: '',
        express: false,//快递信息修改
        fix:false
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
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
      currency(val){
        return currency(val)
      },
      byteConversion(val){
        return byteConversion(val)
      }
    },
    methods: {
    	//确认合同草案
      confirmContract(){
        this.$http.patch(API.url + 'customer/stages/' +this.$route.params.stage_id+'/tickets/'+this.ticket.id
        ).then((res) => {
          this.$message({
          message: '确认成功',
          type: 'success'
        });
          this.$emit('reloadImf')
        },(error)=>{
          this.$message({
            message: '确认失败',
            type: 'warning'
          });
        })
      }

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .btn-box .el-button{
    width: auto;
  }
</style>
