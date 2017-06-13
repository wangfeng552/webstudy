<template>
  <div class="luyou">
    <ul>
      <li>to: Route: 即将要进入的目标 路由对象</li>
      <li>from: Route: 当前导航正要离开的路由</li>
      <li>next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。</li>
      <li>{{ $route.params.id }}</li>
    </ul>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        name:"打款发货"
      }
    },
    created() {
//      console.log(this.$route)
    },

    beforeRouteEnter (to, from, next) {
      console.log(to)       //当前的路径
      console.log(from)     //之前的路径
      next(true)            // true 可以跳转 false 不能跳转
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
/*      next(vm => {
        vm.$http.get().then((res) => {
          console.log(res)
        }).catch((res) => {
          console.log(res)
        })
        // 通过 `vm` 访问组件实例
      })*/
    },


   /* beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      console.log('更新')
    },*/


//    这个 leave 钩子通常用来禁止用户在还未保存修改前突然离开
    /*beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log(1)
      next(false)
    }*/
  }

 //导航完成后获取数据
 /*export default {
   data() {
     return {
       post: ''
     }
   },
   created() {
     this.fetchData()
   },
   watch: {
     '$route': 'fetchData'
   },
   methods: {
     fetchData(){
       this.error = this.post = null
       this.loading = true
       this.$http.get(url + this.$routes.params.id).then((res) => {
         console.log(res)
       }).catch((res) => {
         console.log('error')
       })
     }
   }
 }*/
</script>

<style>

</style>
