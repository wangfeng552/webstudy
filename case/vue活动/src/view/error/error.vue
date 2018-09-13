<template>
  <div class="error">
    <div class="pic"><img src="" alt=""></div>
    <div class="persn">活动参与人数过多太火爆了～</div>
    <router-link  class="reverpage" :to="{name:'jiucai'}">重新加载</router-link>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="less" scoped>
.error {
  .pic {
    width: 5.9rem;
    height: 4.42rem;
    background: url("~@/assets/images/404.png") 0 0 no-repeat;
    background-size: 100%;
    margin: 2.79rem auto 0.3rem;
  }
  .persn {
    font-size: 0.32rem;
    text-align: center;
    margin-bottom: 0.83rem;
    color: #d1a3ff;
  }
  .reverpage {
    width: 3.24rem;
    height: 1.08rem;
    line-height: 1rem;
    background: url("~@/assets/images/buy_05.png") 0 0 no-repeat;
    background-size: 100%;
    margin: 0 auto;
    display: block;
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
  }
}
</style>
