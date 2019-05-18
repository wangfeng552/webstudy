<template>
<div class="mk">
   <mt-popup v-model="popupVisibleCity" position="bottom">
    <mt-picker ref="citypicker" style="width: 7.5rem;background: #fff;" @change="addressChange" :showToolbar="true" :visible-item-count="7" :slots="citySlots" valueKey="cityName">
      <div class="popuptitle">
        <div class="cancel" @click="cancelPopupCity">取消</div>
        <div class="popuptitle">客户所在地</div>
        <div @click="ConfirmCity" class="sure">确定</div>
      </div>
    </mt-picker>
  </mt-popup>

</div>
</template>

<script>
export default {
  data() {
    return {
      popupVisibleCity: false,
      handler: function (e) {
        e.preventDefault()
      }
    }
  },
  methods: {
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
    }
  },
  watch: {
    popupVisibleCity(val) {
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
