<template>
  <div class="order-list">
    <div class="header" v-if="!isWeChat" data-flex="main:justify box:first cross:center">
      <a href="javascript:;" class="btn-back" @click.prevent="goBack">
        <img src="../../assets/images/back.png" alt=""/>
      </a>
      <p>我的订单</p>
    </div>
    <div v-if="!isWeChat" class="empty"></div>
    <div class="order-tab-wrap" v-if="false">
      <ul data-flex="">
        <li   v-for="tab in selectTab" :class="{active:selectedTab == tab.id}" @click.prevent="doSelectTab(tab.id)">{{tab.name}}</li>
      </ul>
    </div>
    <div class="order-list-wrap" v-if="showStatus">
      <div class="order-list-item" v-for="order in orderList">
        <p class="order-number">订单号:{{order.orderId}}</p>
        <div class="order-content" data-flex="main:justify cross:center" @click.prevent="goOrderDetail(order.orderstate,order)">
          <div class="order-con-left">
            <p class="order-title">{{order.sceneryName}}</p>
            <p class="order-time">使用日期: {{order.travelDate}}<span class="order-amounts">{{order.ticketsNum}}张</span></p>
          </div>
          <div class="order-con-right">
            <p class="order-payStatus" v-if="order.state == 'I'">未支付</p>
            <p class="order-payStatus" v-if="order.state == 'D'">待推送</p>
            <p class="order-payStatus" v-if="order.state == 'N'">待确认</p>
            <p class="order-payStatus" v-if="order.state == 'F'">出票中</p>
            <p class="order-payStatus" v-if="order.state == 'J'">已出票</p>
            <p class="order-payStatus" v-if="order.state == 'V'">已使用</p>
            <p class="order-payStatus" v-if="order.state == 'C'">取消</p>
            <p class="order-payStatus" v-if="order.state == 'S'">未使用</p>
            <p class="order-payStatus" v-if="order.state == 'R'">已退款</p>
            <p class="order-payStatus" v-if="order.state == 'R2'">退款中</p>
          </div>
        </div>
        <div class="btn-pay">
          <img v-if="order.orderstate == 'I'" src="../../assets/images/payMoney.png" alt="" @click.prevent="toPay(order.paySeq)"/>
        </div>
      </div>
      <div class="ticketState" v-if="false">
        <span>{{spinnerText}}</span>
        <em v-if="spinnerState"></em>
      </div>
    </div>
    <div class="empty-order" v-if="!showStatus">
      <img src="../../assets/images/emptyorder.png" alt=""/>
      <p>暂无相关订单信息</p>
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
import { mapState, mapActions } from "vuex";
import getOrderListService from "../../service/GetOrderListService";
import createOrderService from "../../service/CreateOrderService";
import queryOrderServer from "../../service/orderDownService";
import {
  userUtil,
  jfNative,
  cookieUtil,
  stringUtil,
  browserUtil
} from "../../assets/js/common";
import { Toast } from "mint-ui";
export default {
  name: "order-list",
  data() {
    return {
      selectTab: [
        {
          id: "noPay",
          name: "未支付"
        },
        {
          id: "affirming",
          name: "待确认"
        },
        {
          id: "waitBill",
          name: "待出票"
        },
        {
          id: "billed",
          name: "已出票"
        },
        {
          id: "used",
          name: "已使用"
        },
        {
          id: "cancel",
          name: "取消"
        }
      ],
      selectedTab: "noPay",
      loading: false,
      spinnerText: "加载中...",
      spinnerState: false,
      page: 1, //当前页数
      size: 6, //每页加载的数量
      token: "",
      totalCount: 0,
      showStatus: true
    };
  },
  created() {
    this.pagehide();
  },
  mounted() {
    this.getData();
  },
  destroyed() {
    this.getOrderList({});
  },
  computed: {
    ...mapState(["orderList", "isWeChat"])
  },
  methods: {
    ...mapActions(["getOrderList", "getOrderDetail"]),
    //tab选项卡点击
    doSelectTab(selectId) {
      this.selectedTab = selectId;
      this.getOrderList({});
      this.page = 1;
      this.getData();
    },
    goOrderDetail(ordername, details) {
      switch (ordername) {
        case "I":
          ordername = "未支付";
          break;
        case "D":
          ordername = "待推送";
          break;
        case "N":
          ordername = "待确认";
          break;
        case "F":
          ordername = "出票中";
          break;
        case "J":
          ordername = "已出票";
          break;
        case "V":
          ordername = "已使用";
          break;
        case "C":
          ordername = "取消";
          break;
        case "R":
          ordername = "已退款";
          break;
        case "R2":
          ordername = "退款中";
          break;
      }
      this.getOrderDetail(details);
      sessionStorage.setItem("orderDetails", JSON.stringify(details));
      this.$router.push({
        path: "/orderDetail",
        query: { orderName: ordername }
      });
    },
    //返回上一页
    goBack() {
      if (this.$router.currentRoute.fullPath.indexOf("fromAPP") > 0) {
        window.jfNative = jfNative;
        window.jfNative.open("device", "closewebview");
      } else {
        this.$router.go(-1);
      }
    },
    //加载更多
    loadMore() {
      if (this.loading) {
        return;
      }
      this.page++;
      this.getData();
    },
    //获取后台数据
    getData() {
      var params = {};
      params.pageSize = this.size;
      params.pageIndex = this.page;
      params.login_token = cookieUtil.get("login_token");
      getOrderListService.getOrders(params).then(res => {
        if (res.respCode == "0000") {
          if (res.data.elements.length > 0) {
            var list = [...this.orderList, ...res.data.elements];
            this.getOrderList(list);
            this.spinnerText = "加载中...";
            this.spinnerState = false;
            this.loading = false;
            this.showStatus = true;
          } else {
            var list = [...this.orderList, ...res.data.elements];
            this.getOrderList(list);
            this.loading = true;
            this.spinnerState = true;
            this.spinnerText = "没有更多数据";
            this.showStatus = false;
          }
        } else {
          this.showStatus = false;
        }
      });
    },
    //点击付款
    toPay(paySeq) {
      var me = this
      queryOrderServer.autograph(
        {
          merId: "S2000081",
          callBack: encodeURIComponent("/tcTravel/#/success"),
          paySeq: paySeq
        })
        .then(res => {
          if (res.respCode === "0000") {

            me.$refs.formUrl.action = me.$root.paymentUrl
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
            Toast({
              message: res.respMsg,
              position: "bottom",
              duration: 1000
            });
          }
        });
    },
    pagehide() {
      if (browserUtil().ios) {
        var isPageHide = false;
        window.addEventListener("pageshow", function() {
          if (isPageHide) {
            window.location.reload();
          }
        });
        window.addEventListener("pagehide", function() {
          isPageHide = true;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list {
  background: #ebebeb;
  min-height: 15rem;
  .header {
    position: fixed;
    width: 100%;
    padding: 0 0.3rem;
    height: 0.9rem;
    font-size: 0.34rem;
    color: #333;
    background: #fff;
    p {
      text-align: center;
    }
    .btn-back {
      img {
        display: block;
        width: 0.2rem;
        height: 0.4rem;
      }
    }
  }
  .empty {
    height: 0.9rem;
  }
  .order-tab-wrap {
    background: #fff;
    ul {
      li {
        font-size: 0.28rem;
        color: #333;
        text-align: center;
        line-height: 0.88rem;
        margin: 0 0.2rem;
      }
      .active {
        color: #dbbd72;
        border-bottom: 1px solid #dbbd72;
      }
    }
  }
  .order-list-wrap {
    .order-list-item {
      background: #fff;
      margin-top: 0.2rem;
      .order-number {
        line-height: 0.7rem;
        padding-left: 0.26rem;
        font-size: 0.3rem;
        color: #333;
        border-bottom: thin solid #ebebeb;
      }
      .order-content {
        font-size: 0.3rem;
        padding: 0 0.26rem;
        .order-con-left {
          width: 5.5rem;
          .order-title {
            line-height: 0.42rem;
            padding: 0.13rem 0;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .order-time {
            font-size: 0.24rem;
            line-height: 0.33rem;
            padding: 0.13rem 0;
            color: #666;
            .order-amounts {
              margin-left: 0.2rem;
              color: #666;
            }
          }
        }
        .order-con-right {
          .order-payStatus {
            font-size: 0.3rem;
            color: #dfc480;
            margin-right: 0.3rem;
          }
        }
      }
      .btn-pay {
        text-align: right;
        height: 1.1rem;
        img {
          display: inline-block;
          width: 1.9rem;
          height: 0.6rem;
          margin: 0 0.3rem 0.18rem 0;
        }
      }
    }
    .ticketState {
      position: relative;
      background: #fff;
      text-align: center;
      font-size: 0.3rem;
      height: 1rem;
      span {
        position: absolute;
        z-index: 6;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 0 0.5rem;
      }
      em {
        height: 0.02rem;
        position: absolute;
        left: 1rem;
        right: 1rem;
        top: 50%;
        background: #666;
      }
    }
  }
  .empty-order {
    height: 14rem;
    img {
      width: 100%;
      margin: 0.5rem 0;
    }
    p {
      font-size: 0.32rem;
      color: #333;
      text-align: center;
    }
  }
}
</style>