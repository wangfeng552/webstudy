<template>
  <div class="w1">
    <ul>
      <li v-for="v in messages">
        <span v-if="v.list">{{v.list}}</span><a href="">{{v.content}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
      data(){
          return{
              messages:[
                  {list:"",content:"中国将掌握居民在101个国家账户信息！对你有啥影响？"},
                  {list:"财经",content:"专家：保守估计中国未来3000万男人娶不到媳妇"},
                  {list:"股票",content:"中信证券APP评测:信e投无创新服务 存5高危漏洞"}
              ]
          }
      }
  }
</script>
<style>
  .w1{ width: 500px; height: 100px; background-color: #0a65b1;color: #fff;}
</style>