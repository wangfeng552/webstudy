<template>
  <div class="mk">
    <!-- 首先将要过渡的元素用transition包裹，并设置过渡的name，然后添加触发这个元素过渡的按钮（实际项目中不一定是按钮，任何能触发过渡组件的DOM操作的操作都可以） -->
    <button @click="show = !show">点击</button>
    <div>{{show}}</div>
    <transition name="changname">
      <div class="nk" v-show="show">123123</div>
    </transition>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        show: true
      }
    }
  }
</script>

<style scoped="">
  .nk{ background-color: #f60; width: 200px; height: 50px;}
  .changname-enter-active{
    transition: all 0.5s;
  }
  .changname-leave-active{
    transition:all 2s;
  }
  .changname-enter,.changname-leave-active{
    opacity:0;
    width: 400px;
    height: 200px;
  }

  /*
fade-enter：进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；

fade-enter-active：进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除；

fade-leave：离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除；

fade-leave-active：离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除；
*/
</style>
