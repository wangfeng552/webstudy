<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="showPic">点击</button>
    <div :class="{loading:isshow}">loading</div>
    <ul>
      <li v-for="v in imgid.slice(0,5)"><img :src="v.images.small" alt=""><span>{{v.original_title}}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Hello 组件',
      isshow:false,
      imgid:[],
      Url:"https://api.douban.com/v2/movie/top250?count=10"
    }
  },
  methods:{
      showPic(){
          this.isshow=!this.isshow;//loading展示
          this.$http.jsonp(this.Url).then(
              (responce)=>{
                  this.$set(this.$data,"imgid",responce.data.subjects)
                  this.isshow=!this.isshow;//loading隐藏
//              console.log(this.imgid)
              }
          )
      }
  }
}
</script>
<style>
  .loading{ width: 200px; height: 200px; position: fixed;left: 0;top: 0;bottom: 0;right: 0;margin: auto; background-color: #f60;color: #fff;font-size: 45px; text-align: center}
</style>

