<template>
  <div class="mk">
    <h2>{{count}}</h2>
    <p>{{getCount}}</p>
    <button @click="addCount">点击+</button>
    <button @click="saleCount">点击-</button>
    <button @click="evenAdd">偶数+</button>
    <button @click="yanchiAdd">延迟1秒+</button>
    <p>{{indexdata}}</p>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data () {
      return {indexdata: ''}
    },
    computed: {
      ...mapGetters(['count', 'getCount'])
    },
    methods: {
      ...mapActions(['addCount', 'saleCount', 'evenAdd', 'yanchiAdd'])
    }
  }
</script>
