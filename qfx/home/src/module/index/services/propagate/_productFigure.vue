<template>
  <div class="product-figure w1200" v-if="institution">
    <div class="pfi-560"><img :src="institution[0].sublogo" width="560" height="290"></div>
    <div class="pfi-620">
      <h2 class="title">{{institution[0].service}}</h2>
      <div class="disc">
        <dl>
          <dt>服务价格</dt>
          <dd>
            <div v-if="institution[0].service_fee=='申请通过后可见'"><span class="red" >{{institution[0].service_fee}}</span></div>
            <div v-else><strong class="sale">{{institution[0].service_fee}}</strong></div>
          </dd>
        </dl>
        <dl>
          <dt>服务地区</dt>
          <dd>{{institution[0].province}}</dd>
        </dl>
        <dl>
          <dt>服务商</dt>
          <dd>{{institution[0].provider.name}}</dd>
        </dl>
      </div>
      <div class="btn btn-blue" @click="applyOnline(0)">在线申请</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    props: ['institution','service_id','category_id'],
    computed: {
      ...mapGetters(['token'])
    },
    methods:{
      applyOnline(i){
        if(this.token == null||this.token==undefined||this.token ==''){
          this.$router.push({name:'login'})
        }else{
          this.$router.push({name:'application',
            params:{id:this.service_id,products_id:i,category_id:this.category_id}
          })
        }
      }
    }
  }
</script>

<style>

</style>
