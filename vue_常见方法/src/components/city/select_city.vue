<template>
  <div class="city">
    <form action="">
    <select class="pro" v-model="pid" @change="prochange()">
      <option :value="v.id" v-for="v in pro">{{v.name}}</option>
    </select>
    <select class="city" v-model="cid" @change="citychange()">
      <option :value="v.id" v-for="v in city">{{v.name}}</option>
    </select>
    <select class="county" v-model="ccid">
      <option :value="v.id" v-for="v in county">{{v.name}}</option>
    </select>

    <div class="fuzhi">
      <input type="text" value="你好" ref="wfShow">
      <button @click="fuzhi">复制</button>
    </div>
    </form>
  </div>
</template>

<script>
  import area_data from './area_data'
  export default{
    data() {
      return{
        all:area_data, // 所有数据
        pro:"",        // 省份
        city:"",       // 市
        county:"",     // 区
        pid:"",
        cid:"",         // 市的value值
        ccid:""         // 区的value值
      }
    },
    created:function(){
      this.pro=this.all.pro; // 设置省份
      this.pid=this.pro[0]['id'];  // 取省第一个id赋值给省的value值
      this.prochange(); //改变的时候触发
    },
    methods:{
      prochange:function(){
        this.city=this.all.city[this.pid];  // 根据省的id取city的数据赋值给市
        this.cid=this.city[0]['id'];    // 取市第一个id赋值给市的value值
        this.county=this.all.county[this.cid]; //  根据市的id取区的数据赋值给区
        if(this.county.length>0){
          this.ccid=this.county[0]['id'];
        }
      },
      citychange:function(){
        this.county=this.all.county[this.cid];
        if(this.county.length>0){
          this.ccid=this.county[0]['id'];
        }
      },
      fuzhi(){
//        console.log(this.$refs.wfShow.value)
        this.$refs.wfShow.select()
        document.execCommand("copy");
      }
    }
  }
</script>

<style>

</style>
