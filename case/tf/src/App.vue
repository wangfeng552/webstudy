<template>
<div id="app">
  <http>
    <transition name="fade" mode="out-in">
      <router-view />
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
