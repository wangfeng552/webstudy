<template>
  <div id="app">
    <share-post />
     <http></http>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
  </div>
</template>

<script>
import SharePost from "@/plugins/SharePost";
import http from "@/api/http";
export default {
  name: "App",
  components: {
    http,
    SharePost
  }
};
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
