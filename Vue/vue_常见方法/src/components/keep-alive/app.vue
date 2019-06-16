<template>
<div id="app">
  <!-- https://juejin.im/post/5cdcbae9e51d454759351d84 -->
  <http>
    <transition name="fade" mode="out-in">
      <keep-alive :include="include">
        <router-view  v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </http>
</div>
</template>

<script>
import http from "@/api/http"
export default {
  name: 'App',
  components: {
    http
  },
  data(){
    return {
      include:[]
    }
  },
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
}
</script>

<style>
#app {
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
