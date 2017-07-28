<template>
 <div class="ceshi">
   <ul>
     <div><input type="text"></div>
     <button @click="show">点击</button>
   </ul>
 </div>
</template>

<script>
  import qs from 'qs'
export default {
  data(){
    return {
      mk:[
        {name:[1,2,3]},
        {name:['sdf',34,58]},
        {name:[1,'就看到',3]}
      ],
      isTruy:false,
      name:{a:'123',b:55}
    }
  },
  methods:{
    show(){
      let m=qs.stringify(this.name);
      console.log(m)
    }
  }
}
</script>
<style lang="scss">
</style>
