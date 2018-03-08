<template>
  <div class="bgfff">
    <div class="gd-box" v-if="type=='one'">
      <div class="title bgefe">
        <i class="tit-fstz02"></i>
        <span class="describe fc5c5">{{ticket.title}}</span>
      </div>
      <div class="content">
        <p class="not-upload"><i class="icon-notup"></i> <span >等待服务商告知</span></p>
      </div>
    </div>
    <div class="gd-box" v-if="type=='two'">
      <div class="title bg55b">
        <i class="tit-fstz01"></i>
        <span class="describe fcfff">{{ticket.title}}</span>
      </div>
      <div class="content">
        <span class="tips" style="margin-bottom:30px;">
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
