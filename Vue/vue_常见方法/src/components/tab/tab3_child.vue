<template>
  <div class="tab2">
    <ul>
      <li :class="{'active1':mya1===1}" @click="tab2Bg(1)">满意</li>
      <li :class="{'active2':mya1===2}" @click="tab2Bg(2)">不满意</li>
      <li :class="{'active3':mya1===3}" @click="tab2Bg(3)">点评</li>
    </ul>
  </div>
</template>

<script>
  export default{
    props:{
      //设置默认值
      a1:{
        type:Number,
        default:2
      }
    },
    //1.在组件内的data对象中创建一个props属性的副本
    data(){
      return {
        mya1:this.a1 //data中新增字段
      }
    },
    methods:{
      tab2Bg(v){
        this.mya1 = v;
      }
    },
    watch: {
      a1(val) {
        this.mya1 = val;//2.监听外部对props属性a1的变更，并同步到组件内的data属性mya1中
      },
      //创建针对props副本的watch，通知到组件外
      mya1(val){
        this.$emit("chuandi",val);//3.组件内对mya1变更后向外部发送事件通知
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
