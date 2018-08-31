<template>
  <div id="app">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
html{
  background-color:#30005f
}
body{
  max-width: 640px;
  margin:0 auto;
}
</style>
