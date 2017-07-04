<template>
  <div class="mk">
    <per-child :userInfo="userInfo"></per-child>
    <button @click="delpre">删除</button>
  </div>
</template>
<script>
  import perChild from './perChild.vue'
  export default {
    components:{
      perChild
    },
    data(){
      return {
        userInfo:{name:"021-56564464"}
      }
    },
    methods:{
      delpre(){
        this.$store.commit('delper')
      }
    }
  }
</script>
