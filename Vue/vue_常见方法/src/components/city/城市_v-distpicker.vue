<template>
  <div >
    <v-distpicker :placeholders="placeholders"
                  :province="select.province" :city="select.city" :area="select.area"
                  @province="selectProvince" @city="selectCity" @area="selectArea">
    </v-distpicker>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  export default {
    components: { VDistpicker },
    data(){
      return {
        username:'',
        select: { province: '广东省', city: '广州市', area: '海珠区' },
        placeholders: {
          province: '------- 省 --------',
          city: '--- 市 ---',
          area: '--- 区 ---',
        }
      }
    },
    methods:{
      selectProvince(value) {
        console.log(value)
        this.select.province = value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      selectCity(v){},
      selectArea(v){}
    }
  }
</script>
<style lang="scss">
</style>
