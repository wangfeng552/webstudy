<template>
  <div>
    <div>promise</div>
    <button @click="addName">点击</button>
  </div>
</template>

<script>
  export default{
    data(){
      return {}
    },
    methods: {
      //getVal1成功后取值传递到下一个做参数
      addName(){
        this.$http.get('http://192.168.1.117:49008/api/v1/platform/services/1').then(this.getVal1).then(this.getVal2).catch()
      },
      getVal1(res){
//        console.log(res.body.category_id)
        return res.body.category_id
      },
      getVal2(res){
        this.$http.get('http://192.168.1.117:49008/api/v1/platform/service/categories/'+res).then((res) => {
        })
      },

//      promiseAll方法
      submit(){
        var a=this.$http.get(API.url+'users/subordinate');
        var b=this.$http.get(API.url+'users/leaders');
        Promise.all([a,b]).then((res)=>{
          console.log(res)
        })
      }
    }
  }
</script>

<style>

</style>
