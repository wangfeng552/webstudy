<template>
  <div class="tab2">
    <ul>
      <li :class="{'active1':p_a1===1}" @click="tab2Bg('p_a1',1)">满意</li>
      <li :class="{'active2':p_a1===2}" @click="tab2Bg('p_a1',2)">不满意</li>
      <li :class="{'active3':p_a1===3}" @click="tab2Bg('p_a1',3)">点评</li>
    </ul>
  </div>
</template>

<script>
  import propsync from '../../assets/js/propsync'
  export default{
    mixins:[propsync], //声明使用propsync的mixin
    props:{
      //设置默认值
      a1:{
        type:Number,
        default:2
      }
    },
    methods:{
      tab2Bg(page, index, e) {
        this.p_a1 = index;//可以直接使用this.p_active
      }
    }
  }
</script>

<style scoped="">
  .tab2 li{ float: left; list-style: none; padding: 0 10px; height: 30px; line-height: 30px; background-color: #aaf2ff; margin-right: 10px; cursor: pointer;}
  .tab2 li.active1{background-color: #00a0e9; color: #fff;}
  .tab2 li.active2{background-color: #cd0a0a; color: #fff;}
  .tab2 li.active3{background-color: #f60; color: #fff;}
</style>
