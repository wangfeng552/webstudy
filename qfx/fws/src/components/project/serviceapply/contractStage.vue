<template>
  <div class="service-apply">

    <div class="gd-box">
      <div class="title">
        <i class="tit-fqht"></i>
        <span class="describe">补充合同</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>企业已确认</span>
        </div>
      </div>
      <div class="content">
        <span class="fs14 fc5c5">合同草案</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li>
              <i class="icon-file icon-doc"></i>
              <span class="name">高新技术企业认定合同书.doc</span>
              <span class="size">2.01MB</span>
              <span class="date">2017-03-06</span>
              <span class="download">下载</span>
              <span class="file-preview">预览</span>
            </li>
            <li>
              <i class="icon-file icon-xls"></i>
              <span class="name">高新技术企业认定合同书.xls</span>
              <span class="size">2.01MB</span>
              <span class="date">2017-03-06</span>
              <span class="download">下载</span>
              <span class="file-preview">预览</span>
            </li>

          </ul>
        </div>
        <p class="grey-border"></p>
        <p class="fs14 fc5c5"><span class="mr20">快递信息</span> <span>顺丰快递 </span><span>10100202393899</span><span
          class="ml10 cp fc3c8 ">修改</span></p>
        <p class="grey-border"></p>
        <p class="fs14 fc5c5"><span>合同签署盖章扫描件</span><span class="ml10 cp fc3c8">上传</span></p>
      </div>
    </div>

    <div v-for="item in listWork">
      <requestFile v-if="item.workType == 'requestFile'" :type="item.type"></requestFile>
      <affirmFile v-if="item.workType == 'affirmFile'" :type="item.type"></affirmFile>
      <sendFile v-if="item.workType == 'sendFile'" :type="item.type"></sendFile>
      <startContract v-if="item.workType == 'startContract'" :type="item.type"></startContract>
      <sendNoti v-if="item.workType == 'sendNoti'" :type="item.type"></sendNoti>
      <sendForm v-if="item.workType == 'sendForm'" :type="item.type"></sendForm>
      <startPay v-if="item.workType == 'startPay'" :type="item.type"></startPay>
    </div>

    <div class="operation-apply">
      <div class="item">
        <el-button type="primary">内部审核</el-button>
      </div>

      <div class="item">
        <span class="audit-status">
           <i class="icon fqzf-icon"></i>
          <span>等待发起</span>
        </span>
      </div>

      <div class="item" style="float: right" @click="creatPro">
        <span class="gd-btn"><i class="icon fqzf-icon"></i>创建事项</span>
      </div>

    </div>

    <div class="people">
      <div class="header-item">操作人员</div>
      <div class="peo-dowm">
        <div v-for="item in 4" class="icon_people">
          <div class="icon">徐新</div>
          <div class="postion">职位</div>
        </div>
      </div>
    </div>

    <div class="record">
      <div class="header-item">操作记录</div>


      <div v-for="item in 10" class="re-item">
        <span class="text_noaml">2017-03-06 15:05:03</span>
        <span class="text_noaml">朱玮345</span>
        <span class="text_noaml">项目分配给徐昕</span>
      </div>
    </div>

    <!--弹窗创建事项 start -->

    <el-dialog
      title="创建事项"
      :visible.sync="dialogCreatPro"
      size="tiny">
      <div class="creat-pro">
        <div class="text-nomal">请选择需要创建的事项类型：</div>
        <span class="gd-btn" @click="addWork(0)"><i class="icon sywj-icon"></i>索要文件</span>
        <span class="gd-btn" @click="addWork(1)"><i class="icon qrwj-icon"></i>确认文件</span>
        <span class="gd-btn" @click="addWork(2)"><i class="icon fswj-icon"></i>发送文件</span>
        <span class="gd-btn" @click="addWork(3)"><i class="icon fqht-icon"></i>发起合同</span>
        <span class="gd-btn" @click="addWork(4)"><i class="icon fstz-icon"></i>发送通知</span>
        <span class="gd-btn" @click="addWork(5)"><i class="icon fsbd-icon"></i>发送表单</span>
        <span class="gd-btn" @click="addWork(6)"><i class="icon fqzf-icon"></i>发起支付</span>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogCreatPro = false">取 消</el-button>
    <el-button type="primary" @click="commitCreatPro">确 定</el-button>
  </span>
    </el-dialog>

    <!--弹窗创建事项 end -->

  </div>
</template>
<script>
  import API from 'API/api'
  import requestFile from 'components/project/work/requestFile.vue'
  import affirmFile from 'components/project/work/affirmFile.vue'
  import sendFile from 'components/project/work/sendFile.vue'
  import startContract from 'components/project/work/startContract.vue'
  import sendNoti from 'components/project/work/sendNoti.vue'
  import sendForm from 'components/project/work/sendForm.vue'
  import startPay  from 'components/project/work/startPay.vue'
  export default{
    components:{
      requestFile,affirmFile,sendFile,startContract,sendNoti,sendForm,startPay
    },
    created(){
      this.$http.get(API.serviceurl+'service_categories').then((res)=>{
        var resBody=res.body;
        this.service_categories = resBody.service_categories
      }).catch()
    },
    mounted(){
      // 观察传进来的值是哪个
    },
    data(){
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        radio: '',
        radio1: '',
        radio2: '',
        modify:false,//修改表单
        dialogCreatPro:false,
        currentWork:"",
        // 所有的工单,包括之前 网络请求来的 和 新加的
        listWork:[
//          {
//              workType:"requestFile",
//              type:1
//          },
//          {
//            workType:"affirmFile",
//            type:1
//          },
//          {
//            workType:"sendFile",
//            type:1
//          },
//          {
//            workType:"startContract",
//            type:1
//          },
//          {
//            workType:"sendNoti",
//            type:1
//          },
//          {
//            workType:"sendForm",
//            type:1
//          },
//          {
//            workType:"startPay",
//            type:1
//          }
        ]
      };
    },
    methods:{
      log(item){
        console.log(item);
      },
      creatPro(){
        this.dialogCreatPro = true;
      },
      //弹出框 选中 点击确定
      commitCreatPro(){
        this.dialogCreatPro = false;
        if(this.currentWork.length > 0){
          var work = {};
          work.workType = this.currentWork;
          work.type = 1;
          this.listWork.push(work);
        }
      },
      addWork(index){
        var str = "";
        switch(index)
        {
          case 0:
            str = "requestFile";
            break;
          case 1:
            str = "affirmFile";
            break;
          case 2:
            str = "sendFile";
            break;
          case 3:
            str = "startContract";
            break;
          case 4:
            str = "sendNoti";
            break;
          case 5:
            str = "sendForm";
            break;
          case 6:
            str = "startPay";
            break;
          default:
            str = "";
        }
        this.log(str);
        if(str.length>0){
          this.currentWork = str;
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">

  .service-apply {
    /*  i 标签的图标*/
    .icon{
      display: inline-block;
      vertical-align: middle;
      margin-right:5px;
      margin-top:-3px;
    }
    /*常规字体颜色*/
    .text-nomal {
      /*font-family:MicrosoftYaHei;*/
      font-size:14px;
      color:#666666;
    }
    .status {
      width: 140px;
      height: 58px;
      line-height: 58px;
      text-align: center;
      color: #FFFFFF;
      font-size: 14px;
      span {
        vertical-align: middle;
      }
    }
    .icon-yes {
      background: url("../../../assets/images/gd_ico/yes.png") no-repeat 0/cover;
    }

    .operation-apply {
      margin-top: 14px;
      margin-bottom: 30px;
      overflow: hidden;
      .item{
        float: left;
      }
    }
    // 公共头部的样式
    .header-item {
      height: 40px;
      border-left: 4px solid #3c8ced;
      background-color: #f5f5f5;
      vertical-align: middle;
      line-height: 40px;
      padding-left: 10px;
    }
    .record {
      .nothing{
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        .icon-nothing {
          width:15px;
          height:16px;
          background:url("../../../assets/images/gd_ico/qrwj.png") no-repeat 0/cover;
        }
      }
      .re-item{
        overflow: hidden;
        margin-top: 12px;
        margin-bottom: 12px;
        span{
          float: left;
          display: inline-block;
          &:first-child{
            margin-left: 20px;
            width: 20%;
          }
          &:nth-child(2){
            width: 30%;
          }
          &:last-child{
            margin-left: 10px;
          }
        }
      }
    }

    .peo-dowm {
      overflow: hidden;

    }
    .text_noaml{
      /*font-family:MicrosoftYaHei;*/
      font-size:14px;
      color:#5c5c5c;
      line-height:14px;
    }
    .icon_people {
      width: 60px;
      height: 85px;
      float: left;
      font-size: 14px;
      margin-left: 20px;
      margin-top: 5px;
      margin-bottom: 5px;
      .icon{
        background-color: red;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        border-radius:30px;
        text-align: center;
        vertical-align: middle;
        line-height: 60px;
        color: #fff;
        background-color: #4688da;
      }
      .postion {
        width: 60px;
        text-align: center;
        color:#8e8e8e;
        margin-top: 5px;
      }
    }

    .gd-btn{
      display: inline-block;
      border:1px solid #3c8ced;
      border-radius:3px;
      width:96px;
      height:36px;
      line-height:36px;
      text-align: center;
      font-size:14px;
      color:#3c8ced;
      cursor: pointer;
      margin-right:20px;
      .icon{
        display: inline-block;
        vertical-align: middle;
        margin-right:5px;
        margin-top:-3px;
      }
    }
    .fqzf-icon{
      width:14px;
      height:15px;
      background:url("../../../assets/images/gd_ico/fqzf.png") no-repeat 0/cover;
    }

    // 审核状态
    .audit-status {
      display: inline-block;
      /*border:1px solid #3c8ced;*/
      border-radius:3px;
      width:96px;
      height:36px;
      line-height:36px;
      text-align: center;
      font-size:14px;
      color:#3c8ced;
      cursor: pointer;
      margin-right:20px;
      .icon{
        display: inline-block;
        vertical-align: middle;
        margin-right:5px;
        margin-top:-3px;
      }
    }

    .creat-pro{

      .header-creat {

      }


      .gd-btn{

        margin-top: 10px;

        display: inline-block;
        border:1px solid #3c8ced;
        border-radius:3px;
        width:96px;
        height:36px;
        line-height:36px;
        text-align: center;
        font-size:14px;
        color:#3c8ced;
        cursor: pointer;
        margin-right:20px;
        .icon{
          display: inline-block;
          vertical-align: middle;
          margin-right:5px;
          margin-top:-3px;
        }
      }
      .sywj-icon{
        width:15px;
        height:16px;
        background:url("../../../assets/images/gd_ico/qrwj.png") no-repeat 0/cover;
      }
      .qrwj-icon{
        width:15px;
        height:16px;
        background:url("../../../assets/images/gd_ico/sywj.png") no-repeat 0/cover;
      }
      .fswj-icon{
        width:15px;
        height:13px;
        background:url("../../../assets/images/gd_ico/fswj.png") no-repeat 0/cover;
      }
      .fqht-icon{
        width:15px;
        height:15px;
        background:url("../../../assets/images/gd_ico/fqht.png") no-repeat 0/cover;
      }
      .fstz-icon{
        width:15px;
        height:15px;
        background:url("../../../assets/images/gd_ico/fstz.png") no-repeat 0/cover;
      }
      .fsbd-icon{
        width:14px;
        height:16px;
        background:url("../../../assets/images/gd_ico/fsbd.png") no-repeat 0/cover;
      }
      .fqzf-icon{
        width:14px;
        height:15px;
        background:url("../../../assets/images/gd_ico/fqzf.png") no-repeat 0/cover;
      }

    }

  }



</style>

