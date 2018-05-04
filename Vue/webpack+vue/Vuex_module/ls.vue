<template>
<div class="ls">
  <div>{{username}}</div>
  <button @click="addls">登录</button>
</div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    data(){
      return {
        obj: {
          age: "45", address: "上海"
        }
      }
    },
    computed: {
      ...mapGetters(['username']),
/*      username(){
       return this.$store.state.loc.name.address
       }*/
    },
    methods: {
      addls() {
        this.$store.dispatch('login', this.obj)
        console.log(this.obj)
      }
    }
  }
</script>

<style>

</style>
