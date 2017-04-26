<template>
  <div>
    <h2>{{$route.params}}</h2>
    <h2>{{$route.params.id}}</h2>
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
      //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象：
      watch: {
          '$route' (to, from) {
              // 对路由变化作出响应...
              alert(1)
              //动态路由
              console.log(this)
          }
      }
  }
</script>