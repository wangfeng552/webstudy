<template>
  <div class="time-components">
        <div class="header">
            <a href="javascript:;" class="btn-back" @click.prevent="goBack">
                <img src="../../assets/images/back.png" alt=""/>
            </a>
            <p>日期</p>
        </div>
        <div class="month month-top" v-for="time in timeList.calendar">
            <h3>{{time.year}}年{{time.month}}月</h3>
            <div class="day-head">
                <span class="saturday">
                   日 
                </span>
                <span>
                   一 
                </span>
                <span>
                   二 
                </span>
                <span>
                   三
                </span>
                <span>
                   四
                </span>
                <span>
                    五
                </span>
                <span class="saturday">
                    六
                </span>
            </div>
            <div class="day-content">
                <span v-for="dayObj in time.dayList" @click="setTime(dayObj)">
                    <div :class="{ 'small-time': dayObj && !dayObj.tcAmount}">
                        <p>{{dayObj && ((time.year == timeList.year && time.month == timeList.month) && dayObj.day - timeList.day == 0 ? '今天' : (time.year == timeList.year && time.month == timeList.month) && dayObj.day - timeList.day == 1 ? '明天' : (time.year == timeList.year && time.month == timeList.month) && dayObj.day - timeList.day == 2 ? '后天' : dayObj.day)}}</p>
                        <p class="price" v-if="dayObj && dayObj.tcAmount"> ¥{{dayObj.tcAmount}} </p>
                    </div>
                    
                </span>
            </div>
        </div>
  </div>
</template>
<script>
import queryOrderServer from "../../service/orderDownService";
import { mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      timeList: {}
    };
  },
  methods: {
    ...mapActions(["getTime"]),
    setTime: function(obj) {
      // 返回上个页面
      if (!obj.priceId) {
        Toast({
          message: "亲，" + obj.date + "不可购买",
          position: "bottom",
          duration: 1000
        });
        return;
      }
      obj.isCalendar = true;
      this.getTime(obj);
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function() {
    var that = this;
    queryOrderServer.getCalendar(this.$route.query.priceId).then(res => {
      that.timeList = res;
    });
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.time-components {
  position: fixed;
  top: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  bottom: 0;
  z-index: 9;
  padding: 0 10px 20px;
  font-family: helvetica, arial, sans-serif;
  background: #fff;
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
  .month-top {
    padding-top: 0.9rem;
  }

  .month {
    margin-top: 10px;
    h3 {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
    }
    .day-head {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #dcdcdc;

      span {
        color: #999;
        font-weight: 400;
        font-size: 15px;
        width: 14.2%;
        text-align: center;
        height: 40px;
        align-items: center;
        line-height: 40px;
      }

      .saturday {
        color: #50b400;
      }
    }
    .day-content {
      display: flex;
      flex-wrap: wrap;
      padding-top: 4px;
      span {
        width: 14.2%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        p {
          color: #333;
          height: 20px;
          line-height: 20px;
        }
        .price {
          color: #f63;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }

    .small-time {
      p {
        color: #ccc !important;
        height: 40px !important;
        line-height: 40px !important;
      }
    }
  }
}
</style>


