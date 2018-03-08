<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='one'">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="not-upload"><i class="icon-notup"></i> <span >等待操作者发送通知</span></p>
      </div>
    </div>
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已发送</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">
          <span>
            <p v-for="v in getContent">{{v}}</p>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import textareaExtend from './textareaExtend.vue'
  export default{
    components: {
      textareaExtend
    },
    props: ['type', 'ticket', 'index'],
    created(){
      this.getContent
    },
    data(){
      return {
        textarea: '',
      }
    },
    computed: {
      getContent(){
        var str = this.ticket.content.split('\n')
        return str
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
