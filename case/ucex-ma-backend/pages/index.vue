<template>
  <div class="page-index">
    <u-button>im the ubutton</u-button>
    im the meta {{ $route.meta }}
    <u-polar/>
  </div>  
</template>
<script>
import { http, queryApp } from "Api"
import UPolar from "@/components/chart/UPolar"
export default {
  // asyncData({ route }) {
  //   console.log(route)
  //   return {
  //     test: route
  //   }
  // },
  components: {
    http,
    UPolar
  },
  head() {
    return {
      title: this.title,
      meta: [{ hid: "description", name: "description", content: "hi-Sen" }]
    }
  }
}
</script>
<style lang="less">
.page-index {
  div {
    color: red;
  }
}
</style>
