<template>
  <div class="mk">
    <input type="text" @blur="scrollPageDefault">
  </div>
</template>
<script>
export default {
  methods:{
     scrollPageDefault() {
      setTimeout(function () {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
  }
  
}
</script>

