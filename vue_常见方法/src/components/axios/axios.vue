<template>
  <div class="mk">
    123
    <button @click="show">点击</button>
  </div>
</template>
<script>
  import qs from 'qs'
  export default{
    data() {
      return {
        name:{a:'123',b:55}
      }
    },
    created() {
      this.$http.get('/platform/home/index').then((res)=>{
        console.log(res)
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
