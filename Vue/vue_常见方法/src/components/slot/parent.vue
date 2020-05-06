<template>
  <div class="parent">
    <child>
      <div class="header" slot="header">我是头部内容</div>
    </child>
  </div>
</template>

<script>
import child from './child'
export default {
  components:{
    child
  }
}
</script>