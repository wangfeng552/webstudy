<template>
<div class="shop">
  <input type="text" placeholder="在微信浏览器里弹出键盘的bug" @focus="getScrollTop()" @blur="toScroll()" >
  <div class="show" @click="showTime()">显示时间框</div>
  <div class="pickerpop" @touchmove.prevent>
    <mt-datetime-picker @visible-change="visbleChangeDateTime" class="datefff" ref="picker" v-model="pickerDate" type="datetime" :closeOnClickModal="false" @confirm="confirmDate()"></mt-datetime-picker>
  </div>

  <mt-popup v-model="isShowAirportPop" position="bottom" :lockScroll="true">
    <mt-picker ref='airportPick' style="width:100vw; background:#fff" :slots="slots" :showToolbar="true" value-key="qmsj_store_name" :visible-item-count="7">
      <div class="popuptitle">
        <div class="cancel" @click="cancelAirportPop()">取消</div>
        <div @click="confirmAirportPop()" class="sure">确定</div>
      </div>
    </mt-picker>
  </mt-popup>
</div>
</template>

<script>
export default {
  data() {
    return {
      pickerDate: '',
      format_start_time: '',
      isShowAirportPop: false,
      slots: [{
        flex: 1,
        values: [],
        defaultIndex: 0,
        className: 'slot1',
        textAlign: 'center'
      }],
      handler: function (e) {
        e.preventDefault()
      }
    }
  },
  methods: {
    showTime() {
      if (this.format_start_time == '') {
        this.pickerDate = new Date();
      } else {
        this.pickerDate = new Date(this.format_start_time);
      }
      this.$refs.picker.open();
    },
    confirmDate() {
      this.format_start_time = this.pickerDate;
    },
    /*解决页面层级相互影响滑动的问题*/
    closeTouch() {
      document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
        passive: false
      }) //阻止默认事件
    },
    openTouch() {
      document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
        passive: false
      }) //打开默认事件
    },
    visbleChangeDateTime(val) {
      if (val) {
        this.closeTouch()
      } else {
        this.openTouch()
      }
    },
    getScrollTop() {
      this.scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop
    },
    toScroll() {
      document.body.scrollTop = this.scrollTopHeight;
      document.documentElement.scrollTop = this.scrollTopHeight;
    }
  },
  watch: {
    isShowAirportPop(val) {
      //picker关闭没有回调函数，所以侦听该属性替代
      if (val) {
        this.closeTouch()
      } else {
        this.openTouch()
      }
    }
  }
}
</script>

<style>
.picker-items {
  width: 100%
}

.datefff {
  background-color: #fff !important;
  width: 100%;
}
</style>
