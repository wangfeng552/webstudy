<template>
  <div class="layout">
    <span>十大flash地方</span>
    <span>十大flash地方</span>
    <mt-button type="primary" @click="gostore">primary</mt-button>
    <mt-button type="primary" @click="del">del</mt-button>
    <div>{{userInfo}}</div>
  </div>
</template>
<script>
  import {arrayUtil,stringUtil,browserUtil,jsBridge} from '@/assets/js/common'
  import { Toast,MessageBox  } from 'mint-ui';
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    created(){
      Toast('123')
      console.log(jsBridge)
    },
    computed:{
      ...mapGetters(["userInfo"]),
    },
    methods:{
      gostore(){
        this.$store.dispatch('login', {name:'123'})
        this.$store.dispatch('login', {name:'123'})
      },
      del(){
        this.$store.dispatch('logout', '')
      }
    }
  }
</script>
<style lang="less" scoped>
.layout{
  span{ color: red; font-size: .12rem;}
  span:nth-child(2){ color: red; font-size: .24rem;}
}
</style>
