<template>
  <div class="mk">
    123
    <button @click="show">点击</button>
    <div>{{fanhui}}</div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default{
    data() {
      return {
        name:{a:'123',b:55},
        fanhui:[]
      }
    },
    created() {
      this.$http.get('customer/home/index').then((res)=>{
        this.fanhui = res;
      })
    },
    methods:{
      show(){
        let m=qs.stringify(this.name);
        console.log(m) //=> a=123&b=55
      }
    }
  }
</script>
