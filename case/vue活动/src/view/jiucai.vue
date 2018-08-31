<template>
  <div>
    <div class="jiucai">
      <div class="banner"><img src="@/assets/images/home/sy_01.png" class="show" alt=""></div>
      <div class="parnumber">
        <countTo :startVal='startVal' :endVal='endVal' :separator="separator" :prefix="prefix" :duration='3000'></countTo>
      </div>
      <div class="jackpot">
        <div class="q-list">
          <ul>
            <li v-for="v in rewards"><span class="ft1">{{v.num}}张</span> <span class="ft2">{{v.label}}张</span></li>
          </ul>
        </div>
        <div class="bengchi"><img src="@/assets/images/home/sy_banner1.png" alt=""></div>
        <div class="allmoney">￥{{rewardTotalValue}}</div>
        <div class="ft3">(参与人数越多奖券价值越大）</div>
      </div>
      <div class="mymessage">
        <div class="countdown">
          本局开奖倒计时
          <span class="djs">
            <span class="timer">{{minutes}}</span>
            <span class="maohao">:</span>
            <span class="timer">{{second}}</span>
            <!-- <span class="maohao">:</span>
            <span class="timer">{{millisecond}}</span>-->
          </span>
          剩余{{remainderPeriod}}局</div>
        <div class="kaijiang clear">
          <div class="fl">第{{currentPeriod}}局等待开奖...</div>
          <div class="fr" v-if="hasToken"><router-link :to="{name:'myRecord'}">查看中奖记录></router-link></div>
        </div>
        <div class="xmx" v-if="hasToken && userInfo.length>0">
          我拥有
          <span v-for="v in userInfo"><b>{{v.balance}}</b> {{v.coinName}},</span>
          可以参与 <b>{{userMathAvaiable}}</b> 局游戏
        </div>
        <div class="xmx" v-else-if="hasToken && userInfo.length==0">
          我拥有0 可以参与 <b>0</b> 局游戏
        </div>
        <div class="xmx" v-else>
          我拥有
          <span><b>--</b> XMX,</span>
          <span><b>--</b> BG,</span>
          可以参与 <b>--</b> 局游戏
        </div>
        <div class="btn-buymain clear">
          <a class="btn-1" @click="openBuyPop">来玩一局</a>
          <a class="btn-2" id="nativeShare1" @click="changeSharePt" >邀请好友 <span class="fy"></span></a>
        </div>
      </div>
      <div class="invitation">
        <div class="btn-invit" @click="changeSharePt">邀请好友</div>
      </div>
      <div class="yxgl">
        <div class="byb-bg">
          <div class="btn-maipiao" @click="goBuyPiao">买票上车</div>
        </div>
        <div class="text">
          <h4 class="title">游戏攻略</h4>
          <ul>
            <li>1. 每局游戏的筹码为1000XMX/xBG，用户可以直接在biger充值XMX或购买BG参与游戏。每局游戏限时1小时，biger 48小时不打烊。</li>
            <li>2. 伴随参与游戏人数的增长，奖池中的奖券数量也会裂变增长哦，所以快去拉你的小伙伴一起来瓜分大奖，增加中奖几率。</li>
            <li>3. 如果你邀请来的小伙伴（仅限新用户）中了奖，你也可以获得奖金的20%返佣。只要你的朋友足够多，承包奖池不是梦！</li>
            <li>4. 一小时倒计时结束后，奖池中的奖券会随机发放给参与游戏的小伙伴。没有拿到奖券的小伙伴也能拿到空投红包。</li>
            <li>5. 拿到奖券的朋友可以按照奖券的兑换规则将参与游戏的1000XMX兑换为biger平台币BG。</li>
            <li>小彩蛋：一局凑够10万人，奖池中会直接开进一辆豪车！</li>
          </ul>
        </div>
      </div>
      <div><a href="http://static.biger168.com/load/index.html#/" class="show"><img class="show" src="@/assets/images/home/sy_08.png" alt=""></a></div>
    </div>
    <!--中奖券弹窗-->
    <div class="bgfix winpop" @click="closepopupVisibleQuan" v-show="popupVisibleQuan">
      <div class="popflex">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="bg1" :class="{ptquan:v.ptquan}" :key="i" v-for="(v,i) in quanValue">
            <img :src="v.picImg" alt="">
            <div class="sale" :class="[v.textColor]">{{v.quality}}{{v.currency}}已充入钱包</div>
            <div class="count" v-if="v.countNum>1">x<span class="biger">{{v.countNum}}</span></div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="fxxy" id="nativeShare2" @click="changeShareQuan">分享喜悦 ></div>
    </div>
    <!--待开红包-->
    <div class="bgfix winpop" v-show="popupVisibleWait" @click="popupVisibleWait=false">
      <div class="bg-after" v-show="openHongbao"></div>
      <div class="bg-front" :class="{'frontactive':isBaozha}"></div>
      <div class="hb-main" v-if="waitHongbao" @click.stop="openPopupVisibleOpenWin">
        <img src="@/assets/images/hongbao.png" alt="">
        <div class="ft1">biger给你大红包</div>
        <div class="ft2" v-if="hongbaoValue">您有{{hongbaoValue.hongbaoCount}}个红包</div>
      </div>
      <div class="openhb" v-show="openHongbao">
        <img src="@/assets/images/hongbao2.png" alt="">
        <div class="gxtitle">恭喜获得</div>
        <div class="money" v-if="hongbaoValue">{{hongbaoValue.hbAllMoney}}<span class="coin">{{hongbaoValue.currency}}</span></div>
        <div class="fxxy" id="nativeShare3" @click="changeShareHongbao">分享喜悦></div>
      </div>
    </div>
    <!--buy-->
    <div>
      <!--购买弹窗-->
      <mt-popup
        v-model="popupVisibleBuy"
        position="bottom">
        <div class="buypop">
          <div class="t-01" v-if="userInfo.length>0">你有 <span v-for="v in userInfo"><i class="f1">{{v.balance}}</i>{{v.coinName}},</span> 可参加</div>
          <div class="t-01" v-else>你有 0 可参加</div>
          <div class="ft-hdcm">(活动筹码 1000XMX/34BG)</div>
          <div class="calculation">
            <a class="sale" @click="sale"></a>
            <a class="add" @click="add"></a>
            <input type="number" class="text" v-model="counter">
            <div class="ju">局</div>
          </div>
          <div class="already">已有<span class="f1">109</span>人参与游戏</div>
          <div class="btn-list">
            <router-link class="cb" :to="{name:'money'}">充币</router-link>
            <a class="cj" @click="openTakepartPop">参加</a>
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
        <div class="tp-fxxy" @click="changeSharePt">分享喜悦></div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import nativeShare from "@/utils/nativeShare";
import {
  chivesActivity,
  buyTicket,
  getUserRewardRecords,
  getShareConfigList,
  getAccountInfo
} from "@/api/http";
import { Share, browserUtil, stringUtil } from "@/assets/js/common";
import { Toast, MessageBox } from "mint-ui";
import countTo from "vue-count-to";
const ybpt = require("@/assets/images/yb2.png");
const sbpt = require("@/assets/images/sb2.png");
const bbpt = require("@/assets/images/bb2.png");
const qbpt = require("@/assets/images/qb2.png");
const wbpt = require("@/assets/images/wb2.png");
const ybq = require("@/assets/images/yb.png");
const sbq = require("@/assets/images/sb.png");
const bbq = require("@/assets/images/bb.png");
const qbq = require("@/assets/images/qb.png");
const wbq = require("@/assets/images/wb.png");
const sharePic = require("@/assets/images/home/sy_01.png");
let fxTitle = "【9.9韭菜节】万倍回收归零币，1000XMX入场变6万RMB！快上车→";
let fxContent = "biger 9.9韭菜节归零币大狂欢，注册就能免费玩游戏一次！";
let fxTitleHb = "【9.9韭菜节】我领取了一个biger大红包，你快来一起领→";
let fxContentHb = "biger 9.9韭菜节归零币大狂欢，两天两夜红包发不停~";
let fxTitleQuan = "【9.9韭菜节】我在biger中奖啦！你快来一起赢6万RMB+奔驰豪车→";
let fxContentQuan = "biger 9.9韭菜节归零币大狂欢，注册就能免费玩游戏一次！";
let destroyedChives;
export default {
  name: "jiucai",
  data() {
    return {
      activityId: "",
      minutes: "",
      second: "",
      millisecond: "",
      currentPeriod: "",
      rewardTotalValue: "",
      remainderPeriod: "",
      startVal: 0, //  滚动开始数字
      endVal: 0,
      separator: "",
      prefix: "",
      swiperOption: {
        notNextTick: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        slidesPerView: 3,
        width: 480
      },
      popupVisibleQuan: false, //中奖券弹窗
      quanValue: [],
      popupVisibleWait: false, //待开红包
      hongbaoValue: "",
      waitHongbao: true,
      openHongbao: false,
      isBaozha: false,
      popupVisibleTakepart: false, //参加成功弹窗
      takepartValue: [], // 参见成功号
      popupVisibleBuy: false, // 购买弹窗
      rewards: [], // 券
      counter: 0, // 购买数量
      shareMessage: {},
      userInfo: [],
      userAvailable: 0 //用户拥有的一共局数
    };
  },
  components: { countTo },
  created() {
    let sourceParam = stringUtil.getQueryValue("sourceParam") || "";
    if (sourceParam) {
      this.$store.dispatch("getSourceParam", sourceParam);
    }
    this.getShareConfigList(); //获取分享信息
    this.getChivesActivityTime();
    this.getUserRewardRecords(); //获取中奖记录
    destroyedChives = setInterval(() => {
      this.getChivesActivity();
      this.getUserRewardRecords();
    }, 5000);
    window._shareData = {
      title: {
        othTitle: fxTitle
      },
      content: fxContent,
      imageurl: `${sharePic}`,
      shareurl: location.href
    };
    Share.Weixin();
  },
  computed: {
    ...mapGetters(["token"]),
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    hasToken() {
      if (this.token) {
        return true;
      } else {
        return false;
      }
    },
    userMathAvaiable() {
      if (this.userAvailable > this.remainderPeriod) {
        return this.remainderPeriod;
      } else {
        return this.userAvailable;
      }
    }
  },
  mounted() {
    this.swiper.slideTo(0, 1000, false);
  },
  methods: {
    //获取账户余额
    getAccountInfo(data) {
      getAccountInfo(data).then(res => {
        var avaiable = 0;
        this.userInfo = res;
        if (res.length > 0) {
          res.forEach(function(v) {
            return (avaiable += v.available);
          });
        }
        this.userAvailable = Math.floor(avaiable);
        if (this.userAvailable > this.remainderPeriod) {
          this.counter = this.remainderPeriod;
        } else {
          this.counter = this.userAvailable;
        }
      });
    },
    getChivesActivityTime() {
      chivesActivity().then(res => {
        let rewards = res.rewards;
        let rewardsLength = res.rewards.length;
        this.startVal = this.endVal;
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
        let time = setInterval(() => {
          let m = this.formate(parseInt((leftTime / 1000 / 60) % 60));
          let s = this.formate(parseInt((leftTime / 1000) % 60));
          let hm = this.formate(parseInt(leftTime % 1000));
          if (leftTime <= 0) {
            this.minutes = "00";
            this.second = "00";
            this.millisecond = "00";
          } else {
            this.minutes = `${m}`;
            this.second = `${s}`;
            this.millisecond = `${hm}`;
          }
          leftTime -= 13;
        }, 13);
        if (this.token) {
          this.getAccountInfo({ activityId: this.activityId });
        }
      });
    },
    getChivesActivity() {
      chivesActivity().then(res => {
        let rewards = res.rewards;
        let rewardsLength = res.rewards.length;
        this.startVal = this.endVal;
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
      });
    },
    getUserRewardRecords() {
      if (this.token) {
        getUserRewardRecords().then(res => {
          if (res.length > 0) {
            //过滤未看过的券
            var quanArr = res.filter(function(v, i) {
              return (
                v.rewardRecordType == "CHIVES_REWARD" &&
                v.rewardRecordStatus == "ASSIGNED"
              );
            });
            if (quanArr.length > 0) {
              var ybqCount = 0;
              var sbqCount = 0;
              var bbqCount = 0;
              var qbqCount = 0;
              var wbqCount = 0;
              var duplicateArr = []; //去重值
              var obj = {};
              this.popupVisibleQuan = true;
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
                }
              });
              for (var i = 0, l = quanArr.length; i < l; i++) {
                if (!obj[quanArr[i]["name"]]) {
                  duplicateArr.push(quanArr[i]);
                  obj[quanArr[i]["name"]] = 1;
                }
              }
              duplicateArr.forEach(function(v, i, arr) {
                if (v.name == "一倍券") {
                  arr[i].picImg = `${ybpt}`;
                  arr[i].ptquan = true;
                  arr[i].textColor = "yb";
                  arr[i].countNum = ybqCount;
                } else if (v.name == "十倍券") {
                  arr[i].picImg = `${sbpt}`;
                  arr[i].ptquan = true;
                  arr[i].textColor = "sb";
                  arr[i].countNum = sbqCount;
                } else if (v.name == "百倍券") {
                  arr[i].picImg = `${bbpt}`;
                  arr[i].ptquan = true;
                  arr[i].textColor = "bb";
                  arr[i].countNum = bbqCount;
                } else if (v.name == "千倍券") {
                  arr[i].picImg = `${qbpt}`;
                  arr[i].ptquan = true;
                  arr[i].textColor = "qb";
                  arr[i].countNum = qbqCount;
                } else if (v.name == "万倍券") {
                  arr[i].picImg = `${wbpt}`;
                  arr[i].textColor = "wb";
                  arr[i].textColor = "";
                  arr[i].countNum = wbqCount;
                }
              });
              duplicateArr.sort(this.compare);
              var maxQuan = duplicateArr.pop();
              if (maxQuan.name == "一倍券") {
                maxQuan.picImg = `${ybq}`;
                maxQuan.ptquan = false;
              } else if (maxQuan.name == "十倍券") {
                maxQuan.picImg = `${sbq}`;
                maxQuan.ptquan = false;
              } else if (maxQuan.name == "百倍券") {
                maxQuan.picImg = `${bbq}`;
                maxQuan.ptquan = false;
              } else if (maxQuan.name == "千倍券") {
                maxQuan.picImg = `${qbq}`;
                maxQuan.ptquan = false;
              } else if (maxQuan.name == "万倍券") {
                maxQuan.picImg = `${wbq}`;
                maxQuan.ptquan = false;
              }
              duplicateArr.splice(1, 0, maxQuan);
              if (duplicateArr.length > 2) {
              }

              this.quanValue = duplicateArr;
            }
            // 红包值
            var hongbaoArr = res.filter(function(v, i) {
              return (
                v.rewardRecordType == "RED_PACKET" &&
                v.rewardRecordStatus == "ASSIGNED"
              );
            });
            if (hongbaoArr.length > 0) {
              var hongbaoCount = hongbaoArr.length; //红包数量
              var hbAllMoney = 0;
              hongbaoArr.forEach(function(v, i, arr) {
                hbAllMoney += v.quality;
              });

              this.hongbaoValue = {
                hbAllMoney,
                hongbaoCount,
                currency: hongbaoArr[0].currency
              };
            }

            //红包大于0，券=0
            if (hongbaoArr.length > 0 && quanArr.length == 0) {
              this.popupVisibleWait = true;
            }
          }
        });
      }
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
        if (browserUtil().weixin) {
          window._shareData = {
            title: {
              othTitle: fxTitle
            },
            content: fxContent,
            imageurl: `${sharePic}`,
            shareurl: this.shareMessage.shareUrl
          };
          Share.Weixin();
        }
        var config = {
          url: this.shareMessage.shareUrl,
          title: fxTitle,
          desc: fxContent,
          img: `${sharePic}`
        };
        var share_obj = new nativeShare("nativeShare1", config);
        document.getElementById("nativeShare1").click();
      } else {
        Toast({
          message: "请登入",
          position: "bottom",
          duration: 5000
        });
      }
    },
    changeShareQuan() {
      if (browserUtil().weixin) {
        window._shareData = {
          title: {
            othTitle: fxTitleQuan
          },
          content: fxContentQuan,
          imageurl: "",
          shareurl: this.shareMessage.shareUrl
        };
        Share.Weixin();
      }
      var config = {
        url: this.shareMessage.shareUrl,
        title: fxTitleQuan,
        desc: fxContentQuan,
        img: `${sharePic}`
      };
      var share_obj = new nativeShare("nativeShare2", config);
      document.getElementById("nativeShare2").click();
    },
    changeShareHongbao() {
      if (browserUtil().weixin) {
        window._shareData = {
          title: {
            othTitle: fxTitleHb
          },
          content: fxContentHb,
          imageurl: "",
          shareurl: this.shareMessage.shareUrl
        };
        Share.Weixin();
      }
      var config = {
        url: this.shareMessage.shareUrl,
        title: fxTitleHb,
        desc: fxContentHb,
        img: `${sharePic}`
      };
      var share_obj = new nativeShare("nativeShare3", config);
      document.getElementById("nativeShare3").click();
    },
    //排序
    compare(x, y) {
      var val1 = x.quality;
      var val2 = y.quality;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    },
    formate(time) {
      if (time > 9) {
        return time;
      } else {
        return `0${time}`;
      }
    },
    formatePrefix(data) {
      if (data < 10) {
        this.prefix = "00000";
      } else if (data >= 10 && data < 100) {
        this.prefix = "0000";
      } else if (data >= 100 && data < 1000) {
        this.prefix = "000";
      } else if (data >= 1000 && data < 10000) {
        this.prefix = "00";
      } else if (data >= 10000 && data < 100000) {
        this.prefix = "0";
      }
    },
    closepopupVisibleQuan() {
      //关闭中奖券弹窗
      this.popupVisibleQuan = false;
      if (this.hongbaoValue) {
        this.popupVisibleWait = true;
      }
    },
    openPopupVisibleOpenWin() {
      //开红包
      this.waitHongbao = false;
      this.isBaozha = true;
      this.openHongbao = true;
    },
    openTakepartPop: function() {
      // 购买
      let data = {
        activityId: this.activityId,
        num: this.counter
      };
      buyTicket(data).then(res => {
        if (res) {
          this.popupVisibleBuy = false;
          this.popupVisibleTakepart = true;
          this.takepartValue = res;
        }
        this.getAccountInfo({ activityId: this.activityId });
      });
    },
    add: function() {
      if (this.counter < this.userMathAvaiable) {
        this.counter = parseInt(this.counter) + 1;
      }
    },
    sale: function() {
      if (this.counter > 0) {
        this.counter = parseInt(this.counter) - 1;
      }
    },
    closeTakepartPop: function() {
      this.popupVisibleTakepart = false;
    },
    openBuyPop: function() {
      if (!this.hasToken) {
        this.$router.push({ name: "signIn" });
        return;
      }
      this.popupVisibleBuy = true;
    },
    goBuyPiao() {
      if (this.token) {
        this.$router.push({ name: "money" });
      } else {
        Toast({
          message: "请登入",
          position: "bottom",
          duration: 5000
        });
      }
    }
  },
  destroyed() {
    clearInterval(destroyedChives);
  }
};
</script>
<style lang="less">
.mint-toast {
  z-index: 25000;
}
.jiucai {
  background-color: #2a0054;
  .parnumber {
    padding-top: 0.67rem;
    width: 6.82rem;
    height: 2.32rem;
    margin: 0 auto;
    background: url("~@/assets/images/home/sy_02.png") 0 0 no-repeat;
    background-size: 100%;
    span {
      padding-left: 0.3rem;
      height: 1.36rem;
      line-height: 1.36rem;
      display: block;
      text-align: center;
      letter-spacing: 0.3rem;
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
      font-family: "Helvetica Neue";
    }
  }
  .jackpot {
    width: 6.82rem;
    height: 6.31rem;
    margin: 0 auto;
    background: url("~@/assets/images/home/sy_04.png") 0 0 no-repeat;
    background-size: 100%;
    .q-list {
      width: 6.35rem;
      height: 2.47rem;
      margin: 0 auto 0.3rem;
      padding-top: 1.76rem;
      li {
        float: left;
        width: 1.14rem;
        height: 0.74rem;
        margin-right: 0.16rem;
        text-align: center;
        .ft1 {
          font-size: 0.24rem;
          color: #fff;
          display: block;
          height: 0.32rem;
          line-height: 0.32rem;
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
      width: 6.14rem;
      height: 1.84rem;
      margin: 0 auto 0.2rem;
      img {
        display: block;
      }
    }
    .allmoney {
      font-size: 0.54rem;
      text-align: center;
      color: #ff6e55;
      font-weight: bold;
      text-shadow: 0 0 0.26rem #ff6e55;
    }
    .ft3 {
      text-align: center;
      font-size: 0.24rem;
      color: #b186f2;
    }
  }
  .mymessage {
    padding: 0.4rem;
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
    .kaijiang {
      margin-bottom: 0.2rem;
      .fl {
        float: left;
        font-size: 0.34rem;
        color: #fcc031;
      }
      .fr {
        float: right;
        a {
          font-size: 0.28rem;
          color: #e8d2ff;
          display: block;
        }
      }
    }
    .xmx {
      font-size: 0.28rem;
      color: #fff;
      margin-bottom: 0.2rem;
      span {
        color: #fff;
      }
      b {
        font-size: 0.36rem;
        color: #fff;
      }
    }
  }
  .invitation {
    background: url("~@/assets/images/home/sy_05.png");
    background-size: 100%;
    position: relative;
    width: 7.5rem;
    height: 5.04rem;
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
    margin: 0 auto 0.4rem;
    .byb-bg {
      width: 6.7rem;
      height: 6.29rem;
      position: relative;
      background: url("~@/assets/images/home/sy_06.png") 0 0 no-repeat;
      background-size: 100%;
      margin-bottom: 0.8rem;
      .btn-maipiao {
        position: absolute;
        left: 1.73rem;
        top: 4.79rem;
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
    }
  }
}
.winpop {
  .bg1 {
    height: 406px;
    margin-right: 0.34rem;
    position: relative;
    img {
      display: block;
      width: 160px;
    }
    .count {
      position: absolute;
      right: 0rem;
      top: 98px;
      font-size: 12px;
      background: url("../assets/images/yejiao.png") 0 0 no-repeat;
      background-size: 100%;
      width: 40px;
      height: 40px;
      text-align: right;
      padding-right: 6px;
      padding-top: 2px;
      vertical-align: top;
      .biger {
        font-size: 15px;
        vertical-align: top;
      }
    }
    .sale {
      color: #fff;
      position: absolute;
      top: 230px;
      left: 0;
      font-size: 12px;
      width: 160px;
      text-align: center;
    }
  }
  .bg1:last-child {
    margin-right: 0;
  }
  .ptquan {
    padding-top: 98px;
    .yb {
      color: #70d3ff;
    }
    .sb {
      color: #56c7cb;
    }
    .bb {
      color: #e79f0a;
    }
    .qb {
      color: #ee678b;
    }
    .wb {
      color: #a055bf;
    }
  }
  .fxxy {
    position: absolute;
    left: -0.8rem;
    bottom: 1rem;
    color: #fff;
    font-size: 0.28rem;
    margin-left: 50%;
    width: 1.6rem;
  }
  .bg-after {
    background: url("../assets/images/bg_after.png") center 0.64rem no-repeat;
    background-size: 100%;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 0;
    left: 0;
    top: 3.5rem;
  }
  .bg-front {
    background: url("../assets/images/bg_front.png") center 1rem no-repeat;
    background-size: 7.5rem 4.94rem;
    width: 7.5rem;
    height: 4.94rem;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    transform: scale(0.1);
    transition: all 0.2s ease-in;
  }
  .frontactive {
    transform: scale(1);
  }
  .hb-main {
    width: 5.52rem;
    height: 5.18rem;
    position: fixed;
    left: 50%;
    margin-left: -2.76rem;
    top: 1.92rem;
    .ft1 {
      position: absolute;
      font-size: 0.4rem;
      color: #fff;
      top: 3.4rem;
      left: 1.5rem;
    }
    .ft2 {
      position: absolute;
      font-size: 0.28rem;
      color: #f1c40f;
      top: 4.36rem;
      left: 2rem;
    }
  }
  .openhb {
    width: 5.13rem;
    height: 6.98rem;
    margin-left: -2.565rem;
    position: fixed;
    left: 50%;
    top: 1.92rem;
    z-index: 10;
    .gxtitle {
      font-size: 0.4rem;
      color: #ff4757;
      position: absolute;
      left: 35%;
      top: 0.5rem;
    }
    .money {
      width: 5.13rem;
      text-align: center;
      font-size: 0.96rem;
      color: #0f3652;
      position: absolute;
      left: 0;
      top: 1.4rem;
      .coin {
        font-size: 0.4rem;
      }
    }
    .fxxy {
      bottom: 0.5rem;
      color: #f1c40f;
    }
  }
}
.mint-popup {
  background: transparent;
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
    .f1 {
      color: #ff6b6b;
    }
  }
  .ft-hdcm{
    color: #AEBBC7;
    font-size: .24rem;
    margin-bottom: .1rem;
    text-align: center;
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
    a {
      width: 3.24rem;
      height: 1.08rem;
      line-height: 1.08rem;
      text-align: center;
      font-size: 0.4rem;
      color: #fff;
      display: inline-block;
      flex: 1;
    }
    .cb {
      background: url("~@/assets/images/buy_06.png") 0 0 no-repeat;
      background-size: 3.24rem 1.08rem;
    }
    .cj {
      background: url("~@/assets/images/buy_05.png") 0 0 no-repeat;
      background-size: 3.24rem 1.08rem;
    }
  }
}
.tp-fxxy {
  color: #fff;
  font-size: 0.28rem;
  text-align: center;
  padding-top: 0.88rem;
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
</style>
