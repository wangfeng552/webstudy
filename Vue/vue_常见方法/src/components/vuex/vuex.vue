<template>
  <div class="wf">
    <h2>{{name}}</h2>
    <h2>{{count}}</h2>
    <button @click="add">12312313</button>
    <button @click="getCount">getCount</button>
    <div>{{wf}}dddd</div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        name1: 'zhangs'
      }
    },
    computed: {
      ...mapState(['name', 'count']),
      ...mapGetters(['wf'])
    },
    methods: {
      ...mapActions(['add']),
      getCount() {
        this.$store.dispatch('getcount', {age: '士大夫'})
      }
    }
  }
</script>

<style>

</style>
