<template>
  <div >
    <v-distpicker :placeholders="placeholders" :province="province" @province="selectProvince">
    </v-distpicker>
    <button @click="saveCity"> 提交</button>
    <button @click="quxiao"> 删除</button>
    <div>{{province}}本地</div>
    <div>{{city}}vuex</div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VDistpicker from 'v-distpicker'
  export default {
    components: { VDistpicker },
    computed:{
      ...mapGetters(['city'])
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.$nextTick(()=>{
          vm.province=vm.city
          console.log(vm.province)
        })
      })
    },
    data(){
      return {
        username:'',
        province:'',
//        select: { province: '', city: '', area: '' },
        placeholders: {
          province: '------- 省 --------',
          city: '--- 市 ---',
          area: '--- 区 ---',
        }
      }
    },
    methods:{
      selectProvince(value) {
        this.province = value
      },
      saveCity(){
        this.$store.dispatch('getCity',this.province)
      },
      quxiao:function () {
        this.$store.dispatch('cancelCity');
        this.selectProvince(this.city)
      },
    }
  }
</script>
<style lang="scss">
</style>
