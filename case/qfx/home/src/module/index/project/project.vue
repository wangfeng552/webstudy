<template>
  <div class="project" v-if="project">
    <div class="w1200">
      <div class="breadcrumb">
        <ul>
          <li>
            <router-link :to="{name:'userCenterDefault'}">我的项目</router-link>
          </li>
          <li>{{project.service}}</li>
        </ul>
      </div>
      <div class="project-brief">
        <div class="left-box">
          <div class="title">
            <span class="number">项目名称</span>
            <span class="name">项目编号</span>
            <span class="client">服务商</span>
            <span class="source">项目最新联系人</span>
            <span class="date">项目进度</span>
          </div>
          <div class="content">
            <i class="apply-year" v-if="project.year!=null">{{project.year}}年申报</i>
            <p class="number">
              <a :title="project.service">{{project.service}}</a>
              <br>
              <span class="created-time">{{project.created_at|formatDate}}</span>
            </p>
            <p class="name">{{project.no}}</p>
            <p class="client"><a :title="project.provider">{{project.provider}}</a></p>
            <p class="source"><span v-if="project.current_operater">{{project.current_operater}} | {{project.operater_phone_number}}</span><span
              v-else="">--</span></p>
            <p class="date">
              <el-progress type="circle" :percentage="project.stages_percent" :width="60" :stroke-width="3"
                           :status="projectStatus"></el-progress>
            </p>
          </div>
        </div>
        <router-link :to="{name:'fileDtl',params:{id:this.$route.params.id,stage_id:this.$route.params.stage_id}}">
          <div class="right-box">
            <p>
              <i class="person"></i>
              <span>文件库</span>
            </p>
          </div>
        </router-link>

      </div>
      <div class="project-detail clearfix">
        <div class="pro-tab">
          <ul>
            <li v-for="(v,i) in proTabs" @click="chooseActive(v,i)" :class="{'active':v.isActive}">
              <div :class="{'item-box':i===0}">
                <i class="pro-icon icon-project" :class="{'icon-project-hover':v.isActive}" v-show="i===0"></i>
                <i class="pro-icon icon-payment" :class="{'icon-payment-hover':v.isActive}" v-show="i===1"></i>
                <span class="pro-text">{{v.name}}</span>
              </div>
            </li>
          </ul>
          <span class="bottom-line" ref="bottomLine" :class="{'line-right':proItem==1}"></span>
        </div>
        <div v-show="proItem===0">
          <div class="project-nav">
            <ul>
              <li v-for="(v,i) in project.stages" @click="toggle(i,v.id,v.status)">
                <div class="inner-box">
                  <router-link :to="{name:'serviceApply',params:{stage_id:v.id}}" active-class="hover"
                               v-if="(v.children=='')&&(v.status!='unactive')&&!v.is_lock">{{v.name}}
                  </router-link>
                  <a v-if="v.children!=''&&v.status!='unactive'&&!v.is_lock" class="cp" @click="fixProcess(v,i)"
                     :class="{'parent-active':i===currentIndex}">{{v.name}}</a>
                  <a v-if="v.status=='unactive'&&!v.is_lock">{{v.name}}</a>
                  <span class="circle"
                        :class="v.status | chooseState"></span>
                </div>
                <div v-if="i===currentIndex">
                  <ul class="children">
                    <li v-for="(child,row) in v.children" @click="chooseChild(row,child.status)">
                      <div class="inner-child">
                        <router-link :to="{name:'serviceApply',params:{stage_id:child.id}}" active-class="hover"
                                     v-if="child.status!='unactive'&&child.status!='stop'&&child.status!='deny'">
                          {{child.name}}
                        </router-link>
                        <router-link :to="{name:'serviceApply',params:{stage_id:child.id}}" active-class="forbidden"
                                     v-if="child.status=='stop'||child.status=='deny'">{{child.name}}
                        </router-link>
                        <a v-if="child.status=='unactive'" class="unactive">{{child.name}}</a>
                        <span class="circle"
                              :class="child.status | chooseChildState"></span>
                        <span class="green-line" v-show="child.status=='complete'&&row!==v.children.length-1"></span>
                        <span class="grey-line" v-show="child.status!='complete'&&row!==v.children.length-1"></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="project-content">
            <router-view></router-view>
          </div>
        </div>
        <div v-show="proItem===1">
          <div class="no-data" v-if="!tickets.length"></div>
          <div class="big-gd" v-else>
            <div v-for="(item,index) in tickets">

            <!--发起支付-->
            <startPay v-if="item.category == 'pay'&&item.trade!=null"
                      :type="item.status"
                      :index="index"
                      :ticket="item"
                      :payWay="item.trade.category"
            >
            </startPay>
            <!--发起支付初始状态-->
            <startPay v-if="item.category == 'pay'&&item.trade==null"
                      :type="item.status"
                      :index="index"
                      :ticket="item"
            >
            </startPay>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  import {formatDate, currency} from 'assets/js/filter'
  import startPay from './work/startPay.vue'

  export default{
    components:{startPay},
    data(){
      return {
        corpsDtl: {},
        rules: {
          office_location: [
            {required: true, message: '请填写企业地址', trigger: 'blur'},
          ]
        },
        select: {province: '', city: '', area: ''},//下拉框选择的值
        placeholders: {//地址默认值
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        revise: true,
        errorShow: false,
        activeName: 'first',
        project: '',//项目数据
        corps: '',//企业数据
        contracts: [],//联系人数据
        contractVisible: false,//查看联系人
        newContract: false,
        contact: {
          name: '',
          position: '',
          mobile: '',
          phone: '',
          email: ''
        },
        modify: {//修改联系人
          name: '',
          position: '',
          mobile: '',
          phone: '',
          email: ''
        },
        nav: [
          {name: "服务申请", children: [], id: 5},
          {name: "合同签署", children: [], id: 6},
          {name: "申报阶段", children: [{name: 'eee', id: 10}, {name: 'bbb', id: 2}, {name: 'ccc', id: 3}], id: 1},
          {name: "中期验收", children: [{name: 'eee', id: '4'}], id: '9'},
          {name: "项目验收", children: [], id: 7},
          {name: "项目完成", children: [], id: 8},
        ],
        router: {},
        slideDown: '',
        currentIndex: '',
        row: "",
        contractIndex: 'aa',//悬案
        editStatus: true,
        corpId: '',//企业id
        close: true,//关闭项目
        closeStatus: true,//判断项目是否可以关闭
        tickets: '',//获取支付数据
        action_router: true,//获取子路由数据
        proTabs: [
          {name: '项目实施', isActive: true},
          {name: '费用支付', isActive: false},
        ],
        proItem: 0,//显示的tab,初始状态停留在项目详情
        projectStatus: '',
      }
    },
    beforeRouteLeave(to,from,next){
      var mark =false;
      if(to.name=='serviceApply'||to.name=='payMethod'){
        mark = true
      }
      if(!mark){
        this.$store.dispatch('projectTab',0)
      }
      next(true)
    },
    created(){
      this.getStage()
      //获取支付数据
      this.getFee()

    },
    mounted(){
      //获取初始tab值
      this.chooseActive(this.proTabs[this.projectTab],this.projectTab)

    },
    computed: {
      ...mapGetters(["action","projectTab"]),
    },
    methods: {
      getStage(){
        this.$http.get(API.url + 'customer/projects/' + this.$route.params.id
        ).then((res) => {
          this.project = res.body.project
          this.initIndex();
          //判断项目进度
          if (this.project.status == 'proceeding') {
            this.projectStatus = ''
          } else if (this.project.status == 'stop' || this.project.status == 'deny') {
            this.projectStatus = 'exception'
          } else if (this.project.status == 'finished') {
            this.projectStatus = 'success'
          }
        })
      },
      //获取支付费用
      getFee(){
        this.$http.get(API.url + 'customer/projects/' + this.$route.params.id + '/pay_tickets'
        ).then((res) => {
          this.tickets = res.body.tickets
          this.tickets.forEach((v)=>{
          	if(v.trade.category=='offline'){

            }
          })
        })
      },
      //将支付情况传递到子路由
      setFee(){
        this.action_router = !this.action_router
        if (this.action_router === false) {
          this.getFee()
        } else {
          var mark = !this.action;
          this.$store.dispatch('getImf', mark);
        }
//        this.$store.dispatch('getImf',this.action_router);
      },
      //初始化 当前阶段的值
      initIndex(){
        var section = -100;
        var row = -100;
        console.log()
        this.project.stages.forEach(function (item, index) {
          if (item.status == 'process') {
            section = index;
            item.children.forEach(function (item_ch, index_ch) {
              if (item_ch.status == 'process') {
                row = index_ch;
              }
            })
          }
        })
        if (section >= 0) this.currentIndex = section;
        if (row >= 0) this.row = row;
        if (section == -100 && row == -100) {
          var item = this.project.stages[this.project.stages.length - 1];
          if (item.category == 'finished' && item.status == 'finished') section = this.project.stages.length - 1;
        }
      },

      toggle(i, state_id, status){
        if (status != 'unactive') {
          this.currentIndex = i
          this.childShow(i);
          this.closeStatus = status == 'process'
        }
      },
      // 点击子阶段
      chooseChild(row, status){
        if (status != 'unactive') {
          this.row = row;
          this.closeStatus = status == 'process'
        }

      },
      childShow(i){
        return i === this.currentIndex
      },
      //点击侧边栏定位到正在进行中的子阶段
      fixProcess(item, i){
        item.children.forEach((v) => {
          if (v.status == "process") {
            this.$router.push({name: 'serviceApply', params: {stage_id: v.id}})
          }
        })

      },
      //点击tab切换项目内容
      chooseActive(v, i){
        this.proItem = i
        this.$store.dispatch('projectTab',i)
        this.proTabs.forEach((v) => {
          v.isActive = false
        })
        this.proTabs[i].isActive = true
      },

    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      chooseState(state){
        if (state == 'process') {
          return 'circle-process'
        } else if (state == 'complete') {
          return 'circle-complete'
        } else if (state == 'deny' || state == 'stop') {
          return 'circle-stop'
        } else if (state == 'unactive') {
          return 'circle-unactive'
        }
      },
      chooseChildState(state){
        if (state == 'process') {
          return 'circle-orange'
        } else if (state == 'complete') {
          return 'circle-green'
        } else if (state == 'deny' || state == 'stop') {
          return 'circle-red'
        } else if (state == 'unactive') {
          return 'circle-grey'
        }
      },
      currency(val, c, d){
        return currency(val, c, 0)
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scope>
  .mt20 {
    margin-top: 20px;
  }

  .project {
    background: #f5f5f5;
    .el-breadcrumb {
      margin-bottom: 0;
    }
    .el-breadcrumb:after {
      height: 0;
    }
    .project-brief {
      height: 142px;
      margin-bottom: 20px;
      .left-box {
        float: left;
        width: 1020px;
        margin-right: 10px;
        height: 140px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);

        .title {
          height: 40px;
          line-height: 40px;
          background: #e1efff;
        }
        .content {
          position: relative;
          height: 100px;
          padding-top: 21px;
          .number, .name, .client, .type, .source {
            margin-top: 11px;
          }
          .created-time {
            font-size: 12px;
            color: #999999;
          }
          .apply-year {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 83px;
            height: 19px;
            line-height: 19px;
            padding-left: 6px;
            color: #FFFFFF;
            font-size: 12px;
            background: url("../../../assets/images/project/apply-year.png") no-repeat;
          }
        }
        .title span {
          float: left;
          display: inline-block;
          color: #1b1b1b;
          font-size: 14px;
          text-align: left;
        }
        .title, .content {
          p {
            float: left;
            color: #5c5c5c;
            font-size: 12px;

          }

          .number {
            padding-left: 20px;
            width: 408px;
            font-size: 14px;
            a {
              display: inline-block;
              color: #5c5c5c;
              width: 350px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;

            }
          }
          .name {
            width: 107px;
          }
          .client {
            width: 234px;
            a {
              display: inline-block;
              color: #5c5c5c;
              width: 200px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;

            }
          }
          .source {
            width: 163px;
          }
          .date {
            width: 108px;
          }
        }
      }
      .right-box {
        float: left;
        width: 168px;
        height: 100%;
        padding: 60px 0 0 53px;
        cursor: pointer;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
        .contract {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../../../assets/images/project/contract.png") no-repeat 0/cover;
          vertical-align: middle;

        }
        .person {
          display: inline-block;
          width: 14px;
          height: 15px;
          background: url("../../../assets/images/project/file.png") no-repeat 0/cover;
          vertical-align: middle;

        }
        p {
          margin-bottom: 10px;
        }
        span {
          font-size: 14px;
          color: #5c5c5c;
        }
        //地址报错的时候给select添加样式
        .red-box {
          select {
            border: 1px solid red;
          }
        }
        .choose-box {
          float: left;
          margin-bottom: 10px;
          select {
            font-size: 14px;
          }
        }
        .el-dialog {
          p {
            cursor: auto;
          }
          .tit {
            color: #1b1b1b;
            margin-left: 0;
          }
          .icon-location {
            display: inline-block;
            height: 21px;
            width: 15px;
            background: url("../../../assets/images/project/location.png") no-repeat 0/cover;
            vertical-align: middle;
            margin-right: 5px;
          }
          .default {
            display: inline-block;
            background: #e65c5c;
            border-radius: 100px;
            width: 35px;
            height: 19px;
            text-align: center;
            line-height: 19px;
            font-size: 12px;
            color: #ffffff;
          }
          .revise, .is-default, .add-contract, .save, .cancel, .on-save {
            color: #3c8ced;
            cursor: pointer;
          }
          .save {
            margin-left: 30px;
          }
          .add-contract {
            margin-top: 10px;
          }
          .delete {
            cursor: pointer;
            color: #e65c5c;
          }
          .el-form-item {
            width: 380px;
            margin-top: 10px;
          }
          .error-show {
            color: red;
            margin-bottom: 5px;
            margin-top: 5px;
          }
          .custom-btn {
            display: inline-block;
            border: 1px solid #3c8ced;
            border-radius: 2px;
            width: 66px;
            height: 22px;
            line-height: 20px;
            text-align: center;
            color: #3c8ced;
            font-size: 12px;
            cursor: pointer;
          }
          .primary-btn {
            display: inline-block;
            background: #3c8ced;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10);
            border-radius: 2px;
            width: 68px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #ffffff;;
            font-size: 12px;
            cursor: pointer;
            &:hover {
              background: rgba(#3c8ced, .9);
            }
          }
          //添加联系人的输入框样式
          .new-contract {
            margin-top: 20px;
          }
          .contact-name {
            width: 110px;
            margin-right: 15px;
          }
          .contact-position {
            width: 102px;
            margin-right: 12px;
          }
          .contact-mobile {
            width: 120px;
            margin-right: 14px;
          }
          .contact-phone {
            width: 120px;
            margin-right: 10px;
          }
          .contact-email {
            width: 182px;
          }
        }
      }
    }
    .project-detail {
      position: relative;
      background: #FFFFFF;
      padding: 10px 20px;
      .close-btn {
        position: absolute;
        top: 25px;
        right: 20px;
        display: inline-block;
        width: 100px;
        height: 31px;
        line-height: 29px;
        padding-left: 12px;
        border: 1px solid #e65c5c;
        border-radius: 2px;
        font-size: 14px;
        color: #e65c5c;
        cursor: pointer;
      }
      i.close {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url("../../../assets/images/project/close.png") no-repeat 0/cover;
        vertical-align: middle;
        margin-right: 3px;
        margin-top: -2px;
      }
      .pro-tab {
        position: relative;
        height: 60px;
        border-bottom: 1px solid #efefef;
        margin-bottom: 25px;
        .bottom-line {
          position: absolute;
          bottom: -1px;
          left: 440px;
          display: inline-block;
          height: 2px;
          background: #3c8ced;
          width: 120px;
          transform:translateX(0px);
          transition: transform .3s cubic-bezier(.645, .045, .355, 1);
        }
        .line-right{
          transform:translateX(160px);
        }
        ul {
          text-align: center;
          height: 59px;
        }
        li {
          display: inline-block;
          width: 160px;
          font-size: 14px;
          padding: 20px 0;
          cursor: pointer;
          .item-box {
            border-right: 1px solid #efefef;
          }
          .pro-text {
            display: inline-block;
            color: #5c5c5c;
            vertical-align: middle;
            margin-top: -1px;
          }
          .pro-icon {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: middle;
          }
          .icon-project {
            background: url("../../../assets/images/project/project.png") no-repeat;
          }
          .icon-project-hover {
            background: url("../../../assets/images/project/project_hover.png") no-repeat;
          }
          .icon-payment {
            background: url("../../../assets/images/project/payment.png") no-repeat;
          }
          .icon-payment-hover {
            background: url("../../../assets/images/project/payment_hover.png") no-repeat;
          }

        }
        li.active {
          .pro-text {
            font-weight: bold;
            color: #3c8ced;
          }
        }

      }
    }
    .project-nav {
      float: left;
      background: #ffffff;
      width: 214px;
      margin-right: 13px;
      .circle {
        display: inline-block;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 55px;
        height: 50px;
      }
      .circle-process {
        background: url("../../../assets/images/project/sb-process.png") no-repeat;
      }
      .circle-stop {
        background: url("../../../assets/images/project/sb-stop.png") no-repeat;
      }
      .circle-complete {
        background: url("../../../assets/images/project/sb-complete.png") no-repeat;
      }
      .circle-unactive {
        background: url("../../../assets/images/project/sb-unactive.png") no-repeat;
      }

      li {
        .parent-active {
          transition: color, font-weight .1s, color .1s;
          color: #3c8ced;
          font-weight: bold;
        }
        .inner-box {
          position: relative;
          height: 50px;
          border-radius: 25px;
          line-height: 48px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
          padding: 0;
          margin-bottom: 28px;
          background: #FFFFFF;
        }
        a {
          height: 48px;
          display: inline-block;
          margin-left: 50px;
          font-size: 14px;
          color: #5c5c5c;
          height: 100%;
          width: 164px;
          text-align: center;
          &.hover {
            transition: color, font-weight .1s, color .1s;
            color: #3c8ced;
            font-weight: bold;
          }
        }
        .children {
          margin-bottom: 21px;
          padding-left: 20px;
          li {
            .inner-child {
              position: relative;
              padding: 0;
              background: #FFFFFF;
              margin-bottom: 21px;
            }
            a {
              display: inline-block;
              margin-left: 24px;
              padding-left: 0;
              font-size: 14px;
              color: #5c5c5c;
              height: 100%;
              width: 100%;
              text-align: left;
              &.hover {
                transition: color, font-weight .1s, color .1s;
                color: #3c8ced;
                font-weight: bold;
              }
              &.unactive {
                color: #999;
              }
              &.forbidden {
                transition: color, font-weight .1s, color .1s;
                color: #e45b5f;
                font-weight: bold;
              }
            }
            .circle {
              display: inline-block;
              position: absolute;
              top: 6px;
              left: 0px;
              width: 12px;
              height: 12px;
              border-radius: 100%;
            }
            .circle-orange {
              background: #ffffff;
              border: 2px solid #f1b947;
              z-index: 2;
            }
            .circle-green {
              background: #4bad6b;
              border: 2px solid #4bad6b;
            }
            .circle-red {
              background: #ffffff;
              border: 2px solid #e45b5f;
              z-index: 2;
            }
            .circle-grey {
              background: #ffffff;
              border: 2px solid #d1d1d1;
              z-index: 2;
            }
            .green-line {
              position: absolute;
              top: 11px;
              left: 4px;
              height: 40px;
              width: 4px;
              background: #4bad6b;
              z-index: 1;
            }
            .grey-line {
              position: absolute;
              top: 11px;
              left: 4px;
              height: 40px;
              width: 4px;
              background: #efefef;
              z-index: 1;
            }
          }
        }
      }
      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 208px;
        height: 49px;
        background: rgba(0, 0, 0, .4);
      }
    }
    .project-content {
      float: left;
      width: 930px;
    }
    .el-tabs {
      padding-left: 0;
    }
    .no-data {
      width: (586px/2);
      height: (420px/2);
      background: url("../../../assets/images/nodata.png") no-repeat center;
      -webkit-background-size: (586px/2);
      background-size: (586px/2);
      margin: auto;
    }

  }
</style>
<!--人员变更弹框样式-->
<style lang="scss" rel="stylesheet/scss">
  .project-detail {
    .el-tabs__nav-scroll {
      padding: 0 399px;
    }
    .el-tabs__item {
      width: 120px;
      padding: 0 30px;
      margin: 19px 20px;
      height: auto;
      line-height: 23px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #1b1b1b;
      border-right: 1px solid #000;
    }
    .el-tabs__active-bar {
      height: 2px;
      background-color: #3c8ced;
      margin: 0 20px;
      width: 80px !important;

    }
    .el-tabs__item.is-active {
      color: #3c8ced;
    }
  }

  .person-change-dia {
    .el-dialog--tiny {
      width: 548px;
      height: 398px;
      background: url("../../../assets/images/project/person-change.png") no-repeat;
      box-shadow: none;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
    }
    .el-dialog__headerbtn .el-dialog__close {
      height: 43px;
      width: 44px;
      background: url("../../../assets/images/project/i-pc-close.png") no-repeat;
      margin-right: -21px;
      margin-top: 9px;
    }
    .el-icon-close:before {
      content: '';
    }
    .el-dialog__body {
      margin-top: 200px;
      padding: 0;
    }
    .person-content {
      width: 448px;
      font-size: 14px;
      color: #5c5c5c;
      margin: auto;
    }
    .btn-box {
      margin-top: 46px;
      text-align: center;
      .el-button--primary {
        background: #3c8ced;
        border-radius: 4px;
        width: 98px;
        height: 38px;
      }
    }
  }

  .project {

  }
</style>
