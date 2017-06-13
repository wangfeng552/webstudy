<template>
  <div class="mk">

    <select class="bigarea" ref="yiji" v-model="defaultarea" @change="areaChange()">
      <option :value="v._area" v-for="(v,i) in bigarea">{{v._area}}</option>
    </select>

    <select class="pro" ref="erji" v-model="pid" @change="proChange()">
      <option :value="v.name" v-for="(v,i) in pro">{{v.name}}</option>
    </select>

    <select class="city" ref="sanji" v-model="cid" @change="citychange()">
      <option :value="v.name" v-for="v in city">{{v.name}}</option>
    </select>

    <select class="county" v-model="ccid">
      <option :value="v" v-for="v in county">{{v}}</option>
    </select>


    <div>{{defaultarea+pid+cid}}</div>
  </div>
</template>

<script>
  import area from './area'
  export default{
    data(){
      return {
        all:area,
        bigarea:'',
        pro:"",        // 省份
        city:"",       // 市
        county:"",     // 区
        defaultarea:'',
        pid:'',
        cid:"",         // 市的value值
        ccid:"",         // 区的value值
      }
    },
    created(){
      this.bigarea=this.all;
      this.defaultarea=this.all[0]['_area'];
      this.areaChange()
    },
    methods:{
      areaChange(){
        this.$nextTick(() => {
          var allIndex = this.$refs.yiji.selectedIndex
          this.pro = this.all[allIndex].Allcity
          this.pid = this.all[allIndex].Allcity[0].name
          this.city = this.pro[0].cityList
          this.cid = this.pro[0].cityList[0].name
          this.county = this.city[0].areaList
          this.ccid = this.city[0].areaList[0]
        })
      },
      proChange(){
        this.$nextTick(() => {
          var proIndex = this.$refs.erji.selectedIndex
          this.city = this.pro[proIndex].cityList
          this.cid = this.pro[proIndex].cityList[0].name
          this.county = this.city[0].areaList
          this.ccid = this.city[0].areaList[0]
        })
      },
      citychange(){
        this.$nextTick(() => {
          var cityIndex = this.$refs.sanji.selectedIndex
          this.county = this.city[cityIndex].areaList
          this.ccid = this.city[cityIndex].areaList[0]
        })
      }
    }
  }
</script>

<style>

</style>
