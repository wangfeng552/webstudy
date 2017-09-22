<template>
  <div class="message-tickets">
    <h2>通知详情</h2>
    <dl class="ms-list">
      <dt><img class="img" src="../../../assets/images/mslist_cs.png"></dt>
      <dd>
        <h3 class="text">上海市软件和集成电路发展专项资金</h3>
        <p class="ms">项目编号：17070400001</p>
      </dd>
    </dl>
    <div class=" notice">
      <h4 class="ico">培训通知</h4>
      <p class="ms">请贵公司于2017-08-10  10:00到上海市徐汇区零陵路599号快易名商1102室参加答辩培训</p>
    </div>
    <div class="ms-footer" id="f1">Copyright © 2000-2017 企服星entservice.com 版权所有</div>
  </div>
</template>

<script>
  export default{
  }
</script>

<style lang="scss">
  .message-tickets {
    position: relative;
    h2 {
      background: #3c8ced;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      height: 80px;
      line-height: 80px;
    }
    .ms-list {
      height: 190px;
      padding: 20px;
      position: relative;
      dt {
        width: 291px;
        position: absolute;
        left: 20px;
        top: 20px;
        .img{ background-size: 291px;}
      }
      dd {
        padding-left: 310px;
        .text {
          font-size: 32px;
          margin-bottom: 24px;
        }
        .ms {
          font-size: 24px;
          color: #666666;
        }
      }
    }
    .notice{
      padding: 20px;
      margin-bottom: 100px;
      .ico{
        background:url('../../../assets/images/laba.png') 0 3px no-repeat;
        padding-left: 60px; height: 50px; line-height: 50px; font-size: 28px;
        background-size: 44px;
        margin-bottom: 10px;
      }
      .ms{ font-size: 30px; color:#666666; line-height: 36px; text-indent: 2em;}
    }
    .ms-footer{
      position: absolute;
      left: 0;
      font-size:20px;
      color:#a9a9a9;
      width: 100%;
      text-align: center;
    }
  }
</style>
