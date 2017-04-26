<template>
  <div id="animals">
    <input type="text" v-model="text">
    <p>{{text}}</p>
    <Hello :showmessage="text"></Hello>
    <div class="family">
      <h2>{{cmval}}</h2>
      <ul>
        <li v-for="v in list.slice(0,2)">{{v.id}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Hello from "./Hello.vue"
  export default{
      data(){
          return{
              text:"张三",
              cmval:"",
              list:[]
          }
      },
      components:{Hello},
      created:function () {
//          console.log(this)  这里可以输出Vue实例

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
              console.log(this.list)
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