<template>
  <div class="winning">
    <div class="lsbg"></div>
    <div class="top184"><img src="@/assets/images/w_6.png" alt=""></div>
    <div class="w-jushu bgfef">
      <div class="inv-list clear">
        <li><span class="pr20">我的返佣</span> <span class="f2">{{parseInt(rewardTotalQuality*0.2)}}</span> BG</li>
        <li><span class="pr20">好友人数</span>{{friendCount}}</li>
        <li style="width: 100%"><span class="pr20">好友中奖金额</span><span class="f2">{{rewardTotalQuality}}</span> BG</li>
      </div>
    </div>
    <div class="w-jushu">
      <div class="hy-title">
        <div>好友</div>
        <div>中奖信息</div>
        <div>中奖返佣</div>
      </div>
      <dl class="list">
        <dt v-for="v in friendVal"><span>{{v.userPhone | phoneMi}}</span><span>{{v.name}}</span><span>{{v.quality}}BG</span></dt>

      </dl>
    </div>
  </div>
</template>

<script>
import { getUserRewardRecordCount, getFriendsRewardRecords } from "@/api/http";
export default {
  name: "friendRecord",
  data() {
    return {
      friendCount: 0,
      participateCount: 0,
      rewardTotalQuality: 0,
      friendVal: []
    };
  },
  created() {
    this.getUserRewardRecordCount();
    this.getFriendsRewardRecords();
  },
  methods: {
    getUserRewardRecordCount() {
      getUserRewardRecordCount().then(res => {
        this.friendCount = res.friendCount;
        this.participateCount = res.participateCount;
        this.rewardTotalQuality = res.rewardTotalQuality;
      });
    },
    getFriendsRewardRecords() {
      getFriendsRewardRecords().then(res => {
        this.friendVal = res;
      });
    }
  },
  filters: {
    phoneMi(v) {
      return v.slice(0, 3) + "****" + v.slice(-4);
    }
  }
};
</script>

<style lang="less" scoped>
.winning {
  background: #2a0054 url("~@/assets/images/w_1.png") center top no-repeat;
  background-size: 100%;
  padding-bottom: 0.3rem;
  height: 100vh;
  .lsbg {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: #2a0054;
  }
  .top184 {
    height: 1.84rem;
    line-height: 1.25rem;
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
    .inv-list {
      padding: 0.3rem 0.48rem;
      font-size: 0.28rem;
      li {
        line-height: 0.5rem;
        .pr20 {
          padding-right: 0.2rem;
        }
        .f2 {
          color: #f76d02;
          font-size: 0.36rem;
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
    .hy-title {
      border-top-left-radius: 0.08rem;
      border-top-right-radius: 0.08rem;
      background: #fefbef;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.28rem;
      padding: 0 0.2rem;
      display: flex;
      margin-bottom: 0.3rem;
      > div {
        flex: 1;
        text-align: center;
      }
    }
  }
  .bgfef {
    background-color: #fefbef;
  }
}
</style>
