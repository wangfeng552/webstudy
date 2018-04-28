<template>
  <div class="make-order">
    <div class="header" v-if="!(browser || jfmore)">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>填写订单</p>
    </div>
    <div :class="{ 'content': !(browser || jfmore)}">
      <div class="order-details bg">
        <p class="order-name">{{details.ticketName}}</p>
        <a class="notice" @click="goTicketTips">
            <i>
                <img src="./img/notice.png" alt="">
              </i> 
              <i class="ti">
                  购票须知
                </i> 
              <i>
                <img src="./img/you.png" alt="">
              </i>
        </a>
        <h1 class="price-sheet">
          <i>¥</i>
          <span>{{time.tcAmount}}/张</span>
        </h1>
      </div>
      <div class="trip bg">
        <div class="trip-time" v-show="!time.isCalendar">
            <span>出行日期</span>
            <div class="time">
              <span :class="{'select-time' :time.date === ti.date}" v-for="ti in laterStage"  @click="checkTime(ti)">
                <p class="time-p">{{ti.display}}</p>
                <p class="trip-p">¥{{ti.tcAmount}}</p>
              </span>
              <span class="more-time" @click="setTime">
                <div>
                  <p>更多</p>
                  <p>日期</p>
                </div>
                <i class="you">
                  <img src="./img/you.png" alt="">
                </i>
              </span>
            </div>
        </div>

        <div class="trip-time-check" v-show="time.isCalendar">
          <span>出行日期</span>
          <span class="specific-time" @click="setTime">
              <span>{{time.date}}</span>
              <span class="week">
                星期{{time.week == 0 ? '日' : time.week}}
              </span>
              <i class="you">
                <img src="./img/you.png" alt="">
              </i>
          </span>
        </div>

         <div class="ticket-number">
           <span class="ticket">门票数量</span>
           <div class="number">
             <i  :class="{ 'not-must': travelerList.length == time.minTickets}" class="icon iconfont icon-jian" @click="ticketsNumFunc(-1)"></i>
             <span>
               {{travelerList.length}}
             </span>
             <i :class="{ 'not-must': travelerList.length == time.maxTickets}"  class="icon iconfont icon-jia" @click="ticketsNumFunc(1)"></i>
           </div>
         </div>
      </div>

      <travelPerson-components  :details="details"  :traveler="travelerList[0]" :index="0" v-if="!details.isRealName && !details.isNeedIdCard"></travelPerson-components>
      <travelPerson-components v-for="(traveler, index) in travelerList"  :details="details"  :traveler="traveler" :index="index" v-else></travelPerson-components>

      <!-- 先判断是否支持场次, 然后用户选择时间后 在显示场次  -->
      <div class="screenings bg">
          <div class="screenings-dom" v-show="details.isScreening && time.date"  @click="choicescreen(true, false)">
            <div class="scree-div">
              <span>
                场次选择
              </span>
              <div class="screen" v-show="!screenings.showId">
                请选择
                <span>
                    <img src="./img/you.png" alt="">
                </span>
              </div>
              
              <div class="screeing-checkout" v-show="screenings.showId">
                <i class="show-name">
                  {{screenings.showBeginTime}} - {{screenings.showEndTime}} 
                  </i>
                <span>
                    <img src="./img/you.png" alt="">
                </span>
              </div>
            </div>
          </div>

          <div class="invoice-select screenings-dom" @click="invoice">
            <div class="scree-div">
              <span>
                发票
              </span>

              <div class="screen">
                 <i v-show="invoiceInfo.invoiceFlag !== '01'">
                  无需发票
                </i>
                <i v-show="invoiceInfo.invoiceFlag === '01'">
                  {{invoiceInfo.invoicetitle}}
                </i>
                
                <span>
                    <img src="./img/you.png" alt="">
                </span>
              </div>
            </div>
          </div>
      </div>


            
      <div class="tourist-info bg" v-show="details.IsPost">
        <div class="title">
          <i>
            <img src="./img/mail.png" alt="">
          </i>
          邮寄地址
        </div>
        <div class="input-info">
          <span>
            姓名
          </span>
          <input type="text" v-model="receivername"  placeholder="请填写 你的姓名">
        </div>

        <div class="input-info">
          <span>
            手机号
          </span>
          <input type="text" v-model="receiverphone"  placeholder="请填写手机号码">
        </div>

        <div class="input-info no-border">
          <span>
            地址
          </span>
          <input type="text"  v-model="receiverarea" placeholder="用于收货的地址">
        </div>
      </div>
      

      <div class="remark bg" v-show="details.isReMark">
        <span>
          备注信息
        </span>
        <textarea name="" id="" cols="30" rows="10" v-model="bookremark" placeholder="如有特殊需求，请备注说明"></textarea>
      </div>
      <div class="cue">
        温馨提示：门票服务由同程旅游提供，使用期间，如遇到问题请联系
        <p>
          同程客服：<a :href="'tel://328402323'">328402323</a>
        </p>
      </div>

      <div class="payment bg">
          <div class="price">
            实付<i>¥</i> <h1>{{(time.tcAmount * travelerList.length * (invoiceInfo.invoiceFlag === '01' ? 1.06 : 1)).toFixed(2)}}</h1> <i>元</i>
          </div>
          <div class="pay-button" @click="toPay">
            去付款
          </div>
      </div>

      <div class="order-screen" v-show="isShoeScreenings">
        <div class="screen-content">
          <div class="screen-title">
              <span @click="choicescreen(false, false)">
                取消
              </span>
              <div>
                请选择场次
              </div>
              <span @click="choicescreen(false, true)">
                确定
              </span>
          </div>
          <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </div>
      </div>

    </div>
    <div v-show="false">
      {{getScreenings}}
    </div>
    <!-- from 表单提交 -->
    <form action="" ref="formUrl" id="payForm" name="payForm" method="post">
      <input type="hidden" ref="funCode" name="funCode" value=""/>
      <input type="hidden" ref="rpid" name="rpid" value=""/>
      <input type="hidden" ref="reqDate" name="reqDate" value=""/>
      <input type="hidden" ref="reqTime" name="reqTime" value=""/>
      <input type="hidden" ref="paySeq" name="paySeq" value=""/>
      <input type="hidden" ref="retUrl" name="retUrl" value=""/>
      <input type="hidden" ref="sign" name="sign" value=""/>
      <input type="hidden" ref="expand" name="expand" value=""/>
    </form>
  </div>
</template>
<script>
import travelPersonComponents from "./travelPersonComponents";
import { browserUtil, userUtil, cookieUtil } from "../../assets/js/common";
import { mapState, mapActions } from "vuex";
import queryOrderServer from "../../service/orderDownService";
import { Toast, Indicator, Picker } from "mint-ui";

export default {
  components: {
    "travelPerson-components": travelPersonComponents
  },
  data() {
    return {
      browser: false,
      jfmore: false,
      mobileIdentifier: "60505", //手机识别码

      bookremark: "", // 备注信息
      receiverarea: "", //收货人地区
      receivername: "", // 收货人姓名
      receiverphone: "", // 收货人手机

      details: {}, // 详情页面信息
      // userNotes: {}, //入园凭证 和 一些信息
      laterStage: [], //存放明后两天的时间
      screenings: {
        leftAmount: "",
        showBeginTime: "",
        showEndTime: "",
        showId: "",
        showName: ""
      }, // 场次  用户选中场次
      _screenings: {
        leftAmount: "",
        showBeginTime: "",
        showEndTime: "",
        showId: "",
        showName: ""
      }, //缓存数据 //当用户点击确认后 在赋值
      isShoeScreenings: false, //场次显示 隐藏
      slots: [
        {
          flex: 1,
          values: [],
          className: "screening",
          textAlign: "center",
          elements: [],
          value: ""
        }
      ], //场次
      travelerList: [
        // 出游人
        {
          travelername: "", // 取票人
          travelermobile: "", // 取票人手机
          travelercertype: "6050201", //取票人证件类型(默认身份证)
          travelermobiletype: "1", //取票手机类型
          traveleridcardno: "", //取票人证件号
          travelerEmail: "" //取票人邮箱 默认为空 没有  不知道是不是必传,
        }
      ]
    };
  },
  computed: {
    ...mapState(["time", "orderUser", "invoiceInfo"]),
    getScreenings() {
      // this.details['isScreening'] 是否支持场次, 不支持场次, 则不请求
      // 场次先不管把
      let __that = this;
      if (this.details["isScreening"] && this.time.priceId && this.time.date) {
        queryOrderServer
          .getScreenings({
            priceId: this.time.priceId,
            travelDate: this.time.date
          })
          .then(
            res => {
              // 场次信息
              __that.slots[0].values = res.data.values;
              __that.slots.elements = res.data.elements;
            },
            res => {
              __that.toast(res.respMsg);
            }
          );
      }
    }
  },
  methods: {
    ...mapActions(["confirmLogin", "confirmWeChat", "getOrderUser", "getTime"]),
    setTime: function() {
      // 跳转到时间页面
      this.$router.push({
        path: "time",
        query: { priceId: this.details.ticketPriceId }
      });
    },
    goBack: function() {
      this.$router.go(-1);
    },
    checkTime: function(ti) {
      this.getTime(ti);
      // this.travelerList.length = 1;
    },

    toast: function(message, position = "bottom", duration = 1000) {
      Toast({
        message,
        position,
        duration
      });
    },
    checkLogin() {
      // 当有登陆 则直接提交
      var me = this;
      let obj = {
        login_token: cookieUtil.get("login_token"),
        mobileIdentifier: "",
        priceId: this.details.ticketPriceId, // 票的id _that.details.ticketPriceId
        travelDate: this.time.date, //旅游日期 占时写死 还需要逻辑
        ticketsNum: this.travelerList.length, // 取票数
        receiverarea: this.receiverarea, // 收货地址
        receivername: this.receivername, // 收货人姓名
        receiverphone: this.receiverphone, // 收货人手机
        travelerList: JSON.stringify(this.travelerList),
        invoice: this.invoiceInfo.type ? JSON.stringify(this.invoiceInfo) : "", //发票信息
        invoiceFlag: this.invoiceInfo.invoiceFlag == "01" ? "01" : "00", //是否开发票
        screeningId: this.screenings.showId, // 场次id
        beginTime: this.screenings.showBeginTime, //场次开始时间
        endTime: this.screenings.showEndTime, //场次结束时间
        bookremark: this.bookremark, // 用户备注
        tcAmount: this.time.tcAmount, //同城单价  不可能是这个 _that.details.marketPrice
        agentAmount: this.time.agentAmount, //分销商结算单价 _that.details.agentamount
        ticketname: this.time.ticketName, //票名称
        ruYuanVoucher: this.details.ruYuanVoucher, //入院凭证
        isRealName: this.details.isRealName, //是否实名制
        checkway: this.details.reservecheckWay, // 验证方式
        // reminder: localStorage.getItem("reminder"), //温馨提示
        sceneryid: this.details["sceneryId"], //景点id
        needIdCard: this.details.isNeedIdCard ? "00" : "01" // 是否需要填写证件号 00：是  01：否
      };

      queryOrderServer.apply(obj).then(
        res => {
          Indicator.close();
          if (res.respCode === "0000") {
            queryOrderServer
              .autograph({
                merId: me.$root.merId,
                callBack: encodeURIComponent("/tcTravel/#/success"),
                paySeq: res.data.paySEQ
              })
              .then(res => {
                if (res.respCode === "0000") {
                  console.log(res.data.funCode);
                  me.$refs.formUrl.action = me.$root.paymentUrl;
                  me.$refs.funCode.value = res.data.funCode;
                  me.$refs.rpid.value = res.data.rpid;
                  me.$refs.reqDate.value = res.data.reqDate;
                  me.$refs.reqTime.value = res.data.reqTime;
                  me.$refs.paySeq.value = res.data.paySeq;
                  me.$refs.retUrl.value = res.data.retUrl;
                  me.$refs.sign.value = res.data.sign;
                  me.$refs.expand.value = res.data.expand;
                  document.forms["payForm"].submit();
                } else {
                  me.toast(res.respMsg);
                }
              });
          } else {
            me.toast(res.respMsg);
          }
        },
        res => {
          Indicator.close();
          me.toast(res.respMsg);
        }
      );
    },
    // 验证信息必填
    proving: function(info, isNeedIdCard, index) {
      if (!info.travelername) {
        this.toast("请输入出游人");
        return false;
      } else if (!/^1\d{10}$/.test(info.travelermobile)) {
        this.toast("请输入11位正确的手机号");
        return false;
      } else if (
        ((isNeedIdCard && this.details.isRealName) ||
          (isNeedIdCard && !this.details.isRealName && index == 0)) &&
        !info.traveleridcardno
      ) {
        this.toast("请输入身份证");
        return false;
      } else if (
        ((isNeedIdCard && this.details.isRealName) ||
          (isNeedIdCard && !this.details.isRealName && index == 0)) &&
        !/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(info.traveleridcardno)
      ) {
        this.toast("身份证格式不正确");
        return false;
      }
      return true;
    },
    provingInfo: function() {
      if (!this.time.priceId) {
        this.toast("请选择游玩日期");
        return false;
      }

      // isRealName => true; isNeedIdCard=> true 全部都需要身份证
      // isRealName => false; isNeedIdCard=> true  只需要一个身份证
      // isRealName => true; isNeedIdCard=> false  全部隐藏身份证
      // isRealName => false; isNeedIdCard=> false  隐藏身份证,只需要提供一个信息

      // 只需要一个人信息
      if (!this.details.isRealName && !this.details.isNeedIdCard) {
        if (
          (!this.proving(this.travelerList[0]), this.details.isNeedIdCard, 0)
        ) {
          return false;
        }
      } else {
        for (let i = 0; i < this.travelerList.length; i++) {
          if (
            !this.proving(this.travelerList[i], this.details.isNeedIdCard, i)
          ) {
            return false;
          }
        }
      }
      return true;
    },
    toPay: function() {
      debugger;
      // 防止重复提交
      if (this.provingInfo()) {
        Indicator.open();
        this.checkLogin();
      }
    },
    ticketsNumFunc: function(num) {
      // 增加 减少票数
      if (!this.time.priceId) {
        this.toast("请选择旅游时间");
        return;
      }

      if (this.time.maxTickets == this.travelerList.length && num == 1) {
        this.toast("亲，最多只能买" + this.time.maxTickets + "张票");
        return;
      } else if (
        this.time.minTickets == this.travelerList.length &&
        num == -1
      ) {
        this.toast("亲，最少只能买" + this.time.minTickets + "张票");
        return;
      }

      if (num == 1) {
        this.travelerList.push({
          travelername: "", // 取票人
          travelermobile: "", // 取票人手机
          travelercertype: "6050201", //取票人证件类型(默认身份证)
          travelermobiletype: "1", //取票手机类型
          traveleridcardno: "", //取票人证件号
          travelerEmail: "" //取票人邮箱 默认为空 没有  不知道是不是必传,
        });
      } else {
        this.travelerList.splice(this.travelerList.length - 1, 1);
      }
    },
    choicescreen: function(state, isValue) {
      // 场次选择
      this.isShoeScreenings = state;
      if (isValue) {
        this.screenings = this._screenings;
      }
    },
    invoice: function() {
      this.$router.push({
        name: "invoice"
      });
    },
    onValuesChange: function(picker, values) {
      let index = this.slots[0].values.indexOf(values[0]);
      if (index !== -1 && this.isShoeScreenings) {
        this._screenings = this.slots.elements[index];
      }
    },
    setUserOrder: function() {
      // 缓存用户输入的信息
      let obj = {
        travelerList: this.travelerList,
        receivername: this.receivername,
        receiverphone: this.receiverphone,
        receiverarea: this.receiverarea,
        bookremark: this.bookremark,
        screenings: this.screenings
      };
      this.getOrderUser(obj);
    },
    goTicketTips: function() {
      let par = this.details;
      this.$router.push({
        name: "sceneryDetailsTicketInfo",
        query: {
          details: par
        }
      });
    },
    getCalendar: function(ticketPriceId) {
      // 请求时间
      Indicator.open();
      var __that = this;
      queryOrderServer.getLatelyTime(ticketPriceId).then(
        res => {
          Indicator.close();
          if (!res.length) {
            __that.toast("暂时没有获取信息");
            // 返回上一级
            this.$router.go(-1);
          } else {
            __that.laterStage = res;
          }
        },
        rej => {
          Indicator.close();
          __that.toast(res.respMsg);
        }
      );
    }
  },
  created() {
    this.browser = browserUtil().weixin;
    this.jfmore = browserUtil().jfmore;
  },
  beforeRouteEnter(to, from, next) {
    document.cookie =
      "login_token" + "=" + "389457b0-e048-4858-b9c6-0b1141e60c0c";

    if (!cookieUtil.get("login_token")) {
      // 跳转登陆页面, 拼接完整的url
      let nameIndex = location.href.indexOf(from.name);
      let url;
      if (nameIndex > 0) {
        url = location.href.slice(0, nameIndex - 1) + to.fullPath;
      } else {
        url = location.href;
      }
      userUtil.checkLogin(url, "", true);
    } else {
      next(vm => {
        vm.details = JSON.parse(vm.$route.query.details);
        vm.getCalendar(vm.details.ticketPriceId); //查询出日历
        // 如果不是是景点详情页面过来的, 则保存用户输入的信息,显示在页面
        if (from.name && from.name !== "sceneryDetails") {
          vm.travelername = vm.orderUser.travelername;
          vm.travelermobile = vm.orderUser.travelermobile;
          vm.traveleridcardno = vm.orderUser.traveleridcardno;
          vm.receivername = vm.orderUser.receivername;
          vm.receiverphone = vm.orderUser.receiverphone;
          vm.receiverarea = vm.orderUser.receiverarea;
          vm.bookremark = vm.orderUser.bookremark;
          vm.travelerList = vm.orderUser.travelerList || [
            {
              travelername: "", // 取票人
              travelermobile: "", // 取票人手机
              travelermobiletype: 1, //取票手机类型
              traveleridcardno: "" //取票人证件号
            }
          ];
          vm.screenings = vm.orderUser.screenings || {
            leftAmount: "",
            showBeginTime: "",
            showEndTime: "",
            showId: "",
            showName: ""
          };
        } else {
          // 将价格全部都放在vuex中
          vm.getTime({ tcAmount: vm.details.tcAmountPrice });
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    // 当离开订单页的时候, 用户输入的一些信息都缓存在vuex中
    this.setUserOrder();
    next(true);
  }
};
</script>

<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
@import "../../assets/style/icon.scss";

.make-order {
  background: #ebebeb;
  height: 100%;
  padding-bottom: 2rem;
  overflow: scroll;
  * {
    font-family: PingFangSC-Regular;
    font-family: PingFangSC-Regular, "Microsoft YaHei";
  }
  .bg {
    background: #ffffff;
    margin-top: 0.2rem;
  }
  .no-border {
    border: 0 !important;
  }

  .header {
    position: fixed;
    width: 100%;
    padding: 0 0.3rem;
    height: 0.9rem;
    font-size: 0.34rem;
    color: #333;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    z-index: 9;
    a {
      width: auto;
      img {
        display: block;
        width: 0.2rem;
        height: 0.4rem;
      }
    }
    p {
      flex: 1 0 0;
      text-align: center;
    }
  }

  .content {
    padding-top: 0.9rem;
  }
  .order-details {
    padding: 0.08rem 0.26rem 0.25rem 0.24rem;
    margin-top: 0;
    .order-name {
      font-size: 0.3rem;
      color: #333333;
    }
    .notice {
      font-size: 0.24rem;
      color: #666666;
      padding-top: 0.23rem;
      position: relative;
      display: flex;
      i:first-child {
        width: 0.31rem;
        height: 0.31rem;
        bottom: 0.02rem;
        margin-top: -0.05rem;
        margin: auto 0;
        img {
          width: 100%;
          display: block;
        }
      }
      .ti {
        padding: 0px 0.12rem 0px 0.09rem;
      }
      i:last-child {
        width: 0.15rem;
        display: inline-block;
        margin: auto 0;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .price-sheet {
      text-align: right;
      color: #e40000;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      height: 0.67rem;
      // line-height: 0.77rem;
      i {
        font-size: 0.24rem;
        color: #e40000;
        padding-right: 0.06rem;
        margin-bottom: 0.07rem;
      }
      span {
        font-size: 0.48rem;
        color: #e40000;
      }
    }
  }
  .trip {
    background: #ffffff;
    padding: 0.27rem 0.17rem 0.24rem 0.24rem;
    .trip-time {
      display: flex;
      align-items: center;
      padding-bottom: 0.46rem;
      span {
        font-size: 0.28rem;
        color: #333333;
      }
      .time {
        display: inline-flex;
        flex: 1 0 0;
        justify-content: flex-end;
        span {
          border: 1px solid #979797;
          border-radius: 6px;
          margin-left: 0.1rem;
          padding: 0.13rem;
          .time-p {
            font-size: 0.24rem;
            color: #2a2a2a;
          }
          .trip-p {
            // color: #e40000;
            color: #e71c1c;
            font-size: 0.24rem;
            text-align: center;
          }
        }

        .select-time {
          border: 1px solid #dcbd72 !important;
          background-image: url(http://img1.40017.cn/cn/s/2016/touch/scenery/book/choose.png);
          background-repeat: no-repeat;
          background-position: right bottom;
          background-size: 0.5rem 0.5rem;
        }
        .more-time {
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          color: #666666;
        }
        .you {
          width: 0.17rem;
          margin-left: 0.15rem;
          img {
            width: 100%;
          }
        }
      }
    }
    .trip-time-check {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dcdcdc;
      padding: 0px 0px 0.12rem 0;
      box-sizing: border-box;
      span {
        font-size: 0.28rem;
        color: #333333;
      }
      .specific-time {
        flex: 1 0 0;
        text-align: right;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        justify-content: flex-end;
        .week {
          margin-left: 0.2rem;
        }
      }
      .you {
        display: inline-block;
        width: 0.17rem;
        margin-left: 0.15rem;
        margin-top: 0.08rem;
        img {
          width: 100%;
        }
      }
    }
    .ticket-number {
      // padding-top: 0.46rem;
      display: flex;
      align-items: center;
      .ticket {
        font-size: 0.28rem;
        color: #333333;
      }
      .number {
        flex: 1 0 0;
        text-align: right;
        font-size: 0.48rem;
        color: #dcbd72;
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        i {
          font-size: 0.4rem;
          color: #dcbd72;
          padding: 0 0.34rem;
        }
        span {
          text-align: center;
          display: inline-block;
          font-size: 0.48rem;
          color: #dcbd72;
        }
      }
      .not-must {
        color: #d8d8d8 !important;
      }
    }
    .prompt-information {
      font-size: 0.2rem;
      i {
        color: #e71c1c;
        font-size: 0.2rem;
      }
    }
  }

  .screenings {
    // padding: 0.27rem 0.17rem 0.24rem 0.24rem;
    // font-size: 0.34rem;
    .screenings-dom {
      padding: 0.25rem 0.2rem 0.25rem 0.24rem;
      border-bottom: 1px solid #ebebeb;
    }

    .invoice-select {
      padding: 0.26rem 0.2rem 0.31rem;
    }
    .scree-div {
      display: flex;
      align-items: center;
      span {
        font-size: 0.28rem;
        color: #333333;
      }
      .screen {
        flex: 1 0 0;
        font-size: 0.28rem;
        color: #333333;

        display: inline-flex;
        justify-content: flex-end;
        span {
          width: 0.15rem;
          display: inline-block;
          margin: auto 0;
          margin-left: 0.188rem;
          img {
            width: 100%;
            display: block;
          }
        }
      }
      .screeing-checkout {
        flex: 1 0 0;
        font-size: 0.28rem;
        text-align: right;
        color: #333333;
        padding-left: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .show-name {
          display: inline-block;
          // width: 2.72rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          width: 0.15rem;
          display: inline-block;
          img {
            width: 100%;
          }
        }
      }
    }

    .input-info {
      display: flex;
      padding: 0.25rem 0.2rem 0.25rem 0.24rem;
      border-bottom: 1px solid #ebebeb;
      span {
        font-size: 0.28rem;
        color: #333333;
      }
      input {
        text-align: right;
        flex: 1 0 0;
        font-size: 0.28rem;
        color: #333333;
      }
    }
  }
  .tourist-info {
    padding: 0.11rem 0rem 0.11rem 0rem;
    .title {
      i {
        width: 0.26rem;
        display: inline-block;
        margin-right: 0.14rem;
        img {
          width: 100%;
        }
      }
      display: flex;
      font-size: 0.28rem;
      color: #dabc70;
      padding: 0.03rem 0.2rem 0.17rem 0.24rem;
      border-bottom: 1px solid #ebebeb;
    }
    .remind {
      font-size: 0.28rem;
      color: #d6bb73;
      text-align: center;
      padding-bottom: 0.06rem;
    }

    .input-info {
      display: flex;
      padding: 0.25rem 0.2rem 0.25rem 0.24rem;
      border-bottom: 1px solid #ebebeb;
      span {
        font-size: 0.28rem;
        color: #333333;
      }
      input {
        text-align: right;
        flex: 1 0 0;
        font-size: 0.28rem;
        color: #333333;
      }
    }
  }
  .remark {
    display: flex;
    padding: 0.24rem 0.2rem 0.17rem 0.25rem;
    span {
      font-size: 0.28rem;
      color: #333333;
    }
    textarea {
      flex: 1 0 0;
      margin-left: 0.34rem;
      height: 1rem;
    }
  }
  .cue {
    background: #ffffff;
    font-size: 0.24rem;
    text-align: left;
    border-top: 1px solid #ebebeb;
    padding: 0.31rem 0.13rem 0.25rem;
    p {
      text-align: center;
      a {
        color: #dcbd72;
      }
    }
  }
  .payment {
    position: fixed;
    height: 1.23rem;
    bottom: 0px;
    margin-top: 0;
    width: 100%;
    display: flex;
    padding: 0 0.24rem;
    padding-left: 0.3rem;
    padding-right: 0.24rem;
    align-items: center;
    padding-top: 0.19rem;
    padding-bottom: 0.24rem;
    border-top: 1px solid #ebebeb;
    .price {
      flex: 1 0 0;
      font-size: 0.3rem;
      color: #333333;
      height: 0.48rem;
      line-height: 0.48rem;
      display: inline-flex;
      align-items: center;
      i {
        font-size: 0.24rem;
        color: #e40000;
      }
      i:first-child {
        padding-left: 0.13rem;
      }
      h1 {
        font-size: 0.48rem;
        color: #e40000;
        margin-top: -0.06rem;
        padding: 0 0.06rem;
      }
    }
    .pay-button {
      background-image: linear-gradient(-156deg, #d7b667 0%, #eddca0 100%);
      border-radius: 100px;
      font-size: 0.3rem;
      color: #ffffff;
      height: 0.8rem;
      width: 3.19rem;
      text-align: center;
      line-height: 0.8rem;
      float: right;
    }
  }
  .order-screen {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.4);
    .screen-content {
      position: absolute;
      bottom: 0;
      background: white;
      width: 100%;
      .screen-title {
        display: flex;
        font-size: 12px;
        justify-content: center;
        line-height: 1rem;
        height: 1rem;
        background-color: #eee;
        span {
          padding: 0 0.3rem;
          color: #e94643;
          font-size: 0.32rem;
        }
        div {
          flex: 1 0 0;
          text-align: center;
          color: #333;
        }
      }
    }
  }
}
</style>


