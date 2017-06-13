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
      addName(){
        this.$http.get('http://192.168.1.117:49008/api/v1/platform/services/1').then(this.getVal1).then(this.getVal2).catch()
      },
      getVal1(res){
//        console.log(res.body.category_id)
        return res.body.category_id
      },
      getVal2(res){
        console.log(res)
        this.$http.get('http://192.168.1.117:49008/api/v1/platform/service/categories/'+res).then((res) => {
          console.log(res)
        })
      },
    }
  }
</script>

<style>

</style>
