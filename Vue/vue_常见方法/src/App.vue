<template>
  <div class="mk">
    <ul>
      <li><router-link to="/swiper" replace>swiper</router-link></li>
      <li><router-link to="/vuex1">vuex</router-link></li>
      <li><router-link to="/vueresource">VueResource</router-link></li>
      <li><router-link to="/star">星星</router-link></li>
      <li><router-link to="/tab">tab</router-link></li>
      <li><router-link to="/ceshi">测试</router-link></li>
      <li><router-link to="/selectcity">选择城市</router-link></li>
      <li><router-link to="/city2">选择城市2</router-link></li>
      <li><router-link to="/propsChild">数据传递</router-link></li>
      <li><router-link to="/trans">transsition</router-link></li>
      <li><router-link to="/luyou">路由</router-link></li>
      <li><router-link to="/promise1">promise</router-link></li>
      <li><router-link to="/elementui">elementui</router-link></li>
      <li><router-link to="/input">input</router-link></li>
      <li><router-link to="/validate">validate</router-link></li>
      <li><router-link to="/btnClick">btnClick</router-link></li>
      <li><router-link to="/filterClass">filterClass</router-link></li>
      <li><router-link to="/zhiling">自定义指令</router-link></li>
      <li><router-link to="/sticky">sticky</router-link></li>
      <li><router-link to="/maodian">锚点跳转</router-link></li>
      <li><router-link to="/edit">edit</router-link></li>
    </ul>
    <router-view></router-view>
    <router-view name="tab2"></router-view>
    <router-view name="tab3"></router-view>
    <router-view name="persiste"></router-view>
  </div>
</template>
<style>
  .active{ color: red}
</style>
<script>

</script>

<!--<li><router-link tag="li" to="/swiper"><a href="">swiper</a></router-link></li>-->
<!--replace导航后不会留下 history 记录。-->
