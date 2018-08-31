<template>
  <div>jiucai
    <div>123</div>
  </div>

</template>

<script>
  import {queryCoinList} from '@/api/http'
  import { Toast,MessageBox  } from 'mint-ui';
  export default {
    name: "jiucai",
    created() {
      queryCoinList();
    }
  }
</script>

<style scoped>

</style>
