<template>
  <div id="animals">
    <input type="text" v-model="text">
    <p>{{text | capitalize}}</p>
    <Hello :showmessage="text"></Hello>
    <div class="family">
      <h2>{{cmval}}</h2>
      <ul>
        <li v-for="(v,i) in list.slice(0,5)" :class="{active:(i+1)%4===0}"><a :href="v.casts[2].alt"><img :src="v.casts[2].avatars.small" alt="">{{v.casts[2].name}}</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Hello from "./Hello.vue"
  export default{
      data(){
          return{
              text:"this",
              cmval:"",
              list:[]
          }
      },
      //过滤
      filters: {
          capitalize: function (value) {
              if (!value) return ''
              value = value.toString()
              return value.charAt(0).toUpperCase() + value.slice(1)
              console.log(this.filters)
          }
      },
      components:{Hello},
      //组件创建完就显示
      created:function () {
//          console.log(this)  //这里可以输出Vue实例

          // 基于全局Vue对象使用http
//          Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
//          Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

          // 在一个Vue实例内使用$http
          this.$http.jsonp("https://api.douban.com/v2/movie/top250?count=10",{},{
              headers:"",
              emulateJSON:true
          }).then(function (responce) {
//              console.log(responce.data.count)
//              this.cmval=responce.data.count
              this.$set(this.$data, 'cmval', responce.data.count)
              this.$set(this.$data,'list',responce.data.subjects)
//              console.log(this.list)
          }, function (responce) {
              console.log(responce)
          })
      }
      //es6
      /*created(){
          this.$http.jsonp("https://api.douban.com/v2/movie/top250?count=10").then(
              (responce)=>{
                  this.cmval=responce.data.count
              },
              (responce)=>{
              }
          )
      }*/
  }
</script>
<style>
  #animals{ font-size: 35px; color: #f60}
</style>

<!--
http://www.cnblogs.com/axl234/p/5899137.html
get(url, [options])
head(url, [options])
delete(url, [options])
jsonp(url, [options])
post(url, [body], [options])
put(url, [body], [options])
patch(url, [body], [options])
-->