<template>
  <div class="w1200">
    <div class="ost">
      <p class="tit fc1b1 lh34">相关推荐</p>
      <ul class="rel-box">
        <li class="mr51" v-for="(v,i) in recommend" v-if="i<3">
          <router-link :to="{name:'proIndex',params:{id:v.id}}" class="cover">
            <div class="img-box">
              <span class="img"> <img :src="v.logo"> </span>
            </div>
            <div class="more-box"><p class="fs14 fc5c5">{{v.name}}</p></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['recommend'],
    data(){
      return {}
    },
    created(){
    }
  }
</script>
