<template>
    <div class="winning">
      <div class="top184"><img src="@/assets/images/w_7.png" alt=""></div>
      <div class="w-jushu mt184">
        <div class="top">
          <div v-if="winningMessage">中奖局数 {{winningMessage.length}}</div>
          <div>累计中奖金额 <span class="f1">{{winningMoney}}</span> BG</div>
        </div>
        <dl class="list">
          <dt><span>局数</span><span>兑奖码</span><span>中奖信息</span></dt>
          <dt v-for="(v,i) in winningMessage"><span>01</span><span>523655</span><span>{{v.name}}</span></dt>
        </dl>
        <!--<div class="more">加载更多>></div>-->
      </div>
      <div class="w-jushu">
        <div class="myyqj">我的邀请奖励</div>
        <div class="inv-list clear">
          <li><span class="pr20">好友人数</span>{{friendCount}}</li>
          <li><span class="pr20">参与次数</span>{{participateCount}}</li>
          <li><span class="pr20">中奖金额</span>{{rewardTotalQuality}}</li>
          <li><span class="pr20">我的返佣</span> <span class="f2">{{rakeBackQuality}}</span> BG</li>
          <li class="btn"> <router-link :to="{name:'friendRecord'}" class="btn-l">查看好友记录</router-link></li>
          <li class="btn"><a  class="btn-r" id="nativeShare1">邀请更多好友</a></li>
        </div>
      </div>
      <img src="@/assets/images/w_8.png" alt="" class="show">
      <div class="rule">
        <h4 class="title">兑换规则：</h4>
        <p class="mb30">1. 拿到一倍券，十倍券的朋友兑换所得的biger平台币可直接用于平台的币币交易。</p>
        <p>2. 拿到百倍券，千倍券，万倍券的朋友兑换所得的biger平台币立即释放20%，之后锁仓在用户的biger钱包中分五个月释放，每月释放16%。</p>
      </div>
      <div class="down">
        <img src="@/assets/images/w_4.png" class="show" alt="">
        <a href="http://static.biger168.com/load/index.html#/" class="btn-down">下载app</a>
      </div>
    </div>
</template>

<script>
import nativeShare from "@/utils/nativeShare";
import { getUserRewardRecords, getUserRewardRecordCount } from "@/api/http";
let fxTitle = "【9.9韭菜节】万倍回收归零币，1000XMX入场变6万RMB！快上车→";
let fxContent = "biger 9.9韭菜节归零币大狂欢，注册就能免费玩游戏一次！";

export default {
  name: "myRecord",
  data() {
    return {
      isShowMongol: false,
      winningMessage: [],
      winningMoney: 0,
      friendCount: 0,
      participateCount: 0,
      rakeBackQuality: 0,
      rewardTotalQuality: 0
    };
  },
  created() {
    this.getUserRewardRecordCount();
    this.getUserRewardRecords();
  },
  mounted() {
    var config = {
      url: "http://blog.wangjunfeng.com",
      title: fxTitle,
      desc: fxContent,
      img: "",
      img_title: "",
      from: ""
    };
    var share_obj = new nativeShare("nativeShare1", config);
  },
  methods: {
    getUserRewardRecordCount() {
      getUserRewardRecordCount().then(res => {
        this.friendCount = res.friendCount;
        this.participateCount = res.participateCount;
        this.rakeBackQuality = res.rakeBackQuality;
        this.rewardTotalQuality = res.rewardTotalQuality;
      });
    },
    getWxShare() {
      getWxShare().then(res => {
        console.log(res);
      });
    },
    async getUserRewardRecords() {
      const res = await getUserRewardRecords();
      this.winningMessage = res;
      var count = 0;
      res.forEach((v, i) => {
        count += v.quality;
      });
      this.winningMoney = count;
    }
  }
};
</script>

<style lang="less">
.winning {
  background: #2a0054 url("~@/assets/images/w_1.png") center top no-repeat;
  background-size: 100%;
  .top184 {
    height: 1.84rem;
    line-height: 1.5rem;
    text-align: center;
    img {
      width: 3.26rem;
      height: 0.65rem;
      display: inline-block;
    }
  }
  .w-jushu {
    width: 6.9rem;
    margin: 0 auto 0.6rem;
    background-color: #fff;
    -webkit-border-radius: 0.08rem;
    -moz-border-radius: 0.08rem;
    border-radius: 0.08rem;
    .top {
      border-top-left-radius: 0.08rem;
      border-top-right-radius: 0.08rem;
      background: #fefbef;
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.28rem;
      padding: 0 0.2rem;
      display: flex;
      margin-bottom: 0.3rem;
      > div {
        flex: 1;
        .f1 {
          font-size: 0.36rem;
          color: #f76d02;
        }
      }
      > div:first-child {
        flex: 0 0 2.5rem;
        width: 2.5rem;
      }
      > div:nth-child(2) {
        text-align: right;
      }
    }
    .list {
      font-size: 0.28rem;
      padding-left: 0.48rem;
      dt {
        display: flex;
        padding-bottom: 0.3rem;
        span {
          flex: 1;
          display: block;
          text-align: center;
        }
        span:first-child {
          text-align: left;
          flex: 0 0 1.5rem;
        }
      }
    }
    .more {
      text-align: center;
      color: #f76d02;
      font-size: 0.28rem;
      padding-bottom: 0.3rem;
    }
    .myyqj {
      border-top-left-radius: 0.08rem;
      border-top-right-radius: 0.08rem;
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.28rem;
      text-align: center;
      background: #fefbef url("~@/assets/images/w_5.png") 0 0.54rem no-repeat;
      background-size: 100%;
    }
    .inv-list {
      padding: 0.3rem 0.48rem;
      font-size: 0.28rem;
      li {
        float: left;
        width: 50%;
        padding-bottom: 0.3rem;
        .pr20 {
          padding-right: 0.2rem;
        }
        .f2 {
          color: #f76d02;
          font-size: 0.36rem;
        }
      }
      .btn {
        padding-bottom: 0;
        a {
          display: inline-block;
          width: 2.92rem;
          height: 0.98rem;
          line-height: 0.98rem;
          text-align: center;
          font-size: 0.36rem;
          color: #fff;
          border-radius: 8px;
        }
        .btn-l {
          background: #f76d02 url("~@/assets/images/w_2.png") 0.1rem 0.1rem
            no-repeat;
          background-size: 1.6rem 0.4rem;
        }
        .btn-r {
          background: #f76d02 url("~@/assets/images/w_3.png") 1.22rem 0.1rem
            no-repeat;
          background-size: 1.6rem 0.4rem;
        }
      }
    }
  }
  .rule {
    background-color: #fff;
    padding: 0.1rem 0.5rem 0.6rem;
    .title {
      font-size: 0.36rem;
      color: #f76d02;
      margin-bottom: 0.3rem;
    }
    p {
      font-size: 0.26rem;
    }
    .mb30 {
      margin-bottom: 0.3rem;
    }
  }
  .down {
    position: relative;
    .btn-down {
      position: absolute;
      right: 0.55rem;
      top: 0.3rem;
      z-index: 2;
      width: 2.4rem;
      height: 0.98rem;
      line-height: 0.98rem;
      background-color: #fff;
      color: #f76d02;
      text-align: center;
      font-size: 0.36rem;
      -webkit-border-radius: 0.08rem;
      -moz-border-radius: 0.08rem;
      border-radius: 0.08rem;
    }
  }
}
</style>
