<template>
  <div>
    <div v-for="v in ietms">
      <p >{{v.phone_number}}</p>
    </div>
    <el-pagination  layout="total,prev,pager,next" :total="total1 | toInt" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
  export default {
    created(){
      this.$http.get('http://192.168.1.117:49008/api/v1/admin/users?page='+1).then((res) => {
          this.total1 = res.body.total
          this.ietms = res.body.ietms
      }).catch((res) => {
      })
    },
    data(){
      return {
        total1:'',
        ietms:'',
        fenye:false
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$http.get('http://192.168.1.117:49008/api/v1/admin/users?page='+val).then((res) => {
          this.total = res.body.total;
          this.ietms = res.body.ietms
        }).catch((res) => {
        })
      }
    },
    filters:{
      toInt(v){
        return parseInt(v)
      }
    }
  }
</script>

<style>

</style>
