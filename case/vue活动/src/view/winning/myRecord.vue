<template>
    <div class="winning">
      
      <div class="top184"><img src="@/assets/images/w_7.png" alt=""></div>
      <div class="w-jushu mt184">
        <div class="top">
          <div v-if="winningMessage">中奖局数 {{winningMessage.length}}</div>
          <div>累计中奖金额 <span class="f1">{{winningMoney.toFixed(0)}}</span> BG</div>
        </div>
        <dl class="list">
          <dt><span>局数</span><span>兑奖码</span><span>中奖信息</span><span>中奖额</span></dt>
          <dt v-for="(v,i) in winningMessage">
            <span>{{v.periodNumber}}</span>
            <span>{{v.code}}</span>
            <span>{{v.rewardRecordStatus=='INITIAL'?'待开奖':v.name}}</span>
            <span>{{v.rewardRecordStatus=='INITIAL'?'--':v.quality+'BG'}} </span>
          </dt>
        </dl>
        <!--<div class="more">加载更多>></div>-->
      </div>
      <div class="w-jushu">
        <div class="myyqj">我的邀请奖励</div>
        <div class="inv-list clear">
          <li><span class="pr20">我的返佣</span> <span class="f2">{{parseInt(rewardTotalQuality*0.2)}}</span> BG</li>
          <li><span class="pr20">好友人数</span>{{friendCount}}</li>
          <li style="width: 100%"><span class="pr20">好友中奖金额</span><span class="f2">{{rewardTotalQuality}}</span> BG</li>
          <li class="btn"> <router-link :to="{name:'friendRecord'}" class="btn-l">查看好友记录</router-link></li>
          <li class="btn"><a  class="btn-r" id="nativeShare1" @click="changeSharePt1">邀请更多好友</a></li>
        </div>
      </div>
      <img src="@/assets/images/w_8.png" alt="" class="show">
      <div class="rule">
        <h4 class="title">兑换规则：</h4>
        <table class="jiangchi">
          <tr>
            <td width="50%">奖券</td>
            <td>奖金</td>
          </tr>
          <tr>
            <td>万倍券</td>
            <td>20,000,000BG</td>
          </tr>
          <tr>
            <td>千倍券</td>
            <td>2,000,000BG</td>
          </tr>
          <tr>
            <td>百倍券</td>
            <td>200,000BG</td>
          </tr>
          <tr>
            <td>十倍券</td>
            <td>20,000BG</td>
          </tr>
          <tr>
            <td>一倍券</td>
            <td>2000BG</td>
          </tr>
        </table>
        <p class="mb30">获得一倍券、十倍券的朋友兑换所得的BG可直接用于平台的法币交易；</p>
        <p class="mb30">获得百倍券、千倍券、万倍券的朋友兑换所得的BG立即释放20%，之后锁仓在用户的biger钱包中，分五个月释放，每月释放16%；</p>
        <p>获得奔驰豪车的朋友请耐心等待，我们的客服人员会在1-2天内与您联系兑奖事宜。（注册时请使用自己常用的手机号码，保持电话畅通）</p>
      </div>
      <div v-if="isShowDownApp"><a href="http://static.biger168.com/load/index.html#/" class="show"><img class="show" src="@/assets/images/home/sy_08.png" alt=""></a></div>
    </div>
</template>

<script>
import { jsBridge, browserUtil, stringUtil } from "@/assets/js/common";
import {
  getUserRewardRecords,
  getUserRewardRecordCount,
  getShareConfigList
} from "@/api/http";
export default {
  data() {
    return {
      isShowMongol: false,
      winningMessage: [],
      winningMoney: 0,
      friendCount: 0,
      rewardTotalQuality: 0,
      shareMessage: {},
      isShowDownApp: true
    };
  },
  created() {
    if (browserUtil().bigerAndroid || browserUtil().bigerIos) {
      this.isShowDownApp = false;
    }
    this.getUserRewardRecordCount();
    this.getUserRewardRecords();
    this.getShareConfigList(); //获取分享信息
  },
  methods: {
    getShareConfigList() {
      //分享拿后台数据
      getShareConfigList().then(res => {
        var data = res.filter((v, i) => {
          return v.entrance == 3;
        });
        this.shareMessage = data[0];
      });
    },
    changeSharePt1() {
      if (browserUtil().bigerIos || browserUtil().bigerAndroid) {
        jsBridge.share();
      } else {
        this.$sharePost({ url: this.shareMessage.shareUrl });
      }
    },
    getUserRewardRecordCount() {
      getUserRewardRecordCount().then(res => {
        this.friendCount = res.friendCount;
        this.rewardTotalQuality = res.rewardTotalQuality;
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
        flex: 0 0 2rem;
        width: 2rem;
      }
      > div:nth-child(2) {
        text-align: right;
      }
    }
    .list {
      font-size: 0.28rem;
      padding-left: 0.3rem;
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
          flex: 0 0 0.8rem;
          width: 0.8rem;
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
        float: left;
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
          margin-right: 0.1rem;
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
    .jiangchi {
      font-size: 0.24rem;
      width: 100%;
      margin-bottom: 0.2rem;
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
