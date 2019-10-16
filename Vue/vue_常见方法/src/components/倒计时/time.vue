<template>
    <div class="time">
      <time-child @time-end="message = '倒计时结束'" :endTime="endTime"></time-child>
      <div>{{message}}</div>
    </div>
</template>

<script>
  import timeChild from './timeChild'
    export default {
        name: "timesf",
      components:{timeChild},
      data(){
          return {
            message:'正在倒计时',
            endTime:'2018-08-17 16:16:38'
          }
      }
    }
</script>

<style scoped>

</style>
