<template>
  <div class="logic">
    <h3 class="t">开奖逻辑</h3>
    <p class="t1">用户参与游戏时，系统会自动生成一个6位（100000 ~ 999999）的随机数作为用户的开奖号码。每局游戏倒计时结束后开奖，为保证游戏的公开公正我们会采用以太坊区块链当前高度的个位数作为中奖条件之一。</p>
    <p class="t1">只有开奖号码中含有该数字的用户才有机会参与本轮游戏的抽奖，我们会随机抽取奖券相应数量的幸运用户获得奖券。</p>
    <p class="t1">假如开奖时以太坊的区块高度为“6338159”，则只有开奖号码中含有数字“9”的用户才有资格参与本轮游戏的抽奖。</p>
    <p class="t1">获得奔驰豪车的用户请耐心等待，我们的客服人员会在1-2天内与你联系兑奖事宜。（注册时请使用自己常用的手机号码，保持手机畅通）</p>
    <p class="t2">以太坊的区块高度可在公网查询</p>
    <p class="t2">查询地址：<a href="https://etherscan.io/blocks">https://etherscan.io/blocks</a></p>
    <table class="bzk">
      <tr><td width="50%">局数</td><td width="50%">区块高度</td></tr>
      <tr v-for="v in blockValue"><td>{{v.periodNumber}}</td><td>{{v.blockHeight}}</td></tr>
    </table>
  </div>
</template>

<script>
import { getActivityPeriodList } from "@/api/http";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      blockValue: []
    };
  },
  computed: {
    ...mapGetters(["activityId"])
  },
  created() {
    var data = { activityId: this.activityId };
    getActivityPeriodList(data).then(res => {
      this.blockValue = res;
    });
  }
};
</script>

<style lang="less" scoped>
.logic {
  background-color: #2a0054;
  padding: 0.4rem;
  .t {
    font-size: 0.34rem;
    text-align: center;
    margin-bottom: 0.4rem;
    color: #fff;
  }
  .t1 {
    font-size: 0.24rem;
    line-height: 0.48rem;
    color: #fff;
    margin-bottom: 0.25rem;
    text-align: justify;
  }
  .t2 {
    font-size: 0.24rem;
    line-height: 0.48rem;
    color: #fff;
    a {
      color: #b186f2;
    }
  }
  .bzk {
    border: 0.01rem solid #44089e;
    font-size: 0.3rem;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    color: #fff;
    td {
      border: 0.01rem solid #44089e;
      padding: 0.1rem 0;
    }
  }
}
</style>
