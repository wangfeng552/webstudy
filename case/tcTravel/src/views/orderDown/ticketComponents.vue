<template>
  <div class="ticket-notice">
        <div class="notice">
            <!-- 购票须知 -->
            <div class="head">
              <h1>票型说明</h1>
              <i @click="close"></i>
            </div>
            <div class="content" v-html="ticketPriceRemark">
            </div>
        </div>
  </div>
</template>
<script>
export default {
  props: ['ticketPriceRemark'],
  data() {
    return {
      month: undefined
    };
  },
  methods: {
    close: function() {
      this.$emit("closeChoice");
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/common";
@import "../../assets/style/mixin.scss";
.ticket-notice {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  z-index: 9;
  position: fixed;
  .notice {
    left: 50%;
    background: white;
    margin: 0 30px;
    height: 350px;
    transform: translateY(-50%);
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 50%;
    border-radius: 10px;
    .head {
      height: 40px;
      line-height: 40px;
      position: fixed;
      width: 100%;
      padding: 0px 15px;
      background: #f0f0f0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      h1 {
        font-size: 18px;
      }
      i {
        width: 20px;
        height: 40px;
        background: url(./img/close.png)
          no-repeat 10px 10px;
        position: absolute;
        top: 0;
        right: 15px;
        cursor: pointer;
        float: right;
        background-position: 0px;
        padding-left: 0px;
      }
    }

    .content {
      margin-top: 40px;
      padding: 10px 15px;
      overflow: scroll;
      height: 300px;
      font-size: 17px;
      .title {
        font-size: 15px;
      }
      .describe {
        color: #999;
        padding: 5px 0;
      }
    }
  }
}
</style>


