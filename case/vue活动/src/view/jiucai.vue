<template>
  <div>
    <div class="jiucai">
      <div class="banner"><img src="@/assets/images/home/sy_01.png" class="show" alt=""></div>
      <!--新版样式-->
      <div class="newjackpot">
        <div class="title">参与人数&奖池</div>
        <div class="countdown">
            <span class="timer">{{minutes}}</span>
            <span class="maohao">:</span>
            <span class="timer">{{second}}</span>
             <span class="maohao">:</span>
            <span class="timer">{{millisecond}}</span>
          </div>
        <div class="cynumber" :class="{cyn6:endVal>=100000}">
          <countTo :startVal='startVal' :endVal='endVal' :separator="separator" :prefix="prefix" :duration='3000'></countTo>
        </div>
        <div class="allquan">
          <div class="shiwan"></div>
          <ul>
            <li v-for="v in rewards"><span class="ft1">{{v.num}}张</span> <span class="ft2">{{v.label}}张</span></li>
          </ul>
        </div>
        <div class="bengchi"><img src="@/assets/images/home/sy_banner1.png" alt=""></div>
        <div class="allmoney">￥{{rmbCar}}</div>
        <div class="ft3">(参与人数越多奖池越大）</div>
      </div>
      <div class="mymessage">
        <div class="kaijiang clear">
          <div class="fl" v-if="!overActivity">第{{currentPeriod}}局等待开奖...</div>
          <div class="fl" v-else>活动已结束</div>
          <div class="fr">剩余{{remainderPeriod}}局</div>
        </div>
        <div class="xmx" v-if="hasToken && userInfo.length>0 && totalPeriod>userCurrentParticipatePeriod">
          我拥有
          <span v-for="v in userInfo"><b>{{v.balance}}</b> {{v.coinName}},</span>
          可以参与 <b>{{userMathAvaiable}}</b> 局游戏
        </div>
        <div class="xmx" v-else-if="hasToken && userInfo.length==0 && totalPeriod>userCurrentParticipatePeriod">
          我拥有0 可以参与 <b>0</b> 局游戏
        </div>
        <div class="xmx" v-else-if="hasToken && totalPeriod==userCurrentParticipatePeriod">
          您已参与所有游戏，请坐等开奖
        </div>
        <div class="xmx" v-else>
          我拥有
          <span><b>--</b> XMX,</span>
          <span><b>--</b> BG,</span>
          可以参与 <b>--</b> 局游戏
        </div>
        <div class="btn-buymain clear">
          <a class="btn-1" :class="{isover:overActivity}" @click="openBuyPop">{{userCurrentParticipatePeriod>0?"继续参与":"来玩一局"}}</a>
          <a class="btn-2" id="nativeShare1" @click="changeSharePt" >邀请好友 <span class="fy"></span></a>
        </div>
        <div class="lookwingrule">
          <div><router-link :to="{name:'rule'}">查看开奖逻辑></router-link></div>
          <div v-if="hasToken"><router-link :to="{name:'myRecord'}">查看中奖记录></router-link></div>
        </div>
      </div>
      <div class="yxgl">
        <div class="byb-bg" style="position: relative">
          <div class="btn-maipiao" @click="goBuyPiao">充币</div>
        </div>
      </div>
      <div class="invitation">
        <div class="btn-invit" @click="changeSharePt">邀请好友</div>
      </div>
      <div class="yxgl">
        <div class="text">
          <h4 class="title">游戏攻略</h4>
          <ul>
            <li>1.可以作为参与游戏的六种归零币为：XMX、FT、QOS、ZJLT、WFEE以及SDA。此外，用户还可以使用USDT或ETH参与游戏，或者直接购买BG参与游戏。每位新注册用户都可以获得1000BG，免费参与游戏一次。</li>
            <li>2.每局游戏限时1小时，biger 48小时不打烊。土豪们也可以一次参与48局游戏，坐等开奖美滋滋。</li>
            <li>3.伴随参与游戏人数的增长，奖池中的奖券数量也会裂变增长哦，所以快去拉你的小伙伴一起来瓜分大奖，增加中奖几率。</li>
            <li>4.如果你邀请来的小伙伴（仅限新用户）中了奖，你也可以获得奖金的20%分成。只要你的朋友足够多，承包奖池不是梦！</li>
            <li>5.游戏开始时，参与用户都将获得一组六位的随机号码作为开奖号码。一小时倒计时结束后，开奖号码中含有当前以太坊区块链高度的个位数的用户才有机会中奖。没有拿到奖券的小伙伴也能拿到空投红包。</li>
            <li>6.拿到奖券的朋友可以按照奖券的兑换规则将参与游戏的归零币兑换为BG。</li>
            <li>游戏最终解释权归biger（biger.in）所有；活动期间如果有恶意刷量行为，将取消参与游戏资格。</li>
            <li class="xcd">小彩蛋：一局游戏参与人数突破10万，奖池中将出现一辆奔驰豪车！</li>
          </ul>
        </div>
      </div>
      <div v-if="isShowDownApp"><a href="http://static.biger168.com/load/index.html#/" class="show"><img class="show" src="@/assets/images/home/sy_08.png" alt=""></a></div>
    </div>
    <div>
      <!--购买弹窗-->
      <mt-popup
        v-model="popupVisibleBuy"
        position="bottom">
        <div class="buypop">
          <div class="t-01" v-if="userInfo.length>0">你有 <span v-for="v in userInfo"><i class="f1">{{v.balance}}</i>{{v.coinName}},</span> 可参加</div>
          <div class="t-01" v-else>你有 0 可参加</div>
          <div class="ft-hdcm">(活动筹码 2000XMX/1000BG/40FT/600QOS/1000ZJLT/4000WFEE/150SDA/1.5USDT/0.005ETH)</div>
          <div class="calculation">
            <a class="sale" @click="sale"></a>
            <a class="add" @click="add"></a>
            <input type="number" :disabled="isShowDisabled" class="text" v-model="counter">
            <div class="ju">局</div>
          </div>
          <div class="already">已有<span class="f1">{{activityTotalParticipateCount}}</span>人参与游戏</div>
          <div class="btn-list">
            <button @click="goBuyPiao" class="cb">充币</button>
            <button class="cj" :class="{nocj:isNoBuy}" :disabled="isTakepartDisable" @click="openTakepartPop">参加</button>
          </div>
        </div>
      </mt-popup>
      <!--参加成功弹窗-->
      <mt-popup v-model="popupVisibleTakepart">
        <div class="takepart">
          <h4 class="title">参加成功!</h4>
          <div class="cj-list" v-for="v in takepartValue.slice(0,5)">
            <span>第{{v.periodNumber}}局</span> <span>{{v.code}}</span> <span>等待开奖</span>
          </div>
          <div class="ft2">共{{takepartValue.length}}张 <router-link class="underline" :to="{name:'myRecord'}">中奖记录></router-link></div>
          <div class="btn"><a class="sure" @click="closeTakepartPop"></a></div>
        </div>
        <div class="tp-fxxy" @click="changeSharePt">邀请好友<span class="f1">返佣20%</span> > </div>
      </mt-popup>
    </div>
    <!--新版红包-->
    <div class="congrat bgfix" v-show="popupVisibleQuan">
      <div class="bgf1"></div>
      <div class="bgf2"></div>
      <div class="hbpop" v-if="showQuan" @click="closeQuan">
        <div class="quan" :class="showqb">
          <ul class="hquan clear">
            <li v-for="v in quanValue"><span class="name">{{v.name}}</span><i class="che">x</i> <span class="cou">{{v.countNum}}</span></li>
          </ul>
          <div class="getbg"><span class="wa">{{allMoney}}</span><span class="wn">BG</span>已充入钱包</div>
          <div class="getrmb"><span class="ya">≈</span><span class="yb">￥</span>{{rmbpop}}</div>
        </div>
      </div>
      <div class="bengchi" v-if="showCar" @click="closeCar"></div>
      <div class="yqfriend" @click="changeSharePt">邀请好友<span class="f1">返佣20%</span> > </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  chivesActivity,
  buyTicket,
  getUserRewardRecords,
  getShareConfigList,
  getAccountInfo
} from "@/api/http";
import { Share, browserUtil, stringUtil, jsBridge } from "@/assets/js/common";
import { Toast } from "mint-ui";
import countTo from "vue-count-to";
import Big from "big.js";
let destroyedChives;
export default {
  name: "jiucai",
  data() {
    return {
      activityId: "",
      minutes: "",
      second: "",
      millisecond: "",
      totalPeriod: "",
      currentPeriod: "",
      rewardTotalValue: 0,
      remainderPeriod: "",
      startVal: 0, //  滚动开始数字
      endVal: 0,
      separator: "",
      prefix: "0000",
      popupVisibleQuan: false, //中奖券弹窗
      quanValue: [],
      allMoney: 0,
      showCar: false,
      showQuan: false,
      popupVisibleTakepart: false, //参加成功弹窗
      takepartValue: [], // 参见成功号
      isTakepartDisable: false,
      popupVisibleBuy: false, // 购买弹窗
      rewards: [{ num: 1, label: 2 }], // 券
      counter: 0, // 购买数量
      shareMessage: {},
      userInfo: [],
      activityTotalParticipateCount: 0,
      isShowDownApp: true,
      overActivity: false, //活动结束
      userCurrentParticipatePeriod: 0,
      errorCount: 0 // 503统计
    };
  },
  components: { countTo },
  created() {
    let sourceParam =
      decodeURIComponent(stringUtil.getQueryValue("sourceParam")) || "";
    let appToken = decodeURIComponent(stringUtil.getQueryValue("token")) || "";
    if (sourceParam) {
      this.$store.dispatch("getSourceParam", sourceParam);
    }
    if (browserUtil().bigerAndroid || browserUtil().bigerIos) {
      this.$store.dispatch("getAppToken", { token: appToken });
      this.isShowDownApp = false;
    } else {
      this.getShareConfigList(); //获取分享信息
    }
    this.getChivesActivityTime();
    this.getUserRewardRecords(); //获取中奖记录
    destroyedChives = setInterval(() => {
      this.getChivesActivity();
      this.getUserRewardRecords();
    }, 5000);
  },
  computed: {
    isNoBuy() {
      return this.counter == 0;
    },
    rmbCar() {
      return Big(this.rewardTotalValue)
        .times(0.005)
        .toFixed();
    },
    rmbpop() {
      var money = Big(this.allMoney)
        .times(0.005)
        .toFixed();
      if (money < 1) {
        return money;
      } else {
        Math.floor(money);
      }
    },
    showqb() {
      var l = this.quanValue.length;
      if (l == 1) {
        return "qb1";
      } else if (l == 2) {
        return "qb2";
      } else if (l == 3) {
        return "qb3";
      } else if (l == 4) {
        return "qb4";
      } else if (l == 5) {
        return "qb5";
      } else if (l == 6) {
        return "qb6";
      }
    },
    ...mapGetters(["token"]),
    hasToken() {
      if (this.token) {
        return true;
      } else {
        return false;
      }
    },
    isShowDisabled() {
      if (browserUtil().bigerAndroid || browserUtil().bigerIos) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //获取账户余额
    getAccountInfo(data) {
      getAccountInfo(data).then(res => {
        var avaiable = 0; //场次
        this.userInfo = res.activityAccountInfoList;
        this.userCurrentParticipatePeriod = res.userCurrentParticipatePeriod;
        if (this.userInfo.length > 0) {
          this.userInfo.forEach(function(v) {
            return (avaiable += v.available);
          });
        }
        avaiable = Math.floor(avaiable); //用户拥有得局数
        var userCurrentParticipatePeriod = res.userCurrentParticipatePeriod;
        var userBuyMax =
          this.totalPeriod -
          Math.max(userCurrentParticipatePeriod, this.currentPeriod); // 用户可以买得最大局数
        var userCanBuyMax = Math.min(userBuyMax, avaiable); //用户可以买得最小值
        if (userCurrentParticipatePeriod < this.currentPeriod) {
          this.counter = userCanBuyMax + 1;
          this.userMathAvaiable = userCanBuyMax + 1;
        } else {
          this.counter = userCanBuyMax;
          this.userMathAvaiable = userCanBuyMax;
        }
      });
    },
    getChivesActivityTime() {
      chivesActivity().then(res => {
        if (res.activityId) {
          var reVal = res.rewards;
          var rewards = reVal.reverse();
          var rewardsLength = rewards.length || 0;
          this.activityTotalParticipateCount =
            res.activityTotalParticipateCount;
          this.totalPeriod = res.totalPeriod;
          this.startVal = 0;
          this.endVal = res.userCount;
          this.rewardTotalValue = res.rewardTotalValue;
          this.remainderPeriod = res.remainderPeriod;
          this.currentPeriod = res.currentPeriod;
          this.activityId = res.activityId;
          this.rewards = [];
          for (var i = 0; i < 5; i++) {
            if (i < rewardsLength) {
              this.rewards.push(rewards[i]);
            } else {
              this.rewards.unshift({
                label: "?",
                name: "",
                num: 0
              });
            }
          }
          this.formatePrefix(this.endVal);
          let leftTime = parseInt(res.end - res.current);
          let lastTime = +new Date();
          let time = setInterval(() => {
            const costTime = +new Date() - lastTime;
            lastTime = +new Date();
            let m = this.formate(parseInt((leftTime / 1000 / 60) % 60));
            let s = this.formate(parseInt((leftTime / 1000) % 60));
            let hm = this.formate2(parseInt(leftTime % 1000));
            if (leftTime <= 0) {
              this.minutes = "00";
              this.second = "00";
              this.millisecond = "00";
              clearInterval(time);
              location.reload();
            } else {
              this.minutes = "12";
              this.minutes = `${m}`;
              this.second = `${s}`;
              this.millisecond = `${hm}`;
            }
            leftTime -= costTime;
          }, 15);
          if (this.token) {
            this.getAccountInfo({ activityId: this.activityId });
          }
        }
      });
    },
    getChivesActivity() {
      chivesActivity()
        .then(res => {
          if (res.activityId) {
            let rewards = res.rewards.reverse();
            let rewardsLength = rewards.length;
            this.activityTotalParticipateCount =
              res.activityTotalParticipateCount;
            this.totalPeriod = res.totalPeriod;
            this.startVal = this.endVal;
            this.endVal = res.userCount;
            this.rewardTotalValue = res.rewardTotalValue;
            this.remainderPeriod = res.remainderPeriod;
            this.currentPeriod = res.currentPeriod;
            this.activityId = res.activityId;
            this.$store.dispatch("getActivityId", this.activityId);
            this.rewards = [];
            for (var i = 0; i < 5; i++) {
              if (i < rewardsLength) {
                this.rewards.push(rewards[i]);
              } else {
                this.rewards.unshift({
                  label: "?",
                  name: "",
                  num: 0
                });
              }
            }
            this.formatePrefix(this.endVal);
            this.errorCount = 0;
          } else {
            clearInterval(destroyedChives);
            this.overActivity = true;
          }
        })
        .catch(res => {
          var status = res.data.status;
          if (status >= 500 && status < 600) {
            this.errorCount++;
          }
          if (this.errorCount > 3) {
            this.$router.push({ name: "error" });
          }
        });
    },
    getUserRewardRecords() {
      if (this.token) {
        getUserRewardRecords()
          .then(res => {
            if (res.length > 0) {
              var car = [];
              // 小汽车
              car = res.filter(function(v, i) {
                return (
                  v.rewardRecordType == "SUPER_REWARD" &&
                  v.rewardRecordStatus == "ASSIGNED"
                );
              });
              //券和红包
              var quanArr = res.filter(function(v, i) {
                return (
                  (v.rewardRecordType == "RED_PACKET" ||
                    v.rewardRecordType == "CHIVES_REWARD") &&
                  v.rewardRecordStatus == "ASSIGNED"
                );
              });
              if (quanArr.length > 0) {
                var ybqCount = 0;
                var sbqCount = 0;
                var bbqCount = 0;
                var qbqCount = 0;
                var wbqCount = 0;
                var hbCount = 0;
                var hbAllMoney = 0;
                var duplicateArr = []; //去重值
                var obj = {};
                //计算张数
                quanArr.forEach(function(v) {
                  if (v.name == "一倍券") {
                    ybqCount++;
                  } else if (v.name == "十倍券") {
                    sbqCount++;
                  } else if (v.name == "百倍券") {
                    bbqCount++;
                  } else if (v.name == "千倍券") {
                    qbqCount++;
                  } else if (v.name == "万倍券") {
                    wbqCount++;
                  } else if (v.rewardRecordType == "RED_PACKET") {
                    hbCount++;
                  }
                  hbAllMoney += v.quality;
                });
                for (var i = 0, l = quanArr.length; i < l; i++) {
                  if (!obj[quanArr[i]["name"]]) {
                    duplicateArr.push(quanArr[i]);
                    obj[quanArr[i]["name"]] = 1;
                  }
                }
                duplicateArr.forEach(function(v, i, arr) {
                  if (v.name == "一倍券") {
                    arr[i].countNum = ybqCount;
                  } else if (v.name == "十倍券") {
                    arr[i].countNum = sbqCount;
                  } else if (v.name == "百倍券") {
                    arr[i].countNum = bbqCount;
                  } else if (v.name == "千倍券") {
                    arr[i].countNum = qbqCount;
                  } else if (v.name == "万倍券") {
                    arr[i].countNum = wbqCount;
                  } else if (v.rewardRecordType == "RED_PACKET") {
                    arr[i].countNum = hbCount;
                  }
                });
                this.quanValue = duplicateArr;
                this.allMoney = hbAllMoney;
              }
              if (car.length > 0) {
                this.popupVisibleQuan = true;
                this.showCar = true;
              } else if (car.length == 0 && quanArr.length > 0) {
                this.popupVisibleQuan = true;
                this.showQuan = true;
              }
              this.errorCount = 0;
            }
          })
          .catch(res => {
            var status = res.data.status;
            if (status >= 500 && status < 600) {
              this.errorCount++;
            }
            if (this.errorCount > 3) {
              this.$router.push({ name: "error" });
            }
          });
      }
    },
    closeCar() {
      if (this.quanValue.length > 0) {
        this.showCar = false;
        this.showQuan = true;
      } else {
        this.popupVisibleQuan = false;
      }
    },
    closeQuan() {
      this.popupVisibleQuan = false;
    },
    getShareConfigList() {
      //分享拿后台数据
      if (this.token) {
        getShareConfigList().then(res => {
          var data = res.filter((v, i) => {
            return v.entrance == 3;
          });
          this.shareMessage = data[0];
        });
      }
    },
    changeSharePt() {
      if (this.token) {
        if (browserUtil().bigerIos || browserUtil().bigerAndroid) {
          jsBridge.share();
        } else {
          this.$sharePost({ url: this.shareMessage.shareUrl });
        }
      } else {
        this.$router.push({ name: "signUp" });
      }
    },
    formate(time) {
      if (time > 9) {
        return time;
      } else {
        return `0${time}`;
      }
    },
    formate2(time) {
      if (time > 99) {
        return time;
      } else {
        return `0${time}`;
      }
    },
    formatePrefix(data) {
      if (data < 10) {
        this.prefix = "0000";
      } else if (data >= 10 && data < 100) {
        this.prefix = "000";
      } else if (data >= 100 && data < 1000) {
        this.prefix = "00";
      } else if (data >= 1000 && data < 10000) {
        this.prefix = "0";
      } else {
        this.prefix = "";
      }
    },
    openTakepartPop: function() {
      // 购买
      let data = {
        activityId: this.activityId,
        num: parseInt(this.counter)
      };
      if (this.counter == 0) {
        return;
      }
      if (this.counter > this.userMathAvaiable) {
        Toast({
          message: "您已超出可购买的场次",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      this.isTakepartDisable = true;
      buyTicket(data)
        .then(res => {
          if (res) {
            this.popupVisibleBuy = false;
            this.popupVisibleTakepart = true;
            this.takepartValue = res;
            this.isTakepartDisable = false;
          }
          this.getAccountInfo({ activityId: this.activityId });
        })
        .catch(error => {
          this.isTakepartDisable = false;
          Toast({
            message: error,
            position: "bottom",
            duration: 5000
          });
        });
    },
    add: function() {
      if (this.counter < this.userMathAvaiable) {
        this.counter = parseInt(this.counter) + 1;
      }
    },
    sale: function() {
      if (this.counter > 1) {
        this.counter = parseInt(this.counter) - 1;
      }
    },
    closeTakepartPop: function() {
      this.popupVisibleTakepart = false;
    },
    openBuyPop: function() {
      if (this.overActivity) {
        return;
      }
      if (browserUtil().bigerIos || browserUtil().bigerAndroid) {
        this.popupVisibleBuy = true;
      } else {
        if (!this.hasToken) {
          this.$router.push({ name: "signUp" });
          return;
        } else {
          this.popupVisibleBuy = true;
        }
      }
    },
    goBuyPiao() {
      if (browserUtil().bigerIos || browserUtil().bigerAndroid) {
        jsBridge.recharge();
      } else {
        if (this.token) {
          this.$router.push({ name: "money" });
        } else {
          this.$router.push({ name: "signUp" });
        }
      }
    }
  },
  destroyed() {
    clearInterval(destroyedChives);
  }
};
</script>
<style lang="less">
.jiucai {
  background-color: #2a0054;
  .newjackpot {
    width: 7.5rem;
    height: 7.05rem;
    background: url("~@/assets/images/home/njp_01.png") 0 0 no-repeat;
    background-size: 100%;
    position: relative;
    .title {
      padding-left: 1.37rem;
      height: 0.65rem;
      line-height: 0.65rem;
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 1);
      text-shadow: 1px 1px 1px rgba(1, 147, 241, 0.75);
      margin-bottom: 0.1rem;
    }
    .countdown {
      position: absolute;
      left: 3.46rem;
      top: 0.12rem;
      font-size: 0.32rem;
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
      .timer {
        padding: 0 0.1rem;
        display: inline-block;
        text-align: center;
        background-color: #0f98d7;
        border-radius: 0.04rem;
        color: #fff;
        float: left;
      }
      .maohao {
        color: #fff;
        display: inline-block;
        float: left;
        padding: 0 0.1rem;
      }
    }
    .cynumber {
      margin-left: 0.76rem;
      margin-bottom: 0.1rem;
      width: 6rem;
      height: 1.16rem;
      background: url("~@/assets/images/home/kp5.png") 0 0 no-repeat;
      background-size: 100%;
      span {
        padding-left: 0.2rem;
        height: 1.16rem;
        line-height: 1.16rem;
        display: block;
        letter-spacing: 0.763rem;
        font-weight: bold;
        font-size: 0.89rem;
        text-shadow: 0 0 0.26rem #00fcff;
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 bottom,
          from(#fff),
          to(#aeeaff)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Helvetica;
        /*font-family: "Helvetica Neue";*/
      }
    }
    .cyn6 {
      background: url("~@/assets/images/home/kp6.png") 0 0 no-repeat;
      background-size: 100%;
      span {
        padding-left: 0.165rem;
        letter-spacing: 0.543rem;
      }
    }
    .allquan {
      margin-left: 0.605rem;
      margin-bottom: 0.4rem;
      width: 6.28rem;
      height: 1.55rem;
      background: url("~@/assets/images/home/kp_bg.png") 0 0 no-repeat;
      background-size: 100%;
      padding-top: 0.43rem;
      position: relative;
      .shiwan {
        position: absolute;
        left: -0.2rem;
        top: 0;
        width: 0.87rem;
        height: 0.87rem;
        background: url("~@/assets/images/home/sy_09.png") 0 0 no-repeat;
        background-size: 100%;
      }
      li {
        float: left;
        width: 1.13rem;
        height: 0.74rem;
        margin-right: 0.15rem;
        text-align: center;
        .ft1 {
          font-size: 0.3rem;
          color: #fff;
          display: block;
          height: 0.32rem;
          line-height: 0.32rem;
          background-image: -webkit-gradient(
            linear,
            0 0,
            100% 0,
            from(#3cf4f1),
            to(#f716f7)
          );
          text-after-overflow: hidden;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        .ft2 {
          font-size: 0.2rem;
          color: #c67402;
          display: block;
          height: 0.4rem;
          line-height: 0.4rem;
        }
      }
      li:last-child {
        margin-right: 0;
      }
    }
    .bengchi {
      width: 6.21rem;
      height: 1.47rem;
      margin: 0 auto 0.05rem;
      img {
        display: block;
      }
    }
    .allmoney {
      font-size: 0.7rem;
      text-align: center;
      color: #fff;
      font-weight: bold;
      /*text-shadow: 0 0 0.26rem #ff6e55;*/
    }
    .ft3 {
      text-align: center;
      font-size: 0.24rem;
      color: #b186f2;
    }
  }
  .mymessage {
    padding: 0.2rem 0.4rem;
    .countdown {
      font-size: 0.24rem;
      text-align: center;
      color: #fff;
      margin-bottom: 0.1rem;
      .djs {
        vertical-align: middle;
        font-size: 0.36rem;
        display: inline-block;
        vertical-align: middle;
        line-height: 0.4rem;
        .timer {
          display: inline-block;
          text-align: center;
          width: 0.56rem;
          height: 0.56rem;
          line-height: 0.56rem;
          background-color: #44089e;
          -webkit-border-radius: 0.06rem;
          -moz-border-radius: 0.06rem;
          border-radius: 0.06rem;
          color: #fcc031;
        }
        .maohao {
          font-size: 0.36rem;
          color: #fcc031;
        }
      }
    }
    .btn-buymain {
      margin-bottom: 0.4rem;
      a {
        display: inline-block;
        width: 3.24rem;
        height: 1.07rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.36rem;
        color: #fff;
        float: left;
      }
      .btn-1 {
        background: url("~@/assets/images/home/sy_btn1.png") 0 0 no-repeat;
        background-size: 100%;
        margin-right: 0.2rem;
      }
      .isover {
        background: url("~@/assets/images/buy_hui.png") 0 0 no-repeat;
        background-size: 3.24rem 1.08rem;
      }
      .btn-2 {
        background: url("~@/assets/images/home/sy_btn2.png") 0 0 no-repeat;
        background-size: 100%;
        position: relative;
        .fy {
          position: absolute;
          right: 0;
          top: -0.2rem;
          width: 1.2rem;
          height: 0.49rem;
          background: url("~@/assets/images/home/sy_07.png") 0 0 no-repeat;
          background-size: 100%;
          display: block;
        }
      }
    }
    .lookwingrule {
      display: flex;
      > div {
        flex: 1;
        text-align: center;
        a {
          font-size: 0.32rem;
          color: #e8d2ff;
          display: block;
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }
    }
    .kaijiang {
      margin-bottom: 0.1rem;
      .fl {
        float: left;
        font-size: 0.34rem;
        color: #fcc031;
      }
      .fr {
        float: right;
        font-size: 0.28rem;
        color: #e8d2ff;
      }
    }
    .xmx {
      font-size: 0.24rem;
      color: #fff;
      margin-bottom: 0.2rem;
      span {
        color: #fff;
      }
      b {
        font-size: 0.28rem;
        color: #fff;
      }
    }
  }
  .invitation {
    background: url("~@/assets/images/home/sy_05.png");
    background-size: 100%;
    position: relative;
    width: 7.5rem;
    height: 4.99rem;
    margin-bottom: 0.3rem;
    .btn-invit {
      position: absolute;
      left: 2.13rem;
      top: 3.5rem;
      display: inline-block;
      width: 3.24rem;
      height: 1.07rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.36rem;
      color: #fff;
      background: url("~@/assets/images/home/sy_btn1.png") 0 0 no-repeat;
      background-size: 100%;
    }
  }
  .yxgl {
    width: 6.7rem;
    margin: 0 auto;

    .byb-bg {
      width: 6.7rem;
      height: 4.57rem;
      position: relative;
      background: url("~@/assets/images/home/sy_06.png") 0 0 no-repeat;
      background-size: 100%;
      margin-bottom: 0.5rem;
      .btn-maipiao {
        position: absolute;
        left: 1.79rem;
        top: 3.2rem;
        display: inline-block;
        width: 3.24rem;
        height: 1.07rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.36rem;
        color: #fff;
        background: url("~@/assets/images/home/sy_btn1.png") 0 0 no-repeat;
        background-size: 100%;
      }
    }
    .text {
      margin-bottom: 0.93rem;
      .title {
        text-align: center;
        font-size: 0.34rem;
        color: #fff;
        margin-bottom: 0.1rem;
      }
      li {
        font-size: 0.24rem;
        line-height: 0.48rem;
        color: #fff;
      }
      .xcd {
        color: #ff9e00;
        font-size: 0.28rem;
        font-weight: bold;
        margin-top: 0.2rem;
      }
    }
  }
}
.buypop {
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0.2rem 0.4rem 0.4rem;
  width: 7.5rem;
  .t-01 {
    text-align: center;
    font-size: 0.28rem;
    margin-bottom: 0.1rem;
    word-break: break-all;
    .f1 {
      color: #ff6b6b;
    }
  }
  .ft-hdcm {
    color: #aebbc7;
    font-size: 0.24rem;
    margin-bottom: 0.1rem;
    text-align: center;
    word-break: break-all;
  }
  .calculation {
    width: 3.74rem;
    height: 1.78rem;
    background: url("~@/assets/images/buy_03.png") 0 0 no-repeat;
    background-size: 100%;
    margin: 0 auto 0.3rem;
    position: relative;
    a {
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      position: absolute;
    }
    .sale {
      background: url("~@/assets/images/buy_01.png") center no-repeat;
      background-size: 0.28rem 0.08rem;
      top: 0.45rem;
      left: 0.2rem;
    }
    .add {
      background: url("~@/assets/images/buy_02.png") center no-repeat;
      background-size: 0.28rem 0.28rem;
      top: 0.45rem;
      right: 0.25rem;
    }
    .text {
      background: transparent;
      outline: none;
      border: none;
      text-align: center;
      width: 1.6rem;
      height: 1.2rem;
      position: absolute;
      left: 1.05rem;
      top: 0.2rem;
      color: #ff6b6b;
      font-size: 0.72rem;
    }
    .ju {
      position: absolute;
      font-size: 0.4rem;
      bottom: 0.2rem;
      right: -0.5rem;
    }
  }
  .already {
    text-align: center;
    font-size: 0.28rem;
    margin-bottom: 0.4rem;
    .f1 {
      color: #fcb702;
    }
  }
  .btn-list {
    display: flex;
    button {
      width: 3.24rem;
      height: 1.08rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.4rem;
      color: #fff;
      display: inline-block;
      flex: 1;
      padding-bottom: 0.06rem;
    }
    .cb {
      background: url("~@/assets/images/buy_06.png") 0 0 no-repeat;
      background-size: 3.24rem 1.08rem;
    }
    .cj {
      background: url("~@/assets/images/buy_05.png") 0 0 no-repeat;
      background-size: 3.24rem 1.08rem;
    }
    .nocj {
      background: url("~@/assets/images/buy_hui.png") 0 0 no-repeat;
      background-size: 3.24rem 1.08rem;
    }
  }
}
.tp-fxxy {
  color: #fff;
  font-size: 0.28rem;
  text-align: center;
  padding-top: 0.88rem;
  .f1 {
    color: #fae087;
  }
}
.takepart {
  width: 5rem;
  background-color: #fca731;
  -webkit-border-radius: 0.4rem;
  -moz-border-radius: 0.4rem;
  border-radius: 0.4rem;
  padding-bottom: 0.32rem;
  overflow: hidden;
  .title {
    font-size: 0.4rem;
    color: #fff;
    text-align: center;
    padding: 0.5rem 0;
  }
  .cj-list {
    margin-bottom: 0.2rem;
    display: flex;
    font-size: 0.28rem;
    > span {
      flex: 1;
      display: block;
      text-align: center;
      color: #fff;
    }
    span:last-child {
      color: #f8d500;
    }
  }
  .ft2 {
    font-size: 0.24rem;
    text-align: center;
    color: #fff;
    margin-bottom: 0.3rem;
    margin-top: 0.32rem;
    .underline {
      text-decoration: underline;
      color: #fff;
    }
  }
  .btn {
    text-align: center;
    .sure {
      width: 1.6rem;
      height: 0.64rem;
      display: inline-block;
      background: url("~@/assets/images/buy_04.png") 0 0 no-repeat;
      background-size: 100%;
    }
  }
}
.congrat {
  .bengchi {
    position: absolute;
    z-index: 20;
    left: 50%;
    top: 1rem;
    margin-left: -5.58rem/2;
    width: 5.58rem;
    height: 7.68rem;
    background: url("~@/assets/images/pop/con_2.png");
    background-size: 100%;
  }
  .hbpop {
    position: absolute;
    z-index: 20;
    left: 50%;
    top: 1rem;
    margin-left: -5.27rem/2;
    width: 5.27rem;
    height: 7.44rem;
    background: url("~@/assets/images/pop/con_1.png");
    background-size: 100%;
    .quan {
      padding-top: 3.8rem;
      padding-left: 1.25rem;
      .hquan {
        margin-bottom: 0.2rem;
        li {
          .name {
            color: #fff;
            float: left;
          }
          position: relative;
          width: 3.5rem;
          .che {
            position: absolute;
            color: #fff;
          }
          .cou {
            position: absolute;
            color: #fff;
          }
        }
      }
      .getbg {
        font-size: 0.24rem;
        color: #fff;
        margin-bottom: 0.3rem;
        .wa {
          font-size: 0.36rem;
          color: #fff;
        }
        .wn {
          color: #fff;
          padding-right: 0.1rem;
        }
      }
      .getrmb {
        position: relative;
        padding-left: 0.4rem;
        font-size: 0.64rem;
        color: #fae087;
        .ya {
          position: absolute;
          left: 0;
          top: 0.17rem;
          font-size: 0.36rem;
          color: #fae087;
        }
        .yb {
          font-size: 0.36rem;
          color: #fae087;
        }
      }
    }
    .qb1 {
      .hquan {
        li {
          .name {
            font-size: 0.75rem;
          }
          .che {
            right: 0.8rem;
            top: 0.2rem;
            font-size: 0.24rem;
          }
          .cou {
            left: 2.8rem;
            top: 0.2rem;
            font-size: 0.4rem;
          }
        }
      }
    }
    .qb2 {
      padding-top: 3.5rem;
      .hquan {
        margin-bottom: 0.2rem;
      }
      .getbg {
        margin-bottom: 0.1rem;
      }
      li {
        height: 1rem;
        .name {
          font-size: 0.72rem;
        }
        .che {
          right: 0.8rem;
          top: 0.2rem;
          font-size: 0.24rem;
        }
        .cou {
          left: 2.8rem;
          top: 0.2rem;
          font-size: 0.4rem;
        }
      }
    }
    .qb3 {
      padding-top: 3.2rem;
      .hquan {
        margin-bottom: 0.2rem;
      }
      .getbg {
        margin-bottom: 0.1rem;
      }
      li {
        height: 0.8rem;
        .name {
          font-size: 0.64rem;
        }
        .che {
          right: 0.8rem;
          top: 0.2rem;
          font-size: 0.24rem;
        }
        .cou {
          left: 2.8rem;
          top: 0.2rem;
          font-size: 0.4rem;
        }
      }
    }
    .qb4 {
      padding-top: 3.2rem;
      .hquan {
        margin-bottom: 0.2rem;
      }
      .getbg {
        margin-bottom: 0.1rem;
      }
      li {
        height: 0.65rem;
        .name {
          font-size: 0.48rem;
        }
        .che {
          right: 0.8rem;
          top: 0.05rem;
          font-size: 0.24rem;
        }
        .cou {
          left: 2.8rem;
          top: 0.05rem;
          font-size: 0.4rem;
        }
      }
    }
    .qb5 {
      padding-top: 3.2rem;
      .hquan {
        margin-bottom: 0.2rem;
      }
      .getbg {
        margin-bottom: 0.1rem;
      }
      li {
        height: 0.52rem;
        .name {
          font-size: 0.38rem;
        }
        .che {
          right: 0.9rem;
          top: 0;
          font-size: 0.24rem;
        }
        .cou {
          left: 2.8rem;
          top: 0;
          font-size: 0.4rem;
        }
      }
    }
    .qb6 {
      padding-top: 3.2rem;
      .hquan {
        margin-bottom: 0.2rem;
      }
      .getbg {
        margin-bottom: 0.1rem;
      }
      li {
        height: 0.4rem;
        .name {
          font-size: 0.28rem;
        }
        .che {
          right: 0.9rem;
          top: 0;
          font-size: 0.24rem;
        }
        .cou {
          left: 2.8rem;
          top: 0;
          font-size: 0.28rem;
        }
      }
    }
  }
  .yqfriend {
    position: absolute;
    top: 9rem;
    left: 50%;
    margin-left: -2rem;
    text-align: center;
    z-index: 100;
    width: 4rem;
    color: #fff;
    font-size: 0.28rem;
    .f1 {
      color: #fae087;
    }
  }
  .bgf1 {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: url("~@/assets/images/pop/con_3.png");
    background-size: 100%;
    width: 7.5rem;
    height: 6.38rem;
  }
  .bgf2 {
    position: absolute;
    left: 0;
    top: 7rem;
    z-index: 1;
    background: url("~@/assets/images/pop/con_4.png");
    background-size: 100%;
    width: 7.5rem;
    height: 6.41rem;
  }
}
</style>
